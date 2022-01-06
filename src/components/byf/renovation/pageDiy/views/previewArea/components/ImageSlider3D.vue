<template>
  <div id="slideWrap" class="image-slider-3d one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <swiper class="swiper" ref="mySwiper" v-if="componentValue.content.bg_style.bg_style_arr.length>0" :options="swiperOptions">
        <swiper-slide class="swiper-slide" 
        :data-swiper-autoplay="speed" 
        ref="swiper-slide"
        v-for="(item, index) in componentValue.content.bg_style.bg_style_arr" 
        :key="index">
          <img v-if="item.image.url != ''" style="width: 100%;height: 100%" :src="item.image.url">
          <img v-else style="width: 100%;height: 100%" src="@/assets/img/renovation/banner.png" alt="">
        </swiper-slide>
      </swiper>
      <div class="custom-paging" :class="getBannerDotStyleClass()">
        <div class="number" v-if="componentValue.element_style.style == 3">{{current+1}}/{{componentValue.content.bg_style.bg_style_arr.length}}</div>
        <div class="one-dot" 
          v-else 
          v-for="(item, index) in componentValue.content.bg_style.bg_style_arr" 
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
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
  name: 'ImageSlider3D',
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
      current:0,
    }
  },
  computed: {
    swiperOptions(){
      let _this = this;
      if(this.$refs.mySwiper){
        if(this.speed == 0){
          this.$refs.mySwiper.$swiper.autoplay.stop()
        }else{
          this.$refs.mySwiper.$swiper.autoplay.start()
        }
      }
      return {
        allowTouchMove: false, // 禁止手动滑动
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
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
    },
    componentValue(){
      this.$emit('imageSlider3DChange', {
        current: this.current, 
        data: this.componentData.getMyValue().data.content.bg_style.bg_style_arr,
        key: this.componentData.getMyValue().data.content.bg_style.key
      })
      return this.componentData.getMyValue().data
    },
    speed(){
      return this.componentValue.element_style.speed * 1000
    },
    swiper(){
      return this.$refs.mySwiper.$swiper;
    }
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
      this.$emit('deleteSwiper')
    },
    getImgStyle(){
      let height = '';
      if(this.$refs['swiper-slide']){
        height = this.$refs['swiper-slide'][0].$el.offsetHeight;
      }
      return {
        'height': `${height}px`
      }
    },
    getBannerDotStyleClass(){
      return {1:'left',2:'middle',3:'right'}[this.componentValue.element_style.position]+' '+{1:'round-corner',2:'round',3:''}[this.componentValue.element_style.style]
    },
    onAfterChange(current){
      this.current = current;
      this.$emit('imageSlider3DChange', {
        current, 
        data: this.componentValue.content.bg_style.bg_style_arr,
        key: this.componentValue.content.bg_style.key
      })
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
      let height = '152px'
      if (this.componentValue.content.bg_style.bg_style_arr[0] && this.componentValue.content.bg_style.bg_style_arr[0].image.url){
        height = this.viewWidth/this.componentValue.content.bg_style.bg_style_arr[0].image.size[0]*this.componentValue.content.bg_style.bg_style_arr[0].image.size[1]+'px';
      }
      return {
        'border-radius': `${data.border_radio_top}px ${data.border_radio_top}px ${data.border_radio_bottom}px ${data.border_radio_bottom}px`,
        'background-color': data.bg_color,
        'height': height
      }
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
  width: 100%;
  position: relative;
  overflow: hidden;
  .custom-paging {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 30px;
    z-index: 1;
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

.swiper {
  height: 100%;
  width: 100%;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 300px;
    // height: 300px;
    text-align: center;
    font-weight: bold;
    background-color: #2C8DFB;
    background-position: center;
    background-size: cover;
  }
}
</style>