import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'

export default class DiyRadioData extends BaseWidget {

  constructor(data){
    super(data)
    this.initChildren(data.info.optional)
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'radio'

  /**
   * 可选项
   */
  optional = {}

  /**
   * 初始化子控件
   * @param {array} optional 可选项数组，每一项包含一个children
   */
  initChildren(optional){
    optional.forEach(optionalItem => {
      optionalItem.path = this.path;
      let oneOption = new OptionItem(optionalItem)
      this.optional[oneOption.key] = oneOption
    })
  }

  /**
   * 禁用部分选项
   * @param {array} items 要禁用的选项的key数组。
   */
  disableSomeOption(items){
    // 禁用指定的选项
    for(let x in this.optional) {
      if(items.includes(this.optional[x].key)) {
        this.optional[x].disabled = true
      } else {
        // 其余的启用
        this.optional[x].disabled = false
      }
    }
    // 如果value 属于被禁用项，则重置为默认值
    if(items.includes(this.value)) {
      this.value = this.info.default_value
    }
  }

  /**
   * 启用所有选项
   */
  enableAllOption(){
    for(let x in this.optional) {
      this.optional[x].disabled = false
    }
  }
}
class OptionItem {
  constructor(data){
    this.key = data.key
    this.title = data.title
    this.hide = !!data.hide;
    this.path = [...data.path, this.key]
  }
  key = '';
  title = '';
  /**
   * 是否隐藏此单选项。true：隐藏此单选项。false：不隐藏。
   */
  hide = false;
  /**
   * 从组件开始的路径数组
   */
  path = []
  /**
   * 选项的禁用状态
   */
  disabled= false
}