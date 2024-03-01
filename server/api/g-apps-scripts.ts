import * as Express from 'express'
// import * as Express from 'express'　=> この宣言では app = express()でエラーとなる
// import express from 'express'
import * as fs from 'fs'
import * as readline from 'readline'

import { google, calendar_v3, GoogleApis } from 'googleapis'
import { OAuth2Client, Credentials } from 'google-auth-library'

import axios from 'axios'

// fsの場合のパス
const TOKEN_PATH = 'server/tokens/token-appsscript.json'

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

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/script.external_request',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
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
  fs.writeFileSync(TOKEN_PATH as string, JSON.stringify(token))
}

// load if we have previously stored a token.
function loadToken(): Credentials {
  const token = fs.readFileSync(TOKEN_PATH as string, {
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
    console.log('no token.json')
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

async function getScheduleConfig(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  console.log('getScheduleConfig')
  let select = 0
  const scriptId = process.env.GAS_SCRIPT_ID as string || '1ZSVi0JBf4YGeMGFmQDpIm-t-ucqMpZHGOiNs6w8s3nwtv-jb_uYAk2UW' // Personal config.gs
  const deployId = process.env.GAS_DEPLOY_ID as string || 'AKfycbwlfpgqnMWXWrqwHpy_sjb_jEs0RzFIhGZiiRDZu9RWSHBQIPDBgoHz6A' // Personal config.gs

  // Authorize a client with credentials, then call the Google Calendar API.
  const client_secret = loadClientSecrets()
  const oAuth2Client = await authorize(client_secret)

  // --- 方法1. ---
  if (select === 0) {
    // deployId利用
    const doGetUrl =
      `https://script.google.com/macros/s/${deployId}/exec`
    // Google Apps Scriptの設定で実行可能なAPIとして設定されていない場合に
    // 代替案として、execに対して単純にGETリクエストを送り、結果を得る
    // ただし、doGetやdoPostがしっかり設定されていることが大前提である。
    // ポイントは以下のheadersを使うこと(Bearerが含まれている)
    // urlの文字列は、バージョンが更新されると変化するかもしれない
    // ここから OK
    const headers = await oAuth2Client.getRequestHeaders()
    // console.log('headers: ', headers)
    const result = await axios.get(doGetUrl, { headers })

    // console.log('result.data: ', result.data)
    return res.send(result.data || {})
    // ここまでOK
  }
  // --- 方法2. ---
  // 多分deployId利用(ドキュメントのscriptIdとの記述は誤りでは?)
  // ただし、こちらと方法3.では GCPプロジェクトとの紐づけと実行可能APIの設定が必要である。
  // const scriptId = '1ZSVi0JBf4YGeMGFmQDpIm-t-ucqMpZHGOiNs6w8s3nwtv-jb_uYAk2UW' // Personal config.gs
  // const scriptId = '1QbiU_1vr-att2wad9WhfXvMqmWNb1eLBg_6EPLd1Enf8hQEpGpEy8LNf' // My Script
  if (select === 1) {
    const urlPost = `https://script.googleapis.com/v1/scripts/${deployId}:run`
    const headers = await oAuth2Client.getRequestHeaders()
    const resultPost = await axios.post(
      urlPost,
      {
        function: 'helloWorld',
      },
      { headers }
    )
    console.log('resultPost: ', resultPost)
    return res.send({})
  }

  if (select === 2) {
    // 方法3.
    // scriptId利用
    // googleapisを利用する
    // Google Apps Script
    const appsScript = google.script({ version: 'v1', auth: oAuth2Client })
    // const scriptId = '1ZSVi0JBf4YGeMGFmQDpIm-t-ucqMpZHGOiNs6w8s3nwtv-jb_uYAk2UW' // personalのconfig.gsスクリプトID
    // const scriptId = 'M7YOy1UWVWAomm_hSEfjKVl7km-J8lFlq' -> API ID
    // const scriptId = '1QbiU_1vr-att2wad9WhfXvMqmWNb1eLBg_6EPLd1Enf8hQEpGpEy8LNf'
    // const scriptId = 'AKfycbyyjV17aGMRpKeNyqvzL_QaXQj4iUkgAFNIuqKQGg'
    const requestBody = {
      function: 'helloWorld',
      devMode: false,
      parameters: [],
    }
    const ret = await appsScript.scripts
      .run({ scriptId, requestBody })
      .catch((err) => {
        console.log('error: ', err)
        // 以下があるとエラーとなる
        // throw(err)
        // next(err)
      })
    // GaxiosResponse<script_v1.Schema$Operation>
    // console.log('ret: ', ret)
    if (ret && ret.data && ret.data.done) {
      console.log(
        'ret.data.response.result: ',
        (ret as any).data.response.result
      )
      return res.send((ret as any).data.response.result)
    }
  }

  return res.send({})
}

export { getScheduleConfig }
