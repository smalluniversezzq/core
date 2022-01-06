import moment from 'moment'
export default {
  namespaced: true,
  state: {
    noticeNotReadNum: 0, // 未读数量
    list: [], // 公告页面的列表
    noticeTabPaneList: [], // 小铃铛中的列表，
  },
  getters: {
    noticeListForTabPane: state => {
      return state.noticeTabPaneList.filter((item, index) => {
        return index <= 3;
      })
    },
    noticeList: state => {
      if (!state.list) {
        try {
          const list = localStorage.getItem('noticeList')
          state.list = JSON.parse(list)
        } catch (e) {
          console.error(e)
        }
      }
      // 返回，并格式化时间显示
      return state.list;
    },
  },
  mutations: {
    setNoticeNotReadNum(state, noticeNotReadNum){
      state.noticeNotReadNum = noticeNotReadNum;
      localStorage.setItem('noticeNotReadNum', JSON.stringify(state.noticeNotReadNum))
    },
    setNoticeList(state, list){
      state.list = list;
      localStorage.setItem('noticeList', JSON.stringify(state.list))
    },
    setNoticeTabPaneList(state, list){
      state.noticeTabPaneList = list;
      localStorage.setItem('noticeTabPaneList', JSON.stringify(state.noticeTabPaneList))
    },
    // 设置已读
    setRead (state, ids) {
      state.noticeTabPaneList.forEach(item => {
        if(ids.some(id => {return item.id == id})){
          item.is_read = 1;
        }
      })
      state.list.forEach(item => {
        if(ids.some(id => {return item.id == id})){
          item.is_read = 1;
          item.read_time = moment().unix();
        }
      })
      localStorage.setItem('noticeList', JSON.stringify(state.list))
    },
  },
}
