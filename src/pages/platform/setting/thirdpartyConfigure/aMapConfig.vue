<template>
<!-- 高德地图配置 -->
  <div>
    <div class="config-title">
      <h1>地图配置</h1>
      <p class="tip">用于调用定位、地图选点服务功能</p>
    </div>
    <a-form-model
        ref="form"
        :model="formData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="iOS Key" prop="ios_key">
          <a-input placeholder="请输入iOS Key" v-model="formData.ios_key" />
        </a-form-model-item>
        <a-form-model-item label="Android Key" prop="android_key">
          <a-input placeholder="请输入Android Key" v-model="formData.android_key" />
          <p class="tip">安卓和苹果分别对应一个key，用于调用高德地图的定位、地图服务功能</p>
        </a-form-model-item>
        <a-form-model-item label="开通相关服务" prop="app_secret">
          <p>
            <a href="" @click.prevent class="linkA">点击前往高德地图开放平台开通服务，获取key</a>
          </p>
        </a-form-model-item>
      <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
        <a-button type="primary" @click="save">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data(){
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 17 },
      formData: {
        
      }
    }
  },
  methods:{
    save(){
    
    }
  },
}
</script>

<style scoped lang="less">
.linkA{
  color: #1890ff;
  text-decoration: underline;
  font-weight: bold;
}
.config-title{
  padding-left: 5px;
  h1{
    font-weight: bold;
  }
}
.tip{
  color: #a0a0a0;
  font-size: 14px;
  line-height: 20px;
}
</style>