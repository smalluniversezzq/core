<template>
  <a-row class="district-select">
    <a-col :span="11">
      <select-list :height="height" :list="realList"></select-list>
    </a-col>
    <a-col :span="2" class="rightIcon" :style="{lineHeight: handleHeight(height)}">
      <byf-icon type="iconarrow-double-right"></byf-icon>
    </a-col>
    <a-col :span="11">
      <selected-list :height="height" ref="selectedBox" :list="realList" :originalAddress="originalAddress"></selected-list>
    </a-col>
  </a-row>
</template>
<script>
import SelectList from './selectList'
import SelectedList from './selectedList'

// import address from '@/assets/address.json'
  // eslint-disable-next-line
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'districtSelect',
  // eslint-disable-next-line
  components: { SelectList, SelectedList},
  props: {
    list: {
      type:Array,
      required: false,
      default: ()=>{return []}
    },
    height: {
      type:[String, Number],
      default: ()=>{return 400}
    }
  },
  data(){
    return {
      realList: [],
      originalAddress: [],
    }
  },
  created(){
    // 获取服务器上的省市区数据文件
    fetch(process.env.VUE_APP_API_BASE_URL+'/js/pca-code.json').then((response)=>{
      return response.json()
    }).then((data)=>{
      this.originalAddress = data
      this.realList = cloneDeep(data)
      this.initData()
      this.handleSelectedData(this.realList, this.list)
    })
  },
  mounted(){
  },
  methods: {
    handleHeight(height){
      if(height.toString().includes('px') || height.toString().includes('vh')) {
        return height
      } else {
        return height+'px'
      }
    },
    initData(){
      // 默认折叠子元素
      // 初始化，添加选中状态为 完全未选中
      this.realList.forEach(item => {
        this.initOneData(item)
      })
    },
    initOneData(oneData){
      this.$set(oneData, 'childrenShow', [false, false])
      // 三种选中状态：0：完全未选中（自己和子元素没有一个被选中）。1：半选中（自己未选中，部分子元素被选中，部分子元素未选中）。2：完全选中（自己和子元素都被选中）
      this.$set(oneData, 'selectedStatus', 0)
      // 三种搜索状态：0：完全不匹配（自己和子元素没有一个匹配）。1：半匹配（自己不匹配，部分子元素匹配，部分子元素不匹配）。2：完全匹配（自己匹配）
      this.$set(oneData, 'searchStatus', 2)
      if (oneData.children && oneData.children.length > 0) {
        oneData.children.forEach(item=>{
          this.initOneData(item)
        })
      }
    },
    /**
     * 根据接收到的数据，处理选择状态
     * @param [array] allList 全部数据
     * @param [array] list2 接收到的数据。包含的数据在allList中都有。
     */
    handleSelectedData(allList, list2){
      let handleOne= (oneList, aList)=>{
        oneList.forEach(item => {

          // 找到item在aList中的对应数据
          let oneDataInAllList = {}
          for(let i=0;i<aList.length;i++){
            if(aList[i].code == item.code) {
              // 找到item在aList中的对应数据
              oneDataInAllList = aList[i]
              break;
            }
          }

          if(item.children && item.children.length>0) {
            // 如果item有子数据，oneDataInAllList肯定也有
            handleOne(item.children, oneDataInAllList.children)
          }

          // 从深处向外 遍历多维数组中的每一项
          // console.log('item.name: ', item.name)
          this.handleOneSelectedStatus(oneDataInAllList)
        })
      }
      handleOne(list2, allList)
    },
    /**
     * 处理一条数据的选中状态
     */
    handleOneSelectedStatus(oneDataInAllList){
      // 处理选中状态
      let status = 2;
      if(oneDataInAllList.children && oneDataInAllList.children.length>0) {
        for(let i = 0;i<oneDataInAllList.children.length;i++){
          let one = oneDataInAllList.children[i]
          if(one.selectedStatus == 0 || one.selectedStatus == 1) {
            // 只要有一个下级是完全未选中或半选状态
            status = 1;
            break;
          }
        }
      }
      oneDataInAllList.selectedStatus = status;
    },
    /**
     * 对外提供 获取数据
     * @returns [array] [
     *  code: xxxx, 行政区域码，
     *  name: 地名，
     *  children: [] , 子区域，
     *  selectedStatus:  // 三种选中状态：0：完全未选中（自己和子元素没有一个被选中）。1：半选中（自己未选中，部分子元素被选中，部分子元素未选中）。2：完全选中（自己和子元素都被选中）
     * ]
     */
    getData(){
      let arr = cloneDeep(this.realList)
      let filterData = (list)=>{
        for(let i = list.length-1;i>=0;i--){
          let one = list[i]
          if(one.selectedStatus == 0) {
            // 删除完全未选中的数据
            list.splice(i,1)
          } else {
            // 去除无用属性
            delete one.childrenShow
            delete one.searchStatus
            if(one.children && one.children.length>0) {
              filterData(one.children)
            }
          }
        }
      }
      filterData(arr)
      return arr
    },
  }
}
</script>
<style lang="less" scoped>
.address-head{
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  .title{
    line-height: 32px;
  }
  .input{
    width: 60%;
  }
}
.rightIcon{
  padding-top: 40px;
  line-height: 600px;
  text-align: center;
  font-size: 26px;
  color: #a9a9a9;
}
</style>