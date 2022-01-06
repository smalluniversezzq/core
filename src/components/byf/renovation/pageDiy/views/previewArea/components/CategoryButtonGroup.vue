<template>
  <div class="category-button-group one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <swiper class="menu-swiper" ref="menuSwiper" :options="swiperOptionsOfMenus">
        <swiper-slide
          class="menu-slide-item"
          :class="getActiveClass(componentValue.element_style, index)"
          v-for="(item, index) in list" 
          :key="'menu-' + index">
          <div class="menu-item">
            <div class="top">
              <div class="title" :style="getDefaultTitleColor(componentValue)">
                <span class="title-text" 
                :style="{
                  ...getActiveTextColor(componentValue, index),
                  ...getActiveBgColorOfTitle(componentValue, index)}">
                  {{item.title}}
                </span>
                <span 
                  v-if="componentValue.element_style.active_style == 2 && current == index"
                  class="title-triangle"
                  :style="getActiveColorOfTriangle(componentValue)"></span>
              </div>
            </div>
            <div class="active-tag-box">
              <byf-icon 
                 renderType="fontClass"
                :style="getActiveLineColor(componentValue, index)"
                v-if="componentValue.element_style.active_style == 3 && current == index" 
                class="bottom-line-icon-line icon-line icon-item" type="iconhengxian"></byf-icon>
              <byf-icon renderType="fontClass" 
                :style="getActiveLineColor(componentValue, index)" 
                v-if="componentValue.element_style.active_style == 4 && current == index" 
                class="bottom-line-icon icon-arc icon-item" type="iconzoumadeng"></byf-icon>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <swiper class="content-swiper" ref="contentSwiper" :options="swiperOptionsOfContent">
        <swiper-slide
          class="content-slide-item" 
          v-for="(item, index) in list" 
          :key="'content-' + index">
          <div class="content-item" 
          :style="getContentItemStyle(componentValue)"
          v-for="(itm, idx) in item.list" :key="idx">
            <a-avatar :size="componentValue.content_style.button_size" />
            <p class="btn-text" :style="getBtnTextStyle(componentValue)">按钮</p>
          </div>
        </swiper-slide>
        <div 
          ref="contentSwiperScrollbar"
          :style="getSwiperScrollbarColor(componentValue)" 
          class="swiper-scrollbar contentSwiperScrollbar" 
          slot="scrollbar"></div>
      </swiper>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, Scrollbar } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay, Scrollbar])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
  name: 'CategoryButtonGroup',
  components: {Swiper, SwiperSlide},
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
      swiperOptionsOfMenus:{
        freeMode : true,
        slidesPerView: 'auto',
        centeredSlides : true,
        centeredSlidesBounds: true,
        slideToClickedSlide:true,
        on: {
          click: (swiper)=>{
            if(swiper.clickedIndex>=0){
              this.current = swiper.clickedIndex
              this.contentSwiper().slideTo(this.current)
            }
          },
        }
      },
      current:0,
      swiperOptionsOfContent: {
        allowTouchMove: false, // 禁止手动滑动
        slidesPerView: 'auto',
        centeredSlides : true,
        centeredSlidesBounds: true,
        slideToClickedSlide:true,
        scrollbar: {
          el: '.swiper-scrollbar',
          dragSize: 20,
          draggable: true,
        },
        on: {
          transitionEnd: (swiper) => {
            this.current = swiper.activeIndex
            this.swiper.slideTo(this.current)
          }
        }
      }
    }
  },
  computed:{
    list(){
      let number = this.componentValue.element_style.line_num * this.componentValue.element_style.line_size;
      return [
        { title: '精选', list:  number},
        { title: '猜你喜欢', list: number },
        { title: '儿童', list: number },
        { title: '男装', list: number },
        { title: '内衣', list: number },
        { title: '女装', list: number },
        { title: '游戏', list: number },
        { title: '数码', list: number },
        { title: '家具', list: number },
      ]
    },
    componentValue(){
      return this.componentData.getMyValue().data;
    },
    swiper(){
      return this.$refs.menuSwiper.$swiper;
    },
  },
  mounted(){
    this.getSwiperScrollbarColor(this.componentValue);
  },
  methods: {
    contentSwiper(){
      if(this.$refs.contentSwiper){
        return this.$refs.contentSwiper.$swiper
      }
      return null
    },
    // 设置滚动条颜色
    getSwiperScrollbarColor(data){
      // 通过原生方法修改滚动条主色
      if(this.contentSwiper()){
        this.contentSwiper().scrollbar.$el.css('background-color', data.element_style.progress_bg_color)
        this.contentSwiper().scrollbar.$dragEl.css('background-color', data.element_style.progress_main_color)
      }

      // let progressMain = document.getElementsByClassName('swiper-scrollbar-drag')[0]
      // if(progressMain){
      //   progressMain.style['background-color'] = data.element_style.progress_main_color;
      // }
      // return {
      //   'background-color': `${data.element_style.progress_bg_color}`
      // }
    },
    getBtnTextStyle(data){
      return {
        'color': `${data.content_style.button_text_color}`
      }
    },
    getContentItemStyle(data){
      return {
        'width': `calc(100% / ${data.element_style.line_size})`
      }
    },
    getComponentStyle(data){
      return {
        'padding': `${data.margin_top}px ${data.margin_left_and_right}px ${data.margin_bottom}px`,
      }
    },
    getContentStyle(data){
      return {
        'border-radius': `${data.border_radio_top}px ${data.border_radio_top}px ${data.border_radio_bottom}px ${data.border_radio_bottom}px`,
        'background-color': data.bg_color,
      }
    },
    getActiveClass(data, index){
      return {
        'active': (data.active_style == 1 || data.active_style == 2) && this.current == index
      }
    },
    getActiveColorOfTriangle(data){
      let bgColor = data.content_style.category_style.bg_active_color;
      return {
        'border-color': `${bgColor} transparent transparent transparent`
      }
    },
    getActiveBgColor(data, index){
      let bgColor = '';
      if(
        (data.element_style.active_style == 3 || data.element_style.active_style == 4)
        && this.current == index
      ){
        bgColor = data.content_style.category_style.bg_active_color;
      }
      return {
        'background-color': `${bgColor}`
      }
    },
    getDefaultTitleColor(data){
      return {
        'color': `${data.content_style.category_style.text_default_color}`
      }
    },
    getActiveLineColor(data){
      return {
        'color': data.content_style.category_style.bg_active_color
      }
    },
    getActiveTextColor(data, index){
      let textColor = '';
      if(this.current == index){
        textColor = data.content_style.category_style.text_active_color;
      }
      return {
        'color': `${textColor}`,
        'padding-right': `10px`
      }
    },
    getActiveBgColorOfTitle(data, index){
      let bgColor = '';
      if(
        (data.element_style.active_style == 1 || data.element_style.active_style == 2)
        && this.current == index
      ){
        bgColor = data.content_style.category_style.bg_active_color;
      }
      return {
        'background-color': `${bgColor}`,
      }
    },
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.one-component{
  // height: 40px;
  .content{
    overflow: hidden;
    .menu-swiper{
      .menu-slide-item{
        width: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        height: 40px;
        transition: background-color .2s;
        .menu-item{
          .top{
            padding-top: 4px;
            .title{
              position: relative;
              border-right: 1px solid #eee;
              padding: 0 6px;
              text-align: center;
              .title-text{
                // background: #ff0000;
                // border-radius: 20px;
                padding: 1px 9px;
                // color: #fff;
              }
              .title-triangle{
                position: absolute;
                bottom: -7px;
                left: calc(50% - 3px);
                width:0;
                height:0;
                overflow:hidden;
                font-size:0;
                line-height:0;
                border-width:4px;
                border-style:solid dashed dashed dashed;
                border-color:#f30 transparent transparent transparent;
              }
            }
          }
          .active-tag-box{
            display: flex;
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
          }
          // &.active-1 .top .title{
          //   background: #FF0000;
          //   border-radius: 20px;
          // }
        }
      }
      .active{
        .menu-item{
          .top{
            .title{
              .title-text{
                // background: #ff0000;
                border-radius: 20px;
              }
            }
          }
        }
      }
      .menu-slide-item:last-child{
        .menu-item{
          .top{
            .title{
              border: none;
            }
          }
        }
      }
    }
    .content-swiper{
      .content-slide-item{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        text-align: center;
        .content-item{
          .btn-text{
            margin-top: 5px;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
.swiper-scrollbar{
  width: 50px;
  left: calc(50% - 25px);
}
</style>