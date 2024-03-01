import * as Express from 'express'
import * as url from 'url'
import * as querystring from 'querystring'
import { google, people_v1 } from 'googleapis'
import {
  ClientSecrets,
  loadClientSecrets,
  authorize,
} from '../common/oauth-helper-ts'

// fsの場合のパス
const TOKEN_PATH = 'server/tokens/token-contacts.json'

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/contacts',
  'https://www.googleapis.com/auth/userinfo.profile',
]

async function getPeopleApi(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  let ret = false
  // クエリからメールアドレスを抜き出す
  // 複数のクエリが繋がっていても以下で1発OK
  const { addr } = url.parse(req.url, true).query
  if (addr) {
    ret = await isPeople(addr as string)
  }
  return res.send({ result: ret })
}


// 指定したメールアドレスを持つpeople情報
/**
 *
 * @param email
 */
async function getPeople(email: string) {
  // Authorize a client with credentials, then call the Google Calendar API.
  const secrets: ClientSecrets = loadClientSecrets()
  const tokenPath = 'server/tokens/tokens-people.json'
  const oAuth2Client = await authorize(secrets, SCOPES, tokenPath)
  const service = google.people({ version: 'v1', auth: oAuth2Client })
  // https://developers.google.com/people/api/rest/v1/people.connections/list
  // { data: people }の意味はdataをpeopleという別名にしてアクセスできる
  // ということを意味する
  const { data: people } = await service.people.connections.list({
    resourceName: 'people/me', // 必須
    personFields: 'names,emailAddresses,phoneNumbers',
    pageSize: 500,
  })

  // console.log(people)
  // const items: people_v1.Schema$Person[] | undefined  = people.connections?
  const found = people.connections?.find((v) => {
    return v.emailAddresses?.find((el) => el.value === email)
  })
  // console.log('found: ', found)
  // 一致するメールアドレスが見つかった
  if (found) return found
  return null
}

// 指定したメールアドレスを持つpeople情報があるか・ないか
/**
 *
 * @param email
 */
async function isPeople(email: string) {
  const found = getPeople(email) || null
  if (found) return true
  return false
}

// 全連絡先を取得
// apiとして使うのではないが、ここへ置いた
async function getAllPeople() {
  // Authorize a client with credentials, then call the Google Calendar API.
  const secrets: ClientSecrets = loadClientSecrets()
  const tokenPath = 'server/tokens/tokens-people.json'
  const oAuth2Client = await authorize(secrets, SCOPES, tokenPath)
  const service = google.people({ version: 'v1', auth: oAuth2Client })
  // https://developers.google.com/people/api/rest/v1/people.connections/list
  // { data: people }の意味はdataをpeopleという別名にしてアクセスできる
  // ということを意味する
  const { data: people } = await service.people.connections.list({
    resourceName: 'people/me', // 必須
    personFields: 'names,emailAddresses,phoneNumbers',
    pageSize: 500,
  })
  //
  return people || {}
}

export { isPeople, getPeople, getAllPeople }
