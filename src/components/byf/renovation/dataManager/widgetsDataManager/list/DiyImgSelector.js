import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import ImageData from '@/components/byf/renovation/dataManager/common/ImageData'
import VerifyManager from '@/components/byf/renovation/dataManager/verifyManager/VerifyManager.js'

export default class DiyImgSelector extends BaseWidget {

  constructor(data){
    super(data)
    this.tips = data.info.tips
    this.image = new ImageData(data.info.default_value)
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'img_selector'

  // 提示语
  tips = ''

  /**
   * 图片数据
   */
  image = {}

  /**
   * 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)
    this.image.url = value.url
    this.image.size = value.size
  }
  
  /**
   * 重载父类方法 获取控件的value
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
    return this.image
  }

  /**重载父类方法 对控件的值做必填项校验
   * @overload
   * @returns {boolean} true:通过校验；false：不通过校验。
   */
  verifyMyValue(){
    return !!this.image.url
  }
}