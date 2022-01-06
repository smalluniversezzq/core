<!-- // 实名认证配置 -->
<template>
  <div>
    <div class="config-title">
      <h1>实名认证配置</h1>
      <p class="tip">用于平台会员的实名、人脸认证</p>
    </div>
    <a-row :gutter="[10, 10]">
      <a-col class="item" :span="5" v-for="(item, index) in typeList" :key="index">
        <a-card class="cardShare" :style="{backgroundImage: 'url(' + item.bgImg + ')'}">
          <div class="content">
            <div class="title">{{item.title}}</div>
              <a-button class="btnLink" type="link" @click.prevent="toMould(item, link)"
              v-for="(link, linkIndex) in item.link" :key="linkIndex"
            >
            {{link.title}}</a-button>
            <div class="status">
              <a-switch v-model="item.status"/>
              <byf-icon @click="showModel(item)" class="icon" type="iconshezhi"></byf-icon>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-modal :maskClosable="false"
      :destroyOnClose="true"
      :title="currentFormData.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="45%"
    >
      <a-form-model
          ref="form"
          :model="formData"
          :label-col="{span: 6}"
          :wrapper-col="{span: 18}"
        >
        <a-form-model-item label="App Key" prop="app_key">
            <a-input placeholder="请输入App Key" v-model="formData.app_key" />
          </a-form-model-item>
          <a-form-model-item label="App Secret" prop="app_secret">
            <a-input placeholder="请输入App Secret" v-model="formData.app_secret" />
          </a-form-model-item>
          <a-form-model-item label="验证上传身份证" prop="verify_idcard">
            <a-switch v-model="formData.verify_idcard"/>
            <p class="tip">开启后，用户进行实名认证需上传身份证正反面照片</p>
          </a-form-model-item>
          <a-form-model-item label="人脸识别" prop="face_recognition">
            <a-switch v-model="formData.face_recognition"/>
            <p class="tip">开启后，用户进行实名认证需进行人脸识别</p>
          </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>

import bg3 from '@/assets/img/platformSetting/3.png'
import bg4 from '@/assets/img/platformSetting/4.png'
export default {
  data(){
    return {
      typeList: [
        {
          id: 0,
          title: '阿里云实名认证',
          hasService: false,
          storage_drive: '',
          status: false,
          params: {
          },
          rules: {},
          bgImg: bg3,
          link: [
            {
              link: '',
              title: '前往开通服务'
            },
            {
              link: '',
              title: ''
            },
          ],
        },
        {
          id: 1,
          title: '网易易盾实名认证',
          hasService: false,
          storage_drive: '',
          status: false,
          params: {
          },
          rules: {},
          bgImg: bg4,
          link: [
            {
              link: '',
              title: '前往开通服务'
            },
            {
              link: '',
              title: ''
            },
          ],
        },
      ],
      visible: false,
      formData: {
        id: 0,
        app_key: '',
        app_secret: '',
        app_code: '',
        verify_idcard: false,
        face_recognition: false,
      },
      currentFormData: {
        title: '',
        id: 0
      },
      confirmLoading: false,
    }
  },
  methods: {
    showModel(item){
      this.currentFormData.title = item.title;
      this.formData.id = item.id;
      this.visible = true;
    },
    handleOk(){

    },
    handleCancel(){
      this.visible = false;
    }
  },
}
</script>

<style scoped lang="less">
/deep/ .ant-switch-checked {
        background-color:#25bb30;;
      }
.item{
  min-width: 300px;
  .cardShare{
    background-repeat:no-repeat;
    background-size: 100% 100%;
    border-radius: 6px;
    overflow: hidden;
    color: #fff;
  }
  .content{
    .title{
      font-weight: bold;
      font-size: 16px;
    }
    .btnLink{
      color: #fff;
      padding: 0;
      display: block;
      &:last-of-type{
        margin-bottom: 10px;
      }
    }
    .status{
      display: flex;
      justify-content: space-between;
      .icon{
        margin-top: 4px;
        font-size: 16px;
        display: block;
      }
    }
  }
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