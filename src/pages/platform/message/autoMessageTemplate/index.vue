<template>
  <div>
    <byf-space direction="vertical">
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
                label="消息类型"
                prop="type"
              >
                <a-select v-model="searchFormData.type" placeholder="请选择状态" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option v-for="item in typeList" :key="item.value" :value="item.value"> {{item.name}} </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="关键词"
                prop="keyword"
              >
                <a-input
                  v-model="searchFormData.keyword"
                  placeholder="消息标题/消息内容"
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
      <autoMessageTemplateTable ref="autoMessageTemplateTable" :condition="searchFormData"></autoMessageTemplateTable>
    </byf-space>
  </div>
</template>

<script>
import autoMessageTemplateTable from './table'
let defaultSearchFormData = { type: "", keyword: '', }
export default {
  components: {
    autoMessageTemplateTable
  },
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
      typeList: [
        {name: '系统通知', value: 1},
        {name: '订单通知', value: 2},
        {name: '消息互动', value: 3},
        {name: '资产通知', value: 4},
        {name: '活动优惠', value: 6},
      ]
    }
  },
  methods: {
    // 导出表格
    exportExcel(){
      this.$refs.autoMessageTemplateTable.exportExcel();
    },
    // 条件搜索
    search() {
      this.$refs.autoMessageTemplateTable.search();
    },
    // 重置搜索
    resetSearch() {
      this.searchFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
      this.$nextTick(() => {
        this.search();
      })
    },
  },
}
</script>

<style>

</style>