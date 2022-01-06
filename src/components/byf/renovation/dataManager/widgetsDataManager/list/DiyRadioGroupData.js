import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'

export default class DiyRadioGroupData extends BaseWidget {

  constructor(data){
    super(data)
    this.gap = data.info.gap || 0
    data.info.optional.forEach((item, index)=>{
      this.optionsList.push(new RadioGroupItem(item, index))
    })
  }

  /**
   * 两项之间的间隔
   */
  gap = 0

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'radio_group'

  /**
   * 单选子项数组
   */
  optionsList = []

    /**
   * 禁用部分选项
   * @param {array} items 要禁用的选项的key数组。
   */
    disableSomeOption(items){
    // 禁用指定的选项
    this.optionsList.forEach(item => {
      if(items.includes(item.key)) {
        item.disabled = true
      } else {
        // 其余的启用
        item.disabled = false
      }
    })
    // 如果value 属于被禁用项，则重置为默认值
    if(items.includes(this.value)) {
      this.value = this.info.default_value
    }
  }

  /**
   * 启用所有选项
   */
  enableAllOption(){
    this.optionsList.forEach(item => {
      item.disabled = false
    })
  }

}

/**
 * 单选按钮组子项类
 */
class RadioGroupItem {
  /**
   * 
   * @param {object} data
   * @param {string} title 标题 
   * @param {string} img 图片
   * @param {string} icon 标题
   */
  constructor(data, index){
    this.key = data.key
    this.title = data.title || ''
    this.img = data.image || ''
    this.icon = data.icon || ''
    this.sort = index;
  }

  /**
   * 排序字段，用于展示时处理数据为数组时控制顺序
   */
  sort = 0;
  key = ''
  /**
   * 单选标题
   */
  title = ''
  /**
   * 图片地址
   */
  img = ''
  /**
   * 图标名
   */
  icon = ''

  disabled = false
}