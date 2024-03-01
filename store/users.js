/**
 * ストアusersの説明
 *   保持データ
 *       email(メールアドレスを保持)
 */
export const state = () => ({
  email: undefined,
  name: undefined,
})

export const mutations = {
  setEmail(state, email) {
    if (state.email !== email) state.email = email
  },
  setName(state, name) {
    if (state.name !== name) state.name = name
  },
}

export const getters = {
  email(state) {
    return state.email
  },
  name(state) {
    return state.name
  },
}
