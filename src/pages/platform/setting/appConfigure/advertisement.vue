<!-- // App打包 -->
<template>
  <div>
    <div class='preview-box'></div>
    <a-card title="闪屏广告" class="advertisement ">
      <a-spin :spinning="spining" >
        <a-form-model
          ref="form"
          :model="formData"
          :rules="rules"
          :label-col="labelCol" 
          :wrapper-col="wrapperCol"
          >
          <a-form-model-item  label="功能开关" prop="platform_screen_adv_status">
            <a-radio-group :options="fnSwitchOptions" v-model="formData.platform_screen_adv_status"/>
          </a-form-model-item>
          <a-form-model-item :help="picInfo.android" label="安卓图片" prop="platform_screen_adv_android_pic">
            <byf-upload-btn @change="handlechangeAndroid" :imgsList="[formData.platform_screen_adv_android_pic]">
            </byf-upload-btn>
          </a-form-model-item>
          <a-form-model-item class="mt" :help="picInfo.ios" label="苹果图片" prop="platform_screen_adv_ios_pic">
            <byf-upload-btn @change="handlechangeIos" :imgsList="[formData.platform_screen_adv_ios_pic]">
            </byf-upload-btn>
          </a-form-model-item>
          <a-form-model-item class="mt skip-row" label="跳过样式" > 
            <a-row class='skip-content'>
              <a-col class="skip-box">
                <div :class="formData.platform_screen_adv_skip_style == 1?'skip-border border-checked':'skip-border'" @click="setSkip(1)">
                  <div class="skip1"  >
                    <img :src="skip[0]" alt="">
                  </div>
                </div>
                <div :class="formData.platform_screen_adv_skip_style == 2?'skip-border border-checked':'skip-border'" @click="setSkip(2)">
                  <div class="skip1 " >
                    <img :src="skip[1]" alt="">
                  </div>
                </div>
                <div :class="formData.platform_screen_adv_skip_style == 3?'skip-border border-checked':'skip-border'"  @click="setSkip(3)">
                  <div class="skip3 ">
                    <img :src="skip[2]" alt="">
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item class="mt" label="跳过位置" prop="platform_screen_adv_skip_position">
            <a-button :type="formData.platform_screen_adv_skip_position==1?'primary':'default'"  @click="handleChangePosition(1)">右上</a-button>
            <a-button class='ml' :type="formData.platform_screen_adv_skip_position==2?'primary':'default'"  @click="handleChangePosition(2)" >右下</a-button>
          </a-form-model-item>
          <a-form-model-item v-show='false' class="mt" label="跳过文字" prop="platform_screen_adv_skip_text">
            <a-input style="width:200px" :maxLength="3" v-model="formData.platform_screen_adv_skip_text" placeholder="请输入跳过文字"></a-input >
          </a-form-model-item>
          <div style='overflow: hidden; height:83px'>
            <a-form-model-item class="mt" style='margin-button:24px' label="跳过时间" prop="platform_screen_adv_skip_time">
              <div class='unit-box'>
                <a-input-number 
                  :min="3" 
                  :max="5" 
                  :precision="0" 
                  v-model="formData.platform_screen_adv_skip_time" 
                  placeholder="请输入跳过时间" 
                ></a-input-number> 
                  <div class="unit">
                    秒
                  </div>
              </div>
            </a-form-model-item>
          </div>
          <a-form-model-item class="" label="跳过链接" >
            <!-- <a-input style="width:200px" v-model="formData.platform_screen_adv_skip_url"  ></a-input> -->
            <link-selector-input  style="width:200px" :links="toParse()" @confirm="changeLinkSelect" >
            </link-selector-input>
          </a-form-model-item>
        </a-form-model>
        <a-row>
          <a-col >
            <div class="preview-phone" :style="{backgroundImage: `url(${require('@/assets/img/platformSetting/phone-bg.png')})`}">
              <div class="preview-phone-bg" :style="{backgroundImage: `url(${require('@/assets/img/initContentConfig/style1.png')})`}">
                <div class="preview-phone-btn" v-if="formData.platform_screen_adv_skip_style == 1" :style="{backgroundImage: `url(${require('@/assets/img/initContentConfig/skip1.png')})` ,top:`${formData.platform_screen_adv_skip_position == 2?'555px':'40px'}`}">
                </div>
                <div class="preview-phone-btn" v-if="formData.platform_screen_adv_skip_style == 2" :style="{backgroundImage: `url(${require('@/assets/img/initContentConfig/skip2.png')})`,top:`${formData.platform_screen_adv_skip_position == 2?'555px':'40px'}`}">
                </div>
                <div class="preview-phone-btn3" v-if="formData.platform_screen_adv_skip_style == 3" :style="{backgroundImage: `url(${require('@/assets/img/initContentConfig/skip3.png')})` ,top:`${formData.platform_screen_adv_skip_position == 2?'555px':'40px'}`}">
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row >
          <a-col offset="2" class='mb'>
            <a-button @click="platformConfigSet" type='primary' :loading="saveLoading">保存</a-button>
          </a-col>
        </a-row>
      </a-spin>
      <a-modal :maskClosable="false" width="60%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
        <a-form-model :label-col="labelCol"
        :wrapper-col="wrapperCol">
          <a-form-model-item v-for="(item, index) in saveResult" :key="index" :label="item.title" v-show="!item.success">
            {{item.msg}}
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
</div>
</template>
<script>
// const skipUrl = window.location.origin=="http://localhost:8080"?'https://byf-web.bangyaosoft.cn/web/core/static/img/skip/':window.location.origin+'/web/core/static/img/skip/'
// import mixin from '@/pages/platform/setting/mixin/index'
// import ByfInputNumber from '@/components/byf/input/ByfInputNumber'
import linkSelectorInput from '@/components/byf/linkSelector/linkSelectorInput'
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
export default {
  // mixins: [mixin],
  components:{
    linkSelectorInput,
    // ByfInputNumber
  },
  data(){
    return {
      staticUrl:"",
      spining:false,
      saveLoading:false,
      saveResult: [],
      resultModalVisible: false,
      formModelSpinning: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      skip:[
        require("@/assets/img/initContentConfig/skip1.png"),
        require("@/assets/img/initContentConfig/skip2.png"),
        require("@/assets/img/initContentConfig/skip3.png"),
      ],
      skipImg:[
        "/web/core/static/img/default/skip1.png",
        "/web/core/static/img/default/skip2.png",
        "/web/core/static/img/default/skip3.png",
      ],
      rules:{
        platform_screen_adv_status: [
          { required: true, message: '功能开关不能为空'},
        ],
        platform_screen_adv_android_pic: [
          { required: true, message: '必须上传一张安卓图片',trigger: 'change'},
        ],
        platform_screen_adv_ios_pic: [
          { required: true, message: '必须上传一张苹果图片' ,trigger: 'change'},
        ],
        platform_screen_adv_skip_text:[
          { required: true, message: '必须填写跳过文字' ,trigger: 'change'},
        ],
        platform_screen_adv_skip_time:[
          { required: true, message: '必须填写跳过时间' ,trigger: 'change'},
        ],
        // platform_screen_adv_skip_url:[
        //   { required: true, message: '必须填写跳过链接' ,trigger: 'change'},
        // ]
      },
      keyOfValue:{
        platform_screen_adv_android_pic: '安卓图片不能为空',
        platform_screen_adv_ios_pic: '苹果图片不能为空',
        platform_screen_adv_skip_position: '跳过位置不能为空',
        platform_screen_adv_skip_style: '跳过位置不能为空',
        platform_screen_adv_skip_text: '跳过文字不能为空',
        platform_screen_adv_skip_time: '跳过时间不能为空',
        platform_screen_adv_skip_url: '跳过链不能为空',
        platform_screen_adv_status:"功能开关不能为空"
      },
      fnSwitchOptions: [
        {label: '开启', value: '1'},
        {label: '关闭', value: '0'},
      ],
      formData:{
        platform_screen_adv_status:"1",
        platform_screen_adv_skip_position:"2",
        platform_screen_adv_skip_style:1,
        platform_screen_adv_skip_text:"跳过",
        platform_screen_adv_skip_time:3,
        platform_screen_adv_skip_url:'[]',
        platform_screen_adv_android_pic:"",
        platform_screen_adv_ios_pic:"",
        platform_screen_adv_skip_image:"",
      },
      picInfo:{
        android:"说明：请上传1080*1920尺寸的广告图，其他尺寸会导致显示变形",
        ios:"说明：请上传1125*2436尺寸的广告图，其他尺寸会导致显示变形"
      },
    }
  },
  created() {
    this.doPlatformConfigGet();
    this.staticUrl = localStorage.getItem("driveHost")
  },
  methods:{
    platformConfigGet,
    handleChangePosition(val){
      this.formData.platform_screen_adv_skip_position = val
    },
    handlechangeAndroid(value){
      console.log(value)
      this.formData.platform_screen_adv_android_pic = value[0]
    },
    handlechangeIos(value){
      console.log(value)
      this.formData.platform_screen_adv_ios_pic = value[0]
    },
    setSkip(type){
      console.log(type,this.skipImg[(type-1)])
      this.formData.platform_screen_adv_skip_style = type
      this.formData.platform_screen_adv_skip_image = this.skipImg[(type-1)]
    },
    changeLinkSelect(e){
      console.log(e,"changeLinkSelect")
      this.formData.platform_screen_adv_skip_url = JSON.stringify(e)
      console.log(this.formData.platform_screen_adv_skip_url)
    },
    toParse(){
      let parseObj = JSON.parse(this.formData.platform_screen_adv_skip_url || "[]")
      console.log(parseObj)
      return parseObj
    },
    doPlatformConfigGet(){
      let config = [];
      for(let k in this.formData){
        config.push(k)
      }
      this.formModelSpinning = true;
      this.platformConfigGet({config}).then(res => {
        if(res.code == 200){
          for(let k in res.data.config){
            this.formData[k] = res.data.config[k]
          }
          console.log(this.formData)
          // 在获取配置后做一些事情
          typeof this.afterGetConfig == 'function' && this.afterGetConfig();
        }
      }).finally(() => {
        this.formModelSpinning = false;
      });
    },
    platformConfigSet(){
      // 在提交前做一些事情
      typeof this.beforeGetConfig == 'function' && this.beforeGetConfig();
      this.$refs.form.validate(valid => {
        if(valid){
          this.saveLoading = true;
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
        }
      })
      
    }
  }
}
</script>

<style scoped lang='less'>
  .advertisement{
    .skip-content{
      .skip-box{
        display: flex;
        flex-wrap: wrap;
        .skip-border{
          width: 100px;
          height:100px;
          border: 1px solid rgba(0,0,0,0);
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          line-height: 0px;
          margin-top: -33px;
          .skip1{
            width:67px;
            height: 21px;
            img{
              width: 100%;
            }
          }
          .skip3{
            width:40px;
            height: 21px;
            margin-top: -20px;
            img{
              width: 100%;
            }
          }
        }
        .border-checked{
          border: 1px solid @primary-color;
        }
      }
    }

    .preview-box{
      position: relative;
    }
    .preview-phone{
      position: absolute;
      bottom: 20%;
      left: 60%;
      width: 300px;
      height: 640px;
      z-index: 999;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 100%;
      .preview-phone-bg{
        width: 265px;
        height: 550px;
        position: absolute;
        z-index: 1000;
        top: 15px;
        right: 18px;
        background-size: 94%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        .preview-phone-btn{
          width: 67px;
          height: 28px;
          position: absolute;
          z-index: 1001;
          top: 90px;
          right: 17px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: 50% 50%;
        }
        .preview-phone-btn3{
           width:40px;
          height: 40px;
          position: absolute;
          z-index: 1001;
          top: 90px;
          right: 17px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: 50% 50%;
        }
      }
    }
  } 
  .skip-row{
    margin-top: 40px;
  }
  .unit-box{
    display: flex;

  }
  .unit{
    padding: 0 10px;
    background: #fff;
    border: 1px solid #d9d9d9 ;
    border-left: none;
    height: 32px;
    border-radius: 2px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    line-height: 30px;
    font-size: 14px;
    background: #fafafa;
    text-align: center;
  }

</style>
<style lang="less">
  .unit-box{
    .ant-input-number-handler-wrap{
      display: none;
    }
  }
</style>