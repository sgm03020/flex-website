<template>
  <!-- tag="section" -->
  <section fluid class="justify-center container--fluid bg-light">
    <v-container class="mx-auto px-4 py-2">
      <v-row class="mx-0 mt-0 mb-6 pa-0">
        <v-col class="ma-0 pa-0">
          <!-- :to="{ name: '/', hash: '#contact' }" -->
          <v-btn
            :color="finished ? 'primary' : 'grey darken-1'"
            to="/"
            class="title mt-0 pt-0 white--text"
          >
            <v-icon>{{ mdiUndoVariant }}</v-icon>
            <span>ホーム</span>
          </v-btn>
        </v-col>
      </v-row>
      <template v-if="!finished">
        <v-row class="ma-0 pa-0">
          <v-col
            v-text="title.toUpperCase()"
            cols="12"
            tag="h3"
            class="heading"
          />
        </v-row>
        <v-row class="ma-0 pa-0">
          <p class="lead">​体験・ご入会のご予約・お問い合わせはこちらから</p>
        </v-row>
        <v-row class="ma-0 pa-0 mb-2" justify="center">
          <!-- <h2 class="heading d-inline-block mb-3">お問い合わせ</h2> -->
          <!-- <v-row class="ma-0 pa-0"> -->
          <a href="https://line.me/ti/p/K2_SC98IPi" class="mx-2 pa-0"
            ><img
              alt="友だち追加"
              border="0"
              height="48"
              :src="require('@/assets/images/contacts/ja.png')"
              width="170"
          /></a>
          <!-- <v-spacer /> -->
          <v-btn
            height="48"
            width="170"
            color="primary"
            href="tel:09018297194"
            class="font-weight-bold h5 mx-2 my-0 pa-0"
            >電話をかける</v-btn
          ></v-row
        >
        <p class="mx-0 my-1 pa-0">
          <span class="h6 font-weight-bold my-2"
            >【電話・LINEでのお問い合わせ】</span
          >
        </p>
        <p class="ml-2 pa-0"
          >電話・LINEでのお問い合わせは13時～22時までとなります。<br />
          セッション中で電話・LINEでのお問い合わせに対応出来ない場合は折り返しご連絡致しますのでご了承ください。<br />
          LINEでお問い合わせの場合は、お名前と問い合わせ内容をお書きください。
        </p>
        <p>　</p>
        <p class="mx-0 my-1 pa-0">
          <span class="h6 font-weight-bold my-2"
            >【フォームでのお問い合わせ】</span
          >
        </p>
        <p class="ml-2 pa-0"
          >下記フォームに必要事項を入力し、「送信する」ボタンを押してください。<br />
          体験・ご入会のご予約やお問い合わせ内容は問合せ内容欄にお書きください。
        </p>
        <p>　</p>

        <v-form method="post" netlify>
          <v-text-field v-show="false" v-model="title" name="form-name" />
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0">
              <!-- autofocus -->
              <v-text-field v-model="name" label="お名前" name="name" />
            </v-col>
          </v-row>
          <v-row class="ma-0 mb-4 pa-0">
            <v-col cols="12" class="ma-0 pa-0">
              <v-text-field
                v-model="email"
                label="メールアドレス"
                name="email"
              />
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0">
              <v-textarea
                outlined
                v-model="message"
                label="問合せ内容"
                name="message"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="botfield"
            label="人間は入力しないでください"
            v-show="false"
          />
          <v-row class="ma-0 pt-0 pb-4">
            <v-col class="ma-0 pa-0">
              <v-btn
                :disabled="isEmpty"
                x-large
                color="primary"
                @click="handleSubmit"
              >
                送信する
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </template>
      <template v-else>
        <v-row class="ma-0 pa-0">
          <h2 class="heading d-inline-block mb-3"
            >お問い合わせありがとうございました。</h2
          >
          <p
            >この度はお問い合わせメールをお送りいただきありがとうございます。<br />
            内容を確認後、ご連絡をさせていただきます。<br />
            今しばらくお待ちくださいますようよろしくお願い申し上げます。</p
          >
          <p
            >送信後、2、3日経過しても返信、返答がない場合は、<br />
            お手数ですが再度送信いただくか、<br />
            お電話（
            <a href="tel:090-1829-7194">090-1829-7194</a>
            ）までご連絡いただけますと幸いです。</p
          >
        </v-row>
      </template>
    </v-container>
    <div class="ma-0 pa-0 black containter--fluid">
      <Footer telNumber="090-1829-7194" stopImage />
    </div>
    <!-- <v-container fluid ma-0 pa-0 class="black">
      <Footer telNumber="090-1829-7194" stopImage />
    </v-container> -->
  </section>
</template>

<script>
import { mdiUndoVariant } from '@mdi/js'
import Footer from '@/components/Footer'
export default {
  data() {
    return {
      mdiUndoVariant,
      finished: false,
      title: 'お問い合わせ',
      name: '',
      email: '',
      message: '',
      botfield: '',
    }
  },
  computed: {
    isEmpty() {
      if (this.name !== '' && this.email !== '' && this.message !== '') {
        return false
      }
      return true
    },
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    async handleSubmit() {
      const params = new FormData()
      // //以下、ダミーフォームの各フォーム要素のnameと合わせる
      params.append('form-name', 'contact')
      params.append('name', this.name)
      params.append('email', this.email)
      params.append('message', this.message)
      params.append('bot-field', this.botfield)
      const response = await this.$axios.$post(window.location.origin, params)
      // //実際はresponseを使って画面側にフィードバックさせるが、ここでは仮にconsoleに出力
      // console.log(response)
      if (response) {
        this.finished = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/layout';
.bg-contact {
  background: linear-gradient(to top, #ddd 30%, #f8f9fa);
}
.lead {
  font-size: 1.25rem;
  font-weight: 300;
}
.btn-lg {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>
