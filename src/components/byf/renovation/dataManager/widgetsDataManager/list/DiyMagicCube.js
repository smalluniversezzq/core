import BaseWidget from '@/components/byf/renovation/dataManager/widgetsDataManager/common/BaseWidget'
import DiyImgLinkSelectorData from '@/components/byf/renovation/dataManager/widgetsDataManager/list/DiyImgLinkSelectorData'

export default class DiyMagicCube extends BaseWidget {

  constructor(data){
    super(data)
    // console.log('魔方控件数据: ', data)

    // 初始化 布局类型数组
    data.info.optional.forEach(item=>{
      item.path = this.path;
      item.link_params = data.info.link_params;
      this.optional[item.key] = new MagicCubeLayoutType(item)
    })

    this.selectedKey = data.info.default_value.key
  }

  // 控件的名字，跟后端数据中的控件名保持一直
  static staticWidgetName = 'magic_cube'

  /**
   * 某个布局样式
   */
  selectedKey = ''  

  /**
   * 可选布局类型
   */
  optional = {}

  /**
   * 根据 后端接口的value 更新 widget的value
   */
  updateValue(value){
    super.updateValue(value)
    // console.log('魔方控件>updateValue', value)
    // console.log('魔方控件>updateValue>this', this)
    this.selectedKey = value.key

    let arr = this.optional[this.selectedKey].imgLinks
    value.image_arr.forEach((item, index)=>{
      arr[index].updateValue(item)
    })
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
    let data = { key: this.selectedKey, image_arr: []}
    this.optional[this.selectedKey].imgLinks.forEach(item=>{
      data.image_arr.push(item.getMyValue())
    })
    return data
  }
}

/**
 * 魔方的布局类型 类
 */
class MagicCubeLayoutType {
  constructor(data){
    // console.log('MagicCubeLayoutType', data)
    this.icon = data.icon
    this.active_icon = data.active_icon
    this.key = data.key
    this.title = data.title
    this.path = data.path;

    LayoutsImgLinksInfo[this.key].forEach(item=>{
      item.path = this.path
      item.info.link_params = data.link_params;
      this.imgLinks.push(new DiyImgLinkSelectorData(item))
    })
  }
  /**对应默认图标 */
  icon = ''
  /** 激活状态的图标*/
  active_icon = ''
  /**唯一标识 */
  key = ''
  /**标题 */
  title = ''

  /**
   * 图片链接数组
   */
  imgLinks = []
  /**
   * 从组件开始的路径数组
   */
  path = []
}

/**
 * 每种布局中对应的 图片链接选择控件
 */
let LayoutsImgLinksInfo = {
  1: [
    {"key":"1","info":{ tips:'宽度和高度会自适应展示', "type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}} }}
  ],
  2: [
    {"key":"2_1","info":{ tips:'图1和图2需要宽度和高度保持一致，否则图片会显示异常',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"2_2","info":{ tips:'图1和图2需要宽度和高度保持一致，否则图片会显示异常',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}}
  ],
  3: [
    {"key":"3_1","info":{ tips:'图1、图2和图3需要宽度和高度保持一致，否则图片会显示异常',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_2","info":{ tips:'图1、图2和图3需要宽度和高度保持一致，否则图片会显示异常',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_3","info":{ tips:'图1、图2和图3需要宽度和高度保持一致，否则图片会显示异常',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}}
  ],
  4: [
    {"key":"3_1","info":{ tips:'3张图宽度保持一致，，图2高度和图3高度一致，图2高度+图3高度+内部间距=图1高度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_2","info":{ tips:'3张图宽度保持一致，，图2高度和图3高度一致，图2高度+图3高度+内部间距=图1高度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_3","info":{ tips:'3张图宽度保持一致，，图2高度和图3高度一致，图2高度+图3高度+内部间距=图1高度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}}
  ],
  5: [
    {"key":"3_1","info":{ tips:'图2和图3高度保持一致，图2宽度+图3宽度+内部间距=图1宽度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_2","info":{ tips:'图2和图3高度保持一致，图2宽度+图3宽度+内部间距=图1宽度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_3","info":{ tips:'图2和图3高度保持一致，图2宽度+图3宽度+内部间距=图1宽度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}}
  ],
  6: [
    {"key":"3_1","info":{ tips:'图1和图2宽度保持一致，图3和图4宽度、高度保持一致，图2和图3高度保持一致，图3宽度+图4宽度+内部间距=图2宽度，图2高度+图3高度+内部间距=图1高度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_2","info":{ tips:'图1和图2宽度保持一致，图3和图4宽度、高度保持一致，图2和图3高度保持一致，图3宽度+图4宽度+内部间距=图2宽度，图2高度+图3高度+内部间距=图1高度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_3","info":{ tips:'图1和图2宽度保持一致，图3和图4宽度、高度保持一致，图2和图3高度保持一致，图3宽度+图4宽度+内部间距=图2宽度，图2高度+图3高度+内部间距=图1高度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}},
    {"key":"3_3","info":{ tips:'图1和图2宽度保持一致，图3和图4宽度、高度保持一致，图2和图3高度保持一致，图3宽度+图4宽度+内部间距=图2宽度，图2高度+图3高度+内部间距=图1高度',"type":"img_link_selector","default_value":{"image":{"url":"","size":[]},"link":{"type":-1,"link_id":0,"url":"","name":"","access_control":{"sys":[],"user":[]},"params":null}}}}
  ],
}