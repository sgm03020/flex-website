// NeDB
import Datastore from 'nedb'
import { people_v1 } from 'googleapis'

// import { AsyncNedb } from 'nedb-async'
// import { getAllPeople } from '../api/g-people'

// 1) ?
// module.exports = (function () {
//   console.log('db.ts')
//   return
// })()

// 2)
// exports.foo = 'foo'
// module.exports = () => {
//   console.log('bar')
// }

// 3)
// exports.foo = 'foo'
// module.exports.bar = 'bar'

// 4) - OK
// const arr = [1, 2, 3]
// export { arr }

// 5) OK
// https://medium.com/@poksme/you-can-export-as-default-an-anonymous-function-just-like-you-would-do-with-an-object-4d00e626ef7d
// export default () => console.log('Hello world!')

// 6) OK
// export default {
//   myVar: 'test',
//   myFunction: function () { console.log('hello world!') }
// }

// 7) 以下、呼び出し先でエラー
// function initDB(): Nedb {
//   console.log('initDB')
//   let store = new Datastore()
//   return store
// }
// var store:Nedb = initDB()
// export { store }

// OKパターン
// var Datastore = require('nedb')
// module.exports = new Datastore()
// module.exports = new Datastore({ filename: './foo.db', autoload: true })

// 一応OKパターン
// index.ts側がrequire利用ならば以下で行ける
// module.exports = new Datastore()

// OKパターン
// export default new Datastore()

// OKパターン
const db = new Datastore()
// export { db } => 他の関数と一緒に最下部に書いた

// nedb-async (別の宣言の方法ではタイプを指定できるが)
// https://www.npmjs.com/package/nedb-async
//
// let db = new AsyncNedb()
// export { db }

// const store = new Datastore()
// const allPeople = await getAllPeople()
// console.log('allPeople: ', allPeople)
// store.insert(allPeople)

// store.insert(allPeople, function (err) {
//   const result = store.find({}, (err: any, docs: any) => {
//     if (err) console.log(err)
//     console.dir(docs)
//   })
// })

// module.exports = store
// export default store

export { db }
