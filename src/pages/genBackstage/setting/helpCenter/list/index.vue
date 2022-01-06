<template>
  <div>
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
          <a-form-model-item label="分类" prop="c_id">
            <a-cascader
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              v-model="categoryValue"
              :field-names="{ label: 'title', value: 'id', children: 'subs' }"  
              :options="categoryOptions" placeholder="请选择文章分类" @change="onChangeClassify" />
          </a-form-model-item>
        </a-col>
        <a-col :sm="8" :xxl="6">
          <a-form-model-item label="状态" prop="status">
            <a-select v-model="searchFormData.status" placeholder="请选择状态" 
              :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
            >
              <a-select-option value=""> 全部 </a-select-option>
              <a-select-option :value="1"> 启用 </a-select-option>
              <a-select-option :value="0"> 禁用 </a-select-option>
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
    <helpTable ref="helpTable" :condition="searchFormData"></helpTable>
  </div>
</template>

<script>
import helpTable from './table';
import { getAssistCategoryIndex } from "@/services/admin/core/assistCategory";
let defaultSearchFormData = { keyword: "", status: '', c_id: '', }
export default {
  components: {
    helpTable
  },
  data(){
    return {
      categoryValue: [],
      categoryOptions: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
    }
  },
  created(){
    this.getAssistCategoryIndex();
  },
  methods: {
    onChangeClassify(val){
      this.searchFormData.c_id = val[val.length - 1]
    },
    getAssistCategoryIndex(){
      getAssistCategoryIndex().then(res => {
        if(res.code == 200){
          this.categoryOptions = res.data.list;
        }
      })
    },
    // 导出表格
    exportExcel(){
      this.$refs.helpTable.exportExcel();
    },
    // 条件搜索
    search() {
      this.$refs.helpTable.search();
    },
    // 重置搜索
    resetSearch() {
      this.$refs.helpTable.resetSortorder();
      this.categoryValue = [];
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