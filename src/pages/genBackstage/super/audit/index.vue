<template>
  <div>
    <a-card>
      <a-form-model ref="searchForm"
        :model="searchFormData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row :gutter="48">
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="主管理员"
              prop="mobile_or_real_name"
            >
              <a-input v-model="searchFormData.mobile_or_real_name" placeholder="请输入手机号或者姓名" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="平台名称"
              prop="name"
            >
              <a-input v-model="searchFormData.name" placeholder="请输入平台名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="状态" prop="audit_status">
              <a-select v-model="searchFormData.audit_status" placeholder="请选择状态" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
                <a-select-option value="">全部</a-select-option>
                <a-select-option :value="0">未审核</a-select-option>
                <a-select-option :value="1">审核通过</a-select-option>
                <a-select-option :value="-1">审核拒绝</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
              <a-space>
                <a-button type="primary" @click="search">搜索</a-button>
                <a-button type="link" size="small" @click="resetSearch">重置</a-button>
                <a-button type="link" size="small" @click="exportExcel">导出</a-button>
              </a-space>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    
    <audit-table ref="table" :condition="searchFormData"></audit-table>
  </div>

</template>
<script>
import AuditTable from './table'
let defaultSearchFormData = { mobile_or_real_name: undefined, name: "", audit_status: '', date: [], }

export default {
  components: { AuditTable },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
    };
  },
  methods: {
    // 导出表格
    exportExcel(){
      this.$refs.table.exportExcel();
    },
    // 条件搜索
    search() {
      this.$refs.table.search();
    },
    // 重置搜索
    resetSearch() {
      this.searchFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
      this.$nextTick(() => {
        this.search();
      })
    },
  }
};
</script>
<style lang="less" scoped>


</style>
