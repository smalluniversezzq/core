// 导入父类 每个组件都要继承这个父类
import BaseComponent from '@/components/byf/renovation/dataManager/componentsDataManager/common/BaseComponent'
/**
 * 组件类：淘客商品列表
 */

class TBKGoodsList extends BaseComponent {
  /**
   * 构造函数
   * @param {object} data 管理类数据
   */
  constructor(data) {
    super(data)
  }

  /**
   * 此名字要跟后端数据的组件名一致
   */
  static staticName = 'TBKGoodsList'

}

export default TBKGoodsList
