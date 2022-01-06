<template>
  <div class="tbk-goods-list one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)"></div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'TBKGoodsList',
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
    },
  },
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getComponentStyle(data){
      return {
        'padding': `0 ${data.margin_left_and_right}px`,
      }
    },
    getContentStyle(data){
      return {
        'background-color': data.bg_color,
        'height': `${data.height}px`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
</style>
