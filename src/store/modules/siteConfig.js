export default {
  namespaced: true,
  state: {
    configInfo: null,
    // login_account: '',
    // site_name: '',
    // site_icon: '',
    // site_logo: '',
    // copyright_logo: '',
  },
  getters: {
    configInfo: state => {
      if(localStorage.getItem('configInfo')){
        const configInfo = localStorage.getItem('configInfo')
        state.configInfo = JSON.parse(configInfo)
      }
      // if (!state.configInfo) {
      //   try {
      //     const configInfo = localStorage.getItem('configInfo')
      //     state.configInfo = JSON.parse(configInfo)
      //   } catch (e) {
      //     console.error(e)
      //   }
      // }
      return state.configInfo
    },
    copyrightType: state => {
      let type = 1;
      if(state.configInfo){
        type = state.configInfo.copyright_logo_type
      }
      return type;
    }
  },
  mutations: {
    setConfigInfo(state, info){
      console.log(1111111)
      console.log({...state.configInfo,...info})
      state.configInfo = {...state.configInfo,...info};
      localStorage.setItem('configInfo', JSON.stringify(state.configInfo))
    }
  }
}
