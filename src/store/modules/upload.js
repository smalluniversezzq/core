export default {
  namespaced: true,
  state: {
    isShow: false
  },
  mutations: {
    setStatus(state, val) {
      // console.log("已经获取")
      state.isShow = val
    }
  },
  getters: {
    getStatus(state) {
      return state.isShow
    }
  }
}
