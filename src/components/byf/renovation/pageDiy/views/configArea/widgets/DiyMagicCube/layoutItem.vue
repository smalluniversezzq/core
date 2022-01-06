<template>
  <div class="layout-item" @click="$emit('click')"
    :style="{backgroundImage: 'url('+imgUrl+')'}">
    <div v-if="!imgUrl">{{tips}}</div>
  </div>
</template>

<script>
export default {
  // 表示此文件不是控件
  notWidget: true,
  props: {
    imgUrl: {
      type: String
    },
    tips: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.layout-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid @border-color-base;
  position: relative;
  cursor: pointer;
  background-position: center;
  background-size:contain;
  background-repeat: no-repeat;
  &.active {
    border-color: @primary-color;
    color: @primary-color;
  }
  div {
    width: 90px;
  }
}
</style>