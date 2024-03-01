import * as Express from 'express'
import * as fs from 'fs'
import * as readline from 'readline'
import { google } from 'googleapis'
import { OAuth2Client, Credentials } from 'google-auth-library'

const TOKEN_PATH = 'server/tokens/token-spreadsheet.json'
// const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
// const SHEET_RANGE = 'Class Data!A2:E'
const SHEET_ID = '1t9romvJTW-FuPZdjitx-iWrGSslPKKL-2dK3NHTvxlo'
const SHEET_RANGE = 'シート1!A2:B2'

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
  name: string
  start: string
  end: string
}

// If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
// const SCOPES = [
//   'https://www.googleapis.com/auth/calendar.readonly',
//   'https://www.googleapis.com/auth/calendar',
//   'https://www.googleapis.com/auth/calendar.events',
// ]
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

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
async function listEvents(auth: OAuth2Client) {
  const sheets = google.sheets({ version: 'v4', auth })
  const results = await sheets.spreadsheets.values
    .get({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
    })
    .catch((err) => {
      console.log('The API returned an error: ' + err)
      throw err
    })

  if (results.data.values) {
    // 行(現在、設定行は1行のみ)
    const rows = results.data.values
    // console.log('rows[0]: ', rows[0])
    if (rows) {
      const line = rows[0]
      if (line && line.length > 1) {
        return {
          hours: line[0].split(',').map(Number),
          timePeriod: parseInt(line[1]),
        }
      }
    }
  }
  // default
  return {}
}

async function getSheetValues(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  // Authorize a client with credentials, then call the Google Calendar API.
  const client_secret = loadClientSecrets()
  const oAuth2Client = await authorize(client_secret)
  const values = await listEvents(oAuth2Client)
  // console.log('values: ', values)
  return res.send({})
}

export { getSheetValues }
