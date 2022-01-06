import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import Icon from '@/components/byf/renovation/dataManager/common/Icon'
import VerifyManager from '@/components/byf/renovation/dataManager/verifyManager/VerifyManager.js'

export default class DiyIconSelectorData extends BaseWidget {

  constructor(data){
    super(data)
    this.icon = new Icon(this.info.default_value)
    this.info.unit = this.info.unit || 'px'
    this.max = this.info.max || 30;
    this.min = this.info.min || 12;
    if(this.info.hide_icon_slider){
      this.hide_icon_slider = this.info.hide_icon_slider;
    }
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'icon_selector'

  /**
   * 图标对象
   */
  icon = null;
  
   /**
   * 图标滑杆最大值
   */
  max = 30;

  /**
   * 图标滑杆最小值
   */
  min = 12;

  /**
   * 图标滑杆是否隐藏
   */
  
  hide_icon_slider = false

  /**
   * 获取控件的value
   * @overload
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    if(params.verify) {
      // 开启验证
      if(this.require) {
        // 当要校验必填。
        // 校验必填性
        if(!this.verifyMyValue()) {
          // 当验证不通过，本地存储一个fail
          localStorage.setItem('renovationRequireVerify', 'fail')
          console.log('校验不通过', this)
          VerifyManager.instance.setFailComponent(this.root)
          VerifyManager.instance.addOneFailWidget(this)
        }
      }
    }
    this.icon.unicode_ios = '\\U0000'+this.icon.unicode;
    return this.icon
  }

  /**重载父类方法 对控件的值做必填项校验
   * @overload
   * @returns {boolean} true:通过校验；false：不通过校验。
   */
  verifyMyValue(){
    return this.icon && this.icon.font_class
  }

  /**
   * 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)
    this.icon.changeIcon(value)
    if(value.font_size){
      this.icon.changeIconSize(value)
    }
  }
}