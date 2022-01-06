<template>
  <div class="tree-item" v-if="isShowBySelectedStatus" :style="{fontSize: districtData.code.length==2?'14px':'12px'}">
    <div class="content" @click="openOrClose">
      <span :class="{'level-1':districtData.code.length==2,'level-2':districtData.code.length==4}">
        <byf-icon v-show="districtData.children" :class="{show:districtData.childrenShow[actionType]}" type="iconright" class="openIcon" ></byf-icon>
        {{districtData.name}}
      </span>                                                                                                                                                                                                                                                                                                                                                                                                                    
      <a-button v-if="actionType == 0" class="choose-btn" size="small" type="link" @click.stop="onSelect">选择</a-button>                                                                                                                                                                                                                                                                         
      <a-button v-else class="choose-btn" size="small" type="link" @click.stop="onCancel">取消</a-button>
    </div>
    <div class="children-list" v-if="districtData.childrenShow[actionType]">
      <template v-for="(item, index) in districtData.children">
        <district-item :key="item.code" :indexPath="[...indexPath, index]" :districtData="item" :actionType="actionType" @select="onChildSelect"
          @cancel="onChildCancel"
        />
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DistrictItem',
  props: {
    /**
     * 行政区数据
     */
    districtData: {
      type: Object,
      required: true
    },
    actionType: {
      type: Number,
      required: true
    },
    /**
     * 数组 记录从第一级到 本数据 的所有 索引
     */
    indexPath: {
      type: Array,
      required: true
    },
    searchValue: {
      type: String
    }
  },
  computed: {
    isShowBySelectedStatus(){
      let show = false;

      // 三种selectedStatus选中状态：0：完全未选中（自己和子元素没有一个被选中）。1：半选中（自己未选中，部分子元素被选中，部分子元素未选中）。2：完全选中（自己和子元素都被选中）
      if (this.actionType == 0) {
        // 选择操作
        if (this.districtData.selectedStatus == 0 || this.districtData.selectedStatus == 1) {
          // 完全未选中 或者 1：半选中（自己未选中，部分子元素被选中，部分子元素未选中）

          // 再判断搜索状态
          if (this.districtData.searchStatus == 1 || this.districtData.searchStatus == 2) {
            show = true
          }
        } else if(this.districtData.selectedStatus == 2) {
          show = false
        }

      } else if(this.actionType == 1) {
        // 取消操作
        if (this.districtData.selectedStatus == 0) {
          // 完全未选中
          show = false
        } else if(this.districtData.selectedStatus == 1) {
          // 1：半选中（自己未选中，部分子元素被选中，部分子元素未选中）
          show = true
        } else if(this.districtData.selectedStatus == 2) {
          show = true
        }
      }
      return show
    }
  },
  methods: {
    onSelect(){
      // 修改自己的选择状态
      // 直接变为完全选中状态
      this.districtData.selectedStatus = 2
      let handleStatus = (oneData)=>{
        oneData.selectedStatus = 2
        if(oneData.children && oneData.children.length > 0) {
          oneData.children.forEach(item=>{
            handleStatus(item)
          })
        }
      }
      // console.log('this.districtData.selectedStatus: ', this.districtData.selectedStatus)
      if(this.districtData.children && this.districtData.children.length > 0) {
        // 如果有子元素，子元素也变为完全选中
        this.districtData.children.forEach(item=>{
          handleStatus(item)
        })
      }

      // 告知父级自己被选中
      this.$emit('select')
    },
    onChildSelect(){
      // 得知子元素被选中
      // 处理选中状态
      let status = 2;
      if(this.districtData.children && this.districtData.children.length>0) {
        for(let i = 0;i<this.districtData.children.length;i++){
          let one = this.districtData.children[i]
          if(one.selectedStatus == 0 || one.selectedStatus == 1) {
            // 只要有一个下级是完全未选中或半选状态
            status = 1;
            break;
          }
        }
      }
      this.districtData.selectedStatus = status;

      // TODO 看产品要求了，如果不处理也说的通。 如果在搜索中，需要处理搜索状态。此时，自己的搜索状态可能有1或2两种情况
      // if(this.searchValue) {
      //   if (this.districtData.searchStatus == 1) {
      //     // 
      //   } else if (this.districtData.searchStatus == 2){
      //     console.log('搜索状态为2，所有的子数据搜索状态都会是2，就都会展示，所以不须处理，因为自己在左侧的显示隐藏会根据选中状态的处理进行正确展示。')
      //   }
        
      // }

      // 往上级传递，更新选择状态
      this.$emit('select')
    },
    onCancel(){
      // 修改自己的选择状态
      // 直接变为完全未选中状态
      this.districtData.selectedStatus = 0
      let handleStatus = (oneData)=>{
        oneData.selectedStatus = 0
        if(oneData.children && oneData.children.length > 0) {
          oneData.children.forEach(item=>{
            handleStatus(item)
          })
        }
      }
      
      if(this.districtData.children && this.districtData.children.length > 0) {
        // 如果有子元素，子元素也变为完全未选中
        this.districtData.children.forEach(item=>{
          handleStatus(item)
        })
      }

      // 告知父级自己被取消选中
      this.$emit('cancel')
    },
    onChildCancel(){
      // 得知子元素取消选中
      // 处理选中状态
      let status = 0;
      if(this.districtData.children && this.districtData.children.length>0) {
        for(let i = 0;i<this.districtData.children.length;i++){
          let one = this.districtData.children[i]
          if(one.selectedStatus == 2 || one.selectedStatus == 1) {
            // 只要有一个下级是完全选中或半选状态
            status = 1;
            break;
          }
        }
      }
      this.districtData.selectedStatus = status;

      // 往上级传递，更新选择状态
      this.$emit('cancel')
    },
    openOrClose(){
      let arr = JSON.parse(JSON.stringify(this.districtData.childrenShow))
      arr[this.actionType] = !arr[this.actionType]
      this.districtData.childrenShow = arr
    },
  }
}
</script>

<style lang="less" scoped>
  .tree-item{
    margin-bottom: 10px;
    .content{
      display: flex;
      justify-content: space-between;
      padding-left: 2px;
      margin-top: 10px;
      &:hover{
        cursor: pointer;
        background:#f9f9f9;
      }
      span {
        color: @text-color-secondary;
        display: flex;
        align-items: center;
        &.level-1, &.level-2 {
          color: @text-color;
        }
        .openIcon{
          font-size: 12px;
          margin-right: 5px;
          transition: transform .2s;
          transform: rotate(0deg) scale(0.7);
          &.show {
            transform: rotate(90deg) scale(0.7);
          }
        }
      }
      .choose-btn{
        font-size: 12px;
        &:hover {
          /deep/ span {
            text-decoration: underline;
          }
        }
      }
    }
    .children-list {
      padding-left: 17px;
    }
  }
</style>