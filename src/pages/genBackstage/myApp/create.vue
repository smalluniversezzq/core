<template>
  <a-layout class="create-app">
    <a-layout-content>
      <div class="stepsWrap">
        <a-steps :current="stepsCurrent" size="small">
          <a-step title="提交平台信息" />
          <a-step title="等待审核结果" />
          <a-step :title="form.audit_status == '-1' ? '平台拒绝' : '平台上线'" :status="form.audit_status == '-1' ? 'error' : ''"/>
        </a-steps>
      </div>
      <a-form-model v-show="stepsCurrent == 0" ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="平台名称" prop="name" help="平台名称可以是汉字、字母、数字的任意一种或任意组合，长度不得超过15个字">
          <a-input v-model="form.name" placeholder="请输入平台名称"></a-input>
        </a-form-model-item>
        <a-form-model-item style="overflow:hidden" label="平台logo" prop="logo" help="请上传1024*1024像素的png图片">
          <div class="byf-upload">
            <!-- 图片列表 -->
            <ul v-if="imgList.length > 0" class="img-list">
              <li v-for="(item, index) in imgList" :key="'img'+index">
                <img :src="item" alt="" >
                <byf-icon class="close" type="iconclose" @click="deleteImg(index)" />
                <div class="img-replace-box">
                  <div class="img-replace" @click="openModal">替换</div>
                </div>
              </li>
            </ul>
            <!-- 添加图片的li -->
            <div v-else
              class="upload"
              @click="openModal"
            >
              <div class="text-icon">
                <byf-icon type="iconjiahao"></byf-icon>
                <span>添加图片</span>
              </div>
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item
              label="平台类型"
              prop="type"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <!-- TODO 暂时使用:value 后续开放多平台时需改动为双向绑定 -->
              <a-checkbox-group
                :value="form.type"
                :options="plainOptions"
              />
            </a-form-model-item>
      </a-form-model>

      <!-- 等待审核结果 -->
      <div v-show="stepsCurrent != 0" class="waitBox">
        <a-avatar
            class="app-avatar"
            shape="square"
            :size="67"
            :src="form.logo"
          ></a-avatar>
          <p class="appName">{{form.name}}</p>
          <p class="tip">
            <span v-if="form.audit_status == 0">您的平台已提交审核，请耐心等待审核结果，审核通过后即可使用。</span>
            <span v-if="form.audit_status == -1">平台审核被拒</span>
          </p>
          <div class="refuseTip" v-show="form.audit_status == -1 && form.audit_msg">
            <p class="tipContent">{{form.audit_msg}}</p>
          </div>
          <a-space>
            <a-button v-show="form.pmid && form.audit_status == -1" type="primary" @click="stepsCurrent = 0">重新提交</a-button>
            <a-button @click="jumpParent">返回列表</a-button>
          </a-space>
      </div>
    </a-layout-content>
    <a-row v-show="stepsCurrent == 0" class="bottom-btns" type="flex" align="middle">
      <a-button v-show="!form.pmid" type="primary" :loading="saveLoading" @click="doSave">保存</a-button>
      <a-button v-show="form.pmid && form.audit_status == -1" type="primary" :loading="reapplyLoading" @click="platformReapply">重新提交</a-button>
      <a-button @click="jumpParent">返回列表</a-button>
    </a-row>
  </a-layout>
</template>
<script>
import { getPlatformInfo, createAdminApp, platformReapply } from '@/services/platform'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data(){
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入平台名称'));
      }
      let pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi; // 中文数字字母正则
      if (value.length > 15 || !pattern.test(value)) {
        callback(new Error('平台名称可以是汉字、字母、数字的任意一种或任意组合，长度不得超过15个字'));
      }else{
        callback();
      }
    };
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      plainOptions: [
        { label: 'APP', value: 0 },
        { label: '微信', value: 1, disabled: true },
        { label: 'H5', value: 2, disabled: true },
      ],
      form: {
        name: '',
        type: [0],
        logo: ''
      },
      rules: {
        name: [ { required: true, validator: validateName, trigger: "blur" } ],
        logo: [ { required: true, message: "请选择平台logo", trigger: "blur" } ],
        type: [ { required: true, message: "请选择平台类型", trigger: "blur" } ],
      },
      imgList: [],
      stepsCurrent: 1,
      detailsInfo: {},
      saveLoading: false,
      reapplyLoading: false,
    }
  },
  created(){
    console.log(11111111111111)
  },
  mounted(){
    if(!this.$route.query.pmid){
      this.stepsCurrent = 0
    }else{
      this.getPlatformInfo();
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(1111111111)
    console.log(from.name)
    next(vm => {
      // 记录前一个路由，优化面包屑返回功能
      vm.parentRoute = from.fullPath
    })
  },
  computed: {
    ...mapGetters("account", ['user']),
  },
  methods: {
    ...mapMutations("account", ["setUserPlatformCount"]),
    openModal() {
      this.$byfUpload({multiple: false, imgsList: this.imgList}).then(res => {
        if (res.action == 'confirm') {
          let arr = []
          res.selectedImgs.forEach(item => {
            arr.push(item.url)
          })
          this.imgList = arr;
          this.form.logo = this.imgList[0];
          this.$refs.ruleForm.validateField('logo')
        }
      });
    },
    deleteImg(index){
      this.imgList.splice(index,1);
      this.form.logo = '';
    },
    getPlatformInfo(){
      getPlatformInfo({pmid: this.$route.query.pmid}).then(res => {
        if(res.code == 200){
          this.form = res.data.info;
          this.form.type = [0];
          this.imgList[0] = this.form.logo;
          if(this.form.audit_status == -1){
            this.stepsCurrent = 2;
          }
        }
      })
    },
    jumpParent(){
      this.$router.go(-1)
      // if (this.parentRoute == '/genBackstage/myPlatform/myAppList') {
      //   this.$router.go(-1)
      // } else {
      //   this.$router.replace('/genBackstage/myPlatform/myAppList')
      // }
    },
    doSave(){
      this.saveLoading = true;
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          createAdminApp({name: this.form.name, logo: this.form.logo, type: this.form.type}).then(res => {
            this.saveLoading = false;
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.stepsCurrent = 1;
              this.form.audit_status = 0;
              this.setUserPlatformCount({
                platform_limit: this.user.platform_limit,
                platform_current: this.user.platform_current + 1,
                platform_remain: this.user.platform_remain - 1,
              })
            }
          })
        } else {
          this.saveLoading = false;
          return false
        }
      })
    },
    platformReapply(){
      this.reapplyLoading = true;
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          platformReapply({pmid: this.form.pmid,name: this.form.name, logo: this.form.logo, type: this.form.type}).then(res => {
            this.reapplyLoading = false;
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.stepsCurrent = 1;
              this.form.audit_status = 0;
            }
          })
        } else {
          this.reapplyLoading = false;
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.create-app {
  background: white;
  height: 100%;
  position: relative;
  padding-bottom: 55px;
  .tip{
    color: #a0a0a0;
    font-size: 12px;
  }
  .stepsWrap{
    padding: 0 30px;
    margin-bottom: 50px;
  }
  .ant-layout-header {
    background: transparent;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }
  .ant-layout-content {
    padding-top: 40px;
  }
  .ant-layout-footer{
    // background: transparent;
    padding: 0;
  }
  .bottom-btns {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 55px;
    background: white;
    border-top: 1px solid #efefef;
    padding-left: 30px;
    button {
      width: 100px;
      margin-right: 20px;
    }
  }
  .upload {
    .text-icon {
      display: flex;
      flex-direction: column;
      > i {
        font-size: 24px;
        color:#2d8cf0;
        margin-bottom: 10px;
      }
      > span {
        color: #b8b9bd;
        font-size: 12px;
      }
    }
    width: 100px;
    height: 100px;
    /* margin-left: 20px; */
    border: 1px dashed #e9edef;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
  }
}
.waitBox{
  text-align: center;
  padding-top: 30px;
  width: 600px;
  margin: 0 auto;
  .appName{
    padding-top: 10px;
    font-weight: bold;
  }
  .tip{
    font-size: 12px;
    color: red;
  }
  .refuseTip{
    background: rgb(233,233,233);
    padding: 20px;
    margin-bottom: 50px;
    p{
      margin: 0;
    }
    text-align: left;
    .tipContent{
      text-indent: 2em;
    }
  }
  .waitBtn{
    margin-top: 50px;
  }
}

.byf-upload {
  display: flex;
  margin-top: 5px;
  > .img-list {
    margin: 0;
    padding: 0;
    li {
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px solid #e9edef;
      background-color: #F4F6F8;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .close {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 20px;
        cursor: pointer;
        color: #b8b9bd;
        display: none;
      }
      .img-replace-box{
        position: absolute;
        left: 0;
        right: 0;
        height: 20px;
        bottom:0;
        overflow: hidden;
        .img-replace {
          height: 20px;
          margin-top: 20px;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.7);
          text-align: center;
          line-height: 20px;
          color: #ffffff;
          font-size: 12px;
          pointer-events: none;
          transition: margin-top .3s;
        }
      }
      &:hover {
        .img-replace {
          pointer-events:auto;
          display: block;
          margin-top: 0px;
        }
        .close {
          display: block;
          &:hover {
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
  > .upload {
    .text-icon {
      display: flex;
      flex-direction: column;
      > i {
        font-size: 24px;
        color:#2d8cf0;
        margin-bottom: 10px;
      }
      > span {
        color: #b8b9bd;
        font-size: 12px;
      }
    }
    width: 100px;
    height: 100px;
    /* margin-left: 20px; */
    border: 1px dashed #e9edef;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
  }
}
</style>