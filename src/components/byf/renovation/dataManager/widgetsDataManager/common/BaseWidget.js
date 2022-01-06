import cloneDeep from 'lodash/cloneDeep'
import {generateUUID} from '@/utils/util.js'
import {initializingInfo} from '@/components/byf/renovation/common'
import LinkageOption from '@/components/byf/renovation/dataManager/linkage/LinkageOption.js'
import VerifyManager from '@/components/byf/renovation/dataManager/verifyManager/VerifyManager.js'

/**
 * 控件的基础类
 */

export default class BaseWidget {

  /**
   * 控件基础类的构造函数
   * @param {*} data 控件的数据
   */
  constructor(data){
    
    this.info = data.info || { type:'box'}
    this.key = data.key
    this.title = data.title
    this.path = [...data.path, this.key]
    this.widgetName = data.info && data.info.type || 'box'
    this.initValueByDefault(data.info? data.info.default_value : '')
    this.root = initializingInfo.root
    this.hide = !!this.info.hide

    this.initLinkage()
    this.require = this.info.require || false;
  }

  // 控件的唯一id
  uuid = generateUUID();
  // 键
  key = ''
  // 控件标题
  title = ''

  // 控件的管理类信息中的info
  info = {}

  // 控件的值
  value = null

  widgetName = ''
  /**
   * 是否隐藏此控件。ture：隐藏。false：不隐藏
   */
  hide = false
  /**
   * 从组件开始的路径数组
   */
  path = []

  /**
   * TODO 还没想好怎么用。父控件/父组件对象。
   */
  // parent = {}

  /**
   * 记录此控件所在的 组件或底部导航或页面
   */
  root = {}

  // 控件事件，用来实现控件联动
  event = {}

  // 跟控件绑定 vue组件对象实例 ，方便对视图进行控制
  viewControl = null

  /**
   * 是否验证必填。true：验证。false：不验证。
   */
  require = false;

  /**
   * 控件值的 必填验证的状态。true：正常；false：异常。
   */
  verifyStatus = true;

  /**
   * 控件的通用初始化方法，部分控件会复写此方法实现特殊初始化逻辑
   * @param {*} default_value 控件的默认值
   *  */ 
  initValueByDefault(default_value){
    this.value = cloneDeep(default_value)
  }

  /**
   * 初始化控件联动
   * 不能在BaseWidget类的构造函数中调用。
   * 应该在 子控件类 的构造函数调用。否则，部分子控件构造函数中初始化的属性会双向绑定不正常。
   */
  initLinkage(){
    for(let x in this.info.event) {
      this.event[this.info.event[x].name] = new LinkageOption(this.info.event[x])
    }
  
    if (Object.keys(this.event).length > 0) {
      // 如果存在控件联动
      this.root.widgetLinkageManager.registerLinkageWidget(this)
    }
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
        // 校验必填性
        if(!this.verifyMyValue()) {
          // 当验证不通过，本地存储一个fail
          localStorage.setItem('renovationRequireVerify', 'fail')
          console.log('校验不通过', this)
          VerifyManager.instance.setFailComponent(this.root)
          VerifyManager.instance.addOneFailWidget(this)
        }
      }
    }
    return this.value
  }

  /**对控件的值做必填项校验
   * @returns {boolean} true:通过校验；false：不通过校验。
   */
  verifyMyValue(){
    return !!this.value
  }

  /**
   * 根据 后端接口的value 更新 widget的value
   */
  updateValue(value){
    this.value = value
  }

  /**
   * 将控件对象和vue组件对象实例 绑定
   */
  bindView(view){
    this.viewControl = view;
  }
  /**
   * 在视图被销毁时，解绑
   */
  unBindView(){
    this.viewControl = null;
  }

  /**
   * 视图销毁的生命周期 当控件对象被销毁时会触发
   */
  onDestroyed(){
    // 视图销毁时，解绑视图实例 和 数据对象
    this.unBindView()
    // 从联动管理器中，卸载此控件
    this.root.widgetLinkageManager.cancelRegistration(this)
  }
}