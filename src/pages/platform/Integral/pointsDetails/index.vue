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
                label="类型"
                prop="exec_type"
              >
                <a-select v-model="searchFormData.exec_type" placeholder="请选择类型" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option v-for="item in recoreType" :key="item.key" :value="item.key"> {{item.name}} </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="会员等级"
                prop="user_level"
              >
                <a-select v-model="searchFormData.user_level" placeholder="请选择会员等级" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option v-for="item in allUserLevels" :key="item.key" :value="item.key"> {{item.name}} </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item label="创建时间" prop="date">
                <a-range-picker :valueFormat="'YYYY-MM-DD'" v-model="searchFormData.date" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="关键词"
                prop="keyword"
              >
                <a-input
                  v-model="searchFormData.keyword"
                  placeholder="会员昵称/姓名/手机号/备注/会员号"
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
      <pointsDetails ref="pointsDetails" :condition="searchFormData"></pointsDetails>
    </byf-space>
  </div>
</template>

<script>
import { getAdminPlatformInteGralRecordExecType,  } from '@/services/admin/platform/integral'
import { AdminUserUserLevelGetAllLevel,  } from '@/services/platform/vips'
import pointsDetails from './table'
let defaultSearchFormData = { 
  exec_type: "",
  user_level: "", 
  date: [],
  keyword: "",
}
export default {
  components: {
    pointsDetails
  },
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
      recoreType: [],
      allUserLevels: []
    }
  },
  created(){
    if(this.$route.query.no_id){
      this.searchFormData.keyword = this.$route.query.no_id;
    }
    this.getAdminPlatformInteGralRecordExecType();
    this.AdminUserUserLevelGetAllLevel()
  },
  methods: {
    // 获取平台所有会员等级
    AdminUserUserLevelGetAllLevel(){
      AdminUserUserLevelGetAllLevel().then(res => {
        if(res.code == 200){
          for(let k in res.data){
            this.allUserLevels.push({
              name: res.data[k],
              key: k,
            })
          }
        }
      })
    },
    // 获取积分明细类型
    getAdminPlatformInteGralRecordExecType(){
      getAdminPlatformInteGralRecordExecType().then(res => {
        if(res.code == 200){
          this.recoreType = res.data;
        }
      })
    },
    // 导出表格
    exportExcel(){
      this.$refs.pointsDetails.exportExcel();
    },
    // 条件搜索
    search() {
      this.$refs.pointsDetails.search();
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