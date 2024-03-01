import axios from 'axios'

export const state = () => ({
  counter: 0,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
}

// サーバサイドでの初期動作
export const actions = {
  // ブラウザリロード時にも動作するようだ
  async nuxtServerInit({ state, commit, dispatch }, { app, req }) {
    console.log('nuxtServerInit')
    // console.log('nuxtServerInit app:', app)
    // ここでのappはnuxtの物であり、expressではない
    // ここでexpressを扱えない
    console.log('nuxtServerInit req.url:', req?.url)
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
    // await dispatch(`wp/fetchMeta`)

    // ここだとAPI_URLが効かない
    // const url = 'http://localhost:3000/api/getScheduleConfig'
    // const url = '/api/getScheduleConfig'
    // const config = await axios.get(url)
    // console.log('config: ', config)

    // 以下は取得できるが、初期値のundefinedになる
    // const email = state.users.email
    // console.log('nuxtServerInit email: ', email)
    // サーバー起動時に初回events生成を呼ぶ
    // => nuxt generateの場合は呼ばない方がよい
    // console.log('nuxtServerInit call calendar/updateEvents')
    // await dispatch('calendar/updateEvents')
    // console.log('nuxtServerInit call calendar/updateConfig')
    // await dispatch('calendar/updateConfig')

    // サーバ始動時に API_URLが auzreならば
    // POST createPeople (bodyは空)を呼び
    // blobへ登録させる
    if (process.server) {
      console.log('process.env.API_URL: ', process.env.API_URL)
      if (
        process.env.API_URL &&
        process.env.API_URL.indexOf('azurewebsites') >= 0
      )
        // if (process.env.API_URL)
        try {
          // this.$axiosとthisが使えるようだ
          this.$axios.post('/api/createPeople', {})
        } catch (err) {
          console.log('err: ', err)
        }
    }
  },
  async nuxtClientInit({ state, commit, dispatch }, { app }) {
    //
    // console.log('app.$axios.API_URL: ', app.$axios.API_URL)
    // console.log('app.$axios.defaults.baseURL: ', app.$axios.defaults.baseURL)
    // トップページのロードにも影響するので、ここは止めておく
    // クライアント初期化
    // console.log('nuxtClientInit call calendar/updateEvents')
    // await dispatch('calendar/updateEvents')
    // ★★★以下で手間取る
    // console.log('nuxtClientInit call calendar/updateConfig')
    // await dispatch('calendar/updateConfig')
  },
}
