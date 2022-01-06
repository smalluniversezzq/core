<template>
  <div class="setting-input">
    <a-input :value="value" @focus="onFocus" @blur="onBlur" @change="onChange"></a-input>
    <span class="placeholder-span " :class="{active: showActive}"><span>{{placeholder}}</span></span>
  </div>
</template>
<script>
import { Input } from "ant-design-vue";
export default {
  props: {
    value: Input.props.value,
    type: Input.props.type,
    placeholder: {
      required: true
    }
  },
  computed: {
    showActive(){
      return this.focusing || (this.value !== undefined && this.value !== '' && this.value !== null)
    }
  },
  data(){
    return {
      focusing: false,
    }
  },
  methods: {
    onFocus(){
      this.focusing = true
    },
    onBlur(e){
      let value = e.target.value
      this.focusing = false
      if (this.type == 'number') {
        // 限制输入大于等于0的数字
        value = value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
        if( value == ''){
          value = 0
        }
      } else {
        // 限制输入数字加字母
        value = value.replace(/[^a-zA-Z0-9]/ig,'')
      }
      this.$emit('change', value)
    },
    onChange(e){
      let value = e.target.value;
      if (this.type == 'number') {
        // 限制输入>=0的数
        value = value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
        // 转数字，去掉0开头的情况
        value = +value
      }
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="less" scoped>
.setting-input {
  position: relative;
  .placeholder-span {
    position: absolute;
    top: 0;
    left: 10px;
    bottom: 0;
    display: flex;
    align-items: center;
    color: #b8b9bd;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
    span {
      background-color: rgba(255,255,255,0);
    }
    &.active {
      color: #262B30;
      font-size: 12px;
      top: -40px;
      span {
        background-color: #ffffff;
      }
    }
  }
  input {
    background: none;
  }
}
</style>