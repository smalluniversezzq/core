<!-- 一键登录认证配置 -->
<template>
  <div>
    <div class="config-title">
      <h1>一键登录认证配置</h1>
      <p class="tip">用于用户在注册/登录时使用本地手机号一键登录</p>
    </div>
    <a-spin :spinning="spinning">
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
    </a-spin>
    <a-modal :maskClosable="false"
      :destroyOnClose="true"
      width="50%"
      :title="currentFormData.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-spin :spinning="modalSpinning">
        <a-form-model
            ref="form"
            :model="formData"
            :rules="rules"
            :label-col="{span: 7}"
            :wrapper-col="{span: 17}"
          >
            <!-- <a-form-model-item label="短信类型" prop="sms_type">
              <a-radio-group v-model="formData.sms_type">
                <a-radio :value="0"> 国内版 </a-radio>
                <a-radio :value="1"> 国际版 </a-radio>
              </a-radio-group>
            </a-form-model-item> -->
            <a-form-model-item label="一键登录-APPKey" prop="oauth_jpush_appkey">
              <a-input placeholder="请输入一键登录-APPKey" v-model="formData.oauth_jpush_appkey" />
            </a-form-model-item>
            <a-form-model-item label="一键登录-MasterSecret" prop="oauth_jpush_mastersecret">
              <a-input placeholder="请输入一键登录-MasterSecret" v-model="formData.oauth_jpush_mastersecret" />
            </a-form-model-item>
            <a-form-model-item label="一键登录-证书" prop="oauth_jpush_key">
              <a-textarea :rows="4" placeholder="请输入一键登录-证书" v-model="formData.oauth_jpush_key" />
            </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-modal>
    <a-modal :maskClosable="false" width="50%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
      <a-form-model>
        <a-form-model-item v-for="(item, index) in saveResult" :key="index" :label="item.title" v-show="!item.success">
          {{item.msg}}
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
import jg from '@/assets/img/platformSetting/1.png'
export default {
  data(){
    return {
      spinning: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      typeList: [
        {
          id: 0,
          title: '极光认证',
          hasService: true,
          oauth_drive: 'jpush',
          status: false,
          params: {
            oauth_jpush_appkey: '',
            oauth_jpush_mastersecret: '',
            oauth_jpush_key: '',
          },
          rules: {
            oauth_jpush_appkey: [ { required: true, message: "极光一键登录-APPKey不能为空", trigger: "blur" }, ],
            oauth_jpush_mastersecret: [ { required: true, message: "极光一键登录-MasterSecret不能为空", trigger: "blur" }, ],
            oauth_jpush_key: [ { required: true, message: "极光一键登录-证书不能为空", trigger: "blur" }, ],
          },
          bgImg: jg,
          link: [
            {
              link: 'https://www.jpush.cn/push',
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
        oauth_jpush_appkey: '',
        oauth_jpush_mastersecret: '',
        oauth_jpush_key: '',
      },
      currentFormData: {
        title: '',
        id: 0
      },
      confirmLoading: false,
      saveResult: [],
      keyOfValue: {
        oauth_drive: '极光一键登录-开启状态',
        oauth_jpush_appkey: '极光一键登录-APPKey',
        oauth_jpush_mastersecret: '极光一键登录-MasterSecret',
        oauth_jpush_key: '极光一键登录-证书',
      },
      resultModalVisible: false,
      rules: {},
      modalSpinning: false,
    }
  },
  created(){
    this.getStatus();
  },
  methods: {
    // 获取当前开启状态的通道
    getStatus(){
      this.spinning = true;
      platformConfigGet({config: ['oauth_drive']}).then(res => {
        if(res.code == 200){
          this.typeList.forEach((item) => {
            if(item.oauth_drive == res.data.config.oauth_drive){
              item.status = true;
            }
          })
        }
      }).finally(() => {
        this.spinning = false;
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
            let oauth_drive = "";
            if(!item.status){
              oauth_drive = item.oauth_drive
            }
            platformConfigSet({oauth_drive: oauth_drive}).then(res => {
              resolve();
              if(res.code == 200){
                if(!this.statusShow(res.data.result)){
                  this.resultModalVisible = true;
                }else{
                  item.status = !item.status
                  this.typeList.forEach(val => {
                    if(val.oauth_drive != item.oauth_drive){
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
      this.modalSpinning = true;
      platformConfigGet({config}).then(res => {
        if(res.code == 200){
          if(res.data.config){
            item.params = res.data.config;
            this.formData = item.params;
          }
        }
      }).finally(() => {
        this.modalSpinning = false;
      })
    },
    toMould(item, link){
      if(!item.hasService){
        this.$message.info('暂无此服务')
        return;
      }
      window.open(link.link, '_blank');       
    },
    showModel(item){
      console.log(111111111)
      this.getItemConfig(item);
      this.rules = item.rules;
      this.currentFormData.title = item.title;
      this.currentFormData.id = item.id;
      this.visible = true;
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
        cursor: pointer;
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
.goSetingMould{
  a{
    text-decoration: underline;
    color: #1890ff;
  }
}
</style>