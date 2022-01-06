import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import ImageData from '@/components/byf/renovation/dataManager/common/ImageData'
import DiyLinkSelectorData from '@/components/byf/renovation/dataManager/widgetsDataManager/list/DiyLinkSelectorData'
import VerifyManager from '@/components/byf/renovation/dataManager/verifyManager/VerifyManager.js'

export default class DiyImgLinkSelectorData extends BaseWidget {

  constructor(data){
    super(data)
    // console.log('diyimglink>data: ', data)

    if(data.info.default_value.image) {
      this.image = new ImageData(data.info.default_value.image)
    } else {
      this.image = new ImageData({url:'', size:[]})
    }

    let linkTemplate = {key:'inImgLinkSelector',"info":{
      require: this.info.require || false,
      link_params: data.info.link_params || {},
      "type":"link_selector",
      "default_value":data.info.default_value.link || {"type":-1,"link_id":0,"url":"","name":"","desc":"","access_control":{"sys":[],"user":[]},"params":null}
    }}
    linkTemplate.path = this.path
    this.linkData = new DiyLinkSelectorData(linkTemplate)

    this.tips = data.info.tips
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'img_link_selector'

  /**
   * 图片数据
   */
  image = {}
  /**
   * 提示语
   */
  tips = ''

  /**链接数据 */
  linkData = {}

  /**
   * 获取控件的value
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    if(params.verify) {
      // 开启验证
      // 校验必填性
      if(!this.verifyMyValue()) {
        // 当验证不通过，本地存储一个fail
        localStorage.setItem('renovationRequireVerify', 'fail')
        console.log('校验不通过', this)
        VerifyManager.instance.setFailComponent(this.root)
        VerifyManager.instance.addOneFailWidget(this)
      }
    }
    // 这里调用linkData的getMyValue时，不要把params中的verify传过去。因为图片链接选择控件是一个最小单元的控件。
    return { image: this.image, link: this.linkData.getMyValue()}
  }

  /**重载父类方法 对控件的值做必填项校验
   * @overload
   * @returns {boolean} true:通过校验；false：不通过校验。
   */
  verifyMyValue(){
    return !!this.image.url
  }

  /**
   * 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)

    // console.log('diyImgLinkSelector>updateValue: ', value)
    this.image.url = value.image.url
    this.image.size = value.image.size
    this.linkData.updateValue(value.link)
  }
}