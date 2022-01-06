<template>
  <div class="preview-area">
    <div class="content" :style="getContentStyle()"> 
      <div class="image-slider3D-bg" id="image-slider3D-bg">
        <swiper v-if="imageSlider3DData.length > 0" class="swiper" ref="mySwiperImageSlider3DSwiper" :options="swiperOptions">
          <swiper-slide class="swiper-slide" 
            v-for="(item, index) in imageSlider3DData" 
            :key="index">
            <div class="slide-item-box" :style="getSlideItemStyle(item)">
              <img v-if="imageSliderKey == 2" :style="getBgImgStyle(item)" :src="item.bg_image.url">
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="bg-imgs" v-if="bg_image.value.key == 1">
        <template v-for="(item, index) in bg_image.optional[1].children.bg_image_arr.list">
          <img :key="index" :src="item.widgets.bg_image.image.url" alt="">
        </template>
      </div>
      <img class="status-bar" src="@/assets/img/renovation/Status_Bar.png" alt="">
      <div class="components-list" ref="componentsList">
        <!-- 顶部区域的组件 -->
        <component 
          :class="{'active-preview-component': pageDataManager.editingTarget == item}"
          v-for="(item) in topComponent" 
          :key="item.previewKey" 
          :is="item.getComponentName()" 
          :componentData="item" 
          @click.native="onClickComponent(item)"
          @deleteComponent="onDelete"
          @imageSlider3DChange="imageSlider3DChange"
          @deleteSwiper="deleteSwiper"
        ></component>
        <!-- 普通区域的组件 -->
        <div ref="sortableList">
          <component 
            :class="{'active-preview-component': pageDataManager.editingTarget == item}"
            v-for="(item) in normalComponent" 
            :key="item.previewKey" 
            :is="item.getComponentName()" 
            :componentData="item" 
            @click.native="onClickComponent(item)"
            @deleteComponent="onDelete"
          ></component>
        </div>
        <!-- 底部区域的组件 -->
        <component 
          :class="{'active-preview-component': pageDataManager.editingTarget == item}"
          v-for="(item) in bottomComponent" 
          :key="item.previewKey" 
          :is="item.getComponentName()" 
          :componentData="item" 
          @click.native="onClickComponent(item)"
          @deleteComponent="onDelete"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import AllComponents from './components'
import Sortable from "sortablejs";
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, EffectFade } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay, EffectFade])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
import 'swiper/swiper-bundle.css'
import VerifyManager from '@/components/byf/renovation/dataManager/verifyManager/VerifyManager.js'


export default {
  components: {...AllComponents, Swiper, SwiperSlide},
  props: {
    previewComponents: {
      type: Array
    },
    pageDataManager: {
      type: Object
    }
  },
  data(){
    return {
      ...this.pageDataManager.configBoxs.content_style.widgets_list,
      sortable: {},
      imageSlider3DData: [],
      imageSliderKey: 1
    }
  },
  created(){
    VerifyManager.instance.bindPreviewArea(this)
  },
  computed: {
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
    /**
     * 属于顶部区域的组件
     */
    topComponent(){
      let arr = []
      for(let i = 0;i<this.previewComponents.length;i++){
        if(this.previewComponents[i].sortWeight>0){
          arr.push(this.previewComponents[i]);
        } else {
          break;
        }
      }
      return arr;
    },
    /**
     * 属于普通区域的组件
     */
    normalComponent(){
      let arr = []
      for(let i = 0;i<this.previewComponents.length;i++){
        if(this.previewComponents[i].sortWeight==0){
          arr.push(this.previewComponents[i]);
        } else if(this.previewComponents[i].sortWeight<0){
          break;
        }
      }
      return arr;
    },
    /**
     * 属于底部区域的组件
     */
    bottomComponent(){
      let arr = []
      for(let i = this.previewComponents.length-1;i>=0;i--){
        if(this.previewComponents[i].sortWeight<0){
          arr.push(this.previewComponents[i]);
        } else {
          break;
        }
      }
      return arr;
    }
  },
  mounted(){
    this.initSortable()
  },
  methods: {
    getBgImgStyle(){
      return {
        width: '100%',
        height: '100%'
      }
      // let w = data.bg_image[0], h = data.bg_image[1];
      // let scale = w / h;
      // let size = '';
      // if(scale > 1){
      //   // 宽度大于高度,以高度为准
      //   size = 'height';
      // }else{
      //   // 否则以宽度为准
      //   size = 'width';
      // }
      // return {
      //   'width': `${size == 'width' ? '100%' : ''}`,
      //   'height': `${size == 'height' ? '100%' : ''}`
      // }
    },
    deleteSwiper(){
      this.imageSlider3DData = [];
    },
    get3DbgStyle(){
      let itemBox = document.getElementById('slideWrap');
      return {
        'height': `${itemBox.offsetTop + itemBox.offsetHeight}px`
      }
    },
    getSlideItemStyle(data){
      let bgColor = '', height = 0, borderRadius = '';
      if(data.bg_color && this.imageSliderKey == 1){
        bgColor = data.bg_color
        borderRadius = '60% 20%'
      }
      let itemBox = document.getElementById('slideWrap');
      if(itemBox){
        if(this.imageSliderKey == 1){
          height = itemBox.offsetTop + itemBox.offsetHeight / 2 + itemBox.offsetHeight / 4;
        }else{
          height = itemBox.offsetTop + itemBox.offsetHeight;
        }
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
      if(this.$refs.mySwiperImageSlider3DSwiper){
        this.$refs.mySwiperImageSlider3DSwiper.$swiper.slideTo(data.current)
      }
    },
    onClickComponent(data){
      this.$emit('changeEditingTarget', data)
    },
    onDelete(component){
      this.pageDataManager.deleteOneComponent(component)
    },
    getContentStyle(){
      return {
        'background-color': this.bg_color.value
      }
    },
    initSortable(){
      this.sortable = new Sortable(this.$refs.sortableList,{
        filter: '.filtered',
        animation: 150,
        onEnd: (e)=>{
          this.pageDataManager.swapTwo(e.oldIndex+this.topComponent.length, e.newIndex+this.topComponent.length)
        }
      })
    }
  },
  destroyed(){
    VerifyManager.instance.onPreviewAreaDestroyed();
  }
}
</script>

<style lang="less" scoped>
.preview-area {
  height: 100%;
  width: 455px;
  min-width: 455px;
  padding: 40px 40px 20px;
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .content {
    min-height: 667px;
    background: rgba(9, 12, 211, 0.185);
    box-shadow: @shadow-2;
    position: relative;
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
    .status-bar {
      width: 94%;
      margin-left: 3%;
      position: relative;
      z-index: 1;
    }
  }
}
.image-slider3D-bg{
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 0;
  .slide-item-box{
    width: 100%;
    // height: 500px;
    height: 100%;
    img{
      height: 100%;
    }
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
</style>