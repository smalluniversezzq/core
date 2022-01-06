<template>
  <div class="front-head-b one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <div class="row-1" :class="{'left-middle-right': componentValue.first_content.show_style==2 && componentValue.first_content.center_content.key!=1}">
        <div class="left side">
          <template v-if="componentValue.first_content.left_content.key!=1">
            <byf-icon 
              renderType="fontClass"
              :fontFamily="componentValue.first_content.left_content.icon.font_file"
              v-if="componentValue.first_content.left_content.key == 2" 
              :style="getIconStyle(componentValue.first_content.left_content)" 
              :type="componentValue.first_content.left_content.icon.font_class"
            ></byf-icon>
            <img v-else-if="componentValue.first_content.left_content.key == 3" :src="componentValue.first_content.left_content.image_link.image.url" alt="">
            <div 
              class="title" v-else-if="componentValue.first_content.left_content.key == 4"
              :style="getMiddleTextStyle(componentValue.first_content.left_content)"
            >{{componentValue.first_content.left_content.show_text}}</div>
          </template>
        </div>
        <div class="middle text-overflow-1">
          <byf-icon 
            renderType="fontClass"
            :fontFamily="componentValue.first_content.center_content.icon.font_file"
            v-if="componentValue.first_content.center_content.key == 2" 
            :style="getIconStyle(componentValue.first_content.center_content)" 
            :type="componentValue.first_content.center_content.icon.font_class"
          ></byf-icon>
          <img v-else-if="componentValue.first_content.center_content.key == 3" :src="componentValue.first_content.center_content.image_link.image.url" alt="">
          <div 
            class="title" v-else-if="componentValue.first_content.center_content.key == 4"
            :style="getMiddleTextStyle(componentValue.first_content.center_content)"
          >{{componentValue.first_content.center_content.show_text}}</div>
        </div>
        <div class="right side">
          <template v-if="componentValue.first_content.right_content.key!=1">
            <byf-icon 
              renderType="fontClass"
              :fontFamily="componentValue.first_content.right_content.icon.font_file"
              v-if="componentValue.first_content.right_content.key == 2" 
              :style="getIconStyle(componentValue.first_content.right_content)" 
              :type="componentValue.first_content.right_content.icon.font_class"
            ></byf-icon>
            <img v-else-if="componentValue.first_content.right_content.key == 3" :src="componentValue.first_content.right_content.image_link.image.url" alt="">
            <div 
              class="title text-overflow-1" v-else-if="componentValue.first_content.right_content.key == 4"
              :style="getMiddleTextStyle(componentValue.first_content.right_content)"
            >{{componentValue.first_content.right_content.show_text}}</div>
          </template>
        </div>
      </div>
      <div class="row-2" :style="getMiddleStyle(componentValue.search_style.search)">
        <byf-icon renderType="fontClass" type="iconsousuo" :style="{color:componentValue.search_style.search.icon_color}"></byf-icon>
        <div class="input" :style="{color: componentValue.search_style.search.text_color}">{{componentValue.search_style.search.tip_text}}</div>
      </div>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'FrontHeadB',
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
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
    getMiddleStyle(data){
      return {
        'justify-content': {1:'left',2:'center'}[data.text_align],
        'background-color': data.bg_color,
        'border-radius': data.border_radius+'px'
      }
    },
    getMiddleTextStyle(data){
      return {
        'font-size': data.font_size+'px',
        'color': data.font_color,
        'font-weight': {1:'normal',2:'600'}[data.font_weight]
      }
    },
    getIconStyle(data){
      return {
        'color': data.icon_color,
        'font-size': `${data.icon.font_size}px`
      }
    },
    getContentStyle(data){
      return {
        'background-color': data.bg_color,
        'border-radius': `${data.border_radio_top}px ${data.border_radio_top}px ${data.border_radio_bottom}px ${data.border_radio_bottom}px`,
      }
    },
    getComponentStyle(data){
      return {
        'padding': `${data.margin_top}px ${data.margin_left_and_right}px ${data.margin_bottom}px`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.one-component {
  .content {
    padding:6px;
    overflow: hidden;
    .row-1 {
      margin-bottom: 10px;
      height: 30px;
      display: flex;
      justify-content: space-between;
      position: relative;
      align-items: center;
      &.left-middle-right {
        .side {
          img {
            width: 23px;
          }
        }
        .middle {
          display: block;
        }
      }
      img {
        height: 23px;
        max-width: 100%;
      }
      .title {
        line-height: 30px;
      }
      .middle {
        display: none;
        position: absolute;
        width: calc(100% - 50px);
        left: 25px;
        top: 3px;
        height: 100%;
        text-align: center;
      }
      .side {
        position: absolute;
        &.left {
          left: 0;
        }
        &.right {
          right: 0;
        }
      }
    }
    .row-2 {
      display: flex;
      align-items: center;
      flex-grow: 1;
      padding: 0 15px;
      .anticon {
        font-size: 18px;
      }
      .input {
        margin-left: 5px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>