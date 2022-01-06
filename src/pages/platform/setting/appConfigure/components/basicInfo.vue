<!-- // 基本信息 -->
<template>
  <div>
    <a-spin :spinning="spinning">
      <a-form-model
        ref="form"
        :rules="rules"
        :model="formData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item class="mt" label="安卓图标" prop="platform_android_icon" >
          <byf-upload-btn 
            @change="(res,data,info,imgInfo)=>{changeImg(res,'platform_android_icon',imgInfo)}"
            :imgsList="[formData.platform_android_icon]"
            :format="['png']"
            >
           </byf-upload-btn>
        </a-form-model-item>
        <a-row>
          <a-col offset="2">
            <div class="help">上传200*200px的PNG格式图标，图标圆角可根据自己情况调整</div>
          </a-col>
        </a-row>
        <a-form-model-item class="mt" label="苹果图标" prop="platform_ios_icon" >
          <byf-upload-btn 
            @change="(res,data,info,imgInfo)=>{changeImg(res,'platform_ios_icon',imgInfo)}"
             :format="['png']"
            :imgsList="[formData.platform_ios_icon]"
            >
          </byf-upload-btn>
        </a-form-model-item>
        <a-row>
          <a-col offset="2">
            <div class="help">上传1024*1024px的PNG格式图标，必须是直角且不带透明度</div>
          </a-col>
        </a-row>
        <a-form-model-item class="mt" label="苹果启动图" prop="ios_start_up_image">
          <byf-upload-btn 
            @change="(res,data,info,imgInfo)=>{changeImg(res,'ios_start_up_image',imgInfo)}"
            :imgsList="[formData.ios_start_up_image]"
            :format="['png']"
          >
          </byf-upload-btn>
        </a-form-model-item>
        <a-row>
          <a-col offset="2">
            <div class="help"><span style="color:red">*</span>必传尺寸1125*2436px的PNG格式图片</div>
          </a-col>
        </a-row>
          <a-row class='mt' >
            <a-col class='flex-dis' offset="2">
              <a-form-model-item    
                :labelCol="{span: 0}"
                :wrapperCol="{span: 24}" 
                class="mt"  
                prop="ios_start_up_image_small">
                <byf-upload-btn 
                  @change="(res,data,info,imgInfo)=>{changeImg(res,'ios_start_up_image_small',imgInfo)}"
                  :imgsList="[formData.ios_start_up_image_small]"
                  :format="['png']"
                >
                </byf-upload-btn>
              </a-form-model-item>
              <span class="ml helps">(选传)</span>
            </a-col>
            <a-col offset="2" class='mt-sm pl help'>
              750*1334
            </a-col>
            <a-col offset="2" class='mt-sm helps ' >
              上传更多尺寸，可以保证启动图在更多手机上适配
            </a-col>
        </a-row>
        <!-- 安卓启动图 -->
        <a-form-model-item class="mt" label="安卓启动图" prop="android_start_up_image">
          <byf-upload-btn 
            @change="(res,data,info,imgInfo)=>{changeImg(res,'android_start_up_image',imgInfo)}"
            :imgsList="[formData.android_start_up_image]"
            :format="['png']"
          >
          </byf-upload-btn>
        </a-form-model-item>
          <a-row>
            <a-col offset="2">
              <div class="help"><span style="color:red">*</span>必传尺寸876*1860px的PNG格式图片</div>
            </a-col>
          </a-row>
        <a-row class='mt' >
          <a-col offset="2" span="3" class='relateves' >
            <a-form-model-item    
              :labelCol="{span: 0}"
              :wrapperCol="{span: 24}" 
              class="mt"  
              prop="android_start_up_image_small">
              <byf-upload-btn 
                @change="(res,data,info,imgInfo)=>{changeImg(res,'android_start_up_image_small',imgInfo)}"
                :imgsList="[formData.android_start_up_image_small]"
                :format="['png']"
              >
              </byf-upload-btn>
            </a-form-model-item>
            <div class='mt-sm ml helps'>438*930</div>
            <div class='absolutes location helps'>
              (选传)
            </div>
          </a-col>
          <a-col offset="2" span="3" class='relateves' >
            <a-form-model-item    
              :labelCol="{span: 0}"
              :wrapperCol="{span: 24}" 
              class="mt"  
              prop="android_start_up_image_alternative">
              <byf-upload-btn 
                @change="(res,data,info,imgInfo)=>{changeImg(res,'android_start_up_image_alternative',imgInfo)}"
                :imgsList="[formData.android_start_up_image_alternative]"
                :format="['png']"
              >
              </byf-upload-btn>
            </a-form-model-item>
            <div class='mt-sm ml helps'>584*1242</div>
            <div class='absolutes location helps'>
              (选传)
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col offset="2" class='mt-sm helps ' >
            上传更多尺寸，可以保证启动图在更多手机上适配
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
    <a-row >
      <a-col offset="2" class='mt'>
        <a-button type="primary" @click="submit()">保存</a-button>
      </a-col>
      <a-col offset="2" class='mt'>
        <div class="help ">
          <span style="color:#f5222d">注意：启动图上的重要内容尽量放到图片中间，不要靠近图片边沿，以免在个别手机上显示不全。</span>
        </div>
      </a-col>
    </a-row>
    <div class='preview-box'>
      <a-row>
        <a-col >
          <div class="preview-phone" :style="{backgroundImage: `url(${require('@/assets/img/platformSetting/phone-bg.png')})`}">
            <div class="preview-phone-bg" >
              <img :src="formData.ios_start_up_image" alt="">
            </div>
            <div class='tac'> 苹果启动图</div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class='preview-box'>
      <a-row>
        <a-col >
          <div class="preview-phone1" :style="{backgroundImage: `url(${require('@/assets/img/platformSetting/phone-bg.png')})`}">
            <div class="preview-phone-bg" >
              <img :src="formData.android_start_up_image" alt="">
            </div>
            <div class='tac'> 安卓启动图</div>
          </div>
        </a-col>
      </a-row>
     
    </div>
  </div>
</template>

<script>
// PlatformConfigSet
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
export default {
  data(){
    let androidRules = (rule, value, callback) => {
      if (this.verification.platform_android_icon === false) {
        callback(new Error('图片尺寸错误，请重新上传200*200px尺寸的图标'));
      } else {
        callback();
      }
    }
    let iosRules = (rule, value, callback) => {
      if (this.verification.platform_ios_icon === false) {
        callback(new Error('图片尺寸错误，请重新上传1024*1024px尺寸的图标'));
      } else {
        callback();
      }
    }
    let iosStart = (rule, value, callback) => {
      console.log(this.formData.ios_start_up_image,'ios_start_up_image')
      if(!this.formData.ios_start_up_image){
        this.mustcheckIos = true
        callback(new Error('苹果启动图不能为空'));
      }else if (this.verification.ios_start_up_image === false) {
        this.mustcheckIos = false
        callback(new Error('图片尺寸错误，请重新上传1125*2436px尺寸的图片'));
      } else {
        this.mustcheckIos = false
        callback();
      }
    }
    let iosStartSmll = (rule, value, callback) => {
      if (this.verification.ios_start_up_image_small === false) {
        callback(new Error('图片尺寸错误，请重新上传750*1334px尺寸的图片'));
      } else {
        callback();
      }
    }
    let androidStart = (rule, value, callback) => {
      if(!this.formData.android_start_up_image){
        this.mustcheckAndroid = true
        console.log('1231231',this.mustcheckAndroid)
        callback(new Error('安卓启动图不能为空'));
      }else if(this.verification.android_start_up_image === false) {
        this.mustcheckAndroid = false
        callback(new Error('图片尺寸错误，请重新上传876*1860px尺寸的图片'));
      } else {
        this.mustcheckAndroid = false
        callback();
      }
        console.log('6666',this.mustcheckAndroid)
      
    }
    let androidStartSmll = (rule, value, callback) => {
      if (this.verification.android_start_up_image_small === false) {
        callback(new Error('图片尺寸错误，请重新上传438*930px尺寸的图片'));
      } else {
        callback();
      }
    }
    let androidStartSmllAlternative = (rule, value, callback) => {
      if (this.verification.android_start_up_image_alternative === false) {
        callback(new Error('图片尺寸错误，请重新上传584*1242px尺寸的图片'));
      } else {
        callback();
      }
    }
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      spinning:false,
      saveLoading:false,
      mustcheckIos:false,
      mustcheckAndroid:false,
      formData:{
        platform_android_icon:'',
        platform_ios_icon:'',
        ios_start_up_image:'',
        ios_start_up_image_small:"",
        android_start_up_image:"",
        android_start_up_image_small:"",
        android_start_up_image_alternative:"",
      },
      verification:{
        platform_android_icon:null,
        platform_ios_icon:null,
        ios_start_up_image:null,
        ios_start_up_image_small:null,
        android_start_up_image:null,
        android_start_up_image_small:null,
        android_start_up_image_alternative:null,
      },
      errorMsg:{
        platform_android_icon:"安卓图标",
        platform_ios_icon:'苹果图标',
        ios_start_up_image:"苹果启动图",
        ios_start_up_image_small:"苹果启动图选传",
        android_start_up_image:"安卓启动图",
        android_start_up_image_small:"安卓启动图选传438*930",
        android_start_up_image_alternative:"安卓启动图选传584*1242",
      },
      rules:{
        platform_android_icon:[
          { validator: androidRules, trigger: 'change' }
        ],
        platform_ios_icon:[
          { validator: iosRules, trigger: 'change' }
        ],
        ios_start_up_image:[
          { validator: iosStart, trigger: 'change' }
        ],
        ios_start_up_image_small:[
          { validator: iosStartSmll, trigger: 'change' }
        ],
        android_start_up_image:[
          { validator: androidStart, trigger: 'change' }
        ],
        android_start_up_image_small:[
          { validator: androidStartSmll, trigger: 'change' }
        ],
        android_start_up_image_alternative:[
          { validator: androidStartSmllAlternative, trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    platformConfigGet,
    changeImg(icon,info,imgInfo){
      console.log(icon,'icon',imgInfo)
      this.formData[info] = icon[0]
      if(imgInfo){
        if(info == 'platform_android_icon'){
          if(imgInfo.selectedImgs[0].extend.width === 200 && imgInfo.selectedImgs[0].extend.height === 200){
            this.verification.platform_android_icon = true
          }else{
            this.verification.platform_android_icon = false
          }
        }else if(info == 'platform_ios_icon'){
          if(imgInfo.selectedImgs[0].extend.width === 1024 && imgInfo.selectedImgs[0].extend.height === 1024){
            this.verification.platform_ios_icon = true
          }else{
            this.verification.platform_ios_icon = false
          }
        }else if(info == 'ios_start_up_image'){
          if(imgInfo.selectedImgs[0].extend.width === 1125 && imgInfo.selectedImgs[0].extend.height === 2436){
            this.verification.ios_start_up_image = true
          }else{
            this.verification.ios_start_up_image = false
          }
        }else if(info == 'ios_start_up_image_small'){
          console.log("ios_start_up_image_small")
          if(imgInfo.selectedImgs[0].extend.width === 750 && imgInfo.selectedImgs[0].extend.height === 1334){
            this.verification.ios_start_up_image_small = true
          }else{
            this.verification.ios_start_up_image_small = false
          }
        }else if(info == 'android_start_up_image'){
          console.log("android_start_up_image")
          if(imgInfo.selectedImgs[0].extend.width === 876 && imgInfo.selectedImgs[0].extend.height === 1860){
            this.verification.android_start_up_image = true
          }else{
            this.verification.android_start_up_image = false
          }
        }else if(info == 'android_start_up_image_small'){
          console.log("android_start_up_image_small")
          if(imgInfo.selectedImgs[0].extend.width === 438 && imgInfo.selectedImgs[0].extend.height === 930){
            this.verification.android_start_up_image_small = true
          }else{
            this.verification.android_start_up_image_small = false
          }
        }else if(info == 'android_start_up_image_alternative'){
          console.log("android_start_up_image_alternative")
          if(imgInfo.selectedImgs[0].extend.width === 584 && imgInfo.selectedImgs[0].extend.height === 1242){
            this.verification.android_start_up_image_alternative = true
          }else{
            this.verification.android_start_up_image_alternative = false
          }
        }
      }else{
        console.log('删除了')
        if(info == 'ios_start_up_image'){
          this.mustcheckIos = true
        }
        if(info == 'android_start_up_image'){
          this.mustcheckAndroid = true
        }
        this.verification[info] = null
      }
    },
    
    submit(){
      let _this = this
      _this.saveLoading = true
      Object.keys(_this.formData).forEach((item)=>{
        if(!_this.formData[item]){
          _this.formData[item]= null
        }
      })
      _this.$refs.form.validate(valid => {
        if (valid) {
          typeof _this.beforeGetConfig == 'function' && _this.beforeGetConfig();
          platformConfigSet(_this.formData).then(res => {
            if(res.code == 200){
              let status = true;
              _this.saveResult = [];
              let result = res.data.result;
              for(let k in _this.keyOfValue){
                _this.saveResult.push({
                  ...result[k],
                  key: k,
                  title: _this.keyOfValue[k]
                })
                if(result[k].success == false){
                  status = false
                }
              }
              if(!status){
                _this.resultModalVisible = true;
              }else{
                _this.$message.success(res.msg)
              }
              
            }
          }).finally(() => {
            _this.saveLoading = false;
          });
        } else {
          console.log('111',this.mustcheckIos,this.mustcheckAndroid)
          if(this.mustcheckIos == false && this.mustcheckAndroid == false){
            let errorImg = []
            Object.keys(_this.verification).forEach((item,index,value)=>{
              console.log(item,index,value,_this.verification[item])
              if(_this.verification[item]==false){
                errorImg.push(_this.errorMsg[item])
              }
            })
            console.log(errorImg)
            let errorMsg = `${errorImg.join("、")},图片尺寸不合规是否继续上传`
            _this.$confirm({
              title: '警告',
              content: errorMsg,
              okText:"确认",
              cancelText:"取消",
              onOk() {
                typeof _this.beforeGetConfig == 'function' && _this.beforeGetConfig();
                platformConfigSet(_this.formData).then(res => {
                  if(res.code == 200){
                    let status = true;
                    _this.saveResult = [];
                    let result = res.data.result;
                    for(let k in _this.keyOfValue){
                      _this.saveResult.push({
                        ...result[k],
                        key: k,
                        title: _this.keyOfValue[k]
                      })
                      if(result[k].success == false){
                        status = false
                      }
                    }
                    if(!status){
                      _this.resultModalVisible = true;
                    }else{
                      _this.$message.success(res.msg)
                    }
                  }
                }).finally(() => {
                  _this.saveLoading = false;
                });
              },
              onCancel() {
              //  return false;
              },
              class: 'test',
            });
          }else{
            console.log('不能上传')
          }
        }
      })
    },
  
  
    getBasicInfoFn(){
      let config = [];
      for(let k in this.formData){
        config.push(k)
      }
      this.platformConfigGet({config}).then(res => {
        if(res.code == 200){
          for(let k in res.data.config){
            this.formData[k] = res.data.config[k]
          }
          console.log(this.formData)
          // 在获取配置后做一些事情
          typeof this.afterGetConfig == 'function' && this.afterGetConfig();
          this.spinning = false
        }else{
          this.spinning = false
        }
      }).finally(() => {

      });
    },
  },
  created(){
    this.spinning = true
    this.getBasicInfoFn()
  },
  mounted(){},
}
</script>

<style scoped lang="less">
  .help{
    min-height: 22px;
    margin-top: -2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.5;
  }
  .helps{
    min-height: 22px;
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.5;
  }
  .preview-box{
    position:relative;
  }
  .relateves{
    position: relative;
  }
  .absolutes{
    position: absolute;
  }
  .location{
    left: 120px;
    top: 50px;
    width: 40px;
  }
  .flex-dis{
    display: flex;
    align-items: center;
  }
  .preview-phone{
    position: absolute;
    bottom: 200px;
    left: 77%;
    width: 300px;
    height: 640px;
    z-index: 999;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 90%;
    .preview-phone-bg{
      width: 228px;
      height: 500px;
      position: absolute;
      z-index: 1000;
      top: 74px;
      right: 36px;
      img{
        width: 100%;
      }

    }
  }
.preview-phone1{
    position: absolute;
    bottom: 200px;
    left: calc(77% + -300px);
    width: 300px;
    height: 640px;
    z-index: 999;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 90%;
    .preview-phone-bg{
      width: 228px;
      height: 500px;
      position: absolute;
      z-index: 1000;
      top: 74px;
      right: 36px;
      img{
        width: 100%;
      }

    }
  }
</style>