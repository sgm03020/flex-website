<template>
  <client-only>
    <v-container class="mx-auto max-container">
      <v-row class="ml-0 mt-0 mb-3 pa-0">
        <h2 class="heading d-inline-block mr-2">ギャラリー</h2>
      </v-row>
      <!-- デフォルト3列 767pxまで2列 -->
      <masonry :cols="{ default: 3, 767: 2, 959: 3 }" :gutter="10">
        <v-card v-for="(card, index) in cards" :key="`galleries${index}`">
          <v-card class="mx-0 my-2 pa-2">
            <v-img
              contain
              :src="require('~/assets/images/galleries/' + card.name)"
              @click="selectItem(index)"
            />
          </v-card>
        </v-card>
      </masonry>
      <v-overlay v-if="0" :value="selectedIndex !== -1" opacity="1">
        <v-container fluid ma-0 pa-0>
          <v-row class="pa-2">
            <v-col cols="12" class="ma-0 pa-0 justify-center text-center">
              <v-card
                v-for="(el, index) in cards"
                v-show="selectedIndex === index"
                class=""
                :key="`ph-${index}`"
              >
                <!-- width="80%" -->
                <!--  -->
                <!-- style="max-width: 90%; max-height: 90vw" -->
                <img
                  style="max-width: 90%"
                  :src="require('~/assets/images/galleries/' + el.name)"
                  class=""
                />
                <v-btn
                  block
                  v-show="selectedIndex !== -1"
                  color="primary"
                  class="px-8"
                  @click="selectedIndex = -1"
                  >閉じる</v-btn
                >
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-overlay>
      <template>
        <v-overlay :value="dialog" :opacity="1.0">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            persistent
            opacity="1.0"
            class="dialog-image"
          >
            <!-- <v-card
              class="mx-auto px-1 text-center"
              v-for="(el, index) in cards"
              v-show="selectedIndex === index"
              :key="`ph-${index}`"
            > -->
            <v-img
              contain
              height="86%"
              v-for="(el, index) in cards"
              v-show="selectedIndex === index"
              :key="`ph-${index}`"
              :src="require('~/assets/images/galleries/' + el.name)"
              @dblclick=";(selectedIndex = -1) && (dialog = false)"
              class="mt-2 mb-0 py-0 text-center rounded"
            />
            <v-btn
              text
              v-show="selectedIndex !== -1"
              color="info"
              class="h5"
              @click=";(selectedIndex = -1) && (dialog = false)"
              >閉じる</v-btn
            >
          </v-dialog>
        </v-overlay>
      </template>
    </v-container>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: -1,
      dialog: false,
      active: false,
      cards: [
        {
          id: 1,
          // name: 'ph-6.png',
          // name: 'ph-12.jpg',
          // name: 'prf-20210427-01.jpg',
          // サイズ縮小&圧縮
          name: 'prf-20210427-01_1023x768_compress.jpg',
        },
        {
          id: 2,
          // name: 'ph-5.png',
          // name: 'ph-10.jpg',
          // name: 'prf-20210427-02.jpg',
          // サイズ縮小&圧縮
          name: 'prf-20210427-02_1024x1188_compress.jpg',
        },
        {
          id: 3,
          // name: 'ph-2.png',
          // name: 'ph-11.jpg',
          // name: 'prf-20210427-03.jpg',
          // サイズ縮小&圧縮
          name: 'prf-20210427-03_1023x840_compress.jpg',
        },
        {
          id: 4,
          title: 'title',
          // name: 'ph-8.png',
          // name: 'ph-13.jpg',
          // name: 'prf-20210427-04.jpg',
          // サイズ縮小&圧縮
          name: 'prf-20210427-04_1024x900_compress.jpg',
        },
        {
          id: 5,
          // name: 'ph-1.png',
          // name: 'ph-14.jpg',
          // name: 'ph-12.jpg',
          // サイズ縮小&圧縮
          name: 'ph-12_800x1422_compress.jpg',
        },
        {
          id: 6,
          // name: 'ph-4.png',
          // name: 'ph-15.jpg',
          // サイズ縮小&圧縮
          name: 'ph-15_1024x1820_compress.jpg',
        },
      ],
    }
  },
  computed: {
    selectIndex() {
      return this.cards[this.selectedIndex].name
    },
  },
  //
  // mounted() {
  //   this.$nextTick(function () {
  //     ビュー全体がレンダリングされた後にのみ実行されるコード
  //     setTimeout(() => {
  //       if (this.$redrawVueMasonry === 'function') {
  //         this.$redrawVueMasonry()
  //       }
  //     }, 100)
  //   })
  // },
  methods: {
    selectItem(index) {
      this.selectedIndex = index
      this.dialog = true
      // 20秒後に自動で閉じる
      // setTimeout(() => {
      //   if (this.selectedIndex > 0) {
      //     this.selectedIndex = -1
      //   }
      // }, 20000)
    },
    onClickOutside() {
      this.active = false
    },
  },
}
</script>

<style>
/* .dialog-image .v-image__image {
  border-radius: 50%;
} */
</style>
<style scoped>
.my-overlay >>> .v-overlay__content {
  width: 100%;
  height: 100%;
}
</style>
