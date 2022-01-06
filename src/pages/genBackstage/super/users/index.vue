<template>
  <div>
    <a-card class="search-card">
      <a-form-model
        ref="searchForm"
        :model="searchFormData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row :gutter="48">
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="用户ID"
              prop="mid"
            >
              <a-input
                v-model="searchFormData.mid"
                placeholder="请输入用户ID"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="手机号码" prop="mobile">
              <a-input
                v-model="searchFormData.mobile"
                placeholder="请输入用户手机号码"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="账号状态" prop="status">
              <a-select v-model="searchFormData.status" placeholder="请选择状态" 
                :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
              >
                <a-select-option value=""> 全部 </a-select-option>
                <a-select-option :value="1"> 正常 </a-select-option>
                <a-select-option :value="0"> 禁用 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="注册时间" prop="date">
              <a-range-picker :valueFormat="'YYYY-MM-DD'" v-model="searchFormData.date" />
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
    <user-table ref="userTable" :condition="searchFormData"></user-table>
  </div>
</template>
<script>
import UserTable from './table'
let defaultSearchFormData = { mid: "", mobile: "", status: '', date: [], }

export default {
  name: "genBackstageUsers",
  components: { UserTable },
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
      this.$refs.userTable.exportExcel();
    },
    // 条件搜索
    search() {
      this.$refs.userTable.search();
    },
    // 重置搜索
    resetSearch() {
      this.searchFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
      this.$nextTick(() => {
        this.search();
      })
      
    },
  },
};
</script>
<style scoped lang="less">
.search-card {
  .ant-row {
    .ant-col {
      .ant-form-item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
