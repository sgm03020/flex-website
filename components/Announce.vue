<template>
  <v-container class="mx-auto max-container">
    <v-row class="ml-0 mt-0 mb-2 pa-0">
      <h2 class="heading d-inline-block mr-2">お知らせ</h2>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col class="mx-0 px-0">
        <!-- disabled -->
        <v-btn small to="/news" class="grey lighten-1 white--text">
          一覧を見る
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="mx-0 mt-1 mb-3 pa-0">
        <span class="grey pa-2 mr-2 white--text rounded">2021年 10月 20日</span>
      </v-col>
      <v-col cols="12" class="mx-0 px-0 my-0 py-1">
        <h3 class="h5 d-block d-md-inline-block mt-3 mt-md-0 mb-4">
          <!-- 現在ここは手動 -->
          <!-- (idを指定しない場合は最初に見つかるenabled:trueのアイテムが対象となる) -->
          <nuxt-link to="/campaign?id=20211004">
          <!-- <nuxt-link to="/campaign?id=20210701"> -->
            セッション時間を75分へ変更いたします
          </nuxt-link>
        </h3>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="mx-0 mt-1 mb-3 pa-0">
        <span class="grey pa-2 mr-2 white--text rounded">2021年 4月 15日</span>
      </v-col>
      <v-col cols="12" class="mx-0 px-0 my-0 py-1">
        <h3 v-if="1" class="h5 d-block d-md-inline-block mt-3 mt-md-0">
          <!-- 現在ここは手動 -->
          <!-- (idを指定しない場合は最初に見つかるenabled:trueのアイテムが対象となる) -->
          <nuxt-link to="/campaign?id=20210410">
          <!-- <nuxt-link to="/campaign?id=20210701"> -->
            お得な各コース限定2名の半額モニターキャンペーン！
          </nuxt-link>
        </h3>
        <!-- <span class=""> -->
          <!-- <span class="grey pa-2 mr-2 white--text rounded">2021年 4月 1日</span> -->
          <!-- <span class="news_category news">ニュース</span> -->
          <!-- <h3 class="h5 d-block d-md-inline-block mt-3 mt-md-0">
            <nuxt-link to="/campaign">
              4月よりお得な各コース限定2名の半額モニターキャンペーン！
            </nuxt-link>
          </h3> -->
        <!-- </span> -->
      </v-col>
    </v-row>
    <p></p>
  </v-container>
</template>
