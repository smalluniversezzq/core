import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'

export default class DiyLinkSelectorData extends BaseWidget {

  constructor(data){
    super(data)
    this.link_params = data.info.link_params || {};
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'link_selector'

  /**
   * 链接选择器的参数
   */
  link_params = {}

   /**
   * 获取控件的value
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    if(params.verify) {
      // 开启验证
      if(this.require) {
        // 当要校验必填。
        // TODO 校验必填性
        // 当验证不通过，本地存储一个fail
        localStorage.setItem('renovationRequireVerify', 'fail')
        console.log('校验不通过', this)
      }
    }
    if(this.link_params.append_link_params){
      for(let k in this.link_params.append_link_params){
        if(this.value.tab_key == k){
          if(!this.value.params){
            this.value.params = {}
          }
          for(let l in this.link_params.append_link_params[k]){
            this.value.params[l] = this.link_params.append_link_params[k][l]
          }
        }
      }
    }

    return this.value
  }
}