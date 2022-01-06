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
          <a-col :sm="8" :xxl="6">
            <a-form-model-item
              label="关键词"
              prop="keyword"
            >
              <a-input
                v-model="searchFormData.keyword"
                placeholder="请输入关键词搜索"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :sm="8" :xxl="6">
            <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
              <a-space>
                <a-button type="primary" @click="search">搜索</a-button>
                <a-button type="link" size="small" @click="resetSearch">重置</a-button>
              </a-space>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <noticeTable ref="noticeTable" :condition="searchFormData"></noticeTable>
    
  </div>
</template>

<script>
import noticeTable from './table.vue';

let defaultSearchFormData = { keyword: ""}
export default {
  components: {
    noticeTable,
  },
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
    }
  },
  methods: {
    // 导出表格
    exportExcel(){
      this.$refs.noticeTable.exportExcel();
    },
    // 条件搜索
    search() {
      this.$refs.noticeTable.search();
    },
    // 重置搜索
    resetSearch() {
      this.searchFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
      this.$nextTick(() => {
        this.search();
      })
      
    },
  }
}
</script>

<style>

</style>