<template>
  <div class="image-slider one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <swiper class="swiper" ref="mySwiper" v-if="componentValue.content.content_arr.length>0" :options="swiperOptions">
        <swiper-slide class="swiper-slide" 
          :data-swiper-autoplay="speed" 
          v-for="(item, index) in componentValue.content.content_arr" 
          :key="index"
        >
          <img v-if="item.bg_image.image.url" :key="index" :src="item.bg_image.image.url" alt="">
          <img v-else :key="index" src='@/assets/img/renovation/banner.png' alt="">
        </swiper-slide>
      </swiper>
      <div class="custom-paging" :class="getBannerDotStyleClass()">
        <div class="number" v-if="componentValue.element_style.style == 3">{{current+1}}/{{componentValue.content.content_arr.length}}</div>
        <div class="one-dot" 
          v-else 
          v-for="(item, index) in componentValue.content.content_arr" 
          :class="{active: current == index}" :style="getDotStyle(index)" :key="index"
          @click="onClickSlide(index)"
        >
        </div>
      </div>
    </div>

    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, EffectCoverflow } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay, EffectCoverflow])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
import 'swiper/swiper-bundle.css'
export default {
  name: 'ImageSlider',
  components: {Swiper, SwiperSlide},
  props: {
    componentData: {
      type: Object
    },
    viewWidth: {
      type: Number,
      default: 375
    }
  },
  data(){
    return {
      current: 0,
    }
  },
  computed: {
    componentValue(){
      return this.componentData.getMyValue().data
    },
    speed(){
      return this.componentValue.element_style.speed * 1000
    },
    swiperOptions(){
      let _this = this;
      let option = {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        allowTouchMove: false, // 禁止手动滑动
        autoplay: {
          delay: _this.speed,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        on: {
          slideChange:function (){
            _this.onAfterChange(this.realIndex)
          },
        }
      }
      if(this.$refs.mySwiper){
        if(this.speed==0){
          this.$refs.mySwiper.$swiper.autoplay.stop()
        } else {
          this.$refs.mySwiper.$swiper.autoplay.start()
        }
      }
      return option
    },
  },
  mounted(){
    this.$nextTick(() => {
      this.initStyle()
    })
  },
  methods: {
    initStyle(){
      if(this.$refs.mySwiper){
        if(this.speed == 0){
          this.$refs.mySwiper.$swiper.autoplay.stop()
        }else{
          this.$refs.mySwiper.$swiper.autoplay.start()
        }
      }
    },
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getBannerDotStyleClass(){
      return {1:'left',2:'middle',3:'right'}[this.componentValue.element_style.position]+' '+{1:'round-corner',2:'round',3:''}[this.componentValue.element_style.style]
    },
    onAfterChange(current){
      this.current = current;
    },
    getDotStyle(index){
      return {
        'background-color': this.current == index?this.componentValue.element_style.checked_color:this.componentValue.element_style.default_color
      }
    },
    getComponentStyle(data){
      return {
        'padding': `${data.margin_top}px ${data.margin_left_and_right}px ${data.margin_bottom}px`,
      }
    },
    getContentStyle(data){
      let style = {
        'border-radius': `${data.border_radio_top}px ${data.border_radio_top}px ${data.border_radio_bottom}px ${data.border_radio_bottom}px`,
        'background-color': data.bg_color,
      }
      if (this.componentValue.content.content_arr[0] && this.componentValue.content.content_arr[0].bg_image.image.url){
        style.height = this.viewWidth/this.componentValue.content.content_arr[0].bg_image.image.size[0]*this.componentValue.content.content_arr[0].bg_image.image.size[1]+'px';
      } else {
        style.height = '152px';
      }
      return style
    },
    onClickSlide(index){
      this.current = index;
      this.$refs.mySwiper.$swiper.slideToLoop(index)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.content {
  position: relative;
  overflow: hidden;
  .swiper {
    display: block;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .custom-paging {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 30px;
    z-index: 2;
    &.middle {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end;
    }
    &.round-corner {
      .one-dot.active {
        width: 16px;
      }
    }
    .one-dot {
      width: 5px;
      height: 5px;
      background-color: white;
      border-radius: 2.5px;
      margin: 0 2px;
      transition: background-color .2s, width .2s;
      cursor: pointer;
      &.active {
        background-color: red;
      }
    }
    .number {
      font-size: 9px;
      line-height: 15px;
      height: 15px;
      padding: 0px 5px;
      background-color: rgba(0,0,0,0.54);
      color: white;
      border-radius: 15px;
    }
  }
}
</style>