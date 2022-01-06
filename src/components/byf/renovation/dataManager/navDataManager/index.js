
// 导入控件类
import ConfigBox from '@/components/byf/renovation/dataManager/common/ConfigBox'
import { initializingInfo } from '@/components/byf/renovation/common'
import WidgetLinkageManager from '@/components/byf/renovation/dataManager/linkage/WidgetLinkageManager.js'
import VerifyManager from '@/components/byf/renovation/dataManager/verifyManager/VerifyManager.js'

/**
 * 页面类
 */

export default class NavDataManager {
  /**
   * 页面类的构造函数
   * @param {number} id 模板id
   */
  constructor(id){
    this.id = id
    VerifyManager.instance.setMode(this)
  }

  // 页面id
  id = ''
  key = ''
  // 页面标题
  title = ''
  // 图标
  icon = 'iconshezhi'
  
  // 页面的配置数据
  configBoxs = {}
  /**
   * 从组件开始的路径数组
   */
  path = []

  /**
   * 控件联动管理器
   */
  widgetLinkageManager = new WidgetLinkageManager()

  /**
   * 初始化 页面中的 控件列表
   */
  initWidgets(global){
    // 记录下正在初始化的组件
    initializingInfo.root = this
    
    // 因为此初始化函数不是在构造页面对象时执行的，所以修改configBoxs属性时，
    // 先用一个数组configBoxs处理好数据，再赋值给this.configBoxs属性，不然通过直接往configBoxs中添加属性的话，有些属性不会被数据绑定
    this.key = global.key;
    this.path = [this.key]
    let config_boxs = global.config_boxs;
    let configBoxs = {}
    for(let x in config_boxs) {
      let item = config_boxs[x];
      item.path = this.path
      let obj = new ConfigBox(item)
      configBoxs[obj.key] = obj
    }
    this.configBoxs = configBoxs
    
  }

  /**
   * 更新页面详情
   * @param {object} pageDetail 页面详情数据
   */
  updatePageDetail(pageDetail){
    this.title = pageDetail.title

    // 更新页面的配置的value
    let global = pageDetail.global.data
    for(let x in this.configBoxs) {
      let item = this.configBoxs[x]
      for(let y in item.widgets_list) {
        let widgetItem = item.widgets_list[y]
        widgetItem.updateValue(global[item.key][widgetItem.key])
      }
    }
    
  }

  /**
   * 获取页面的value
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    let data = {}
    for(let x in this.configBoxs) {
      let boxItem = this.configBoxs[x];
      data[boxItem.key] = {}
      for(let y in boxItem.widgets_list){
        let item = boxItem.widgets_list[y]
        data[boxItem.key][item.key] = item.getMyValue(params)
      }
    }
    return data
  }
}