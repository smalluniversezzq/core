<template>
  <div class="notice-component one-component" :style="getComponentStyle(content_style.widgets_list)">
    <div class="content" :style="getContentStyle(content_style.widgets_list)">
      <img :src="getImgSrc()" alt="">
      
      <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="swiper-slide" 
          :data-swiper-autoplay="speed" 
          v-for="(item, index) in 5" 
          :key="index"
        >
          公告内容{{index}}
        </swiper-slide>
      </swiper>
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
  name: 'Notice',
  components: {Swiper, SwiperSlide},
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
      ...this.componentData.configBoxs,

    }
  },
  computed:{
    componentValue(){
      return this.componentData.getMyValue().data
    },
    speed(){
      return this.componentValue.content_style.speed * 1000
    },
    swiperOptions(){
      let _this = this;
      let option = {
        loop: true,
        direction: 'vertical',
        centeredSlides: true,
        slidesPerView: 'auto',
        allowTouchMove: false, // 禁止手动滑动
        autoplay: {
          delay: _this.speed,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
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
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getImgSrc(){
      return this.element_style.widgets_list.style.optional[this.element_style.widgets_list.style.value.key].children.image.image.url
    },
    getComponentStyle(data){
      return {
        'padding': `${data.margin_top.value}px ${data.margin_left_and_right.value}px ${data.margin_bottom.value}px`,
      }
    },
    getContentStyle(data){
      return {
        'border-radius': `${data.border_radio_top.value}px ${data.border_radio_top.value}px ${data.border_radio_bottom.value}px ${data.border_radio_bottom.value}px`,
        'background-color': data.bg_color.value,
        'color': data.text_color.value
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.notice-component {
  .content {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    overflow-y: hidden;
    img {
      // width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .swiper{
      width: 100%;
      .swiper-slide{
        text-align: left;
        line-height: 40px;
        height: 100%;
      }
    }
  }
}
</style>