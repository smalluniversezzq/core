import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
/**
 * 分类选择控件
 */
export default class DiyClassifySelector extends BaseWidget {

  constructor(data){
    super(data)
    this.max = data.info.max
    this.min = data.info.min || 0
    this.btnText = data.info.btn_text || '添加分类'
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'classify_selector'
  // 按钮文字
  btnText = ''
  // 最大数量
  max = ''
  // 最小数量
  min = 0
  // 拖拽项列表。里边是每一个拖拽子项对象
  list = []
  // 记录元素真实位置的数组。内容必须与list一样，只是顺序不一样而已
  realIndexList = []

  /**
   * 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)
    let arr = []
    value.forEach((item)=>{

      arr.push(new ClassifySortableItem(item))
    })
    this.list = arr
    this.list.forEach(item=>{
      this.realIndexList.push(item)
    })
    // console.log('arr: ', arr)
  }

  /**
   * 添加一个子项
   * @param {object} linkData 分类链接数据
   */
  addOneSortItem(linkData){
    if(this.list.length == this.max) {
      return
    }
    let newSortableItem = new ClassifySortableItem(linkData)
    this.list.push(newSortableItem)
    this.realIndexList.push(newSortableItem)
  }

  /**
   * 删除一个
   * @param {number} index 要删除的索引
   */
  deleteOneItem(index){
    let obj = this.list.splice(index,1)[0]
    this.realIndexList.splice(this.realIndexList.indexOf(obj),1)
  }
  
  /**
   * 获取控件的value
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    if(params.verify) {
      // 开启验证
      if(this.require) {
        // 当要校验必填。
        // TODO 校验必填性
        // 当验证不通过，本地存储一个fail
        localStorage.setItem('renovationRequireVerify', 'fail')
        console.log('校验不通过', this)
      }
    }
    let arr = Array.from(this.realIndexList, item=>{
      return item.classify
    })
    return arr
  }

  /**
   * 清空所有子项
   */
  clearAllItem(){
    this.list.length = 0
    this.realIndexList.length = 0
  }

  swapTwo(oldIndex, newIndex){
    let tmp = this.realIndexList.splice(oldIndex,1)[0]
    this.realIndexList.splice(newIndex,0,tmp)
  }
}

/**
 * 排序控件类的一个子排序类
 */
class ClassifySortableItem {
  /**
   * @param {object} value 这个子排序对应的分类
   */
  constructor(value = {}){
    this.classify = value
  }

  classify = {}
}