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
              <a-form-model-item label="模板名称" prop="title">
                <a-input
                  v-model="searchFormData.title"
                  placeholder="请输入模板名称"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6">
              <a-form-model-item label="状态" prop="status">
                <a-select v-model="searchFormData.status" placeholder="请选择状态" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option :value="0"> 禁用 </a-select-option>
                  <a-select-option :value="1">启用</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6">
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
      <pageTable ref="table" :condition="searchFormData"></pageTable>
  </div>
</template>

<script>
import pageTable from './table';
let defaultSearchFormData = { title: "", status: '',}
export default {
  components: {
    pageTable
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
}
</script>

<style lang="less" scoped>

</style>