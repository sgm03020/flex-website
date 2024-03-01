import Nedb from 'nedb'
import { people_v1 } from 'googleapis'

// dbからメールアドレスが一致するオブジェクトを見つける
// nedb.findはasync-awaitになっていないためPromise化する
// Promise<T>など頑張って型を付けているが、調べる時間がかかるので
// any を使うことを検討せよ
const findPeople = (db: Nedb<people_v1.Schema$Person>, emailAddr?: string) =>
  new Promise<people_v1.Schema$Person[] | undefined>((resolve, reject) => {
    db.find(
      {
        $where: function () {
          const found = this.emailAddresses?.find(
            (el: people_v1.Schema$EmailAddress) => el.value === emailAddr
          )
          if (found) return true
          else return false
        },
      },
      (err: any, docs: people_v1.Schema$Person[]) => {
        if (err) {
          reject(err)
        }
        resolve(docs)
      }
    )
  })


export { findPeople }
