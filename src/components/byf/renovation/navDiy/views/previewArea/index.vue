<template>
  <div class="preview-area">
    <div class="content">
      <img class="status-bar" src="@/assets/img/renovation/Status_Bar.png" alt="">
      <div class="nav-wrap" id="nav-wrap">
        <div class="bottom-nav" id="bottom-nav">
          <div class="bg" 
            :style="{backgroundColor: componentValue.content_style.bg_color, borderColor: componentValue.content_style.line_color}"
          ></div>
          <nav-btn 
            v-for="(item, index) in content_arr" 
            :key="index" 
            :navInfo="item" 
            :textColor="componentValue.content_style.text.text_default_color"
            :backgroundColor="componentValue.content_style.bg_color"
          ></nav-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBtn from './navBtn'

export default {
  components: {NavBtn},
  props: {
    navDataManager: {
      type: Object
    }
  },
  data(){
    return {
    }
  },
  computed: {
    componentValue(){
      return this.navDataManager.getMyValue()
    },
    content_arr(){
      return this.componentValue.content.content_arr
    }
  }
}
</script>

<style lang="less" scoped>
.preview-area {
  height: 100%;
  width: 415px;
  min-width: 375px;
  padding: 40px 20px 20px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .content {
    min-height: 667px;
    background: url('~@/assets/img/renovation/menu-skeleton.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0px 40px;
    background-color: white;
    box-shadow: @shadow-2;
    position: relative;
    .status-bar {
      width: 94%;
      margin-left: 3%;
      position: relative;
      z-index: 1;
    }
    .active {
      border: 1px solid @input-hover-border-color;
    }
    .nav-wrap{
      position: absolute;
      bottom: 0;
      min-height: 76px;
      width: 100%;
    }
    .bottom-nav {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      min-height: 49px;
      display: flex;
      justify-content: space-around;
      .bg {
        bottom: 0;
        position: absolute;
        width: 100%;
        height: 52px;
        z-index: 0;
        border-top: 1px solid white;
      }
    }
  }
}
</style>