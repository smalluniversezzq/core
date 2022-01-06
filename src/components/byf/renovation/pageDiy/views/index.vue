<template>
  <div class="page-diy-box">
    <template v-if="dataReady">
      <components-list-area 
        v-if="pageDataManager.componentsClassifyList" 
        :componentsClassifyList="pageDataManager.componentsClassifyList" 
        :selectedComponentsList="pageDataManager.selectedComponentsList"
        :selectedComponentsNumList="pageDataManager.selectedComponentsNumList"
        @chooseOneComponent="onChooseOneComponent"
      ></components-list-area>
      <preview-area 
        ref="previewArea" 
        v-if="pageDataManager.selectedComponentsList" 
        :previewComponents="pageDataManager.selectedComponentsList"
        :pageDataManager="pageDataManager"
        @changeEditingTarget="onChangeEditingTarget"
      ></preview-area>
      <config-area ref="configArea" 
        v-if="pageDataManager.editingTarget" 
        :configAreaData="pageDataManager.editingTarget"
        :pageDataManager="pageDataManager"
      ></config-area>
    </template>

    <a-spin class="a-spin" size="large" v-else tip="布置装修中..."></a-spin>
    <a-spin class="page-spin" :spinning="spinning" tip="数据保存中..."></a-spin>

    <a-card class="bottom-box">
      <a-space>
        <byf-icon class="byf-icon" type="iconfenxiangbeifen"></byf-icon>
        <span class="title text-overflow-1" :title="pageDataManager.title">{{pageFooterTitle}}</span>
      </a-space>
      <a-space class="right" size="large">
        <a-button size="large" type="primary" @click="onChangeEditingTarget(pageDataManager)">页面设置</a-button>
        <a-button size="large" type="danger" @click="openDrawer">预览保存</a-button>
        <a-button size="large" @click="goBack">返回列表</a-button>
      </a-space>
    </a-card>
    
    <a-drawer class="preview-drawer" 
      :closable="true"
      @close="closeDrawer" :visible="drawerVisible" width="500">
        <template slot="title">
          <div class="title-box">
            <span>页面预览</span>
          </div>
        </template>
        <div class="box" id="box">
          <preview
            id="preview"
            v-if="pageDataManager.selectedComponentsList" 
            :previewComponents="pageDataManager.selectedComponentsList"
            :pageDataManager="pageDataManager"></preview>
        </div>
        <div class="footer-btns">
          <a-button size="large" class="btn" type="danger" :loading="spinning" @click="doSave">保存模板</a-button>
          <!-- <a-button @click="closeDrawer">取消</a-button> -->
        </div>
    </a-drawer>
  </div>

</template>

<script>
// 支持传参 id, pageType, 添加预览区域顶部插槽。添加修改editingtarget方法。
import ComponentsListArea from './componentsListArea'
import ConfigArea from './configArea'
import PreviewArea from './previewArea'
import { getAdminPlatformDesignElements, getAdminPlatformDesignEdit,getAdminPlatformDesignDetail} from '../../services/admin/platform/designPage'
import { getAdminUserUserLevelGetAllLevel } from '@/components/byf/renovation/services/admin/user/userLevel'
import { PageTypeKeyMap, DeviceTypeKeyMap, ApplyOs } from '@/components/byf/renovation/common'
import PageDataManager from '@/components/byf/renovation/dataManager/pageDataManager/index.js'
import preview from '@/components/byf/renovation/pageDiy/views/previewArea/common/preview.vue'
import html2canvas from 'html2canvas';
import AllComponents from './previewArea/components'

export default {
  name: 'PageDiy',
  components: {
    ComponentsListArea, 
    ConfigArea, 
    PreviewArea, 
    ...AllComponents,
    preview
  },
  data(){
    return {
      saveLoading: false,
      pageDataManager: {},
      drawerVisible: false,
      dataReady: false,
      canvasImg: '',
      imageSlider3DData: [],
      imageSliderKey: 1,
      spinning: false,
    }
  },
  computed:{
    pageFooterTitle(){
      let query = this.$route.query;
      let title = `页面装修：${this.pageDataManager.title}`
      if(query.deviceType){
        let deviceType = DeviceTypeKeyMap[query.deviceType]
        let pageType = PageTypeKeyMap[query.pageType]
        let applyOs = '';
        if(query.applyOs.length){
          let applyOss = [];
          if(Array.isArray(query.applyOs)){
            applyOss = [...query.applyOs]
          }else{
            applyOss = [query.applyOs]
          }
          applyOss.forEach((item, index) => {
            if(index > 0){
              applyOs += '、'
            }
            applyOs += ApplyOs[item]
          })
        }
        title = `${pageType}-${deviceType}${applyOs ? '（ ' + applyOs + ' ）' : ''}：${this.pageDataManager.title}`;
      }
      return title;
    },
    bg_image(){
      let bg_image = {};
      if(this.pageDataManager.configBoxs && this.pageDataManager.configBoxs.content_style && this.pageDataManager.configBoxs.content_style.widgets_list){
        bg_image = this.pageDataManager.configBoxs.content_style.widgets_list.bg_image
      }
      return bg_image
    },
    swiperOptions(){
      return {
        loop: false,
        effect : 'fade',
        centeredSlides: true,
        slidesPerView: 'auto',
        fadeEffect: {
          crossFade: true,
        }
      }
    },
  },
  created(){
    this.initData();

  },
  methods: {
    /**
     * 3d轮播部分代码
     */
    getSlideItemStyle(data){
      let bgColor = '', height = 0, borderRadius = '';
      if(data.bg_color && this.imageSliderKey == 1){
        bgColor = data.bg_color
        borderRadius = '60% 20%'
      }
      let itemBox = document.getElementById('slideWrap')
      if(itemBox){
        height = itemBox.offsetTop + (itemBox.offsetHeight * 50 / 100);
      }
      return {
        'background-color': bgColor,
        'height': `${height}px`,
        'border-bottom-left-radius': borderRadius,
        'border-bottom-right-radius': borderRadius
      }
    },
    imageSlider3DChange(data){
      this.imageSlider3DData = data.data;
      this.imageSliderKey = data.key;
      if(this.$refs.mySwiperImageSlider3DSwiper1){
        this.$refs.mySwiperImageSlider3DSwiper1.$swiper.slideTo(data.current)
      }
    },
    getContentStyle(){
      let bgColor = ''
      if(this.pageDataManager.configBoxs && this.pageDataManager.configBoxs.content_style){
        bgColor = this.pageDataManager.configBoxs.content_style.widgets_list.bg_color.value;
      }
      return {
        'background-color': bgColor
      }
    },
    /**
     * 3d轮播部分代码End
     */
    goBack(){
      this.$confirm({
        title:'确认离开？',
        content: '系统可能不会保存您所做的更改',
        cancelText: '取消',
        okText: '确认',
        onOk: ()=>{
          this.$router.go(-1)
        }
      })
    },
    /**
     * 初始化数据，拿组件列表->拿模板详情
     */
    async initData(){
      // 初始化装修页面使用的全局页面对象
      this.pageDataManager = new PageDataManager(this.$route.query.id)
      if(this.$route.query.pageType != 5){
        // 不是商户端的时候调用此接口，注意需要同步保证后续初始化
        await getAdminUserUserLevelGetAllLevel();
      }
      getAdminPlatformDesignElements({id: this.pageDataManager.id,page_type: this.$route.query.pageType}).then(res=>{
        if(res.code == 200) {
          // 初始化页面可用组件
          this.pageDataManager.initUsableComponents(res.data)
          getAdminPlatformDesignDetail({id:this.pageDataManager.id}).then(detail=>{
            if(detail.code == 200) {
              // console.log('pageDataManager: ', this.pageDataManager)
              // 更新页面的详情
              this.pageDataManager.updatePageDetail(detail.data)
              this.dataReady = true
            } else {
              this.goBack()
            }
          })
        }
      })
    },
    /**
     * 添加组件事件
     * @param [object] data 组件管理类数据
     */
    onChooseOneComponent(data){
      // 往预览中添加一个组件
      let editingTarget = this.pageDataManager.addOneComponentToSelected(data)
      this.$refs.configArea.refreshActiveKey(editingTarget)
    },
    /**
     * 切换编辑的对象
     */
    onChangeEditingTarget(data){
      this.pageDataManager.changeEditingTarget(data)
      this.$refs.configArea.refreshActiveKey(data)
    },
    /**
     * 关闭遮罩层
     */
    closeDrawer(){
      this.drawerVisible = false;
    },
    openDrawer(){
      this.doVerify()
      if(localStorage.getItem('renovationRequireVerify') != 'fail') {
        // 当必填项校验通过后，才弹出手机预览
        this.drawerVisible = true;
      }
    },
    /**执行验证 */
    doVerify(){
      this.pageDataManager.doVerify()
    },
    /**
     * 保存模板装修数据
     */
    doSave(){
      document.getElementById('previewContent').scrollTop = 0
      this.spinning = true;
      setTimeout(() => {
        // this.spinning = false;
        let canvasImageWrap = document.getElementById('previewContent')
        // 设置个人中心会员图标样式保证截图位置不错位
        let personalLevelIcon = document.getElementsByClassName('level-icon');
        if(personalLevelIcon && personalLevelIcon[1]){
          personalLevelIcon[1].style['margin-top'] = '-4px';
        }
        html2canvas(canvasImageWrap, {
          useCORS: true,
          //eslint-disable-next-line
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
            let oImg = new Image();
            oImg.src = canvas.toDataURL();  // 导出图片
            this.canvasImg = oImg.src;
            let params = {
              id: this.pageDataManager.id, 
              title: this.pageDataManager.title, 
              global: {
                data: this.pageDataManager.getMyValue(),
                key: 'PageGlobal',
              },
              elements: this.pageDataManager.getMyComponentsValue(),
              preview: this.canvasImg
            }
            if(personalLevelIcon && personalLevelIcon[1]) {
              personalLevelIcon[1].style['margin-top'] = '0px';
            }
            getAdminPlatformDesignEdit(params).then(res=>{
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

      // this.saveLoading = true
      // let params = {
      //   id: this.pageDataManager.id, 
      //   title: this.pageDataManager.title, 
      //   global: {
      //     data: this.pageDataManager.getMyValue(),
      //     key: 'PageGlobal',
      //   },
      //   elements: this.pageDataManager.getMyComponentsValue()
      // }
      // getAdminPlatformDesignEdit(params).then(res=>{
      //   if(res.code==200) {
      //     this.$message.success(res.msg)
      //     this.$router.go(-1)
      //   } else {
      //     this.saveLoading = false
      //   }
      // }).catch(err=>{
      //   console.log('err: ', err)
      //   this.saveLoading = false
      // })
    }
  },
  destroyed(){    
    // 关闭控件联动 管理器
    this.pageDataManager.widgetLinkageManager.close()
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
        display: inline-block;
        max-width:700px;
      }
    }

  }
}
.preview-drawer {
  /deep/.ant-drawer-close{
    height: 100%;
    line-height: 100%;
  }
  .footer-btns{
    width: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 10px 0;
    background: rgba(0, 0, 0, .6);
    z-index: 10;
    text-align: center;
    .btn{
      margin: 0 auto;
    }
  }
  // .box {
  //   .phone-box {
  //     margin: 0 auto;
  //     width: 337px;
  //     position: relative;
  //     .preview-phone-bg {
  //       width: 100%;
  //       position: relative;
  //       z-index: 1;
  //       pointer-events: none;
  //     }
  //     .preview-content {
  //       // width: 295px;
  //       position: absolute;
  //       // background: burlywood;
  //       top: 50px;
  //       bottom: 21px;
  //       left: 23px;
  //       right: 22px;
  //       // overflow-x: hidden;
  //       // overflow-y: scroll;
  //       &::-webkit-scrollbar{
  //         width: 0;
  //       }
  //     }
  //   }
  // }
  /deep/.ant-drawer-header{
    padding-top: 10px;
    padding-bottom: 10px;
  } 
  .title-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .drawer-btns{
    text-align: center;
    padding-top: 20px;
  }
}

.bg-imgs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.image-slider3D-bg{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 0;
  .slide-item-box{
    width: 100%;
    height: 500px;
  }
  .bg-border-radius{
    position: relative;
    &:after{
      width: 140%;
      height: 100%;
      position: absolute;
      left: -20%;
      bottom: 0px;
      content: '';
      border-radius: 0 0 50% 50%;
      // background: #000;
      overflow: hidden;
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