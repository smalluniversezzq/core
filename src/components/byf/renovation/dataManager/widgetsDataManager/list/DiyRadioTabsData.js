import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import WidgetsKeyMap from '@/components/byf/renovation/dataManager/widgetsDataManager/index.js'

import cloneDeep from 'lodash/cloneDeep'

export default class DiyRadioTabsData extends BaseWidget {

  constructor(data){
    super(data)
    this.initChildren(data.info.optional)
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'radio_tabs'

  /**
   * radio_tabs组件的可选项
   */
  optional = {}

  /**
   * 重写父类 控件vallue的初始化方法
   * @param {*} default_value 控件的默认值
   *  */ 
  initValueByDefault(default_value){
    if(default_value) {
      this.value = cloneDeep(default_value)
    } else {
      console.warn(this.path+': '+this.widgetName+'控件缺少默认值')
      // 当后端没有传此控件的默认值时，选中第一个optional
      this.value = {
        key: this.info.optional[0].key
      }
    }
  }

  /**
   * 初始化子控件
   * @param {array} optional 可选项数组，每一项包含一个children
   */
  initChildren(optional){
    optional.forEach((optionalItem, index) => {
      optionalItem.path = this.path;
      let oneOption = new OptionItem(optionalItem, index)
      this.optional[oneOption.key] = oneOption
    })

  }

  /**
   * 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)
    
    // console.log('value: ', value)
    // console.log('this.path: ', this.path)
    // value，有值时，要处理子控件的value
    let optional = this.optional
    for(let i in optional) {
      let oneOption = optional[i]
      if(oneOption.key == this.value.key && oneOption.children && Object.keys(oneOption.children).length>0) {
        // 找到一个child控件，修改其value
        // console.log('oneOption.children: ', oneOption.children)
        for(let x in this.value) {
          if(x == 'key' ) continue;
          for(let j in oneOption.children) {
            let oneWidget = oneOption.children[j]
            if(oneWidget.key == x) {
              oneWidget.updateValue(this.value[x])
              break
            }
          }
        }
      }
    }
  }

  /**
   * 拿取value需要特殊处理
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    let data = {key: this.value.key}
    for(let x in this.optional) {
      let item = this.optional[x];
      if (item.key == data.key) {
        for(let y in item.children) {
          let widgetItem = item.children[y];
          data[widgetItem.key] = widgetItem.getMyValue(params)
        }
      }
    }
    return data
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
  constructor(data, index){
    this.sort = index;
    this.key = data.key
    this.title = data.title
    this.hide_children = !!data.hide_children
    this.hide = !!data.hide;
    this.icon = data.icon || ''
    this.img = data.image || ''
    this.path = [...data.path, this.key]
    if(data.children && Object.keys(data.children).length > 0) {
      for(let y in data.children) {
        let widgetItem = data.children[y];
        // console.log('widgetItem: ', widgetItem)
        if (widgetItem.info && WidgetsKeyMap[widgetItem.info.type]) {
          widgetItem.path = this.path
          let widget = new (WidgetsKeyMap[widgetItem.info.type])(widgetItem)
          this.children[widget.key] = widget;
        } else {
          console.warn('未知控件：', widgetItem.info && widgetItem.info.type || widgetItem.info)
        }
      }
    }
  }
  sort = 0;
  // {key:'', title: '', children: {}, hide_children: false, icon:'',img:''}
  key = '';
  title = '';
  children = {}
  /**
   * 是否隐藏子控件。true：隐藏子控件（会展示此单选项）。false：不隐藏子控件。
   */
  hide_children = false;
  /**
   * 是否隐藏此单选项。true：隐藏此单选项。false：不隐藏。
   */
  hide = false;
  icon = '';
  img = '';
  /**
   * 从组件开始的路径数组
   */
  path = []
}