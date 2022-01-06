import config from '@/config'
import {ADMIN} from '@/config/default'
export default {
  namespaced: true,
  state: {
    isMobile: false,
    animates: ADMIN.animates,
    palettes: ADMIN.palettes,
    pageMinHeight: 0,
    menuData: [],
    consoleMenuData: [], // 控制台端的菜单数据
    platformInfo: {},
    ...config,
    routerList:"",
  },
  getters: {
    platformInfo: state => {
      if (JSON.stringify(state.platformInfo) == '{}') {
        try {
          const platformInfo = localStorage.getItem('platformInfo');
          state.platformInfo = JSON.parse(platformInfo)
        } catch (e) {
          console.error(e)
        }
      }
      return state.platformInfo
    },
  },
  mutations: {
    setPlatformInfo(state, platformInfo){
      state.platformInfo = platformInfo;
      localStorage.setItem('platformInfo', JSON.stringify(platformInfo))
    },
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    },
    setTheme (state, theme) {
      state.theme = theme
    },
    setLayout (state, layout) {
      state.layout = layout
    },
    setMultiPage (state, multiPage) {
      state.multiPage = multiPage
    },
    setAnimate (state, animate) {
      state.animate = animate
    },
    setWeekMode(state, weekMode) {
      state.weekMode = weekMode
    },
    setFixedHeader(state, fixedHeader) {
      state.fixedHeader = fixedHeader
    },
    setFixedSideBar(state, fixedSideBar) {
      state.fixedSideBar = fixedSideBar
    },
    setLang(state, lang) {
      state.lang = lang
    },
    setHideSetting(state, hideSetting) {
      state.hideSetting = hideSetting
    },
    correctPageMinHeight(state, minHeight) {
      state.pageMinHeight += minHeight
    },
    setMenuData(state, menuData) {
      state.menuData = menuData
    },
    setPlatformMenuData(state, consoleMenuData) {
      state.consoleMenuData = consoleMenuData
    },
    setAsyncRoutes(state, asyncRoutes) {
      state.asyncRoutes = asyncRoutes
    },
    setRoute(state,routerList){
      state.routerList = routerList
    },
  }
}
