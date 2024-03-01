<template>
  <!-- <client-only> -->
  <section class="ma-0 py-5 bg-black">
    <v-row class="mt-0 pt-0">
      <v-col class="mt-0 pt-0">
        <v-btn to="/#sec7" class="title ml-2 mb-4 purple darken-3 white--text">
          <v-icon>{{ mdiUndoVariant }}</v-icon>
          <span class="pr-4">ホーム</span>
        </v-btn>
      </v-col>
    </v-row>
    <!-- 一覧 -->
    <!-- {{ filterdNews }} -->
    <v-container class="mx-0 my-2 px-2">
      <ul class="ma-0 pa-0" style="list-style: none">
        <li v-for="item in filterdNews" :key="item.id" class="ma-0 pa-0">
          <hr />
          <!-- style="text-decoration: none;" -->
          <!-- to="/campaign" -->
          <!-- :to="{ name: '/campaign', params: { id: item.id } }" -->
          <p class="px-0 py-2">
            <nuxt-link
              :to="`/campaign?id=${item.id}`"
              class="h4 primary--text text-decoration-none"
              >{{ item.title }}</nuxt-link
            >
          </p>
        </li>
      </ul>
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
      news: [
        {
          id: 20211004,
          dateStr: '2021年10月4日',
          title: 'セッション時間を75分へ変更いたします',
          mainContent: '',
          url: '/campaign',
          enabled: true,
        },
        {
          id: 20210410,
          dateStr: '2021年4月15日',
          title: '4月よりお得な各コース限定2名の半額モニターキャンペーン！',
          mainContent: '',
          url: '/campaign',
          enabled: true,
        },
      ],
    }
  },
  computed: {
    // arrayのfilterであえてreduceを使ってみる
    filterdNews: function () {
      // return this.news.filter((el) => el.enabled)
      return this.news.reduce((acc, value) => {
        if (value.enabled) {
          acc.push(value)
        }
        return acc
        // return value.enabled ? acc.concat(value): acc
      }, [])
    },
  },
}
</script>
