<template>
  <a-radio 
    :value="value"
  >
    <slot></slot>
  </a-radio>
</template>
<script>
import { Radio } from 'ant-design-vue'
export default {
  props: {
    value: Radio.props.value
  }
}
</script>