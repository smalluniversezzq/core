<template>
  <div class="page-diy-box">
    <template v-if="dataReady">
      <div style="width:306px;"></div>
      <preview-area 
        ref="previewArea" 
        :navDataManager="navDataManager"
      ></preview-area>
      <config-area ref="configArea" :configAreaData="navDataManager"></config-area>
    </template>
    <a-spin class="a-spin" size="large" v-else tip="布置装修中..."></a-spin>
    <a-spin class="page-spin" :spinning="spinning" tip="数据保存中..."></a-spin>

    <a-card class="bottom-box">
      <a-space>
        <byf-icon class="byf-icon" type="iconfenxiangbeifen"></byf-icon>
        <span class="title">导航装修：{{navDataManager.title}}</span>
      </a-space>
      <a-space class="right" size="large">
        <a-button size="large" type="danger" :loading="saveLoading" @click="doSave">保存模板</a-button>
        <a-button size="large" @click="goBack">返回列表</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script>
import ConfigArea from '@/components/byf/renovation/pageDiy/views/configArea/index.vue'
import PreviewArea from './previewArea'
import {getAdminPlatformDesignElements, getAdminPlatformDesignNavEdit, getAdminPlatformDesignNavDetail} from '../../services/admin/platform/designPage'

import NavDataManager from '@/components/byf/renovation/dataManager/navDataManager/index.js'
import html2canvas from 'html2canvas';

export default {
  name: 'NavDiy',
  components: { ConfigArea,PreviewArea},
  data(){
    return {
      saveLoading: false,
      // 底部导航装修数据对象
      navDataManager: {},
      dataReady: false,
      canvasImg: '',
      spinning: false,
    }
  },
  created(){
    this.initData();

  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    /**
     * 初始化数据，拿管理类数据->拿配置值
     */
    initData(){
      // 初始化装修页面使用的全局页面对象
      this.navDataManager = new NavDataManager(this.$route.query.id)
      getAdminPlatformDesignElements({page_type:this.$route.query.pageType}).then(res=>{
        if(res.code == 200) {
          this.navDataManager.initWidgets(res.data.global)
          // 此时，基于组件的描述数据，已初始化完成控件
          // 但其实有些 容器类型控件中（比如拖拽排序控件）的 子控件，只有拿到组件详情后才会构建。
          this.getNavPreviewData()
        }
      })
    },
    /**
     * 获取导航装修预览区数据
     */
    getNavPreviewData(){
      getAdminPlatformDesignNavDetail({id:this.navDataManager.id}).then(detail=>{
        if(detail.code == 200) {
          console.log('navDataManager: ', this.navDataManager)
          // 更新页面的详情
          this.navDataManager.updatePageDetail(detail.data)
          // 开启控件联动 管理器
          this.navDataManager.widgetLinkageManager.start()
          this.dataReady = true;
        } else {
          this.goBack()
        }
      })
    },
    saveImg(){
      this.spinning = true;
      setTimeout(() => {
        // this.spinning = false;
        let canvasImageWrap = document.getElementById('nav-wrap')
        console.time('截屏')
        console.log('111')
        html2canvas(canvasImageWrap, {
          useCORS: true,
          allowTaint: true,
          ignoreElements: (ele)=>{
          //eslint-disable-next-line
            let whiteTags = ['head', 'body', 'html', 'style', 'link']
            let blackTags = ['svg']
            if(blackTags.includes(ele.nodeName)){
              return true
            }
            if(!whiteTags.includes(ele.nodeName)){
              if(ele.parentNode.nodeName=='BODY') {
                if(!ele.firstElementChild) {
                  return true
                } else if(!ele.firstElementChild.classList.contains('preview-drawer')) {
                  return true
                }
              }
            }
          },
        }).then((canvas) => {
            console.timeEnd('截屏')
            let oImg = new Image();
            oImg.src = canvas.toDataURL();  // 导出图片
            this.canvasImg = oImg.src;
            this.spinning = false;
        });
      }, 300);
    },
    /**
     * 保存模板装修数据
     */
    doSave(){
      this.spinning = true;
      setTimeout(() => {
        // this.spinning = false;
        let canvasImageWrap = document.getElementById('nav-wrap')
        let iconBoxes = document.getElementsByClassName('icon-box');
        console.log(iconBoxes)
        iconBoxes.forEach(item => {
          item.style.left = '-5px';
        })
        console.time('截屏')
        html2canvas(canvasImageWrap, {
          useCORS: true,
          ignoreElements: (ele)=>{
          //eslint-disable-next-line
            let whiteTags = ['head', 'body', 'html', 'style', 'link']
            let blackTags = ['svg']
            if(blackTags.includes(ele.nodeName)){
              return true
            }
            if(!whiteTags.includes(ele.nodeName)){
              if(ele.parentNode.nodeName=='BODY') {
                if(!ele.classList.contains('page-diy-box')) {
                  return true
                }
              }
            }
            // console.log('不禁止：', ele)
          },
        }).then((canvas) => {
            console.timeEnd('截屏')
            let oImg = new Image();
            oImg.src = canvas.toDataURL();  // 导出图片
            this.canvasImg = oImg.src;
            let params = {
              id: this.navDataManager.id, 
              preview: this.canvasImg,
              global: {
                data: this.navDataManager.getMyValue(),
                key: 'NavGlobal'
              }
            }
            iconBoxes.forEach(item => {
              item.style.left = '0px';
            })
            getAdminPlatformDesignNavEdit(params).then(res=>{
              this.spinning = false;
              if(res.code==200) {
                this.$message.success(res.msg)
                this.$router.go(-1)
              }
            }).catch(err=>{
              this.spinning = false;
              console.log('err: ', err)
            })
        });
      }, 300);

    }
  },
  destroyed(){    
    // 关闭控件联动 管理器
    this.navDataManager.widgetLinkageManager.close()
  }
}
</script>

<style lang="less" scoped>
.page-diy-box{
  background: @background-color-light;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-bottom: 56px;
  .a-spin {
    width: 100%;    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    /deep/ .ant-card-body {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .byf-icon {
        font-size: 30px;
      }
      .title {
        font-size: @font-size-lg;
      }
    }

  }
}
.page-spin{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding-top: 45vh;
}
</style>