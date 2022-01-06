<template>
  <div>
    <a-modal
      title="新增/编辑（文章）"
      width="900px"
      :visible="showModal"
      :destroyOnClose="true"
      okText="保存"
      @cancel="modalCancel"
    >
      <div class="beauty-scroll" style="height: 600px;overflow-y: auto;">
        <a-form-model
          class="form-model"
          ref="form"
          :rules="rules"
          :model="formData"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item
            label="文章分类"
            prop="c_id"
          >
            <a-cascader
              :getPopupContainer='triggerNode => triggerNode.parentNode'
              :defaultValue="defaultCategory"
              :field-names="{ label: 'title', value: 'id', children: 'subs' }"  
              :options="categoryOptions" placeholder="请选择文章分类" @change="onChangeClassify" />
          </a-form-model-item>
          <a-form-model-item
            label="文章标题"
            prop="title"
          >
            <a-input
              :maxLength="50"
              v-model="formData.title"
              placeholder="请输入文章标题"
            >
              <div slot="suffix">{{formData.title.length || 0}}/50</div>
            </a-input>
          </a-form-model-item>
          <a-form-model-item
            label="文章描述"
            prop="describe"
          >
            <a-input
              :maxLength="150"
              v-model="formData.describe"
              placeholder="请输入文章描述/简介，用于列表展示"
            >
              <div slot="suffix">{{formData.describe.length || 0}}/150</div>
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="文章内容" prop="content">
            <div id="content"></div>
          </a-form-model-item>
          <a-form-model-item
            label="URL路径"
            prop="alias"
            help="说明：URL路径是为了在平台端展示出每个页面拥有独特路径设置的，不可重复。"
          >
            <a-input
              v-model="formData.alias"
              placeholder="请输入URL路径，不输入默认使用数据ID"
            ></a-input>
          </a-form-model-item>
          <br/>
          <a-form-model-item
            label="搜索关键词"
            prop="keywords"
          >
            <a-select placeholder="请输入关键词，多个关键词每个以回车键结束" 
            :getPopupContainer='triggerNode => triggerNode.parentNode'
            mode="tags" 
            style="width: 100%" 
            :defaultValue="defaultKeywords"
            :token-separators="[',']" @change="handleChange">
              <div slot="notFoundContent">
                请输入关键词
              </div>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="排序"
            prop="sort"
          >
            <a-input
              v-model="formData.sort"
              placeholder="请输入排序，数字越大越靠前"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item label="状态" prop="status">
            <a-radio-group name="status" v-model="formData.status">
              <a-radio :value="1">展示</a-radio>
              <a-radio :value="0">隐藏</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </div>
      <template slot="footer">
        <byf-space>
          <a-button @click="modalCancel">取消</a-button>
          <a-button type="primary" :loading="saveLoading" @click="save">保存</a-button>
        </byf-space>
      </template>
    </a-modal>
  </div>
</template>

<script>

import { assistAdd, assistEdit } from "@/services/admin/core/assist";
import { getAssistCategoryIndex } from "@/services/admin/core/assistCategory";
import E from 'wangeditor'
const { BtnMenu } = E
let defaultFormData = {
        title: '',
        content: '',
        alias: '',
        keywords: null,
        sort: '',
        status: 1,
        c_id: '',
        describe: '',
      }
export default {
  data(){
    return {
      showModal: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
      saveLoading: false,
      formData: JSON.parse(JSON.stringify(defaultFormData)),
      defaultCategory: [],
      defaultKeywords: [],
      rules: {
        title: [ { required: true, message: "文章标题不能为空", trigger: "blur" } ],
        content: [ { required: true, message: "文章内容不能为空", trigger: "change" } ],
        describe: [ { required: true, message: "文章描述不能为空", trigger: "blur" } ],
        c_id: [ { required: true, message: "文章分类不能为空", trigger: "change" } ],
      },
      contentEditor: null,
      editorMenus: [
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
          'editorImgMenu',
          'editorVideoMenu',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
      ],
      categoryOptions: []
    }
  },
  created(){
    this.getAssistCategoryIndex();
  },
  mounted(){
  },
  methods: {
    handleChange(val){
      this.formData.keywords = val.join(',');
    },
    getAssistCategoryIndex(){
      getAssistCategoryIndex().then(res => {
        if(res.code == 200){
          this.categoryOptions = res.data.list;
        }
      })
    },
    onChangeClassify(val){
      this.formData.c_id = val[val.length - 1]
    },
    modalCancel(){
      this.initFormData();
      this.showModal = false;
    },
    setCheckedCid(){
      let seleckedKeys = [];
      if(this.formData.c_id){
        this.mapOpenKey(this.categoryOptions, this.formData.c_id, []).forEach(item => {
          seleckedKeys.push(item.id)
        })
      }
      this.defaultCategory = seleckedKeys;
    },
    mapOpenKey(arr, id, path = []){
      let paths;
      for(let i = 0; i < arr.length; i++){
        let item = arr[i];
        if(item.id == id ){
          paths = [...path, item]
          break;
        }else{
          if(item.subs){
            paths = this.mapOpenKey(item.subs, id, [...path, item])
            if(paths){
              break;
            }
          }
        }
      }
      return paths
    },
    initFormData(){
      this.formData = JSON.parse(JSON.stringify(defaultFormData));
      this.defaultKeywords = [];
      this.defaultCategory = [];
    },
    showAction(data){
      this.showModal = true;
        if(data){
          this.formData = JSON.parse(JSON.stringify(data));
          if(data.keywords){
            this.defaultKeywords = data.keywords.split(',')
          }
          this.setCheckedCid();
        }else{
          this.initFormData();
        }
      this.$nextTick(() => {
        this.initEditor();
      })
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
          clickHandler() {
              // 做任何你想做的事情
              // 可参考【常用 API】文档，来操作编辑器
              _this.checkVideo(editorName);
          }tryChangeActive() {
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
    initEditor(){
      this.contentEditor = new E('#content');
      this.contentEditor.config.menus = this.editorMenus;
      this.contentEditor.menus.extend('editorImgMenu', this.initImgBtn('contentEditor'))
      // 将菜单加入到 editor.config.menus 中
      // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
      this.contentEditor.menus.extend('editorVideoMenu', this.initVideoBtn('contentEditor'))
      this.contentEditor.config.zIndex = 500
      this.contentEditor.create();

      if(this.formData.content){
        this.contentEditor.txt.html(this.formData.content)
      }
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
          let img = `<img src="${res.selectedImgs[0].url}" />`
          this[editor].cmd.do('insertHTML', img)
        }
      });
    },
    edit(){
      this.saveLoading = true;
      assistEdit(this.formData).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg);
          this.$emit('addOrEditOk');
          this.showModal = false;
        }
      }).finally(() => {
        this.saveLoading = false;
      })
    },
    add(){
      this.saveLoading = true;
      assistAdd(this.formData).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg);
          this.$emit('addOrEditOk');
          this.showModal = false;
        }
      }).finally(() => {
        this.saveLoading = false;
      })
    },
    save(){
      this.saveLoading = true;
      this.formData.content = this.contentEditor.txt.html();
      this.$refs.form.validate(valid => {
        if(valid){
          if(this.formData.id){
            // 编辑
            this.edit();
          }else{
            // 新增
            this.add();
          }
        }else{
          this.saveLoading = false;
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-input-affix-wrapper .ant-input:not(:last-child){
  padding-right: 60px;
}
</style>