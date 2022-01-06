<template>
  <div class="editor">
    <div ref="editor" v-html="editorContent"></div>
  </div>
</template>

<script>
import E from "wangeditor";
const { BtnMenu } = E

export default {
  name: "RichEditor",
  props: {
    content: {
      type: String,
      default: ()=>{return ''}
    }
  },
  data() {
    return {
      editor: "",
      editorContent: this.content
    };
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      this.editor = new E(this.$refs.editor);
      this.setMenus(); // 配置菜单
      this.editor.menus.extend('editorImgMenu', this.initImgBtn('editor'))
      this.editor.menus.extend('editorVideoMenu', this.initVideoBtn('editor'))
      this.editor.config.zIndex = 500
      this.editor.config.onchange = () => {
        this.$emit("changelHtml", this.editor.txt.html());
      };
      this.editor.create(); // 创建
      // 将自带的图片选择菜单放置到菜单栏第一位，然后隐藏此图片按钮。因为要使用自定义的图片选择效果，并且要有可控制图片大小的功能，所以框架自带的图片按钮必须配置。
      this.editor.$toolbarElem.elems[0].children[0].style.display = 'none'

      // 美化滚动条
      this.editor.$textElem.elems[0].classList.add('beauty-scroll')
      // 编辑区域容器的position不能是relative，不然，图片太大时，拉伸图片的尺寸控制展示位置可能会异常
      this.editor.$textElem.elems[0].style.position = 'static';
    },
    // 设置菜单
    setMenus() {
      this.editor.config.menus = [
        "image", // 插入图片
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        'indent',
        'lineHeight',
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        'editorImgMenu',
        'editorVideoMenu',
        "table", // 表格
        // "video", // 插入视频
        "code", // 插入代码
        'splitLine',
        "undo", // 撤销
        "redo" // 重复
      ];
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
    //获取编辑器内容
    getHtml() {
      return this.editor.txt.html();
    },
    //将内容写入编辑器
    setHtml(txt) {
      this.editor.txt.html(txt);
    },
    checkImage(editor){
      this.$byfUpload({multiple: false, imgsList: []}).then(res => {
        if (res.action == 'confirm') {
          let img = `<img src="${res.selectedImgs[0].url}" />`
          this[editor].cmd.do('insertHTML', img)
        }
      });
    },
    checkVideo(editor){
      this.$byfUploadVideo({videosList: []}).then(res => {
        if (res.action == 'confirm') {
          this.videoList = [];
          res.selectedVideos.forEach(item => {
            this.videoList.push(item)
          });
          console.log(res.selectedVideos)
          let video = `<video controls style="width: 100%;" poster="${res.selectedVideos[0].cover}" src="${res.selectedVideos[0].url}" />`
          this[editor].cmd.do('insertHTML', video)
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>
.editor {
  /deep/.w-e-toolbar {
    flex-wrap: wrap;
    .w-e-menu {
      line-height: normal;
    }
    .w-e-droplist {
      z-index: 99999;
    }
  }
}
</style>