<!-- 发布消息 -->
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
                <a-select v-model="searchFormData.type"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option :value="1"> 系统通知 </a-select-option>
                  <a-select-option :value="6"> 活动优惠 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="通知途径"
                prop="notice_type"
              >
                <a-select v-model="searchFormData.notice_type"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option value="is_site_notice"> 站内通知 </a-select-option>
                  <a-select-option value="is_push_notice"> 推送通知 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6" v-show="tableNoTitleKey == 3">
              <a-form-model-item label="创建时间" prop="date">
                <a-range-picker :valueFormat="'YYYY-MM-DD'" v-model="searchFormData.date" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6" v-show="tableNoTitleKey == 2">
              <a-form-model-item label="定时发布时间" prop="sendDate">
                <a-range-picker :valueFormat="'YYYY-MM-DD'" v-model="searchFormData.sendDate" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6" v-show="tableNoTitleKey == 1">
              <a-form-model-item label="发布时间" prop="sentDate">
                <a-range-picker :valueFormat="'YYYY-MM-DD'" v-model="searchFormData.sentDate" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6" v-show="tableNoTitleKey == 1">
              <a-form-model-item
                label="发布方式"
                prop="sent_type"
              >
                <a-select v-model="searchFormData.sent_type"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option :value="0"> 直接发布 </a-select-option>
                  <a-select-option :value="2"> 定时发布 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <!-- <a-col :sm="8" :xxl="6" v-show="tableNoTitleKey == 1">
              <a-form-model-item
                label="通知结果"
                prop="notice_result"
              >
                <a-select v-model="searchFormData.notice_result"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option value="1"> 成功 </a-select-option>
                  <a-select-option value="0"> 失败 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col> -->
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
      <releaseMessageTable ref="releaseMessageTable" :condition="searchFormData" @onTabChange="onTabChange"></releaseMessageTable>
    </byf-space>
  </div>
</template>

<script>
import releaseMessageTable from './table'
let defaultSearchFormData = { 
  type: "", 
  notice_type: "", 
  keyword: '', 
  sent_type: "", 
  date: [], 
  start_at: '', 
  end_at: '', 
  sendDate: [], 
  send_time_start: '',
  send_time_end: '',
  sentDate: [],
  sent_time_start: '',
  sent_time_end: '',
}
export default {
  components:{
    releaseMessageTable
  },
  data(){
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
      tableNoTitleKey: '3'
    }
  },
  methods:{                                                                                                                     
    onTabChange(key){
      this.tableNoTitleKey = key;
      this.resetSearch();
    },
    // 条件搜索
    search() {
      this.$refs.releaseMessageTable.search();
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

<style scoped lang="less">
/deep/.ant-calendar-picker{
  width: 100%
}
</style>