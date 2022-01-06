let mixin = {
  data(){
    return {
      keyword: '',
      is_fans: 0,
      pagination: {
        current: 1,
        pageSize: 100,
      },
    }
  },
  methods: {
    // 判断数组中是否有加载更多按钮
    hasLoadBtn(arr){
      return arr.some(item => {
        return item.uid.toString().indexOf('loadBtn') > -1;
      })
    },
    loadingBtnObj(parent_id, pagination = JSON.parse(JSON.stringify(this.pagination))){
      let loadingBtn = {
        uid: 'loadBtn-' + parent_id,
        parent_id: parent_id,
        title: '加载更多',
        itemType: 'btn',
        btnLoading: false,
        selectable: false,
        finished: false,
        isLeaf: true,
        pagination,
        scopedSlots: {title: 'operate'}
      }
      return loadingBtn;
    },
  },
}
export default mixin;