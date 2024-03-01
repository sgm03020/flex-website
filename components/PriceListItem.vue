<template>
  <!-- 背景用のグラデーションデータが3つあることが前提 -->
  <v-card class="mx-0 mt-0 mb-4 pa-4">
    <v-img
      :eager="eager"
      contain
      :src="priceListItem.imageUrl"
      class="border radius mb-3"
    />
    <h3 class="my-0 py-0">
      {{ priceListItem.title }}
    </h3>
    <table class="price-table text-muted">
      <tbody>
        <!-- <tr>
          <td class="pl-0 pr-5 py-0">{{ priceListItem.entryName }}</td>
          <td>{{ priceListItem.entryPrice }}</td>
        </tr> -->
        <tr>
          <td class="pl-0 pr-5 py-0">{{ priceListItem.lessonTime }}</td>
          <td>{{ priceListItem.lessonDesc }}</td>
        </tr>
        <tr>
          <td class="pl-0 pr-5 py-0">{{ priceListItem.totalNumber }}</td>
          <td>{{ priceListItem.period }}</td>
        </tr>
      </tbody>
    </table>

    <p class="my-0 py-3">
      {{ priceListItem.mainContent }}
    </p>
    <div class="mt-1">
      <h4>
        <!-- prettier-ignore -->
        <!-- <span style="vertical-align: middle" class="small my-0 py-0 pr-2">トータル</span> -->
        <!-- badge badge-danger -->
        <!-- <span style="vertical-align: middle;border-radius: .25rem;" class="caption error white--text pa-1"
          >入会金込みトータル</span
        > -->
        <span class="body-1"
          >価格</span
        >
        <span style="font-weight: 500;" class="">{{
          priceListItem.priceMain
        }}</span
        ><span class="body-1 mx-0 px-0 my-0 py-0"
          >（税込）</span
        >
      </h4>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    eager: {
      type: Boolean,
      default: false,
    },
    priceListItem: {
      type: Object,
      default: {
        title: '',
        mainContent: '',
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
// nuxtまたはvuetifyにてmain.cssのtableに勝手にpadding 0.25remが付く
// price-talbeクラスを定義して上下のpaddingをキャンセルする
// widthにautoを使うため、左右はそのまま
// .main table td が元
// table,
// tbody,
// tr,
// td {
//   width: auto !important;
// }
.main table.price-table,
tbody,
tr,
td {
  width: auto !important;
}
.main table.price-table td {
  border: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>

<style lang="scss" scoped>
.dummy {
  padding: 0;
}
</style>
