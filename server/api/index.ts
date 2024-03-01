import { Router } from 'express'
import { IncomingForm } from 'formidable'
import { getVerify } from './email-check'

// 1)
import { getEvents, addEvents } from './g-calendar'
// 2)
// import { getEvents } from './g-calendar-sync'

// Google Apps Script(スプレッドシート経由で設定値のJSONを取得する)
// import { callAppsScript } from './g-test'
import { getScheduleConfig } from './g-apps-scripts'
import { getSheetValues } from './g-spreadsheet'
import { getPeople } from './g-people'

const router = Router()

// store.find({}, (docs: any) => {
//   console.dir(docs)
// })

router.get('/verify', getVerify)
router.get('/events', getEvents)
router.post('/addEvents', addEvents)
router.post('/addEvents123', function (req, res) {
  // console.log('req.body: ', req.body)
  // console.log('req: ', req)
  // res.send('OK')
  // 以下ではform dataを使う
  const form = new IncomingForm()
  // Parse `req` and upload all associated files
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    // const allFieldsName = Object.keys(fields) //
    // const [fieldsName] = Object.keys(fields)
    // const [firstFileName] = Object.keys(files)
    // console.log(allFieldsName)
    // console.log(fieldsName)
    // res.json({ filename: firstFileName })
    console.log('fields.mail', fields.mail)
  })
  res.send('OK')
})

// Google Apps Script
router.get('/getScheduleConfig', getScheduleConfig)
router.get('/list', getSheetValues)
router.get('/people', getPeople)

router.get('/', (req, res) => {
  res.send('Hello')
})

export default router
