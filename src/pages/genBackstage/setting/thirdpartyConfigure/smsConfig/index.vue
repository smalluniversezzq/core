<!-- 短信配置 -->
<template>
  <div>
    <div v-if="configWrapShow">
      <div class="config-title">
        <h1>短信配置</h1>
        <p class="tip">用于向用户发送短信，例如发送手机验证码</p>
      </div>
      <a-row :gutter="[10, 10]">
        <a-col class="item" :span="5" v-for="(item, index) in typeList" :key="index">
          <a-card class="cardShare" :style="{backgroundImage: 'url(' + item.bgImg + ')'}">
            <div class="content">
              <div class="title">{{item.title}}</div>
              <a-button class="btnLink" type="link" @click.prevent="toMould(item,link)"
                v-for="(link, linkIndex) in item.link" :key="linkIndex"
              >
              {{link.title}}</a-button>
              <div class="status">
                <!-- <a-switch v-model="item.status"/> -->
                <a-switch
                  checked-children="ON" 
                  un-checked-children="OFF" 
                  :checked="item.status" 
                  @click="checkSmsDrive(item)"/>
                <byf-icon @click="showModel(item)" class="icon" type="iconshezhi"></byf-icon>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <a-modal :maskClosable="false"
        :destroyOnClose="true"
        width="50%"
        :title="currentFormData.title"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form-model
          ref="form"
          :model="formData"
          :rules="rules"
          :label-col="{span: 6}"
          :wrapper-col="{span: 18}"
        >
          <!-- <a-form-model-item label="短信类型" prop="sms_type">
            <a-radio-group v-model="formData.sms_type">
              <a-radio :value="0"> 国内版 </a-radio>
              <a-radio :value="1"> 国际版 </a-radio>
            </a-radio-group>
          </a-form-model-item> -->
          <a-form-model-item label="AccessKeyID" prop="sys_sms_aliyun_accesskeyid">
            <a-input placeholder="请输入AccessKeyID" v-model="formData.sys_sms_aliyun_accesskeyid" />
          </a-form-model-item>
          <a-form-model-item label="AccessKey Secret" prop="sys_sms_aliyun_accesskeysecret">
            <a-input placeholder="请输入AccessKey Secret" v-model="formData.sys_sms_aliyun_accesskeysecret" />
          </a-form-model-item>
          <a-form-model-item label="阿里签名" prop="sys_sms_aliyun_signname">
            <a-input placeholder="请输入阿里签名" v-model="formData.sys_sms_aliyun_signname" />
          </a-form-model-item>
          <a-form-model-item class="goSetingMould" :wrapper-col="{ span: 14, offset: 6 }">
            要启用阿里通道，请先<a href="" @click.prevent="toMould(currentFormData, currentFormData.link[1])">配置阿里云短信模板</a>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <a-modal :maskClosable="false" width="50%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
        <a-form-model :label-col="labelCol"
        :wrapper-col="wrapperCol">
          <a-form-model-item v-for="(item, index) in saveResult" :key="index" :label="item.title" v-show="!item.success">
            {{item.msg}}
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <div>
      <aliyunSMSMould @mouldBack="mouldBack" v-if="aliyunMouldShow"></aliyunSMSMould>
    </div>
  </div>
</template>

<script>
import aliyunSMSMould from './settingMould'
import { platformConfigGet, platformConfigSet } from '@/services/platform'
import bg6 from '@/assets/img/platformSetting/6.png'
import bg7 from '@/assets/img/platformSetting/7.png'
export default {
  components: {
    aliyunSMSMould
  },
  data(){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      typeList: [
        {
          id: 0,
          hasService: true,
          title: '阿里云短信服务',
          sys_sms_drive: 'aliyun',
          status: false,
          params: {
            sys_sms_aliyun_accesskeyid: '',
            sys_sms_aliyun_accesskeysecret: '',
            sys_sms_aliyun_signname: '',
          },
          rules: {
            sys_sms_aliyun_accesskeyid: [ { required: true, message: "AccessKeyID", trigger: "blur" }, ],
            sys_sms_aliyun_accesskeysecret: [ { required: true, message: "AccessKey Secret", trigger: "blur" }, ],
            sys_sms_aliyun_signname: [ { required: true, message: "阿里签名", trigger: "blur" }, ],
          },
          bgImg: bg6,
          link: [
            {
              link: 'https://www.aliyun.com/',
              title: '前往开通服务'
            },
            {
              link: 0,
              title: '短信模板设置'
            }
          ]
        },
        {
          id: 1,
          hasService: false,
          sys_sms_drive: 'tengxunyun',
          title: '腾讯云短信服务',
          status: false,
          params: {
            sms_tengxunyun_accesskeyid: '',
            sms_tengxunyun_accesskeysecret: '',
            sms_tengxunyun_signname: '',
          },
          bgImg: bg7,
          link: [
            {
              link: '',
              title: '前往开通服务'
            },
            {
              link: '',
              title: ''
            },
          ]
        },
      ],
      visible: false,
      formData: {
        sys_sms_aliyun_accesskeyid: '',
        sys_sms_aliyun_accesskeysecret: '',
        sys_sms_aliyun_signname: '',
      },
      currentFormData: {
        title: '',
        id: 0
      },
      confirmLoading: false,
      saveResult: [],
      keyOfValue: {
        sys_sms_aliyun_accesskeyid: 'AccessKeyID',
        sys_sms_aliyun_accesskeysecret: 'AccessKey Secret',
        sys_sms_aliyun_signname: '阿里签名',
      },
      resultModalVisible: false,
      rules: {},

      configWrapShow: true,
      aliyunMouldShow: false,
    }
  },
  created(){
    this.getStatus();
  },
  methods: {
    mouldBack(data){
      this.configWrapShow = true;
      if(data.id == 0){
        this.aliyunMouldShow = false;
      }
    },
    toMould(item, link){
      if(!item.hasService){
        this.$message.info('暂无此服务')
        return;
      }
      this.visible = false;
      if(link.link === 0){
        // 去设置模板
        this.configWrapShow = false;
        if(item.id == 0){
          // 阿里云模板配置
          this.aliyunMouldShow = true;
        }
      }else{
        window.open(link.link, '_blank');       
      }
    },
    // 获取当前开启状态的通道
    getStatus(){
      platformConfigGet({config: ['sys_sms_drive']}).then(res => {
        if(res.code == 200){
          this.typeList.forEach((item) => {
            if(item.sys_sms_drive == res.data.config.sys_sms_drive){
              item.status = true;
            }
          })
        }
      })
    },
    statusShow(data){
      this.saveResult = [];
      let status = true;
      let result = data;
      for(let k in result){
        this.saveResult.push({
          ...result[k],
          key: k,
          title: this.keyOfValue[k]
        })
      }
      return status;
    },
    checkSmsDrive(item){
      if(!item.hasService){
        this.$message.info('暂无此服务')
        return;
      }
      this.$confirm({
        title: "提示",
        content: "确定切换" + item.title + "的状态吗?其他服务将关闭",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            let sys_sms_drive = "";
            if(!item.status){
              sys_sms_drive = item.sys_sms_drive
            }
            platformConfigSet({sys_sms_drive: sys_sms_drive}).then(res => {
              resolve();
              if(res.code == 200){
                if(!this.statusShow(res.data.result)){
                  this.resultModalVisible = true;
                }else{
                  item.status = !item.status
                  this.typeList.forEach(val => {
                    if(val.sys_sms_drive != item.sys_sms_drive){
                      val.status = false;
                    }
                  })
                  this.$message.success(res.msg)
                }
              }
            }).catch(err => {
              console.log(err);
              reject();
            });
          })
        },
        onCancel() {}
      });
    },
    getItemConfig(item){
      let config = [];
      for(let k in item.params){
        config.push(k);
      }
      platformConfigGet({config}).then(res => {
        if(res.code == 200){
          if(res.data.config){
            item.params = res.data.config;
            this.formData = item.params;
          }
        }
      })
    },
    showModel(item){
      if(!item.hasService){
        this.$message.info('暂无此服务')
        return;
      }
      this.getItemConfig(item);
      this.rules = item.rules;
      this.currentFormData = item;
      this.visible = true;
    },
    setConfig(){

    },
    handleOk(){
      this.$refs.form.validate(valid => {
        if(valid){
          this.confirmLoading = true;
          platformConfigSet(this.formData).then(res => {
            if(res.code == 200){
              if(!this.statusShow(res.data.result)){
                this.resultModalVisible = true;
              }else{
                this.visible = false;
                this.$message.success(res.msg)
              }
            }
          }).finally(() => {
            this.confirmLoading = false;
          })
        }
      })
     
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

.goSetingMould{
  a{
    text-decoration: underline;
    color: #1890ff;
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