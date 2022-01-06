<template>
  <div class="category-menu one-component">
    <div class="content" :style="getContentStyle()">
      <swiper ref="mySwiper" :class="getActiveTagClass()" :options="swiperOptions" :style="getSwiperStyle()">
        <swiper-slide :class="{active: current==0}" :style="getSwiperSlideStyle(current==0)" @click.native="onClickSlide(0)">
          <div class="top">
            <span class="title" v-if="componentValue.first_config.show_type.key==1">{{componentValue.first_config.show_type.title}}</span>
            <img v-if="componentValue.first_config.show_type.key==2" :src="componentValue.first_config.show_type.image.url" alt="">
          </div>
          <div class="active-tag-box">
            <byf-icon renderType="fontClass" class="bottom-line-icon icon-arc icon-item" type="iconzoumadeng"></byf-icon>
            <byf-icon renderType="fontClass" class="bottom-line-icon-line icon-line icon-item" type="iconhengxian"></byf-icon>
          </div>
        </swiper-slide>
        <swiper-slide 
          v-for="(item, index) in componentValue.append_config.append_config_arr" 
          :key="'apend'+index" 
          :class="{active: current==index+1}"
          :style="getSwiperSlideStyle(current==index+1)"
          @click.native="onClickSlide(index+1)"
        >
          <div class="top">
            <span class="title" v-if="item.show_type.key==1">{{item.show_type.title}}</span>
            <img v-if="item.show_type.key==2" :src="item.show_type.image.url" alt="">
          </div>
          <div class="active-tag-box">
            <byf-icon renderType="fontClass" class="bottom-line-icon icon-arc icon-item" type="iconzoumadeng"></byf-icon>
            <byf-icon renderType="fontClass" class="bottom-line-icon-line icon-line icon-item" type="iconhengxian"></byf-icon>
          </div>
        </swiper-slide>
        <swiper-slide v-for="(item, index) in componentValue.category_data.category_ori" :key="'category'+index" 
          :class="{active: current==index+1+componentValue.append_config.append_config_arr.length}"
          :style="getSwiperSlideStyle(current==index+1+componentValue.append_config.append_config_arr.length)"
          @click.native="onClickSlide(index+1+componentValue.append_config.append_config_arr.length)"
        >
          <div class="top">
            <span class="title">{{item.name}}</span>
          </div>
          <div class="active-tag-box">
            <byf-icon renderType="fontClass" class="bottom-line-icon icon-arc icon-item" type="iconzoumadeng"></byf-icon>
            <byf-icon renderType="fontClass" class="bottom-line-icon-line icon-line icon-item" type="iconhengxian"></byf-icon>
          </div>
        </swiper-slide>
      </swiper>
      <div class="more-box" v-if="componentValue.category_data.more_type.key==1">
        <byf-icon renderType="fontClass" :fontFamily="componentValue.category_data.more_type.icon.font_file" :type="componentValue.category_data.more_type.icon.font_class" :style="getMoreIconStyle()"></byf-icon>
      </div>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'CategoryMenu',
  components: {Swiper, SwiperSlide},
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
      swiperOptions:{
        freeMode : true,
        slidesPerView: 'auto',
        centeredSlides : true,
        allowTouchMove: false, // 禁止手动滑动
        mousewheel: true,
        centeredSlidesBounds: true,
        slideToClickedSlide:true,
        on: {
          click: (swiper)=>{
            if(swiper.clickedIndex>=0){
              this.current = swiper.clickedIndex
            }
          }
        }
      },
      current:0,
    }
  },
  computed: {
    componentValue(){
      return this.componentData.getMyValue().data
    }
  },
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getMoreIconStyle(){
      return {
        'color': this.componentValue.category_data.more_type.icon_color,
        'font-size': `${this.componentValue.category_data.more_type.icon.font_size}px`
      }
    },
    getActiveTagClass(){
      return {
        [{1:'active-line',2:'active-arc',3:''}[this.componentValue.element_style.active_line_style]]: true,
        'active-bold': this.componentValue.element_style.active_text_weight_style==1,
        'active-big': this.componentValue.element_style.active_text_size_style==1,
      }
    },
    getSwiperStyle(){
      return {
        'padding-right': this.componentValue.category_data.more_type.key==1?'0px':'18px',
        // 'color': this.componentValue.content_style.text_color
      }
    },
    getContentStyle(){
      return {
        'background-color': this.componentValue.content_style.bg_color,

      }
    },
    getSwiperSlideStyle(isActive){
      return {
        'background-color': isActive?this.componentValue.content_style.active_bg_color:'rgba(0,0,0,0)',
        'color': isActive?this.componentValue.content_style.active_text_color: this.componentValue.content_style.text_color
      }
    },
    onClickSlide(index){
      this.current = index;
      this.$refs.mySwiper.$swiper.slideTo(index)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.one-component {
  height: 40px;
  .content {
    display: flex;
    align-items: center;
    .swiper-container {
      flex-grow: 1;
      &.active-line{

        .swiper-slide .active-tag-box .icon-line {
          display: block;
        }
      }
      &.active-arc{
        .swiper-slide .active-tag-box .icon-arc {
          display: block;
        }
      }
      &.active-bold {
        .active {
          .top .title {
            font-weight: bold;
          }
        }
      }
      &.active-big .active .top .title {
        font-size: 17px;
      }
      .swiper-slide {
        width: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 9px;
        cursor: pointer;
        height: 40px;
        transition: background-color .2s;
        &.active {
          .active-tag-box {
            display: flex;
          }
        }
        .top {
          margin-top: 5px;
          min-width: 15px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 100%;
          }
          .title {
            font-size: 14px;
            transition: font-size .2s, font-weight .2s;
          }
        }
        .active-tag-box {
          height: 10px;
          display: none;
          align-items: flex-end;
          justify-content: center;
          font-size: 12px;
          padding-right: 17px;
          .bottom-line-icon{
            transform: scale(0.38, 0.38);
          }
          .bottom-line-icon-line{
            transform: scale(0.25, 0.25);
          }
          .icon-item{
            display: inline-block;
            width: 10px;
            text-align: center;
            margin: 0 auto;
          }
          .icon-item {
            display: none;
          }
        }
      }
    }
    .more-box {
      padding-left: 5px;
      padding-right: 15px;
      // height: 35px;
      font-size: 15px;
      // padding-top: 2px;
      display: flex;
      align-items: center;
    }
  }
}
</style>