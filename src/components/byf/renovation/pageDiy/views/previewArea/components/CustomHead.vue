<template>
  <div class="one-component">
    <div class="custom-head" :style="getStyle()">
      <div class="left">
        <template v-if="content.widgets_list.left_icon.value.key == 1">
          <byf-icon 
            v-for="(item, index) in content.widgets_list.left_icon.optional[1].children.left_icon_arr.list"
           :key="index" :type="item.widgets.icon.icon.font_class" :style="getIconStyle(item.widgets)" 
          ></byf-icon>
        </template>
      </div>
      <div class="middle-input" v-if="content.widgets_list.title_text.value.key == 1" :style="getMiddleStyle(content.widgets_list.title_text.optional[1].children)">
        <div class="text text-overflow-1">{{content.widgets_list.title_text.optional[1].children.text.value}}</div>
      </div>
      <div class="right" v-if="content.widgets_list.right_icon.value.key == 1">
        <template v-for="(item, index) in content.widgets_list.right_icon.optional[1].children.right_icon_arr.list">
          <byf-icon :key="index" :type="item.widgets.icon.icon.font_class" :style="getIconStyle(item.widgets)" ></byf-icon>
        </template>
      </div>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'CustomHead',
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
    getMiddleStyle(data){
      let style = {
        'color': data.text_color.value
      }
      if(data.position.value == 1){
        // 居左显示
        style['text-align'] = 'left'
        if(this.componentValue.content.left_icon.key == 1){
          // 显示左侧图标时的居左展示样式处理
          style['padding-left'] = `${20 + this.componentValue.content.left_icon.left_icon_arr[0].icon.font_size}px`
        }
      }
      if(this.componentValue.content.title_text.font_weight == 2){
        style['font-weight'] = 'bold';
      }
      style['font-size'] = `${data.font_size.value}px`


      return style
    },
    //eslint-disable-next-line
    getIconStyle(data){
      return {
        'color': data.icon_color.value,
        'font-size': `${data.icon.icon.font_size}px`
      }
    },
    //eslint-disable-next-line
    getStyle(data){
      return {
        'background-color': this.content_style.widgets_list.bg_color.value
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.custom-head {
  display: flex;
  align-items: center;
  padding: 3px 15px;
  height: 30px;
  position: relative;
  justify-content: space-between;
  .left {
    .anticon {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .middle-input {
    line-height: 30px;
    font-size: 18px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    padding: 0 15px;
    .text {
      max-width: 210px;
      display: inline-block;
    }
  }
  .right {
    .anticon {
      font-size: 20px;
      margin-left: 10px;
    }
  }
}
</style>