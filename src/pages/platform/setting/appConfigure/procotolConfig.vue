<template>
<!-- 协议配置 -->
  <div>
    <a-card
    size="small"
    :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tabChange="key => onTabChange(key, 'noTitleKey')"
    >
      <a-spin :spinning="spinning">
        <div v-show="noTitleKey == 0">
          <a-form-model
            ref="formDataUser"
            :model="formDataUser"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="协议名称" prop="login_protocol_usertitle">
              <a-input placeholder="请输入协议名称" v-model="formDataUser.login_protocol_usertitle" />
              <p class="tip">只需输入纯文字，调用协议的页面会自动转换为《协议名称》。例如：登录页的《用户协议》</p>
            </a-form-model-item>
            <a-form-model-item label="协议内容" prop="login_protocol_usercontent">
              <div id="userEditor"></div>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
              <a-button type="primary" @click="saveUser" :loading="saveUserLoading">提交</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div v-show="noTitleKey == 1">
            <a-form-model
              ref="formDataPrivacy"
              :model="formDataPrivacy"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
            <a-form-model-item label="协议名称" prop="login_protocol_privacytitle">
              <a-input placeholder="请输入协议名称" v-model="formDataPrivacy.login_protocol_privacytitle" />
              <p class="tip">只需输入纯文字，调用协议的页面会自动转换为《协议名称》。例如：登录页的《用户协议》</p>
            </a-form-model-item>
            <a-form-model-item label="协议内容" prop="login_protocol_privacycontent">
              <div id="privacyEditor"></div>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
              <a-button type="primary" @click="savePrivacy" :loading="savePrivacyLoading">提交</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div v-show="noTitleKey == 2">
            <a-form-model
              ref="formDataPrivacy"
              :model="formDataBusines"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
            <a-form-model-item label="协议名称" prop="business_settlement_title">
              <a-input placeholder="请输入协议名称" v-model="formDataBusines.business_settlement_title" />
              <p class="tip">只需输入纯文字，调用协议的页面会自动转换为《协议名称》。例如：登录页的《用户协议》</p>
            </a-form-model-item>
            <a-form-model-item label="协议内容" prop="business_settlement_content">
              <div id="businesEditor"></div>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
              <a-button type="primary" @click="saveBusines" :loading="saveBusinesLoading">提交</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div v-show="noTitleKey == 3">
          <a-form-model
            ref="formDataCancel"
            :model="formDataCancel"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="协议名称" prop="business_settlement_title">
              <a-input placeholder="请输入协议名称" v-model="formDataCancel.login_cancel_agreement_title" />
              <p class="tip">只需输入纯文字，调用协议的页面会自动转换为《协议名称》。例如：登录页的《用户协议》</p>
            </a-form-model-item>
            <a-form-model-item label="协议内容" prop="login_cancel_agreement_content">
              <div id="cancelEditor"></div>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
              <a-button type="primary" @click="saveCancel" :loading="saveCancelLoading">提交</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div v-show="noTitleKey == 4">
          <a-form-model
            ref="formDataAndroid"
            :model="formDataAndroid"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="提示内容" prop="android_reminder">
              <!-- <div id="androidEditor"></div> -->
              <a-textarea class='mt-sm' v-model='formDataAndroid.android_reminder' placeholder="请输入提示内容" 
              :auto-size="{ minRows: 4, }"
              />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
              <a-button type="primary" @click="saveAndroid" :loading="saveAndroidLoading">提交</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import E from 'wangeditor'
const { BtnMenu } = E
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
export default {
  data(){
    return {
      spinning: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 17 },
      tabListNoTitle: [
        {key: '0', tab: '用户协议'},
        {key: '1', tab: '隐私协议'},
        {key: '2', tab: '商家入驻协议'},
        {key: '3', tab: '注销协议'},
        {key: '4', tab: '安卓温馨提示'},
      ],
      noTitleKey: '0',
      formDataUser: {
        login_protocol_usertitle: '',
        login_protocol_usercontent: '',
      },
      saveUserLoading: false,
      formDataPrivacy:{
        login_protocol_privacytitle: '',
        login_protocol_privacycontent: ''
      },
      savePrivacyLoading: false,
      formDataBusines:{
        business_settlement_content:"",
        business_settlement_title:"",     
      },
      saveBusinesLoading:false,
      formDataCancel:{
        login_cancel_agreement_content:"",
        login_cancel_agreement_title:"",     
      },
      formDataAndroid:{
        android_reminder:"",
      },
      saveCancelLoading:false,
      saveAndroidLoading:false,
      userEditor: null,
      privacyEditor: null,
      businesEditor:null,
      cancelEditor:null,
      androidEditor:null,
      userEditorMenus: [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'userEditorImgMenu',
          'userEditorVideoMenu',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
      ],
      privacyEditorMenus: [
        'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'privacyEditorImgMenu',
          'privacyEditorVideoMenu',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
      ],
      businesEditorMenus: [
        'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'businesEditorImgMenu',
          'businesEditorVideoMenu',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
      ],
      cancelEditorMenus: [
        'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'cancelEditorImgMenu',
          'cancelEditorVideoMenu',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
      ],
      androidEditorMenus: [
        // 'head',
        // 'bold',
        // 'fontSize',
        // 'fontName',
        // 'italic',
        // 'underline',
        // 'strikeThrough',
        // 'indent',
        // 'lineHeight',
        // 'foreColor',
        // 'backColor',
        // 'link',
        // 'list',
        // 'justify',
        // 'quote',
        // 'emoticon',
        // 'androidEditorImgMenu',
        // 'androidEditorVideoMenu',
        // 'table',
        // 'code',
        // 'splitLine',
        // 'undo',
        // 'redo',
      ],
    }
  },
  created(){
    this.platformConfigGet();
  },
  mounted(){
    this.initEditor()
  },
  methods:{
    initImgBtn(editorName){
      let _this = this;
      class imgMenu extends BtnMenu {
          constructor(editor) {
              const $elem = E.$(
                  `<div class="w-e-menu">
                      <i class="w-e-icon-image"></i>
                  </div>`
              )
              super($elem, editor)
          }
          // 菜单点击事件
          clickHandler() {
              // 做任何你想做的事情
              // 可参考【常用 API】文档，来操作编辑器
              _this.checkImage(editorName);
          }
          // 菜单是否被激活（如果不需要，这个函数可以空着）
          // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
          // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
          tryChangeActive() {
              // 激活菜单
              // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
              // 2. this.this.isActive === true
              // this.active()
              // // 取消激活菜单
              // // 1. 菜单 DOM 节点会删掉 .w-e-active
              // // 2. this.this.isActive === false
              // this.unActive()
          }
      }
      return imgMenu;
    },
    initVideoBtn(editorName){
      let _this = this;
      class imgMenu extends BtnMenu {
          constructor(editor) {
              const $elem = E.$(
                  `<div class="w-e-menu">
                      <i class="w-e-icon-play"></i>
                  </div>`
              )
              super($elem, editor)
          }
          // 菜单点击事件
          clickHandler() {
              // 做任何你想做的事情
              // 可参考【常用 API】文档，来操作编辑器
              _this.checkVideo(editorName);
          }
          // 菜单是否被激活（如果不需要，这个函数可以空着）
          // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
          // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
          tryChangeActive() {
              // 激活菜单
              // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
              // 2. this.this.isActive === true
              // this.active()
              // // 取消激活菜单
              // // 1. 菜单 DOM 节点会删掉 .w-e-active
              // // 2. this.this.isActive === false
              // this.unActive()
          }
      }
      return imgMenu;
    },
    platformConfigGet(){
      let config = [];
      let formData = {...this.formDataUser, ...this.formDataPrivacy , ...this.formDataBusines ,...this.formDataCancel,...this.formDataAndroid}
      for(let k in formData){
        config.push(k);
      }
      this.spinning = true;
      platformConfigGet({config}).then(res => {
        console.log(res)
        if(res.code == 200){
          for(let k in this.formDataUser){
            this.formDataUser[k] = res.data.config[k]
          }
          for(let k in this.formDataPrivacy){
            this.formDataPrivacy[k] = res.data.config[k]
          }
          for(let k in this.formDataBusines){
            this.formDataBusines[k] = res.data.config[k]
          }
          for(let k in this.formDataCancel){
            this.formDataCancel[k] = res.data.config[k]
          }
          for(let k in this.formDataAndroid){
            this.formDataAndroid[k] = res.data.config[k]
          }
          console.log(this.formDataBusines,"formDataBusines")
          this.userEditor.txt.html(this.formDataUser.login_protocol_usercontent);
          this.privacyEditor.txt.html(this.formDataPrivacy.login_protocol_privacycontent);
          this.businesEditor.txt.html(this.formDataBusines.business_settlement_content);
          this.cancelEditor.txt.html(this.formDataCancel.login_cancel_agreement_content);
          this.androidEditor.txt.html(this.formDataAndroid.android_reminder);
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    checkVideo(editor){
      this.$byfUploadVideo({videosList: []}).then(res => {
        if (res.action == 'confirm') {
          this.videoList = [];
          res.selectedVideos.forEach(item => {
            this.videoList.push(item)
          });
          console.log(res.selectedVideos)
          let video = `<iframe src="${res.selectedVideos[0].url}" />`
          this[editor].cmd.do('insertHTML', video)
        }
      });
    },
    checkImage(editor){
      console.log(editor)
      this.$byfUpload({multiple: false, imgsList: []}).then(res => {
        if (res.action == 'confirm') {
          let img = `<img src="${res.selectedImgs[0].url}" />`
          this[editor].cmd.do('insertHTML', img)
        }
      });
    },
    initEditor(){
      this.userEditor = new E('#userEditor');
      this.privacyEditor = new E('#privacyEditor')
      this.businesEditor = new E('#businesEditor')
      this.cancelEditor = new E('#cancelEditor')
      this.androidEditor = new E('#androidEditor')
      this.userEditor.config.menus = this.userEditorMenus;
      this.privacyEditor.config.menus = this.privacyEditorMenus;
      this.businesEditor.config.menus = this.businesEditorMenus;
      this.cancelEditor.config.menus = this.cancelEditorMenus;
      this.androidEditor.config.menus = this.androidEditorMenus;
      this.userEditor.menus.extend('userEditorImgMenu', this.initImgBtn('userEditor'))
      this.privacyEditor.menus.extend('privacyEditorImgMenu', this.initImgBtn('privacyEditor'))
      this.businesEditor.menus.extend('businesEditorImgMenu', this.initImgBtn('businesEditor'))
      this.cancelEditor.menus.extend('cancelEditorImgMenu', this.initImgBtn('cancelEditor'))
      this.androidEditor.menus.extend('androidEditorImgMenu', this.initImgBtn('androidEditor'))
      // 将菜单加入到 editor.config.menus 中
      // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
      this.userEditor.menus.extend('userEditorVideoMenu', this.initVideoBtn('userEditor'))
      this.privacyEditor.menus.extend('privacyEditorVideoMenu', this.initVideoBtn('privacyEditor'))
      this.businesEditor.menus.extend('businesEditorVideoMenu', this.initVideoBtn('businesEditor'))
      this.cancelEditor.menus.extend('cancelEditorVideoMenu', this.initVideoBtn('cancelEditor'))
      this.androidEditor.menus.extend('androidEditorVideoMenu', this.initVideoBtn('androidEditor'))
      this.userEditor.config.zIndex = 500
      this.privacyEditor.config.zIndex = 500
      this.businesEditor.config.zIndex = 500
      this.cancelEditor.config.zIndex = 500
      this.androidEditor.config.zIndex = 500
      this.userEditor.create();
      this.privacyEditor.create();
      this.businesEditor.create();
      this.cancelEditor.create();
      this.androidEditor.create();
    },
    onTabChange(key, type){
      this[type] = key;
    },
    saveUser(){
      this.formDataUser.login_protocol_usercontent = this.userEditor.txt.html();
      this.saveUserLoading = true;
      platformConfigSet(this.formDataUser).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
        }
      }).finally(() => {
        this.saveUserLoading = false;
      })
    },
    savePrivacy(){
      this.formDataPrivacy.login_protocol_privacycontent = this.privacyEditor.txt.html();
      this.savePrivacyLoading = true;
      platformConfigSet(this.formDataPrivacy).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
        }
      }).finally(() => {
        this.savePrivacyLoading = false;
      })
    },
    saveBusines(){
      this.formDataBusines.business_settlement_content = this.businesEditor.txt.html();
      this.saveBusinesLoading = true;
      platformConfigSet(this.formDataBusines).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
        }
      }).finally(() => {
        this.saveBusinesLoading = false;
      })
    },
    saveCancel(){
      this.formDataCancel.login_cancel_agreement_content = this.cancelEditor.txt.html();
      this.saveCancelLoading = true;
      platformConfigSet(this.formDataCancel).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
        }
      }).finally(() => {
        this.saveCancelLoading = false;
      })
    },
    saveAndroid(){
      // this.formDataAndroid.android_reminder = this.androidEditor.txt.html();
      this.saveAndroidLoading = true;
      platformConfigSet(this.formDataAndroid).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
        }
      }).finally(() => {
        this.saveAndroidLoading = false;
      })
    },
  },
}
</script>

<style scoped>
.tip{
  color: #a0a0a0;
  font-size: 14px;
  line-height: 20px;
}
</style>