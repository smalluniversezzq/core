// eslint-disable-next-line
import AllComponents from '@/components/byf/renovation/dataManager/componentsDataManager'
import ConfigBox from '@/components/byf/renovation/dataManager/common/ConfigBox'
import { cloneDeep } from 'lodash'
import { initializingInfo } from '@/components/byf/renovation/common'
import WidgetLinkageManager from '@/components/byf/renovation/dataManager/linkage/WidgetLinkageManager.js'
import VerifyManager from '@/components/byf/renovation/dataManager/verifyManager/VerifyManager.js'

/**
 * 页面类
 */

export default class PageDataManager {
  /**
   * 页面类的构造函数
   * @param {number} id 模板id
   */
  constructor(id){
    this.id = id
    VerifyManager.instance.setMode('page')
  }

  // 页面id
  id = ''
  key = ''
  // 页面标题
  title = ''
  // 图标
  icon = 'iconshezhi'
  // 页面类型
  pageType = ''

  // 页面的配置数据
  configBoxs = {}

  /**
  * 保存所有可用的组件对象
  */
  usableComponentsList = []
  /**
   * 组件分类列表
   */
  componentsClassifyList = []
  // 保存所有已选组件对象
  selectedComponentsList = []
  /**
   * 保存已选组件中 的 每种组件的数量
   */
  selectedComponentsNumList = {}
  // 正在编辑的对象
  _editingTarget = null
  get editingTarget(){
    return this._editingTarget;
  }
  set editingTarget(value){
    if(this._editingTarget) {
      // 先关闭 之前正在编辑的组件的控件联动管理器
      this._editingTarget.widgetLinkageManager.close()
    }
    // 开启 正在编辑的组件的控件联动管理器
    value.widgetLinkageManager.start();

    this._editingTarget = value;

    // 记录下正在操作的组件
    initializingInfo.root = value

    if(this._editingTarget!= this) {
      setTimeout(() => {
        let ele = document.getElementsByClassName('active-preview-component')[0]
        if(ele.getBoundingClientRect().top <10 || ele.getBoundingClientRect().top >780) {
          ele.scrollIntoView({behavior:'smooth'})
        }
      }, 0);
    }
  }

  // 后端数据中的key与 组件类名映射
  componentsKeyMap = {
    ...AllComponents
  }
  /**
   * 从组件开始的路径数组
   */
  path = []

  /**
   * 控件联动管理器
   */
  widgetLinkageManager = new WidgetLinkageManager()
  

  /**
   * 初始化 页面中的 控件列表
   */
  initWidgets(config_boxs){
    // 记录下正在初始化的组件
    initializingInfo.root = this

    // 因为此初始化函数不是在构造页面对象时执行的，所以修改configBoxs属性时，
    // 先用一个数组configBoxs处理好数据，再赋值给this.configBoxs属性，不然通过直接往configBoxs中添加属性的话，有些属性不会被数据绑定
    let configBoxs = {}
    for(let x in config_boxs) {
      let item = config_boxs[x];
      item.path = this.path;
      let obj = new ConfigBox(item)
      configBoxs[obj.key] = obj
    }

    this.configBoxs = configBoxs

    this.editingTarget = this
  }

  /**
   * 初始化页面的已选组件
   * @param {array} list 页面的已选组件数据
   */
  initSelectedComponents(list){
    let arr = []
    // 初始化已选组件列表
    for(let x in list) {
      let item = list[x];
      let oneComponent = this.addOneSelectedComponent(item)
      if(oneComponent) {
        arr.push(oneComponent)
        this.updateSelectedComponentsList(oneComponent.componentKey, 1);
      }
    }
    this.selectedComponentsList = arr
  }

  /**
   * 初始化可用组件
   */
  initUsableComponents(data){
    // 初始化可用组件列表
    let arr = []
    data.elements.forEach(item=>{
      let oneClassify = new ComponentsClassify(item, this)
      arr.push(oneClassify)
    })
    this.componentsClassifyList = arr
    // 初始化页面配置项
    this.key = data.global.key;
    this.path = [this.key]
    this.initWidgets(data.global.config_boxs)
  }

  /**
   * 根据后端的预览区域数据 添加一个选中组件
   * @param {*} componentValue 组件值数据
   */
  addOneSelectedComponent(componentValue){

    // 从可用组件列表中找到对应组件对象克隆出来，并更新组件的值
    for(let i=0;i<this.usableComponentsList.length;i++){
      if(this.usableComponentsList[i].getComponentName() == componentValue.key) {
        let component = this.usableComponentsList[i].getPreviewObj()
        component.updateValue(componentValue)
        return component;
      }
    }
  }

  /**
   * 通过手动点击 添加一个选中组件 到预览区
   * @param {*} component 组件对象
   */
  addOneComponentToSelected(component){
    let newOne = component.getPreviewObj()
    let index = this.findIndexToAddOneComponent(newOne);
    this.selectedComponentsList.splice(index,0,newOne)
    this.updateSelectedComponentsList(newOne.componentKey, 1);
    this.editingTarget = newOne
    return this.editingTarget
  }

  /**
   * 找出应该往预览区的哪里添加一个新组件
   */
  // eslint-disable-next-line
  findIndexToAddOneComponent(newComponent){
    // 能通过点击走到这里， 说明此组件已经通过数量限制和互斥规则校验

    if(newComponent.sortWeight > 0) {
      // 如果是有正序位置要求的组件
      // 从第一个已选组件开始，找到一个组件（ 排序权重<=0 或者 （排序权重>0 并且 排序权重大于此组件））, 放至其前
      for(let x in this.selectedComponentsList) {
        let oneComponent = this.selectedComponentsList[x];
        if(oneComponent.sortWeight <=0 || (oneComponent.sortWeight>0 && oneComponent.sortWeight > newComponent.sortWeight)) {
          return x;
        }
      }
      // 找不到，则放到最后
      return this.selectedComponentsList.length
    } else if(newComponent.sortWeight < 0) {
      // 如果是有倒序位置要求的组件
      // 从最后一个已选组件开始，找到一个组件（ 排序权重>=0 或者 （排序权重<0 并且 排序权重小于此组件））, 放至其后
      for(let i = this.selectedComponentsList.length-1;i>=0;i--) {
        let oneComponent = this.selectedComponentsList[i];
        if(oneComponent.sortWeight >=0 || (oneComponent.sortWeight<0 && oneComponent.sortWeight < newComponent.sortWeight)) {
          return i+1;
        }
      }
      // 找不到，则放到第一个
      return 0
    } else if(newComponent.sortWeight == 0) {
      // 如果是没有位置要求的组件
      // 判断当前正在编辑的组件。
      if(this.editingTarget == this || this.editingTarget.sortWeight < 0) {
        // 如果正在编辑页面 或 如果正在编辑的组件（排序权重 < 0），则从最后一个已选组件开始，找到一个组件（ 排序权重>=0 ）,放至其后。
        for(let i = this.selectedComponentsList.length-1;i>=0;i--) {
          let oneComponent = this.selectedComponentsList[i];
          if(oneComponent.sortWeight >=0) {
            return i+1;
          }
        }
        // 找不到，则放到第一个
        return 0
      } else if(this.editingTarget.sortWeight == 0) {
        // 如果正在编辑的组件（排序权重==0），放置其后。
        return this.selectedComponentsList.indexOf(this.editingTarget)+1;
      } else if(this.editingTarget.sortWeight > 0) {
        // 如果正在编辑的组件（排序权重 > 0）, 从第一个已选组件开始，找到一个组件（ 排序权重<=0 ）,放至其前。
        for(let x in this.selectedComponentsList) {
          let oneComponent = this.selectedComponentsList[x];
          if(oneComponent.sortWeight <=0) {
            return x;
          }
        }
        // 找不到，则放到最后
        return this.selectedComponentsList.length
      }
    }
  }

  /**
   * 更新页面详情
   * @param {object} pageDetail 页面详情数据
   */
  updatePageDetail(pageDetail){
    this.title = pageDetail.title
    this.pageType = pageDetail.page_type

    // 更新页面的配置的value
    let global = pageDetail.global
    if(global) {
      for(let x in this.configBoxs) {
        let item = this.configBoxs[x];
        for(let y in item.widgets_list) {
          let widgetItem = item.widgets_list[y]
          widgetItem.updateValue(global.data[item.key][widgetItem.key])
        }
      }
    }
    
    // 初始化装修页面的已选组件数据
    this.initSelectedComponents(pageDetail.elements)
  }

  /**
   * 获取页面的value
   * @param {boolean} params.verify 是否进行验证
   */
  getMyValue(params={}){
    let data = {}
    for(let x in this.configBoxs) {
      let boxItem = this.configBoxs[x];
      data[boxItem.key] = {}
      for(let y in boxItem.widgets_list) {
        let item= boxItem.widgets_list[y];
        data[boxItem.key][item.key] = item.getMyValue(params)
      }
    }
    return data
  }

  /**
   *  获取所有组件的值
   * @param {boolean} params.verify 是否进行验证
   */
  getMyComponentsValue(params={}){
    let arr = []
    for(let x in this.selectedComponentsList) {
      let item = this.selectedComponentsList[x]
      let componentValue = item.getMyValue(params);
      if(localStorage.getItem('renovationRequireVerify') == 'fail') {
        console.log('必填校验异常', item)
        return false;
      }
      arr.push(componentValue)

    }
    return arr
  }

  /**
   * 切换编辑的对象
   * @param {object} obj 一个在预览区的组件对象
   */
  changeEditingTarget(obj){
    this.editingTarget = obj
  }

  /**
   * 从预览区删除某个组件
   * @param {object} component 预览区的一个组件对象
   */
  deleteOneComponent(component){
    let index = this.selectedComponentsList.indexOf(component)
    this.selectedComponentsList.splice(index, 1)

    this.updateSelectedComponentsList(component.componentKey, -1);

    // 删除完以后判断是否要更换编辑对象
    if(component == this.editingTarget) {
      if(this.selectedComponentsList.length>0) {
        //当预览区有组件
        if(this.selectedComponentsList.length>index) {
          this.editingTarget = this.selectedComponentsList[index]
        } else {
          this.editingTarget = this.selectedComponentsList[index-1]
        }
      } else {
        // 当没有预览组件时，编辑页面
        this.editingTarget = this
      }
    }
  }
  
  /**
   * 更换预览区组件的位置
   * @param {老位置} oldIndex 
   * @param {新位置} newIndex 
   */
  swapTwo(oldIndex, newIndex){
    let tmp = this.selectedComponentsList.splice(oldIndex,1)[0]
    this.selectedComponentsList.splice(newIndex,0,tmp)
  }

  /**
   * @param {string} componentKey 组件的key
   * @param {int} number 组件的数量变化。1：添加1；-1：减1.
   */
  updateSelectedComponentsList(componentKey, number){
    if(this.selectedComponentsNumList[componentKey] == undefined) {
      let object = cloneDeep(this.selectedComponentsNumList);
      object[componentKey] = 1
      this.selectedComponentsNumList = object;
    } else {
      this.selectedComponentsNumList[componentKey]+=number
    }
  }

  /**
   * 执行验证
   */
  doVerify(){
    VerifyManager.instance.clearVerifyInfo()
    this.getMyValue({verify:true})
    if(localStorage.getItem('renovationRequireVerify') == 'fail') {
      return false;
    }
    this.getMyComponentsValue({verify:true})
  }
}

class ComponentsClassify{
  constructor(data, pageDataManager){
    this.title = data.title;
    data.children.forEach(componentItem=>{
      if(AllComponents[componentItem.key]) {
        let componentObj = new (AllComponents[componentItem.key])(componentItem)
        pageDataManager.usableComponentsList.push(componentObj)
        this.children.push(componentObj)
        this.allChildren.push(componentObj)
      } else {
        // 出现了未知的组件
        console.warn('未知组件：', componentItem.key)
      }
    })
  }
  /**组件分组标题 */
  title = '';
  /**保存经过筛选后的 分组 中的组件 */
  children = [];
  /**保存分组中的所有组件 */
  allChildren = []
  

  /**
   * 搜索组件
   * @param {string} keyWord 
   */
  searchComponents(keyWord){
    this.children = []
    this.allChildren.forEach(item=>{
      if(item.title.includes(keyWord)) {
        this.children.push(item)
      }
    })
  }
}
