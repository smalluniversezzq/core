<template>
  <div class="common-layout">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>

export default {
  name: 'CommonLayout'
}
</script>

<style scoped lang="less">
.common-layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: radial-gradient( rgb(25,44,121) 0%, rgb(10,10,66) 40%);
  background-position-y: -400px;
  .content{
    flex: 1;
  }
}
</style>
