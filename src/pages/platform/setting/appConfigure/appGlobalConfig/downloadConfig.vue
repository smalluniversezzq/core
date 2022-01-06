<template>
  <div>
    <a-spin :spinning="formModelSpinning">
      <a-form-model
        style="margin-top:35px"
        ref="form"
        :model="formData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item style="margin-left:5px" label="安卓下载地址" prop="download_android_url">
          <a-input v-model="formData.download_android_url" :style="{width:'calc(60%)'}" placeholder="请输入安卓App下载地址"></a-input>
        </a-form-model-item>
        <a-form-model-item style="margin-left:5px" label="苹果下载地址" prop="download_ios_url">
          <a-input v-model="formData.download_ios_url" :style="{width:'calc(60%)'}" placeholder="请输入苹果App下载地址"></a-input>
        </a-form-model-item>
        <a-form-model-item style="margin-left:5px" label="通用下载地址" prop="download_currency_url">
          <a-input v-model="formData.download_currency_url" :style="{width:'calc(60%)'}" placeholder="请输入App通用下载地址"></a-input>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{offset:labelCol.span}">
          <a-button type="primary" @click="platformConfigSet" :loading="saveLoading">保存</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
    <a-modal :destroyOnClose="true" :maskClosable="false" width="60%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
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
import mixin from '@/pages/platform/setting/mixin/index'

export default {
  mixins: [mixin],
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      formData: {
        download_currency_url: '',
        download_android_url: '',
        download_ios_url: ''
      },
      keyOfValue: {
        download_currency_url: '通用下载地址',
        download_android_url: '安卓下载地址',
        download_ios_url: '苹果下载地址'
      },
    }
  }
}
</script>

<style>

</style>