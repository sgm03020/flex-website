import createPersistedState from 'vuex-persistedstate'

// pathsを使うことで保持されるstoreを限定する
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ['users', 'calendar.myEvents'],
    })(store)
  })
}
