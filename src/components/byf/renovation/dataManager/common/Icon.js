/**
 * 图标类
 */
export default class Icon {
  /**
   * @param {Object} data 图标数据
   * @param {string} data.font_class 图标类名，web端使用
   * @param {string} data.font_file 图标字体文件名。app使用
   * @param {string} data.unicode 图标的unicode码，app使用
   */
  constructor(data = {}){
    this.font_class = data.font_class || ''
    this.font_file = data.font_file || ''
    this.unicode = data.unicode || ''
    this.font_size = data.font_size || 0
  }

  /**
   * 图标类名，web端使用
   */
  font_class = ''

  /**
   * 图标字体文件名。app使用
   */
  font_file = ''

  /**
   * 图标的unicode码，app使用
   */
  unicode = ''

  /**
   * 图标大小
   */
  font_size = ''

  /**
   * 更换图标
   * @param {object} val 
   */
  changeIcon(val){
    this.font_class = val.font_class
    this.font_file = val.font_file
    this.unicode = val.unicode
  }
  changeIconSize(val){
    this.font_size = val.font_size
  }
  /**
   * 清除图标
   */
  clear(){
    this.font_class = ''
    this.font_file = ''
    this.unicode = ''
  }

} 