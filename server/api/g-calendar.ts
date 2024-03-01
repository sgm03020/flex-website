import * as Express from 'express'
import * as fs from 'fs'
import * as readline from 'readline'
import * as url from 'url'
import { google, calendar_v3, people_v1, datastore_v1 } from 'googleapis'
import { OAuth2Client, Credentials } from 'google-auth-library'
import { getPeople, isPeople, getAllPeople } from './g-people'
import Nedb from 'nedb'
import { findPeople } from '../common/db-helper'

// downloaded ClientSecret.json file data
interface ClientSecrets {
  installed: {
    client_id: string
    project_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_secret: string
    redirect_uris: string[]
  }
}

interface Booking {
  email: string
  start: string
  end: string
}

// dotenv.config() -> なくてもいける

// If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
]

///
/// File I/O
///
// Load client secrets from a local file.
function loadClientSecrets(): ClientSecrets {
  const content = fs.readFileSync(
    process.env.GOOGLE_CLIENT_SECRET_PATH as string,
    {
      encoding: 'utf8',
    }
  )
  return JSON.parse(content) as ClientSecrets
}

// Store the token to disk for later program executions
function storeToken(token: Credentials) {
  fs.writeFileSync(
    process.env.GOOGLE_TOKEN_PATH as string,
    JSON.stringify(token)
  )
}

// load if we have previously stored a token.
function loadToken(): Credentials {
  const token = fs.readFileSync(process.env.GOOGLE_TOKEN_PATH as string, {
    encoding: 'utf8',
  })
  return JSON.parse(token) as Credentials
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
async function authorize(credentials: ClientSecrets): Promise<OAuth2Client> {
  const oAuth2Client = new google.auth.OAuth2(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0]
  )

  // Check if we have previously stored a token.
  let token: Credentials
  try {
    token = loadToken()
  } catch {
    // no token.json
    token = await getAccessToken(oAuth2Client)
  }
  oAuth2Client.setCredentials(token)
  return oAuth2Client
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
async function getAccessToken(
  oAuth2Client: OAuth2Client
): Promise<Credentials> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Open this URL: ', authUrl)
  var code = await new Promise<string>((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question('Paste Code: ', (code) => resolve(code))
  })

  const token = await oAuth2Client.getToken(code).catch((err) => {
    console.error('Error retrieving access token', err)
    throw err
  })
  console.log('storeToken:', token.tokens)
  storeToken(token.tokens)
  return token.tokens
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth: OAuth2Client, calendarId: string) {
  if (process.env.API_DEBUG === 'true') console.log('called api listEvents')
  const calendar = google.calendar({ version: 'v3', auth })
  const list = await calendar.events
    .list({
      calendarId: calendarId, //'primary',
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    })
    .catch((err) => {
      console.log('The API returned an error: ' + err)
      throw err
    })

  const events = list.data.items

  // イベントデバッグ
  if (process.env.EVENTS_DEBUG) {
    if (events) {
      // console.log('Upcoming 10 events:')
      events.map((event, i) => {
        let start = ''
        if (event.start) {
          start = event.start.dateTime || event.start.date || 'Start Unknown'
        }
        // console.log(`${start} - ${event.summary}`)
        console.log('event:', JSON.stringify(event))
      })
    } else {
      console.log('No upcoming events found.')
    }
  }
  // 追加
  return events
}

/**
 * Google Calendar APIを通して予定を追加する
 * 内部関数として使うため true or falseで返す
 * return true or false
 * @param auth
 * @param calendarId
 * @param data (type Booking型)
 */
async function addEventsHandler(
  auth: OAuth2Client,
  calendarId: string,
  data: Booking
) {
  // console.log('data: ', data)
  const userEmail = data.email
  const event = {
    summary: 'パーソナル',
    attendees: [
      { ...(userEmail && { email: userEmail, responseStatus: 'accepted' }) },
      // { email: userEmail, responseStatus: 'accepted' },
      // { email: 'lpage@example.com' },
      // { email: 'sbrin@example.com' },
    ],
    start: {
      dateTime: data.start,
      timeZone: 'Asia/Tokyo',
    },
    end: {
      dateTime: data.end,
      timeZone: 'Asia/Tokyo',
    },
  }
  // console.log('event: ', event)
  const calendar = google.calendar({ version: 'v3', auth })
  const { data: insertResultData } = await calendar.events.insert({
    calendarId: calendarId,
    // sendUpdates: 'all',
    // sendNotifications: true, // 通知を有効にする
    // resource: event ? event : insert_event,
    // requestBody: {},
    // requestBody: insert_event,
    requestBody: event,
  })
  // if (process.env.API_DEBUG)
  //   console.log('response.statusText: ', response.statusText)
  // res.send(ret.statusText);
  // res.send('OK')
  // console.log('insertResultData: ', insertResultData)
  if (insertResultData?.status === 'confirmed') {
    // イベント追加成功
    return true
  }
  return false
}

// entry point
// (async () => {
//   // Authorize a client with credentials, then call the Google Calendar API.
//   const client_secret = await loadClientSecrets()
//   const oAuth2Client = await authorize(client_secret)
//   await listEvents(oAuth2Client, process.env.CALENDAR_ID as string)
// })()

async function getEvents(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  if (process.env.API_DEBUG === 'true')
    console.log('api getEvents req ip=', req.ip)
  // console.log('process.env:', process.env)
  // console.log('process.env.CALENDAR_ID:', process.env.CALENDAR_ID)

  // Get query(email address)
  // const queryResult = url.parse(req.url)
  // const addr = querystring.parse(queryResult.query as string)?.addr
  // 以下1発でOK
  const { addr } = url.parse(req.url, true).query

  // Authorize a client with credentials, then call the Google Calendar API.
  const client_secret = loadClientSecrets()
  const oAuth2Client = await authorize(client_secret)
  const events = await listEvents(
    oAuth2Client,
    process.env.CALENDAR_ID as string
  )
  // res.send('events:' + JSON.stringify(events))
  // 全ての情報が見えると良くないので、間引きする
  if (events) {
    // console.log('g-calendar.ts events: ', events)
    // 以下の4つのみ利用する
    // 'owner': true or false => 独自追加(google apiには存在しない)
    // type pubNames = 'start' | 'end' | 'colorId' | 'attendees' | 'owner'
    type pubNames = 'start' | 'end' | 'colorId' | 'attendees'
    type pubEvents = {
      start?: any
      end?: any
      colorId?: string
      attendees?: Array<any>
      owner?: boolean
    }
    const keys: pubNames[] = ['start', 'end', 'colorId', 'attendees']

    // anyとしてキャストしないとうまく型エラーとなる
    // const res = events.map((item: any) =>
    //   keys.reduce((acc, key) => ({ ...acc, [key]: item[key] }), {})
    // )

    // 無理やりにanyを使わないとダメ(object[key]という形式に時に型エラーとなる)
    // 以下によって start, end, colorId, attendeesの情報のみ
    // 切り出して、返すようにする
    const filteredEvents = events.reduce(
      (acc: pubEvents[], value: calendar_v3.Schema$Event, index) => {
        acc[index] = keys.reduce((pre: pubEvents, cur: pubNames, i) => {
          // 1)
          // pre[cur] = (value as any)[cur]
          // 2)
          // const v: keyof pubEvent = cur as any
          // pre[cur] = null
          // pre[cur] = value[cur]
          // 以下から attendeesの中身をユーザへは見せないようにするため
          // attendees配列の中に email:'xxxx@yyyy.com'があり
          // query parameterのaddrと一致している場合には
          // owner : true に変換して付加することとする
          // ownerを付加(true or false)
          if (cur === 'attendees') {
            // console.log('email addr: ', addr)
            const array = value['attendees']
            // console.log('array: ', array)
            // 注意
            // findIndexを使う場合、found は　undefinedになる可能性があり
            // if (found) だと 0の場合と見分けがつかない
            // if (found === -1 || found === undefined || found === null)
            // とする
            // ここでは find へ変えてみた findだとundefined判定も同時にできる
            const found = array?.find((v) => v.email === addr)
            // console.log('found: ', found)
            if (found) pre['owner'] = true
            else pre['owner'] = false
            // findIndexの場合
            // if (found === -1 || found === undefined || found === null) {
            //   pre['owner'] = false
            // } else pre['owner'] = true
            //
            // 解説
            // このロジックにより
            // google apiからの戻りeventsの構造から
            // 必要な start, end, colorId, attendeesだけを抽出して
            // attendeesの中にemailとして、GETメソッドのquery paramのaddrに
            // 一致する場合は、 owner: true として attendeesの代わりに
            // プロパティとして追加する
            // 結果として以下の構造となる
            // {
            //   start: '20200201T09:00:00+9:00",
            //   end: '20200201T09:00:00+9:00",
            //   owner: true
            // }
          } else pre[cur] = value[cur]
          return pre
        }, {} as pubEvents)
        return acc
      },
      []
    )
    //
    // console.log('filteredEvents: ', filteredEvents)
    return res.send(filteredEvents)
  }
  // res.send(events)
  // eventsがない、取れない場合は空を返す
  return res.send([])
}

// 追加(form dataを使わないバージョン)
async function addEvents(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  // addEventsHandlerの結果格納
  let result = 'failed'

  // 1) 前半部 メールアドレスをNeDBまたは、最新のPeople情報からチェックする
  // メールアドレスチェック
  let foundPeople = null

  // NeDB利用
  // db (index.tsで app.setにて設定されている)
  const db: Nedb<people_v1.Schema$Person> = req.app.get('db') || undefined

  // クエリを使う場合
  // const { addr } = url.parse(req.url, true).query
  if (req.body?.email) {
    // db-helperにて定義(メールアドレスが一致する要素がdbにあるか)
    const matchPeople = await findPeople(db, req.body?.email as string)
    // matchPeople.length > 0 ならばマッチする連絡先がある
    if (matchPeople && matchPeople.length > 0) {
      // NeDBにある
      foundPeople = matchPeople[0] // 複数未対応
      console.log('This email address is exist in NeDB')
    } else {
      // NeDBにない場合は、最新情報をgoogleapisのpeopleにあるか直接
      // 調べる
      // req.body.email
      foundPeople = await getPeople(req.body.email)
      // ここで 見つかる場合は NeDB が最新ではないということになる
      // db更新
      if (foundPeople) {
        console.log('foundPeople:', foundPeople)
        // 最新のPeopleより見つかった場合は
        // dbに登録する
        db.insert(foundPeople, (err: any, docs: any) => {
          if (err) console.log(err)
          else {
            // console.log('db.insert:', docs)
          }
        })
        // return res.send({})
      } else console.log('not found people')
    }
  }
  if (!foundPeople) {
    return res.send({ result, message: 'not registration' })
  }

  // 2) 後半部(予約登録)

  // メールアドレスチェックをクリアした場合は予約実行
  const data: Booking = {
    email: req.body.email,
    start: req.body.start,
    end: req.body.end,
  }

  try {
    const client_secret = loadClientSecrets()
    const oAuth2Client = await authorize(client_secret)
    // 戻り値 { result: true or false }
    // { result: addEventsResult }では別名にしている(上でresultを使うから)
    const ret = await addEventsHandler(
      oAuth2Client,
      process.env.CALENDAR_ID as string,
      data
    )
    // 成功ならば "success"
    if (ret) result = 'success'
  } catch (err) {
    console.log('addEventsHandler err:', err)
  }
  //finally {
  // ここでreturnしない方がよい(しては行けない)
  // finallyを使わない方がよい
  // return res.send({ result: false })
  //}
  // console.log('addEvents result: ', result)
  // const obj = { result }
  // console.log('obj: ', obj)
  // { result : true or false }の形式で返す
  return res.send({ result })
}

// 追加(form dataを使うやり方)
async function addEventsFormData(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  // const form = new IncomingForm()
  // Parse `req` and upload all associated files
  // form.parse(req, function (err, fields, files) {
  // }
  // formのparseをawait化する
  // const formfields = await new Promise(function (resolve, reject) {
  //   form.parse(req, function (err, fields, files) {
  //     if (err) {
  //       reject(err)
  //       return
  //     }
  //     resolve(fields)
  //   }) // form.parse
  // })
  // console.log('formfields: ', formfields)
  // const client_secret = loadClientSecrets()
  // const oAuth2Client = await authorize(client_secret)
  // const events = await addEventsHandler(oAuth2Client, process.env.CALENDAR_ID as string, req, res)
  // res.send('events:' + JSON.stringify(events))
  // console.log('req:', req)
  // console.log('addEvents req: ', req)
  console.log('req.body:', req.body)
  res.send('OK')
}

export { getEvents, addEvents }
