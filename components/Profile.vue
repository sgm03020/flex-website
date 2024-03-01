<template>
  <v-container class="ma-0 pa-0">
    <v-row class="flex-row-reverse mx-0 px-0">
      <v-col cols="12" sm="4" class="mt-4 mr-sm-0 px-0 pr-sm-0">
        <!-- <v-col cols="12" sm="4" class="mt-4 mr-sm-0 pr-sm-0"> -->
        <v-card v-if="1" class="mt-0 pa-4 pa-sm-2 mb-auto ml-auto">
          <v-img
            contain
            class="white--text align-end"
            :src="require('~/assets/images/profile/trainer-new.jpg')"
          >
            <div class="mx-2">Takeshi Hara</div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" class="ma-0 px-0 pr-sm-0 py-2">
        <h2 class="heading d-inline-block mr-2">プロフィール</h2>
        <!-- 上下中央へカナを表示する -->
        <!-- <p sytle="line-height:1;" class="mt-1 mb-0"> -->
        <p
          sytle="display: inline-block; vertical-align: middle;"
          class="mt-2 mb-0"
        >
          <span
            ><em style="vertical-align: middle" class="text-h6 mr-1">{{
              profile.name3
            }}</em>
            <em
              style="vertical-align: middle"
              class="text-h5 font-weight-bold"
              >{{ profile.name1 }}</em
            >
            <!-- <em style="vertical-align: middle" class="caption">({{ profile.name2 }})</em> -->
          </span>
        </p>
        <p class="mx-0 mt-1 mb-0 py-0 pr-sm-3" v-html="profile.mainContent"></p>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="mx-0 mt-0 mb-2 pt-0 text-center">
        <v-btn
          outlined
          color="purple"
          class="h6 content-center justify-center text-center font-weight-bold"
          @click="showDetails = !showDetails"
        >
          {{ showDetails ? '閉じる' : 'もっと見る' }}
        </v-btn>
      </v-col>
      <div class="mt-0 mb-3 pt-0">
        <transition name="slide-fade">
          <p v-show="showDetails" class="" v-html="profile.detailContent"></p>
        </transition>
      </div>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <h3 class="h5 mr-2 font-weight-bold">経歴・実績</h3>
        <ul
          style="list-style: none; margin-left: 0; padding-left: 0"
          class="mx-0 mt-2 mb-4"
        >
          <!-- class="body-2"  -->
          <li class="" v-for="el in profile.careers" :key="el">
            {{ el }}
          </li>
        </ul>
        <h3 class="h5 mr-2 font-weight-bold">保有資格等</h3>
        <ul
          style="list-style: none; margin-left: 0; padding-left: 0"
          class="mx-0 mt-2 mb-2"
        >
          <li class="" v-for="el in profile.qualifications" :key="el">
            {{ el }}
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row class="mx-0 px-0">
      <v-col cols="6" sm="4" class="mt-4 mr-sm-0 px-1 pr-sm-0">
        <!-- <v-col cols="12" sm="4" class="mt-4 mr-sm-0 pr-sm-0"> -->
        <v-card class="mx-0 mx-sm-2 pa-2 pa-sm-2">
          <!-- 1) old @click="selectedIndex = 0" -->
          <!-- 2) new @click="selectItem(index)" -->
          <v-img
            contain
            :src="require('~/assets/images/profile/prf1.jpg')"
            @click="selectItem(0)"
          >
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4" class="mt-4 mr-sm-0 px-1 pr-sm-0">
        <!-- <v-col cols="12" sm="4" class="mt-4 mr-sm-0 pr-sm-0"> -->
        <!-- 1) old @click="selectedIndex = 1" -->
        <!-- 2) new @click="selectItem(1)" -->
        <v-card class="mx-0 mx-sm-2 pa-2 pa-sm-2">
          <v-img
            contain
            :src="require('~/assets/images/profile/prf2.jpg')"
            @click="selectItem(1)"
          >
          </v-img>
        </v-card>
      </v-col>
      <!-- <v-col cols="6" sm="4" class="mt-4 mr-sm-0 px-1 pr-sm-0"> -->
      <!-- 1) old @click="selectedIndex = 2" -->
      <!-- 2) new @click="selectItem(2)" -->
      <!-- <v-card class="mx-0 mx-sm-2 pa-2 pa-sm-2">
          <v-img
            contain
            :src="require('~/assets/images/profile/prf3.jpg')"
            @click="selectItem(2)"
          >
          </v-img>
        </v-card>
      </v-col> -->
      <!-- 以前の方法 -->
      <v-overlay v-if="0" :value="selectedIndex !== -1" opacity="1">
        <client-only>
          <v-container>
            <v-row>
              <v-col cols="12" class="mx-auto justify-center text-center">
                <v-card
                  v-show="selectedIndex === 0"
                  class="my-0 py-0"
                  key="prf1"
                >
                  <img
                    width="100%"
                    :src="require('~/assets/images/profile/prf1.jpg')"
                    v-on:load="loadedPrf()"
                    class="my-0 py-0"
                  />
                </v-card>
                <v-card
                  v-show="selectedIndex === 1"
                  class="my-0 py-0"
                  key="prf2"
                >
                  <img
                    width="100%"
                    :src="require('~/assets/images/profile/prf2.jpg')"
                    v-on:load="loadedPrf()"
                    class="my-0 py-0"
                  />
                </v-card>
                <v-card
                  v-show="selectedIndex === 2"
                  class="my-0 py-0"
                  key="prf3"
                >
                  <img
                    width="100%"
                    :src="require('~/assets/images/profile/prf3.jpg')"
                    v-on:load="loadedPrf()"
                    class="my-0 py-0"
                  />
                </v-card>
                <v-btn
                  v-show="isLoadedPrf"
                  block
                  color="primary"
                  class="px-8"
                  @click="resetPrf"
                  >閉じる</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </client-only>
      </v-overlay>
      <!-- Galleriesと同じやり方 -->
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
            <v-img
              contain
              height="86%"
              v-for="(el, index) in cards"
              v-show="selectedIndex === index"
              :key="`ph-${index}`"
              :src="require('~/assets/images/profile/' + el.name)"
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    eager: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showDetails: false,
      showBig: false,
      selectedIndex: -1,
      dialog: false,
      isLoadedPrf: false,
      items: [
        '~/assets/images/profile/prf1.jpg',
        '~/assets/images/profile/prf2.jpg',
        // '~/assets/images/profile/prf3.jpg',
        // require('~/assets/images/profile/prf1.jpg'),
        // require('~/assets/images/profile/prf2.jpg'),
        // require('~/assets/images/profile/prf3.jpg'),
      ],
      cards: [
        {
          name: 'prf1.jpg',
        },
        {
          name: 'prf2.jpg',
        },
        // {
        //   name: 'prf3.jpg',
        // },
      ],
    }
  },
  methods: {
    resetPrf() {
      this.selectedIndex = -1
      this.isLoadedPrf = false
    },
    loadedPrf() {
      setTimeout(() => {
        console.log('loadedPrf timer')
        this.isLoadedPrf = true
      }, 200)
    },
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
  },
}
</script>

<style lang="scss" scoped>
// Slide
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(30px) translateY(30px) rotate(40deg);
  opacity: 0;
}
</style>
