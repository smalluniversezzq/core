<template>
<!-- 支付宝配置 -->
  <div>
    <a-spin :spinning="formModelSpinning">
      <a-form-model
          ref="form"
          :rules="rules"
          :model="formData"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="支付宝支付" prop="pay_alipay_open" help="是否启用支付宝支付">
            <a-radio-group v-model="formData.pay_alipay_open">
              <a-radio value="1"> 启用 </a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <!-- <a-form-model-item label="支付宝自动提现" prop="alipay_auto_withdraw">
            <a-radio-group v-model="formData.alipay_auto_withdraw">
              <a-radio :value="1"> 启用 </a-radio>
              <a-radio :value="0"> 关闭 </a-radio>
            </a-radio-group>
            <p class="tip">是否启用支付宝自动提现</p>
          </a-form-model-item>
          <a-form-model-item label="支付宝提现" prop="alipay_withdraw">
            <a-radio-group v-model="formData.alipay_withdraw">
              <a-radio :value="1"> 启用 </a-radio>
              <a-radio :value="0"> 关闭 </a-radio>
            </a-radio-group>
            <p class="tip">是否启用支付宝提现</p>
          </a-form-model-item> -->
          <a-form-model-item label="支付宝AppId" prop="pay_alipay_appid" help="APP支付宝支付使用">
            <a-input placeholder="请输入支付宝AppId" v-model="formData.pay_alipay_appid" />
          </a-form-model-item>
          <a-form-model-item label="支付宝商户私钥" prop="pay_alipay_privatekey" help="APP支付宝支付使用">
            <a-textarea :rows="4" placeholder="请输入支付宝商户私钥" v-model="formData.pay_alipay_privatekey" />
          </a-form-model-item>
          <a-form-model-item label="支付宝公钥" prop="pay_alipay_alipublickey" help="APP支付宝支付使用">
            <a-textarea :rows="4" placeholder="请输入支付宝公钥" v-model="formData.pay_alipay_alipublickey" />
          </a-form-model-item>
          <a-form-model-item label="沙盒模式" prop="pay_alipay_mode" help="调试使用，对接支付宝沙箱">
            <a-radio-group v-model="formData.pay_alipay_mode">
              <a-radio value="1"> 启用 </a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
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
      labelCol: { span: 3 },
      wrapperCol: { span: 17 },
      formData: {
        pay_alipay_open: '1',
        pay_alipay_appid: '',
        pay_alipay_privatekey: '',
        pay_alipay_alipublickey: '',
        pay_alipay_mode: '1',
      },
      rules: {
        pay_alipay_appid: [ { required: true, message: "支付宝AppId不能为空", trigger: "blur" }, ],
        pay_alipay_privatekey: [ { required: true, message: "支付宝商户私钥不能为空", trigger: "blur" }, ],
        pay_alipay_alipublickey: [ { required: true, message: "支付宝公钥不能为空", trigger: "blur" }, ],
      },
      saveLoading: false,
      saveResult: [],
      resultModalVisible: false,
      keyOfValue: {
        pay_alipay_open: '支付宝支付',
        pay_alipay_appid: '支付宝AppId',
        pay_alipay_privatekey: '支付宝商户私钥',
        pay_alipay_alipublickey: '支付宝公钥',
        pay_alipay_mode: '沙盒模式',
      },
      formModelSpinning: false,
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>