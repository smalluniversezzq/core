/**
 * 控件 校验 管理器
 * 单例模式
 */

export default class VerifyManager {
  constructor(){

  }

  _instance = null
  static get instance(){
    if(!this._instance) {
      this._instance = new VerifyManager();
    }
    return this._instance;
  }

  /**
   * 验证不通过的组件
   */
  failComonent = null

  /**
   * 验证不通过的控件
   */
  failWidgets = {}
  /**
   * 装修模式：'page'：页面装修。'nav'：导航装修。
   */
  mode = 'page';
  /**
   * 存放预览区域的视图组件
   */
  previewArea = null;

  /**
   * 设置装修模式 
   * @param {string} mode PageDataManager 或者 NavDataManager实例
   */
  setMode(mode){
    this.mode = mode
  }

  /**
   * 记录验证失败的组件
   * @param {object} component 可能是组件、页面对象、导航对象
   */
  setFailComponent(component){
    if(!this.failComonent) {
      this.failComonent = component;
      if(this.mode == 'page') {
        // 装修页面模式下，要定位到有问题的组件
        this.previewArea.onClickComponent(this.failComonent)
      }
    }
  }

  /**
   * 记录一个验证失败的控件
   * @param {object} oneWidget 一个验证没有通过的控件实例
   */
  addOneFailWidget(oneWidget){
    //修改控件的校验状态
    oneWidget.verifyStatus = false;
    this.failWidgets[oneWidget.uuid] = oneWidget;
  }

  /**
   * 清空之前的验证记录
   */
  clearVerifyInfo(){
    this.failComonent = null
    //重置每个控件的校验结果标识
    for(let x in this.failWidgets) {
      this.failWidgets[x].verifyStatus = true;
    }
    this.failWidgets = {};
    localStorage.removeItem('renovationRequireVerify')
  }
  /**
   * 绑定预览区域的视图组件
   * @param {object} previewArea 预览区域视图组件
   */
  bindPreviewArea(previewArea){
    this.previewArea = previewArea;
  }
  /**预览区域销毁的生命周期 */
  onPreviewAreaDestroyed(){
    this.previewArea = null;
  }

}