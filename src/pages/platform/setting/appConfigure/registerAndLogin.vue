<template>
<!-- 注册登录 -->
  <div>
    <a-card title="注册登录">
      <a-spin  tip="Loading..." :spinning="spinning">
        <a-form-model
          ref="form"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :model="formData"
        >
          <a-form-model-item label="注册限制" help="说明：开启限制时，表示限制会员注册，会员登录不受影响">
            <a-radio-group :options="registrationRestrictionsOptions" v-model="formData.platform_register_restrict"/>
          </a-form-model-item>
          <a-form-model-item class='mt-sm' label="登录限制" help="说明:开启权限时，表示限制会员登录，同时注册也会被限制" >
            <a-radio-group :options="loginRestrictions" v-model="formData.platform_login_restrict"/>
            <a-row class="bg pb pt" :style="{ width:'calc(50%)'}">
              <a-col class="ml">
                <span>提示文字：</span>
                <a-input id='input-suffix' @change="handlechangeTxt" :maxLength="200" :suffix="txtNum" v-model="formData.platform_login_restrict_text "  style="width:250px;" placeholder="请输入提示文字"></a-input>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item class='mt-sm' label="登录方式" prop="close" help="说明：APP端支持的登录方式，APP端不会显示未勾选的登录方式">
            <a-checkbox-group v-model="formData.login_support_type" :options="loginTypeOptions" />
          </a-form-model-item>
          <a-form-model-item class='mt-sm' label="协议勾选" prop="login_protocol_require" help="说明：如选是，用户需勾选登录页面的协议才可登录；如选否，则会显示“登录即同意《XXX协议》”">
            <a-radio-group :options="loginProcotolOptions" v-model="formData.login_protocol_require"/>
          </a-form-model-item>
          <a-form-model-item class='mt-sm' label="登录页logo"  prop="login_protocol_require" help="说明：登录页面展示的LOGO，如不设置则会默认使用APP的LOGO；建议尺寸180X180像素，png、jpg格式">
            <byf-upload-btn @change="changeImage" :imgsList="[formData.platform_login_logo]" ></byf-upload-btn>
          </a-form-model-item>
          <a-form-model-item class='mt-sm' label="邀请码控制"  help="说明：如选不强制填写邀请码，注册时邀请码页面会显示，但可跳过；如选强制填写邀请码，邀请码页面不可跳过；如选强制不填写邀请码，邀请码页面不会显示">
            <a-radio-group :options="loginInviteControlOptions" v-model="formData.login_invite_control" />
          </a-form-model-item>
        </a-form-model>
        <a-row class='mt'>
          <a-col offset="2">
            <a-button type="primary" @click="save" :loading="saveLoading">保存</a-button>
          </a-col>
        </a-row>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
export default {
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 18 },
 
      
      formData: {
        login_support_type:['sms'],
        login_protocol_require: '1',
        platform_login_restrict: '1',
        login_invite_control: '3',
        platform_login_restrict_text :"",
        platform_register_restrict  : '0',
        platform_login_logo:"",
      },
      loginTypeOptions: [
        {label: '短信验证码登录', value: 'sms', disabled: true},
        {label: '微信登录', value: 'wechat'},
        {label: '本机号码一键登录', value: 'oauth_phone'},
        {label: '账号密码登录', value: 'password'},
        // {label: 'QQ登录', value: 4, disabled: true},
        // {label: '支付宝登录', value: 5, disabled: true},
        // {label: '苹果登录', value: 6, disabled: true},
      ],
      loginProcotolOptions: [
        {label: '是', value: '1'},
        {label: '否', value: '0'}
      ],
      loginRestrictions: [
        {label: '开启', value: '1'},
        {label: '关闭', value: '0'}
      ],
      registrationRestrictionsOptions: [
        {label: '开启', value: '1'},
        {label: '关闭', value: '0'}
      ],
      loginInviteControlOptions: [
        {label: '强制填写邀请码', value: '3'},
        {label: '强制不填写邀请码', value: '1'},
        {label: '不强制填写邀请码', value: '2'},
      ],
      saveLoading: false,
      txtNum:"0/200"
    }
  },
  created(){
    this.spinning = true
    this.platformConfigGet();
  },
  methods: {
    platformConfigGet(){
      let config = [];
      for(let k in this.formData){
        config.push(k)
      }
      platformConfigGet({config}).then(res => {
        if(res.code == 200){
          this.spinning = false
          this.formData = res.data.config;
          this.txtNum = `${this.formData.platform_login_restrict_text .length}/200`
        }else{
          this.spinning = false
        }
      })
    },
    save(){
      console.log(this.formData)
      this.saveLoading = true;
      platformConfigSet(this.formData).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
          
        }
      }).finally(() => {
        this.saveLoading = false;
      })
    },
    changeImage(val){
      console.log(val,"changeImage")
      this.formData.platform_login_logo = val[0]
    },
    handlechangeTxt(){
      console.log(this.formData.platform_login_restrict_text ,"val")
      this.txtNum = `${this.formData.platform_login_restrict_text .length}/200`
    },
  }

}
</script>

<style scoped>
  .labelSlot{
    font-weight: bold;
  }
  .subLabel{
    padding: 10px 0;
    padding-right: 10px;
  }
  .mt{margin-top: 20px;}
  .mt-sm{margin-top: 10px;}
  .tip{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
</style>
<style lang="less">
  #input-suffix{
    padding-right: 60px;
  }
</style>