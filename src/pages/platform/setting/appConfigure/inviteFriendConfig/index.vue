<!-- 站点设置 -->
<template>
  <a-card class="invite-friend-config"
  title="邀请粉丝"
  >
    <a-spin :spinning="formModelSpinning">
      <a-form-model
        ref="form"
        :model="formData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="邀请页头图" prop="login_invite_head" help="建议尺寸750x280，jpg、png格式">
          <byf-upload-btn :imgsList="[formData.login_invite_head]" @change="(res)=>{onImgChange('login_invite_head', res)}"></byf-upload-btn>
        </a-form-model-item>
        <br>
        <a-form-model-item label="邀请海报" prop="login_invite_poster" help="建议尺寸750x1220，jpg、png格式">
          <invite-upload-btn 
            :multiple="true"
            :imgsList="formData.login_invite_poster" 
            @change="(res)=>{onImgChange('login_invite_poster', res)}"
          ></invite-upload-btn>
        </a-form-model-item>
        <br>
        <a-form-model-item label="邀请步骤" prop="login_invite_step">
          <a-textarea placeholder="请输入邀请步骤，请注意格式" v-model="formData.login_invite_step"></a-textarea>
        </a-form-model-item>
        <br>
        <a-form-model-item label="分享卡片标题" prop="login_invite_share_title">
          <a-input placeholder="请输入分享卡片标题" v-model="formData.login_invite_share_title"></a-input>
        </a-form-model-item>
        <br>
        <a-form-model-item label="分享卡片内容" prop="login_invite_share_content">
          <a-textarea placeholder="请输入分享卡片内容，请注意格式" v-model="formData.login_invite_share_content"></a-textarea>
        </a-form-model-item>
        <br>
        <a-form-model-item label="分享卡片主图" prop="login_invite_share_image" help="建议尺寸200x200，jpg、png格式">
          <byf-upload-btn :imgsList="[formData.login_invite_share_image]" @change="(res)=>{onImgChange('login_invite_share_image', res)}"></byf-upload-btn>
        </a-form-model-item>
        <br>
        <a-form-model-item label="落地页头图" prop="login_invite_page_head" help="建议尺寸750x750，jpg、png格式">
          <byf-upload-btn :imgsList="[formData.login_invite_page_head]" @change="(res)=>{onImgChange('login_invite_page_head', res)}"></byf-upload-btn>
        </a-form-model-item>
        <br>
        <a-form-model-item label="落地页地址" prop="login_invite_page_url">
          <a-input placeholder="请输入邀请落地页地址" v-model="formData.login_invite_page_url"></a-input>
        </a-form-model-item>
        <br>
        <a-form-model-item :wrapper-col="{offset:labelCol.span}">
          <a-button type="primary" @click="platformConfigSet" :loading="saveLoading">保存</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
    <a-modal :maskClosable="false" width="60%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
      <a-form-model :label-col="labelColModal"
      :wrapper-col="wrapperColModal">
        <a-form-model-item v-for="(item, index) in saveResult" :key="index" :label="item.title" v-show="!item.success">
          {{item.msg}}
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script> 
import mixin from '@/pages/platform/setting/mixin/index'
import InviteUploadBtn from './uploadBtn'
// eslint-disable-next-line
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'

export default {
  components: {InviteUploadBtn},
  mixins: [mixin],
  created(){
  },
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      labelColModal: { span: 4 },
      wrapperColModal: { span: 14 },
      formData: {
        login_invite_head: '',
        login_invite_poster: [],
        login_invite_step: '1',
        login_invite_page_head: '',
        login_invite_share_title: '',
        login_invite_share_content: '',
        login_invite_share_image: '',
        login_invite_page_url: ''
      },
      keyOfValue: {
        login_invite_head:  '邀请页-头部图片',
        login_invite_poster: '邀请页-分享海报数组',
        login_invite_step: '邀请页-邀请步骤',
        login_invite_page_head: '邀请页-落地页头图',
        login_invite_share_title: '邀请页-分享卡片标题',
        login_invite_share_content: '邀请页-分享卡片内容',
        login_invite_share_image: '邀请页-分享卡片主图',
        login_invite_page_url: '邀请页-落地页地址'
      },
    }
  },
  methods:{
    onImgChange(key, res){
      if(typeof this.formData[key] == 'string') {
        this.formData[key] = res[0] || ''
      } else {
        this.formData[key] = res
      }
    },
  },
}
</script>

<style scoped>

</style>