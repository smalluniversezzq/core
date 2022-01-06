<!-- // 证书 -->
<template>
  <div>
    <a-spin :spinning="spinning">
      <div class="head-title mb">
        <span>安卓证书</span>
        <span class="end-txt ">
          <a-button type="link" @click="showCreat()">一键创建证书</a-button>
        </span>
      </div>
      <a-row>
        <a-col span='12'>
          <a-form-model
            ref="ruleFormAndroid"
            :model="formDataAndroid"
            :rules="rulesAndroid"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="应用包名" prop="android_package_name" >
              <a-input :disabled="!stateTab.android" :style="{width:'calc(50%)'}"  v-model="formDataAndroid.android_package_name" placeholder="请输入应用包名"/>
            </a-form-model-item>
            <a-form-model-item label="别名" prop="android_package_alias" >
              <a-input :disabled="!stateTab.android" name="android_package_alias" :style="{width:'calc(50%)'}" autocomplete="new-password" v-model="formDataAndroid.android_package_alias" placeholder="请输入别名"/>
            </a-form-model-item>
            <a-form-model-item label="别名密码" prop="android_certificate_alias_password" >
              <a-input :disabled="!stateTab.android" name="android_certificate_alias_password"  type="password" autocomplete="new-password" :style="{width:'calc(50%)'}" v-model="formDataAndroid.android_certificate_alias_password" placeholder="请输入别名密码"/>
            </a-form-model-item>
            <a-form-model-item label="证书库密码" prop="android_certificate_library_password" >
              <a-input :disabled="!stateTab.android" name="android_certificate_library_password" type="password" autocomplete="new-password" :style="{width:'calc(50%)'}" v-model="formDataAndroid.android_certificate_library_password" placeholder="请输入证书库密码"/>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col span="10">
          <div class='upload-box'>
            <div class='uploadfile-box' v-if="formDataAndroid.android_file_list.length==0">
              <a-upload
                :file-list="formDataAndroid.android_file_list" 
                :before-upload="(file)=>{beforeUpload(file,'android_file_list')}"
              >
                <div class='uploadfile-btn '>
                  <byf-icon type="iconjiahao"></byf-icon>
                  <span class='ml-sm' style="cursor: pointer">选择证书</span>
                </div>
              </a-upload>
            </div>
            <div v-else class='uploadfile-box'>
              <img :src="api_pic" alt="">
            </div>
            <div class='uploadfile-title tac '>安卓证书</div>
            <div class='close' v-if="formDataAndroid.android_file_list.length!==0" @click="()=>{formDataAndroid.android_file_list=[]}">
              <byf-icon type="iconclose" />
            </div>
            <div class='download-icon-box' v-show="checkDownloadUrl(formDataAndroid.android_file_list)"  @click="downloadUrl(formDataAndroid.android_file_list)">
              <byf-icon class='download-icon' type="iconxiazai"></byf-icon>
            </div>
          </div>
        </a-col>
        <a-col span="2">
          <a-button type="link" v-show="stateTab.android" @click="AndroidSubmit(formDataAndroid,1,'安卓证书')">保存</a-button>
          <a-button type="link" v-show="!stateTab.android" @click="()=>{stateTab.android = !stateTab.android}">修改</a-button>
          <a-button type="link" v-show="stateTab.android" @click="cancelCertficate(formDataAndroid,1,'安卓证书')">取消</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-show='sha1.length>0' class='sha1-box'>
          安卓签名证书SHA1码:  {{sha1}}
          <a-button id="copysha1" :data-clipboard-text="sha1" @click='copy()' type="link" >原格式复制</a-button>
          <a-button id="copysha1s" :data-clipboard-text="sha1s"  @click='copys()' type="link">去冒号复制</a-button>
        </a-col>
      </a-row>
      <div class="head-title mt mb">
        <span>苹果正式证书</span>
      </div>
      <a-row>
        <a-col span="12">
          <a-form-model
            ref="ruleFormIos"
            :model="formDataIos"
            :rules="rulesIos"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="应用包名" prop="ios_package_name" >
              <a-input :disabled="!stateTab.ios" :style="{width:'calc(50%)'}" autocomplete="new-password"  v-model="formDataIos.ios_package_name" placeholder="请输入应用包名"/>
            </a-form-model-item>
            <a-form-model-item label="证书密码" prop="ios_certificate_password" >
              <a-input :disabled="!stateTab.ios" type='password' :style="{width:'calc(50%)'}" autocomplete="new-password" v-model="formDataIos.ios_certificate_password" placeholder="请输入证书密码"/>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col span="10" class='file-flex'>
          <div class='upload-box'>
            <div class='uploadfile-box' v-if="formDataIos.ios_file_list_p12.length==0">
              <a-upload
                :file-list="formDataIos.ios_file_list_p12" 
                :before-upload="(file)=>{beforeUpload(file,'ios_file_list_p12')}"
              >
                <div class='uploadfile-btn '>
                  <byf-icon type="iconjiahao"></byf-icon>
                  <span class='ml-sm' style="cursor: pointer">选择证书</span>
                </div>
              </a-upload>
            </div>
            <div v-else class='uploadfile-box'>
              <img :src="api_pic" alt="">
            </div>
            <div class='uploadfile-title tac '>p12证书</div>
            <div class='close' v-if="formDataIos.ios_file_list_p12.length!==0" @click="()=>{formDataIos.ios_file_list_p12=[]}">
              <byf-icon type="iconclose" />
            </div>
            <div class='download-icon-box' v-show="checkDownloadUrl(formDataIos.ios_file_list_p12)"  @click="downloadUrl(formDataIos.ios_file_list_p12)">
              <byf-icon class='download-icon' type="iconxiazai"></byf-icon>
            </div>
          </div>
          <!-- //描述文件 -->
          <div class='upload-box upload-box-ml'>
            <div class='uploadfile-box' v-if="formDataIos.ios_file_list.length==0">
              <a-upload
                :file-list="formDataIos.ios_file_list" 
                :before-upload="(file)=>{beforeUpload(file,'ios_file_list')}"
              >
                <div class='uploadfile-btn '>
                  <byf-icon type="iconjiahao"></byf-icon>
                  <span class='ml-sm' style="cursor: pointer">选择文件</span>
                </div>
              </a-upload>
            </div>
            <div v-else class='uploadfile-box'>
              <img :src="api_pic" alt="">
            </div>
            <div class='uploadfile-title tac '>描述文件</div>
            <div class='close' v-if="formDataIos.ios_file_list.length!==0" @click="()=>{formDataIos.ios_file_list=[]}">
              <byf-icon type="iconclose" />
            </div>
            <div class='download-icon-box' v-show="checkDownloadUrl(formDataIos.ios_file_list)"  @click="downloadUrl(formDataIos.ios_file_list)">
              <byf-icon class='download-icon' type="iconxiazai"></byf-icon>
            </div>
          </div>
        </a-col>
        <a-col span="2">
          <a-button type="link"  v-show="stateTab.ios"  @click="AndroidSubmit(formDataIos,2,'苹果正式证书')">保存</a-button>
          <a-button type="link" v-show="!stateTab.ios" @click="()=>{stateTab.ios = !stateTab.ios}">修改</a-button>
          <a-button type="link" v-show="stateTab.ios" @click="cancelCertficate(formDataIos,2,'苹果正式证书')">取消</a-button>
        </a-col>
      </a-row>
      <a-row v-if='url_link.length>0'>
        <a-col  span='2' class='tar link-copy link-title'>
          URL LINK：
        </a-col>
        <a-col span='18' class='tal link-copy'>
           {{url_link}}
          <a-button id="copylink" :data-clipboard-text="url_link" @click='copyLink()' type="link" >复制</a-button>
        </a-col>
      </a-row>
      <a-row v-else>
        <a-col  span='2' class='tar link-copy link-title'>
          URL LINK：
        </a-col>
        <a-col  span='18' class='tal link-copy'>
         暂无（上传证书后自动展示）
        </a-col>
      </a-row>
      <div class="head-title mt mb">
      <span>苹果测试证书</span>
      </div>
      <a-row>
        <a-col span="12">
          <a-form-model
            ref="ruleFormIosTest"
            :model="formDataIosTest"
            :label-col="labelCol"
            :rules="rulesIosTest"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="应用包名" prop="ios_package_name_test" >
              <a-input :disabled="!stateTab.ios_test" :style="{width:'calc(50%)'}" autocomplete="new-password"  v-model="formDataIosTest.ios_package_name_test" placeholder="请输入应用包名"/>
            </a-form-model-item>
            <a-form-model-item label="证书密码" prop="ios_certificate_password_test" >
              <a-input :disabled="!stateTab.ios_test" type="password" :style="{width:'calc(50%)'}" autocomplete="new-password" v-model="formDataIosTest.ios_certificate_password_test" placeholder="请输入证书密码"/>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col span="10" class='file-flex'>
          <div class='upload-box'>
            <div class='uploadfile-box' v-if="formDataIosTest.ios_file_list_p12_test.length==0">
              <a-upload
                :file-list="formDataIosTest.ios_file_list_p12_test" 
                :before-upload="(file)=>{beforeUpload(file,'ios_file_list_p12_test')}"
              >
                <div class='uploadfile-btn '>
                  <byf-icon type="iconjiahao"></byf-icon>
                  <span class='ml-sm' style="cursor: pointer">选择证书</span>
                </div>
              </a-upload>
            </div>
            <div v-else class='uploadfile-box'>
              <img :src="api_pic" alt="">
            </div>
            <div class='uploadfile-title tac '>p12证书</div>
            <div class='close' v-if="formDataIosTest.ios_file_list_p12_test.length!==0" @click="()=>{formDataIosTest.ios_file_list_p12_test=[]}" >
              <byf-icon type="iconclose" />
            </div>
            <div class='download-icon-box' v-show="checkDownloadUrl(formDataIosTest.ios_file_list_p12_test)"  @click="downloadUrl(formDataIosTest.ios_file_list_p12_test)">
              <byf-icon class='download-icon' type="iconxiazai"></byf-icon>
            </div>
          </div>
          <!-- //描述文件 -->
          <div class='upload-box upload-box-ml'>
            <div class='uploadfile-box' v-if="formDataIosTest.ios_file_list_test.length==0">
              <a-upload
                :file-list="formDataIosTest.ios_file_list_test" 
                :before-upload="(file)=>{beforeUpload(file,'ios_file_list_test')}"
              >
                <div class='uploadfile-btn '>
                  <byf-icon type="iconjiahao"></byf-icon>
                  <span class='ml-sm' style="cursor: pointer">选择文件</span>
                </div>
              </a-upload>
            </div>
            <div v-else class='uploadfile-box'>
              <img :src="api_pic" alt="">
            </div>
            <div class='uploadfile-title tac'>描述文件</div>
            <div class='close' v-if="formDataIosTest.ios_file_list_test.length!==0" @click="()=>{formDataIosTest.ios_file_list_test=[]}">
              <byf-icon type="iconclose" />
            </div>
            <div class='download-icon-box' v-show="checkDownloadUrl(formDataIosTest.ios_file_list_test)"  @click="downloadUrl(formDataIosTest.ios_file_list_test)">
              <byf-icon class='download-icon' type="iconxiazai"></byf-icon>
            </div>
          </div>
        </a-col>
        <a-col span="2">
          <a-button type="link" v-show="stateTab.ios_test"  @click="AndroidSubmit(formDataIosTest,3,'苹果测试证书')">保存</a-button>
          <a-button type="link" v-show="!stateTab.ios_test" @click="()=>{stateTab.ios_test = !stateTab.ios_test}">修改</a-button>
          <a-button type="link" v-show="stateTab.ios_test" @click="cancelCertficate(formDataIosTest,3,'苹果测试证书')">取消</a-button>
        </a-col>
      </a-row>
      <a-row v-if='url_link_test.length>0'>
        <a-col  span='2' class='tar link-copy link-title'>
          URL LINK：
        </a-col>
        <a-col span='18' class='tal link-copy'>
            {{url_link_test}}
          <a-button id="copylinktest" :data-clipboard-text="url_link_test" @click='copyLinktest()' type="link" >复制</a-button>
        </a-col>
      </a-row>
      <a-row v-else>
        <a-col  span='2' class='tar link-copy link-title'>
          URL LINK：
        </a-col>
        <a-col  span='18' class='tal link-copy'>
         暂无（上传证书后自动展示）
        </a-col>
      </a-row>
      <a-modal 
        v-model="createVisible" 
        title="创建证书"
        :width="700"
      >
      <template slot="footer">
        <a-button key="back" @click="createCance">
          关闭
        </a-button>
        <a-button key="submit" type="primary" :loading="createLoading" @click="createOk">
          创建并下载
        </a-button>
      </template>
        <!-- ref="ruleFormAndroid" -->
      <a-form-model
        maskClosable='false'
        ref="ruleFormCreate"
        :rules="rulesCreate"
        :model="formDataCreate"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="别名" prop="alias" help="别名自己设置">
          <a-input :style="{width:'calc(90%)'}" v-model="formDataCreate.alias" placeholder="请输入别名"/>
        </a-form-model-item>
        <a-form-model-item label="别名密码" prop="alias_password" help="密码不能小于6位">
          <a-input type="password" autocomplete="new-password" :style="{width:'calc(90%)'}"  v-model="formDataCreate.alias_password" placeholder="请输入别名密码"/>
        </a-form-model-item>
        <a-form-model-item label="证书库密码" prop="certificate_password" help="设置证书库密码不要设置特殊字符，密码不能小于6位">
          <a-input :style="{width:'calc(90%)'}" type="password" autocomplete="new-password" v-model="formDataCreate.certificate_password" placeholder="请输入证书库密码"/>
        </a-form-model-item>
      </a-form-model>
      <div style="color:red">*注意：以上信息，自己一定要妥善保存，以后会一直用同一个，否则新包就不是同一个APP了</div>
      </a-modal>
    </a-spin>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { 
  PlatformcloudpackageAndroid, 
  PlatformcloudpackageIosTest,
  PlatformcloudpackageIosFile,
  PlatformcloudpackageCreatedCertificate,
  PlatformcloudpackageCertificateInfo
} from '@/services/platformSetting'
export default {
  components:{
  },
  data(){
    return{
      labelCol: { span: 4 },
      wrapperCol: { span: 20},
      spinning:false,
      formDataAndroid:{
        android_package_name:"",
        android_package_alias:"",
        android_certificate_alias_password:"",
        android_certificate_library_password:"",
        android_file_list:[],
      },
      rulesAndroid:{
        android_package_name:[
          { required: true, message: '应用包名不能为空', trigger: 'change' }
        ],
        android_package_alias:[
          { required: true, message: '别名不能为空', trigger: 'change' }
        ],
        android_certificate_alias_password:[
          { required: true, message: '别名密码不能为空', trigger: 'change' }
        ],
        android_certificate_library_password:[
          { required: true, message: '证书库密码不能为空', trigger: 'change' }
        ],
      },
      createLoading:false,
      formDataIos:{
        ios_package_name:"",
        ios_certificate_password:"",
        ios_file_list:[],
        ios_file_list_p12:[],
      },
      rulesIos:{
        ios_package_name:[
          { required: true, message: '应用包名不能为空', trigger: 'change' }
        ],
        ios_certificate_password:[
          { required: true, message: '证书密码不能为空', trigger: 'change' }
        ],
      },
      formDataIosTest:{
        ios_package_name_test:"",
        ios_certificate_password_test:"",
        ios_file_list_test:[],
        ios_file_list_p12_test:[],
      },
      rulesIosTest:{
        ios_package_name_test:[
          { required: true, message: '应用包名不能为空', trigger: 'change' }
        ],
        ios_certificate_password_test:[
          { required: true, message: '证书密码不能为空', trigger: 'change' }
        ],
      },
      sha1:"",
      sha1s:"",
      url_link:"",
      url_link_test:"",
      createVisible:false,
      formDataCreate:{
        alias_password:"",
        alias:"",
        certificate_password:"",
      },
      rulesCreate:{
        alias:[
           { required: true, message: '别名不能为空', trigger: 'change' }
        ],
        alias_password:[
           { required: true, message: '别名密码不能为空', trigger: 'change' },
           { min:6, max:30, message: '请输入6位以上密码', trigger: 'change' },
        ],
        certificate_password:[
           { required: true, message: '证书库密码不能为空', trigger: 'change' },
           { min:6, max:30, message: '请输入6位以上密码', trigger: 'change' },
        ],
      },
      api_pic:require("@/assets/img/platformSetting/cert-Android.png"),
      stateTab:{
        android:false,
        ios:false,
        ios_test:false,
      }
    }

  },
  methods:{
    copy() {
      let _this = this
      var clipboard = new Clipboard('#copysha1')

      clipboard.on('success', function() {
        _this.$message.success("复制成功")
      })
        clipboard.on('error', function(){
        _this.$message.success("失败")
      })
      setTimeout(()=>{
        clipboard.destroy();
      },1000)
    },
    copys() {
      let _this = this
      var clipboard = new Clipboard('#copysha1s')

      clipboard.on('success', function() {
        _this.$message.success("复制成功")
      })
        clipboard.on('error', function(){
        _this.$message.success("失败")
      })
      setTimeout(()=>{
        clipboard.destroy();
      },1000)
    },
    copyLink() {
      let _this = this
      var clipboard = new Clipboard('#copylink')

      clipboard.on('success', function() {
        _this.$message.success("复制成功")
      })
        clipboard.on('error', function(){
        _this.$message.success("失败")
      })
      setTimeout(()=>{
        clipboard.destroy();
      },1000)
    },
    copyLinktest() {
      let _this = this
      var clipboard = new Clipboard('#copylinktest')

      clipboard.on('success', function() {
        _this.$message.success("复制成功")
      })
        clipboard.on('error', function(){
        _this.$message.success("失败")
      })
      setTimeout(()=>{
        clipboard.destroy();
      },1000)
    },
    // 创建证书
    showCreat(){
      const self = this;
      this.$confirm({
        title:"创建证书",
        content:"证书修改参数后相当于一个新的APP，如不熟悉不要自行操作,否则打出来的包会出现无法使用",
        okText: '继续创建',
        onOk(){
          self.createVisible = true
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    },
    createVisibleFn(){
      this.createVisible = true
    },
    AndroidSubmit(data,type,msg){
      const self = this;
      if(type == 1){
        this.$refs.ruleFormAndroid.validate(valid => {
        if (valid) {
          if(data.android_file_list.length == 0){
              this.$error({
                title: '错误',
                content: `${msg}不能为空`,
              });
            }else{
              self.confirmFn(data,type,msg) 
            }
          }else{
            return false;
          }
        })
      }else if(type == 2){
        this.$refs.ruleFormIos.validate(valid => {
          if (valid) {
            console.log('asd')
            if(data.ios_file_list.length == 0 && data.ios_file_list_p12.length == 0){
              this.$error({
                title: '错误',
                content: `${msg}不能为空`,
              });
            }else{
              self.confirmFn(data,type,msg) 
            }
          }else{
            return false;
          }
        })
      }else if(type == 3){
        this.$refs.ruleFormIosTest.validate(valid => {
          if (valid) {
            if(data.ios_file_list_test.length == 0 && data.ios_file_list_p12_test.length == 0){
              this.$error({
                title: '错误',
                content: `${msg}不能为空`,
              });
            }else{
              self.confirmFn(data,type,msg) 
            }
          }else{
            return false;
          }
        })
      }
    },
    confirmFn(data,type,msg){
      let self = this
      self.$confirm({
        title: '保存',
        content: `确认保存${msg}吗`,
        okText:"保存",
        cancelText:'取消',
        onOk() {
          if(type==1){
            console.log(type,data)
            self.PlatformcloudpackageAndroidFn(data)
          }else if(type == 2){
            console.log(self.formDataIos)
            self.PlatformcloudpackageIosFn(data)
          }else if(type == 3){
            console.log(type,data)
            self.PlatformcloudpackageIosTestFn(data)
          }
        },
        onCancel() {
          console.log(self.formDataAndroid,'formDataAndroid - onCancel')
        },
      });
    },
    // 安卓保存
    PlatformcloudpackageAndroidFn(data){
      PlatformcloudpackageAndroid(data).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.formDataAndroid.android_file_list = res.data.android_file_list
          this.stateTab.android = !this.stateTab.android
          this.sha1 = res.data.sha1
          this.sha1s = res.data.sha1s
          //
        }
      })
    },
    PlatformcloudpackageIosFn(){
      PlatformcloudpackageIosFile(this.formDataIos).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.formDataIos.ios_file_list = res.data.ios_file_list
          this.formDataIos.ios_file_list_p12 = res.data.ios_file_list_p12
          this.stateTab.ios = !this.stateTab.ios
          this.url_link = res.data.url_link
        }
      })
    },
    PlatformcloudpackageIosTestFn(data){
      PlatformcloudpackageIosTest(data).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.formDataIosTest.ios_file_list_test = res.data.ios_file_list_test
          this.formDataIosTest.ios_file_list_p12_test = res.data.ios_file_list_p12_test
          this.stateTab.ios_test = !this.stateTab.ios_test
          this.url_link_test = res.data.url_link_test
        }
      })
    },
    // 取消
    cancelCertficate(data,type,msg){
      console.log(data,type,msg)
      this.getCertificateInfoFn(type)

    },
    //创建并下载
    createOk(){
      this.createLoading = true
      // ruleFormCreate
      this.$refs.ruleFormCreate.validate(valid => {
        if (valid) {
          this.PlatformcloudpackageCreatedCertificateFn()
        }else{
          this.createLoading = false
          return false;
        }
      })
    },
    PlatformcloudpackageCreatedCertificateFn(){
      PlatformcloudpackageCreatedCertificate(this.formDataCreate).then(res=>{
        if(res.code === 200){
          console.log(res.data.file)
          window.location.href = res.data.file
          // window.open(res.data.file)
          this.createLoading = false
          this.createVisible = false
        }else{
          this.createLoading = false
          this.$message.error(res.msg)
        }
      })
    },
    // 关闭
    createCance(){
      this.createVisible = false
    },
    beforeUpload(file,type) {
      if(type === "android_file_list"){
        this.formDataAndroid[type] = file
      }else if(type === "ios_file_list"){
        //校验证书是否合规 
        this.checkFormatFn(file,type,'mobileprovision')
      }else if(type === "ios_file_list_p12"){
        this.checkFormatFn(file,type,'p12')
      }else if(type === "ios_file_list_test"){
        this.checkFormatFn(file,type,'mobileprovision')
      }else if(type === "ios_file_list_p12_test"){
        this.checkFormatFn(file,type,'p12')
        //  this.formDataIosTest[type] = file
      }
      return false;
    },
    checkFormatFn(file,type,name){
      console.log(file,type,name)
      var index = file.name.substring(file.name.lastIndexOf(".")+1);
      if(index === name){
        if(type === 'ios_file_list' || type === 'ios_file_list_p12'){
          this.formDataIos[type] = file
        }else{
          this.formDataIosTest[type] = file
        }
      }else{
        this.$error({
          title: '错误',
          content: `证书格式应为${name}`,
        });
      }
    },
    getCertificateInfoFn(type){
      console.log(type)
      PlatformcloudpackageCertificateInfo().then(res=>{
        if(res.code === 200){
          console.log(res)
          this.spinning = false
          if(type == '1' ){
            this.formDataAndroid.android_package_name = res.data.android_package_name
            this.formDataAndroid.android_package_alias = res.data.android_package_alias
            this.formDataAndroid.android_certificate_alias_password = res.data.android_certificate_alias_password
            this.formDataAndroid.android_certificate_library_password = res.data.android_certificate_library_password
            this.stateTab.android = !this.stateTab.android
            
          }else if(type == '2' ){
            this.formDataIos.ios_package_name = res.data.ios_package_name 
            this.formDataIos.ios_certificate_password = res.data.ios_certificate_password 
            this.stateTab.ios = !this.stateTab.ios
          }else if(type == '3' ){
            this.formDataIosTest.ios_package_name_test = res.data.ios_package_name_test
            this.formDataIosTest.ios_certificate_password_test = res.data.ios_certificate_password_test
            this.stateTab.ios_test = !this.stateTab.ios_test
          }else if(type == 'all'){
            this.formDataAndroid.android_package_name = res.data.android_package_name
            this.formDataAndroid.android_package_alias = res.data.android_package_alias
            this.formDataAndroid.android_certificate_alias_password = res.data.android_certificate_alias_password
            this.formDataAndroid.android_certificate_library_password = res.data.android_certificate_library_password
            this.formDataAndroid.android_file_list = res.data.android_file_list || [] 

            this.formDataIos.ios_package_name = res.data.ios_package_name 
            this.formDataIos.ios_certificate_password = res.data.ios_certificate_password 
            this.formDataIos.ios_file_list = res.data.ios_file_list || [] 
            this.formDataIos.ios_file_list_p12 = res.data.ios_file_list_p12 || [] 

            this.formDataIosTest.ios_package_name_test = res.data.ios_package_name_test
            this.formDataIosTest.ios_certificate_password_test = res.data.ios_certificate_password_test
            this.formDataIosTest.ios_file_list_test = res.data.ios_file_list_test || [] 
            this.formDataIosTest.ios_file_list_p12_test = res.data.ios_file_list_p12_test || []
            if(!this.formDataAndroid.android_file_list.length > 0){
              this.stateTab.android = true
            }
            if(!this.formDataIos.ios_file_list.length > 0 && !this.formDataIos.ios_file_list_p12.length > 0){
              this.stateTab.ios = true
            }
            if(!this.formDataIosTest.ios_file_list_test.length > 0 && !this.formDataIosTest.ios_file_list_p12_test.length > 0){
              this.stateTab.ios_test = true
            }
          }
          this.sha1 = res.data.sha1
          this.sha1s = res.data.sha1s
          this.url_link = res.data.url_link
          this.url_link_test = res.data.url_link_test
        }
      })
    },
    downloadUrl(url){
      console.log(url)
      window.location.href=url
    },
    checkDownloadUrl(url){
      console.log(url.length !==0)
      if(url.length !==0){
        return (url.toString().includes('http') || url.toString().includes('https'))?true:false
      }else{
        return false
      }
    }
  },
  created(){
    this.spinning = true
    this.getCertificateInfoFn('all')
  },
  mounted(){

  },
}
</script>

<style scoped lang="less">
  .file-flex{
    display: flex;
  }
  .head-title{
    padding: 0 10px;
    width: calc(100% - 48px);
    height: 44px;
    background: #f5f5f5;
    line-height: 44px;
    margin-left: 35px;
    .end-txt{
     float: right;
    }
  }
  .sha1-box{
    margin-left: 35px;
  }
  .upload-box{
    width: 200px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    position: relative;
    display: flex;
    .uploadfile-box{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      position: relative;
      .uploadfile-btn{
      }
    }
    &:hover{
      .close {
        display: block;
        &:hover {
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
    .uploadfile-title{
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
    .close {
      width: 12px;
      height: 12px;
      position: absolute;
      display: none;
      cursor: pointer;
      right: 106px;
      top: 10px;
      font-size: 16px;
      color: rgba(0,0,0,0.5);
    }
  }
  .upload-box-ml{
    margin-left: 60px;
  }
  .download-icon-box{
    position: absolute;
    bottom: 0px;
    right: -30px;
    .download-icon{
      width: 22px;
      height: 22px;
      font-size: 22px;
      color: #919191;
    }
  }
  .link-title{
    color: rgba(0, 0, 0, 0.85);
  }
  .link-copy{
    height: 32px;
    line-height: 32px;
  }

</style>