<template>
  <common-layout>
    <div class="login-box">
      <div class="left-box">
        <img class="build1" src="~@/assets/img/login/build_1.png" alt="" />
        <img class="build2" src="~@/assets/img/login/build_2.png" alt="" />
        <img class="build3" src="~@/assets/img/login/build_3.png" alt="" />
        <img class="circle" src="~@/assets/img/login/circle.png" alt="" />
      </div>

      <div class="login">
        <div class="header">
          欢迎登录
          <span class="title">{{ sysSiteName() }}</span>
        </div>
        <a-form @submit="onSubmit" :form="form">
          <byf-tabs v-model="activeKey" size="large">
            <byf-tab-pane tab="密码登录" key="1">
              <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px"/>
              <a-form-item>
                <a-input
                  autocomplete="autocomplete"
                  size="large"
                  placeholder="请输入账号"
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入账号',
                          whitespace: true,
                        },
                      ],
                    },
                  ]"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  size="large"
                  placeholder="请输入密码"
                  autocomplete="autocomplete"
                  type="password"
                  v-decorator="[
                    'password',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入密码',
                          whitespace: true,
                        },
                      ],
                    },
                  ]"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              
              <!-- <a-form-item v-if="showVerification()">
                <a-popover v-model="showVerificationVisible" trigger="click" placement="topLeft">
                  <template slot="content">
                    
                  </template>
                  <div class="verification-btn" :class="{'success': currentVerification.isVerification}">
                    {{currentVerification.text}}
                  </div>
                </a-popover>
              </a-form-item> -->
            </byf-tab-pane>
            <byf-tab-pane tab="手机号登录" key="2">
              <a-form-item>
                <a-input size="large" placeholder="请输入手机号">
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="请输入短信验证码">
                      <a-icon slot="prefix" type="mail" />
                    </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button
                      style="width: 100%"
                      class="captcha-button"
                      size="large"
                      >获取验证码</a-button
                    >
                  </a-col>
                </a-row>
              </a-form-item>
            </byf-tab-pane>
          </byf-tabs>

          <div>
            <a-checkbox :checked="autoLogin" @click="autoLogin = !autoLogin" >自动登录</a-checkbox >
            <a style="float: right">忘记密码</a>
          </div>
          <a-form-item>
            <a-button shape="round" :loading="logging" style="margin-top: 24px"
              size="large"
              htmlType="submit"
              type="primary"
              >登录</a-button
            >
          </a-form-item>
          <div>
            <router-link style="float: right" to="/dashboard/workplace"
              >注册账户</router-link
            >
          </div>
        </a-form>
      </div>
      <div class="bottom-wave" ref="bottomWave"></div>
    </div>
    <Vcode @click.prevent :imgs="imgs" :show="isShow" @success="success" @close="close" />
  </common-layout>
</template>

<script>
import Vcode from "vue-puzzle-vcode";
let imgs = [];
for(let i = 1; i <= 20; i++){
  imgs.push(require('@/assets/img/slideVerify/bgImg/'+i+'.png'))
}
import moment from 'moment'
import CommonLayout from "@/layouts/CommonLayout";
import { setAuthorization } from "@/utils/request";
import { mapMutations, mapGetters } from "vuex";
import { THREE } from "@/assets/js/three.min.js";
// eslint-disable-next-line
import { siteLogin, getSiteSid, removeLocalUserData } from "@/services/site";
// import {getRoutesConfig} from '@/services/user'
// import {loadRoutes} from '@/utils/routerUtil'
import {loadIconJsAndCss} from '@/components/byf/icon/iconUtil.js'
var SEPARATION = 30,
  AMOUNTX = 50,
  AMOUNTY = 50;
var container;
var camera, scene, renderer;
var particles,
  particle,
  count = 0;
// eslint-disable-next-line
var mouseX = 0,
  // eslint-disable-next-line
  mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

let startColor = 0x006622; // 起始颜色
let endColor = 0x0066ff; // 结束颜色
let step = (endColor - startColor) / (AMOUNTX * AMOUNTY); // 颜色步长

export default {
  name: "Login",
  components: {
    CommonLayout,
    Vcode
  },
  data() {
    return {
      img1: '',
      imgs,
      isShow: false,

      logging: false,
      error: "",
      form: this.$form.createForm(this),
      animationFrameIndex: null,
      autoLogin: true,
      activeKey: "1",
      currentVerification: {
        text: '点击按钮进行验证',
        isVerification: false,
        imgList: ['https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg']
      },
      showVerificationVisible: false
    };
  },
  created(){
    // 进入登录页就清空下用户相关信息
    removeLocalUserData()
  },
  mounted() {
    this.bottomAnimate();
  },
  computed: {
    ...mapGetters('siteConfig', ['configInfo']),
    systemName() {
      return this.$store.state.setting.systemName;
    },

  },
  methods: {
    ...mapMutations('siteConfig', ['setConfigInfo']),
    ...mapMutations("account", ["setUser", "setPermissions", "setRoles"]),
    success(){
      this.currentVerification.isVerification = true;
      // this.currentVerification.text = '验证成功';
      // this.$message.success('验证成功')
      this.isShow = false;
      this.onSubmit();
    },
    close(){
      this.isShow = false;
    },
    showVerification(){
      // 是否显示滑动验证
      let flag = false;
      if(this.configInfo && this.configInfo.sys_slider_verification != 0){
        // 需要验证
        if(this.configInfo.sys_slider_verification == 1){
          // 每次登录都需要验证
          flag = true;
        }
        if(this.configInfo.sys_slider_verification == 2 && !this.configInfo.verificationTime){
          // 设备首次登录需要验证
          flag = true;
        }
        if(this.configInfo.sys_slider_verification == 3 && moment.unix(moment().unix()).diff(moment.unix(this.configInfo.verificationTime), 'days') >= 31){
          // 设备30天未登录
          flag = true;
        }
      }
      return flag;
    },
    sysSiteName(){
      let name = this.systemName;
      if(this.configInfo){
        name = this.configInfo.sys_site_name;
      }
      return name;
    },
    callback(key) {
      this.activeKey1 = key;
    },
    onTabClick() {},
    test() {
      this.autoLogin = !this.autoLogin;
    },
    onSubmit(e) {
      if(e){
        e.preventDefault();
      }
      if(this.showVerification() && !this.currentVerification.isVerification){
        this.isShow = true;
        return;
      }
      this.logging = true;
      this.form.validateFields((err) => {
        if (!err) {
          // 每次进入登录页都重新获取sid
          getSiteSid().then(()=>{
            const name = this.form.getFieldValue("name");
            const password = this.form.getFieldValue("password");
            siteLogin({ mobile: name, password }).then(this.afterLoginBy).catch(() => {
              this.logging = false;
            });
          }).catch(()=>{
            this.logging = false
          })
        } else {
          this.logging = false;
        }
      });
    },
    getFirstPath(oneRoute) {
      let path = "/";
      if (!oneRoute.children || oneRoute.children.length == 0) {
        path += oneRoute.path;
      } else {
        path = path + oneRoute.path + this.getFirstPath(oneRoute.children[0]);
      }
      return path;
    },
    setSuperShow(arr) {
      for (let i = 0; i++; i < arr.length) {
        let item = arr[i];
        if (item.path == "super") {
          item.meta.invisble = true;
        }
        if (item.children) {
          this.setSuperShow(item.children);
        }
      }
    },
    afterLoginBy(res) {
      if (res.code == 200) {
        loadIconJsAndCss('other')
        this.setUser(res.data.manager);
        setAuthorization({ token: res.data.token });
        if (res.data.manager.is_super == 1) {
          this.$store.commit("account/setRoles", { id: "is_super" });
        } else {
          this.$store.commit("account/setRoles", { id: "" });
        }
        // if(res.data.manager.is_super == 1){
        //   loadRoutes({router: this.$router, store: this.$store, i18n: this.$i18n}, superRoute)
        // }else{
        //   loadRoutes({router: this.$router, store: this.$store, i18n: this.$i18n}, routesConfig)
        // }

        /** 
         * 需要验证时才会有此设置
         * 登录成功，记录滑动验证信息到缓存，验证秒数存储
         * 每次进入登录页的时候需要用到此信息来判断是否需要验证
         * 
        */
          this.setConfigInfo({verificationTime: moment().unix()})
        // end  
        this.$router.push("/genBackstage/myApp/myAppList");
        this.$message.success(res.msg);
      } else {
        this.currentVerification.isVerification = false;
        this.error = res.msg;
        this.logging = false;
      }
    },
    bottomAnimate() {
      this.init();
      this.animate();
    },
    init() {
      container = this.$refs.bottomWave;
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        10,
        10000
      );
      camera.position.z = 900;
      camera.position.y = 150;
      scene = new THREE.Scene();
      particles = new Array();
      var PI2 = Math.PI * 2;
      var i = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          var material = new THREE.ParticleCanvasMaterial({
            color: startColor + step * i,
            program: function (context) {
              context.beginPath();
              context.arc(0, 0, 0.4, 0, PI2, true);
              context.fill();
            },
          });
          particle = particles[i++] = new THREE.Particle(material);
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          scene.add(particle);
        }
      }
      renderer = new THREE.CanvasRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    },
    onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      // eslint-disable-next-line
      mouseY = event.clientY - windowHalfY;
    },
    animate() {
      this.animationFrameIndex = requestAnimationFrame(this.animate);

      this.render();
    },
    render() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      // camera.position.y += (-mouseY - camera.position.y) * .05;
      camera.lookAt(scene.position);
      var i = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.2) * 20;
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 2) * 0.8 +
            (Math.sin((iy + count) * 0.5) + 2) * 0.8;
        }
      }

      renderer.render(scene, camera);
      count += 0.1;
    },
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrameIndex);
    document.removeEventListener("mousemove", this.onDocumentMouseMove, false);
  },
};
</script>

<style lang="less" scoped>
.common-layout {
  overflow: hidden;
  .login-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    max-height: 100vh;
    .left-box {
      position: relative;
      padding-left: 30px;
      padding-top: 30px;
      height: 100vh;
      box-sizing: border-box;
      z-index: 1;
      img {
        position: absolute;
        &.build1 {
          top: 140px;
          left: 150px;
          animation: animate1 3s ease-in-out infinite alternate;
        }
        &.build2 {
          left: 385px;
          animation: animate2 3s ease-in-out infinite alternate;
        }
        &.build3 {
          left: 685px;
          top: 250px;
          animation: animate3 3s ease-in-out infinite alternate;
        }
        &.circle {
          top: 320px;
        }
      }
    }
    .login {
      margin-right: 10%;
      width: 510px;
      color: white;
      z-index: 1;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }
      .header {
        font-size: 34px;
        font-weight: 600;
        .title {
          color: #1184f5;
        }
      }
      .ant-form {
        color: white;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 12px;
        width: 100%;
        margin-top: 27px;
        padding: 30px 23px;
        .ant-tabs {
          color: white;
          /deep/.ant-tabs-bar {
            border-bottom: none;
            .ant-tabs-ink-bar {
              opacity: 0;
            }
            .ant-tabs-tab {
              margin: 0;
              &.ant-tabs-tab-active {
                font-size: 24px;
                color: white;
              }
            }
          }
          /deep/ .ant-tabs-content {
            .ant-input {
              border-radius: 40px;
            }
          }
        }
        .ant-checkbox-wrapper {
          color: white;
        }
      }
    }
    .bottom-wave {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
@keyframes animate1 {
  from {
    top: 140px;
  }
  to {
    top: 170px;
  }
}
@keyframes animate2 {
  from {
    top: 0;
  }
  to {
    top: 40px;
  }
}
@keyframes animate3 {
  from {
    top: 250px;
  }
  to {
    top: 220px;
  }
}

/deep/.slide-verify{
  .slide-verify-slider-mask-item{
    border-radius: 50%;
  }
  // .slide-verify-slider-mask-item-icon{
  //   width: 100%;
  //   height: 100%;
  //   top: 0;
  //   left: 0;
  //   background: url('../../assets/img/slideVerify/1.png') no-repeat ;
  //   background-size: 100% 100%;
  // }
}
.close-verify-btn{
  position: absolute;
  top: -9px;
  right: -8px;
  background: rgb(233,233,233);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  line-height: 13px;
  text-align: center;
  font-size: 8px;
  cursor: pointer;
}
.v-code{
  position: relative;
  
}
</style>
