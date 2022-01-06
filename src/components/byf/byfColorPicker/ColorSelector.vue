<template>
  <div class="diy-color-picker">
    <byf-color-picker 
      class="byf-color-picker" 
      ref="colorPicker" 
      :colors="colors" 
      :defaultColor="defaultColor"
      @change="onPickerChange"
    ></byf-color-picker>
    <div class="input-box">
      <a-input 
        addon-before="#" 
        ref="colorInput" 
        class="color-input" 
        v-model="hexValue" 
        :maxLength="6"
        @input.native="onInputChange"
        @blur="onBlur"
      ></a-input>
      <a-button @click="onReset">重置</a-button>
    </div>
  </div>
</template>

<script>
import ByfColorPicker from '@/components/byf/byfColorPicker/byfColorPicker'

export default {
  name: 'ByfColorSelector',
  components: {ByfColorPicker},
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
        return 'rgba(0,0,0,1)'
      }
    },
    defaultColor: {
      type: String,
      default: () => {
        return 'rgba(0,0,0,1)'
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
  data(){
    return {
      // 输入框使用16进制的字符。后端保存的是rgba格式，要先初始化一个hex值.不带#号
      hexValue: '',
      replaceHexValue:"",
      // colorsValue: this.colors,
    }
  },
  watch: {
    colors(newVal){
      this.replaceHexValue = this.parseToHex(newVal)
    }
  },
  created(){
    this.initHexValue()
  },
  methods: {
    /**
     * 初始化hex值
     */
    initHexValue(){
      this.hexValue = this.parseToHex(this.colors)
    },
    /**
     * rgba 转成 8位16进制色值
     * @param {string} color rgba格式的字符串
     * @param {int} bit 8：8位16进制；6:6位16进制。
     */
    parseToHex(color, bit = 6) {
      var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
      var a = parseFloat(values[3] || 1),
          r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
          g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
          b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
      let hex = ("0" + r.toString(16)).slice(-2).toUpperCase() +
        ("0" + g.toString(16)).slice(-2).toUpperCase() +
        ("0" + b.toString(16)).slice(-2).toUpperCase();
      // 如果要转成8位hex，需要加上透明度
      if (bit == 8) { hex += ("0" + Math.floor(a*255).toString(16)).slice(-2).toUpperCase() }

      return hex
    },
    /**
     * 重置颜色为默认值
     */
    // reset(){
    //   this.hexValue = this.parseToHex(this.defaultColor)
    //   this.colorsValue = this.defaultColor
    // },
    /**
     * 8位16进制色值转成rgba
     */
    // eslint-disable-next-line
    parseToRGBA(val) {
        val = val.trim().toLowerCase();  //去掉前后空格
        
        val = this.correctHex(val, 6)
        let color = {};
        try {
            let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
            color.r = parseInt(argb[1], 16);
            color.g = parseInt(argb[2], 16);
            color.b = parseInt(argb[3], 16);
            color.a = parseInt(argb[4], 16) / 255;            
        } catch (e) {
            console.log(e)
        }
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
    },
    /**
     * 修正16进制色值
     * @param [string] color #开头的色值字符串 或者没有#开头
     * @param [int] bit 修正为多少位的16进制色值。有6和8两种情况
     */
    correctHex(color, bit=6) {
      let len = color.length
      let targetLength
      if(color.indexOf('#') >= 0) {
        targetLength = bit+1
      } else {
        targetLength = bit
      }
      console.log(targetLength)
      if(len==3){
        let colorArr = []
        for(let i = 0;i<color.length;i++){
          colorArr.push(color[i])
          colorArr.push(color[i])
        }
        color = colorArr.join('')+"FF"
      }else if(len == 4){
        let mowei = color.slice(-1)
        let colorArr = []
        for(let i = 0;i<color.length;i++){
          console.log(color[i])
          if(i<3){
            colorArr.push(color[i])
            colorArr.push(color[i])
          }
        }
        color = colorArr.join('')+mowei+mowei
      }else if(len == 6){
        color=color+'FF'
      }else{
        color='000000'+'FF'
      }
      return color.toUpperCase()
    },
    /**
     * 重置
     */
    onReset(){
      this.$emit('reset', this.defaultColor)
      this.hexValue = this.parseToHex(this.defaultColor)
      // this.reset()
    },
    onPickerChange(val){
      // this.hexValue = val.hex.slice(1).toUpperCase()
      this.$emit('change', val.rgbaStr)
    },
    // eslint-disable-next-line
    onInputChange(e){
      let value = e.target.value
      // // 限定只能有0-9a-f，如果有其他字符，统一替换为F
      // eslint-disable-next-line
      value = value.replace(/[^0-9a-f]/ig, 'F').slice(0,6).toUpperCase()
      // // 更新rgba格式数据
      this.replaceHexValue = value
      this.$emit('change', this.parseToRGBA(this.replaceHexValue))
      
    },
    onBlur(e){
      let value = e.target.value
      this.replaceHexValue = value
      // hex 色值位数不足6位，补F
      if(value.length < 6) {
        this.$emit('change', this.correctHex(this.replaceHexValue))   

      }
    }
  }

}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-color-picker {
  display: inline-flex;
  align-items: center;
  height: 40px;
  .byf-color-picker {
    width: 66px;
  }
  .input-box {
    margin-left: 10px;
    display: flex;
    align-items: center;
    .color-input {
      width: 110px;
      top: 0;
      /deep/ .ant-input {
        padding: 4px 7px;
      }
    }
  }
}
</style>