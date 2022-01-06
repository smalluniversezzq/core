
import {generateUUID} from '@/utils/util.js'

/**
 * 控件联动 管理器
 * 一个此实例 管理一个组件或底部导航或页面的控件联动
 */
export default class WidgetLinkageManager {

  constructor(root){
    this.root = root;
  }

  uuid = generateUUID()

  root = {}

  /**
   * 管理器的启动状态
   * 0：关闭中。1：启动中
   */
  startStatus = 0

  /**
   * 联动事件的数组
   */
  linkageArr = {}
  
  /**
   * 储存一个联动控件。只把rule为listener的存下来。
   * @param {object} oneWidget 一个联动控件对象
   */
  registerLinkageWidget(oneWidget){
    for(let x in oneWidget.event) {
      if(!this.linkageArr[x]){
        // 新的未注册的联动事件
        this.linkageArr[x] = { 
          rule: oneWidget.event[x].rule, // 控件的联动配置
          listeners: [], // 
          triggers: []
        }
      }
      if(oneWidget.event[x].role.includes('listener')) {
        this.linkageArr[x].listeners.push(oneWidget)
        if(this.startStatus == 1) {
          // 如果管理器启动中，则监听新联动事件
          document.addEventListener(x, this.onCustomEvent)
          // 在一些联动情况下，需要对控件的初始化显示根据联动规则做判断处理
          this.initShow(this.linkageArr[x], x)
        }
      }

      if(oneWidget.event[x].role.includes('trigger')) {
        this.linkageArr[x].triggers.push(oneWidget)
      }
    }
  }

  /**
   * 取消注册联动控件。当一个控件对象被销毁，将其取消注册
   * @param {object} oneWidget 一个联动控件对象
   */
  cancelRegistration(oneWidget){
    for(let x in oneWidget.event) {
      let oneLinkage = this.linkageArr[x]
      if(oneWidget.event[x].role.includes('trigger')) {
        oneLinkage.triggers.splice(oneLinkage.triggers.indexOf(oneWidget), 1)
      }
      if(oneWidget.event[x].role.includes('listener')) {
        oneLinkage.listeners.splice(oneLinkage.listeners.indexOf(oneWidget), 1)
      }
      
      // 如果一个联动场景，没有listener了，就移除监听事件
      if(oneLinkage.listeners.length == 0) {
        // console.log(x+'已没有listener了，移除监听')
        document.removeEventListener(x, this.onCustomEvent)
      }
    }
  }

  /**
   * 开启 控件联动 管理器
   */
  start(){
    this.startStatus = 1;
    for(let x in this.linkageArr) {
      // console.log('设置监听', x)
      document.addEventListener(x, this.onCustomEvent)

      // 在一些联动情况下，需要对控件的初始化显示根据联动规则做判断处理
      this.initShow(this.linkageArr[x], x)
    }
  }

  /**
   * 联动控件的 初始化显示处理
   * @param {object} linkage 联动场景
   */
  initShow(linkage, eventName){
    if(linkage.rule == 'one_only_one') {
      this.oneOnlyOneInitShow(linkage, eventName)
    } else if(linkage.rule == 'radio_item_disable') {
      this['radioItemDisableInitShow'](linkage, eventName)
    } else if(linkage.rule == 'hide_widget'){
      this.hideWidgetInitShow(linkage, eventName)
    }
  }

  /**
   * one_only_one 初始化显示处理
   */
  oneOnlyOneInitShow(oneLinkage, eventName){
    // 有且仅有 规则
    for(let y in oneLinkage.listeners) {
      let oneWidget = oneLinkage.listeners[y]
      let oneEvent;
      for(let x in oneWidget.event) {
        if(oneWidget.event[x].name == eventName) {
          oneEvent = oneWidget.event[x]
          break;
        }
      }
      if(oneWidget.value == oneEvent.params.value) {
        for(let z in oneWidget.optional) {
          if(oneWidget.optional[z].key != oneEvent.params.value) {
            oneWidget.optional[z].disabled = true
          }
        }
      }
    }
  }

  /**
   * radio_item_disable 初始化显示处理
   */
  radioItemDisableInitShow(oneLinkage, eventName){
    if(oneLinkage.triggers[0]) {
      // 先整理 triggers 的值
      let triggerValue = oneLinkage.triggers[0].value
  
      // 再遍历每个listeners，根据各自的params配置，做限制
      for(let x in oneLinkage.listeners) {
        let oneWidget = oneLinkage.listeners[x]
        if(oneWidget.event[eventName].params.disable_map[triggerValue]) {
          oneWidget.disableSomeOption(oneWidget.event[eventName].params.disable_map[triggerValue])
        } else {
          oneWidget.enableAllOption();
        }
      }
    } else {
      console.warn(eventName+'联动缺少trigger')
    }
  }

  /**
   * hide_widget 初始化显示
   */
  hideWidgetInitShow(oneLinkage, eventName){
    if(oneLinkage.triggers[0]) {
      // 先整理 triggers 的值
      let triggerValue = oneLinkage.triggers[0].value
  
      // 再遍历每个listeners，根据各自的params配置，做限制
      for(let x in oneLinkage.listeners) {
        let oneWidget = oneLinkage.listeners[x]
        if(oneWidget.event[eventName].params.hide_when.includes(triggerValue)) {
          oneWidget.hide = true
        } else {
          oneWidget.hide = false
        }
      }
    } else {
      console.warn(eventName+'联动缺少trigger')
    }
  }

  /**
   * 关闭控件联动 管理器
   */
  close(){
    this.startStatus = 0;
    for(let x in this.linkageArr) {
      // console.log('移除监听器：', x)
      document.removeEventListener(x, this.onCustomEvent)
    }
  }

  /**
   * 通过事件名 获取一个控件中的事件配置
   * @param {string} name 事件名称
   * @param {object} widget 控件
   */
  getEventInfoByName(name, widget){
    for(let y in widget.event) {
      if(widget.event[y].name == name) {
        return widget.event[y];
      }
    }
  }

  /**
   * 处理联动事件
   * @param {string} e.detail.wUUid 控件的uuid 
   * @param {string} e.detail.value 触发事件的值
   * @param {string} e.detail.rule 联动规则名 
   */
  onCustomEvent = (e)=>{
    // console.log('监听到：', e)
    if(e.detail.rule == 'one_only_one') {
      this.oneOnlyOneHandle(e)
    } else if(e.detail.rule == 'uni_value') {
      this.uniValueHandle(e)
    } else if(e.detail.rule == 'radio_item_disable') {
      this.radioItemDisableHandle(e)
    } else if(e.detail.rule == 'hide_widget'){
      this.hideWidgetHandle(e)
    }
  }

  /**
   * one_only_one 规则的处理
   */
  oneOnlyOneHandle(e){
    // 获取 联动相关的控件
    let listeners = this.linkageArr[e.type].listeners
    for(let x in listeners) {

      let oneWidget = listeners[x];
      // 找到对应的事件数据
      let oneEvent = this.getEventInfoByName(e.type, oneWidget)

      if(e.detail.wUUid == oneWidget.uuid) {
        if(e.detail.value == oneEvent.params.value) {
          // 当触发联动的控件的值变成了 此规则限定的值。禁用该控件的其他选项
          for(let z in oneWidget.optional) {
            if (oneWidget.optional[z].key != oneEvent.params.value) {
              oneWidget.optional[z].disabled = true
            }
          }
        }

        // 跳过触发联动的控件
        continue;
      }

      // 唯一值 类型 的事件 
      if (e.detail.value == oneEvent.params.value && oneWidget.value == oneEvent.params.value) {
        // 当其他控件的值变成了 唯一值 , 并且 此控件的值也是 唯一值
        // 将此控件的值改成 默认值
        oneWidget.value = oneWidget.info.default_value;
        for(let i in oneWidget.optional) {
          oneWidget.optional[i].disabled = false
        }
      }
      
    }
  }

  /**
   * uni_value 规则的处理
   */
  uniValueHandle(e){
    // 获取 联动相关的控件
    let listeners = this.linkageArr[e.type].listeners
    for(let x in listeners) {
      let oneWidget = listeners[x];
      if(e.detail.wUUid == oneWidget.uuid) {
        // 跳过触发联动的控件
        continue;
      }

      let oneEvent;
      // 找到对应的事件数据
      for(let y in oneWidget.event) {
        if(oneWidget.event[y].name == e.type) {
          oneEvent = oneWidget.event[y];
          break;
        }
      }

      // 唯一值 类型 的事件 
      if (e.detail.value == oneEvent.params.value && oneWidget.value == oneEvent.params.value) {
        // 当其他控件的值变成了 唯一值 , 并且 此控件的值也是 唯一值
        // 将此控件的值改成 默认值
        oneWidget.value = oneWidget.info.default_value;
      }
      
    }
  }

  /**
   * radio_item_disable 规则的处理
   */
  radioItemDisableHandle(e){
    // 获取 联动相关的控件
    let eName = e.type
    let listeners = this.linkageArr[e.type].listeners
    for(let x in listeners) {
      let oneWidget = listeners[x];
      // 当trigger的值为 disable_map 的属性时，禁用一些选项。否则，解除选项的禁用状态
      if(oneWidget.event[eName].params.disable_map[e.detail.value]) {
        oneWidget.disableSomeOption(oneWidget.event[eName].params.disable_map[e.detail.value])
      } else {
        // 否则，解除选项的禁用状态
        oneWidget.enableAllOption()
      }
    }
  }

  /**
   * hide_widget 规则的处理
   */
  hideWidgetHandle(e){
    // 获取 联动相关的控件
    let eName = e.type
    let listeners = this.linkageArr[e.type].listeners
    for(let x in listeners) {
      let oneWidget = listeners[x];
      if(oneWidget.event[eName].params.hide_when.includes(e.detail.value)) {
        oneWidget.hide = true
      } else {
        oneWidget.hide = false
      }
    }
  }

}