<template>
  <div class="rubik-component one-component" :style="getElementStyle()">
    <div class="content" :style="getContentStyle()">
      <div class="blank" v-if="showBlank"><img src="@/assets/img/renovation/cube_default.png" alt=""></div>
      <div class="layouts-box" v-else :style="getLayoutsBoxStyle()">
        <div class="layout-1" v-if="componentValue.element_style.layout.key == 1">
          <div class="layout-item" :style="getLayoutItemStyle(0)" />
        </div>
        <div class="layout-2" v-else-if="componentValue.element_style.layout.key == 2">
          <div class="layout-item" :style="getLayoutItemStyle(0)" />
          <div class="gap" :style="{width: gapLength}"></div>
          <div class="layout-item" :style="getLayoutItemStyle(1)" />
        </div>
        <div class="layout-3" v-else-if="componentValue.element_style.layout.key == 3">
          <div class="layout-item" :style="getLayoutItemStyle(0)" />
          <div class="gap" :style="{width: gapLength}"></div>
          <div class="layout-item" :style="getLayoutItemStyle(1)" />
          <div class="gap" :style="{width: gapLength}"></div>
          <div class="layout-item" :style="getLayoutItemStyle(2)" />
        </div>
        <div class="layout-4" v-else-if="componentValue.element_style.layout.key == 4">
          <div class="layout-item item-0" :style="getLayoutItemStyle(0)" />
          <div class="gap" :style="{width: gapLength}"></div>
          <div class="right">
            <div class="layout-item" :style="getLayoutItemStyle(1)" />
            <div class="gap" :style="{height: gapLength}"></div>
            <div class="layout-item" :style="getLayoutItemStyle(2)" />
          </div>
        </div>
        <div class="layout-5" v-else-if="componentValue.element_style.layout.key == 5">
          <div class="layout-item item-0" :style="getLayoutItemStyle(0)" />
          <div class="gap" :style="{height: gapLength}"></div>
          <div class="bottom">
            <div class="layout-item" :style="getLayoutItemStyle(1)" />
            <div class="gap" :style="{width: gapLength}"></div>
            <div class="layout-item" :style="getLayoutItemStyle(2)" />
          </div>
        </div>
        <div class="layout-6" v-else-if="componentValue.element_style.layout.key == 6">
          <div class="layout-item item-0" :style="getLayoutItemStyle(0)" />
          <div class="gap" :style="{width: gapLength}"></div>
          <div class="right">
            <div class="layout-item item-1" :style="getLayoutItemStyle(1)" />
            <div class="gap" :style="{height: gapLength}"></div>
            <div class="bottom">
              <div class="layout-item" :style="getLayoutItemStyle(2)" />
              <div class="gap" :style="{width: gapLength}"></div>
              <div class="layout-item" :style="getLayoutItemStyle(3)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'Rubik',
  props: {
    componentData: {
      type: Object
    },
    viewWidth: {
      type: Number,
      default: 375
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
    showBlank(){
      let blank = true
      let arr = this.componentValue.element_style.layout.image_arr
      for(let x in arr) {
        if(arr[x].image.url) {
          blank = false;
          break;
        }
      }
      return blank;
    },
    gapLength(){
      return this.componentValue.image_style.padding+'px'
    },
    borderRadius(){
      return `${this.componentValue.image_style.image_border_radio_top}px `+
        `${this.componentValue.image_style.image_border_radio_top}px `+
        `${this.componentValue.image_style.image_border_radio_bottom}px `+
        `${this.componentValue.image_style.image_border_radio_bottom}px`
    }
  },
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getLayoutItemStyle(index){
      let style = {
        backgroundImage: 'url('+this.componentValue.element_style.layout.image_arr[index].image.url+')',
        'border-radius': this.borderRadius,
      }
      return style;
    },
    getLayoutsBoxStyle(){
      let style = {}
      if(this.componentValue.element_style.layout.image_arr[0].image.url) {
        let size = this.componentValue.element_style.layout.image_arr[0].image.size;
        let rate;
        // 计算图片宽度（后续计算宽度缩小比例需要使用），注意有图片边距时的处理
        let imgWidth = this.viewWidth - (this.componentValue.content_style.margin_left_and_right * 2) - (this.componentValue.image_style.padding_left_and_right * 2)
        if([1,5].indexOf(this.componentValue.element_style.layout.key)>=0){
          rate = this.viewWidth/size[0];
        } else if([2,4,6].indexOf(this.componentValue.element_style.layout.key)>=0){
          rate = this.viewWidth / 2 / size[0];
          imgWidth = imgWidth - this.componentValue.image_style.padding;
        } else if([3].indexOf(this.componentValue.element_style.layout.key)>=0) {
          imgWidth = imgWidth - (this.componentValue.image_style.padding * 2);
          rate = this.viewWidth / 3 / size[0];
        }
        // 计算当前宽度缩小比例，后续让高度一同缩小
        let wRate = imgWidth / this.viewWidth;

        // 当有第一张图片时，再计算高度
        if(this.componentValue.element_style.layout.key==5) {
          style.height = rate*size[1]*2 * wRate + 'px'
        } else {
          style.height = rate*size[1] * wRate + 'px'
        }
      }
      return style
    },
    getElementStyle(){
      return {
        'padding': `${this.componentValue.content_style.margin_top}px ${this.componentValue.content_style.margin_left_and_right}px ${this.componentValue.content_style.margin_bottom}px`,
      }
    },
    getContentStyle(){
      return {
        'padding': `${this.componentValue.image_style.padding_top}px ${this.componentValue.image_style.padding_left_and_right}px ${this.componentValue.image_style.padding_bottom}px`,
        'background-color': this.componentValue.content_style.bg_color,
        borderRadius: `${this.componentValue.content_style.border_radio_top}px `+
                      `${this.componentValue.content_style.border_radio_top}px `+
                      `${this.componentValue.content_style.border_radio_bottom}px `+
                      `${this.componentValue.content_style.border_radio_bottom}px`
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.content{
  overflow: hidden;
  .blank{
      width: 100%;
      img{
        width: 100%;
      }
  }
}
.layouts-box {
  width: 100%;
  height: 360px;
  line-height: normal;
  text-align: center;
  .gap {
    flex-shrink:0;
  }
  .layout-1 {
    width: 100%;
    height: 100%;
    .layout-item {
      height: 100%;
    }
  }
  .layout-2 {
    width: 100%;
    height: 100%;
    display: flex;
    .layout-item {
      width: 50%;
      height: 100%;
    }
  }
  .layout-3 {
    width: 100%;
    height: 100%;
    display: flex;
    .layout-item {
      width: 33.33%;
      height: 100%;
    }
  }
  .layout-4 {
    width: 100%;
    height: 100%;
    display: flex;
    .item-0 {
      width: 50%;
      height: 100%;
    }
    .right {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .layout-item {
        width: 100%;
        height: 50%;
      }
    }
  }
  .layout-5 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .item-0 {
      width: 100%;
      height: 50%;
    }
    .bottom {
      width: 100%;
      height: 50%;
      display: flex;
      .layout-item {
        width: 50%;
        height: 100%;
      }
    }
  }
  .layout-6 {
    width: 100%;
    height: 100%;
    display: flex;
    .item-0 {
      width: 50%;
      height: 100%;
    }
    .right {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .item-1 {
        width: 100%;
        height: 50%;
      }
      .bottom {
        width: 100%;
        height: 50%;
        display: flex;
        .layout-item {
          width: 50%;
          height: 100%;
        }
      }
    }
  }
  
  .layout-item {
    background-position: center;
    background-size:cover;
    background-repeat: no-repeat;
  }
}
</style>