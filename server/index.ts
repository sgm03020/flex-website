import express from 'express'
import bodyParser from 'body-parser'
import routes from './api'

// 1) OK
import { db } from './database/db'
import { getAllPeople } from './api/g-people'

// 2) OK  export default new Datastore()となっている場合
// import db from './database/db'

// 3) OK
// var db = require('./database/db')

console.log('index.ts create app')
const app = express()

// express初期化後、一度だけ実行する
// getAllPeopleをawaitしたい場合は
// 即時関数として実行しないとダメぽい
// またはstoreのnuxtServerInitで実行するのはどうか
// --- ここから ---
// Peopleから情報を取得しdbへ保持する
// NeDBのインデックスとユニーク設定(重複回避のため)
// ensureIndexでインデックスを作成する
db.ensureIndex({ fieldName: 'resourceName', unique: true, sparse: true })

// 以下 async-awaitでの書き方はnode-express.txtへ記述
getAllPeople().then(({ connections }) => {
  // console.log('connections', connections)
  db.insert(connections)
  app.set('db', db)
})


// CORSを許可する
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(bodyParser.json())
app.use(routes)

module.exports = app
