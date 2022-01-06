import cloneDeep from 'lodash/cloneDeep'
import ConfigBox from '@/components/byf/renovation/dataManager/common/ConfigBox'
import {generateUUID} from '@/utils/util.js'
import { initializingInfo } from '@/components/byf/renovation/common'
import WidgetLinkageManager from '@/components/byf/renovation/dataManager/linkage/WidgetLinkageManager.js'

/**
 * 组件的基础类 
 */

export default class BaseComponent {

  /**
   * 组件基础类的构造函数
   * @param {*} data 组件的数据
   */
  constructor(data){

    // console.log('BaseComponent:', data)
    this.title = data.title
    this.icon = data.icon || 'iconfenleianniu2x'
    this.componentKey = data.key
    this.path = [this.componentKey]
    ComponentSortWeight[this.componentKey] && (this.sortWeight = ComponentSortWeight[this.componentKey]);
    this.originConfigBoxs = data.config_boxs
  }

  originConfigBoxs = {}
  // 页面右侧的配置块的数据，每个配置块有一组控件
  configBoxs = {}

  // 组件的中文名
  title = ''
  // 组件的图标
  icon = ''
  // 每个组件的value
  value = ''
  // 组件的标识名
  componentKey = ''
  /**
   * 进入预览区的组件都要生成唯一key，解决在vuedraggable有图片时会闪烁的问题
   */
  previewKey = ''
  /**
   * 从组件开始的路径数组
   */
  path = []

  /**
   * 最大选择数量。-1：不限制组件数量。
   */
  maxNumber = -1;
  /**
   * 组件在预览区的排序权重
   */
  sortWeight = 0;

  /**
   * 控件联动管理器
   */
  widgetLinkageManager = {}

  /**
   * 初始化 组件中的 控件列表。将数组改为键值对的对象
   */
  initWidgets(){
    // 记录下正在初始化的组件
    initializingInfo.root = this

    for(let x in this.originConfigBoxs) {
      let item = this.originConfigBoxs[x];
      item.path = this.path
      let obj = new ConfigBox(item)
      this.configBoxs[obj.key] = obj
    }
  }

  /**
   * 更新组件的值
   * @param {*} value 一个组件的完整的值。
   */
  updateValue(value){
    //eslint-disable-next-line
    for(let x in this.configBoxs) {
      let item = this.configBoxs[x];
      for(let y in item.widgets_list){
        let widgetItem = item.widgets_list[y];
        widgetItem.updateValue(value.data[item.key][widgetItem.key])
      }
    }
  }

  /**
   * 克隆此对象
   */
  clone(){
    let newObj = cloneDeep(this)
    newObj.generateUUID()
    return newObj
  }

  /**
   * 获取 此组件在预览区域的对象
   */
  getPreviewObj(){
    let previewObj = this.clone()
    previewObj.widgetLinkageManager = new WidgetLinkageManager(this)
    previewObj.initWidgets()
    return previewObj;
  }

  /**
   * 获取组件的名字（组件的唯一值）
   */
  getComponentName(){
    // 通过object.constructor.name可以得到 对应的类名
    // 不要使用object.constructor.name，因为build后类名会改变
    return this.componentKey
  }

  /**
   * 拿取本组件的value
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    let myValue = { 
      key: this.getComponentName(),
      data: {}
    }
    for(let x in this.configBoxs) {
      let item = this.configBoxs[x];
      myValue.data[item.key] = {}
      for(let y in item.widgets_list) {
        let widgetItem = item.widgets_list[y];
        myValue.data[item.key][widgetItem.key] = widgetItem.getMyValue(params)
      }
    }
    
    return myValue
  }

  /**
   * 在组件对象添加进入预览区时调用
   */
  generateUUID(){
    this.previewKey = generateUUID();
  }

  /**
   * 从预览区移除本组件
   */
  deleteMe(){

  }
}

/**
 * 组件在预览区域排序的权重。可相同。
 * 0表示，不限制组件位置。
 * 正数 >=1 为从头开始。越接近0，排序越靠近头部。
 * 负数 <=-1 为从尾开始。越接近0，排序越靠近底部
 */
// eslint-disable-next-line
const ComponentSortWeight = {
  FrontHeadA: 1,
  FrontHeadB: 1,
  CustomHead: 1,
  PersonalCenterHead: 1,
  CategoryMenu: 2,
  ImageSlider3D: 3,
  GoodsList: -2,
  SuspendButton: -1
}

/**
 * 互斥规则。支持多组互斥。
 */
// eslint-disable-next-line
export const MutexRules = {
  // 互斥组1
  'group1': ['FrontHeadA', 'FrontHeadB', 'CustomHead', 'PersonalCenterHead']
}