<template>
  <div class="select-list">
    <div class="address-head">
      <span class="title">地区选择</span>
      <a-input ref="input" class="input" :value="searchValue" placeholder="搜索省/市/区" @change="onInputChange"></a-input>
    </div>
    <div class="address-box beauty-scroll" :style="{height:handleHeight(height)}">
      <div class="treeListWrap">
        <template v-for="(item, index) in list">
          <district-item :key="item.code" :districtData="item" :indexPath="[index]" :actionType="actionType" :searchValue="searchValue"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import DistrictItem from '../districtItem'

export default {
  components: {DistrictItem},
  props: {
    list: {
      type: Array,
      required: true
    },
    height: {
      type:[String, Number],
      default: ()=>{return 400}
    }
  },
  data(){
    return {
      actionType: 0, // 0：为选择操作。1：为取消操作
      searchValue: '',
      time: null,
    }
  },
  methods: {
    handleHeight(height){
      if(height.toString().includes('px') || height.toString().includes('vh')) {
        return height
      } else {
        return height+'px'
      }
    },
    onInputChange(e){
      if(this.time) {
        clearTimeout(this.time)
      }
      this.time = setTimeout(() => {
        let searchText = e.target.value
        this.searchValue = searchText;
        // console.log(searchText)
        this.list.forEach(item=>{
          this.handleOneData(item, searchText)
        })
      }, 300);
    },
    /**
     * 处理数据的搜索状态 
     */
    handleOneData(oneData, searchText){
      // 确定自己的搜索状态
      if (oneData.name.includes(searchText)) {
        // 当自己完全匹配，就将子元素都变成完全匹配状态
        // console.log('完全匹配oneData: ', oneData.name)
        this.handleMatchData(oneData)
      } else {
        // console.log('不匹配oneData: ', oneData.name)
        // 如果自己不匹配。剩下0 和 1 两种情况
        if (oneData.children && oneData.children.length > 0) {
          // 有子数据时，就再处理子数据的情况
          oneData.children.forEach(item=>{
            this.handleOneData(item, searchText)
          })
          
          // 当子数据处理完
          // 处理自己选中状态
          let status = 0;
          if(oneData.children && oneData.children.length>0) {
            for(let i = 0;i<oneData.children.length;i++){
              let one = oneData.children[i]
              if(one.searchStatus == 1 || one.searchStatus == 2) {
                // 只要有一个下级是半匹配或 完全匹配
                status = 1;
                oneData.childrenShow[this.actionType] = true
                break;
              }
            }
          }
          oneData.searchStatus = status;
        } else {
          // 自己不匹配，并且没有子数据，则搜索 状态 为 0
          oneData.searchStatus = 0
        }
      }
    },
    /**
     * 处理一个匹配的数据
     */
    handleMatchData(oneData){
      // 直接变为完全匹配状态
      oneData.searchStatus = 2
      
      if(oneData.children && oneData.children.length > 0) {
        // 如果有子元素，子元素也变为完全匹配
        oneData.children.forEach(item=>{
          this.handleMatchData(item)
        })
      }
    }
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
  line-height: 600px;
  text-align: center;
  font-size: 26px;
  color: #a9a9a9;
}
.address-box{
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #f0f0f0;
  padding: 10px;
  padding-top: 0;
}
</style>