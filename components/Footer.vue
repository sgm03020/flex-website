<template>
  <!-- <v-container class="ma-0 px-6 px-sm-12 px-md-16"> -->
  <v-row class="ma-0 pa-0">
    <!-- flex-wrap-reverse -->
    <!-- order-md="2" (この指定では効かない？) -->
    <!-- order-md-2 を classに付加する => OK -->
    <v-col cols="12" md="6" class="mt-0 mb-4 py-0 py-md-4 order-md-2">
      <!-- propsでstopImageが指定された場合には、mdサイズ以下では画像を非表示にする -->
      <!-- 方法 1) -->
      <!-- <v-card :class="computedClass"> -->
      <!-- 方法 2) -->
      <!-- <v-card class=""> -->
      <v-card :class="[stopImage ? 'pa-1 ma-0 d-none d-md-flex' : 'pa-1 ma-0']">
        <!-- <v-card class="pa-1 ma-0 d-none d-md-flex"> -->
        <!-- <v-card class="pa-1 ma-0"> -->
        <v-img
          contain
          :src="require('@/assets/images/footer/footer_img.png')"
          alt=""
          class=""
        />
      </v-card>
    </v-col>
    <v-col cols="12" md="6" class="my-0 py-0 py-md-4 order-md-1">
      <v-img
        contain
        :src="require('@/assets/images/logos/footer_id.png')"
        alt="フッターロゴ"
        class="mb-4"
      />
      <p class="white--text my-0 pt-2 pb-0">パーソナルトレーニングスタジオ</p>
      <h2 class="text-h5 white--text font-weight-bold mb-2">
        オーバーロード OVER ROAD
      </h2>
      <p class="white--text mb-0 pb-0">
        〒381-0038<br />
        長野県長野市東和田930番地 （ショッピングタウンあおぞら内）<br />
        日曜・祝日休み<br />
        営業時間：平日13時～22時（完全予約制）
      </p>
      <p class="subtitle-2 white--text mx-0 my-0 mb-0 pb-0">（最終セッション開始時刻 21時）</p>
      <v-btn
        depressed
        outlined
        :href="`tel:${telNumber}`"
        class="h3 font-weight-bold blue--text mx-0 my-2 pa-0"
        >{{ telNumber }}</v-btn
      >
      <p class="caption my-0 pt-0 white--text">
        ※電話によるお問い合わせは平日営業時間内にお願いいたします。
      </p>
      <p class="caption mt-0 pt-0 white--text">
        ※セッション中で電話に出れない場合は折り返しご連絡致しますのでご了承ください。
      </p>
    </v-col>
    <v-col cols="12" class="ma-0 pa-0 order-md-3"> </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<script>
export default {
  props: {
    telNumber: {
      type: String,
      default: '090-1829-7194',
    },
    stopLink: {
      type: Boolean,
      default: false,
    },
    stopImage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  // computed: {
  //   computedClass: function () {
  //     return this.stopImage ? 'd-none' : ''
  //   },
  // },
}
</script>
