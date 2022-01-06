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
                <a-select v-model="searchFormData.type" placeholder="请选择消息类型" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option v-for="item in typeList" :key="item.value" :value="item.value"> {{item.name}} </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="通知对象"
                prop="keyword"
              >
                <a-select
                  mode="multiple"
                  style="width: 100%"
                  allowClear
                  placeholder="请选择通知对象"
                  v-model="searchFormData.target_user_level"
                >
                  <a-select-option v-for="item in target_user_level" :key="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="通知终端"
                prop="target_device"
              >
                <a-select v-model="searchFormData.target_device" placeholder="请选择通知终端" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option v-for="item in targetDeviceList" :key="item.value" :value="item.value">
                    {{item.name}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="通知途径"
                prop="notice_type"
              >
                <a-select v-model="searchFormData.notice_type" placeholder="请选择通知途径" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option value="is_site_notice"> 站内通知 </a-select-option>
                  <a-select-option value="is_push_notice"> 推送通知 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item label="发布时间" prop="date">
                <a-range-picker v-model="searchFormData.date" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="关键词"
                prop="keyword"
              >
                <a-input
                  allowClear
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
      <messageLogTable ref="autoMessageTemplateTable" :condition="searchFormData"></messageLogTable>
    </byf-space>
  </div>
</template>

<script>
import { platformUserLevel } from '@/services/platformSetting'
import messageLogTable from './table'
let defaultSearchFormData = { 
  type: "", 
  target_device: '',
  keyword: '', 
  date: [], 
  send_time_start: '',
  send_time_end: '',
  notice_type: '',
  is_site_notice: '',
  is_push_notice: '',
  target_user_level: []

}
export default {
  components: {
    messageLogTable
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
      ],
      targetDeviceList: [
        {name: 'iOS', value: 'ios'},
        {name: '安卓', value: 'android'},
      ],
      target_user_level: [],
    }
  },
  created(){
    this.platformUserLevel()
  },
  methods: {
    platformUserLevel(){
      platformUserLevel().then(res => {
        if(res.code == 200){
          this.target_user_level = [];
          for(let k in res.data){
            this.target_user_level.push({
              label: res.data[k],
              value: k
            })
          }
        }
      })
    },
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