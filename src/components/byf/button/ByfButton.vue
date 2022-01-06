<template>
  <a-button 
  v-bind="$props" 
  @click="$emit('click', $event.target.value)"
  >
    <slot></slot>
  </a-button>
</template>
<script>
import {Button} from "ant-design-vue"
export default {
  name: 'ByfButton',
  // 继承Button上面所有的属性
  props: {...Button.props},
}
</script>