<template>
  <div class="phone-box">
    <div id="previewContent" ref="previewContent" class="preview-content">
      <div class="content" :style="getContentStyle()"> 
        <div class="image-slider3D-bg">
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
        <div class="components-list" ref="componentsList">
          <component 
            v-for="(item) in previewComponents" 
            :key="item.previewKey" 
            :is="item.getComponentName()" 
            :viewWidth="354"
            :componentData="item" 
            @imageSlider3DChange="imageSlider3DChange"
          ></component>
        </div>
      </div>
    </div>
    <img class="preview-phone-bg" src="@/assets/img/platformSetting/phone-bg.png" alt="">
  </div>
</template>

<script>
import AllComponents from './../components'
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, EffectFade } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay, EffectFade])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
import 'swiper/swiper-bundle.css'
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
  },
  mounted(){
  },
  methods: {
    getBgImgStyle(data){
      console.log('getBgImgStyle')
      let w = data.bg_image[0], h = data.bg_image[1];
      let scale = w / h;
      let size = '';
      if(scale > 1){
        // 宽度大于高度,以高度为准
        size = 'height';
      }else{
        // 否则以宽度为准
        size = 'width';
      }
      return {
        'width': `${size == 'width' ? '100%' : ''}`,
        'height': `${size == 'height' ? '100%' : ''}`
      }
    },
    deleteSwiper(){
      this.imageSlider3DData = [];
    },
    getSlideItemStyle(data){
      let bgColor = '', height = 0, borderRadius = '';
      if(data.bg_color && this.imageSliderKey == 1){
        bgColor = data.bg_color
        borderRadius = '60% 20%'
      }
      let itemBox = document.querySelector('#previewContent #slideWrap')
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
  }
}
</script>

<style lang="less" scoped>

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
.box {
  .phone-box {
    margin: 0 auto;
    width: 399px;
    position: relative;
    .preview-phone-bg {
      width: 100%;
      position: relative;
      z-index: 1;
      pointer-events: none;
    }
    .preview-content {
      // width: 295px;
      position: absolute;
      // background: burlywood;
      top: 67px;
      bottom: 21px;
      left: 23px;
      right: 22px;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width: 0;
      }
    }
  }
}
</style>