<!-- 微信公众号配置 -->
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
          <a-form-model-item :label="keyOfValue['wx_public_number_appid']" prop="wx_public_number_appid" help="公众号微信授权使用">
            <a-input :placeholder="`请输入${keyOfValue['wx_public_number_appid']}`" v-model="formData.wx_public_number_appid" />
          </a-form-model-item>
          <a-form-model-item :label="keyOfValue['wx_public_number_appsecret']" prop="wx_public_number_appsecret" help="公众号微信授权使用">
            <a-input :placeholder="`请输入${keyOfValue['wx_public_number_appsecret']}`" v-model="formData.wx_public_number_appsecret" />
          </a-form-model-item>
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
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      formData: {
        wx_public_number_appid: '',
        wx_public_number_appsecret: '',
      },
      rules: {
        wx_public_number_appid: [ { required: true, message: "微信公众号AppId不能为空", trigger: "blur" }, ],
        wx_public_number_appsecret: [ { required: true, message: "微信公众号AppSecret不能为空", trigger: "blur" }, ],
      },
      keyOfValue: {
        wx_public_number_appid: '微信公众号AppId',
        wx_public_number_appsecret: '微信公众号AppSecret',
      },
    }
  },
  created(){
    
  },
  methods: {
  },
}
</script>

<style scoped lang="less">
</style>