<!--
 * @Author: your name
 * @Date: 2021-02-07 19:04:59
 * @LastEditTime: 2021-03-26 14:35:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /byf_web_core/src/components/byf/renovation/pageDiy/views/previewArea/components/SuspendButton.vue
-->
<template>
  <div class="suspend-button one-component" :style="getComponentStyle()">
    <div class="content">
      <img :src="element_style.widgets_list.image.image.url" alt="" :style="getImgStyle()">
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'SuspendButton',
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
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getImgStyle(){
      return {
        'width': this.element_style.widgets_list.width.value+'px'
      }
    },
    getComponentStyle(){
      let key = this.element_style.widgets_list.position.value.key
      let style = {}
      switch(key) {
        case 1:
          style = {
            'top': this.element_style.widgets_list.position.optional[key].children.top_bottom.value + 20 + 'px',
            'left': this.element_style.widgets_list.position.optional[key].children.left_right.value+'px',
          }
          break;
        case 2:
          style = {
            'top': this.element_style.widgets_list.position.optional[key].children.top_bottom.value + 20 + 'px',
            'right': this.element_style.widgets_list.position.optional[key].children.left_right.value+'px',
          }
          break;
        case 3:
          style = {
            'bottom': this.element_style.widgets_list.position.optional[key].children.top_bottom.value+'px',
            'left': this.element_style.widgets_list.position.optional[key].children.left_right.value+'px',
          }
          break;
        case 4:
          style = {
            'bottom': this.element_style.widgets_list.position.optional[key].children.top_bottom.value+'px',
            'right': this.element_style.widgets_list.position.optional[key].children.left_right.value+'px',
          }
          break;
      }
      return style;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.one-component {
  position: absolute;
  z-index: 2;
}
</style>