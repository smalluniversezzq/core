import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import {getAllUserLevel} from '@/components/byf/renovation/services/admin/user/userLevel'

export default class DiyMultipleSelector extends BaseWidget {

  constructor(data){
    super(data)
    this.allLevelList = getAllUserLevel();
    this.allLevelList = this.allLevelList.filter(item => {
      return item.isdel == 0
    })
  }
  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'multiple_selector'

  // 所有会员等级列表，包括已删除的
  allLevelList = null;


  
  /**
   * 处理所有会员等级列表数据
   */
  updateValue(value){
    super.updateValue(value)
    this.allLevelList = this.allLevelList.filter(item => {
      return item.isdel == 0 || (item.isdel == 1 && value.length > 0 && value.some(itm => itm == item.id))
    })
  }
}