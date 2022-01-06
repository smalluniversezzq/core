<template>
  <a-empty :image="simpleImage" />
</template>
<script>
import { Empty } from "ant-design-vue";
export default {
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  }
};
</script>