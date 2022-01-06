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
            <a-form-model-item label="接收目标" prop="target">
              <a-select v-model="searchFormData.target" placeholder="请选择状态" 
                :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
              >
                <a-select-option value=""> 全部 </a-select-option>
                <a-select-option :value="1"> 所有平台接收 </a-select-option>
                <a-select-option :value="2"> 部分平台接收 </a-select-option>
                <a-select-option :value="3"> 部分平台不接收 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :sm="8" :xxl="6">
            <a-form-model-item label="状态" prop="type">
              <a-select v-model="searchFormData.type" placeholder="请选择状态" 
                :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
              >
                <a-select-option value=""> 全部 </a-select-option>
                <a-select-option :value="0"> 待发布 </a-select-option>
                <a-select-option :value="2"> 已发布 </a-select-option>
                <a-select-option :value="1"> 定时发布 </a-select-option>
              </a-select>
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
import noticeTable from './table';

let defaultSearchFormData = { keyword: '', target: '', type: '', }
export default {
  components: {
    noticeTable
  },
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
    }
  },
  methods: {
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