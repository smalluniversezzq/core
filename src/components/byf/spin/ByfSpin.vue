<template>
  <a-spin v-bind="$props">
    <slot></slot>
  </a-spin>
</template>
<script>
import { Spin } from "ant-design-vue";
export default {
  props: {
    ...Spin.props
  }
};
</script>