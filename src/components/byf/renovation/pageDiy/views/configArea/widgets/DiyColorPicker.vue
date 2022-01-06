<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div class="diy-color-picker">
        <byf-color-picker 
          class="byf-color-picker" 
          ref="colorPicker" 
          :colors="widgetData.value" 
          :defaultColor="widgetData.info.default_value"
          @change="onPickerChange"
        ></byf-color-picker>
        <div class="input-box">
          <a-input addon-before="#" ref="colorInput" class="color-input" :value="widgetData.hexValue" @input.native="onInputChange" @blur="onBlur"></a-input>
          <a-button @click="onReset">重置</a-button>
        </div>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
import ByfColorPicker from '@/components/byf/byfColorPicker/byfColorPicker'

export default {
  name: 'DiyColorPicker',
  // eslint-disable-next-line
  components: {ByfColorPicker},
  mixins: [WidgetMixin],
  methods: {
    /**
     * 8位16进制色值转成rgba
     */
    // eslint-disable-next-line
    parseToRGBA(val) {
        val = val.trim().toLowerCase();  //去掉前后空格
        
        val = this.correctHex(val, 8)
        
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
      this.widgetData.reset()
      // 更新预览色
      this.$refs.colorPicker.updateColors(this.widgetData.value)

    },
    onPickerChange(val){
      this.widgetData.hexValue = val.hex.slice(1).toUpperCase()
      this.widgetData.value = val.rgbaStr
    },
    onInputChange(e){
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
    },
    onBlur(e){
      let value = e.target.value

      // hex 色值位数不足6位，补F
      if(value.length < 6) {

        this.widgetData.hexValue = this.correctHex(value)
        
      }
    }
  }

}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
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