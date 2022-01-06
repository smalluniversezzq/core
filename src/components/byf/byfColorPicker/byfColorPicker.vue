<template>
  <a-popover v-model="visible" 
    trigger="click" 
    :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}" 
    autoAdjustOverflow 
    :placement="placement">
    <div class="colorBox">
      <div class="colorBtnBox">
        <div class="colorBtn" size="small" :style="{'background-color': checkColor.rgbaStr || checkColor}"></div>
      </div>
    </div>
    <template slot="content">
      <sketch-picker ref="sketchPicker" class="sketchPicker" :presetColors="radioColors" @input="updateValue" v-model="checkColor" />
      <a-divider style="margin:10px 0" />
      <div class="actionWrap">
        <span></span>
        <a-space>
          <a-button size="small" @click="cancel">清空</a-button>
          <a-button type="primary" size="small" @click="visible = false">确认</a-button>
        </a-space>
      </div>
    </template>
  </a-popover>
</template>

<script>
import { Sketch } from 'vue-color'
export default {
  props: {
    placement: {
      type: String,
      default: () => {
        return 'bottomRight'
      }
    },
    colors: {
      type: String,
      default: () => {
        return '#000000'
      }
    },
    defaultColor: {
      type: String,
      default: () => {
        return '#000000'
      }
    },
    radioColors: {
      type: Array,
      default: () => {
        return [
          '#D0021B', 
          '#F5A623', 
          '#F8E71C', 
          '#8B572A', 
          '#7ED321', 
          '#417505',
          '#BD10E0',
          '#9013FE',
          '#4A90E2',
          '#50E3C2',
          '#B8E986',
          '#000000',
          '#4A4A4A',
          '#9B9B9B',
          '#FFFFFF',
          '#00000000',
        ]
      }
    }
  },
  watch: {
    colors(val){
      console.log('watch')
      // 更新预览色
      this.checkColor = val
    }
  },
  components: {
    'sketch-picker': Sketch,
  },
  data(){
    return {
      // defaultColor: '',
      checkColor: {},
      visible: false,
      // fieldsIndex: 0,
    }
  },
  created(){
    this.updateColors(this.colors);
  },
  mounted(){
  },
  methods: {
    updateColors(color){
      // console.log(color,"updateColors")
      this.checkColor = color;
      // this.defaultColor = color;
    },
    cancel(){
      this.checkColor = this.defaultColor;
      this.change();
      this.visible = false;
    },
    updateValue(val){
      this.checkColor = val
      this.checkColor.rgbaStr = this.colorToString(this.checkColor.rgba);
      this.change(this.checkColor);
    },
    colorToString(color){
      return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    },
    hexToRgba(hex, opacity) {
      return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ','
          + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
    },
    change(val){
      if(val){
        this.$emit('change', val)
      }else{
        setTimeout(() => {
          let obj = {...this.$refs.sketchPicker.val}
          obj.rgbaStr = this.hexToRgba(obj.hex, obj.a)
          this.$emit('change', obj)
        }, 100);
      }
    }
  },
}
</script>

<style scoped lang="less">
.colorBox{
  display: inline-block;
  padding: 2px;
  border: 1px solid @border-color-base;
  border-radius: 2px;
  cursor: pointer;
  &:hover{
    border: 1px solid #1890ff87;

  }
  .colorBtnBox{
    height: 100%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC");
    .colorBtn{
      display: block;
      height: 100%;
      width: 100%;
      min-width: 24px;
      min-height: 24px;
    }
  }
  
}
.sketchPicker, .compactPicker{
  box-shadow: none;
  width: 225px;
}
.actionWrap{
  display: flex;
  justify-content: space-between;
}
/deep/.ant-popover-inner-content{
  padding: 0;
}
</style>