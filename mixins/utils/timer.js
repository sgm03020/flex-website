export default {
  data() {
    return {
      upTime: this.$dayjs(), // 更新時刻
      // events更新タイマー
      intervalID: null,
      limit: process.env.INTERVAL_LIMIT || 3,
    }
  },
  methods: {
    setTimer: function (callback, intervalTime) {
      if (process.server) return
      // 一回は即時実行する
      if (callback instanceof Array) {
        // コールバックが配列になっている場合はその全てを実行する
        callback.map((func) => func())
      } else {
        callback()
      }
      // 一回は即時実行する
      this.upTime = this.$dayjs()

      // 以降はタイマー
      this.intervalID = setInterval(() => {
        // 複数のcallbackに対応
        if (callback instanceof Array) {
          // コールバックが配列になっている場合はその全てを実行する
          callback.map((func) => func())
        } else {
          callback()
        }
        // upTime更新
        this.upTime = this.$dayjs()
      }, intervalTime)

      // 万が一の不具合を防ぐために、ClearIntervalを実施する。（とりあえず30分=>3分）
      setTimeout(() => {
        clearInterval(this.intervalID)
        this.intervalID = null
      }, this.limit * 60 * 1000)
    },
  },
  beforeDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID)
      this.intervalID = null
    }
  },
}
