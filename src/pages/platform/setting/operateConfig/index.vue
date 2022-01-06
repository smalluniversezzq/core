<!-- 操作日志 -->
<template>
  <div>
    <!-- :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tabChange="key => onTabChange(key, 'noTitleKey')" -->
    <a-card
    size="small"
    >
    <a-tabs default-active-key="0" @change="key => onTabChange(key, 'noTitleKey')">
      <a-tab-pane :key="tabListNoTitle[0].key" :tab="tabListNoTitle[0].tab">
        <div v-show="noTitleKey == 0">
          <a-form-model
            ref="searchFormOperate"
            :model="searchFormDataOperate"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-row :gutter="48">
              <a-col :md="6" :sm="24">
                <a-form-model-item
                  label="操作模块"
                  prop="mode"
                >
                  <a-select v-model="searchFormDataOperate.mode" placeholder="请选择" 
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                  >
                    <a-select-option value=""> 全部 </a-select-option>
                    <a-select-option :value="1"> 会员管理 </a-select-option>
                    <a-select-option :value="2"> 商品管理 </a-select-option>
                    <a-select-option :value="3"> 订单管理 </a-select-option>
                    <a-select-option :value="4"> 财务管理 </a-select-option>
                    <a-select-option :value="5"> 权限管理 </a-select-option>
                    <a-select-option :value="6"> 三方接口配置 </a-select-option>
                    <a-select-option :value="7"> APP配置 </a-select-option>
                    <a-select-option :value="8"> 版本管理 </a-select-option>
                    <a-select-option :value="9"> 首页装修 </a-select-option>
                    <a-select-option :value="10"> 会员中心装修 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-model-item label="操作时间" prop="date">
                  <a-range-picker :valueFormat="'YYYY-MM-DD'" v-model="searchFormDataOperate.date" />
                </a-form-model-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-model-item
                  label="操作人"
                  prop="mode"
                >
                  <a-select v-model="searchFormDataOperate.operate_person" placeholder="请选择" 
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                  >
                    <a-select-option value=""> 全部 </a-select-option>
                    <a-select-option :value="1"> 超级管理员 </a-select-option>
                    <a-select-option :value="2"> 市场管理员 </a-select-option>
                    <a-select-option :value="3"> 运营管理员 </a-select-option>
                    <a-select-option :value="4"> 技术管理员 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-model-item :wrapper-col="{ offset: 7 }">
                  <a-space>
                    <a-button type="primary" @click="searchOperate">搜索</a-button>
                    <a-button type="link" size="small" @click="resetSearchOperate">重置</a-button>
                    <a-button type="link" size="small" @click="exportExcelOperate">导出</a-button>
                  </a-space>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
          <operateTable ref="operateTable" :condition="searchFormDataOperate"></operateTable>
        </div>
      </a-tab-pane>
      <!-- <a-tab-pane :key="tabListNoTitle[1].key" :tab="tabListNoTitle[1].tab">
        <div v-show="noTitleKey == 1">
            <a-form-model
              ref="searchFormDataLogin"
              :model="searchFormDataLogin"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-row :gutter="48">
                <a-col :md="6" :sm="24">
                  <a-form-model-item
                    label="登录账号"
                    prop="account"
                  >
                    <a-select v-model="searchFormDataLogin.account" placeholder="请选择" 
                      :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                    >
                      <a-select-option value=""> 全部 </a-select-option>
                      <a-select-option :value="1"> 超级管理员 </a-select-option>
                      <a-select-option :value="2"> 市场管理员 </a-select-option>
                      <a-select-option :value="3"> 运营管理员 </a-select-option>
                      <a-select-option :value="4"> 技术管理员 </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-model-item label="登录时间" prop="date">
                    <a-range-picker :valueFormat="'YYYY-MM-DD'" v-model="searchFormDataLogin.date" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-model-item :wrapper-col="{ offset: 7 }">
                    <a-space>
                      <a-button type="primary" @click="searchLogin">搜索</a-button>
                      <a-button type="link" size="small" @click="resetSearchLogin">重置</a-button>
                      <a-button type="link" size="small" @click="exportExcelLogin">导出</a-button>
                    </a-space>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <loginTable ref="loginTable" :condition="searchFormDataLogin"></loginTable>
          </div>
      </a-tab-pane> -->
    </a-tabs>
    </a-card>
  </div>
</template>

<script>
let defaultSearchFormDataOperate = { mode: '', operate_person: '', date: [], }
let defaultSearchFormDataLogin = { account: '', date: [], }
import operateTable from './operateTable';
// import loginTable from './loginTable';
export default {
  components: {
    operateTable,
    // loginTable
  },
  data(){
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      tabListNoTitle: [
        {key: '0', tab: '操作日志'},
        {key: '1', tab: '登录日志'},
      ],
      noTitleKey: '0',

      searchFormDataOperate: JSON.parse(JSON.stringify(defaultSearchFormDataOperate)),
      searchFormDataLogin: JSON.parse(JSON.stringify(defaultSearchFormDataLogin)),
    }
  },
  mounted(){
  },
  methods:{
    onTabChange(key, type){
      this[type] = key;
    },
    searchOperate(){

    },
    resetSearchOperate(){

    },
    exportExcelOperate(){

    },
    searchLogin(){

    },
    resetSearchLogin(){

    },
    exportExcelLogin(){
      
    }
  },
}
</script>

<style scoped>
.tip{
  color: #a0a0a0;
  font-size: 14px;
  line-height: 20px;
}
</style>