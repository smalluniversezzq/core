<template>
  <a-row class="spec-edit-item">
    <a-icon v-if="removeAble" type="close-circle" class="close-icon" theme="filled" @click="onClickDeleteParent"/>
    <a-row class="parent-specs-row" :class="{'has-error': specItemData.error}">
      <a-input v-model="specItemData.title" class="input" placeholder="如颜色、尺码、大小" @change="onInputChange" @blur="(e)=>{onBlur(e, specItemData)}"/>
      <a-checkbox :checked="isMainSpec(specItemData.is_main_spec)" style="margin-left:20px;" @click="onChangeMain">主规格</a-checkbox>
      <em v-if="isMainSpec(specItemData.is_main_spec)">设为主规格，要求规格图片必须上传</em>
      <div class="error" v-if="specItemData.error">请填写规格名称</div>
    </a-row>
    <a-row class="child-specs-row">
      <div class="child-input-item" :class="{'has-error': item.error}" v-for="(item, index) in specItemData.items" :key="'input'+index">
        <a-input class="input" placeholder="请填写子规格,如L、M" v-model="item.title" @change="onInputChange" @blur="(e)=>{onBlur(e, item)}"></a-input>
        <a-icon v-if="specItemData.items.length>1" type="close-circle" theme="filled" @click="onRemoveSpecValue(index)"/>
        <div class="error" v-if="item.error">请填写规格名称</div>
      </div>
      <a-button type="link" @click="onAddSpecValue" style="padding-left:0;">+添加规格值</a-button>
    </a-row>
  </a-row>
</template>
<script>
import {createNewSpecValueObj} from './index'

export default {
  props: {
    specItemData: null,
    mainSpecIndex: Number,
    // 是否展示规格项的删除按钮
    removeAble: Boolean
  },
  methods: {
    /**
     * 判断是不是主规格
     */
    isMainSpec(is_main_spec){
      if (is_main_spec == 0 || !is_main_spec) {
        return false
      } else {
        return true
      }
    },
    // 删除此规格项
    onClickDeleteParent(){
      this.$emit('deleteMe')
    },
    // 添加规格值输入框
    onAddSpecValue(){
      this.specItemData.items.push(createNewSpecValueObj(this.specItemData))
      this.$emit('itemChange')
    },
    // 移出规格值输入框
    onRemoveSpecValue(index){
      this.specItemData.items.splice(index,1)
      this.$emit('itemChange')
    },
    // 修改此规格项的“主规格”选中状态
    onChangeMain(){
      this.$emit('toggleMainSpec')
    },
    onInputChange(){
      this.$emit('itemChange')
    },
    onBlur(e, obj){
      if (!e.target.value) {
        this.$set(obj, 'error', true)
      } else {
        this.$set(obj, 'error', false)
      }
    },
  }
}
</script>
<style lang="less" scoped>
  .spec-edit-item {
    position: relative;
    &:hover {
      .close-icon {
        opacity: 1;
      }
    }
    .close-icon {
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }
    .input {
      width: 200px;
    }
    .parent-specs-row {
      margin-bottom: 20px;
      em {
        font-size: @font-size-sm;
        color: @text-color-secondary;
      }
    }
    .child-specs-row {
      position: relative;
      padding-left: 50px;
      &::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        left: 20px;
        top: 0;
        border: 1px solid #b8b9bd;
        border-top: none;
        border-right: none;
      }
      .child-input-item {
        position: relative;
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 20px;
        &:hover {
          .anticon-close-circle{
            display: block;
          }
        }
        .anticon-close-circle {
          position: absolute;
          right: -6px;
          top: -6px;
          display: none;
          cursor: pointer;
        }
      }
    }
    .error {
      color: @error-color;
      font-size: @font-size-sm;
      position: absolute;
      bottom: -18px;
      left: 0;
    }
  }
</style>