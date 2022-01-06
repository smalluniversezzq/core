<!-- 推送配置 -->
<template>
  <div>
    <div class="config-title">
      <h1>推送配置</h1>
      <p class="tip">用于调用定位、地图选点服务功能</p>
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
                  @click="checkDrive(item)"/>
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
            :label-col="{span: 6}"
            :wrapper-col="{span: 18}"
          >
            <a-form-model-item label="mob-AppKey" prop="storage_oss_accesskeyid">
              <a-input placeholder="请输入mob-AppKey" v-model="formData.push_mob_app_key" />
            </a-form-model-item>
            <a-form-model-item label="mob-AppSecret" prop="storage_oss_accesskeysecret">
              <a-input placeholder="请输入mob-AppSecret" v-model="formData.push_mob_app_secret" />
            </a-form-model-item>
            <a-form-model-item label="mob-推送环境" prop="storage_oss_accesskeysecret">
              <a-radio-group v-model="formData.push_mob_product">
                <a-radio value="1"> 正式环境 </a-radio>
                <a-radio value="0"> 开发环境 </a-radio>
              </a-radio-group>
            </a-form-model-item>
        </a-form-model>
      </a-spin>
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
</template>

<script>
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
import jgPushBg from '@/assets/img/platformSetting/5.png'
import ymPushBg from '@/assets/img/platformSetting/2.png'
import txPushBg from '@/assets/img/platformSetting/3.png'
import gtPushBg from '@/assets/img/platformSetting/4.png'
export default {
  data(){
    return {
      spinning: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      typeList: [
        {
          id: 0,
          title: 'MOB',
          hasService: true,
          push_drive: 'mob',
          status: false,
          params: {
            push_mob_app_key: '',
            push_mob_app_secret: '',
            push_mob_product: '0',
          },
          rules: {
            push_mob_app_key: [ { required: true, message: "mob-AppKey", trigger: "blur" }, ],
            push_mob_app_secret: [ { required: true, message: "mob-AppSecret", trigger: "blur" }, ],
          },
          bgImg: ymPushBg,
          link: [
            {
              link: 'https://www.mob.com/',
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
          title: '极光推送',
          hasService: true,
          push_drive: 'jpush',
          status: false,
          params: {
          },
          rules: {
            storage_oss_accesskeyid: [ { required: true, message: "AccessKeyID", trigger: "blur" }, ],
            storage_oss_accesskeysecret: [ { required: true, message: "AccessKey Secret", trigger: "blur" }, ],
            storage_oss_endpoint: [ { required: true, message: "地域节点EndPoint", trigger: "blur" }, ],
            storage_oss_bucket: [ { required: true, message: "存储空间名称Bucket", trigger: "blur" }, ],
          },
          bgImg: jgPushBg,
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
        {
          id: 2,
          title: '友盟U-Push',
          hasService: false,
          push_drive: '',
          status: false,
          params: {},
          rules: {
            storage_oss_accesskeyid: [ { required: true, message: "AccessKeyID", trigger: "blur" }, ],
            storage_oss_accesskeysecret: [ { required: true, message: "AccessKey Secret", trigger: "blur" }, ],
            storage_oss_endpoint: [ { required: true, message: "地域节点EndPoint", trigger: "blur" }, ],
            storage_oss_bucket: [ { required: true, message: "存储空间名称Bucket", trigger: "blur" }, ],
          },
          bgImg: ymPushBg,
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
          id: 3,
          title: '腾讯云推送',
          hasService: false,
          push_drive: '',
          status: false,
          params: {
            storage_oss_accesskeyid: '',
            storage_oss_accesskeysecret: '',
            storage_oss_bucket: '',
            storage_oss_endpoint: '',
          },
          rules: {
            storage_oss_accesskeyid: [ { required: true, message: "AccessKeyID", trigger: "blur" }, ],
            storage_oss_accesskeysecret: [ { required: true, message: "AccessKey Secret", trigger: "blur" }, ],
            storage_oss_endpoint: [ { required: true, message: "地域节点EndPoint", trigger: "blur" }, ],
            storage_oss_bucket: [ { required: true, message: "存储空间名称Bucket", trigger: "blur" }, ],
          },
          bgImg: txPushBg,
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
          id: 4,
          title: '个推',
          hasService: false,
          push_drive: '',
          status: false,
          params: {
            storage_oss_accesskeyid: '',
            storage_oss_accesskeysecret: '',
            storage_oss_bucket: '',
            storage_oss_endpoint: '',
          },
          rules: {
            storage_oss_accesskeyid: [ { required: true, message: "AccessKeyID", trigger: "blur" }, ],
            storage_oss_accesskeysecret: [ { required: true, message: "AccessKey Secret", trigger: "blur" }, ],
            storage_oss_endpoint: [ { required: true, message: "地域节点EndPoint", trigger: "blur" }, ],
            storage_oss_bucket: [ { required: true, message: "存储空间名称Bucket", trigger: "blur" }, ],
          },
          bgImg: gtPushBg,
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
        storage_oss_accesskeyid: '',
        storage_oss_accesskeysecret: '',
        storage_oss_bucket: '',
        storage_oss_endpoint: '',
      },
      currentFormData: {
        title: '',
        id: 0
      },
      confirmLoading: false,
      saveResult: [],
      keyOfValue: {
        storage_oss_accesskeyid: 'AccessKeyID',
        storage_oss_accesskeysecret: 'AccessKey Secret',
        storage_oss_endpoint: '地域节点EndPoint',
        storage_oss_bucket: '存储空间名称Bucket',
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
      platformConfigGet({config: ['push_drive']}).then(res => {
        if(res.code == 200){
          this.typeList.forEach((item) => {
            if((item.push_drive == res.data.config.push_drive) && res.data.config.push_drive != ''){
              item.status = true;
            }
          })
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    checkDrive(item){
      console.log(item)
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
            let push_drive = "";
            if(!item.status){
              push_drive = item.push_drive
            }
            platformConfigSet({push_drive: push_drive}).then(res => {
              resolve();
              if(res.code == 200){
                item.status = !item.status
                this.typeList.forEach(val => {
                  if(val.push_drive != item.push_drive){
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
      if(!item.hasService){
        this.$message.info('暂无此服务')
        return;
      }
      this.getItemConfig(item);
      this.rules = item.rules;
      this.currentFormData.title = item.title;
      this.currentFormData.id = item.id;
      
      this.visible = true;
    },
    handleOk(){
      this.$refs.form.validate(valid => {
        if(valid){
          this.confirmLoading = true;
            platformConfigSet(this.formData).then(res => {
            if(res.code == 200){
              this.visible = false;
              this.saveResult = [];
              let status = true;
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