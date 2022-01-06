<template>
  <a-avatar v-bind="$props">
    <img
      :src="img"
      alt=""
      slot="icon"
      v-if="img"
    >
    <byf-icon
      type="iconicon-test"
      slot="icon"
      :style="'fontSize:'+size+'px'"
      v-else
    ></byf-icon>
  </a-avatar>
</template>
<script>
import { Avatar } from "ant-design-vue";
export default {
  props: {
    ...Avatar.props,
    img: {
      type: String
    }
  }
};
</script>
<style lang="less" scoped>
</style>