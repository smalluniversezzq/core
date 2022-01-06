<template>
  <!-- 拾色器  -->
  <div class="diy-color-picker">
    <byf-color-picker class="byf-color-picker" ref="colorPicker" :colors="widgetData.value" @change="onPickerChange"></byf-color-picker>
    <div class="input-box">
      <a-input addon-before="#" ref="colorInput" class="color-input" :value="widgetData.hexValue" @input.native="onInputChange" @blur="onBlur"></a-input>
      <a-button class="ml"  @click="onReset">重置</a-button>
    </div>
  </div>
</template>
<script>
import ByfColorPicker from '@/components/byf/byfColorPicker/byfColorPicker'
export default {
  name: 'byfcolorbtn',
  components: {ByfColorPicker},
  props: {
    widgetData:{
      required: false,
      default:()=>{
        return {
          hexValue:"000000",
          value:"rgba(0,0,0,1)",
        }
      }
    },
    defaultValue:{
       type: String,
       default:"000000"
    },
    info:{
      default:"",
    },
  },
  data(){
    return {
    }
  },
  created(){
  },
  mounted(){
    // 判断是否携带 #
    // this.onReset()
    // this.setParseToHex()
  },
  methods: {
    /**
     * 8位16进制色值转成rgba
     */
    parseToRGBA(val) {
      val = val.trim().toLowerCase();  //去掉前后空格
      val = this.correctHex(val , 8 )
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
      if(len < bit+1) {
        for(let i = 0;i < targetLength-len;i++) {
          color+='F'
        }
      }
      return color.toUpperCase()
    },
    /**
     * 重置
     */
    onReset(){
      // 重置颜色
      console.log(this.defaultValue,'onReset')
      this.widgetData.hexValue = this.defaultValue
      let toRgba = this.parseToRGBA(this.defaultValue)
      console.log(toRgba,"toRgba")
      this.widgetData.value = toRgba
      this.$refs.colorPicker.updateColors(toRgba)
      this.handleChange()
    },
    // setParseToHex(){
    //   this.widgetData.hexValue = this.correctHex(this.widgetData.value,6)
    // },
    onPickerChange(val){
      console.log(val,'onPickerChange')
      this.widgetData.hexValue = val.hex.slice(1).toUpperCase()
      this.widgetData.value = val.rgbaStr
      this.handleChange()
    },
    onInputChange(e){
      console.log(e,'onInputChange')
      // 记录光标位置
      let value = e.target.value
      // 限定只能有0-9a-f，如果有其他字符，统一替换为F
      value = value.replace(/[^0-9a-f]/ig, 'F').slice(0,6).toUpperCase()
      // 更新rgba格式数据
      // 更新预览色
      this.$refs.colorPicker.updateColors(this.widgetData.value)

      setTimeout(() => {
        this.widgetData.value = this.parseToRGBA(value)
      }, 0);
      this.widgetData.hexValue = value
      e.target.value = value
      this.handleChange()
    },
    onBlur(e){
      console.log(e,"onBlur")
      let value = e.target.value
      // hex 色值位数不足6位，补F
      if(value.length < 6) {
        this.widgetData.hexValue = this.correctHex(value)
      }
      this.handleChange()
    },
    handleChange(){
      this.$emit("change",this.widgetData.value,this.info)
    },
  }
}
</script>
<style lang="less" scoped>
.diy-color-picker {
  display: flex;
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