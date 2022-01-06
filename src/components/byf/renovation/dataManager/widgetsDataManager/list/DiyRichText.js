import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'

export default class DiyRichText extends BaseWidget {

  constructor(data){
    super(data)
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'rich_text'
}