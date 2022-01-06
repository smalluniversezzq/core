export default {
  namespaced: true,
  state: {
    isRouterAlive: true,
  },
  getters: {
  },
  mutations: {
    reload(state, vm){
      state.isRouterAlive = false;
      vm.$nextTick(() => {
        state.isRouterAlive = true;
      })
    },
    reloadIframe(state, path){
      let iframeWindow = document.getElementById(path).contentWindow;
      iframeWindow.location.reload()
    },
  }
}
