<!-- // App打包 -->
<template>
  <div>
    <a-card title="微信小程序配置">
      <a-form-model
              ref="ruleForm"
              :model="formData"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="AppId" prop="wx_mp_appid" >
          <a-input :style="{width:'calc(50%)'}" v-model="formData.wx_mp_appid" placeholder="请输入微信小程序AppId"/>
        </a-form-model-item>
        <a-form-model-item label="AppSecret" prop="wx_mp_appsecret" >
          <a-input  :disabled="false" :style="{width:'calc(50%)'}" placeholder="请输入微信小程序AppSecret" v-model='formData.wx_mp_appsecret'></a-input>
        </a-form-model-item>
        <a-form-model-item label="小程序原始ID" prop="wx_mp_original_id" >
          <a-input  :disabled="false" :style="{width:'calc(50%)'}" placeholder="请输入微信小程序原始ID" v-model='formData.wx_mp_original_id'></a-input>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
          <a-button type="primary" @click="submit" :loading="saveLoading">提交</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
  import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
  import mixin from '@/pages/platform/setting/mixin/index'
  export default {
    name:"wxApplets",
    components:{},
    mixins: [mixin],
    data(){
      return {
        labelCol: { span: 2 },
        wrapperCol: { span: 17 },
        formData:{
          wx_mp_appid:"",
          wx_mp_appsecret:"",
          wx_mp_original_id:"",
        },
        saveLoading: false,
        rules:{
          wx_mp_appid: [{ required: true, message: '请输入微信小程序AppId', trigger: 'change' }],
          wx_mp_appsecret: [{ required: true, message: '请输入微信小程序AppSecret', trigger: 'change' }],
          wx_mp_original_id: [{ required: true, message: '请输入微信小程序原始ID', trigger: 'change' }],
        }
      }
    },
    methods:{
      platformConfigGet,
      submit(){
        const self =this
        self.saveLoading = true
        self.$refs.ruleForm.validate(valid => {
          if (valid) {
            typeof this.beforeGetConfig == 'function' && this.beforeGetConfig();
            platformConfigSet(this.formData).then(res => {
              if(res.code == 200){
                let status = true;
                this.saveResult = [];
                let result = res.data.result;
                for(let k in this.keyOfValue){
                  this.saveResult.push({
                    ...result[k],
                    key: k,
                    title: this.keyOfValue[k]
                  })
                  if(result[k].success == false){
                    status = false
                  }
                }
                if(!status){
                  this.resultModalVisible = true;
                }else{
                  this.$message.success(res.msg)
                }
              }
            }).finally(() => {
              this.saveLoading = false;
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created(){
      this.platformConfigGet();
    },
    mounted(){},

  }
</script>

<style scoped lang="less">
  .platform-box{
    display: flex;

    .platform{
      width: 120px;
      height:70px;
      border:1px solid @border-color-base;
      color:@border-color-base;
      border-radius: 3px;
      display:flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 7px;
      cursor:pointer;
      .platform-content{
        .platform-icon{
          font-size: 22px;
          color: #b8b9bd;
        }
        .platform-txt{
          line-height: 0px;

        }
      }
    }
    .platform-ative{
      border:1px solid #68cacb;
      color:#68cacb;
    }
  }
  .version-box{
    display:flex;
    flex-wrap: wrap;
    .interval{
      width: 22px;
      height: 32px;
      line-height: 32px;
      text-align: center;

    }
  }
  .help{
    min-height: 22px;
    margin-top: -2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.5;
    span{
      color: red;
    }
  }
  .red{
    color: red;
  }
  .head-title{
    padding: 0 10px;
    width: calc(100% - 48px);
    height: 44px;
    background: #f5f5f5;
    line-height: 44px;
    margin-left: 35px;
    .head-info{
      font-size: 12px;
      color: #919191;
      margin-left: 10px;
    }
  }
  .platform-icon{
    font-size: 16px;
  }
  .package-error{
    color: #f5222d;
  }
  .package-info{
    color: #1890ff;
  }
  .package-success{
    color: #52c41a;
  }
</style>
<style lang="less">
  .version-box{
    .ant-input-number{
      .ant-input-number-handler-wrap{
        display:none;
      }
    }
  }

</style>
