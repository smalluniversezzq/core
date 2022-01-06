<template>
  <a-popover :placement="placement" title="示例">
    <slot slot="content">
    </slot>
    <span class="iconWrap">
      <byf-icon class="icon-help"  type="iconhelp"></byf-icon>示例
    </span>
  </a-popover>
</template>

<script>
export default {
  props: {
    placement: {
      default: 'right'
    }
  }
}
</script>

<style scoped lang="less">
.iconWrap{
  height: 40px;
  color:rgba(0, 0, 0, 0.45);
  cursor: pointer;
  line-height: 40px;
}
.iconWrap:hover{
  color:rgba(28, 155, 236, 1);
 
}
</style>