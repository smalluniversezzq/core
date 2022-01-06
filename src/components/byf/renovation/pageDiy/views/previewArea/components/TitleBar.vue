<template>
  <div class="title-bar one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <ul>
        <li class="list-item">
          <div class="list-item-left" :style="getPosition(componentValue.element_style)">
            <byf-icon renderType="fontClass" 
              :fontFamily="componentValue.content_style.title.icon.font_file"
              class="left-icon" 
              v-if="componentValue.content_style.title.icon.font_class" 
              :style="getLeftIconStyle()" 
              :type="componentValue.content_style.title.icon.font_class"></byf-icon>
            <span :style="getTitleStyle(componentValue.content_style.title)">{{componentValue.content_style.title.show_text}}</span>
          </div>
          <div class="list-item-right" v-if="componentValue.content_style.more.key == 1">
            <span :style="getMoreStyle(componentValue.content_style.more)">{{componentValue.content_style.more.text}}</span>
            <byf-icon renderType="fontClass" 
              :fontFamily="componentValue.content_style.more.icon.font_file" 
              class="right-icon" 
              v-if="componentValue.content_style.more.icon.font_class" 
              :style="getMoreIconStyle(componentValue.content_style.more)" 
              :type="componentValue.content_style.more.icon.font_class"></byf-icon>
          </div>
        </li>
      </ul>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'TitleBar',
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
        'padding': `${data.margin_top}px ${data.margin_left_and_right}px ${data.margin_bottom}px`,
      }
    },
    getPosition(data){
      return {
        'text-align': `${data.style == 1 ? 'left' : 'center'}`,
      }
    },
    getTitleStyle(data){
      return {
        'color': `${data.text_color}`,
        'font-size': `${data.font_size}px`,
        'font-weight': `${data.font_weight == 1 ? '' : 'bold' }`,
      }
    },
    getMoreStyle(data){
      return {
        'color': `${data.text_color}`
      }
    },
    getLeftIconStyle(){
      return {
        'color': `${this.componentValue.content_style.title.icon_color}`,
        'font-size': `${this.componentValue.content_style.title.icon.font_size - 2}px`
      }
    },
    getMoreIconStyle(data){
      return {
        'color': `${data.icon_color}`,
        'font-size': `${data.icon.font_size}px`
      }
    },
    getContentStyle(data){
      return {
        'border-radius': `${data.border_radio_top}px ${data.border_radio_top}px ${data.border_radio_bottom}px ${data.border_radio_bottom}px`,
        'background-color': `${data.bg_color}`,
        'padding-top': `${data.padding_top}px`,
        'padding-bottom': `${data.padding_bottom}px`,
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.content{
  overflow: hidden;
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .list-item{
    position: relative;
    // display: flex;
    // justify-content: space-between;
    // line-height: 44px;
    // min-height: 44px;
    padding-left: 10px;
    padding-right: 6px;
    text-align: left;
    // display: flex;
    // align-items: center;
    .list-item-left{
      // display: flex;
      // align-items: center;
      height: 100%;
      .left-icon{
        padding-right: 6px;
        position: relative;
        top: -3px
      }
    }
    .list-item-right{
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      padding-right: 8px;
      .right-icon{
        padding-left: 5px;
      }
    }
  }
}
</style>