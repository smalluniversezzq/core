<template>
  <div>
    <a-spin :spinning="Spinning">
      <div class='preview-box'>
        <a-row>
          <a-col >
            <div class="preview-phone" >
              <div class="preview-phone-bg" :style="{backgroundImage: `url(${require('@/assets/img/initContentConfig/bg-popup.png')})`}">
                <div class="img-box">
                  <img :src="formData.platform_update_head_image" alt="">
                </div>
                <div class="btn-box">
                  <div class='btn-left' :style="{color:formData.platform_update_color , border: '1px solid '+formData.platform_update_color }" >
                    残忍拒绝
                  </div>
                  <div class='btn-right' :style="{background:formData.platform_update_color}">
                    立即升级
                  </div>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
        <div class='preview-box'>
          <a-row>
            <a-col >
              <!-- :style="{backgroundImage: `url(${require('@/assets/img/platformSetting/phone-bg.png')})`}" -->
              <div class="preview-phone1" >
                <div class="preview-phone-bg" :style="{backgroundImage: `url(${require('@/assets/img/initContentConfig/bg-popup.png')})`}">
                  <div class="img-box">
                    <img :src="formData.platform_force_update_head_image" alt="">
                  </div>
                  <div class="btn-box">
                    <div class='btn-right1' :style="{background:formData.platform_force_update_color}">
                      立即升级
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
    <a-form-model
      ref="form"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="非强制更新" help=""
       style="margin:68px 0px 0px 0px" 
      >
        <div class="bg pt pb pl" :style="{width:'calc(60%)'}">
          <a-form-model-item
            :labelCol="{span: 3}"
            :wrapperCol="{span: 17}"
            label="头部背景">
            <byf-upload-btn
            info="platform_update_head_image"
            :imgsList="[formData.platform_update_head_image]"
              @change="changeOfOpenImgAll" 
            ></byf-upload-btn>
            <div class="help">
              建议尺寸584*322,PNG,JPG格式
            </div>
          </a-form-model-item>

          <a-form-model-item label="按钮">
            <byf-color-btn
              :defaultValue="'FD5905'"
              :widgetData="widgetData.platform_update_color"
              @change="changeColor"
              :info="'platform_update_color'"
            >
            </byf-color-btn>
          </a-form-model-item>
        </div>

      </a-form-model-item>
      <a-form-model-item 
        style="margin:45px 0px 0px 0px" 
        label="强制更新" >
        <div class="bg pt pb pl" :style="{width:'calc(60%)'}">
          <a-form-model-item      
            :labelCol="{span: 3}"
            :wrapperCol="{span: 17}"
            label="头部背景">
            <byf-upload-btn
             info="platform_force_update_head_image"
            :imgsList="[formData.platform_force_update_head_image]"
              @change="changeOfOpenImgAll" 
            ></byf-upload-btn>
            <div class="help">
              建议尺寸584*322,PNG,JPG格式
            </div>
          </a-form-model-item>
          <a-form-model-item label="按钮">
            <byf-color-btn
              :defaultValue="'FD5905'"
              :widgetData="widgetData.platform_force_update_color"
              @change="changeColor"
              :info="'platform_force_update_color'"
            >
            </byf-color-btn>
          </a-form-model-item>
        </div>

      </a-form-model-item>
    </a-form-model>
    <a-row>
      <a-col offset="2" class='mt'>
        <a-button  @click="submit()" :loading="submitLoading" type="primary">保存</a-button>
      </a-col>
    </a-row>
    </a-spin>
  </div>
</template>

<script>
import ByfColorBtn from '@/components/byf/button/ByfColorBtn.vue'
import {
  platformConfigSet,
  platformConfigGet
} from '@/services/platformSetting'
export default {
  components:{
    ByfColorBtn
  },
  data() {
    return {
      staticUrl:"",
      labelCol: { span: 2 },
      wrapperCol: { span: 17 },
      submitLoading:false,
      Spinning:false,
      isPach:{
        force_update_type:"",
        update_type:"",
        platform_update_head_image:"",
        platform_force_update_head_image:"",
      },
      formData: {
        platform_update_head_image:"",
        platform_update_color:"rgba(253,89,5,1)",
        platform_force_update_head_image:"",
        platform_force_update_color:"rgba(253,89,5,1)",
      },
      formDatas: {
        platform_update_head_image:"",
        platform_update_color:"rgba(253,89,5,1)",
        platform_force_update_head_image:"",
        platform_force_update_color:"rgba(253,89,5,1)",
      },
      widgetData:{
        platform_force_update_color:{
          value:"rgba(253,89,5,1)",
          hexValue:""
        },
        platform_update_color:{
          value:"rgba(253,89,5,1)",
          hexValue:""
        },
      },
    };
  },
  methods: {
    submit(){
      this.submitLoading = true
      console.log(this.formData,'formData')
      if(!this.formData.platform_update_head_image){
        this.formData.platform_update_head_image = ""
      }
      if(!this.formData.platform_force_update_head_image){
        this.formData.platform_force_update_head_image = ""
      }
      if(this.isPach.force_update_type == true){
        this.formDatas.platform_force_update_head_image = this.isPach.platform_force_update_head_image
        this.formDatas.platform_force_update_color = this.formData.platform_force_update_color
      }else{
       for(let k in this.formDatas){
         this.formDatas[k]= this.formData[k]
       }
      }
      if(this.isPach.update_type == true){
       this.formDatas.platform_update_head_image = this.isPach.platform_update_head_image
       this.formDatas.platform_update_color = this.formData.platform_update_color
      }else{
        for(let k in this.formDatas){
          this.formDatas[k]= this.formData[k]
        }
      }
      console.log(this.formDatas,'this.formData')
      platformConfigSet(this.formDatas).then(res=>{
        if(res.code === 200){
          console.log(res)
          this.$message.success(res.msg)
          this.submitLoading = false
        }else{
          this.submitLoading = false
        }
      })
      console.log(this.formData)
    },
    platformConfigGet(){
      this.Spinning = true
        let config = [];
        for(let k in this.formData){
          config.push(k)
        }
      platformConfigGet({config}).then(res=>{
        if(res.code === 200){
          console.log(res)
          for(let k in res.data.config){
            this.formData[k] = res.data.config[k]
          }
          console.log(this.formData)
          this.isAbsolutePath(this.formData.platform_force_update_head_image).then(()=>{
            this.isPach.platform_force_update_head_image = this.formData.platform_force_update_head_image
            this.isPach.force_update_type = true
            this.formData.platform_force_update_head_image = this.staticUrl+this.formData.platform_force_update_head_image
   
          }).catch(()=>{
            this.isPach.force_update_type = false
            console.log('绝对路径')
          })
          this.isAbsolutePath(this.formData.platform_update_head_image).then(()=>{
            this.isPach.platform_update_head_image = this.formData.platform_update_head_image
            this.isPach.update_type = true
            this.formData.platform_update_head_image = this.staticUrl+this.formData.platform_update_head_image
          }).catch(()=>{
            this.isPach.update_type = false
            console.log('绝对路径')
          })
          this.towidgetData()
          this.Spinning = false
        }else{
          this.Spinning = false
        }
      })
    },
    isAbsolutePath(data){
      return new Promise((resolve, reject)=>{
        if(data.indexOf("http")==-1 || data.indexOf("https")==-1){
          resolve()
        }else{
          reject()
        }
      })
    },
    changeColor(value, info) {
      console.log(value, info);
      this.formData[info] = value
      console.log(this.formData[info],"changeColor")
    },
    changeOfOpenImgAll(e,arrObj,info){
      console.log(e,info,"changeOfOpenImgAll",arrObj)
      if(info == 'platform_force_update_head_image'){
        this.isPach.force_update_type = false
      }
      if(info == 'platform_update_head_image'){
        this.isPach.update_type = false
      }
      this.formData[info] = e[0]
    }, 
    //设置默认色
    towidgetData(){
      const widgetDataArr = ["platform_force_update_color","platform_update_color"]
      widgetDataArr.forEach(item=>{
        console.log(item)
        this.widgetData[item].value = this.formData[item]
        this.widgetData[item].hexValue = this.setParseToHex(this.formData[item])
      })
      console.log(this.widgetData,"widgetData")
    }, 
    setParseToHex(value){
      let rgba = this.parseToHexs(value)
      console.log(rgba,"setParseToHex")
      return rgba
    },  
        /**
   * rgba 转成 8位16进制色值
   * @param {string} color rgba格式的字符串
   * @param {int} bit 8：8位16进制；6:6位16进制。
   */
    parseToHexs(color, bit = 6){
      var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
      var a = parseFloat(values[3] || 1),
          r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
          g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
          b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
      let hex = ("0" + r.toString(16)).slice(-2).toUpperCase() +
        ("0" + g.toString(16)).slice(-2).toUpperCase() +
        ("0" + b.toString(16)).slice(-2).toUpperCase();
      // 如果要转成8位hex，需要加上透明度
      if (bit == 8) { hex += ("0" + Math.floor(a*255).toString(16)).slice(-2).toUpperCase() }

      return hex
    },
  },
  created(){
    console.log('创建')
    this.platformConfigGet()
    this.staticUrl = localStorage.getItem("driveHost")
  },
  mounted(){
    this.towidgetData()
  },
};
</script>

<style scoped lang='less'>
   .preview-phone{
      position: absolute;
      top: 0px;
      left: 50%;
      width: 300px;
      height: 640px;
      z-index: 999;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 70%;
      .preview-phone-bg{
        width: 265px;
        height: 550px;
        position: absolute;
        z-index: 1000;
        top: 85px;
        right: 18px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        .img-box{
          width: 207px;
          height: 110px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          overflow: hidden;
          position: absolute;
          top: 145px;
          left: 29px;
          display: flex;
          align-items: center;
          img{
            width: 100%;
          }
        }
        .btn-box{
          // width: 247px;
          // padding: 0 5px;
          position: absolute;
          display: flex; 
          flex-wrap: wrap; 
          justify-content: space-around;
          top: 360px;
          left: 48px;
          font-size: 10px;
          .btn-left{
            mergin-left:22px;
            width: 77px;
            height: 24px;
            line-height: 23px;
            border: 1px solid #000;
            text-align: center;
            color: #000;
            border-radius: 15px;
            box-sizing:border-box;

          }
          .btn-right{
            margin-left: 10px;
            width: 77px;
            height: 24px;
            line-height: 24px;
            background: #000;
            text-align: center;
            color: #fff;
            border-radius: 15px;
          }
          .btn-right{
            margin-left: 10px;
            width: 77px;
            height: 24px;
            line-height: 24px;
            background: #000;
            text-align: center;
            color: #fff;
            border-radius: 15px;
          }
        }
      }
    }
    .preview-phone1{
      position: absolute;
      top: 0px;
      left: 75%;
      width: 300px;
      height: 640px;
      z-index: 999;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 70%;
      .preview-phone-bg{
        width: 265px;
        height: 550px;
        position: absolute;
        z-index: 1000;
        top: 85px;
        right: 18px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        .img-box{
          width: 207px;
          height: 110px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          overflow: hidden;
          position: absolute;
          top: 145px;
          left: 29px;
          display: flex;
          align-items: center;
          img{
            width: 100%;
          }
        }
        .btn-box{
          // width: 247px;
          // padding: 0 5px;
          position: absolute;
          display: flex; 
          flex-wrap: wrap; 
          justify-content: space-around;
          top: 360px;
          left: 29px;
          font-size: 10px;
          width: 207px;
          .btn-left{
            margin-left:22px;
            width: 77px;
            height: 24px;
            line-height: 23px;
            border: 1px solid #000;
            text-align: center;
            color: #000;
            border-radius: 15px;
            box-sizing:border-box;

          }
          .btn-right1{
            margin:0 auto;
            width: 100px;
            height: 26px;
            line-height: 26px;
            background: #000;
            text-align: center;
            color: #fff;
            border-radius: 15px;
          }
        }
      }
    }
     .preview-box{
      position: relative;
    }
  .help{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
</style>