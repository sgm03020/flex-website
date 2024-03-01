import * as kickbox from 'kickbox'
import * as url from 'url'
import * as querystring from 'querystring'

// var kickbox = require('kickbox').client('Your_API_Key_Here').kickbox()
const kickboxClient = kickbox.client(process.env.KICKBOX_API_KEY).kickbox()

async function getVerify(req, res, next) {
  // クエリからメールアドレスを抜き出す
  // const queryResult = url.parse(req.url)
  // const addr = querystring.parse(queryResult.query)?.addr
  // クエリからメールアドレスを抜き出す
  // 複数のクエリが繋がっていても以下で1発OK
  const { addr } = url.parse(req.url, true).query

  // チェックをかける
  kickboxClient.verify(
    addr || 'test@example.com',
    { timeout: 6000 },
    function (err, response) {
      // Let's see some results
      if (err) {
        console.log(err)
        return res.status(404).send('error')
      } else if (response.body?.result) {
        // console.log(response.body)
        console.log('result:', response.body.result)
        // deliverableだけOKとしておく
        if (response.body.result === 'deliverable') {
          return res.json({
            verify: 'deliverable',
          })
          //return res.status(200).JSON({result:'deliverable'})
        }
        return res.json({
          verify: response.body.result,
        })
      }
      return res.json({
        verify: 'error',
      })
    }
  )
}

export { getVerify }
