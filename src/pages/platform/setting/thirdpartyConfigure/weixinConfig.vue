<!-- 微信配置 -->
<template>
  <div>
    <a-spin :spinning="formModelSpinning">
      <a-form-model
          ref="form"
          :model="formData"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="微信开放平台AppId" prop="wx_open_app_appid" help="APP微信授权登录使用">
            <a-input placeholder="请输入微信开放平台AppId" v-model="formData.wx_open_app_appid" />
          </a-form-model-item>
          <a-form-model-item label="微信开放平台AppSecret" prop="wx_open_app_appsecret" help="APP微信授权登录使用">
            <a-input placeholder="请输入微信开放平台AppSecret" v-model="formData.wx_open_app_appsecret" />
          </a-form-model-item>
          <a-form-model-item label="微信APP支付" prop="pay_wx_open" help="是否启用APP微信支付，不影响微信授权登录">
            <a-radio-group v-model="formData.pay_wx_open">
              <a-radio value="1"> 启用 </a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <!-- <a-form-model-item label="微信自动提现" prop="wx_auto_withdraw" help="是否启用微信自动提现">
            <a-radio-group v-model="formData.wx_auto_withdraw">
              <a-radio :value="1"> 启用 </a-radio>
              <a-radio :value="0"> 关闭 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="微信提现" prop="wx_withdraw">
            <a-radio-group v-model="formData.wx_withdraw">
              <a-radio :value="1"> 启用 </a-radio>
              <a-radio :value="0"> 关闭 </a-radio>
            </a-radio-group>
            <p class="tip">
              <span>是否启用微信提现</span>
            </p>
          </a-form-model-item> -->
          <a-form-model-item label="微信商户-商户号" prop="pay_wx_mchid" help="APP微信支付使用">
            <a-input placeholder="请输入微信商户-商户号" v-model="formData.pay_wx_mchid" />
          </a-form-model-item>
          <a-form-model-item label="微信商户-API秘钥" prop="pay_wx_key" help="APP微信支付使用">
            <a-input placeholder="请输入微信商户-API秘钥" v-model="formData.pay_wx_key" />
          </a-form-model-item>
          <!-- <a-form-model-item label="微信公众号AppId" prop="wx_official_accounts_appid">
            <a-input placeholder="请输入支付秘钥" v-model="formData.wx_official_accounts_appid" />
            <p class="tip">网页微信授权登录使用</p>
          </a-form-model-item>
          <a-form-model-item label="微信公众号AppSecret" prop="wx_official_accounts_secret">
            <a-input placeholder="请输入微信公众号AppSecret" v-model="formData.wx_official_accounts_secret" />
            <p class="tip">网页微信授权登录使用</p>
          </a-form-model-item>
          <a-form-model-item label="微信公众号-商户号" prop="wx_official_accounts_merchant_id">
            <a-input placeholder="请输入微信公众号-商户号" v-model="formData.wx_official_accounts_merchant_id" />
            <p class="tip">网页微信调起支付使用</p>
          </a-form-model-item>
          <a-form-model-item label="微信公众号-支付秘钥" prop="wx_official_accounts_pay_key">
            <a-input placeholder="请输入微信公众号-支付秘钥" v-model="formData.wx_official_accounts_pay_key" />
            <p class="tip">网页微信调起支付使用</p>
          </a-form-model-item>
          <a-form-model-item label="微信公众号-授权域名" prop="wx_official_accounts_domain_name">
            <a-input placeholder="请输入微信公众号-授权域名" v-model="formData.wx_official_accounts_domain_name" />
            <p class="tip">网页微信调起微信授权，如：http://web.youquanyun.com</p>
          </a-form-model-item>
          <a-form-model-item label="微信小程序AppId" prop="wx_mini_program_appid">
            <a-input placeholder="请输入微信小程序AppId" v-model="formData.wx_mini_program_appid" />
            <p class="tip">微信小程序授权登录使用</p>
          </a-form-model-item>
          <a-form-model-item label="微信小程序AppSecret" prop="wx_mini_program_secret">
            <a-input placeholder="请输入微信小程序AppSecret" v-model="formData.wx_mini_program_secret" />
            <p class="tip">微信小程序授权登录使用</p>
          </a-form-model-item> -->
          <a-form-model-item label="微信商户-API证书cert" help="红包和退款使用" prop="pay_wx_apiclientcert">
            <a-textarea :rows="4" placeholder="请输入微信商户-API证书cert" v-model="formData.pay_wx_apiclientcert" />
            <a-upload :multiple="false" :file-list="fileList" :remove="handleRemove" :before-upload="(file) => {beforeUpload(file, 'pay_wx_apiclientcert')} ">
              <a-button> <a-icon type="upload" /> {{formData.pay_wx_apiclientcert == '' ? '上传文件' : '重新上传'}} </a-button>
            </a-upload>
          
          </a-form-model-item>
          <a-form-model-item label="微信商户-API证书key" help="红包和退款使用" prop="pay_wx_apiclientkey">
            <a-textarea :rows="4" placeholder="请输入微信商户-API证书key" v-model="formData.pay_wx_apiclientkey" />
            <a-upload :multiple="false" :file-list="fileList" :remove="handleRemove" :before-upload="(file) => {beforeUpload(file, 'pay_wx_apiclientkey')} ">
              <a-button> <a-icon type="upload" /> {{formData.pay_wx_apiclientkey == '' ? '上传文件' : '重新上传'}} </a-button>
            </a-upload>
          </a-form-model-item>
          <!-- <a-form-model-item label="授权回调验证文件" help="验证接口请填写：http://app.youquanyun.com/api/120/wechat/auth/verify-token">
            请联系客服上传微信授权回调页面的MP_verify_XXXXXX.txt文件
          </a-form-model-item> -->
          <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
            <a-button type="primary" @click="platformConfigSet" :loading="saveLoading">提交</a-button>
          </a-form-model-item>
      </a-form-model>
    </a-spin>
    <a-modal :maskClosable="false" width="60%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
      <a-form-model :label-col="labelCol"
      :wrapper-col="wrapperCol">
        <a-form-model-item v-for="(item, index) in saveResult" :key="index" :label="item.title" v-show="!item.success">
          {{item.msg}}
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
// import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
import mixin from '@/pages/platform/setting/mixin/index'
export default {
  mixins: [mixin],
  data(){
    return {
      fileList: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      formData: {
        wx_open_app_appid: '',
        wx_open_app_appsecret: '',
        pay_wx_open: '1',
        pay_wx_mchid: '',
        pay_wx_key: '',
        pay_wx_apiclientcert: '',
        pay_wx_apiclientkey: ''
      },
      rules: {
        wx_open_app_appid: [ { required: true, message: "微信开放平台AppId不能为空", trigger: "blur" }, ],
        wx_open_app_appsecret: [ { required: true, message: "微信开放平台AppSecret不能为空", trigger: "blur" }, ],
        pay_wx_mchid: [ { required: true, message: "微信商户-商户号不能为空", trigger: "blur" }, ],
        pay_wx_key: [ { required: true, message: "微信商户-API秘钥不能为空", trigger: "blur" }, ],
        pay_wx_apiclientcert: [ { required: true, message: "微信商户-API证书cert不能为空", trigger: "blur" }, ],
        pay_wx_apiclientkey: [ { required: true, message: "微信商户-API证书key不能为空", trigger: "blur" }, ],
      },
      keyOfValue: {
        wx_open_app_appid: '微信开放平台AppId',
        wx_open_app_appsecret: '微信开放平台AppSecret',
        pay_wx_open: '微信APP支付',
        pay_wx_mchid: '微信商户-商户号',
        pay_wx_key: '微信商户-API秘钥',
        pay_wx_apiclientcert: '微信商户-API证书cert',
        pay_wx_apiclientkey: '微信商户-API证书key'
      },
    }
  },
  created(){
    
  },
  methods: {
    handleRemove(){

    },
    beforeUpload(file, formItem){
      this.readFile(file, formItem)
      return false;
    },
    readFile(file, formItem){
      let reader = new FileReader()
      reader.readAsText(file);
      // 读取文件内容
      reader.onload = (e) => {
        this.formData[formItem] = e.target.result;
      }
    }
  },
}
</script>

<style scoped lang="less">
</style>