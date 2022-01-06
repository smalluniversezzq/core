<template>
  <div class="list-nav one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <ul>
        <li class="list-item" :style="getItemStyle(item)" v-for="(item, index) in componentValue.content.content_arr" :key="'item-' + index">
          <div class="list-item-left">
            <byf-icon 
              v-if="item.left_icon.font_class" 
              renderType="fontClass"
              :fontFamily="item.left_icon.font_file"
              class="left-icon" 
              :style="getLeftIconStyle()" 
              :type="item.left_icon.font_class"></byf-icon>
            <span :style="getTitleTextStyle()">{{item.left_title}}</span>
          </div>
          <div class="list-item-right">
            <span :style="getMoreTextStyle()">{{item.more_text}}</span>
            <byf-icon 
               v-if="item.more_icon.font_class"
              renderType="fontClass"
              :fontFamily="item.more_icon.font_file" 
              class="right-icon" 
              :style="getMoreIconStyle()" 
              :type="item.more_icon.font_class"></byf-icon>
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
  name: 'ListNav',
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
      console.log(this.componentData.getMyValue().data)
      return this.componentData.getMyValue().data
    },
  },
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getTitleTextStyle(){
      return {
        'font-size': `${this.componentValue.content_style.title_text.size}px`,
        'color': this.componentValue.content_style.title_text.color
      }
    },
    getComponentStyle(){
      return {
        'padding': `${this.componentValue.content_style.margin_top}px ${this.componentValue.content_style.margin_left_and_right}px ${this.componentValue.content_style.margin_bottom}px`
      }
    },
    getContentStyle(){
      return {
        'background-color':`${this.componentValue.content_style.bg_color}`,
        'border-radius': `${this.componentValue.content_style.border_radio_top}px ${this.componentValue.content_style.border_radio_top}px ${this.componentValue.content_style.border_radio_bottom}px ${this.componentValue.content_style.border_radio_bottom}px`
      }
    },
    getItemStyle(){
      return {
        'border-color':`${this.componentValue.content_style.line_color}`
      }
    },
    getLeftIconStyle(){
      return {
        'color': this.componentValue.content_style.left_icon.color,
        'font-size':`${this.componentValue.content_style.left_icon.size}px`,
      };
    },
    getMoreIconStyle(){
      return {
        'font-size': `${this.componentValue.content_style.more_icon.size}px`,
        'color': this.componentValue.content_style.more_icon.color,
      };
    },
    getMoreTextStyle(){
      return {
        'font-size': `${this.componentValue.content_style.more_text.size}px`,
        'color':this.componentValue.content_style.more_text.color,
      };
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
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    line-height: 44px;
    height: 44px;
    padding-left: 17px;
    padding-right: 12px;
    &:last-child{
      border-bottom: none;
    }
    .list-item-left{
      display: flex;
      align-items: center;
      .left-icon{
        padding-right: 12px;
      }
    }
    .list-item-right{
      display: flex;
      align-items: center;
      .right-icon{
        padding-left: 12px;
      }
    }
  }
}
</style>