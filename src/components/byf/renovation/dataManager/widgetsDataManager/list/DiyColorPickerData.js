import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
export default class DiyColorPickerData extends BaseWidget  {

  constructor(data){
    super(data)
    this.initHexValue()
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'color_picker'

  // 输入框使用16进制的字符。后端保存的是rgba格式，要先初始化一个hex值.不带#号
  hexValue = ''

  /**
   * 初始化hex值
   */
  initHexValue(){
    this.hexValue = this.parseToHex(this.value)
  }

  
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
  }

  /**
   * 重置颜色为默认值
   */
  reset(){
    this.hexValue = this.parseToHex(this.info.default_value)
    this.value = this.info.default_value
  }

  /**
   * 继承父类的此方法
   */
  updateValue(value){
    super.updateValue(value)
    this.hexValue = this.parseToHex(this.value)
  }

}