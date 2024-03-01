<template>
  <v-app dark>
    <!-- fixed -->
    <v-navigation-drawer
      disable-resize-watcher
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
      :src="require('@/assets/images/bg-min.jpg')"
      dark
    >
      <v-list>
        <!-- 通常は以下を入れる -->
        <!-- :to="{ path: item.to, hash: item.hash || '' }" -->
        <!-- @click.native.stop="handleScroll(item.to, item.hash)" -->
        <!-- 予約を外部リンクへ向ける場合は以下 -->
        <!-- @click.native.stop="handleNavItemClick(item)" -->
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="{ path: item.to, hash: item.hash || '' }"
          @click.native.stop="handleScroll(item.to, item.hash)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <div class="ma-0 pa-0 white--text text-center blue-grey darken-3">
        <span class="caption ma-0 pa-0"
          >電話でのお問い合わせ（13時～22時）<br />
        </span>
        <v-btn
          depressed
          outlined
          color="primary"
          :href="`tel:${telNumber}`"
          class="h4 font-weight-bold mt-2 mb-3"
          >{{ telNumber }}</v-btn
        >
      </div> -->
    </v-navigation-drawer>
    <!-- 2) v-app-bar -->
    <!-- prominent -->
    <v-app-bar v-if="1" fixed app height="96" class="ma-0 pa-0">
      <div style="width: 100%">
        <!--  -->
        <v-row
          style="height: 50px"
          justify="center"
          align="center"
          align-content="center"
          class="ma-0 px-1 py-1 blue-grey darken-4"
        >
          <!-- ロゴ -->
          <!-- <img
            height="34px"
            :src="require('~/assets/images/logos/footer_id.png')"
            style="opacity: 0.2"
            class="ml-1"
          /> -->
          <img
            v-if="1"
            height="48px"
            :src="require('~/assets/images/logos/top_logo.png')"
            style="opacity: 1"
            class="ml-2"
          />
          <!-- 右寄りにする -->
          <!-- <v-spacer /> -->
          <!-- <div class="white--text mr-3 d-none d-md-block"> -->
          <!-- （13時～21時） -->
          <!-- $vuetify.breakpoint.mdAndUp -->
          <!-- {{ enabledSchedule }} -->
          <!-- {{ email }} -->
          <!--
          <div v-show="!enabledSchedule" class="white--text mr-3">
            <span class="caption my-0 pt-1">電話でのお問い合わせ<br /> </span
            ><span class="h5 font-weight-bold">090-1829-7194</span>
          </div>
          -->
          <v-spacer />
          <div v-show="!enabledSchedule" class="white--text mr-3">
            <span class="caption my-0 pt-1">電話でのお問い合わせ<br /> </span
            ><span class="h5 font-weight-bold">090-1829-7194</span>
          </div>
          <!-- 予約ボタン等 -->
          <!-- 暫定処置 -->
          <!-- 元のコード to="/schedule" -->
          <!-- 外部のサイトdpc2などへ飛ばす場合は以下を入れること -->
          <!-- @click="externalScheduleLink" -->
          <v-btn
            v-show="enabledSchedule"
            rounded
            class="btn-danger"
            to="/schedule"
          >
            <span
              style="font-size: 1.2rem"
              class="px-1 grey--text text--lighten-3 font-weight-bold"
              >Web予約</span
            >
          </v-btn>
          <v-btn
            v-show="$route.path.replace(/\/$/, '') === '/schedule'"
            to="/"
            rounded
            color="primary"
          >
            <span
              style="font-size: 1.2rem"
              class="px-1 grey--text text--lighten-3 font-weight-bold"
              >ホーム</span
            >
          </v-btn>
        </v-row>
        <!-- background-color: blue-rey -->
        <!-- classにalign-centerを追加 -->
        <!-- グラデーションテスト -->
        <v-row v-if="0" style="height: 46px" class="ma-0 pa-0">
          <div class="bg"></div>
        </v-row>
        <!-- 現在使用中(bg 検討) -->
        <v-row
          v-if="1"
          style="height: 46px"
          justify="space-between"
          align-content="center"
          align="center"
          class="ma-0 px-4 py-1 blue-grey lighten-1 align-center bg"
        >
          <!-- 1) メニューアイコン -->
          <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            <!-- <v-icon large class="white--text text--lighten-2">{{ mdiMenu }}</v-icon> -->
            <v-icon x-large class="">{{ mdiMenu }}</v-icon>
          </v-app-bar-nav-icon>
          <!-- 2) タイトル -->
          <!-- style="font-size: 1.8rem !important" -->
          <!-- my-autoで縦がセンターされた -->
          <!-- v-text="title"となっていたが、- Over Road - で固定する -->
          <v-toolbar-title
            style="vertical-align: middle"
            class="h4 white--text text--darken-1 font-weight-bold px-2 my-auto font-italic"
            v-text="'- Over Road -'"
          />
          <!-- - Over Road - -->
          <!-- 3) 設定アイコン -->
          <v-btn icon @click.stop="rightDrawer = !rightDrawer">
            <v-icon x-large>{{ mdiCog }}</v-icon>
          </v-btn>
        </v-row>
        <v-row
          v-if="0"
          style="height: 46px"
          justify="space-between"
          align-content="center"
          class="ma-0 px-1 py-1 blue-grey lighten-1 align-center"
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            <v-icon>{{ mdiMenu }}</v-icon>
          </v-app-bar-nav-icon>
          <!-- 1) -->
          <!-- class="blue-grey--text text--darken-1 -->
          <v-toolbar-title
            style="font-size: 1.8rem !important"
            class="white--text text--darken-1 font-weight-bold font-italic px-2"
            v-text="title"
          />
          <v-btn icon @click.stop="rightDrawer = !rightDrawer">
            <v-icon>{{ mdiCog }}</v-icon>
          </v-btn>

          <!-- line2  -->
          <!-- <v-col cols="12" class="mx-0 px-0 offset">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
              <v-icon>{{ mdiMenu }}</v-icon>
            </v-app-bar-nav-icon>
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
              <v-icon>{{ mdiMenu }}</v-icon>
            </v-btn>
          </v-col> -->
        </v-row>
      </div>
    </v-app-bar>
    <v-main>
      <div v-show="loading" class="ma-2 pa-2">
        Loading...
        <Loading />
      </div>
      <!-- ma-0 pa-0にて枠一杯 -->
      <!-- https://stackoverflow.com/questions/51181726/vuetify-container-max-width-fixed -->
      <!-- <v-container v-show="!loading" fluid ma-0 pa-0 fill-height> -->
      <v-container v-show="!loading" fluid ma-0 pa-0>
        <!-- 2. 確認画面用 -->
        <v-dialog v-model="isSetAccount">
          <v-container>
            <dialog-account
              v-if="isSetAccount"
              title="メール・名前設定"
              button-message="OK"
              :message="message"
              :isSubmitting="false"
              :email="email"
              :name="name"
              @submit="submit"
              @cancel="isSetAccount = !isSetAccount"
            ></dialog-account>
          </v-container>
        </v-dialog>
        <transition name="page">
          <nuxt />
        </transition>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
      <v-list>
        <v-list-item class="v-list-item--link" @click.native="setAccount()">
          <v-list-item-action>
            <!-- <v-icon light> mdi-mail </v-icon> -->
            <v-icon light> {{ mdiMail }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>メール設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      :absolute="!fixed"
      app
      class="justify-center content-center text-center"
    >
      <!-- <span class="caption">&copy; {{ new Date().getFullYear() }} OVER ROAD All Rights Reserved.</span> -->
      <span class="caption">&copy; 2021 OVER ROAD All Rights Reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import DialogAccount from '@/components/DialogAccount'
import Loading from '@/components/Loading'
import {
  mdiApps,
  mdiChartBubble,
  mdiFileClockOutline,
  mdiCalendar,
  mdiChevronRight,
  mdiChevronLeft,
  mdiMenu,
  mdiMail,
  mdiCog,
  mdiCogOutline,
  mdiAccountBox,
  mdiImageAlbum,
  mdiTrainCar,
  mdiFormatListBulletedSquare,
  mdiArmFlex,
  mdiPen,
  mdiContacts,
} from '@mdi/js'

export default {
  data() {
    return {
      // gradient 現在未使用
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      mdiChevronRight,
      mdiChevronLeft,
      mdiMenu,
      mdiMail,
      mdiCog,
      mdiCogOutline,
      mdiAccountBox,
      mdiImageAlbum,
      mdiTrainCar,
      mdiArmFlex,
      mdiFormatListBulletedSquare,
      mdiPen,
      mdiContacts,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: mdiApps, //'mdi-apps',
          title: 'ホーム',
          to: '/',
        },
        {
          icon: mdiArmFlex,
          title: 'お知らせ',
          to: '/',
          hash: 'sec7',
        },
        {
          icon: mdiPen,
          title: '体験談',
          // to: "{ path:'/main', hash:'#exp' }",
          to: '/',
          hash: 'exp',
        },
        {
          icon: mdiImageAlbum, //'mdi-chart-bubble',
          title: 'ギャラリー',
          to: '/',
          hash: 'facilities',
        },
        {
          icon: mdiAccountBox,
          title: 'プロフィール',
          to: '/',
          hash: 'profile',
        },
        {
          icon: mdiFormatListBulletedSquare,
          title: '料金',
          to: '/',
          hash: 'pricelist',
        },
        {
          icon: mdiContacts,
          title: 'お問い合わせ',
          to: '/contact',
          hash: null,
        },
        {
          icon: mdiTrainCar, //'mdi-chart-bubble',
          title: 'アクセス',
          to: '/',
          hash: 'access',
        },
        // {
        //   icon: mdiChartBubble, //'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
        // {
        //   icon: mdiChartBubble, //'mdi-chart-bubble',
        //   title: 'Speed',
        //   to: '/speed',
        // },
        // 停止中
        // {
        //   icon: mdiFileClockOutline, //'mdi-file-clock-outline',
        //   title: '予約',
        //   to: '/schedule',
        // },
        // {
        //   icon: mdiCalendar, //'mdi-calendar',
        //   title: 'カレンダー',
        //   to: '/calendar',
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '',
      isSetAccount: false,
      message: '',
      loading: false, //true,
      telNumber: '090-1829-7194',
    }
  },
  // nuxt generate対策
  // layoutsではasyncData({ route })は使えない
  // https://qiita.com/ihcamonoihS/items/29b7c7fd0174eb5fc3ee
  // watch: {
  //   $route: function (to, from) {
  //     console.log('to.path: ', to.path, ' from.path: ', from.path)
  //     if (to.hash && to.hash !== '') console.log('to.hash: ', to.hash)
  //     // 遷移元と遷移先のパスが違った場合に発火する
  //     if (to.path !== from.path) {
  //       let ret = '- Over Road -'
  //       // 末尾が'/'の場合は削除
  //       switch (to.path.replace(/\/$/, '')) {
  //         case '/schedule':
  //           this.loading = true
  //           ret = 'WEB予約スケジュール'
  //           break
  //         case '/calendar':
  //           ret = 'カレンダー'
  //           break
  //         default:
  //           this.loading = false
  //           break
  //       }
  //       this.title = ret
  //     }
  //   },
  // },
  computed: {
    ...mapGetters('users', ['email', 'name']),
    // 以下でツールバーのタイトルをページ毎に変える
    // nuxt generate 時にはcomputedだけでは対応できないため
    // やり方を変えた
    //
    // watchはクライアント時
    // title: function () {
    //   let ret = "OVER ROAD Page's"
    //   console.log('this.$route: ', this.$route?.path)
    //   switch (this.$route.path) {
    //     case '/schedule':
    //       ret = 'パーソナル予約ページ'
    //       break
    //   }
    //   return ret
    // },
    enabledSchedule: {
      // getter
      get: function () {
        if (process.client) {
          // if (process.env.SCHEDULE_ALWAYS) {
          // }
          // return process.env.SCHEDULE_ALWAYS
          if (
            process.env.SCHEDULE_ALWAYS &&
            this.$route.path.replace(/\/$/, '') !== '/schedule'
          ) {
            return true
          } else {
            if (
              this.email &&
              this.email !== '' &&
              this.$route.path.replace(/\/$/, '') !== '/schedule'
            ) {
              return true
            }
            return false
          }
        }
        return false
      },
      // setter
      set: function (newValue) {},
    },
  },
  created() {
    // nuxt generate(full static)時にツールバーのタイトルを
    // 変更するための処理
    console.log('default.vue created')
    console.log('this.$route: ', this.$route?.path)
  },
  created() {
    this.setListener()
  },
  mounted() {
    console.log('default.vue mounted')
    console.log('this.$route: ', this.$route?.path)
    if (this.$route.path.replace(/\/$/, '') === '/schedule') {
      this.loading = true
    } else {
      this.loading = false
    }
    // AppBarタイトル
    this.setAppBarTitle()

    // 3秒でloadingは停止させる
    // setTimeout(() => {
    //   this.loading = false
    // }, 3000)

    // hash位置までスクロールする処理を追加
    // vue-scrollを使う場合
    // const hash = this.$route.hash
    // if (hash && hash.match(/^#.+$/)) {
    //   this.$scrollTo(hash)
    // }
  },
  methods: {
    ...mapMutations('users', ['setEmail', 'setName']),
    setListener() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on('stopLoading', this.stopLoading)
    },
    setAccount() {
      this.isSetAccount = true
      this.rightDrawer = false
    },
    async submit(user) {
      // if (user?.email) await this.setEmail(user.email)
      // if (user?.name) await this.setName(user.name)
      // 空でも登録するようにした
      await this.setEmail(user.email)
      await this.setName(user.name)
      setTimeout(() => {
        this.isSetAccount = false
        this.rightDrawer = false
      }, 100)
    },
    stopLoading() {
      console.log('stopLoading')
      this.loading = false
    },
    setAppBarTitle() {
      // AppBar タイトル
      let ret = '- Over Road -'
      switch (this.$route.path.replace(/\/$/, '')) {
        case '/schedule':
          ret = 'WEB予約スケジュール'
          break
        case '/calendar':
          ret = 'カレンダー'
          break
      }
      this.title = ret
      // 他のサイトでは、ヘッダーをコンポーネント化して
      // ページ側からemitを使い変更している
      // https://qiita.com/yama-t/items/b051cd9ea802f69da118
      // this.setListener()
    },
    handleScroll(toPath, anchorId) {
      console.log('now:', this.$route.path, ' toPath: ', toPath)
      // /scheduleの場合は、外部へ飛ぶ
      // ここから
      // if (toPath === '/schedule' || toPath === '/schedule/') {
      //   this.externalScheduleLink()
      //   return
      // }
      // ここまで
      if (this.$route.path !== toPath) {
        console.log('default.vue another path: ', toPath)
      } else if (this.$route.hash) {
        console.log('default.vue handleScroll: ', anchorId)
        const anchor = document.querySelector(`#${anchorId}`)
        // 別の方法
        // document.querySelector("[id='22']")

        // Check if the anchor has been found
        console.log('default.vue window.pageYOffset: ', window.pageYOffset)
        const offset = 80
        // window.pageYOffsetは0ぽいので適当に -80 とする
        if (anchor) {
          window.scrollTo({
            // Scroll so that the anchor is at the top of the view
            // top: anchor.getBoundingClientRect().top + window.pageYOffset,
            top:
              anchor.getBoundingClientRect().top + window.pageYOffset + -offset,
          })
        }
      } else {
        // 追加 (hashなしの同じパスの場合)
        // 先頭へジャンプ
        window.scrollTo({
          // Scroll so that the anchor is at the top of the view
          // top: anchor.getBoundingClientRect().top + window.pageYOffset,
          top: 0,
        })
      }
      // 追加
      // メニューを閉じる
      this.drawer = false
      return
    },
    // 予約を外部リンクへ向ける
    externalScheduleLink() {
      const url = 'https://dpc2.net/test/schedule'
      window.location.href = url
    },
    // 暫定処置
    // /scheduleの場合は外部リンクへ飛ぶ
    handleNavItemClick(item) {
      // :to="{ path: item.to, hash: item.hash || '' }"
      if (item.to === '/schedule' || item.to === '/schedule/') {
        this.externalScheduleLink()
      } else if (this.$route.path !== toPath) {
        // 別のパスの場合
        this.$router.push({ path: item.to, hash: item.hash })
      } else {
        // 同じパスの場合は画面スクロール
        this.handleScroll(item.toPath, item.hash)
      }
    },
  },
}
</script>

<style lang="scss">
// Transition
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter, .page-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// 予約リンクボタン
.btn-danger {
  color: #fff !important;
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
}

// 以下デフォルトをオーバーライト
.v-toolbar__content {
  padding: 0 !important;
}

//
.bg {
  width: 100%;
  height: 100%;
  // position: absolute;
  position: relative;
  // top: 0;
  // left: 0;
  // background-size: cover;
  object-fit: cover;
  // background: linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%);
  // background-image: url('~@/assets/images/material2.jpg');
  // 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'

  // 2)
  // rgba(55, 55, 55, 0.4),
  // rgba(55, 55, 55, 0.1)

  background-image: linear-gradient(
      to top right,
      rgba(55, 55, 55, 0.4),
      rgba(55, 55, 55, 0.1)
    ),
    url('~@/assets/images/material-min.png');
}
</style>
