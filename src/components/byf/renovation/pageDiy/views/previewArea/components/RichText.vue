<template>
  <div class="rich-text one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content wangeditor-content" 
      :style="getContentStyle(componentValue.content_style)"
      v-html="componentValue.content.content"
      ></div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'RichText',
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
      return this.componentData.getMyValue().data;
    },
  },
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
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
        'padding': `${data.padding}px`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.content{
  overflow: hidden;
  /deep/img{
    max-width: 100%;
  }
}
</style>