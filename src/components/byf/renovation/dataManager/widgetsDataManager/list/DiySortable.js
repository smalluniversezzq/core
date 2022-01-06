/**
 * 排序控件类
 */

import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import WidgetsKeyMap from '@/components/byf/renovation/dataManager/widgetsDataManager/index.js'
import {generateUUID} from '@/utils/util.js'

export default class DiySortable extends BaseWidget {

  constructor(data){
    super(data)
    this.max = data.info.max
    this.min = data.info.min || 0
    this.btnText = data.info.btn_text
    this.initValue(data.info? data.info.default_value : '')
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'sortable'
  // 按钮文字
  btnText = ''
  // 最大数量
  max = ''
  // 最小数量
  min = 0
  // 拖拽项列表。里边是每一个拖拽子项对象
  list = []

  /**
   * 根据默认值初始化子控件和控件值
   * @param {*} default_value 控件的默认值
   *  */ 
  initValue(default_value){
    if(default_value && default_value.length > 0){
      let arr = []
      default_value.forEach((item, index)=>{
        arr.push(new SortableItem(this.info.children, item, index, this.path))
      })
      this.list = arr
    }
  }

  /**
   * 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)
    let arr = []
    this.list = [];
    value.forEach((item, index)=>{

      arr.push(new SortableItem(this.info.children, item, index, this.path))
    })
    this.list = arr
  }

  /**
   * 添加一个子项
   */
  addOneSortItem(){
    if(this.list.length == this.max) {
      return
    }
    let newSortableItem = new SortableItem(this.info.children, null, this.list.index, this.path)
    this.list.push(newSortableItem)
  }

  /**
   * 删除一个
   * @param {number} index 要删除的索引
   */
  deleteOneItem(index){
    this.list.splice(index,1)[0]
  }
  
  /**
   * 获取控件的value
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    let arr = []
    this.list.forEach(item=>{
      let data = {}
      for(let y in item.widgets) {
        let widgetItem = item.widgets[y];
        data[widgetItem.key] = widgetItem.getMyValue(params)
      }
      arr.push(data)
    })
    return arr
  }

  swapTwo(oldIndex, newIndex){
    let tmp = this.list.splice(oldIndex,1)[0]
    this.list.splice(newIndex,0,tmp)
  }
}

/**
 * 排序控件类的一个子排序类
 */
class SortableItem {
  /**
   * @param {array} widgetsArr 子控件数组
   * @param {object} value 这个子排序对象对应的value
   */
  constructor(widgetsArr, value, index, path){
    this.path = [...path, index];
    widgetsArr.forEach(childItem=>{
      childItem.path = this.path;
      let childWidget = new (WidgetsKeyMap[childItem.info.type])(childItem)
      // 当传过来的有子排序对象的value，则将子控件都更新下各自value
      value && childWidget.updateValue(value[childWidget.key])
      this.widgets[childWidget.key] = childWidget;
    })
  }

  /**
   * 每一个排序项的唯一id
   */
  sortId = generateUUID()

  // 子控件列表
  widgets = {}
  /**
   * 从组件开始的路径数组
   */
  path = []
}