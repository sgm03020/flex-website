<template>
  <v-card outlined class="justify-center text-center blue-grey lighten-5">
    <v-card-title
      class="h4 justify-center blue-grey lighten-4 primary--text my-0 py-2"
    >
      {{ title }}
    </v-card-title>
    <!-- <v-row class="ma-0 pa-0 text-left">
      <v-col>
        <span class="headline">{{ title }}</span>
      </v-col>
    </v-row> -->
    <v-row v-if="message && message.length > 0" class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-alert dense outlined type="error" class="mx-2 px-2">
          {{ message }}
        </v-alert>
        <!-- <span color="red" class="subtitle-1">{{ message }}</span> -->
      </v-col>
    </v-row>
    <v-form v-model="valid" ref="confirm" lazy-validation>
      <v-row class="ma-0 pa-0 justify-center text-center">
        <v-col class="pa-0">
          <v-card-title class="h4 mt-2 py-0">
            {{
              this.$dayjs(bookingTime.substring(0, 10)).format(
                'YYYY年 M月 D日 (ddd)'
              )
            }}
          </v-card-title>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 justify-center text-center">
        <v-col class="pa-0">
          <v-card-title class="h4 justify-center text-center my-0 py-0">
            {{ this.$dayjs(bookingTime).format(' H時 mm分') }}
          </v-card-title>
        </v-col>
      </v-row>
      <!-- ブランクスペース -->
      <!-- 1) -->
      <!-- <div v-if="disabledCourse" sytle="min-height: 20px;" class=""
        >&zwnj;
      </div> -->
      <!-- 2) -->
      <div v-if="disabledCourse" class="py-3"> </div>
      <v-row v-if="!disabledCourse" class="ma-0 pa-0">
        <v-col class="ma-0 pt-2 pb-0">
          <hr />
          <!-- <div class="title mt-1 mb-0 py-0">セッション時間の選択</div> -->
          <!-- error-messages="セッション時間を選択してください" -->
          <p v-show="courseInfo" class="body-1 purple--text mt-2 mb-0 py-0">{{
            courseInfo
          }}</p>
          <v-radio-group
            ref="session"
            v-model="sessionTime"
            :rules="sessionTimeRules"
            class="mx-auto mt-0 mb-2  text-center"
          >
            <!-- :label="el.name" => slotで再定義 -->
            <!-- :disabled="!enabledCource(el)" -->
            <v-radio
              v-for="(el, index) in course"
              ripple=""
              color="primary"
              :key="`course${index}`"
              :value="el.time"
              class="mx-0 mt-1 px-0 py-0"

            >
              <template slot="label">
                <span class="d-inline-block ma-0 pa-0">
                  {{ el.name }}
                  <span class="caption ma-0 pa-0">{{ el.desc }}</span>
                </span>
              </template>
            </v-radio>
            <!-- <v-radio label="Option 1" value="radio-1"></v-radio> -->
            <!-- <v-radio label="Option 2" value="radio-2"></v-radio> -->
          </v-radio-group>
        </v-col>
      </v-row>

      <!-- アドレスクリア後の再オープンでv-modelだとemailが消えたままになってしまう -->
      <!-- そのため:value="email"としておき、submit時に代入する -->
      <!-- v-model="user.email" -->
      <!-- :value="email" -->
      <v-row class="ma-0 px-1 justify-center text-center">
        <v-col class="ma-0 pa-0">
          <v-text-field
            ref="email"
            required
            outlined
            v-model="user.email"
            label="Email"
            clearable
            color="purple darken-2"
            class="my-0 py-0"
            hide-details="auto"
            :rules="emailRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-0 mt-5 mb-1 px-1 justify-center text-center">
        <v-col class="ma-0 pa-0">
          <v-text-field
            ref="name"
            required
            outlined
            v-model="user.name"
            label="名前(漢字でもカナでもどちらでもOK)"
            clearable
            color="purple darken-2"
            class="my-0 py-0"
            hide-details="auto"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 justify-center text-center">
        <v-col class="ma-0 pa-0">
          <v-card-actions class="justify-space-between my-2 py-2">
            <v-btn
              large
              :disabled="isSubmitting"
              class="font-weight-bold px-10"
              @click="cancel()"
              >戻る</v-btn
            >
            <v-btn
              large
              color="info"
              :disabled="isSubmitting || !user.email || !user.name"
              class="font-weight-bold px-10"
              @click="submit()"
              >実行</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    email: String,
    name: String,
    buttonMessage: String,
    bookingTime: String,
    isSubmitting: Boolean,
    course: {
      type: Array,
      default: null,
    },
    selectableCourse: Number,
    disabledCourse: Boolean,
  },
  data() {
    return {
      success: false,
      valid: true,
      user: {
        email: null,
        name: null,
      },
      emailRules: [
        (v) => !!v || '予約にはメールアドレスが必要です。',
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'メールアドレス形式ではありません。',
      ],
      nameRules: [(v) => !!v || '予約には名前が必要です。'],
      sessionTimeRules: [(v) => !!v || 'セッション時間の選択が必要です。'],
      // 確認ダイアログでのコース選択
      sessionTime: null,
    }
  },
  //
  computed: {
    courseInfo() {
      if (this.selectableCourse < 2) {
        return '50分コースは選択できません。'
      } else {
        return null
      }
    },
  },
  mounted() {
    console.log('DialogConfirm mounted')
    setTimeout(() => {
      // propsから来たemail(localStorage->ストア)を
      // 代入する
      if (this.email && this.email !== '') {
        this.user.email = this.email
      }
      if (this.name && this.name !== '') {
        this.user.name = this.name
      }
      // 初期フォーカス(ラジオグループやボタンには出来なかった)
      // this.$refs.session.focus()
    }, 0)
  },
  // beforeUpdate() {
  //   console.log('DialogConfirm beforeUpdate')
  // },
  methods: {
    // submit
    async submit() {
      if (this.$refs.confirm.validate()) {
        // すべてのバリデーションが通過したときのみ
        // if文の中に入る
        // this.success = true
        // console.log('dialog submit')
        // value経由の場合は以下の行
        // this.user.email = this.$refs.email
        // 構造変更
        // { this.user, this.sessionTime}
        const obj = { user: this.user, sessionTime: this.sessionTime }
        this.$emit('submit', obj)
        setTimeout(() => {
          this.success = true
        }, 150)
      } else {
        setTimeout(() => {
          this.success = false
        }, 150)
      }
    },
    // cancel
    cancel() {
      setTimeout(() => {
        this.$emit('cancel')
        return
      }, 150)
    },
    //
    enabledCource(el) {
      if (this.selectableCourse === 2) {
        return true
      } else if (this.selectableCourse === 1 && el.time === 25) {
        return true
      } else if (this.selectableCourse === 1 && el.time === 50) {
        return false
      }
      return false
    },
  },
}
</script>

<style scoped>
.dialog-Button {
  font-weight: bold;
}
</style>
