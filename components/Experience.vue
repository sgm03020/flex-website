<template>
  <!-- 背景用のグラデーションデータが3つあることが前提 -->
  <!-- class="bg-grd1 mx-0 my-4 px-4 pt-6 pb-6" -->
  <!-- width:100%として短い場合でも横幅を合わせる -->
  <v-card
    v-if="exp.mainContent && exp.mainContent !== ''"
    class="mx-0 my-4 px-2 pt-6 pb-6"
    :style="`width:100%; background: linear-gradient(${
      gradients[index % gradients.length]
    })`"
  >
    <v-row class="ma-0 pa-0">
      <v-col v-if="exp.imageUrl1" cols="12" md="5" lg="3">
        <!-- eager -->
        <!-- :src="exp.imageUrl1" -->
        <!-- {{ exp.imageUrl1 }} -->
        <v-img
          :eager="eager"
          contain
          :src="require(`/assets/images/persons/${exp.imageUrl1}`)"
          class="border radius mb-6"
          @click="selectItem(exp.imageUrl1)"
        />
        <v-col cols="10" class="mx-auto my-0 py-0">
          <v-img
            v-if="exp.imageUrl2"
            :eager="eager"
            contain
            :src="exp.imageUrl2"
            class="border radius mb-6"
          />
        </v-col>
      </v-col>
      <!-- <v-col cols="12" md="7" sm="7" lg="9"> -->
      <!-- imageがない場合にmainContentsを広げるため、以下はcol数を指定しない -->
      <v-col>
        <p class="text-body-2 white--text my-0 py-0">
          {{ exp.subTitle1 }}
        </p>
        <p class="my-0 py-0">
          <span
            :class="`${
              exp.className ? exp.className : 'white--text'
            } text-body-1 `"
            >{{ exp.subTitle2 }}</span
          >
        </p>
        <p class="text-h5 font-weight-bold white--text mt-3">
          {{ exp.title }}
        </p>
        <p class="text-body-1 white--text">
          {{ exp.mainContent.replace(/\s/g, '') }}
        </p>
        <div
          v-if="exp.subContent && exp.subContent !== ''"
          @click="showSub = !showSub"
          class="font-weight-bold text-body-1 cp_box mb-2"
        >
          <label color="error" class="font-weight-bold text-body-1">
            続きを見る (クリック開閉)
          </label>
        </div>

        <transition name="slide-fade">
          <p v-show="showSub" class="text-body-1 white--text">
            {{ exp.subContent.replace(/\s/g, '') }}
          </p>
        </transition>
      </v-col>
    </v-row>
    <!-- このチェックはうまく働かない -->
    <!-- <div v-if="checkImg('abc')"> </div> -->
    <!-- 以下のcontainer部分で写真を拡大表示する -->
    <!-- v-overlayにはtransitionが効かない -->
    <!-- <transition name="fade2"> -->
    <v-container
      v-if="exp.imageUrl1 && exp.imageUrl1 !== ''"
      v-show="dialog && selectedPhotoName !== ''"
    >
      <v-overlay :value="dialog && selectedPhotoName !== ''" :opacity="1.0">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          persistent
          opacity="1.0"
          class="dialog-image"
        >
          <!-- Dialog -->
          <!-- {{ dialog }} -->
          <!-- {{ selectedPhotoName }} -->
          <!-- <v-img
              :src="require(`/assets/images/persons/over-road_person_20211007a_512x512_all.jpg`)"
              class="mt-2 mb-0 py-0 text-center rounded"
            /> -->

          <v-img
            contain
            height="86%"
            v-if="exp.imageUrl1 && exp.imageUrl1 !== ''"
            :src="require(`/assets/images/persons/${exp.imageUrl1}`)"
            class="mt-2 mb-0 py-0 text-center rounded"
          />
          <v-btn
            text
            color="info"
            class="h5"
            @click="onClickEvent(selectedPhotoName)"
            >閉じる</v-btn
          >
        </v-dialog>
        <!-- @click=";(selectedPhotoName = '') && (dialog = false)" -->
      </v-overlay>
    </v-container>
    <!-- </transition> -->
  </v-card>
</template>

<script>
export default {
  props: {
    eager: {
      type: Boolean,
      default: false,
    },
    exp: {
      type: Object,
      default: {
        title: '',
      },
    },
    index: {
      type: Number,
      default: 0,
    },
    // imageUrl: {
    //   type: String,
    //   default: '',
    // },
    // title: {
    //   type: String,
    //   default: '',
    // },
    // subTitle1: {
    //   type: String,
    //   default: '',
    // },
    // subTitle2: {
    //   type: String,
    //   default: '',
    // },
    // contents: {
    //   type: String,
    //   default: '',
    // },
  },
  data() {
    return {
      timer1: null,
      selectedPhotoName: '',
      dialog: false,
      showSub: false,
      gradients: [
        // 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
        '-135deg, #00f260, #0575e6',
        '-135deg, #b92b27, #1565c0',
        '-135deg, #f7ff00, #db36a4',
      ],
    }
  },
  computed: {},
  methods: {
    checkImg(name) {
      try {
        const checkedImgFile = require(`/assets/images/persons/${name}`)
        return true
      } catch (e) {
        return false
      }
    },
    onClickEvent(name) {
      // alert('OK')
      // console.log('click:', name)
      this.selectedPhotoName = ''
      this.dialog = false
      console.log('this.timer1: ', this.timer1)
      clearTimeout(this.timer1)
      if (this.timer1) this.timer1 = null
      console.log('clear this.timer1: ', this.timer1)
    },
    selectItem(name) {
      // console.log('selectItem')
      console.log('this.timer1: ', this.timer1)
      this.selectedPhotoName = name
      this.dialog = true
      // 10秒後に自動で閉じる
      this.timer1 = setTimeout(() => {
        if (this.selectedPhotoName === name) {
          this.selectedPhotoName = ''
          this.dialog = false
        }
      }, 10000)
    },
  },
}
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid #dee2e6 !important;
}
.bg-grd1 {
  background: linear-gradient(-135deg, #00f260, #0575e6);
}
.bg-grd2 {
  background: linear-gradient(-135deg, #b92b27, #1565c0);
}
.bg-sec2 {
  background: linear-gradient(-135deg, #f7ff00, #db36a4);
}
.cp_box label {
  font-weight: bold;
  position: relative;
  display: block;
  margin: auto;
  padding: 0.3em 1em;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  color: #da3c41;
  border: none;
  border-radius: 3px;
  &:hover {
    transition: all 0.3s;
    color: #fff;
    background: #da3c41;
  }
}

//
// Transition
//
// fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
// fade2(実験用)
.fade2-enter-active,
.fade2-leave-active {
  transition: opacity 1.5s;
}
.fade2-enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// Slide
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
