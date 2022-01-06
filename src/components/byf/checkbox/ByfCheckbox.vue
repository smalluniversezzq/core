<template>
  <a-checkbox 
    :checked="checked"
    :disabled="disabled"
    :indeterminate="indeterminate"
    @change="onChange"
  >
    <slot></slot>
  </a-checkbox>
</template>
<script> 
import {Checkbox} from "ant-design-vue"
export default {
  name: 'ByfCheckbox',
  // 继承所有的属性
  props: {
    checked: Checkbox.props.checked,
    disabled: Checkbox.props.disabled,
    indeterminate: Checkbox.props.disabled
  },
  data(){
    return {
      // byfChecked: this.checked
    }
  },
  computed: {
    byfChecked(){
      return this.checked
    }
  },
  methods: {
    onChange(e){
      this.$emit('change', e)
    }
  }
}
</script>