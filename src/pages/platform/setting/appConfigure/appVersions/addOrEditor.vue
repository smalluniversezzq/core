<template>
  <div>
    <!-- <a-sping :spinning="spinning"> -->
      <a-card >
        <template slot="title">
          <span @click='jumpTo()' class='cursor-pointer'>
            <byf-icon type='iconfanhui1' style=""></byf-icon>
            返回
          </span>
        </template>
        <div class='preview-box'>
          <a-row>
            <a-col >
              <div class="preview-phone">
                <div class="preview-phone-bg" :style="{backgroundImage: `url(${formData.is_update===1?require('@/assets/img/initContentConfig/popup.png'):require('@/assets/img/initContentConfig/popupTab.png')})`}">
                  <div class='preview-content'>
                    <div class="content-text beauty-scroll">
                      <div class="content-title pb-sm">
                        {{formData.title }}
                      </div>
                      <pre class='txt'>{{formData.content}}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
        <a-form-model
          ref="form"
          :rules="rules"
          :model="formData"
          :label-col="labelCol"
          :validateOnRuleChange="true"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="设备类型" prop="terminal" >
            <a-radio-group v-model="formData.terminal" @change="hanldTerminal">
              <a-radio :value="1"> 安卓 </a-radio>
              <a-radio :value="2"> 苹果 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="版本号" prop="version" help="请输入标准版本号，三段整数，每段最多2位，例如：1.0.22">
            <a-input style="width:100px" v-show="false"  v-model="formData.version" />
            <div class='version-box'>
              <a-input-number :min="1" :max="99" v-model='version.one' style="width:50px" @change="handlechangeVersion"></a-input-number>
              <div class="interval">.</div>
              <a-input-number :min="0"  :max="99" v-model='version.two' style="width:50px" @change="handlechangeVersion"></a-input-number>
              <div class="interval">.</div>
              <a-input-number :min="0" :max="99" v-model='version.three' style="width:50px" @change="handlechangeVersion"></a-input-number>
            </div>
          </a-form-model-item>
          <a-form-model-item class='mt' v-show="formData.terminal==1" label="Versioncode" prop="version_code" help="安卓版本请输入Versioncode，整数，例如：12">
            <a-input-number placeholder="请输入Versioncode" v-model="formData.version_code" :min="0" :precision="0" :style="{width:'calc(30%)'}" />
          </a-form-model-item>
          <a-form-model-item class='mt' label="强制更新" prop="is_update" help="请慎重考虑，如选是，用户不更新无法使用App" >
            <a-radio-group v-model="formData.is_update" >
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="0"> 否 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-show="formData.is_update == 0" class='mt' label="更新提示频率" prop="update_rate" help="" >
            <a-radio-group v-model="formData.update_rate">
              <a-radio :value="0"> 不提示 </a-radio>
              <a-radio :value="1"> 首次提示 </a-radio>
              <a-radio :value="2"> 每次打开APP提示 </a-radio>
              <a-radio :value="3">
                <span>
                  每隔
                  <a-input-number width="150" :min="1" :precision="0" @change='interval' prop="update_interval"  v-model="formData.interval"></a-input-number>  
                  小时提示一次
                </span>  
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="下载地址" prop="download_address" >
            <a-input v-model='formData.download_address' placeholder="请输入下载地址" :style="{width:'calc(30%)'}"></a-input>
          </a-form-model-item>
          <a-form-model-item label="下载方式" prop="download_type" >
            <a-radio-group v-model="formData.download_type">
              <a-radio v-show="formData.terminal==1"  :value="2"> 直接下载 </a-radio>
              <a-radio :value="1"> 跳转下载 </a-radio>
            </a-radio-group>
            <p class="tip">
              <span>苹果不支持直接下载app，苹果更新请配置成跳转至应用分发平台进行下载。</span>
              <br/>
              <span>直接下载：点击链接可直接弹出下载；跳转下载：打开浏览器引导用户下载</span>
            </p>
          </a-form-model-item>
          <a-form-model-item label="标题" prop="title">
            <a-input placeholder="请输入标题" :maxLength='12' :style="{width:'calc(30%)'}" :suffix="setSuffixFn(formData.title,12)"  v-model="formData.title" />
          </a-form-model-item>
          <a-form-model-item class="update-logs-wrap" label="更新说明" help="用于App端提示版本更新时，展示新版本的更新内容，请注意换行，建议每行最多15字" prop="content">
            <a-textarea :rows="4" v-model='formData.content' placeholder="请输入更新说明" :style="{width:'calc(30%)'}"></a-textarea>
          </a-form-model-item>
          <a-form-model-item label="设为当前生效版本" prop="is_effective" >
            <a-radio-group v-model="formData.is_effective">
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="0"> 否 </a-radio>
            </a-radio-group>
            <p class="tip">如选是，此版本会成为当前生效版本，App更新检测以当前生效版本为准</p>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
            <a-space>
              <a-button type="primary" :loading="submitLoading" @click='submit()'>保存</a-button>
            </a-space>
          </a-form-model-item>
        </a-form-model>

      </a-card>
    <!-- </a-sping> -->
  </div>
</template>
<script>
import {PlatformAppVersionAddOrEdit,
  PlatformAppVersionDetail
} from '@/services/platformSetting'
// import { delete } from 'vue/types/umd'
export default {
  data(){
    let update_rate3 = (rule, value, callback) => {
      console.log(rule)
      if(value === 3){
        console.log(this.formData.interval,this.formData.interval>0)
        if(this.formData.interval>0){
          callback()
        }else{
          callback(new Error("选择每隔小时提示不能为空"))
        }
      }else{
        callback()
      }
    }
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 17 },
      id:"",
      spinning:false,
      version:{
        one:"",
        two:"",
        three:"",
      },
      submitLoading:false,
      formData: {
        terminal: 1,
        version: '',
        version_code: '',
        download_type: 2,
        update_rate: 0,
        is_update: 0,
        interval: '',
        download_address: '',
        title:"",
        content: '',
        is_effective: 0
      },
      rules:{
        version:[{ required: true, message: '请输入版本号', trigger: true}],
        version_code:[{ required: true, message: '请输入Versioncode', trigger: 'change'} ],
        is_update:[{ required: true, message: '请输入强制更新', trigger: 'change'} ],
        update_rate:[
          { required: true, message: '请输入更新提示频率', trigger: 'change'},
          { validator: update_rate3, trigger: 'change'}
        ],
        download_address:[{ required: true, message: '请输入下载地址', trigger: 'change'} ],
        download_type:[{ required: true, message: '请输入下载方式', trigger: 'change'} ],
        title:[{ required: true, message: '请输入标题', trigger: 'change'} ],
        content:[{ required: true, message: '请输入更新说明', trigger: 'change'} ],
      }
    }
  },
  methods: {
    submit(){
      this.submitLoading = true
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.formData)
          this.PlatformAppVersionAddOrEditFn()
        } else {
          this.submitLoading = false
          console.log('error submit!!');
          return false;
        }
      });
    },
    PlatformAppVersionAddOrEditFn(){
      PlatformAppVersionAddOrEdit(this.formData).then(res=>{
        if(res.code === 200){
          console.log(res)
          this.submitLoading = false
          this.$message.success(res.msg)
          this.$router.push({
            name:'appVersions',
          })
        }else{
          this.submitLoading = false
        }
      })
    },
    jumpTo(){
      this.$router.push({
        name:"appVersions"
      })
    },
    handlechangeVersion(){
      if(!this.version.one && !this.version.two && !this.version.three){
        this.formData.version = ""
      }else{
        console.log(this.version.two?this.version.two:'0')
        this.formData.version = `${this.version.one?this.version.one:''}.${(this.version.two || this.version.two==0)?this.version.two:''}.${(this.version.three || this.version.three==0)?this.version.three:''}`
      //  this.$refs.form.resetFields();
      }
      this.$refs.form.validateField('version');
    },
    hanldTerminal(e){
      console.log(e.target.value)
      let version_code = [{ required: true, message: '请输入Versioncode', trigger: 'change'} ]
      if(e.target.value==1){
        this.rules.version_code = version_code
      }else if(e.target.value==2){
        delete this.rules.version_code
        this.formData.download_type = 1
      }
    },
    setSuffixFn(value,num){
      // console.log(value)
      if(value){
        return `${value.length}/${num}`
      }else{
        return `0/12`
      } 
    },
    interval(){
      this.$refs.form.validateField('update_rate');
    },
  },
  created(){
    this.id=this.$route.query.id
    if(this.id){
      this.spinning = true
      console.log(this.id)
      PlatformAppVersionDetail({id:this.id}).then(res=>{
        if(res.code === 200){
          console.log(res)
          let versionList = res.data.version.split(".")
          this.version.one = versionList[0]
          this.version.two = versionList[1]
          this.version.three = versionList[2]
          console.log(versionList)
          this.formData = res.data
          if(this.formData.terminal === 2){
            delete this.rules.version_code
          }
          this.spinning = false
        }else{
           this.spinning = false
        }
      })
    }
  },
  
  mounted(){},
}
</script>

<style lang="less" scoped>
.tip{
  color: #a0a0a0;
  font-size: 14px;
  line-height: 20px;
}

.update-logs-wrap{
  overflow: hidden;
  display: block;
  .update-logs{
    float: left;
    width: 90%;
    border: 1px solid #d9d9d9;
    border-bottom: none;
    padding: 0;
    li{
      overflow: hidden;
      border-bottom: 1px solid #d9d9d9;
      div{
        box-sizing: border-box;
        float: left;
        text-align: center;
        font-size: 12px;
        input{
          border: none;
          font-size: 12px;
          margin: 0;
          // height: 100%;
        }
        &.logbtn{
          cursor: pointer;
          font-size: 20px;
        }
        &:nth-of-type(1), &:nth-of-type(2){
          border-right: 1px solid #d9d9d9;
        }
        &:nth-of-type(1){
          width: 20%;
        }
        &:nth-of-type(2){
          width: 70%;
        }
        &:nth-of-type(3){
          width: 10%;
        }
      }
      
    }
  }
  .update-logs-help{
    color: #1890ff;
    font-size: 20px;
    float: left;
    width: 10%;
    text-align: center;
    margin-top: 2px;
  }
}
  .preview-box{
    position: relative;
  }
   .preview-phone{
      position: absolute;
      top: 0px;
      left: 70%;
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
        .preview-content{
          position: absolute;
          top: 235px;
          left: 36px;
          width: 193px;
          height: 125px;
          background: #fff;
          padding:10px;
          .content-title{
            text-align: left;
            font-size: 14px;
            font-weight: 800;
          }
          .pb-sm{
            padding-bottom: 5px;
          }
          .content-text{
            font-size: 10px;
            min-height: 3em;
            max-height: 10em;
            width: 100%;
            overflow-y: auto;
            .txt{
              white-space: pre-wrap; /*css-3*/ 
              white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
              white-space: -pre-wrap; /*Opera4-6*/ 
              white-space: -o-pre-wrap; /*Opera7*/ 
              word-wrap: break-word; /*InternetExplorer5.5+*/ 

            }
          }
        }
      }
    }
    .cursor-pointer{
      cursor:pointer;
    }
</style>
<style lang="less">
  .version-box{
    display:flex;
    flex-wrap: wrap;
    .interval{
      width: 22px;
      height: 32px;
      text-align: center;
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;

    }
  }
</style>