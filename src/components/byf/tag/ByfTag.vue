<template>
  <a-tag v-if="myvisible">
    <slot></slot>
    <byf-icon
      type="iconclose"
      class="tag-icon"
      @click="myvisible = !myvisible"
    ></byf-icon>
  </a-tag>
</template>
<script>
export default {
  data() {
    return {
      myvisible: true
    };
  },
  methods: {
    closeTag() {
      // 关闭标签
    }
  }
};
</script>
<style scoped lang="less">
.ant-tag {
  cursor: auto;
  position: relative;
  background: #fff9e6;
  color: #ff9900;
  border: 1px solid #ff9900;
  padding: 1px 7px;
  &:hover {
    .tag-icon {
      display: block;
    }
  }
  .tag-icon {
    display: none;
    position: absolute;
    right: -8px;
    top: -8px;
    font-size: 16px;
    color: #b8b9bd;
  }
}
</style>