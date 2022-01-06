<template>
  <div>
    <a-card title="我的粉丝">
      <a-spin :spinning="formModelSpinning">

      
      <a-form-model
        ref="form"
        :rules="rules"
        :model="formData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
          <a-form-model-item label="邀请好友">
            <a-row>
              <a-col :span="22">
                <a-radio-group v-model="formData.fans_invite_tips_status" @change="inviteFriendsShowChange">
                  <a-radio value="1"> 显示 </a-radio>
                  <a-radio value="0"> 不显示 </a-radio>
                </a-radio-group>
                <div class="help">
                  说明：选择显示，用户端页面会出现提示邀请好友，点击跳转至邀请好友页面
                </div>
                <div class="form-item-block" v-show="formData.fans_invite_tips_status == 1">
                  <a-form-model-item label="提示文字" prop="fans_invite_tips_text"  :label-col="{span: 4, xxl: {span: 3},}" :wrapper-col="{span: 20, xxl: {span: 21},}">
                    <a-input v-model="formData.fans_invite_tips_text" :maxLength="18" placeholder="邀请好友获得更多收益">
                      <span slot="suffix">{{formData.fans_invite_tips_text.length}}/18</span>
                    </a-input>
                  </a-form-model-item>
                </div>
                
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="文案展示" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row>
              <a-col :span="22">
                <a-form-model-item prop="fans_noun_all">
                  <a-input v-model="formData.fans_noun_all" :maxLength="4" placeholder="全部粉丝">
                    <span slot="addonBefore">全部粉丝 替换为</span>
                    <span slot="suffix">{{formData.fans_noun_all.length}}/4</span>
                  </a-input>
                </a-form-model-item>
                <a-form-model-item prop="fans_noun_exclusive">
                  <a-input v-model="formData.fans_noun_exclusive" :maxLength="4" placeholder="专属粉丝">
                    <span slot="addonBefore">专属粉丝 替换为</span>
                    <span slot="suffix">{{formData.fans_noun_exclusive.length}}/4</span>
                  </a-input>
                </a-form-model-item>
                <a-form-model-item prop="fans_noun_ordinary">
                  <a-input v-model="formData.fans_noun_ordinary" :maxLength="4" placeholder="普通粉丝">
                    <span slot="addonBefore">普通粉丝 替换为</span>
                    <span slot="suffix">{{formData.fans_noun_ordinary.length}}/4</span>
                  </a-input>
                </a-form-model-item>
                <a-form-model-item prop="fans_noun_potential">
                  <a-input v-model="formData.fans_noun_potential" :maxLength="4" placeholder="潜在粉丝">
                      <span slot="addonBefore">潜在粉丝 替换为</span>
                      <span slot="suffix">{{formData.fans_noun_potential.length}}/4</span>
                    </a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="2">
                <help style="float: right">
                  <img style="width: 230px" src="@/assets/img/examples/myfans.png">
                </help>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="代理粉丝范围">
            <a-row>
              <a-col :span="22">
                <a-radio-group v-model="formData.fans_agent_range">
                  <a-radio value="1"> 仅显示2代内的代理用户 </a-radio>
                  <a-radio value="2"> 显示2代内的代理用户和运营商用户 </a-radio>
                </a-radio-group>
                <div class="help">
                  说明：上面选项是代理用户的粉丝是否显示2代内的运营商，系统默认不会显示运营商团队内的成员，比如A（代理） →  B（运营商）  →  C（代理）的关系，可以配置A的粉丝是否显示B用户，但是系统默认A的粉丝不会统计C用户。
                </div>
              </a-col>
            </a-row>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="运营商粉丝范围" prop="fans_Operators_range">
            <a-row>
              <a-col :span="22">
                <a-checkbox-group v-model="formData.fans_Operators_range" @change="onChange">
                  <byf-space direction="vertical">
                    <a-checkbox value="1">
                        统计高等级运营商用户本人（不含其团队成员）
                      </a-checkbox>
                      <a-checkbox value="2">
                        统计平级运营商用户本人（不含其团队成员）
                      </a-checkbox>
                      <a-checkbox value="3">
                        统计低等级运营商用户本人（含其团队成员）
                      </a-checkbox>
                      <span></span>
                  </byf-space>
                </a-checkbox-group>
                <div class="help">
                  说明：上面选项是运营商用户的粉丝是否显示其他运营商等级用户，有三种配置任选，即比当前运营商等级高的运营商用户；和当前等级同级别的运营商用户；比当前等级低的运营商用户，默认只有比当前等级低的运营商统计时含其团队成员。
                </div>
              </a-col>
            </a-row>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="潜在粉丝定义" >
            <a-row>
              <a-col :span="22">
                <a-radio-group v-model="formData.fans_definition_potential" @change="potentialFansChange">
                  <a-radio value="1"> 仅指微信锁粉未绑定手机号的直推用户 </a-radio>
                  <a-radio value="2"> 指未达到下单条件的直推用户 </a-radio>
                </a-radio-group>
                <div class="form-item-block" v-show="formData.fans_definition_potential == 2">
                  <a-form-model-item label="选择业务" prop="fans_module_type"  :label-col="{span: 5, xxl: {span: 4},}" :wrapper-col="{span: 19, xxl: {span: 20},}">
                    <a-checkbox-group :options="potentialFansOptions" 
                      v-model="formData.fans_module_type"></a-checkbox-group>
                  </a-form-model-item>
                  <a-form-model-item label="下单数量" prop="fans_order_number"  :label-col="{span: 5, xxl: {span: 4},}" :wrapper-col="{span: 19, xxl: {span: 20},}">
                    <a-input @change="fansOrderNumberChange" :value="formData.fans_order_number" placeholder="请输入数量">
                      <span slot="addonAfter">单</span>
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item label="每单最低金额" prop="fans_order_min_money"  :label-col="{span: 5, xxl: {span: 4},}" :wrapper-col="{span: 19, xxl: {span: 20},}">
                    <a-input @change="fansOrderMoneyChange" :value="formData.fans_order_min_money" placeholder="请输入金额">
                      <span slot="addonAfter">元</span>
                    </a-input>
                  </a-form-model-item>
                </div>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="名词解释">
            <a-radio-group v-model="formData.fans_noun_explain_status" @change="nounExplanationChange">
              <a-radio value="1"> 显示 </a-radio>
              <a-radio value="0"> 不显示 </a-radio>
            </a-radio-group>

            <div class="form-item-block" v-show="formData.fans_noun_explain_status == 1">
              <a-form-model-item prop="fans_noun_explain_title" :wrapper-col="{span: 24}">
                <a-input v-model="formData.fans_noun_explain_title" placeholder="请输入标题">
                  <span slot="suffix">{{formData.fans_noun_explain_title.length}}/10</span>
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="fans_noun_explain_content" :wrapper-col="{span: 24}">
                <div class="nounExplanationEditor" id="nounExplanationEditor" ref="nounExplanationEditor"></div>
              </a-form-model-item>
            </div>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
            <a-button type="primary" @click="platformConfigSet" :loading="saveLoading">保存</a-button>
          </a-form-model-item>
      </a-form-model>
      </a-spin>
    </a-card>
    <a-modal :maskClosable="false" width="60%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
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
import mixin from '@/pages/platform/setting/mixin/index'
import E from 'wangeditor'
const { BtnMenu } = E
import help from '@/pages/platform/common/help'
export default {
  mixins: [mixin],
  components: {
    help
  },
  data(){
    return {
      labelCol: {span: 3, xxl: {span: 2},},
      wrapperCol: { span: 14 },
      formData: {
        fans_invite_tips_status: '1',
        fans_invite_tips_text: '',
        fans_noun_all: '',
        fans_noun_exclusive: '',
        fans_noun_ordinary: '',
        fans_noun_potential: '',
        fans_agent_range: '1',
        fans_Operators_range: [],
        fans_definition_potential: '0',
        fans_module_type: [],
        fans_order_number: '',
        fans_order_min_money: '',
        fans_noun_explain_status: '0',
        fans_noun_explain_title: '',
        fans_noun_explain_content: ''
      },
      keyOfValue: {
        fans_invite_tips_status: '邀请好友',
        fans_invite_tips_text: '邀请好友-提示文字',

        fans_noun_all: '文案展示-全部粉丝',
        fans_noun_exclusive: '文案展示-专属粉丝',
        fans_noun_ordinary: '文案展示-普通粉丝',
        fans_noun_potential: '文案展示-潜在粉丝',

        fans_agent_range: '代理粉丝范围',
        fans_Operators_range: '运营商粉丝范围',

        fans_definition_potential: '潜在粉丝定义',
        fans_module_type: '潜在粉丝定义-业务类型',
        fans_order_number: '潜在粉丝定义-下单数量',
        fans_order_min_money: '潜在粉丝定义-每单最低金额',

        fans_noun_explain_status: '名词解释',
        fans_noun_explain_title: '名词解释-标题',
        fans_noun_explain_content: '名词解释-正文'
      },
      rules: {
        fans_noun_all: [{ required: true, message: "替换内容不能为空", trigger: "blur" }],
        fans_noun_exclusive: [{ required: true, message: "替换内容不能为空", trigger: "blur" }],
        fans_noun_ordinary: [{ required: true, message: "替换内容不能为空", trigger: "blur" }],
        fans_noun_potential: [{ required: true, message: "替换内容不能为空", trigger: "blur" }],
      },
      potentialFansOptions: [
        {label: '线上商城', value: '1'},
        // {label: '淘宝', value: '2'},
        // {label: '京东', value: '3'},
      ],
      nounExplanationEditor:null,
      nounExplanationEditorMenus: [
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
          // 'image',
          'nounExplanationEditorImgMenu',
          'nounExplanationEditorVideoMenu',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
      ],
    }
  },
  mounted(){
    this.inifEditor();
  },
  methods: {
    afterGetConfig(){
      console.log('afterGetConfig')
      this.initRules();
      this.nounExplanationEditor.txt.html(this.formData.fans_noun_explain_content)
    },
    fansOrderMoneyChange(e){
      const { value } = e.target;
      let reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/;
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.formData.fans_order_min_money = value;
      }
    },
    fansOrderNumberChange(e){
      const { value } = e.target;
      let reg = /^[1-9]\d*$/;
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.formData.fans_order_number = value;
      }
    },
    initRules(){
      if(this.formData.fans_invite_tips_status == 1){
        this.$set(this.rules, 'fans_invite_tips_text', [ { required: true, message: "提示文字不能为空", trigger: "blur" }, ])
      }else{
        delete this.rules.fans_invite_tips_text;
      }
      if(this.formData.fans_definition_potential == 2){
        this.$set(this.rules, 'fans_module_type', [ { required: true, message: "请选择业务", trigger: "change" }, ])
        this.$set(this.rules, 'fans_order_number', [ { required: true, message: "请输入数量", trigger: "blur" }, ])
        this.$set(this.rules, 'fans_order_min_money', [ { required: true, message: "请输入金额", trigger: "blur" }, ])
      }else{
        delete this.rules.fans_module_type;
        delete this.rules.fans_order_number;
        delete this.rules.fans_order_min_money;
      }
      if(this.formData.fans_noun_explain_status == 1){
        this.$set(this.rules, 'fans_noun_explain_title', [ { required: true, message: "标题不能为空", trigger: "blur" }, ])
        this.$set(this.rules, 'fans_noun_explain_content', [ { required: true, message: "内容不能为空", trigger: "blur" }, ])
      }else{
        delete this.rules.fans_noun_explain_title;
        delete this.rules.fans_noun_explain_content;
      }
    },
    inviteFriendsShowChange(){
      this.initRules()
    },
    potentialFansChange(){
      this.initRules()
    },
    nounExplanationChange(){
      this.initRules()
    },
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
    checkVideo(editor){
      this.$byfUploadVideo({videosList: []}).then(res => {
        if (res.action == 'confirm') {
          this.videoList = [];
          res.selectedVideos.forEach(item => {
            this.videoList.push(item)
          });
          let video = `<iframe src="${res.selectedVideos[0].url}" />`
          this[editor].cmd.do('insertHTML', video)
        }
      });
    },
    checkImage(editor){
      this.$byfUpload({multiple: false, imgsList: []}).then(res => {
        if (res.action == 'confirm') {
          let img = `<img src="${res.selectedImgs[0].url}"/>`
          this[editor].cmd.do('insertHTML', img)
        }
      });
    },
    inifEditor(){
      this.nounExplanationEditor = new E('#nounExplanationEditor');
      this.nounExplanationEditor.config.menus = this.nounExplanationEditorMenus;
      this.nounExplanationEditor.menus.extend('nounExplanationEditorImgMenu', this.initImgBtn('nounExplanationEditor'))
      // 将菜单加入到 editor.config.menus 中
      // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
      this.nounExplanationEditor.menus.extend('nounExplanationEditorVideoMenu', this.initVideoBtn('nounExplanationEditor'))
      this.nounExplanationEditor.config.zIndex = 500
      this.nounExplanationEditor.create();
    },
    onChange(){
      console.log(this.formData.fans_Operators_range)
    },
    beforeGetConfig(){
      console.log(this.nounExplanationEditor.txt.html())
      this.formData.fans_noun_explain_content = this.nounExplanationEditor.txt.html();
    }
  }
}
</script>

<style scoped lang="less">
.page_title{
  overflow: hidden;
  background: @background-color-base;
  padding: 0 24px;
  height: 37px;
  line-height: 37px;
  margin-bottom: 10px;
}
.help{
  min-height: 22px;
  margin-top: -2px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1.5;
}
.form-item-block{
  overflow: hidden;
  background: @background-color-light;
  padding: 0 20px;
  padding-top: 24px;

}
</style>
