// eslint-disable-next-line
import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import WidgetsKeyMap from '@/components/byf/renovation/dataManager/widgetsDataManager/index.js'

export default class DiyBoxData extends BaseWidget {

  // eslint-disable-next-line
  constructor(data){
    super(data)
    this.initWidgets(data.children)
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'box'


  // 子控件
  children = {}

  /**
   * 初始化 组件中的 控件列表
   */
  initWidgets(childrenList){
    childrenList.forEach((widgetItem)=>{
      if (WidgetsKeyMap[widgetItem.info.type]) {
        widgetItem.path = this.path
        let widget = new (WidgetsKeyMap[widgetItem.info.type])(widgetItem)
        this.children[widget.key] = widget;
      } else {
        console.warn('未知控件：', widgetItem.info.type)
      }
    })
  }

  /**
   * diybox拿取value需要特殊处理
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    let data = {}
    for(let x in this.children) {
      let item = this.children[x];
      data[item.key] = item.getMyValue(params)
    }
    return data
  }


  /**
   * 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)
    for(let x in this.children) {
      let item = this.children[x];
      item.updateValue(value[item.key])
    }
  }
}