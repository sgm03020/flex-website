import * as Express from 'express'
import * as fs from 'fs'
import * as readline from 'readline'
import { google } from 'googleapis'
import { OAuth2Client, Credentials } from 'google-auth-library'

// fsの場合のパス
// const TOKEN_PATH = 'server/tokens/token-contacts.json'

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
// const SCOPES = [
//   'https://www.googleapis.com/auth/contacts',
//   'https://www.googleapis.com/auth/userinfo.profile'
// ]

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
function storeToken(tokenPath: string, token: Credentials) {
  fs.writeFileSync(tokenPath as string, JSON.stringify(token))
}

// load if we have previously stored a token.
function loadToken(tokenPath: string): Credentials {
  const token = fs.readFileSync(tokenPath as string, {
    encoding: 'utf8',
  })
  return JSON.parse(token) as Credentials
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
async function authorize(credentials: ClientSecrets, scopes: string | string[], tokenPath: string): Promise<OAuth2Client> {
  const oAuth2Client = new google.auth.OAuth2(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0]
  )

  // Check if we have previously stored a token.
  let token: Credentials
  try {
    token = loadToken(tokenPath)
  } catch {
    // no token.json
    console.log('no token.json')
    token = await getAccessToken(oAuth2Client, scopes, tokenPath)
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
  oAuth2Client: OAuth2Client,
  scopes: string | string[] | undefined,
  tokenPath: string
): Promise<Credentials> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
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
  storeToken(tokenPath, token.tokens)
  return token.tokens
}

export { ClientSecrets, loadClientSecrets, authorize }

