<template>
  <v-container fluid ma-0 pa-0>
    <v-container class="max-container" style="background-color: grey">
      <h2>{{ $vuetify.breakpoint.name }}</h2>
      <!-- <h2>{{ breakpoints }}</h2> -->
      <!-- <div>{{ JSON.stringify($vuetify.breakpoint, null, 2) }}</div> -->
      <div>lgAndUp:{{ $vuetify.breakpoint.lgAndUp }}</div>
      <div>mdAndUp:{{ $vuetify.breakpoint.mdAndUp }}</div>
      <div>smAndUp:{{ $vuetify.breakpoint.smAndUp }}</div>
      <div>lgAndDown:{{ $vuetify.breakpoint.lgAndDown }}</div>
      <div>mdAndDown:{{ $vuetify.breakpoint.mdAndDown }}</div>
      <div>smAndDown:{{ $vuetify.breakpoint.smAndDown }}</div>
      <div>lgOnly:{{ $vuetify.breakpoint.lgOnly }}</div>
      <div>mdOnly:{{ $vuetify.breakpoint.mdOnly }}</div>
      <div>smOnly:{{ $vuetify.breakpoint.smOnly }}</div>
    </v-container>
    <v-row>
      <v-col class="text-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
        <blockquote class="blockquote">
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-col>
    </v-row>

    <section class="container bg-sec1 py-3 sec2">
      <!-- 次のいづれかを使用 -->
      <!-- position-relative d-md-flex flex-row-reverse flex-sm-row-reverse flex-md-row-reverse -->
      <v-container v-if="1" class="">
        <v-row v-if="1" class="position-relative">
          <v-col v-if="1" cols="12" class="mx-0 px-2 d-flex d-sm-none">
            <v-img
              v-if="1"
              class=""
              contain
              :src="require('~/assets/images/greetings/dumbbell_512x320_compress.png')"
              alt="メッセージ画像"
            />

            <div v-if="0" style="opacity: 0.5" class="d-none d-sm-flex">
              <p class="text-h5 grey--text text--darken-3 font-weight-bold">
                25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
              </p>
            </div>
          </v-col>
          <!-- mr-0 pr-0 -->
          <v-col v-if="1" md="7" sm="7" class="px-4 message" style="z-index: 1">
            <!-- h2 ->  text-h4 -->
            <!-- text-primary -> blue--text text--darken-1 -> text-primary 作成-->
            <h3 class="text-h4 text-primary font-weight-bold pt-2 pb-4">
              オーバーロードとは
            </h3>
            <!-- h4 text-dark -> text-h5 grey--text text--darken-4 -->
            <p class="text-h5 grey--text text--darken-3 font-weight-bold">
              25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
            </p>
            <!-- h4 text-dark ->  text-h5 grey--text text--darken-4 -->
            <p
              class="text-h5 grey--text text--darken-3 font-weight-bold mb-1 pb-0"
            >
              初心者でも安心！自重、正直軽い重量で狙った筋肉への効かせ方をお教えします！
            </p>
            <!-- class m-0 -> mt-0 pt-0 -->
            <p class="mt-0 pt-0">
              <em
                >ただ負荷をかけるのではなく、軽度なものでも効果的に働きかけてくれるので、身体が変わってくることが自然に楽しく、いつの間にか筋トレにはまってしまいます！！</em
              >
            </p>
          </v-col>

          <v-overlay
            v-show="1"
            class="my-overlay d-none d-sm-flex"
            absolute
            :opacity="0"
            :z-index="0"
          >
            <v-row class="ma-0 pa-0">
              <!-- <v-col
                style="background-color: yellow; width: 100%"
                class="grey--text"
              >
                This is Overlay This is Overlay This is Overlay
              </v-col> -->
              <v-col cols="5"> </v-col>
              <!-- 重要 offsetでズラす -->
              <v-col
                offset="0"
                cols="7"
                style="background-color: pink"
                class="ma-0 pa-0"
              >
                <v-img
                  v-if="1"
                  class=""
                  contain
                  src="/images/greetings/dumbbell.png"
                  alt="メッセージ画像"
                />
              </v-col>

              <!-- <v-col style="background-color: pink"> </v-col> -->
            </v-row>
          </v-overlay>
        </v-row>
      </v-container>
    </section>

    <v-row>
      <v-col v-if="1" md="6" sm="6" class="mx-0 px-2">
        <v-img
          v-if="1"
          :style="{ 'margin-left': '0%' }"
          class=""
          contain
          src="/images/greetings/dumbbell_512x320_compress.png"
          alt="メッセージ画像"
        />
        25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
        <br />
        25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
        25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
        25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
        25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
        <br />
        25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。25年間培ったダイエット方法や、トレーニング理論を元にアスリートから介護予防運動まで幅広く対応します。
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    console.log('this.$vuetify.breakpoint:', this.$vuetify.breakpoint)
  },
  computed: {
    // breakpoint() {
    //   return JSON.stringify(this.$vuetify.breakpoint, null, 2)
    // },
    // 実行時のvuetifyの全breakpoint(実行時に使うにはやめた)
    // これをscoped styleに使うには :style="cssProps"などとしなければならない
    // 得策ではない
    cssProps() {
      // lg: 992
      // md: 768
      // sm: 576
      // xl: 1200
      // xs: 600
      // return this.$vuetify.breakpoint.thresholds
      // そのまま返すのではなく、cssの変数として
      const _breakpoints = this.$vuetify.breakpoint.thresholds
      console.log('_breakpoints: ', _breakpoints)
      // https://stackoverflow.com/questions/42872002/in-vue-js-component-how-to-use-props-in-css
      return { '--all-breakpoints': _breakpoints }
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bg-black {
  background-color: #000;
}
.bg-light {
  background-color: #f8f9fa !important;
}
.bg-dark {
  background-color: #343a40 !important;
}
.bg-danger {
  background-color: #dc3545 !important;
}
.bg-sec1 {
  background: linear-gradient(to top, #ddd 30%, #f8f9fa);
}
.position-relative {
  position: relative !important;
}
.position-absolute {
  position: absolute !important;
  left: 0;
}
.text-danger {
  color: #dc3545 !important;
}
.text-primary {
  color: #007bff !important;
}

.my-overlay {
  background: darkblue;
}

// これはscopeなしでオーバーライトしないとダメ
// .v-overlay__content {
// height: 100% !important;
// background: darkblue;
// display: flex;
// justify-content: center;
// align-items: center;
// }

// Good！
// .sec2 .v-overlay {
//   // right: initial;
//   // left: initial;
// }

// .my-overlay >>> .v-overlay {
//   width: 100% !important;
//   height: 100% !important;
//   background: darkblue;
// }

// .my-overlay >>> .v-overlay__content {
//   width: 100% !important;
//   height: 100% !important;
//   background: darkblue;
// }

// 改造(#sec2を.sec2へ変更 テスト用.sec3追加)
// @media screen and (min-width: 576px) and (max-width: 991.98px) {
//   .sec2 {
//     height: 500px;
//   }
//   .sec3 {
//     height: 500px;
//   }
// }
// .sec2 {
//   min-height: 500px;
// }

// Original
// @media screen and (min-width: 576px) {
//  #sec2 .message {
//     position: absolute;
//     left: 0;
//  }
// }
// .sec2 {
//   height: auto;
//   background: cyan;
// }

// .sec2 .message {
//   position: absolute;
//   left: 0;
//   height: 100%;
// }

// 移植&変更
// 改造(#sec2を.sec2へ変更 テスト用sec3追加)
// @media screen and (min-width: 576px) {
//   .sec2 .message {
//     position: absolute;
//     left: 0;
//     // background-color: cyan;
//   }
//   .sec3 .message {
//     position: absolute;
//     left: 0;
//   }
// }

// 代替
// red--text text--lighten-1
</style>

<style lang="scss">
.my-overlay > .v-overlay__content {
  width: 100%;
  // width: 100% !important;
  // height: 90% !important;
  // background: darkblue;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>

<style lang="scss" scoped>
// @import '~/assets/styles/breakpoints';
// .max-container {
//   @include make-container-max-widths();
// }
// .container {
//   @include make-container-max-widths();
// }
</style>
