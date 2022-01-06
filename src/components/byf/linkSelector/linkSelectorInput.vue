<template>
  <div>
    <div class="select-wrap">
      <span :class="{'jurisdiction': jurisdiction}">
        <byf-icon slot="prefix" type="iconlianjie1" />
        <a-button :disabled="disabled" v-show="selectedLinks.length == 0" type="link" @click="checkedLink">选择链接</a-button>
        <a-button :disabled="disabled" :title="desc" class="links-name-btn" v-show="selectedLinks.length"  type="link" @click="checkedLink">
          <span class="text-overflow-1 links-name">{{linkName}}</span>
        </a-button>
        <!-- <span v-show="selectedLinks.link_id">{{selectedLinks.name}}</span> -->
      </span>
      <span class="right-box" :class="{'jurisdiction': jurisdiction}" v-show="selectedLinks.length">
        <a-button :disabled="disabled" v-if="jurisdiction" class="change-btn" type="link" size="small">权限</a-button>
        <!-- <a-button :disabled="disabled" class="change-btn" type="link" size="small" @click="checkedLink">修改</a-button> -->
        <byf-icon :class="{'disabled-use': disabled, 'use': !disabled}" class="clear-icon" type="iconai54" @click="clearLink"></byf-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  props: {
    extraTitle: {
      type: String,
      default: () => {
        return '';
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示权限按钮
    jurisdiction:{
      type: Boolean,
      default: false
    },
    links: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectors: {
      type: Array,
      default: () =>{
        return []
      }
    },
    apiParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    desc(){
      let desc = '';
      if(this.selectedLinks.length){
        desc = this.selectedLinks[0].desc;
      }
      return desc;
    },
    linkName(){
      let name = '';
      if(this.selectedLinks.length){
        name = this.selectedLinks[0].name;
      }
      return name;
    }
  },
  watch: {
    links(newValue){
      this.selectedLinks = cloneDeep(newValue)
    }
  },
  data(){
    return {
      selectedLinks: cloneDeep(this.links)
    }
  },
  methods: {
    checkedLink(){
      this.$byfLinkSelector({
        links: this.selectedLinks, 
        selectors: this.selectors, 
        apiParams: this.apiParams,
        extraTitle: this.extraTitle,
      }).then(res => {
        if(res.action == 'confirm'){
          // 确认
          this.selectedLinks = res.links;
          this.$emit('confirm', this.selectedLinks)
        }
      })
    },
    clearLink(){
      if(!this.disabled){
        this.selectedLinks = [];
        this.$emit('confirm', this.selectedLinks)
      }
    }
  }
}
</script>

<style scoped lang="less">
.select-wrap{
  width: 100%;
  // width: 100%;
  // min-width: 300px;
  border: 1px solid @border-color-base;
  border-radius: @border-radius-base;
  padding-left: 5px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2px;
  >span{
    display: flex;
    align-items: center;
    &:nth-of-type(1){
      // width: 56%;
      max-width: calc(100% - 80px);
      &.jurisdiction{
        max-width: calc(100% - 125px);
      }
    }
    &:nth-of-type(2){
      width: 80px;
      &.jurisdiction{
        width: 125px;
      }
    }
  }
  
  .links-name-btn{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .links-name{
    max-width: 100%;
    padding-left: 5px;
  }
  .right-box{
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .clear-icon{
      color: rgba(0,0,0,.25);
      font-size: 12px;
      overflow: hidden;
      padding-right: 10px;
      &.use{
        cursor: pointer;
        &:hover{
          color: rgba(0,0,0,.45);
        }
      }
      &.disabled-use{
        cursor: not-allowed;
      }
      
    }
    .change-btn{
      border-left: 1px solid @border-color-base;
    }
  }
}
</style>