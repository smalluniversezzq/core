<template>
  <div class="page-components">
    <div class="one-selected-component" v-for="item in topComponent" :key="item.previewKey" >
      <byf-icon :type="item.icon"></byf-icon>
      <div class="title">{{item.title}}</div>
      <div class="handle-btns">
        <byf-icon class="edit" type="iconbianji" @click="onClickComponent(item)"></byf-icon>
        <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete(item)">
          <byf-icon class="delete" type="iconshanchu"></byf-icon>
        </a-popconfirm>
      </div>
    </div>
    <div class="sortable-list" ref="sortableList">
      <div class="one-selected-component" v-for="item in normalComponent" :key="item.previewKey">
        <byf-icon :type="item.icon"></byf-icon>
        <div class="title">{{item.title}}</div>
        <div class="handle-btns">
          <byf-icon class="edit" type="iconbianji" @click="onClickComponent(item)"></byf-icon>
          <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete(item)">
            <byf-icon class="delete" type="iconshanchu"></byf-icon>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div class="one-selected-component" v-for="item in bottomComponent" :key="item.previewKey">
      <byf-icon :type="item.icon"></byf-icon>
      <div class="title">{{item.title}}</div>
      <div class="handle-btns">
        <byf-icon class="edit" type="iconbianji" @click="onClickComponent(item)"></byf-icon>
        <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete(item)">
          <byf-icon class="delete" type="iconshanchu"></byf-icon>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  props:{
    pageDataManager: {
      type: Object
    }
  },
  computed: {
    /**
     * 属于顶部区域的组件
     */
    topComponent(){
      let arr = []
      for(let i = 0;i<this.pageDataManager.selectedComponentsList.length;i++){
        if(this.pageDataManager.selectedComponentsList[i].sortWeight>0){
          arr.push(this.pageDataManager.selectedComponentsList[i]);
        } else {
          break;
        }
      }
      return arr;
    },
    /**
     * 属于普通区域的组件
     */
    normalComponent(){
      let arr = []
      for(let i = 0;i<this.pageDataManager.selectedComponentsList.length;i++){
        if(this.pageDataManager.selectedComponentsList[i].sortWeight==0){
          arr.push(this.pageDataManager.selectedComponentsList[i]);
        } else if(this.pageDataManager.selectedComponentsList[i].sortWeight<0){
          break;
        }
      }
      return arr;
    },
    /**
     * 属于底部区域的组件
     */
    bottomComponent(){
      let arr = []
      for(let i = this.pageDataManager.selectedComponentsList.length-1;i>=0;i--){
        if(this.pageDataManager.selectedComponentsList[i].sortWeight<0){
          arr.push(this.pageDataManager.selectedComponentsList[i]);
        } else {
          break;
        }
      }
      return arr;
    }
  },
  mounted(){
    if(this.pageDataManager){
      this.initSortable()
    }
  },
  methods: {
    initSortable(){
      this.sortable = new Sortable(this.$refs.sortableList, {
        animation: 150,
        onEnd: (e)=>{
          this.pageDataManager.swapTwo(e.oldIndex+this.topComponent.length, e.newIndex+this.topComponent.length)
        }
      })
    },
    doDelete(component){
      this.pageDataManager.deleteOneComponent(component)
    },
    onClickComponent(data){
      this.pageDataManager.changeEditingTarget(data)
      this.$emit('changeEditingTarget', data)
    }
  }
}
</script>

<style lang="less" scoped>
  .page-components {
    border: 1px solid @border-color-base;
    .sortable-list {
      &:not(:last-child) {
        border-bottom: 1px solid @border-color-base;
      }
      .one-selected-component {
        cursor:n-resize;
      }
    }
    .one-selected-component {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      &:not(:last-child) {
        border-bottom: 1px solid @border-color-base;
      }
      &:hover {
        .handle-btns {
          opacity: 1;
        }
      }
      .title {
        margin-left: 20px;
        width: 150px;
      }
      .handle-btns {
        opacity: 0;
        transition: opacity .3s;
        margin-left: 30px;
        .anticon {
          margin-right: 20px;
          cursor: pointer;
          &.edit {
            color: @primary-color;
          }
          &.delete {
            color: @error-color;
          }
        }
      }
    }
  }
</style>