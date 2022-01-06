<template>
  <div>
    <a-card style="margin-bottom:8px;">
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
                placeholder="请输入反馈内容"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :sm="8" :xxl="6">
            <a-form-model-item label="有图" prop="target">
              <a-select v-model="searchFormData.is_image" placeholder="请选择状态"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
              >
                <a-select-option value=""> 全部 </a-select-option>
                <a-select-option :value="1"> 无图 </a-select-option>
                <a-select-option :value="2"> 有图 </a-select-option>
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
    <feedbackTable ref="feedbackTable" :condition="searchFormData"></feedbackTable>
  </div>
</template>

<script>
import feedbackTable from './table';

let defaultSearchFormData = { keyword: '', is_image: '' }
export default {
  components: {
    feedbackTable
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
      this.$refs.feedbackTable.search();
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
