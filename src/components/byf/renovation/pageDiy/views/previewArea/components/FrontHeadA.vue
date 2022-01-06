<template>
  <div class="one-component">
    <div class="front-head-a" :style="getStyle(content_style.widgets_list)">
      <div class="left" v-if="element_style.widgets_list.left_icon.value.key != 1">
        <byf-icon 
          renderType="fontClass"
          :fontFamily="element_style.widgets_list.left_icon.optional[2].children.icon.icon.font_file"
          v-if="element_style.widgets_list.left_icon.value.key == 2" 
          :type="element_style.widgets_list.left_icon.optional[2].children.icon.icon.font_class"
          :style="getIconStyle(element_style.widgets_list.left_icon.optional[2])"
        ></byf-icon>
        <img v-else-if="element_style.widgets_list.left_icon.value.key == 3" :src="getSideImg(element_style.widgets_list.left_icon.optional[3].children.image_link)" alt=""/>
      </div>
      <div class="middle-input" :style="getMiddleStyle(element_style.widgets_list.search)">
        <byf-icon renderType="fontClass" type="iconsousuo" :style="getMiddleIconStyle(element_style.widgets_list.search.children.icon_color)"></byf-icon>
        <div class="input" :style="getMiddleInputStyle(element_style.widgets_list.search.children.text_color)">{{element_style.widgets_list.search.children.tip_text.value}}</div>
      </div>
      <div class="right" v-if="element_style.widgets_list.right_icon.value.key != 1">
        <byf-icon 
          renderType="fontClass"
          :fontFamily="element_style.widgets_list.right_icon.optional[2].children.icon.icon.font_file"
          v-if="element_style.widgets_list.right_icon.value.key == 2" 
          :type="element_style.widgets_list.right_icon.optional[2].children.icon.icon.font_class"
          :style="getIconStyle(element_style.widgets_list.right_icon.optional[2])"
        ></byf-icon>
        <img v-else-if="element_style.widgets_list.right_icon.value.key == 3" :src="getSideImg(element_style.widgets_list.right_icon.optional[3].children.image_link)" alt="">
      </div>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'FrontHeadA',
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
      ...this.componentData.configBoxs
    }
  },
  computed: {
    componentValue(){
      return this.componentData.getMyValue().data
    },
  },
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getSideImg(data){
      return data.image.url || 'https://byf-web.bangyaosoft.cn/web/core/static/img/goods_station_map2.png'
    },
    getMiddleStyle(data){
      let style = {
        'justify-content': {1:'left',2:'center'}[data.children.text_align.value],
        'background-color': data.children.bg_color.value,
        'border-radius': data.children.border_radius.value+'px',
      }
      if(this.componentValue.element_style.left_icon.key == 1){
        style['margin-left'] = 0
      }
      if(this.componentValue.element_style.right_icon.key == 1){
        style['margin-right'] = 0
      }
      return style;
    },
    getMiddleIconStyle(data){
      return {
        'color': data.value
      }
    },
    getMiddleInputStyle(data){
      return {
        'color': data.value
      }
    },
    getIconStyle(data){
      return {
        'color': data.children.icon_color.value,
        'font-size': `${data.children.icon.icon.font_size}px`,
      }
    },
    getStyle(data){
      return {
        'background-color': data.bg_color.value,
        'border-radius': `${data.border_radio_top.value}px ${data.border_radio_top.value}px ${data.border_radio_bottom.value}px ${data.border_radio_bottom.value}px`,
        'margin': `${data.margin_top.value}px ${data.margin_left_and_right.value}px ${data.margin_bottom.value}px`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.front-head-a {
  display: flex;
  align-items: center;
  padding: 6px 15px;
  .left {
    display: flex;
    .anticon {
      font-size: 22px;
    }
  }
  img {
    width: 25px;
    height: 25px;
  }
  .middle-input {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 0 15px;
    margin: 0 15px;
    .anticon {
      font-size: 18px;
    }
    .input {
      margin-left: 5px;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
    }
  }
  .right {
    display: flex;
    .anticon {
      font-size: 22px;
    }
  }
}
</style>