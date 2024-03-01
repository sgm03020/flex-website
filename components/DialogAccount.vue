<template>
  <v-card outlined class="justify-center text-center blue-grey lighten-5">
    <v-card-title class="justify-center headline blue-grey lighten-4">
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
    <v-form ref="confirm">
      <!-- アドレスクリア後の再オープンでv-modelだとemailが消えたままになってしまう -->
      <!-- そのため:value="email"としておき、submit時に代入する -->
      <!-- v-model="user.email" -->
      <!-- :value="email" -->
      <v-row class="mx-1 my-4 px-1 justify-center text-center">
        <v-col class="ma-0 pa-0">
          <v-text-field
            ref="email"
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
      <v-row class="mx-1 mt-6 px-1 justify-center text-center">
        <v-col class="ma-0 pa-0">
          <v-text-field
            ref="name"
            outlined
            v-model="user.name"
            label="名前"
            clearable
            color="purple darken-2"
            class="my-0 py-0"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center text-center mx-0 my-4 pa-0">
        <v-col cols="12" class="ma-0 pa-0">
          <v-card-actions class="justify-space-between my-2 py-2">
            <v-btn large :disabled="isSubmitting" @click="cancel()"
              >戻る</v-btn
            >
            <v-btn large :disabled="isSubmitting" @click="clear()"
              >クリア</v-btn
            >
            <v-btn x-large color="info" :disabled="isSubmitting" @click="submit()"
              >OK</v-btn
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
    isSubmitting: Boolean,
  },
  data() {
    return {
      success: false,
      user: {
        email: null,
        name: null,
      },
      emailRules: [
        // (v) => !!v || '予約にはメールアドレスが必要です。',
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'メールアドレス形式ではありません。',
      ],
    }
  },
  mounted() {
    console.log('DialogAccount mounted')
    setTimeout(() => {
      // propsから来たemail(localStorage->ストア)を
      // 代入する
      this.user.email = this.email
      this.user.name = this.name
    }, 0)
  },
  // beforeUpdate() {
  //   console.log('DialogConfirm beforeUpdate')
  // },
  methods: {
    // submit
    async submit() {
      if (this.user.email === '' && this.user.name === '') {
        this.success = true
        console.log('this.user: ', this.user)
        this.$emit('submit', this.user)
      }
      else if (this.$refs.confirm.validate()) {
        // すべてのバリデーションが通過したときのみ
        // if文の中に入る
        this.success = true
        // console.log('dialog submit')
        // value経由の場合は以下の行
        // this.user.email = this.$refs.email
        this.$emit('submit', this.user)
      } else {
        this.success = false
      }
    },
    // cancel
    cancel() {
      this.$emit('cancel')
      return
    },
    // メールアドレス・名前をクリアする
    clear() {
      this.user.email = ''
      this.user.name = ''
      // this.$emit('submit', this.user)
      // return
    },
  },
}
</script>

<style scoped>
.dialog-Button {
  font-weight: bold;
}
</style>
