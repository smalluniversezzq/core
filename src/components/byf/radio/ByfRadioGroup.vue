<template>
  <a-radio-group 
    v-model="radioGroupValue"
    :disabled="disabled"
    @change="onChange"
  >
    <slot></slot>
  </a-radio-group>
</template>
<script>
import { Radio } from 'ant-design-vue'
export default {
  props: {
    value: Radio.Group.props.value,
    disabled: Radio.Group.props.disabled
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      radioGroupValue: this.value
    }
  },
  methods: {
    onChange(e){
      this.$emit('change', e.target.value)
    }
  }
}
</script>