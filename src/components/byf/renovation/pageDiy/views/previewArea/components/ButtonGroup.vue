<template>
  <div class="button-group one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :class="getBtnStyleClass()" :style="getContentStyle(content_style.widgets_list)">
      <swiper class="content-swiper" ref="buttonGroupContentSwiper" :options="swiperOptionsOfContent">
        <swiper-slide
           class="btn-box" v-for="(groupItem, groupIndex) in list" :key="'groupItem-' + groupIndex">
          <div class="box-content">
            <div class="btn-item" :style="getBtnItemStyle()" v-for="(item, index) in groupItem" :key="'item-' + index">
              <img :style="getBtnImgStyle()" v-if="item.image.url" :src="item.image.url" alt="">
              <img :style="getBtnImgStyle()" v-else src='@/assets/img/renovation/menu_radius.png' alt="">
              <div class="text" :style="getTextStyle()">{{item.text}}</div>
              <div class="item-badge" :style="getItemBadgeStyle(item)" v-if="item.mark.key == 2" :src="item.mark.image.url" alt="">
                {{item.mark.text}}
              </div>
            </div>
          </div>
        </swiper-slide>
        <div 
          ref="contentSwiperScrollbar"
          id="buttonGroupSwiperScrollbar"
          :style="getSwiperScrollbarColor(componentValue)" 
          class="swiper-scrollbar contentSwiperScrollbar" 
          slot="scrollbar"></div>
      </swiper>
      
      <!-- <a-carousel :draggable="true" :infinite="false" :dots="false" :afterChange="onAfterChange">
        <div class="btn-box" v-for="(groupItem, groupIndex) in list" :key="'groupItem-' + groupIndex">
          <div class="box-content">
            <div class="btn-item" :style="getBtnItemStyle()" v-for="(item, index) in groupItem" :key="'item-' + index">
              <img :style="getBtnImgStyle()" v-if="item.image.url" :src="item.image.url" alt="">
              <img :style="getBtnImgStyle()" v-else src='@/assets/img/renovation/menu_radius.png' alt="">
              <div class="text" :style="getTextStyle()">{{item.text}}</div>
              <img class="item-badge" :style="getItemBadgeStyle(item)" v-if="item.mark.key == 2" :src="item.mark.image.url" alt="">
            </div>
          </div>
        </div>
      </a-carousel>
      <div class="custom-paging">
        <div class="bar" :style="getBarStyle()">
          <div class="dots" :style="getDotsStyle()"></div>
        </div>
      </div> -->
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
import { chunk } from 'lodash';
export default {
  name: 'ButtonGroup',
  components: {Swiper, SwiperSlide},
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
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
      },
      current: 0,
      ...this.componentData.configBoxs,
      rowNum: this.componentData.configBoxs.element_style.widgets_list.line_num,
      numPerRow: this.componentData.configBoxs.element_style.widgets_list.line_size
    }
  },
  computed: {
    componentValue(){
      return this.componentData.getMyValue().data
    },
    list(){
      return chunk(this.componentValue.content.content_arr, (this.componentValue.element_style.line_num * this.componentValue.element_style.line_size))
    },
  },
  mounted(){
    this.$nextTick(() => {
      this.initStyle();
    })
  },
  methods: {
    initStyle(){
      let data = this.componentValue;
      // 初始化滚动条颜色
      if(this.swiper()){
        this.swiper().scrollbar.$el.css('background-color', data.element_style.progress_bg_color)
        this.swiper().scrollbar.$dragEl.css('background-color', data.element_style.progress_main_color)
      }
    },
    swiper(){
      if(this.$refs.buttonGroupContentSwiper){
        return this.$refs.buttonGroupContentSwiper.$swiper
      }
      return null
    },
    // 设置滚动条颜色
    getSwiperScrollbarColor(data){
      // 通过原生方法修改滚动条主色
      if(this.swiper()){
        this.swiper().scrollbar.$el.css('background-color', data.element_style.progress_bg_color)
        this.swiper().scrollbar.$dragEl.css('background-color', data.element_style.progress_main_color)
      }
    },
    onAfterChange(current){
      this.current = current;
    },
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getPageNum(){
      let pageNum = this.componentValue.content.content_arr.length / (this.componentValue.element_style.line_num * this.componentValue.element_style.line_size)
      return pageNum;
    },
    getItemBadgeStyle(item){
      return {
        'color': `${item.mark.text_color}`,
        'background-color': `${item.mark.bg_color}`
      }
    },
    getBtnImgStyle(){
      return {
        'width': `${this.componentValue.content_style.button_size}px`,
        'height': `${this.componentValue.content_style.button_size}px`,
        'border-radius': `${this.componentValue.content_style.button_type}px`
      }
    },
    getBtnItemStyle(){
      return {
        'width': 100/ this.componentValue.element_style.line_size + '%'
      }
    },
    getBarStyle(){
      return {
        'background-color': this.element_style.widgets_list.progress_bg_color.value,
        'width': this.getPageNum()*12+'px'
      }
    },
    getDotsStyle(){
      return {
        'background-color': this.element_style.widgets_list.progress_main_color.value,
        'margin-left': this.current/ this.getPageNum() * 100 + '%'
      }
    },
    getBtnStyleClass(){
      return {1:'round',2:'round-corner'}[this.componentValue.element_style.button_type]
    },
    getComponentStyle(data){
      return {
        'padding': `${data.margin_top}px ${data.margin_left_and_right}px ${data.margin_bottom}px`,
      }
    },
    getContentStyle(data){
      return {
        'border-radius': `${data.border_radio_top.value}px ${data.border_radio_top.value}px ${data.border_radio_bottom.value}px ${data.border_radio_bottom.value}px`,
        'background-color': data.bg_color.value,
      }
    },
    getTextStyle(){
      return {
        'color': this.content_style.widgets_list.text_color.value
      }
    },
    getImgUrl(){
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.content {
  position: relative;
  overflow: hidden;
  padding: 10px 0;
  &.round {
    .btn-item{
      img{
        border-radius: 50%;
      }
      .item-badge{
        border-radius: 0;
      }
    }
  }
  &.round-corner {
    .btn-item{
      img{
         border-radius: 10px
      }
      .item-badge{
        border-radius: 0;
      }
    }
  }
  .btn-box {
    .box-content {
      display: flex;
      flex-wrap: wrap;
      .btn-item {
        text-align: center;
        margin-bottom: 10px;
        position: relative;
        img {
          display: inline-block;
          // width: 40px;
          // height: 40px;
          margin-bottom: 5px;
        }
        .item-badge{
          // height: 100%;
          // width: 100%;
          margin-bottom: 0px;
          white-space: nowrap;
          transform: scale(.8);
          position: absolute;
          top: -2px;
          left: 40%;
          font-size: 12px;
          padding: 2px 5px;
          padding-right: 6px;
          border-radius: 15px 15px 15px 0;
          border: 1px solid #fff;
        }

      }
    }
  }
  .custom-paging {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 30px;
    justify-content: center;
    .bar {

      border-radius: 2.5px;
      overflow: hidden;
      .dots {
        height: 5px;
        width: 12px;
        border-radius: 2.5px;
        transition: margin-left .2s;
      }
    }
  }
}
.swiper-scrollbar{
  width: 50px;
  left: calc(50% - 25px);
}
</style>