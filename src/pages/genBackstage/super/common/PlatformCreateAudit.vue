<template>
  <a-spin :spinning="spinning">
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="主管理员" prop="mid">
        <a-select show-search placeholder="请输入姓名或者手机号" :default-value="form.mid" :filterOption="false" @search="handleChangeOrSearch" 
          :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
          @select="onAdminSelect"
        >
          <a-spin v-if="searchAdminLoading" slot="notFoundContent" size="small" />
          <a-select-option v-for="d in adminData" :key="d.mid" :realName="d.real_name">
            {{ d.real_name }}({{d.mobile}})
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="平台名称" prop="name" help="平台名称可以是汉字、字母、数字的任意一种或任意组合，长度不得超过15个字">
        <a-input v-model="form.name" placeholder="请输入平台名称"></a-input>
      </a-form-model-item>
      <br/>
      <a-form-model-item class="logoFormItem" label="平台logo" prop="logo">
        <byf-upload-btn :imgsList="form.logo?[form.logo]:[]" @change="onUploadChange"></byf-upload-btn>
        <p class="tip">请上传1024*1024像素的png图片</p>
      </a-form-model-item>
      <a-form-model-item label="服务到期时间" prop="start_at">
        <a-range-picker style="width:100%" :valueFormat="'YYYY-MM-DD'" :default-value="[form.start_at, form.expired_at]"  @change="onRangeChange"/>
      </a-form-model-item>
      <a-form-model-item label="平台类型" prop="type">
        <a-checkbox-group v-model="form.typeCheckedList" :options="typeCheckOptions" />
      </a-form-model-item>

      <a-form-model-item label="版权标识">
        <a-radio-group v-model="form.copyright_status" @change="copyrightLogoTypeChange">
          <a-radio :value="1"> 系统默认 </a-radio>
          <a-radio :value="2"> 自定义 </a-radio>
          <a-radio :value="0"> 不显示 </a-radio>
        </a-radio-group>
        <div class="form-item-block" v-show="form.copyright_status == 2">
          <a-form-model-item prop="copyright_text">
            <a-input placeholder="请输入版权标识" v-model="form.copyright_text"/>
          </a-form-model-item>
        </div>
      </a-form-model-item>

      <a-form-model-item label="应用套餐" prop="group" :wrapper-col="{span: 16}">
        <a-select style="width: 200px;" placeholder="请选择套餐" :value="form.group.id" @change="onGroupSelectChange" 
          :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
        >
          <a-select-option v-for="(item) in platformGroup" :key="item.id" :value="item.id" :groupName="item.name" >{{item.name}}</a-select-option>
        </a-select>
        <a-card size="small" :title="'当前套餐组：'+(form.group.name || '未选择')">
            <ul class="currentApps beauty-scroll" v-if="appsInGroup.length > 0">
              <li v-for="(item, index) in appsInGroup" :key="index">
                <apps-item :itemData="item"></apps-item>
              </li>
            </ul>
            <a-empty v-else></a-empty>
        </a-card>
      </a-form-model-item>
      <a-form-model-item label="附加应用" prop="type" :wrapper-col="{span: 16}">
        <a-button type="pramiry" @click="toggleChooseAppsShow">选择应用</a-button>
        <a-card size="small">
          <template slot="title">
            <span>附加应用/模块</span>
          </template>
          <a-select slot="extra" default-value="0" style="width: 120px;" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
            <a-select-option value="0">通用应用</a-select-option>
          </a-select>
          <a-list class="currentApps beauty-scroll" item-layout="horizontal" :bordered="false" :data-source="addonsExtraList" :grid="{ gutter: 16, column: 6 }">
            <a-list-item slot="renderItem" slot-scope="item">
              <apps-item :itemData="item"></apps-item>
            </a-list-item>
          </a-list>
        </a-card>
      </a-form-model-item>
      <!-- 审核时有的内容  开始 -->
      <a-form-model-item label="审核状态" v-if="operationType != 'create'">
        <a-radio-group v-model="form.audit_status" @change="auditStatusChange">
          <a-radio :value="1">通过</a-radio>
          <a-radio :value="-1">拒绝</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="审核备注" v-if="operationType != 'create'" help="说明：在审核拒绝时，审核备注为必填项。" prop="audit_msg">
        <a-textarea v-model="form.audit_msg" placeholder="请输入审核备注"/>
      </a-form-model-item>
      <!-- 审核时有的内容  结束 -->
      <a-form-model-item :wrapper-col="{offset: 4}">
        <a-space>
          <a-button v-if="operationType=='create'" type="primary" @click="onCreate">保存</a-button>
          <a-button v-else type="primary" @click="doSave">提交</a-button>
          <a-button @click="jumpParent">返回列表</a-button>
        </a-space>
      </a-form-model-item>
    </a-form-model>
    <choose-apps ref="chooseApps" @ok="onChooseAppsOk"></choose-apps>
  </a-spin>
</template>
<script>
import {getAdminUserSearchUser} from '@/services/adminUser'
import {getAdminPlatformGroupIndex} from '@/services/adminPlatformGroup'
import {getAdminAddonsIndex} from '@/services/addons'
import {getAdminPlatformAudit, getAdminPlatformCreate} from '@/services/adminPlatform'
import AppsItem from '@/pages/genBackstage/common/AppsItem'
import ChooseApps from '@/pages/genBackstage/super/common/ChooseApps'
import moment from "moment";
import cloneDeep from 'lodash/cloneDeep'

// eslint-disable-next-line
let timeout;
// eslint-disable-next-line
let currentValue;
let selectIndex = 0;

export default {
  components: {AppsItem, ChooseApps},
  props: {
    platformData: {
      require: false,
      default: ()=>{
        return{
          mid: undefined,
          name: '',
          logo: '',
          start_at: undefined,
          expired_at: undefined,
          group: {},
          extra_id: [],
          typeCheckedList: [],
          audit_status: 1,
          copyright_status: 0,
          copyright_text: ''
        }
      }
    },
    operationType: {
      require: false
    }
  },
  data(){
    let validateAdminName = (rule, value, callback) => {
      if (value === '' || value == undefined) {
        callback(new Error('请选择主管理员'));
      } else {
        callback();
      }
    };
    let validateGroup = (rule, value, callback)=>{
      if (!value.id) {
        callback(new Error('请选择应用套餐'));
      } else {
        callback();
      }
    }
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入平台名称'));
      }
      let pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi; // 中文数字字母正则
      if (value.length > 15 || !pattern.test(value)) {
        callback(new Error('平台名称可以是汉字、字母、数字的任意一种或任意组合，长度不得超过15个字'));
      }else{
        callback();
      }
    };
    return {
      spinning: false,
      visibleOfAdditional: false,
      checkedAdditional: [],// 选中附加应用

      visibleOfAdmin: false,
      checkAdminFormData: {
        value: ''
      },
      checkAdminSearchData: [
        {key: 1, value: '小红帽'},
        {key: 2, value: '灰太狼'},
        {key: 3, value: '小灰灰'}
      ],
      loadingOfCheckAdmin: false,

      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      form: cloneDeep(this.platformData),
      adminData: [],
      searchAdminLoading: false,
      typeCheckOptions: [
        { label: 'APP', value: '0' },
        { label: '微信', value: '1', disabled: true },
        { label: 'H5', value: '2', disabled: true },
      ],
      rules: {
        mid: [{ required: true, validator: validateAdminName, trigger: "blur"},],
        name: [{ required: true, validator: validateName, trigger: "blur"}],
        audit_msg: [{ required: false, message: "审核备注不能为空", trigger: "blur"}],
        start_at: [{ required: false, message: "请选择服务到期时间", trigger: "blur"}],
        group: [{ required: true, validator: validateGroup}],
        logo: [{ required: true, message: "请选择平台logo", trigger: "blur"}],
      },
      platformGroup: [], // 套餐组列表
      appsInGroup: [], // 某个套餐组中的应用列表,
      addonsExtraList: []
    }
  },
  created(){
    if (this.operationType != 'create') {
      // 审核模式时，做些预处理
      // 初始化管理员选择列表
      this.adminData = [{mid:this.form.mid, real_name: this.form.real_name}]
    }
    this.form.typeCheckedList = ['0']
    this.getPlatformGroup()
    this.getAdminUser();

    this.updateRules(this.form.audit_status, this.operationType)
  },
  methods: {
    copyrightLogoTypeChange(){
       console.log(this.form.copyright_status)
      if(this.form.copyright_status == 2){
        this.$set(this.rules, 'copyright_text', [{ required: true, message: '请输入版权标识', trigger: 'blur' }])
      }else{
        delete this.rules.copyright_text;
      }
      this.$refs.ruleForm.clearValidate('copyright_text')
    },
    /**
     * 审核状态变化
     */
    auditStatusChange(){
      this.form.audit_msg = '';
      this.updateRules(this.form.audit_status, this.operationType)
    },
    /**
     * 更新校验规则
     * @param [int] audit_status 审核状态
     * @param [string] operationType 操作
     */
    updateRules(audit_status, operationType){
      // 审核 并且 拒绝时，审核备注必填
      this.rules.audit_msg[0].required = audit_status == -1 && operationType == 'examine';

      // 创建操作 或者 审核操作且通过时，服务到期时间必填
      this.rules.start_at[0].required = operationType == 'create' || (operationType == 'examine' && audit_status == 1);
    },
    jumpParent(){
      this.$router.go(-1)
    },
    getPlatformGroup(){
      getAdminPlatformGroupIndex({page_size: 999, status:1}).then(res=>{
        if (res.code == 200) {
          this.platformGroup = res.data.list
        }
      })
    },
    onUploadChange(data){
      this.form.logo = data[0]
      this.$refs.ruleForm.validateField('logo')
    },
    handleChangeOrSearch(value){
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(()=>{
        this.getAdminUser(value)
      }, 300);
    },
    getAdminUser(value){
      currentValue = value
      this.adminData = [];
      this.searchAdminLoading = true;
      getAdminUserSearchUser({page_size:999, search: value || ''}).then(res => {
          if (res.code == 200) {
            if (currentValue == value) {
              this.adminData = res.data.info.list 
            }
            selectIndex = selectIndex+3
          }
      }).finally(() => {
        this.searchAdminLoading = false;
      })
    },
    onAdminSelect(value,option){
      this.form.mid = value
      this.form.real_name = option.data.attrs.realName;
    },
    /**
     * 时间范围变化
     */
    onRangeChange(dates){
      this.form.start_at = dates[0]
      this.form.expired_at = dates[1]
      this.$refs.ruleForm.validateField('start_at')
    },
    /**
     * 选择套餐组 的 变化事件
     */
    onGroupSelectChange(value, option){
      if(!this.form.group) { // 审核时，如果没有套餐信息，后端会返回false
        this.form.group = {}
      }  
      this.$set(this.form.group, 'id', value)
      this.$set(this.form.group, 'name', option.data.attrs.groupName)
      // 获取套餐中的应用
      getAdminAddonsIndex({page_size:999, group_id: value}).then(res=>{
        if(res.code == 200) {
          this.appsInGroup = res.data.list
        }
      })
    },
    /**
     * 保存并创建 平台
     */
    onCreate(){
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          this.spinning = true
          let params = cloneDeep(this.form)
          params.group_id = params.group.id
          if (params.start_at) {
            params.start_at = moment(params.start_at).startOf('day').unix(),
            params.expired_at = moment(params.expired_at).endOf('day').unix()
          }
          params.extra_id = Array.from(this.addonsExtraList,(item)=>{
            return item.aid
          })
          getAdminPlatformCreate(params).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg)
              this.$router.go(-1)
            }
          }).finally(()=>{
            this.spinning = false
          })
        }
      })
    },
    /**
     * 保存审核
     */
    doSave(){
      
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          this.spinning = true

          let params = cloneDeep(this.form)
          params.group_id = params.group.id
          if (params.start_at) {
            params.start_at = moment(params.start_at).startOf('day').unix(),
            params.expired_at = moment(params.expired_at).endOf('day').unix()
          }
          params.extra_id = Array.from(this.addonsExtraList,(item)=>{
            return item.aid
          })
          getAdminPlatformAudit(params).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.go(-1)
            }
          }).finally(()=>{
            this.spinning = false
          })
        } else {
          return false
        }
      })
    },
    /**
     * 切换显示
     */
    toggleChooseAppsShow(){
      this.$refs.chooseApps.show('choose', this.addonsExtraList)
    },
    /**
     * 修改 附加应用成功
     */
    onChooseAppsOk(list){
      this.addonsExtraList = list
    }
  }
}
</script>
<style lang="less" scoped>
.logoFormItem{
  .tip{
    color: #a0a0a0;
    font-size: 12px;
  }
}
.currentApps{
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  height: 174px;
  li{
    width: 200px;
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
  }
}
.form-item-block{
  overflow: hidden;
  background: @background-color-light;
  padding: 0 20px;
  padding-top: 24px;
}
</style>