<template>
  <div>
    <a-card title='默认邀请码'>
      <a-spin :spinning="spinning">
        <a-form-model
          ref="ruleForm"
          :model="formData"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-form-model-item label="默认位数" prop="login_invite_length" help="只能为6~8位">
            <a-input-number v-model="formData.login_invite_length" :min="6" :max="8" />
          </a-form-model-item>
          <a-form-model-item label="支持字符类型" prop="login_invite_charset" >
            <a-checkbox-group :options="characterTypeOptions" v-model="formData.login_invite_charset"/>
          </a-form-model-item>
          <a-form-model-item label="邀请码限制" prop="wx_open_app_appid" help="说明: 连续数字/字母比如123,abc等; 相同数字/字母比如:111,bbb等。">
            <div>
              <byf-space>
                <span>连续数字/字母最长位数</span>
                <a-input-number v-model="formData.login_invite_shunzi_limit" :min="1" :max="formData.login_invite_length" />
                <a-switch v-model="formData.login_invite_shunzi_open"/>
              </byf-space>
            </div>
            <div>
              <byf-space>
                <span>相同数字/字母最长位数</span>
                <a-input-number v-model="formData.login_invite_baozi_limit" :min="1" :max="formData.login_invite_length" />
                <a-switch v-model="formData.login_invite_baozi_open"/>
              </byf-space>
            </div>
          </a-form-model-item>
          <!-- <a-row >
            <a-col offset='2' span="4">
              <div :style="{ width: 'calc(100% )'}">
                <a-form-model-item  :wrapperCol="{span: 24}"  >
                  <a-input v-model="code"></a-input>
                </a-form-model-item>
              </div>
            </a-col>
            <a-col span='2'>
            <div>
              <a-button class='ml-sm'  :disabled="!code.length>0" style='margin-top:4px' type='primary' @click='checkInfo()'>验证</a-button>
            </div>
            </a-col>
          </a-row> -->
          <a-form-model-item class='mt' label="邀请码预留" prop="login_invite_reserved_pool" help="说明：输入预留的邀请码，用户注册时不会再占用预留邀请码，可以输入多个，以英文逗号','分隔。">
            <a-textarea :rows="4" placeholder="请输入邀请码，比如'aaaaa,123456,888888,999999'" v-model="formData.login_invite_reserved_pool" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
            <a-button type="primary" @click="save" :loading="saveLoading">提交</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { platformConfigGet, platformConfigSet, AdminPlatformPlatformCheckInviteCode} from '@/services/platformSetting'
export default {
  data(){
    return {
      spinning: false,
      checksValue:"",
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      characterTypeOptions: [
        {label: '字母', value: '1'},
        {label: '数字', value: '2'},
        {label: '汉字（运行效率低，不建议使用）', value: '3'},
      ],
      formData: {
        login_invite_length: '8',
        login_invite_charset: ['1', '2'],
        login_invite_shunzi_limit: '2',
        login_invite_shunzi_open: false,
        login_invite_baozi_limit: '2',
        login_invite_baozi_open: true,
        login_invite_reserved_pool: '',
      },
      rules: {
        login_invite_charset: [
          { 
            type: 'array',
            required: true,
            message: '请选择支持字符类型',
            trigger: 'change',
          },
        ],
      },
      saveLoading: false,
      code:"",
    }
  },
  created(){
    this.platformConfigGet();
  },
  methods: {
    platformConfigGet(){
      let config = [];
      for(let k in this.formData){
        config.push(k)
      }
      this.spinning = true;
      platformConfigGet({config}).then(res => {
        if(res.code == 200){
          let formData = JSON.parse(JSON.stringify(res.data.config));
          formData.login_invite_shunzi_open = !!(formData.login_invite_shunzi_open * 1);
          formData.login_invite_baozi_open = !!(formData.login_invite_baozi_open * 1);
          this.formData = formData;
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    save(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let formData = JSON.parse(JSON.stringify(this.formData));
          formData.login_invite_shunzi_open = formData.login_invite_shunzi_open ? '1' : '0';
          formData.login_invite_baozi_open = formData.login_invite_baozi_open ? '1' : '0';
          this.saveLoading = true;
          platformConfigSet(formData).then(res => {
            if(res.code == 200){
              this.$message.success(res.msg);
            }
          }).finally(() => {
            this.saveLoading = false;
          })
        } else {
          console.log('error submit!!');
          this.$message.error('信息填写不完整')
          return false;
        }
      });

    },
    checkInfo(){
      console.log(this.code)
      this.AdminPlatformPlatformCheckInviteCodeFn(this.code)
    },
    AdminPlatformPlatformCheckInviteCodeFn(code){
      AdminPlatformPlatformCheckInviteCode({
        code
      }).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
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