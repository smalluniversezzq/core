<!-- // App打包 -->
<template>
  <div>
   <a-card title="APP打包">
     <div class="head-title mb">
       在线打包
     </div>
     <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
     >
      <a-form-model-item label="应用名称" prop="name" >
        <a-input :style="{width:'calc(50%)'}" v-model="formData.name" placeholder="请输入应用名称"/>
      </a-form-model-item>
      <a-form-model-item label="模块信息"  >
        <a-row>
          <a-col span="3">引擎版本{{formData.module_version?formData.module_version:"0"}}</a-col>
          <a-col span="3">应用模块 {{formData.module_info?formData.module_info:"0"}}个</a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item label="选择平台" prop="platform" >
        <div class='platform-box'>
          <div :class='formData.platform==1?"platform tac mr-sm platform-ative":"platform tac mr-sm"'  @click="platformChenge(1)">
            <div class='platform-content'>
              <byf-icon type="iconandroid1" :style="{color:formData.platform==1?'#1890ff':'#d9d9d9'}" class="platform-icon"></byf-icon>
              <div class="platform-txt">android</div>
            </div>
          </div>
          <div :class='formData.platform==2?"platform tac mr-sm platform-ative":"platform tac mr-sm"'  @click="platformChenge(2)">
            <div class='platform-content'>
              <byf-icon type="iconios" :style="{color:formData.platform==2?'#1890ff':'#d9d9d9'}" class="platform-icon"></byf-icon>
              <div class="platform-txt">ios</div>
            </div>
          </div>
        </div>
        <div class='platform-type'>
          <div>
            <a-tag :color="certificateStatus.android_certificate==1?'green':'red'">
              安卓证书
            </a-tag>
            <a-tag :color="certificateStatus.ios_formal_certificate==1?'green':'red'">
             苹果正式证书
            </a-tag>
            <a-tag :color="certificateStatus.ios_test_certificate==1?'green':'red'">
              苹果测试证书
            </a-tag>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="包类型" prop="package_type" >
        <a-radio-group name="radioGroup" v-model="formData.package_type">
          <a-radio :value="1">
            正式版
          </a-radio>
          <a-radio v-show='formData.platform == 2' :value="2">
            测试版
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="包名" prop="package_name" >
        <a-input  :disabled="false" :style="{width:'calc(50%)'}" placeholder="请输入包名" v-model='formData.package_name'></a-input>
      </a-form-model-item>
      <a-form-model-item label="版本号" prop="package_version" >
        <a-input style="width:100px" v-show='false' v-model="formData.package_version" />
        <div class='version-box'>
          <a-input-number :min="1" :max="99" v-model='version.one' style="width:50px" @change="handlechangeVersion"></a-input-number>
          <div class="interval">.</div>
          <a-input-number  :min="0" :max="99" v-model='version.two' style="width:50px" @change="handlechangeVersion"></a-input-number>
          <div class="interval">.</div>
          <a-input-number  :min="0" :max="99" v-model='version.three' style="width:50px" @change="handlechangeVersion"></a-input-number>
        </div>
      </a-form-model-item>
      <a-form-model-item  label="Version Code" prop="version_code" v-show='formData.platform=="1"'>
        <a-input-number placeholder="请输入Versioncode" v-model="formData.version_code" :min="0" :precision="0" :style="{width:'calc(50%)'}" />
        <div class='help'>说明：每次打包时，version code需要比<span >上一次大</span>，不然APP更新升级会失败</div>
      </a-form-model-item>
      <a-form-model-item   label="打包备注" prop="package_remark" help="说明：仅在后台打包记录中展示，可以随便输入">
        <a-input placeholder="请输入打包备注" v-model="formData.package_remark"  :style="{width:'calc(50%)'}" />
      </a-form-model-item>
     </a-form-model>
     <a-row class='mt'>
       <a-col offset='2'>
          <a-button class='mr' type="primary" @click="submit()">提交打包</a-button>
          <a-button @click='refresh()' :loading="refreshLoading">刷新配置</a-button>
       </a-col>
     </a-row>
     <a-row class='mt '>
       <a-col offset="2" class='red'  v-show='android_status == 1 || android_status == 2'>
         安卓打包进行中，等待打包完成才可以继续提交安卓打包申请（请过几分钟刷新查看结果）
       </a-col>
        <a-col offset="2"  class='red' v-show='ios_status == 1 || android_status == 2'>
         苹果打包进行中，等待打包完成才可以继续提交苹果打包申请（请过几分钟刷新查看结果）
       </a-col>
     </a-row >
      <div class="head-title mb mt">
       打包记录<span class='head-info'>(只保留最近10条打包记录)</span>
     </div>
     <a-table 
     :columns="columns" 
     :data-source="data"
     :pagination="false"
     >
      <template slot="platform" slot-scope="text, record">
        <span v-if="record.platform == 1">
          <byf-icon type="iconandroid1" class='platform-icon' :style="{color:record.package_status==3?'#389e0d':'#919191'}"></byf-icon>
          安卓
        </span>
          <span v-if="record.platform == 2">
          <byf-icon type="iconios" class='platform-icon' :style="{color:record.package_status==3?'#389E0D':'#919191'}"></byf-icon>
          苹果
        </span>
      </template>
      <template slot="package_type" slot-scope="text, record">
        <span>{{record.package_type ==1?"正式版":"测试版"}}</span> 
      </template>
      <template slot="package_status" slot-scope="text, record">
        <span class="package-error" v-if="record.package_status==0">失败</span> 
        <span class="package-info" v-if="record.package_status==1">排队中</span> 
        <span class="package-info" v-if="record.package_status==2">打包中</span> 
        <span class="package-success" v-if="record.package_status==3">成功</span> 
      </template>
      <template slot="package_time" slot-scope="text, record">
        {{moment(record.package_time * 1000).format("YYYY-MM-DD  HH:mm")}}
        <span v-if="record.package_status==0">失败</span> 
        <span v-if="record.package_status==1">排队</span> 
        <span v-if="record.package_status==2">提交</span> 
        <span v-if="record.package_status==3">成功</span> 
      </template>
      <template slot="package_remark" slot-scope="text, record">
        <span v-if="record.package_remark"> {{record.package_remark}}</span>
        <span v-else>--</span>
      </template>
       <template slot="action" slot-scope="text, record">
        <a-popconfirm
          title="确认转存吗"
          ok-text="确认"
          cancel-text="取消"
          @confirm="Transfer(record.id)"
          @cancel="cancelTransfer"
        >
          <a-button v-if="record.transfer_status == 1 " type="link"  :loading="transferLoading && record.id===TransferId">一键转存</a-button>
        </a-popconfirm>
         <a-button v-if="record.transfer_status == 2" @click='downloadTo(record.download_url)' type="link">下载 </a-button>
        <a-popconfirm
          title="确认删除吗"
          ok-text="确认"
          cancel-text="取消"
          @confirm="del(record.id)"
          @cancel="cancel"
        >
          <a-button v-if="record.package_status == 0 || record.package_status == 3" type="link">删除</a-button>
        </a-popconfirm>
      </template>
     </a-table>
   </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: '版本号',
    key: 'package_version',
    dataIndex: 'package_version',
  },
  {
    title: 'Version Code',
    key: 'version_code',
    dataIndex: 'version_code',
  },
  {
    title: '打包平台',
    key: 'platform',
    scopedSlots: { customRender: 'platform' },
  },
  {
    title: '包类型',
    key: 'package_type',
    scopedSlots: { customRender: 'package_type' },
  },
  {
    title: '打包状态',
    key: 'package_status',
    scopedSlots: { customRender: 'package_status' },
  },
  {
    title: '打包时间',
    key: 'package_time',
    scopedSlots: { customRender: 'package_time' },
  },
  {
    title: '备注',
    key: 'package_remark',
    scopedSlots: { customRender: 'package_remark' },
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
// PlatformcloudpackageTransfer
import { 
  PlatformCloudPackagePack, 
  Platformcloudpackageindex, 
  PlatformcloudpackageDel,
  PlatformcloudpackageTransfer
} from '@/services/platformSetting'
import moment from 'moment'
export default {
  name:"appBuildConfig",
  components:{},
  data(){
    return {
      moment,
      labelCol: { span: 2 },
      wrapperCol: { span: 17 },
      columns,
      data:[],
      android_status:"",
      ios_status:"",
      refreshLoading:false,
      transferLoading:false,
      TransferId:"",
      version:{
        one:"",
        two:"",
        three:"",
      },

      formData:{
        name:"",
        module_info:"",
        module_version:"",
        platform:"",
        package_type:"",
        package_name:"",
        package_version:"",
        version_code:"",
        package_remark :"",
      },
      certificateStatus:{
        android_certificate:"",
        ios_formal_certificate:"",
        ios_test_certificate:"",
      },
      rules:{
        name: [{ required: true, message: '请输入应用名称', trigger: 'change' }],
        platform: [{ required: true, message: '请选择平台', trigger: 'change' }],
        package_type: [{ required: true, message: '请选择包类型', trigger: 'change' }],
        package_name: [{ required: true, message: '请输入包名', trigger: 'change' }],
        package_version: [{ required: true, message: '请输入版本号', trigger: 'change' }],
        version_code: [{ required: true, message: '请输入Version Code', trigger: 'change' }],
      }
    }
  },
  methods:{
    platformChenge(type){
      console.log(type)
      if(type==1){
        if(this.certificateStatus.android_certificate==1){
          this.formData.platform = type
          this.formData.package_type = 1
        }else{
          this.$message.error('请配置安卓证书')
        }
        this.rules = {
          name: [{ required: true, message: '请输入应用名称', trigger: 'change' }],
          platform: [{ required: true, message: '请选择平台', trigger: 'change' }],
          package_type: [{ required: true, message: '请选择包类型', trigger: 'change' }],
          package_name: [{ required: true, message: '请输入包名', trigger: 'change' }],
          package_version: [{ required: true, message: '请输入版本号', trigger: 'change' }],
          version_code: [{ required: true, message: '请输入Version Code', trigger: 'change' }],
        }
      }else{
        this.rules = {
          name: [{ required: true, message: '请输入应用名称', trigger: 'change' }],
          platform: [{ required: true, message: '请选择平台', trigger: 'change' }],
          package_type: [{ required: true, message: '请选择包类型', trigger: 'change' }],
          package_name: [{ required: true, message: '请输入包名', trigger: 'change' }],
          package_version: [{ required: true, message: '请输入版本号', trigger: 'change' }],
        }
        if(this.certificateStatus.ios_formal_certificate==1 || this.certificateStatus.ios_test_certificate == 1){
          this.formData.platform = type
        }else{
          this.$message.error('请配置苹果证书')
        }
      }
    },
    handlechangeVersion(){
      if(!this.version.one && !this.version.two && !this.version.three){
        this.formData.package_version = ""
      }else{
        this.formData.package_version = `${this.version.one?this.version.one:''}.${(this.version.two || this.version.two==0)?this.version.two:''}.${(this.version.three || this.version.three==0)?this.version.three:''}`
      //  this.$refs.form.resetFields();
      }
      this.$refs.ruleForm.validateField('package_version');
    },
    // 校验证书
    // checkCertificate(){
    //   return new Promise((resolve, reject)=>{
    //     resolve()
    //   })
    // },
    submit(){
      const self =this
      console.log(self.formData);
      self.$refs.ruleForm.validate(valid => {
        if (valid) {
            if(self.formData.platform == 1 && self.android_status === 1){
              self.$error({
                title: '警告',
                content: '安卓正在打包中，请勿再次提交',
              });
            }else if(self.formData.platform == 2 && self.ios_status === 1){
              self.$error({
                title: '警告',
                content: '苹果正在打包中，请勿再次提交',
              });
            }else{
              if(self.formData.platform == 1 && self.certificateStatus.android_certificate !=1){
                self.$error({
                  title: '警告',
                  content: '安卓证书错误，请先配置证书',
                });
              }else if(self.formData.platform == 2 && self.certificateStatus.ios_formal_certificate !=1){
                self.$error({
                  title: '警告',
                  content: '苹果正式证书错误，请先配置证书',
                });
              }else if(self.formData.platform == 2 && self.certificateStatus.ios_test_certificate !=1){
                self.$error({
                  title: '警告',
                  content: '苹果测试证书错误，请先配置证书',
                });
              }else{
                self.$confirm({
                  title: '提醒',
                  content:'确认提交打包吗',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {
                    self.PlatformCloudPackagePackFn()
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                })
              }
            }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    
    PlatformCloudPackagePackFn(){
      PlatformCloudPackagePack(this.formData).then(res=>{
        if(res.code === 200){
          console.log(res.data)
          this.$message.success(res.msg)
          this.PlatformcloudpackageindexFn()
        }else{
          this.PlatformcloudpackageindexFn()
        }
      })
    },
    PlatformcloudpackageindexFn(type){
      Platformcloudpackageindex().then(res=>{
        if(res.code === 200){
          console.log(res)
          if(type==1){
            this.android_status = res.data.android_status
            this.ios_status = res.data.ios_status
            this.data = res.data.list
            this.refreshLoading = false
          }else{
            this.android_status = res.data.android_status
            this.ios_status = res.data.ios_status
            if(res.data.info.length > 0){
              this.formData = res.data.info[0]
            }
            this.certificateStatus.android_certificate = res.data.android_certificate
            this.certificateStatus.ios_formal_certificate = res.data.ios_formal_certificate
            this.certificateStatus.ios_test_certificate = res.data.ios_test_certificate

            this.data = res.data.list
            this.refreshLoading = false
          }
          if(this.formData.package_version){
            let versionList = this.formData.package_version.split(".")
            this.version.one = versionList[0]
            this.version.two = versionList[1]
            this.version.three = versionList[2]
          }
        }else{
          this.refreshLoading = false
        }
      })
    },
    refresh(){
      this.refreshLoading = true
      this.PlatformcloudpackageindexFn()
    },
    del(id){
      PlatformcloudpackageDel({id}).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.PlatformcloudpackageindexFn()
        }
      })
    },
    //转存
    Transfer(id){
      this.TransferId = id
      this.transferLoading = true
      PlatformcloudpackageTransfer({
        id
      }).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.PlatformcloudpackageindexFn(1)
          this.transferLoading = false

        }else{
          console.log(res.msg)
          this.transferLoading = false
        }
      })
    },
    // 下载
    downloadTo(url){
      window.location.href=url
    },
    cancelTransfer(){},
    cancel(){
      //取消删除
    }
  },
  created(){
    this.PlatformcloudpackageindexFn()
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
      border:1px solid #1890ff;
      color:#1890ff;
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
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;

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
  .platform-type{
    display: flex;
    .platform-btn{
      width: 130px;
      height: 32px;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      text-align: center;
      line-height: 32px;
    }

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