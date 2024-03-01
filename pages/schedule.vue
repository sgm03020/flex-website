<template>
  <v-container fluid ma-0 pa-0>
    <!--
    class="max-container mx-auto my-0 py-0"
    style="padding-left: 6px; padding-right: 6px"

  -->

    <!-- <div>{{ events }}</div> -->
    <!-- <div v-show="loading">
      <Loading />
    </div> -->
    <!-- top centered bottom -->
    <v-snackbar
      v-model="snackbar"
      color="blue-grey"
      rounded="pill"
      centered
      multi-line
      timeout="3000"
    >
      <div class="title text-center">{{ snackbarMessage }}</div>
    </v-snackbar>
    <!-- 説明 -->
    <!-- <v-row class="mx-2 mt-2 pa-0">
      <v-col class="ma-0 pa-0">
        <h3 class="d-inline-block mt-3 mb-3">On Error This Page</h3>
      </v-col>
    </v-row> -->
    <v-row v-if="1" class="mx-2 mt-2 pa-0">
      <v-col class="ma-0 pa-0">
        <h3 class="heading d-inline-block mt-3 mb-3">WEB予約スケジュール</h3>
        <!-- カレンダーの指定がテスト用である場合は以下を表示 -->
        <client-only>
          <div v-if="test !== 'none'">{{ test }}</div>
        </client-only>
        <div class="my-1">
          <v-btn
            text
            outlined
            class="h5 mt-0 mb-2 py-0"
            @click="showInfo = !showInfo"
            >{{ showInfoText }}
          </v-btn>
          <!-- <v-btn
            text
            outlined
            class="h5 mt-0 mb-2 py-0"
            @click="showAccountDialog = true"
            >メール・名前設定
          </v-btn> -->
        </div>
        <div v-show="showInfo">
          <p class="mb-0 pb-0"
            >ご利用に際して、まずメニュー右上のギアマークから「メール設定」を選択しメールアドレスと名前の設定を行ってください。</p
          >
          <p class="mt-0 pt-0"
            >予約表をご確認の上、最新の情報を取得するために「更新」ボタンを押してください。</p
          >
          <p
            >更新ボタンの色が緑に変わりましたら、〇が表示されている日時の中から希望する日時を選択します。予約確認ダイアログにてメールアドレス、および名前を再度確認してから実行ボタンを押してください。<br />
            予約を実行いたしますと、受付日時に「仮」マークが付きます。<br />
            弊社での確認が完了した時点で「仮」マークが「確」マークに変わります。</p
          >
          <p class="my-2 pb-0"> <span class="border">各アイコンの説明</span></p>
          <table class="pl-2">
            <tbody>
              <tr>
                <td>
                  <v-icon color="grey" class="grey-text text--darken-1">
                    {{ mdiCircleOutline }}
                  </v-icon>
                </td>
                <td class="pl-1">仮予約可能。</td>
              </tr>
              <tr>
                <td>
                  <v-icon color="grey" class="grey--text text--darken-3"
                    >{{ mdiClose }}
                  </v-icon>
                </td>
                <td class="pl-1">確定した予定があり予約不可。</td>
              </tr>
              <tr>
                <td>
                  <v-icon color="red" class="red--text">
                    {{ mdiClose }}
                  </v-icon>
                </td>
                <td class="pl-1">承認前の予定があり予約不可。</td>
              </tr>
              <tr>
                <td>
                  <v-avatar size="28" color="green" style="opacity: 0.6">
                    <span class="white--text subtitle-1">確</span>
                  </v-avatar>
                </td>
                <td class="pl-1">あなた様の確定予約あり。</td>
              </tr>
              <tr>
                <td>
                  <v-avatar size="28" color="red" style="opacity: 0.6">
                    <span class="white--text subtitle-1">仮</span>
                  </v-avatar>
                </td>
                <td class="pl-1">あなた様の仮予約あり。</td>
              </tr>
            </tbody>
          </table>
          <div v-if="0">
            <p class="my-0 ml-2">
              <v-icon color="grey" class="grey-text text--darken-1">
                {{ mdiCircleOutline }}
              </v-icon>
              は、仮予約可能。
            </p>
            <p class="my-0 ml-2">
              <!-- <v-icon color="green" class="green--text"> {{ mdiClose }} </v-icon> -->
              <v-icon color="grey" class="grey--text text--darken-3"
                >{{ mdiClose }} </v-icon
              >は、確定した予定があり予約不可。
            </p>
            <p class="my-0 ml-2">
              <v-icon color="red" class="red--text"> {{ mdiClose }} </v-icon
              >は、承認前の予定があり予約不可。
            </p>
            <!-- v-atatarをpタグに入れるとエラーとなる -->
            <div class="my-1 ml-2">
              <v-avatar size="28" color="green" style="opacity: 0.6">
                <span class="white--text subtitle-1">確</span>
              </v-avatar>
              は、あなた様の確定予約あり。<br />
            </div>
            <div class="ml-2">
              <v-avatar size="28" color="red" style="opacity: 0.6">
                <span class="white--text subtitle-1">仮</span>
              </v-avatar>
              は、あなた様の仮予約あり。
            </div>
          </div>
          <p class="mt-5 mb-1 py-0"
            >※予約ページからのご予約はご希望日の1日前までにお願いいたします。それ以外は電話でのご対応となります。</p
          >
          <p class="my-0 py-0"
            >※ご予約状況は照会時点での状況です。経過時間によりご予約いただけない場合がございます。</p
          >
          <p class="my-0 py-0">※</p>
          <br />
        </div>
      </v-col>
    </v-row>
    <!-- <v-container class="mx-0 px-0"> -->
    <!-- v-show="!loading" -->
    <div
      v-if="1"
      v-show="bookingTimeList && bookingTimeList.length > 0"
      style="padding-left: 6px; padding-right: 6px"
      class="mx-0 my-3 py-0"
    >
      <!-- 予約メイン画面 -->
      <!-- justify-space-between pa-2 -->
      <!-- <v-row class="justify-center text-center"> -->
      <v-row class="mx-0 mb-2 px-0 pt-0 pb-0">
        <!-- 新テーブル型(回り込ませない) -->
        <table width="100%" class="ma-0 px-0 pb-2">
          <tbody class="ma-0 pa-0">
            <tr class="ma-0 px-0 pb-2">
              <!-- nowrap(style定義)がないと回り込む -->
              <td colspan="1"> </td>
              <td colspan="3" class="pb-2">
                <v-btn
                  block
                  @click="updateContents"
                  :color="intervalID ? 'success' : 'warning'"
                  >{{ intervalID ? '更新中' : '更新' }}</v-btn
                >
              </td>
              <td colspan="1"> </td>
            </tr>
            <tr class="ma-0 pa-0">
              <!-- nowrap(style定義)がないと回り込む -->
              <td class="nowrap">
                <v-btn block class="grey lighten-2" @click="updateStartDay(-7)"
                  >前週</v-btn
                >
              </td>
              <td class="px-1">
                <v-btn block class="grey lighten-2" @click="updateStartDay(-1)"
                  >前</v-btn
                >
              </td>
              <td class="nowrap" width="4%">
                <!-- <v-btn
                  small
                  @click="updateContents"
                  :color="intervalID ? 'success' : 'warning'"
                  >{{ intervalID ? '更新中' : '更新' }}</v-btn
                > -->
              </td>
              <td class="px-1">
                <v-btn
                  block
                  class="grey lighten-2"
                  @click="updateStartDay(1) && (snackbar = true)"
                  >次</v-btn
                >
              </td>
              <td class="nowrap">
                <v-btn block class="grey lighten-2" @click="updateStartDay(7)"
                  >次週</v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </v-row>

      <!-- 旧 回り込みさせない(nowrap)うまく行かない(できた) -->
      <!-- flex-nowrapを使うとOK -->
      <!-- テーブルを使わず同じような表示完成 -->
      <v-row v-if="0" class="mx-0 mt-1 mb-2 pa-0">
        <v-col cols="undefined" class="my-0 py-0" />
        <v-col cols="8" class="my-0 py-0">
          <v-btn
            block
            @click="updateContents"
            :color="intervalID ? 'success' : 'warning'"
            >{{ intervalID ? '更新中' : '更新' }}</v-btn
          >
        </v-col>
        <v-col cols="undefined" class="my-0 py-0" />
      </v-row>
      <v-row v-if="0" class="mx-1 mt-0 mb-3 pa-0">
        <v-col cols="6" class="mx-auto my-0 py-0 flex-nowrap">
          <v-row class="my-0 py-0 flex-nowrap text-center" justify="center">
            <v-col cols="6" class="mx-auto my-0 px-0 py-0 flex-nowrap">
              <v-btn block class="grey lighten-2" @click="updateStartDay(-7)"
                >前週</v-btn
              >
            </v-col>
            <v-col cols="5" class="mx-auto my-0 px-1 py-0 flex-nowrap">
              <v-btn block class="grey lighten-2" @click="updateStartDay(-1)"
                >前</v-btn
              >
            </v-col>
            <v-col cols="1" class="mx-auto my-0 py-0 flex-nowrap"> </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="mx-auto my-0 py-0 flex-nowrap">
          <v-row class="my-0 py-0 flex-nowrap text-center" justify="center">
            <v-col cols="1" class="mx-auto my-0 px-0 py-0 flex-nowrap"> </v-col>
            <v-col cols="5" class="mx-auto my-0 px-1 py-0 flex-nowrap">
              <v-btn
                block
                class="grey lighten-2"
                @click="updateStartDay(1) && (snackbar = true)"
                >次</v-btn
              >
            </v-col>
            <v-col cols="6" class="mx-auto my-0 px-0 py-0 flex-nowrap">
              <v-btn block class="grey lighten-2" @click="updateStartDay(7)"
                >次週</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- <v-col cols="3" class="my-0 py-0">
          </v-col>
          <v-col cols="3" class="my-0 py-0">
          </v-col>
          <v-col cols="undefined" class="my-0 py-0" />
          <v-col cols="3" class="my-0 py-0">
          </v-col>
          <v-col cols="3" class="my-0 py-0">
          </v-col> -->
      <v-row v-if="0" class="flex-nowrap">
        <v-col cols="5" class="px-0 d-inline-block">
          <v-btn @click="updateStartDay(-7)">前週</v-btn>
          <v-btn @click="updateStartDay(-1)">前</v-btn>
        </v-col>
        <v-col cols="2" class="text-center px-0 d-inline-block">
          <!-- :disabled="intervalID !== null" -->
          <v-btn
            small
            @click="updateContents"
            :color="intervalID ? 'success' : 'warning'"
            >{{ intervalID ? '更新中' : '更新' }}</v-btn
          >
        </v-col>
        <v-col cols="5" class="text-right px-0 d-inline-block">
          <!-- <v-btn @click="snackbar = true">ON</v-btn> -->
          <v-btn @click="updateStartDay(1) && (snackbar = true)">次</v-btn>
          <v-btn @click="updateStartDay(7)">次週</v-btn>
        </v-col>
      </v-row>
      <!--             -->
      <!-- 予約テーブル -->
      <!--             -->
      <v-row v-if="1" class="mx-0 mt-0 mb-4 px-0 py-0">
        <!-- closeDays (曜日指定の休業日) -->
        <!-- holidayList (祝日のリスト) -->
        <!-- <div v-if="days && days.length > 0">{{ days[days.length - 1].cnt }}</div> -->
        <!--
          v-if="
            start &&
            baseHours &&
            baseHours.length > 0 &&
            timePeriod &&
            bookingTimeList &&
            bookingTimeList.length > 0 &&
            days &&
            days.length > 0
          "
        -->
        <WeeklyRawTable
          v-if="bookingTimeList && bookingTimeList.length > 0"
          style="width: 100%"
          :baseHours="baseHours"
          :timePeriod="timePeriod"
          :ymcount="days[days.length - 1].cnt || 7"
          :days="days"
          :timeList="bookingTimeList"
          :events="events"
          :myEvents="myEvents"
          :email="user.email"
          :upTime="upTime"
          :closeDays="[0]"
          :holidayList="holidayList"
          @select="checkUpdate($event)"
          @setLoading="setLoading"
        />
        <!-- <v-form @submit.prevent="submit">
        <v-text-field
          placeholder="ここにフォーカスして Enter キーを押すとリロードされます。"
        ></v-text-field>
        <v-btn color="primary" @click="submit">提出</v-btn>
      </v-form> -->
      </v-row>
      <!-- 2. 確認画面用 -->
      <v-dialog v-model="confirm">
        <!-- <template>
        <v-card outlined class="justify-center text-center">
          <v-row class="mx-0 my-0">
            <v-col>
            <span class="headline">予約確認</span>
            </v-col>
          </v-row>
        </v-card>
      </template> -->
        <!-- 以下v-containerに入れた方が安定する -->
        <!-- v-text-fieldのoutlinedでフォーカスすると微妙に広がり -->
        <!-- x軸方向に伸びたり縮んだりを繰り返す -->
        <!-- { time: 50, name: '50分コース(コースプラン・月額プランの一般)' },
              { time: 25, name: '25分コース(月額プランのシルバー)' }, -->

        <v-container class="ma-0 pa-0">
          <!-- disabledCourse -->
          <dialog-confirm
            v-if="confirm"
            title="予約確認"
            button-message="OK"
            :message="message"
            :bookingTime="bookingStartTime"
            :isSubmitting="isSubmitting"
            :email="email"
            :name="name"
            :course="[
              {
                time: 50,
                name: '50分',
                desc: '(コース/月額プラン一般/都度)',
              },
              { time: 25, name: '25分', desc: '(月額プランのシルバー)' },
            ]"
            :selectableCourse="selectableCourse"
            @submit="submit"
            @cancel="cancel"
            disabledCourse
          ></dialog-confirm>
        </v-container>
      </v-dialog>
    </div>
    <div
      v-show="bookingTimeList && bookingTimeList.length > 0"
      class="ma-0 pa-0 black containter--fluid"
    >
      <Footer telNumber="090-1829-7194" stopImage />
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// ロケール日本で月曜スタートになっていないために使う
import updateLocale from 'dayjs/plugin/updateLocale'
import WeeklyRawTable from '@/components/WeeklyRawTable'
import DialogConfirm from '@/components/DialogConfirm'
import timer from '~/mixins/utils/timer.js'
import Loading from '@/components/Loading'
import Footer from '@/components/Footer'
import { mdiClose, mdiCircleOutline } from '@mdi/js'

export default {
  components: { WeeklyRawTable },
  // 停止中
  // middleware: 'getevents',
  mixins: [timer],
  head() {
    return {
      title: '予約ページ',
    }
  },
  data() {
    return {
      loading: true,
      confirm: false,
      snackbar: false,
      // ボタン操作(prev, next) -> startの更新 -> days更新 -> bookingTimeList更新
      start: null,
      days: null,
      // baseHours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      // timePeriod: 60,
      // events: null,
      baseHours: null,
      timePeriod: null,
      bookingTimeList: null,
      bookingStartTime: null,
      bookingEndTime: null,
      user: {
        email: null,
        name: null,
      },
      isSubmitting: false,
      message: '',
      snackbarMessage: '仮予約が成功しました。',
      mdiClose,
      mdiCircleOutline,
      showInfo: false,
      showAccountDialog: false,
      selectableCourse: 2, // 選択可能なコース 2で50分OK 1で30分 OK -1 で両方不可
      holidayList: [],
      // shedule起動日時
      upDate: this.$dayjs().format('YYYY-MM-DD'),
    }
  },
  async asyncData({ app }) {
    // const posts = await app.$axios.$post('http://localhost:3000/api/post', {
    //   params: { test: 'オウム返し' },
    // })
    // console.log(posts)
    // const events = await app.$axios.$get('http://localhost:3000/api/events')
    // const events = await app.$axios.$get('/api/events')
    // console.log(events)
  },
  computed: {
    // 1) 通常の書き方
    // ...mapState({
    //   events: (state) => state.calendar.events,
    // }),
    // 2) モジュール毎にまとめて書く方法
    ...mapGetters('calendar', ['config', 'events', 'myEvents']),
    ...mapGetters('users', ['email', 'name']),
    // 説明表示ボタンのテキスト
    showInfoText() {
      if (this.showInfo) return '説明を閉じる'
      else return '説明を表示する'
    },
    test: {
      // getter
      get: function () {
        if (process.client) {
          if (process.env.CALENDAR_TEST) {
            return 'テスト用カレンダー'
          } else return 'none'
        }
        return 'none'
      },
      // setter
      set: function (newValue) {},
    },
  },
  watch: {
    intervalEventsID: function (newID, oldID) {
      //
    },
    // 新規追加(余計な動作しないか要確認)
    email: async function (newEmail, oldEmail) {
      if (newEmail !== oldEmail) {
        this.user.email = newEmail
        // WeeklyRawTable.vueではcheckArrayの再計算をしたい
        // => 現在の仕様ではeventsにemailの情報がないため無意味である
        // updateEvents()を再度呼ぶ必要がある
        // 修正
        this.updateEvents()
      }
    },
    start: async function (newValue) {
      // days配列更新 => bookingTimeList更新
      // console.log('watch start change:', newValue)
      // console.log('watch start this.config: ', this.config)
      this.days = await this.$updateDays(newValue)
      if (this.baseHours && this.timePeriod && this.days)
        this.bookingTimeList = await this.$createBookingTimeList(
          this.days,
          this.baseHours,
          this.timePeriod
        )
      // console.log('this.days: ', this.days)
      // console.log('this.bookingTimeList: ', this.bookingTimeList)
      // console.log('cnt ', this.days[this.days.length - 1].cnt)
      // ここで updateEventsを呼ぶかどうか検討する
      setTimeout(() => {
        // this.updateEvents()
      }, 1000)
    },
    // configがcomputedのmapGettersにあり、さらにここで監視する
    config: {
      immediate: true,
      handler: async function (newValue, oldValue) {
        // console.log('watch config change:', newValue)
        this.baseHours = newValue.baseHours
        // テスト
        // this.timePeriod = newValue.timePeriod
        // this.timePeriod = 30
        // 現在 60分固定
        this.timePeriod = 60
        // 一旦配列クリア
        this.bookingTimeList?.splice(0, this.bookingTimeList.length)
        // 配列更新
        if (this.baseHours && this.timePeriod && this.days)
          this.bookingTimeList = await this.$createBookingTimeList(
            this.days,
            this.baseHours,
            this.timePeriod
          )
      },
      deep: true,
    },
    // eventsをwatchへ加える
    // events instanceof Array
    events: {
      immediate: true,
      handler: async function (newEvents, oldEvents) {
        if (newEvents instanceof Array) {
          console.log('newEvents: ', newEvents)
          // console.log('this.loading = false')
          // this.loading = false
        }
      },
      deep: true,
    },
  },
  mounted() {
    console.log('schedule.vue mounted')
    console.log('this.$axios.defaults.baseURL: ', this.$axios.defaults.baseURL)

    setTimeout(() => {
      this.loading = false
      this.$nuxt.$emit('stopLoading', true)
    }, 5000)
    // localStorageに保存されているemailをストア経由持って来るのだが
    // そのままthis.user.email = this.emailとしても持ってこれない
    // https://qiita.com/sskmy1024y/items/25b98147ce998504d511
    // http://aligach.net/diary/20180608.html
    setTimeout(async () => {
      // 反映されるのを待ってから実行
      // 初期処理
      // email
      if (this.email && this.email !== '') {
        this.user.email = this.email
        this.user.name = this.name
      }
      console.log('process.env.API_URL: ', process.env.API_URL)
      // console.log('this.email: ', this.email)
      // マウント時にconfig再取得
      this.updateConfig()
      // マウント時にevents再取得
      const ret = await this.updateEvents() // retはlength
      // if (ret) this.loading = false
      // console.log('mounted called updateConfig updateEvents')
      // console.log('call this.getHolidays()')
      this.getHolidays()
    }, 0)

    // console.log('NODE_ENV=', process.env.NODE_ENV)
    // console.log('process.env.baseUrl: ', process.env.baseUrl)
    // console.log('axios defaults.baseURL: ', this.$axios.defaults.baseURL)
    this.start = this.$dayjs()
    // タイマー1分(カレンダーイベント反映)
    // 2021.1.21 複数のcallbackを渡すように改修
    // this.setTimer([this.updateConfig, this.updateEvents], 1 * 60 * 1000)
    // 秒単位 20秒へ変更
    const interval = process.env.INTERVAL || 20
    this.setTimer([this.updateEvents], interval * 1000)
    console.log('this.intervalID', this.intervalID)
  },
  methods: {
    ...mapMutations('calendar', ['setEvents']),
    ...mapMutations('users', ['setEmail', 'setName']),
    ...mapActions('calendar', ['initEvents', 'updateEvents', 'updateConfig']),
    //
    updateStartDay(mode) {
      if (mode === undefined) mode = 1
      if (mode > 0) {
        this.start = this.start.add(mode, 'day')
      }
      if (mode < 0) {
        this.start = this.start.subtract(-mode, 'day')
      }
    },
    weeklyUpdate(mode) {
      return
    },
    // [1, 2, 3, 4, 5, 6, 7, 8,]
    // [[1, 2, 3, 4], [5, 6, 7, 8]]
    //
    listToMatrix(list, elementsPerSubArray) {
      let matrix = [],
        k,
        i
      for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
          k++
          matrix[k] = []
        }
        matrix[k].push(list[i * 3 + k])
      }
      return matrix
    },
    toMatrix(arr, width) {
      return arr.reduce(
        (rows, key, index) =>
          (index % width == 0
            ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows,
        []
      )
    },
    // 予約状況の元データ最新取得
    async updateContents() {
      const ret = await this.updateEvents()
      const interval = process.env.INTERVAL || 1
      // events更新
      if (!this.intervalID && ret >= 0) {
        this.setTimer([this.updateEvents], interval * 60 * 1000)
      }
      //  日付が変わった場合のみ
      //  holidayList更新
      if (this.upDate !== this.$dayjs().format('YYYY-MM-DD')) {
        // upDate更新
        try {
          await this.getHolidays()
          this.upDate = this.$dayjs().format('YYYY-MM-DD')
        } catch (err) {
          console.log('updateContents err:', err)
        }
      }
    },
    setLoading(flag) {
      console.log('setLoading')
      this.loading = flag
    },
    // 予約前・更新確認
    checkUpdate(event) {
      // 更新中であればそのまま予約確認画面を表示する
      if (this.intervalID) {
        this.doConfirm(event)
      } else {
        // 更新を催すメッセージを表示する
        this.snackbarMessage = '更新ボタンを押してください'
        this.snackbar = true
      }
    },
    // 確認画面オープン
    doConfirm(event) {
      // event: 選択日時(文字列)
      //        2020/09/22 9:00
      // ここで担当者情報を付加して遷移
      // console.log('doConfirm event=', event)
      // +09:00が付いていないため一旦dayjsにする
      // メッセージクリア
      this.message = ''
      // 開始時間
      let start = this.$dayjs(event).format()
      // 終了時間を計算する
      // デフォルトで60分とする
      // let endTime = this.$dayjs(event).add(60, 'm').format()
      // 2021.7.8 75分へ変更 -> 再度 60分へ戻す
      let endTime = this.$dayjs(event).add(60, 'm').format()
      this.bookingStartTime = start
      this.bookingEndTime = endTime

      // 次の時間帯に予約があるかないか？
      // 1時間以内にある場合は、50分コースが不可となる
      this.checkEndTime(start)

      // 確認画面オープン
      this.confirm = true
    },
    // 追加
    checkEndTime(starttime) {
      // starttimeは希望開始時刻
      // 50分コース、25分コースの場合 (計算上は60分、30分とする)
      let ret = 2
      let endtime1 = this.$dayjs(starttime).add(60, 'm')
      let endtime2 = this.$dayjs(starttime).add(30, 'm')
      for (let i = 0; i < this.events.length; i++) {
        const item = this.events[i]
        // console.log('item: ', item)
        const stime = this.$dayjs(item.start.dateTime) || null
        const etime = this.$dayjs(item.end.dateTime) || null
        //
        if (!(etime <= this.$dayjs(starttime) || stime >= endtime1)) {
          // console.log('starttime: ', starttime)
          // console.log('endtime1: ', endtime1.format())
          // console.log('stime: ', stime.format())
          // console.log('etime: ', etime.format())

          // 60分のみアウト
          ret = 1
        } else if (!(etime <= this.$dayjs(starttime) || stime >= endtime2)) {
          // 30分アウト
          ret = -1
          break
        }
      }
      console.log('ret: ', ret)
      // 可能なコース
      this.selectableCourse = ret
    },
    // 予約実行
    // doBooking() {
    //   console.log('doBooking')
    //   this.confirm = false
    // },
    async submit(params) {
      // https://qiita.com/aLiz/items/a6c460c02670ba8964bf
      // console.log('schedule submit')
      // 構造変更 user -> params ({user, sessionTime})
      const { user, sessionTime } = params

      // テスト用のカレンダーを使うかどうか
      let test = false
      if (process.env.CALENDAR_TEST) test = true
      if (process.env.CALENDAR === 'test') test = true

      // メッセージクリア
      this.message = ''
      // ボタンをdisableにする
      this.isSubmitting = true
      if (!this.bookingStartTime || !this.bookingEndTime) {
        // alert('Error')
        return
      }
      // 引数にemailがあれば、上書き
      if (user && user.email && user.email !== '') this.user.email = user.email
      // console.log('this.user.email: ', this.user.email)
      // 引数にnameがあれば、上書き
      if (user && user.name && user.name !== '') this.user.name = user.name

      // メールアドレスの確認(基本有料サービス)
      // const mailVerify = await this.$axios.get('/api/verify', {
      //   addr: this.user.email,
      // })
      // console.log('mailVerify:',  mailVerify)
      // return
      //
      // コースにより、終了時間を変更する
      // 追加 endTime再計算
      let endTime
      if (sessionTime > 0 && sessionTime < 30) {
        // 現在の開始時間を元に終了時刻を再計算
        endTime = this.$dayjs(this.bookingStartTime).add(30, 'm').format()
      } else if (sessionTime > 30 && sessionTime < 60) {
        endTime = this.$dayjs(this.bookingStartTime).add(50, 'm').format()
      }
      if (endTime) this.bookingEndTime = endTime
      // console.log('this.bookingStartTime:', this.bookingStartTime)
      // console.log('this.bookingEndTime:', this.bookingEndTime)

      const body = {
        email: this.user.email,
        name: this.user.name,
        start: this.bookingStartTime,
        end: this.bookingEndTime,
        ...((test && { test: true }) || {}),
        // test: true,
      }
      let postUrl = '/api/addEvents'
      // let postUrl = '/api/events'
      // post eventsの戻り ...{... { data: {result: true or false}}}
      // jsonを送信する場合はheadersは使わなくてよい(デフォルトでjson)
      // また、application/x-www-form-urlencodedで送りたい場合は、
      // URLSearchParamsを使う
      const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'text/plain',
        // 'Access-Control-Allow-Origin': '*',
      }

      // API_URL_SLAVE対応
      // if (process.env.API_URL_SLAVE && process.env.API_URL_SLAVE !== '') {
      //   postUrl = process.env.API_URL_SLAVE + '/api/addEvents';
      // }
      // return
      try {
        console.log('postUrl: ', postUrl)
        // const { data: postResult } = await this.$axios.post(postUrl, data, { headers })
        const { data: postResult } = await this.$axios.post(postUrl, body)
        console.log('postResult: ', postResult)
        if (postResult.result === 'success') {
          // 成功メッセージ
          this.snackbarMessage = '仮予約が成功しました。'
          this.snackbar = true

          // emailを保存(ストアからlocalStorageにも保存)
          if (this.email !== this.user.email) this.setEmail(this.user.email)
          if (this.name !== this.user.name) this.setName(this.user.name)

          // イベント再取得
          // this.$store.dispatch('calendar/updateEvents')
          let count = await this.updateEvents()
          // console.log('count: ', count)
          // 確認画面クローズ
          this.confirm = false
          this.isSubmitting = false
        } else {
          // 予約エラー
          this.message = '仮予約が失敗しました。'
          this.isSubmitting = false
        }
      } catch (err) {
        console.log('err: ', err)
        this.message = '仮予約が失敗しました。'
        this.isSubmitting = false
      }

      //
    },
    cancel() {
      // console.log('cancel')
      // メッセージクリア
      this.message = ''
      // 確認画面クローズ
      this.confirm = false
    },
    // Google Holidays Calendar を通して、
    // 祝日の情報を取得する
    async getHolidays() {
      let url = '/api/getHolidays'
      const result = await this.$axios.get(url)
      // console.log('getHolidays result: ', result)
      if (result && result.data && result.data.length > 0) {
        this.holidayList = result.data
        // console.log('this.holidayList: ', this.holidayList)
      }
    },
    test() {
      let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      let b = this.listToMatrix(a, 4)
      console.log('b', b)
      let c = this.toMatrix(a, 4)
      console.log('c', c)
      console.log('a', a)
    },
  },
}
</script>

<style scoped>
/* div {
  display: inline-block;
  _display: inline;
} */
.nowrap {
  white-space: nowrap;
}
.heading {
  border-left: 6px solid #aaa;
  padding: 0 0 0 10px;
}
.border {
  border: 1px solid #666;
  border-radius: 10px;
  /* padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 6px;
  padding-right: 6px; */
  padding: 2px 10px;
}
</style>
