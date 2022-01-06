<template>
  <div class="platform-name-box">
    <a-avatar :class="{limit: record.limit_status == 1}" :src="record.logo" shape="square" :size="64">LOGO</a-avatar>
    <div class="name-pmid">
      <span>{{ record.name }}</span>
      <span>{{ record.pmid }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['record']
}
</script>
<style lang="less" scoped>
.platform-name-box {
  display: flex;
  align-items: center;
  .ant-avatar {
    margin-right: 20px;
    &.limit::after {
      content: '限制使用';
      color: white;
      background: rgba(0, 0, 0, 0.29);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      font-size: 14px;
    }
  }
  .name-pmid {
    display: flex;
    flex-direction: column;
    span:first-child {
      margin-bottom: 5px;
    }
  }
}
</style>