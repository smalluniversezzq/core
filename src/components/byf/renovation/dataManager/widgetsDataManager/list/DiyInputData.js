import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import cloneDeep from 'lodash/cloneDeep'
export default class DiyInputData extends BaseWidget {

  constructor(data){
    super(data)
    this.max = data.info.max || -1
    this.placeholder = data.info.placeholder
  }

  // 最大输入字数。-1：表示不限制。
  max = -1
  // 占位文字
  placeholder = ''


  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'text_input' 

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
      this.value = ''
    }
  }
}