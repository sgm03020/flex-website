<template>
  <!-- <client-only> -->
  <!-- style="height: 100vh" -->
  <section class="ma-0 py-5 bg-black">
    <!-- <v-btn @click="hasHistory()">history</v-btn> -->
    <!-- <v-btn @click="$router.push('/#sec7')">GO1</v-btn> -->
    <!-- <v-btn to="/#sec7">GO2</v-btn> -->
    <!-- <nuxt-link to="/#sec7"> GO3 </nuxt-link> -->
    <v-row class="mt-0 pt-0">
      <v-col class="mt-0 pt-0">
        <!-- @click="hasHistory() ? $router.go(-1) : $router.push('/main')" -->
        <!-- @click="$router.push('/main')" -->
        <!-- :to="{ name: '/', hash: '#sec7' }"だと戻れない場合がある -->
        <!-- @click="$router.push('/#sec7')" -->
        <!-- または -->
        <!-- to="/#sec7" -->
        <!-- とする -->
        <v-btn to="/#sec7" class="title ml-2 mb-4 purple darken-3 white--text">
          <v-icon>{{ mdiUndoVariant }}</v-icon>
          <span class="pr-4">ホーム</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-container fluid class="bg-light mt-0 pt-0">
      <!-- <v-row v-show="0" class="ma-0 pa-0">
          <v-col
            v-text="title.toUpperCase()"
            cols="12"
            tag="h2"
            class="ma-0 pa-0 text-center primary--text"
          />
        </v-row> -->
      <!-- <ul style="list-style: none;"> -->
      <!-- queryは文字列なので合わせる -->
      <!-- v-show="$route.query.id === String(item.id)" -->
      <!-- {{ filterdCampaign }} -->
      <!-- 4月よりお得な各コース限定2名の半額モニターキャンペーン！ -->
      <!-- <v-row class="ma-0 pa-0"> -->
      <div class="py-3">
        <h2 class="heading my-2 px-2 py-2 purple--text text--darken-4">
          {{ filterdCampaign.title }}
        </h2>
        <p class="mx-2 my-4"
          ><span class="grey lighten-1 px-2 py-1">{{
            filterdCampaign.startDate
          }}</span></p
        >
        <p class="body-1 mx-2 my-2">{{ filterdCampaign.mainContent }}</p>
        <p class="body-1 mx-2 my-2">{{ filterdCampaign.addtionalInfo }}</p>
      </div>
      <!-- </v-row> -->
    </v-container>
    <div class="ma-0 pa-0 black containter--fluid">
      <Footer telNumber="090-1829-7194" stopImage />
    </div>
  </section>
  <!-- </client-only> -->
</template>

<script>
import { mdiUndoVariant } from '@mdi/js'
import Footer from '@/components/Footer'

export default {
  data() {
    return {
      mdiUndoVariant,
      items: [
        {
          id: 20210410,
          title: '4月よりお得な各コース限定2名の半額モニターキャンペーン！',
          startDate: '2021年04月15日より',
          mainContent: '',
          addtionalInfo: '詳しくはトレーナーにお問い合わせください。',
          enabled: true,
        },
        {
          id: 20211004,
          title: '各コースのセッション時間変更',
          startDate: '2021年10月10日より',
          mainContent: '50分(旧) → 75分(新)',
          addtionalInfo: '各コースのセッション時間が75分となりました。',
          enabled: true,
        },
      ],
    }
  },
  computed: {
    // queryのidが指定されている場合はその
    // idを持つitemを対象とする。
    // idが指定されていない場合は、最初に見つかったenabled = trueの
    // itemを対象とする
    filterdCampaign: function () {
      if (this.$route.query.id && this.$route.query.id !== '') {
        // return this.items.filter((el) => this.$route.query.id === String(el.id))
        return this.items.find((el) => this.$route.query.id === String(el.id))
      } else {
        // 指定なしの場合、最初に見つかったenabled = trueのアイテム
        return this.items.find((el) => el.enabled)
      }
    },
  },
  methods: {
    hasHistory() {
      console.log('history:', window.history)
      // return window.history.length > 2
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/layout';
.heading {
  border-left: 6px solid #aaa;
  padding: 0 0 0 10px;
}
</style>
