<template>
  <v-container fluid ma-0 pa-0>
    <!-- 最終更新:{{ upTime.format('hh:mm:ss') }} -->
    <!-- {{ checkArray[82] }}-{{ checkArray[83] }} -->
    <!-- <v-btn class="mb-2" @click="test()">DEBUG</v-btn> -->
    <!-- events:{{ events.length }} -->
    <!-- {{ matrix }} -->
    <!-- {{ checkArray }} -->
    <!-- baseHours: {{ baseHours }} -->
    <!-- ycount:{{ ycount }} timePeriod:{{ timePeriod }} -->
    <!-- ymcount: {{ ymcount }} -->
    <!-- <div>{{ email }}</div> -->
    <!-- 以下 v-show(events, checkArray)とv-if(timeList)両方見る-->
    <!-- 最初の条件 v-show="events && checkArray && checkArray.length > 0" -->
    <!-- 以下 v-ifのポイントは全部揃った場合のみ描画すること -->
    <div
      v-if="
        baseHours &&
        timePeriod &&
        ymcount &&
        days &&
        days.length > 0 &&
        timeList &&
        timeList.length
      "
    >
      <table class="table ma-0 pa-0" border="1">
        <thead>
          <tr>
            <!-- <th v-for="(column, index) in columns" :key="index">{{column}}</th> -->
            <th rowspan="5" class="subtitle-2 font-weight-bold">時分</th>
            <!-- <th colspan="3">2020年9月</th> -->

            <!-- パターン1 -->
            <!-- 何の調節もせずに表示する場合 -->
            <!-- <th v-if="days[0]" v-bind:colspan="ymcount">
            {{days[0].yymm}}
            </th>
            <th v-else v-bind:colspan="ymcount" /> -->

            <!-- パターン2 -->
            <!-- 2020年12月 2021年1月 という2つの月に跨るパターンの表示方法 -->
            <!-- ymcountは上位shedule.vueから渡される -->
            <!-- ymcountはcalendar-common.tsのupdateDays(start)で決まる -->
            <!-- ymcountが7以外の場合は必ず2つの月に跨る -->
            <!-- 前半部  -->
            <!-- セル数が3より大きい場合(フォントを大きくする) -->
            <th
              v-if="ymcount > 3"
              class="title font-weight-bold"
              v-bind:colspan="ymcount"
            >
              <!-- パターン2-1 OK -->
              {{ days && days[0] ? days[0].yymm : ' ' || ' ' }}
              <!-- パターン2-2 OKだけどyymmがない場合はdays[0]が全部表示 -->
              <!-- {{ days && days[0] && days[0].yymm}} -->
              <!-- パターン2-3 これはエラー-->
              <!-- {{ days[0].yymm}} -->
            </th>
            <!-- セル1つ分しかない場合は月のみ(フォントサイズ小さくする) -->
            <th
              v-else-if="ymcount === 1"
              v-bind:colspan="ymcount"
              class="subtitle-1 font-weight-bold"
            >
              {{ days && days[0] ? days[0].mm : ' ' || ' ' }}
            </th>
            <!-- セル2つ、または3つ分の場合は月のみ -->
            <th v-else v-bind:colspan="ymcount" class="title font-weight-bold">
              <!-- パターン2-1 OK -->
              {{ days && days[0] ? days[0].mm : ' ' || ' ' }}
            </th>

            <!-- 後半部 -->
            <!-- ymcountが7より小さい場合は、必ず後半部がありさらに分ける -->
            <!-- <th colspan="4">2020年10月</th> -->
            <th
              v-if="ymcount < 4"
              v-bind:colspan="7 - ymcount"
              class="title font-weight-bold"
            >
              {{ days && days[ymcount] ? days[ymcount].yymm : ' ' || ' ' }}
            </th>
            <th
              v-else-if="ymcount === 4"
              v-bind:colspan="7 - ymcount"
              class="title font-weight-bold"
            >
              {{ days && days[ymcount] ? days[ymcount].mm : ' ' || ' ' }}
            </th>
            <th
              v-else-if="ymcount === 5"
              v-bind:colspan="7 - ymcount"
              class="title font-weight-bold"
            >
              {{ days && days[ymcount] ? days[ymcount].mm : ' ' || ' ' }}
            </th>
            <th
              v-else-if="ymcount === 6"
              v-bind:colspan="7 - ymcount"
              class="subtitle-1 font-weight-bold"
            >
              {{ days && days[ymcount] ? days[ymcount].mm : ' ' || ' ' }}
            </th>
          </tr>
          <!-- ダミーtr -->
          <tr class="dummy-top">
            <th v-for="index in 7" :key="index" />
          </tr>

          <tr class="days">
            <!-- <th v-for="(dy, index) in days" :key="index"> -->
            <th v-for="index in days.length" :key="index">
              <template v-if="days && days[index - 1]">
                <span
                  data-style="num"
                  v-bind:style="
                    holidayList.includes(days[index - 1].yymmdd)
                      ? { color: '#E75480' }
                      : { color: days[index - 1].cr }
                  "
                >
                  {{
                    days && days[index - 1] ? days[index - 1].day : ' ' || ' '
                  }}

                  <!-- {{ days[index - 1].cr }} -->
                </span>
              </template>
            </th>
          </tr>
          <tr class="dow">
            <th v-for="index in days.length" :key="index">
              <!-- 要素が揃う場合のみ -->
              <template v-if="days && days[index - 1]">
                <span
                  data-style="dow"
                  v-bind:style="
                    holidayList.includes(days[index - 1].yymmdd)
                      ? { color: '#E75480' }
                      : { color: days[index - 1].cr }
                  "
                >
                  {{
                    days && days[index - 1] ? days[index - 1].dow : ' ' || ' '
                  }}
                </span>
              </template>
            </th>
          </tr>
          <!-- 縦余白の調節のためのダミー行 -->
          <tr class="dummy-bottom">
            <th v-for="index in days.length" :key="index" />
          </tr>
        </thead>
        <!-- 現在は以下の2次元配列は使っていない -->
        <!--
            (array0)        (array1)
        2020/1/1  9:00  2020/1/2  9:00   ↓
        2020/1/1  9:15  2020/1/2  9:15   ↓
        2020/1/1  9:30  2020/1/2  9:30   ↓
        2020/1/1 10:30  2020/1/2 10:30   ↓
        ...             ...              時刻刻み (baseHours.length*(60/period) : i)
                                  ->日数 (days.length : j)

        array[0] array[4] array[8]
        array[i] array[i+1*4] array[i+2*4]

        array[1] array[5] array[9]
        array[1] array[1+1*4] array[1+2*4]

        timeList[i + j*(ycount)]

        Array.from(Array(100).keys())
      -->
        <!-- matrixはtimeListを2次元配列化した2D配列  -->
        <!-- ycountは時刻刻み総数(computedで算出) -->
        <!-- 1) nuxt-firstとは異なり、元の予約時刻の配列が1次元の配列とした -->
        <!-- 2) その配列をcomputedで時刻の刻みの個数毎(結果的に日ごと)に分けた2次元の配列に変換 -->
        <!-- 3) trは、時刻刻み分回す -->
        <!-- 以下のようなlength分のループを使ったが -->
        <!-- v-for="(el, i) in Array.apply(null, { length: matrix[0].length }).map(Number.call,Number) -->
        <!-- v-for="(el, i) in matrix[0].length だけでよさそう -->
        <!-- <div v-if="matrix && matrix.length">
        <span v-for="(n, i) in 10" :key="n">{{ n }}-{{ i }} </span>
        </div> -->
        <tbody v-if="timeList && timeList.length > 0">
          <tr v-for="(el, i) in ycount" :key="`tr${i}`">
            <!-- 2021/10/21T09:00:00... 形式を 9:00 へ変換して後ろへ1文字分空白を付け右揃えする -->
            <td class="h6 text-right font-weight-medium mr-0 pr-0">
              <span
                class="mr-0 pr2px pr-sm-1 text-right"
                :class="timeList[i].charAt(14) !== '0' ? 'small-90 ' : ''"
              >
                {{ timeList[i].split('T')[1].slice(0, 5).replace(/^0/g, ' ') }}
              </span>
            </td>
            <td v-for="(elm, j) in days.length" :key="j">
              <!-- (1) 時刻を表示  -->
              <!-- {{ matrix[j][i].split('T')[0].slice(-2) }}/{{
              matrix[j][i].split('T')[1].slice(0, 5)
              }} -->
              <!-- (2) 時刻を表示 -->
              <!-- {{ timeList[i + j * ycount].split('T')[0].slice(-2) }}/
              {{ timeList[i + j * ycount].split('T')[1].slice(0, 5) }} -->
              <!-- 現在時刻から60日後以降も操作不可とした -->
              <!-- 現在時刻+61分以降から60日後まで可能 -->
              <!-- 現在時刻 24時間 × 60分 × 3日 + 1 分以降から60日後まで可能 -->
              <!-- 現在時刻 24時間 × 60分 × 2日 以降へ変更 -->
              <!-- 現在時刻 イコール 14401 分以降から60日後まで可能 -->
              <v-card
                class="ma-0 pa-0"
                tile
                flat
                ripple
                :key="j"
                :disabled="vCardDisabled(i, j)"
                @click="select(timeList[i + j * ycount])"
              >
                <!-- 実験中 -->
                <!-- 1. checkArrayが空かlengthが0 -->
                <!-- 2. eventsが取得できない、または取得に失敗した場合 -->
                <!-- 3. 現在時刻から60日後以降も空白にする -->
                <span
                  v-if="
                    !checkArray ||
                    (checkArray && checkArray.length === 0) ||
                    (i + j * ycount + 1 <= timeList.length && !events) ||
                    $dayjs(timeList[i + j * ycount]) > upTime.add(60, 'days')
                  "
                  class="title"
                >
                  <!-- 空にする -->
                  <v-avatar size="38" color="rgba(255, 255, 255, 0.0)">
                    <!-- {{ i + j * ycount + 1 }} -->
                  </v-avatar>
                </span>
                <!-- 現在時刻が予約時刻を過ぎている -->
                <span
                  v-else-if="
                    i + j * ycount + 1 <= timeList.length &&
                    upTime.add(61, 'minute') >= $dayjs(timeList[i + j * ycount])
                  "
                  class="title"
                >
                  <v-avatar size="38" color="rgba(255, 255, 255, 0.0)">
                    <!-- rgba(255, 255, 255, 0.0)だが以下は見える -->
                    <span class="title grey--text text--darken-2">－</span>
                  </v-avatar>
                </span>
                <span
                  v-else-if="
                    i + j * ycount + 1 <= timeList.length &&
                    checkArray &&
                    checkArray[i + j * ycount] === 11
                  "
                  class="title"
                >
                  <!-- <v-icon large color="green"> mdi-clock </v-icon> -->
                  <v-avatar size="30" color="green">
                    <span class="white--text title">確</span>
                    <!-- {{ checkArray[i + j * ycount] }} -->
                  </v-avatar>
                </span>
                <span
                  v-else-if="
                    i + j * ycount + 1 <= timeList.length &&
                    checkArray &&
                    checkArray[i + j * ycount] === 10
                  "
                  class="title"
                >
                  <!-- <v-icon medium color="red"> mdi-clock </v-icon> -->
                  <!-- <v-icon large color="red"> mdi-clock </v-icon> -->
                  <v-avatar size="30" color="red">
                    <!-- <span class="white--text headline">仮</span> -->
                    <span class="white--text title">仮</span>
                  </v-avatar>
                  <!-- {{ checkArray[i + j * ycount] }} -->
                </span>
                <!-- 1) 予定が入っている -->
                <!-- 2) かつ休業日ではない -->
                <span
                  v-else-if="
                    i + j * ycount + 1 <= timeList.length &&
                    checkArray &&
                    checkArray[i + j * ycount] === 2 &&
                    (!closeDays.includes(
                      $dayjs(timeList[i + j * ycount]).day()
                    ) ||
                      holidayList.includes(
                        $dayjs(timeList[i + j * ycount]).format('YYYY-MM-DD')
                      ))
                  "
                  class="title"
                >
                  <!-- {{ i + j * ycount }} -->
                  <!-- class="green--text"はnuxt-pursecss対策 -->
                  <!-- <v-icon color="green" class="green--text"> -->
                  <v-icon color="grey" class="grey--text text--darken-3">
                    <!-- mdi-close  -->
                    {{ mdiClose }}
                  </v-icon>
                  <!-- {{ checkArray[i + j * ycount] }} -->
                </span>
                <span
                  v-else-if="
                    i + j * ycount <= timeList.length &&
                    checkArray &&
                    checkArray[i + j * ycount] === 1
                  "
                  class="title"
                >
                  <!-- <v-icon color="red"> mdi-close </v-icon> -->
                  <v-icon color="red" class="red--text">
                    {{ mdiClose }}
                  </v-icon>
                  <!-- {{ i + j * ycount }} -->
                  <!-- {{ checkArray[i + j * ycount] }} -->
                  <!-- ▲ -->
                </span>
                <!-- 新規追加 2021.3.25 -->
                <!-- 3日過ぎ以降のみ予約可能 -> 2日へ変更 -->
                <!-- closeDaysに含まれる曜日(0が日曜日)である -->
                <span
                  v-else-if="
                    (i + j * ycount + 1 <= timeList.length &&
                      upTime.startOf('day').add(2, 'day') >=
                        $dayjs(timeList[i + j * ycount])) ||
                    closeDays.includes(
                      $dayjs(timeList[i + j * ycount]).day()
                    ) ||
                    holidayList.includes(
                      $dayjs(timeList[i + j * ycount]).format('YYYY-MM-DD')
                    )
                  "
                  class="title"
                >
                  <v-avatar size="38" color="rgba(255, 255, 255, 0.0)">
                    <!-- rgba(255, 255, 255, 0.0)だが以下は見える -->
                    <span class="title grey--text text--darken-2">－</span>
                    <!-- {{  $dayjs(timeList[i + j * ycount]).day() }} -->
                  </v-avatar>
                </span>
                <!-- 予約可能 -->
                <span
                  v-else-if="$dayjs() < $dayjs(timeList[i + j * ycount])"
                  class="title"
                >
                  <!-- <v-icon dense large>
                    mdi-circle-outline
                  </v-icon> -->
                  <!-- 以下のrgbaにて白・透明にする -->
                  <!-- v-iconとv-avatarの2つのパターンを試す -->
                  <!-- 以下のダミーで各セルの大きさを決めている -->
                  <!-- ダミー 1 (透明) -->
                  <!-- <v-icon x-large color="rgba(255, 255, 255, 0.0)"
                    >mdi-circle-outline</v-icon
                  > -->
                  <!-- ダミー 2 (透明) -->
                  <!-- <v-avatar size="38" color="rgba(255, 255, 255, 0.0)"> -->
                  <!-- <v-avatar size="38" color="rgba(0, 0, 0, 0.5)"> -->
                  <v-avatar size="38" color="rgba(255, 255, 255, 0.0)">
                    <!-- <span class="white--text title"></span> -->
                  </v-avatar>
                  <!-- 以下でわざと重ねて、各セルの大きさを統一しつつ、 -->
                  <!-- 表示される丸は小さくする -->
                  <!-- v-iconを使うパターンと -->
                  <!-- v-avatarを使うパターン(transformを使っている) -->
                  <!-- の2つを試している -->
                  <!-- color="rgba(168, 168, 168, 1)" -->
                  <!-- {{ i + j * ycount }} -->
                  <v-icon
                    v-if="1"
                    color="grey"
                    class="grey--text text--darken-1"
                    opacity="0"
                    z-index="0"
                    v-bind:style="{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }"
                  >
                    {{ mdiCircleOutline }}
                    <!-- mdi-circle-outline -->
                  </v-icon>
                  <!-- {{ checkArray[i + j * ycount] }} -->
                  <!-- 現在は上のv-iconを使っている -->
                  <v-avatar
                    v-if="0"
                    size="36"
                    color="grey"
                    z-index="0"
                    v-bind:style="{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform:
                        'translateY(' + '-50%' + ')translateX(' + '-50%' + ')',
                      margin: auto,
                    }"
                  >
                    <span class="title"></span>
                  </v-avatar>
                  <!-- ◎ -->
                </span>
                <!-- －の場合も大きさを統一する -->
                <span v-else>
                  <!-- <v-avatar size="38" color="rgba(0, 0, 0, 0.3)"> -->
                  <v-avatar size="38" color="rgba(255, 255, 255, 0.0)">
                    <!-- rgba(255, 255, 255, 0.0)だが以下は見える -->
                    <span class="title grey--text text--darken-2">－</span>
                  </v-avatar>
                  <!-- {{ i + j * ycount }} -->
                  <!-- {{ checkArray[i + j * ycount] }} -->
                  <!-- － -->
                </span>
                <!-- {{ timeList[i + j * ycount] }} -->
              </v-card>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-container>
</template>

<script>
import { mdiClose, mdiCircleOutline } from '@mdi/js'
// import events from '~/middleware/events'
export default {
  props: {
    baseHours: {
      type: Array,
      default: null,
    },
    timePeriod: {
      type: Number,
      default: null,
    },
    ymcount: {
      type: Number,
      default: null,
    },
    days: {
      type: Array,
      default: null,
    },
    timeList: {
      type: Array,
      default: null,
    },
    events: {
      type: Array,
      default: null,
    },
    myEvents: {
      type: Array,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    upTime: {
      type: Object,
      default: null,
    },
    closeDays: {
      type: Array,
      default: null,
    },
    holidayList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      checkArray: undefined,
      // updateTime: this.$dayjs(),
      mdiClose,
      mdiCircleOutline,
    }
  },
  watch: {
    // propsのeventsを監視して、(バッティングによる)
    // 予約不可能な時間帯の配列を作成する
    // 0 で予約可能
    // 1 で予約あり
    // 初回表示時には実行されない
    events: {
      immediate: true,
      handler: function (newValue, oldValue) {
        // console.log('watch events')
        if (!oldValue && newValue && newValue.length === 0) {
          // 現在時刻が変わった場合にも更新必要
        } else {
          this.createCheckArray()
        }
      },
    },
    timeList: {
      immediate: true,
      handler: function (newValue, oldValue) {
        if (!oldValue) {
          console.log('watch timeList is undefined')
        }
        if (!oldValue && newValue && newValue.length === 0) {
          console.log('watch timeList.length:', newValue.length)
          // this.createCheckArray()
        } else if (oldValue && oldValue.length === 0 && newValue.length > 0) {
          console.log('watch timeList.length:', newValue.length)
          this.createCheckArray()
        } else {
          console.log('watch timeList was chagend call createCheckArray')
          this.createCheckArray()
        }
        // this.createCheckArray()
      },
      deep: true,
    },
    // emailも監視に加えた
    // これがないと、初期の表示でemailにマッチした印が表示されない
    email: {
      immediate: true,
      handler: function (newValue, oldValue) {
        // console.log('change email call createCheckArray')
        // 現在の仕様ではevents内にemail情報がないために無意味である
        // this.createCheckArray()
      },
    },
  },
  computed: {
    // y軸の時刻刻み総数(period count)
    ycount: function () {
      if (this.baseHours && this.timePeriod)
        return this.baseHours.length * Math.floor(60 / this.timePeriod)
      else return 0
    },
    matrix: function () {
      if (this.timeList && this.timeList.length > 0)
        return this.toMatrix(this.timeList)
      else return []
    },
    // 以下も使える
    // timeClass() {
    //   return (ch) => {
    //     if (ch !== '0') {
    //       return 'small-90 text-right'
    //     } else {
    //       return ''
    //     }
    //   }
    // },
    //
    // 各セルのボタン有効・無効切り分け
    //
    // 1. イベントが存在しない
    // 2. セル時刻が明後日(含む)以降ではない
    //    (upTimeはタイマー実行毎に更新されている)
    // 3. upTime(現在日時)より60日より先である
    // 4. checkArray配列の値が0より大きく、仮・確定予約が入っている
    // 5. closeDays(曜日指定の休業日)に当たっている
    // 6. holidayList(祝日リストデータ)に当たっている
    vCardDisabled: function () {
      return function (i, j) {
        return (
          !this.events ||
          this.upTime.startOf('day').add(2, 'day') >=
            this.$dayjs(this.timeList[i + j * this.ycount]) ||
          this.$dayjs(this.timeList[i + j * this.ycount]) >
            this.upTime.add(60, 'days') ||
          (this.checkArray && this.checkArray[i + j * this.ycount] > 0) ||
          this.closeDays.includes(
            this.$dayjs(this.timeList[i + j * this.ycount]).day()
          ) ||
          this.holidayList.includes(
            this.$dayjs(this.timeList[i + j * this.ycount]).format('YYYY-MM-DD')
          )
        )
      }
    },
  },
  mounted() {
    console.log('WeeklyRawTable mounted')
    console.log(
      'WeeklyRawTable this.events.length:',
      this.events?.length || 'undefined'
    )
    setTimeout(() => {
      // 反映されるのを待ってから実行
      // 初期処理
      console.log(
        'WeeklyRawTable this.events.length:',
        this.events?.length || 'undefined'
      )
      // default.vueのloadingストップ
      // this.$nuxt.$emit('stopLoading', true)
    }, 0)
  },
  updated() {
    this.$nextTick(() => {
      console.log('updated')
      if (this.loading) {
        this.loading = false // ダミー
        // 以下でdefault.vueのloadingを止める
        this.$nuxt.$emit('stopLoading', true)
      }
    })
  },
  methods: {
    // [1,2,3,4,5,6,7,8,9,10]
    //
    // 1 4 7 10
    // 2 5 8 11
    // 3 6 9 12
    //
    listToMatrix(list, elementsPerSubArray) {
      var matrix = [],
        i,
        k
      for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
          k++
          matrix[k] = []
        }
        matrix[k].push(list[i * 3 + k])
      }
      return matrix
    },
    toMatrix(arr) {
      let width = this.baseHours.length * Math.floor(60 / this.timePeriod)
      return arr.reduce(
        (rows, key, index) =>
          (index % width === 0
            ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows,
        []
      )
    },
    // 初回マウント時に呼ぶ
    createCheckArray() {
      if (!this.timeList) {
        console.log('watch events no this.timeList')
        return
      }
      let checkArray = Array.apply(null, { length: this.timeList.length })
      // console.log('checkArray: ', checkArray)
      // console.log('this.events: ', this.events)
      // console.log('this.timeList.length: ', this.timeList.length)
      // console.log('checkArray.length: ', checkArray.length)

      if (this.events) {
        for (let j = 0; j < this.timeList.length; j++) {
          let t1 = this.$dayjs(this.timeList[j])
          let t2 // = this.$dayjs(this.timeList[j + 1])
          // 最後の時刻はt2が取れないので、timePeriod分加算する
          if (j === this.timeList.length - 1) {
            t2 = this.$dayjs(this.timeList[j]).add(this.timePeriod, 'm')
            // console.log('t1: ', t1.format())
            // console.log('t2: ', t2.format())
          } else {
            t2 = this.$dayjs(this.timeList[j + 1])
          }
          let ret = 0
          loop: for (let i = 0; i < this.events.length; i++) {
            let start1 = this.$dayjs(this.events[i].start.dateTime)
            let end1 = this.$dayjs(this.events[i].end.dateTime)
            if (end1 <= t1 || t2 <= start1) {
              continue
            } else {
              // 1(仮), 2(確認済), 10(本人仮), 11(本人確認済)
              // 自身のemailと同じ場合は 10 とする
              // 11ならばret=11確定で抜ける
              // 他の場合はその値より大きくなるか全て調べる
              // if (this.email && this.events[i].attendees) { => attendeesは隠した
              // ret = this.email && this.events[i].owner ? 10 : ret
              // console.log('this.events[', i, ']: ', this.events[i])
              // 1) colorIdが10以上の場合は確定
              // 2) statusがtrueの場合には確定(追加)
              if (
                this.events[i].owner &&
                ((this.events[i].colorId &&
                  parseInt(this.events[i].colorId, 10) > 9) ||
                  this.events[i].status)
              ) {
                ret = 11
                // 11の場合のみbreakする
                break loop
              } else if (this.events[i].owner) {
                ret = 10
              }
              // イベントのカラーが9より大きい場合(濃い緑と赤)
              // 自身の10ではない場合
              else if (
                ret < 2 &&
                !this.events[i].owner &&
                this.events[i].colorId &&
                parseInt(this.events[i].colorId, 10) > 9
              ) {
                ret = 2
              } else if (ret < 1 && !this.events[i].owner) {
                ret = 1
              }
            }
          }
          //
          checkArray[j] = ret
        }
      }
      // 配列の更新
      if (this.checkArray) this.checkArray.splice(0, this.checkArray.length)
      this.checkArray = checkArray
      // console.log('set checkArray:', checkArray)
      // ここで loading 解除を親へ伝える
      // if (this.events) {
      //   this.$emit('setLoading', false)
      // }
      //
      return this.checkArray.length
    },
    /**
     * 現在、このメソッドを呼ばずにwatchでから
     * createCheckArray()を呼び、専用の配列を持つように
     * なっている
     *
     * true   : 予約不可能
     * false  : 予約可能
     * @param tm    予約時間
     * @param next  次の予約時間
     */
    checkEvents: function (tm, next) {
      // console.log('checkEvents tm: ', tm)
      // 1つでも予定が入っていればその時間帯は予約不能とする
      let ret = false
      // console.log('this.events.length: ', this.events.length)
      // if (this.events && this.events.length > 0) {
      //   console.log('this.events: ', this.events)
      // }
      // console.log('events.length: ', events.length);
      // console.log('events: ', events)
      if (this.events && this.events.length > 0) {
        for (let i = 0; i < this.events.length; i++) {
          let start1 = this.$dayjs(this.events[i].start.dateTime)
          let end1 = this.$dayjs(this.events[i].end.dateTime)
          let t1 = this.$dayjs(tm)
          let t2 = this.$dayjs(next)
          // if (i === 1)
          if (end1 <= t1 || t2 <= start1) {
            // console.log('checkEvents start1: ', start1)
            // 範囲外の場合は予約可能
            ret = false
            continue
          } else {
            // 1つでも範囲に入る予約があれば、予約不能決定にてbreakする
            ret = true
            break
          }
        }
      }
      return ret
    },
    // 確認画面トリガー
    select: function (tm) {
      // console.log('selectedDateTime=', tm)
      // alert(this.$dayjs(tm).format())
      //this.$emit('childevent', tm)
      // 押した後、エフェクトが見えないため、時間差を置く
      setTimeout(() => {
        this.$emit('select', tm)
      }, 5)
    },
    test() {
      console.log('this.events: ', this.events)
      console.log('this.checkArray: ', this.checkArray)
    },
  },
}
</script>

<!-- https://allabout.co.jp/gm/gc/24011/#aa24011-merits -->
<style lang="scss" scoped>
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  // border: solid 1px $border-color;
  border: solid 1px orange;
  // font-family: sans-serif;
  // font-size: 8px;
}

table thead {
  // border: solid 1px $border-color;
  border: solid 1px orange;
}

table td {
  text-align: center;
  // border: dashed 1px $border-color;
  border: dashed 1px orange;
}

table td:first-child {
  text-align: right;
  padding-right: 0.3rem;

  // deep-orange lighten-4
  background-color: #fbe9e7 !important;
}

// ヘッダー日
table thead tr:nth-child(2) {
  font-size: large;
  line-height: 100%;
}

// ヘッダー日の線
table thead tr.days th {
  border-top: none;
  border-bottom: none;
}

// 曜日の下線
table thead tr.dow th {
  border-top: none;
  border-bottom: none;
}

table thead tr.dummy-top th {
  border-top: none;
  border-bottom: none;
}

table thead tr.dummy-bottom th {
  border-top: none;
  border-bottom: none;
}

// ヘッダー日
table thead tr.days {
  line-height: 100%;
  // background-color: royalblue;
}

// ヘッダー曜日(月・火・・)高さ
table thead tr:nth-child(4) {
  line-height: 100%;
}

// ヘッダー曜日
table thead tr:last-child th {
  vertical-align: text-top;
  font-size: x-small;
}

// 日の表示部分
// data-style
[data-style='num'] {
  font-size: large;
  vertical-align: bottom;
}
[data-style='dow'] {
  font-size: x-small;
  vertical-align: top;
}

//ダミー
tr.dummy-top {
  height: 0.5rem;
}
tr.dummy-bottom {
  height: 0.1rem;
}

// ボタン
button.clear-decoration {
  border: none; /* 枠線を消す */
  outline: none; /* クリックしたときに表示される枠線を消す */
  background: transparent; /* 背景の灰色を消す */
}

.decorated {
  cursor: pointer; /* マウスカーソルを乗せると指になる */
  outline: none;
  border: 1px solid #f00;
  background-color: rgb(255, 0, 0, 0.2);
}

.items {
  font-size: large;
}
.pr2px {
  padding-right: 2px;
}
</style>
