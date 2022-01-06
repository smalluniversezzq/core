<template>
  <a-layout class="create-app">
    <a-layout-content :style="{'overflow-y':'auto'}" :class="['beauty-scroll']">
      <platform-create-audit :operationType="operationType"></platform-create-audit>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { getAdminPlatformCreate } from '@/services/adminPlatform'
import PlatformCreateAudit from '@/pages/genBackstage/super/common/PlatformCreateAudit'

export default {
  components: {PlatformCreateAudit},
  data(){
    return {
      operationType: 'create'
    }
  },
  created(){
  },
  mounted(){
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 记录前一个路由，优化面包屑返回功能
      vm.parentPath = from.fullPath
    })
  },
  methods: {
    handleSearchOfCheckAdmin(value){
      console.log(value)
      this.checkAdminSearchData = [
        {key: 1, value: '大娃'},
        {key: 2, value: '二娃'},
        {key: 3, value: '三娃'}
      ]
    },
    jumpParent(){
      this.$router.go(-1)
    },
    doSave(){
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          getAdminPlatformCreate(this.form).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg).then(() => {
                this.$router.go(-1)
              })
            }
          })
        } else {
          return false
        }
      })
    },
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