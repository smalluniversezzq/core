<template>
  <a-layout class="create-app">
    <a-layout-content :style="{'overflow-y':'auto'}" :class="['beauty-scroll']">
      <platform-create-audit ref="form" :platformData="platformData" :operationType="operationType"></platform-create-audit>
    </a-layout-content>
  </a-layout>
</template>
<script>
import PlatformCreateAudit from '@/pages/genBackstage/super/common/PlatformCreateAudit'

export default {
  components: {PlatformCreateAudit},
  data(){
    return {
      platformData: {

      },
      operationType: 'examine', // create:创建平台；examine: 审核平台
    }
  },
  created(){
    this.platformData = JSON.parse(this.$route.query.pInfo)
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.create-app {
  background: white;
  height: 100%;
  position: relative;
  .ant-layout-header {
    background: transparent;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }
  .ant-layout-content {
    padding-top: 40px;
  }
}
</style>