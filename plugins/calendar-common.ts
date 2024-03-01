// @nuxt/dayjsだが、以下のimportでplugin内でもdayjsが使える模様
// import * as dayjs from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

// 仕様
// ページで 開始日(start)のdayjsオブジェクトを作成
// そのdayjsオブジェクトを引数にして
// updateDaysを呼ぶ
// ページで戻り値のdays配列をdataとして保持
// しつつ、watchを通して bookingTimeList配列を作成する
// 処理を呼ぶ
//

// days配列の型
// days.push({ item, year, month, yymm, mm, day, dow, ym, cr, pt, cnt })
type Days = {
  item: dayjs.Dayjs
  year: String
  month: String
  yymm: String
  mm: String
  day: String
  dow: String
  ym: String
  cr: String
  pt: Boolean
  cnt: Number
}

/**
 * dayCount分(通常7日分)の日付データを作成する(nuxt-firstと少し変更する)
 * @param {*} start - 開始日(dayjsオブジェクト)
 *            modeを廃止した
 */
const updateDays = (start: dayjs.Dayjs) => {
  console.log('updateDays')
  let dayCount = 7
  let ym1 = undefined
  let ym2 = undefined
  let cnt = 0 // 例えば4月から始まった場合、その4月のまま続いた日数をカウントアップする
  //             これをページで使う
  //             daysの最後の日付のcntが7より小さい場合は、4月と5月に跨った
  //             days配列になっていると判断する(以前のymCount)
  // 配列を空にする
  // days.length=0では更新しない
  let days = []
  if (start == undefined) {
    //console.log('start is undefined return')
    // return null
    start = dayjs().startOf('week')
  }
  let now = dayjs()

  // 新たな週スタート日
  // let newStart = start
  // let now = dayjs()
  // if (mode != undefined) {
  //   newStart = mode == 1 ? start.add(7, 'day') : start.subtract(7, 'day')
  // }

  for (let i = 0; i < dayCount; i++) {
    let item = i == 0 ? start : start.add(i, 'day')
    //.format('YYYY/MM/DD')
    //let item = sow.add(i, 'day').format('YYYY/MM/DD')
    // raw追加(YYYY-MM-DD形式)
    let yymmdd = item.format('YYYY-MM-DD')
    let year = item.year().toString() //sow.add(i, 'day').format('YYYY')
    let month = (item.month() + 1).toString() //sow.add(i, 'day').format('MM')
    let yymm = year + '年' + month + '月'
    let mm = month + '月'
    let day = item.format('D')
    let dow = '(' + item.format('ddd') + ')'
    let ym = item.format('YYYY/MM') || undefined
    // この場所は時間情報はないので.unix()で比較しても意味なし
    // ここでは日のみの比較しか出来ない
    let pt = item < now ? true : false
    let cr = '#333'
    if (item.day() == 0) {
      cr = 'red'
    } else if (item.day() == 6) {
      cr = 'royalblue'
    }
    if (i == 0) {
      ym1 = ym //item.substring(0, 7)
      cnt++
    } else if (ym1 && ym1 != ym) {
      ym2 = ym //item.substring(0, 7)
    } else if (ym1 && ym1 == ym) {
      cnt++
    }
    //console.log('cnt=', cnt)
    //
    // 配列の更新では画面に反映されない場合がある
    // その場合は$setを利用する、Vueが監視出来る配列のメソッドを使う
    // https://cloudpack.media/41984
    // Vueが監視出来る配列のメソッドを使う
    // push(), pop(), shift(), unshift(), splice(), sort(), reverse()
    // cntを追加
    // ページ側では ymCount = days[days.length-1].cnt となる
    days.push({ item, year, month, yymmdd, yymm, mm, day, dow, ym, cr, pt, cnt })
  }
  return days
}

/**
 *
 * @param days
 * @param baseHours
 * @param basePeriod
 */
const createBookingTimeList = (
  days: Days[],
  baseHours: number[],
  basePeriod: number
) => {
  // console.log('createBookingTimeList')
  let bookingTimeList = []
  let dayCount = days.length
  // baseHour取得
  // let baseHours = [9, 10, 11, 12]
  if (!baseHours) baseHours = [9, 10, 11, 12]
  // 分の単位はどこまでか(15,30,60のいずれか)
  // let basePeriod = 15
  if (!basePeriod) basePeriod = 60

  let ptCount = 0 // 過去時間である個数を数える
  let now = dayjs()

  // 予約日時のリストを作る (2)
  // 1つの配列(日にちを跨いでフラットな配列)
  // 2021/01/04T09:00:00, 2021/01/04T09:15:00, ....... 2021/01/10/T12:45:00
  let timeBaseCount = Math.floor(60 / basePeriod)
  // 1日あたりの予約時刻の数 = baseHours.length * timeBaseCount
  // 9:00 9:15 9:30 9:45 = 4つ
  for (let x = 0; x < dayCount; x++) {
    for (let i = 0; i < baseHours.length; i++) {
      let hourNumber = baseHours[i]
      let hourStr = ('00' + baseHours[i].toString()).slice(-2)
      for (let j = 0; j < timeBaseCount; j++) {
        // 時刻 09:05:00
        let hm1 =
          hourNumber.toString() + ':' + ('00' + j * basePeriod).slice(-2)
        let hm2 = hourStr + ':' + ('00' + j * basePeriod).slice(-2) + ':' + '00'
        let datetime = days[x].item.format('YYYY/MM/DD') + 'T' + hm2
        // 過去日時の個数を記録
        // => これはページ側で後で算出する
        if (now.unix() >= dayjs(datetime).unix()) {
          // console.log('datetime=', datetime)
          ptCount++
        }
        bookingTimeList.push(datetime)
      }
    }
  }
  // ラスト日時確認
  // console.log('last:', bookingTimeList[bookingTimeList.length - 1])
  return bookingTimeList
}
/*
const createBookingTimeListOld = (start, mode) => {
  console.log('createBookingTimeList')
  let dayCount = 7

  let ym1 = undefined
  let ym2 = undefined
  let cnt = 0

  // 配列を空にする
  // days.length=0では更新しない
  let days = []
  let bookingTimeList = [] // 2次元配列
  let baseList = []

  if (start == undefined) {
    //console.log('start is undefined return')
    // return null
    start = dayjs().startOf('week')
  }

  // 新たな週スタート日
  let newStart = start
  let now = dayjs()
  if (mode != undefined) {
    newStart = mode == 1 ? start.add(7, 'day') : start.subtract(7, 'day')
  }

  for (let i = 0; i < dayCount; i++) {
    let item = i == 0 ? newStart : newStart.add(i, 'day')
    //.format('YYYY/MM/DD')
    //let item = sow.add(i, 'day').format('YYYY/MM/DD')
    let year = item.year().toString() //sow.add(i, 'day').format('YYYY')
    let month = (item.month() + 1).toString() //sow.add(i, 'day').format('MM')
    let yymm = year + '年' + month + '月'
    let mm = month + '月'
    let day = item.format('D')
    let dow = '(' + item.format('ddd') + ')'
    let ym = item.format('YYYY/MM') || undefined
    // この場所は時間情報はないので.unix()で比較しても意味なし
    // ここでは日のみの比較しか出来ない
    let pt = item < now ? true : false
    let cr = '#333'
    if (item.day() == 0) {
      cr = 'red'
    } else if (item.day() == 6) {
      cr = 'royalblue'
    }
    if (i == 0) {
      ym1 = ym //item.substring(0, 7)
      cnt++
    } else if (ym1 && ym1 != ym) {
      ym2 = ym //item.substring(0, 7)
    } else if (ym1 && ym1 == ym) {
      cnt++
    }
    //console.log('cnt=', cnt)
    //
    // 配列の更新では画面に反映されない場合がある
    // その場合は$setを利用する、Vueが監視出来る配列のメソッドを使う
    // https://cloudpack.media/41984
    // Vueが監視出来る配列のメソッドを使う
    // push(), pop(), shift(), unshift(), splice(), sort(), reverse()
    //
    days.push({ item, year, month, yymm, mm, day, dow, ym, cr, pt })
  }

  // baseHour取得
  let baseHours = [9, 10, 11, 12]
  // 分の単位はどこまでか(15,30,60のいずれか)
  let basePeriod = 15
  let ptCount = 0 // 過去時間である個数を数える

  // 予約日時のリストを作る (2)
  // 1つの配列(日にちを跨いでフラットな配列)
  // 2021/01/04T09:00:00, 2021/01/04T09:15:00, ....... 2021/01/10/T12:45:00
  let timeBaseCount = Math.floor(60 / basePeriod)
  // 1日あたりの予約時刻の数 = baseHours.length * timeBaseCount
  // 9:00 9:15 9:30 9:45 = 4つ
  for (let x = 0; x < dayCount; x++) {
    for (let i = 0; i < baseHours.length; i++) {
      let hourNumber = baseHours[i]
      let hourStr = ('00' + baseHours[i].toString()).slice(-2)
      for (let j = 0; j < timeBaseCount; j++) {
        // 時刻 09:05:00
        let hm1 =
          hourNumber.toString() + ':' + ('00' + j * basePeriod).slice(-2)
        let hm2 = hourStr + ':' + ('00' + j * basePeriod).slice(-2) + ':' + '00'
        let datetime = days[x].item.format('YYYY/MM/DD') + 'T' + hm2
        // 過去日時の個数を記録
        if (now.unix() >= dayjs(datetime).unix()) {
          // console.log('datetime=', datetime)
          ptCount++
        }
        bookingTimeList.push(datetime)
      }
    }
  }
  // ラスト日時確認
  // console.log('last:', bookingTimeList[bookingTimeList.length - 1])

  // 予約日時のリストを作る (1)
  // 1週間分が横軸、可能時刻が縦軸
  // として2次元配列になる
  /*
  for (let i = 0; i < baseHours.length; i++) {
    let line = []
    let limit = Math.floor(60 / basePeriod)
    let hourNumber = baseHours[i]
    let hourStr = ('00' + baseHours[i].toString()).slice(-2)
    let hm1 = ''
    let hm2 = ''
    for (let j = 0; j < limit; j++) {
      // 時刻 09:05:00
      hm1 = hourNumber.toString() + ':' + ('00' + j * basePeriod).slice(-2)
      hm2 = hourStr + ':' + ('00' + j * basePeriod).slice(-2) + ':' + '00'
      baseList.push(hm1)
      // 指定時間(縦) に対応する日(横)にそって日時の情報を作成
      let line1 = [] // 1行分
      for (let j = 0; j < dayCount; j++) {
        let datetime = days[j].item.format('YYYY/MM/DD') + 'T' + hm2
        // 過去日時の個数を記録
        if (now.unix() >= dayjs(datetime).unix()) {
          // console.log('datetime=', datetime)
          ptCount++
        }

        line1.push(datetime)
      }
      bookingTimeList.push(line1)
    }
  }
  */
/*
  return bookingTimeList
}
*/

const fuga = () => {
  return 'fuga'
}

export default ({}, inject: any) => {
  inject('createBookingTimeList', createBookingTimeList)
  inject('updateDays', updateDays)
  inject('fuga', fuga)
}
