<template>
  <!-- v-rowではなくdivにしないと改行されない -->
  <div class="ma-0 pa-0">
    <table class="table table-bordered border-primary pa-5">
      <tbody class="px-0">
        <tr class="px-0">
          <th
            scope="row"
            style="width: 31%"
            class="h5 align-middle text-center bg-lightblue white--text px-0"
          >
            一 般<br /><span class="body-1">（1回75分）</span>
          </th>
          <td
            style="width: 69%; line-height: 1.8rem"
            class="bg-light font-weight-bold text-dark px-0 py-2 px-md-2"
            :class="$vuetify.breakpoint.mdAndUp ? 'h4' : 'h5'"
          >
            <!-- 入会金を表示する場合 -->
            <!-- <v-row class="mx-0 px-0 my-0 pl-md-2" align="center"> -->
            <!-- <v-col cols="5" class="mx-0 my-0 px-0 py-0 small"> 入会金 </v-col>
              <v-col cols="7" class="mx-0 my-0 px-0 py-0">
                10,000円<span class="small"> &#040;税込&#041;</span>
              </v-col> -->
            <!-- </v-row> -->
            <v-row class="mx-0 my-0 pl-1 pl-md-2" align="center">
              <v-col
                cols="5"
                class="font-weight-bold mx-0 px-0 my-0 py-0 small"
              >
                <!-- 週1回&#040;月4回&#041; -->
                月4回コース
              </v-col>
              <v-col cols="7" class="mx-0 px-0 my-0 py-0">
                45,000円<span class="small"> &#040;税込&#041;</span>
              </v-col>
            </v-row>
          </td>
        </tr>
        <tr class="px-0">
          <th
            scope="row"
            style="width: 31%"
            class="h5 align-middle text-center bg-lightpink white--text px-0"
          >
            シニア<br /><span class="body-1 px-0"
              >【60歳以上】<br />（1回75分）</span
            >
          </th>
          <td
            style="width: 69%; line-height: 1.8rem"
            class="bg-light font-weight-bold text-dark px-0 py-2 px-md-2"
            :class="$vuetify.breakpoint.mdAndUp ? 'h4' : 'h5'"
          >
            <v-row class="mx-0 pl-1 my-0 pl-md-2" align="center">
              <v-col
                cols="5"
                class="font-weight-bold mx-0 px-0 my-0 py-0 small"
              >
                月4回コース
              </v-col>
              <v-col cols="7" class="font-weight-bold mx-0 px-0 my-0 py-0">
                35,000円<span class="small"> &#040;税込&#041;</span>
              </v-col>
              <v-col cols="12" class="subtitle-1 mx-0 px-0 my-0 py-1">
                ご家庭またはジムに通うのに必要な簡単で効果的なトレーニング法をご指導いたします。
                習慣化出来るのでご好評いただいております。
              </v-col>
            </v-row>
            <!-- 週2回&#040;月8回&#041; -->
            <!-- <v-row class="mx-0 pl-1 my-0 pl-md-2" align="center">
              <v-col cols="5" class="font-weight-bold mx-0 px-0 my-0 py-0 small">
                月8回コース
              </v-col>
              <v-col cols="7" class="mx-0 px-0 my-0 py-0">
                30,000円<span class="small"> &#040;税込&#041;</span>
              </v-col>
            </v-row> -->
            <!-- <v-row class="font-weight-bold mx-0 pl-1 my-0 pl-md-2" align="center"> -->
            <!-- 1) spanを使い料金の部分を途中改行させず、1行ないし -->
            <!--    2行以上で表示する場合(v-spacerを間に入れる)     -->
            <!-- <span style="vertical-align:middle;" class="h6">週3回&#040;月12回&#041;
              </span>
              <v-spacer />
              <span style="vertical-align:middle;" class="h5 d-inline-block pr-sm-2">39,000円<span style="vertical-align:middle;" class="small"> &#040;税込&#041;</span>
              </span> -->
            <!-- 2) v-colで 5対7の比率に固定する場合 -->
            <!-- <v-col cols="5" class="font-weight-bold mx-0 px-0 my-0 py-0 small">
                月12回コース
              </v-col> -->
            <!-- <v-col cols="7" class="font-weight-bold mx-0 px-0 my-0 py-0">
                39,000円<span class="small"> &#040;税込&#041;</span>
              </v-col> -->
            <!-- </v-row> -->
            <!-- <span class="small">入会金</span>　10,000円<span class="small"
              >（税込）</span
            ><br /><span class="small">週1回（月4回）</span>22,000円<span
              class="small"
              >（税込）</span
            ><br /><span class="small">週2回（月8回）</span>40,000円<span
              class="small"
              >（税込）</span
            ><br /><span class="small">週3回（月12回）</span>49,000円<span
              class="small"
              >（税込）</span
            > -->
          </td>
        </tr>
      </tbody>
    </table>
    <table class="my-6">
      <tbody>
        <tr>
          <!-- 、PayPay -->
          <td colspan="3" class="text-light pl-2">
            ※お支払い方法： 現金払い、口座振込、PayPay
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <!-- preitter-ignore -->
    <!-- <h3 class="h4 text-light">
      料金に含まれるもの
      <span class="small pl-3">※コース・プランに適用</span>
    </h3>
    <p class="mb-3 text-light">
      食事にアドバイス（電話もしくはLINE、E-mailにて）<br />
      トレーニング関係のアドバイス（電話もしくはLINE、E-mailにて）
    </p> -->
    <!-- 見やすさの観点から問い合わせからの戻りをこの位置とする -->
    <!-- <h3 class="text-center text-danger mb-3" id="contact">
      初回に無料カウンセリング及びお試しトレーニングを30分程度いたします。
    </h3> -->
  </div>
</template>

<script>
import { mdiTriangle } from '@mdi/js'
export default {
  data() {
    return {
      mdiTriangle,
    }
  },
}
</script>

<style lang="scss" scoped>
.small-2 {
  font-size: 70%;
}
.bg-lightpink {
  background-color: #f2a4be;
}
.bg-lightblue {
  background-color: #77b8da;
}
// table, tbody, tr, td {
//   width: auto;
// }
.v-icon {
  transform: rotate(-180deg);
}
</style>
