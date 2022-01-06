<!-- 分享配置 -->
<template>
  <div>
    <div class="config-title">
      <h1>分享配置</h1>
      <p class="tip">用于App端的分享操作</p>
    </div>
    <a-row :gutter="[10, 10]" class="service-wrap">
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
              <byf-icon @click="showModelOfService(item)" class="icon" type="iconshezhi"></byf-icon>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <br/>
    <div class="config-title">
      <h1>社会化分享平台启用</h1>
      <p class="tip">用于控制用户在App进行分享时的社会化分享平台，以及各个平台的接口参数配置</p>
    </div>
    <a-row :gutter="[10, 10]" class="shareSwitchWrap">
      <a-col class="item" :span="5" v-for="(item, index) in shareTypeList" :key="index">
        <a-card class="cardShare">
          <div class="content">
            <a-row>
              <a-col :span="16">
                <a-avatar
                  class="app-avatar"
                  shape="square"
                  :size="36"
                  :src="item.logo"
                ></a-avatar>
                {{item.title}}
              </a-col>
              <a-col :span="5">
                <a-switch v-model="item.status"/>
              </a-col>
              <a-col :span="2">
                <byf-icon @click="showModel(item)" class="icon" type="iconshezhi"></byf-icon>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-modal :maskClosable="false"
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
          <a-form-model-item label="App Key" prop="sms_aliyun_accesskeyid">
            <a-input placeholder="请输入App Key" v-model="formData.sms_aliyun_accesskeyid" />
          </a-form-model-item>
          <a-form-model-item label="AccessKey Secret" prop="sms_aliyun_accesskeysecret">
            <a-input placeholder="请输入AccessKey Secret" v-model="formData.sms_aliyun_accesskeysecret" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    <settingModel ref="settingModel" @save="saveSetting"></settingModel>
  </div>
</template>

<script>
import settingModel from './settingModel'
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
import ymShareBg from '@/assets/img/platformSetting/2.png'
export default {
  components: {
    settingModel
  },
  data(){
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 17 },
      tabListNoTitle: [
        {key: '0', tab: '分享配置'},
        {key: '1', tab: '社会化分享启用'},
      ],
      noTitleKey: '0',
      typeList: [
        {
          id: 0,
          title: '友盟U-share',
          sms_drive: 'aliyun',
          status: false,
          params: {
            sms_aliyun_accesskeyid: '',
            sms_aliyun_accesskeysecret: '',
          },
          rules: {
            sms_aliyun_accesskeyid: [ { required: true, message: "App Key", trigger: "blur" }, ],
            sms_aliyun_accesskeysecret: [ { required: true, message: "AccessKey Secret", trigger: "blur" }, ],
          },
          bgImg: ymShareBg,
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
      formData: {
        sms_aliyun_accesskeyid: '',
        sms_aliyun_accesskeysecret: '',
      },
      rules: {},
      shareTypeList: [
        {
          id: 0, 
          title: '微信',
          logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3012764833,2867762648&fm=26&gp=0.jpg', 
          status: false, 
          formItemList: [
            // type: 0:输入框，1:switch，field：内容字段
            {type: 0, label: 'APPID', field: 'appid', value: '', placeholder: '请输入APPID'},
            {type: 0, label: 'App Secret', field: 'app_secret', value: '', placeholder: '请输入appSecret'},
            {type: 0, label: 'App UniversaiLink', field: 'app_universaiLink', value: '', placeholder: '请输入app_universaiLink'},
            {type: 1, label: '开启转短链', field: 'short_chain', value: false, placeholder: ''},
            {type: 1, label: '状态', field: 'status', value: false, placeholder: ''},
          ]
        },
        {
          id: 1, 
          title: '微信朋友圈',
          logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3012764833,2867762648&fm=26&gp=0.jpg', 
          status: false, 
          formItemList: [
            // type: 0:输入框，1:switch，field：内容字段
            {type: 0, label: 'APPID', field: 'appid', value: '', placeholder: '请输入APPID'},
            {type: 0, label: 'App Secret', field: 'app_secret', value: '', placeholder: '请输入appSecret'},
            {type: 0, label: 'App UniversaiLink', field: 'app_universaiLink', value: '', placeholder: '请输入app_universaiLink'},
            {type: 1, label: '开启转短链', field: 'short_chain', value: false, placeholder: ''},
            {type: 1, label: '状态', field: 'status', value: false, placeholder: ''},
          ]
        },
        {
          id: 2, 
          title: '微信收藏',
          logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3012764833,2867762648&fm=26&gp=0.jpg', 
          status: false, 
          formItemList: [
            // type: 0:输入框，1:switch，field：内容字段
            {type: 0, label: 'APPID', field: 'appid', value: '', placeholder: '请输入APPID'},
            {type: 0, label: 'App Secret', field: 'app_secret', value: '', placeholder: '请输入appSecret'},
            {type: 0, label: 'App UniversaiLink', field: 'app_universaiLink', value: '', placeholder: '请输入app_universaiLink'},
            {type: 1, label: '开启转短链', field: 'short_chain', value: false, placeholder: ''},
            {type: 1, label: '状态', field: 'status', value: false, placeholder: ''},
          ]
        },
        {
          id: 3, 
          title: 'QQ',
          logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3012764833,2867762648&fm=26&gp=0.jpg', 
          status: false, 
          formItemList: [
            // type: 0:输入框，1:switch，field：内容字段
            {type: 0, label: 'APPID', field: 'appid', value: '', placeholder: '请输入APPID'},
            {type: 0, label: 'App Key', field: 'app_key', value: '', placeholder: '请输入app_key'},
            {type: 1, label: '开启转短链', field: 'short_chain', value: false, placeholder: ''},
            {type: 1, label: '状态', field: 'status', value: false, placeholder: ''},
          ]
        },
        {
          id: 4, 
          title: 'QQ空间',
          logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3012764833,2867762648&fm=26&gp=0.jpg', 
          status: false, 
          formItemList: [
            // type: 0:输入框，1:switch，field：内容字段
            {type: 0, label: 'APPID', field: 'appid', value: '', placeholder: '请输入APPID'},
            {type: 0, label: 'App Key', field: 'app_key', value: '', placeholder: '请输入app_key'},
            {type: 1, label: '开启转短链', field: 'short_chain', value: false, placeholder: ''},
            {type: 1, label: '状态', field: 'status', value: false, placeholder: ''},
          ]
        },
        {
          id: 5, 
          title: '微博',
          logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3012764833,2867762648&fm=26&gp=0.jpg', 
          status: false, 
          formItemList: [
            // type: 0:输入框，1:switch，field：内容字段
            {type: 0, label: 'App Key', field: 'app_key', value: '', placeholder: '请输入App Key'},
            {type: 0, label: 'App Secret', field: 'app_secret', value: '', placeholder: '请输入appSecret'},
            {type: 0, label: '备注', field: 'remark', value: '', placeholder: '请输入remark'},
            {type: 0, label: '授权回调页', field: 'redirectUri', value: '', placeholder: '请输入redirectUri'},
            {type: 1, label: '开启转短链', field: 'short_chain', value: false, placeholder: ''},
            {type: 1, label: '状态', field: 'status', value: false, placeholder: ''},
          ]
        },
      ],
      currentFormData: {
        title: '微信',
        id: 0,
      },
      visible: false,
      confirmLoading: false,
    }
  },
  methods: {
    // 获取当前开启状态的通道
    getStatus(){
      platformConfigGet({config: ['sms_drive']}).then(res => {
        if(res.code == 200){
          this.typeList.forEach((item) => {
            if(item.sms_drive == res.data.config.sms_drive){
              item.status = true;
            }
          })
        }
      })
    },
    checkSmsDrive(item){
      this.$confirm({
        title: "提示",
        content: "确定切换" + item.title + "的状态吗?其他服务将关闭",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            let sms_drive = "";
            if(!item.status){
              sms_drive = item.sms_drive
            }
            platformConfigSet({sms_drive: sms_drive}).then(res => {
              resolve();
              if(res.code == 200){
                item.status = !item.status
                this.typeList.forEach(val => {
                  if(val.sms_drive != item.sms_drive){
                    val.status = false;
                  }
                })
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
    handleOk(){
      
    },
    handleCancel(){
      this.visible = false;
    },
    showModelOfService(item){
      this.getItemConfig(item);
      this.rules = item.rules;
      this.currentFormData.title = item.title;
      this.currentFormData.id = item.id;
      // this.visible = true;
    },
    initFormModelData(){
      this.shareTypeList.map((item) => {
        item.formItemList.forEach((el) => {
          if(el.field == 'status'){
            el.value = item.status
          }
        })
      })
    },
    save(){},
    onTabChange(key, type){
      this[type] = key;
    },
    showModel(item){
      this.currentFormData.title = item.title;
      this.currentFormData.id = item.id;
      this.currentFormData.formItemList = item.formItemList;
      this.$refs.settingModel.show(this.currentFormData)
    },
    
    saveSetting(form){
      console.log(form)
      this.$refs.settingModel.confirmLoading = true;
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-switch-checked {
        background-color:#25bb30;;
      }
.service-wrap{
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
          font-size: 18px;
          display: block;
        }
      }
    }
  }
}

.shareSwitchWrap{
  .item{
    min-width: 300px;
  }
  .app-avatar{
    display: inline-block;
  }
  .cardShare{
    padding: 0;
    .content{
      line-height: 35px;
      overflow: hidden;
      .icon{
        font-size: 18px;
        margin-top: 12px;
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