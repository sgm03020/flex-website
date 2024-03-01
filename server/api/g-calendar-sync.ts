/**
 * このやり方は結局うまく行かない(同期でやろうとするやり方)
 * 結局 g-calendar.tsとほぼ同じソースになった
 * つまりsyncでは出来ず、asyncを利用した
 * GoogleCalendar
 *  GoogleApis.google.auth.OAuth2
 *  で認証したgoogle apiのCalendarを返す
 */
import * as Express from 'express'
import { google } from 'googleapis'
import { Credentials, OAuth2Client } from 'google-auth-library' // Credentials, OAuth2Clientの宣言を使うだけ
import * as fs from 'fs'
// import * as path from 'path'
import readline from 'readline'
import moment from 'moment'
// import keys from '../tokens/credentials.json'
// import token from '../tokens/token.json'

const CALENDAR_SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

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
 * @param {function} callback The callback to call with the authorized client.
 */
// イベントの配列を返す [....]
// ただし、実際に配列を作るのはcallbackに指定した関数である
async function authorize(
  credentials: ClientSecrets,
  callback: (auth: OAuth2Client, calendarid: string) => Promise<any>
) {
  // const oAuth2Client: OAuth2Client = getOAuth2Client()
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  // Check if we have previously stored a token.
  // fs.readFile(TOKEN_PATH, 'utf8', (err, token) => {
  // fs.readFile(process.env.GOOGLE_TOKEN_PATH as string, 'utf8', (err, token) => {
  let token: Credentials
  try {
    token = loadToken()
  } catch (err) {
    token = await getAccessToken(oAuth2Client)
  }
  //
  try {
    oAuth2Client.setCredentials(token)
    const events = await callback(
      oAuth2Client,
      process.env.CALENDAR_ID as string
    )
    return events
  } catch (err) {
    console.log('error return []:', err)
    return []
  }

  // // refresh_tokenのみコピー
  // refresh_token = { ...token.refresh_token }
  // // 現在のtokenの期限を確認する
  // const expireDate = new Date(token.expiry_date)
  // console.log('googleCalendar.ts expireDate: ', expireDate)
  // console.log(
  //   'googleCalendar.ts expireDate moment format: ',
  //   moment(expireDate).format('YYYY-MM-DD HH:mm')
  // )
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken(
  oAuth2Client: OAuth2Client
): Promise<Credentials> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: CALENDAR_SCOPES,
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
  storeToken(token.tokens)
  return token.tokens
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth: OAuth2Client, calendarId: string) {
  const calendar = google.calendar({ version: 'v3', auth })
  const list = await calendar.events
    .list({
      calendarId: calendarId, //'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })
    .catch((err) => {
      console.log('The API returned an error: ' + err)
      throw err
    })

  const events = list.data.items

  if (events) {
    // console.log('Upcoming 10 events:')
    events.map((event, i) => {
      let start = ''
      if (event.start) {
        start = event.start.dateTime || event.start.date || 'Start Unknown'
      }
      // console.log(`${start} - ${event.summary}`)
    })
  } else {
    console.log('No upcoming events found.')
  }
  // 追加
  return events
}

/**
 * エンドポイント
 * @param req
 * @param res
 * @param next
 */
async function getEvents(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  // console.log('process.env:', process.env)
  // console.log('process.env.CALENDAR_ID:', process.env.CALENDAR_ID)
  // Authorize a client with credentials, then call the Google Calendar API.
  const credentials = loadClientSecrets()
  const events = await authorize(credentials, listEvents)
  // console.log('this is events: ', events)
  // res.send('end')
  // res.send('events:' + JSON.stringify(events))
  // res.send(JSON.stringify(events))
  res.send(events)
}

export { authorize, getEvents }
