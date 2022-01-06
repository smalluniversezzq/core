<template>
  <div class="data-button-group one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <ul class="list">
        <li class="list-item"
        :style="{'width': `calc(100% / ${componentValue.content.content_arr.length})` }" 
        v-for="(item, index) in componentValue.content.content_arr" :key="index">
          <p :style="getNumberStyle(item)">325</p>
          <p :style="getTitleStyle(item)">{{item.title_text}}</p>
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
  name: 'DataButtonGroup',
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
    getNumberStyle(data){
      return {
        'font-size': `${this.componentValue.content_style.num_size}px`,
        'color': `${data.num_color}`
      }
    },
    getTitleStyle(data){
      return {
        'font-size': `${this.componentValue.content_style.title_size}px`,
        'color': `${data.title_color}`
      }
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
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.content{
  ul,li, p{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .list{
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    text-align: center;
    padding: 15px;
    .list-item{
      // float: left;
      white-space: nowrap;
      overflow: hidden;
      >p:nth-child(1){
        padding-bottom: 8px;
      }
    }
  }
}
</style>