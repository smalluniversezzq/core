<!-- 物流配置 -->
<template>
  <div>
    <div class="config-title">
      <h1>快递物流配置</h1>
      <p class="tip">用于查看订单的物流信息，派单发货退货快递员上门取件等服务</p>
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
                <a-switch checked-children="ON" 
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
      :title="currentFormData.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="720"
    >
      <a-form-model
          ref="form"
          :model="formData"
          :rules="rules"
          :label-col="{span: 6}"
          :wrapper-col="{span: 18}"
        >
          <!-- <a-form-model-item label="接口类型" prop="api_type">
            <a-radio-group v-model="formData.api_type">
              <a-radio :value="0"> 企业接口 </a-radio>
              <a-radio :value="1"> 免费接口 </a-radio>
            </a-radio-group>
          </a-form-model-item> -->
          <a-form-model-item label="授权Key" prop="express_100code_key">
            <a-input placeholder="请输入授权Key" v-model="formData.express_100code_key" />
          </a-form-model-item>
          <a-form-model-item label="公司编号（Customer）" prop="express_100code_customer">
            <a-input placeholder="请输入公司编号（Customer）" v-model="formData.express_100code_customer" />
            <!-- <p class="tip">免费接口不需要填写Customer</p> -->
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
</template>

<script>

import bg1 from '@/assets/img/platformSetting/5.png'
import bg2 from '@/assets/img/platformSetting/2.png'
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
export default {
  data(){
    return {
      spinning: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      typeList: [
        {
          id: 0,
          title: '快递100',
          hasService: true,
          express_drive: '100_code',
          status: false,
          params: {
            express_100code_key: '',
            express_100code_customer: '',
          },
          rules: {
            express_100code_key: [ { required: true, message: "授权Key不能为空", trigger: "blur" }, ],
            express_100code_customer: [ { required: true, message: "公司编号（Customer）不能为空", trigger: "blur" }, ],
          },
          bgImg: bg1,
          link: [
            {
              link: 'https://www.kuaidi100.com/',
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
          title: '快递鸟',
          hasService: false,
          express_drive: 'code',
          status: false,
          params: {
            express_100code_key: '',
            express_100code_customer: '',
          },
          rules: {},
          bgImg: bg2,
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
        express_100code_key: '',
        express_100code_customer: '',
      },
      saveResult: [],
      keyOfValue: {
        express_100code_key: '授权Key',
        express_100code_customer: '公司编号（Customer）',
      },
      resultModalVisible: false,
      rules: {},
      currentFormData: {
        title: '',
        id: 0
      },
      confirmLoading: false,
    }
  },
  created(){
    this.getStatus();
  },
  methods: {
    toMould(item, link){
      if(!item.hasService){
        this.$message.info('暂无此服务')
        return;
      }
      this.visible = false;
      window.open(link.link, '_blank');       
    },
    // 获取当前开启状态的通道
    getStatus(){
      this.spinning = true;
      platformConfigGet({config: ['express_drive']}).then(res => {
        if(res.code == 200){
          this.typeList.forEach((item) => {
            if(item.express_drive == res.data.config.express_drive){
              item.status = true;
            }
          })
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    platformConfigSet(){
      platformConfigSet()
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
    checkDrive(item){
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
            let express_drive = "";
            if(!item.status){
              express_drive = item.express_drive
            }
            platformConfigSet({express_drive: express_drive}).then(res => {
              resolve();
              if(res.code == 200){
                if(!this.statusShow(res.data.result)){
                  this.resultModalVisible = true;
                }else{
                  item.status = !item.status
                  this.typeList.forEach(val => {
                    if(val.express_drive != item.express_drive){
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
</style>