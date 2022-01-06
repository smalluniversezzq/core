<template>
  <div class="component-item" 
    :class="componentClass"
    @click="onClickMe(component)"
  >
    <byf-icon class="icon" :type="component.icon"></byf-icon>
    <span :style="getStyle(component.title)">{{component.title}}</span>
</div>
</template>

<script>
// eslint-disable-next-line
import { MutexRules } from '@/components/byf/renovation/dataManager/componentsDataManager/common/BaseComponent'

export default {
  props: {
    component: {
      type: Object
    },
    selectedComponentsNumList: {
      type: Object
    },
    selectedComponentsList: {
      type: Array
    }
  },
  computed: {
    isDisabled(){
      if(this.component.maxNumber >= 0 && this.component.maxNumber <= this.selectedComponentsNumList[this.component.componentKey]) {
        // 当组件有数量限制，并且达到了数量限制
        return true;
      } else if(this.judgeMutexRules()) {
        // 当预览区有互斥的组件
        return true;
      }
      return false
    },
    componentClass(){
      let object = {
        'disabled-component': this.isDisabled,
      };
      return object
    }
  },
  methods: {
    onClickMe(oneComponent){
      if(!this.isDisabled) {
        this.$emit('chooseOneComponent', oneComponent)
      }
    },
    getStyle(title){
      if(title.length>=6){
        return {
          padding: '0 2px',
          fontSize: '12px'
        }
      }
    },
    /**
     * 判断互斥
     */
    judgeMutexRules(){
      // 遍历互斥规则组
      for(let x in MutexRules) {
        let group = MutexRules[x];
        if(group.includes(this.component.componentKey)) {
          // 如果某个互斥规则组 包含本组件
          // 遍历已选组件列表
          for(let y in this.selectedComponentsList) {
            let oneSelected = this.selectedComponentsList[y]
            if(oneSelected.componentKey != this.component.componentKey && group.includes(oneSelected.componentKey)) {
              // 如果已选组件列表包含一个 互斥组件
              return true;
            }
          }
        }
      }
      // 所有遍历完，走到这里表示没有互斥组件
      return false;
    }
  }
}
</script>

<style lang="less" scoped>

  .component-item {
    width: 82px;
    height: 82px;
    background: @background-color-light;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    transition: background-color .3s, color .3s, border .3s;
    border:1px solid @background-color-light;
    position: relative;
    &:not(:nth-child(3n)){
      margin-right: 11px;
    }
    &:nth-child(n+4) {
      margin-top: 10px;
    }
    cursor: pointer;
    &:hover {
      border:1px solid @processing-color;
      background: @item-hover-bg;
      color: @primary-color;
    }
    &.disabled-component {
      filter: grayscale(100%);
      cursor: not-allowed;
    }
    .icon {
      color: @primary-color;
      font-size: 24px;
      margin: 5px;
    }
    span {
      font-size: 14px;
      font-weight: bold;
      padding: 0 5px;
    }
  }
</style>