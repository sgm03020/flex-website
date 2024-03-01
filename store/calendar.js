/**
 * ストアcalendarの説明
 *   保持データ
 *       events(google calendarのイベントを保持)
 */
export const state = () => ({
  // 初期値
  config: {
    baseHours: [13, 14, 15, 16, 17, 18, 19, 21],
    timePeriod: 60,
  },
  events: null,
  myEvents: null,
})

export const mutations = {
  setConfig(state, config) {
    if (JSON.stringify(state.config) !== JSON.stringify(config))
      state.config = config
  },
  setEvents(state, events) {
    if (JSON.stringify(state.events) !== JSON.stringify(events))
      state.events = events
  },
  setMyEvents(state, events) {
    if (JSON.stringify(state.myEvents) !== JSON.stringify(events))
      state.myEvents = events
  },
}

export const getters = {
  config(state) {
    return state.config
  },
  events(state) {
    return state.events
  },
  myEvents(state) {
    return state.myEvents
  },
}

export const actions = {
  async updateConfig({ rootState, state, commit }) {
    console.log('called updateConfig')
    // /api/getScheduleConfigが実装されていない場合の対処を追加
    // const url = 'http://localhost:3000/api/getScheduleConfig'
    // const config = await axios.get(url)
    let url = '/api/getScheduleConfig'
    // なぜか APU_URLにlocalhost:5000とかにしていると、/api/...では:3000のままになる
    if (process.env.API_URL) {
      console.log('API_URL: ', process.env.API_URL)
      // こんなものなし。console.log('this.$axios.API_URL: ', this.$axios.API_URL)
      // 以下あり。process.env.API_URLがコピーされる
      console.log(
        'this.$axios.defaults.baseURL: ',
        this.$axios.defaults.baseURL
      )
      // url = process.env.API_URL + url
    }

    let ret
    try {
      ret = await this.$axios.get(url)
      console.log('config: ', ret.data)
      if (
        ret.data &&
        JSON.stringify(state.config) !== JSON.stringify(ret.data)
      ) {
        // console.log('config change set: ', ret.data)
        commit('setConfig', ret.data)
      }
    } catch (err) {
      console.log('err: ', err)
      // let defaultConfig = {
      //   baseHours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      //   timePeriod: 60,
      // }
      // console.log('set default', defaultConfig)
      // commit('setConfig', defaultConfig)
    }
    console.log('end updateConfig')
  },
  // nuxtServerInitはstore/index.jsのactionで使用します。
  // 現在initEventsはupdateEventsに集約されている
  async initEvents({ rootState, commit }) {
    console.log('initEvents')
    try {
      // interceptors
      if (process.env.API_DEBUG) {
        this.$axios.onRequest((config) => {
          console.log('axios onRequest baseURL', config.baseURL)
          console.log('axios onRequest url:', config.url)
        })
      }
      let url = '/api/events'
      const events = await this.$axios.get(url)
      if (events.data) {
        commit('setEvents', events.data)
      }
    } catch (err) {
      console.log('initEvents error:', err)
    }
  },
  async updateEvents({ rootState, getters, state, commit }) {
    console.log('called updateEvents')
    // テスト用カレンダー
    let test = false
    if (process.env.CALENDAR_TEST) test = true
    if (process.env.CALENDAR === 'test') test = true

    let url = '/api/events'
    // API_URL_SLAVE対応
    // 14:00以降はSLAVE
    // new Date()
    const japanStandardTime = new Date().toLocaleString({
      timeZone: 'Asia/Tokyo',
    })
    const hh = new Date(japanStandardTime).getHours()
    console.log('hh: ', hh)
    if (
      hh >= 0 &&
      hh <= 12 &&
      process.env.API_URL_SLAVE &&
      process.env.API_URL_SLAVE !== ''
    ) {
      url = process.env.API_URL_SLAVE + '/api/events'
      console.log('url: ', url)
    }
    // const email = getters.users.email // or rootState.users.email
    const addr = rootState.users.email
    // console.log('updateEvents email: ', addr)
    console.log('addr: ', addr)
    const params = { addr, ...((test && { test: true }) || {}) }
    // const params = { addr, test: true }
    console.log('params: ', params)
    // axiosでのクエリパラメータ指定方法
    // axios.get('/api/xxx', { params: { ID: 12345} })
    let events
    try {
      events = await this.$axios.get(url, { params })
      // if (events.data) console.log('events.data: ', events.data)
    } catch (err) {
      console.log('error:', err)
    }
    console.log('called updateEvents')
    // events.dataが{}の場合はAPI側で取得に失敗している
    // []ならばゼロ件で正しい
    // Array.isArray(events.data) として配列かどうかをチェックする
    // したがって内部的にはnullのままとなる({}を無視する感じ)
    if (
      (!state.events && events && events.data) ||
      (state.events &&
        events &&
        events.data &&
        JSON.stringify(state.events) !== JSON.stringify(events.data))
    ) {
      if (Array.isArray(events.data)) {
        console.log('commit')
        await commit('setEvents', events.data)
        return events.data.length
        // ユーザ自身のeventsを検索
        // (不必要かもしれないためコメント化)
        // ここから
        // const userEvents = events.data.reduce((acc, value, index) => {
        //   const list = value.attendees || []
        //   const find = list.findIndex(
        //     (v) => v.email && v.email === rootState.users.email
        //   )
        //   if (find >= 0) acc.push(value)
        //   return [...acc]
        // }, [])
        // // console.log('userEvents: ', userEvents)
        // // 登録
        // if (userEvents && userEvents.length > 0)
        //   await commit('setMyEvents', userEvents)
        // ここまで
        // console.log('return: ', events.data.length)
      } else {
        // events.dataが配列ではない場合(すなわち{}である)
        console.log('commit')
        await commit('setEvents', null)
        return 0
      }
    } else {
      // console.log("don't update. events is same. ")
      return 0
    }
  },
  clearEvents({ commit }) {
    commit('setEvents', null)
  },
}
