// 导入父类 每个组件都要继承这个父类
import BaseComponent from '@/components/byf/renovation/dataManager/componentsDataManager/common/BaseComponent'
/**
 * 组件类：魔方
 */

class Rubik extends BaseComponent {
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
  static staticName = 'Rubik'

  /**
   * 初始化 组件中的 控件列表
   */
  initWidgets(config_boxs){
    // console.log('Rubik>initWidgets>config_boxs: ', config_boxs)
    super.initWidgets(config_boxs)
    // console.log('Rubik>initWidgets>this.configBoxs: ', this.configBoxs)
  }

}

export default Rubik