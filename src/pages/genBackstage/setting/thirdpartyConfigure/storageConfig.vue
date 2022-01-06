<!-- 短信配置 -->
<template>
  <div>
    <div class="config-title">
      <h1>存储配置</h1>
      <p class="tip">用于数据云存储</p>
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
      <a-spin :spinning="modalSpinning">
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
            <a-form-model-item label="AccessKey" prop="sys_storage_oss_accesskeyid">
              <a-input placeholder="请输入AccessKey" v-model="formData.sys_storage_oss_accesskeyid" />
            </a-form-model-item>
            <a-form-model-item label="AccessKey Secret" prop="sys_storage_oss_accesskeysecret">
              <a-input placeholder="请输入AccessKey Secret" v-model="formData.sys_storage_oss_accesskeysecret" />
            </a-form-model-item>
            <a-form-model-item label="地域节点EndPoint" prop="sys_storage_oss_endpoint">
              <a-input placeholder="请输入地域节点EndPoint" v-model="formData.sys_storage_oss_endpoint" />
            </a-form-model-item>
            <a-form-model-item label="存储空间名称Bucket" prop="sys_storage_oss_bucket">
              <a-input placeholder="请输入存储空间名称Bucket" v-model="formData.sys_storage_oss_bucket" />
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
import { platformConfigGet, platformConfigSet } from '@/services/platform'
import bg2 from '@/assets/img/platformSetting/2.png'
import bg3 from '@/assets/img/platformSetting/3.png'
export default {
  data(){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      typeList: [
        {
          id: 0,
          title: '阿里云OSS',
          hasService: true,
          sys_storage_drive: 'oss',
          status: false,
          params: {
            sys_storage_oss_accesskeyid: '',
            sys_storage_oss_accesskeysecret: '',
            sys_storage_oss_bucket: '',
            sys_storage_oss_endpoint: '',
          },
          rules: {
            sys_storage_oss_accesskeyid: [ { required: true, message: "AccessKeyID", trigger: "blur" }, ],
            sys_storage_oss_accesskeysecret: [ { required: true, message: "AccessKey Secret", trigger: "blur" }, ],
            sys_storage_oss_endpoint: [ { required: true, message: "地域节点EndPoint", trigger: "blur" }, ],
            sys_storage_oss_bucket: [ { required: true, message: "存储空间名称Bucket", trigger: "blur" }, ],
          },
          bgImg: bg2,
          link: [
            {
              link: 'https://www.aliyun.com/',
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
          hasService: false,
          sys_storage_drive: 'cos',
          title: '腾讯云COS',
          status: false,
          params: {
            sms_tengxunyun_accesskeyid: '',
            sms_tengxunyun_accesskeysecret: '',
            sms_tengxunyun_signname: '',
          },
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
          ]
        },
      ],
      visible: false,
      formData: {
        sys_storage_oss_accesskeyid: '',
        sys_storage_oss_accesskeysecret: '',
        sys_storage_oss_bucket: '',
        sys_storage_oss_endpoint: '',
      },
      currentFormData: {
        title: '',
        id: 0
      },
      confirmLoading: false,
      saveResult: [],
      keyOfValue: {
        sys_storage_oss_accesskeyid: 'AccessKeyID',
        sys_storage_oss_accesskeysecret: 'AccessKey Secret',
        sys_storage_oss_endpoint: '地域节点EndPoint',
        sys_storage_oss_bucket: '存储空间名称Bucket',
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
      platformConfigGet({config: ['sys_storage_drive']}).then(res => {
        if(res.code == 200){
          this.typeList.forEach((item) => {
            if(item.sys_storage_drive == res.data.config.sys_storage_drive){
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
            let sys_storage_drive = "";
            if(!item.status){
              sys_storage_drive = item.sys_storage_drive
            }
            platformConfigSet({sys_storage_drive: sys_storage_drive}).then(res => {
              resolve();
              if(res.code == 200){
                if(!this.statusShow(res.data.result)){
                  this.$message.error('设置失败')
                }else{
                  item.status = !item.status
                  this.typeList.forEach(val => {
                    if(val.sys_storage_drive != item.sys_storage_drive){
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