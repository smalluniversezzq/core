<template>
  <div class="selected-list">
    <div class="address-head">
      <span class="title">已选择</span>
    </div>
    <div class="address-box beauty-scroll" :style="{height:handleHeight(height)}">
      <div class="treeListWrap">
        <template v-for="(item, index) in list">
          <district-item :key="item.code" :districtData="item" :indexPath="[index]" 
            :actionType="actionType" 
          />
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
    originalAddress: {
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
      actionType: 1,  // 0：为选择操作。1：为取消操作
    }
  },
  created(){
  },
  methods: {
    handleHeight(height){
      if(height.toString().includes('px') || height.toString().includes('vh')) {
        return height
      } else {
        return height+'px'
      }
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