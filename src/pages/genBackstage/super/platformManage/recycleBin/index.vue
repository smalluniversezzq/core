<template>
  <div>
    <a-card>
      <a-form-model
        ref="searchForm"
        :model="searchFormData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row :gutter="48">
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="平台ID" prop="pmid">
              <a-input v-model="searchFormData.pmid" placeholder="请输入平台ID"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="平台名称" prop="name">
              <a-input v-model="searchFormData.name" placeholder="请输入平台名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="应用套餐"
              prop="addons_group"
            >
              <a-select v-model="searchFormData.addons_group" placeholder="请选择套餐" 
                :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option v-for="(item) in appsGroupList" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="主管理员" prop="mobile_or_real_name">
              <a-input v-model="searchFormData.mobile_or_real_name" placeholder="请输入名称或手机号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="到期时间" prop="date">
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
    
    <data-table ref="table" :condition="searchFormData"></data-table>
  </div>
</template>
<script>
import DataTable from './table'
import {getAdminPlatformGroupIndex} from '@/services/adminPlatformGroup'
let defaultSearchFormData = { pmid: undefined, name: undefined, addons_group: '', mobile_or_real_name: undefined, date: [], }

export default {
  components: { DataTable },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
      appsGroupList: [],
    };
  },
  created(){
    this.getAdminPlatformGroupIndex()
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
    timeRangeChange(date){
      console.log(date)
    },
    getAdminPlatformGroupIndex(){
      getAdminPlatformGroupIndex({page_size: 999, status:1}).then(res => {
        if(res.code == 200) {
          this.appsGroupList = res.data.list
        }
      })
    }
  }
};
</script>
<style>
</style>
