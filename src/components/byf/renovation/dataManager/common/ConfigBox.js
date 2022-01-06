

// 导入控件类
import WidgetsKeyMap from '@/components/byf/renovation/dataManager/widgetsDataManager/index.js'

/**
 * 控件组 类 对应页面配置区域的折叠面板
 */
export default class ConfigBox {
    constructor(data){
        this.key = data.key;
        this.title = data.title;
        this.hide = !!data.hide;
        this.path = [...data.path, this.key];
        this.init(data)
    }

    /**
     * 唯一标识
     */
    key = ''

    /**
     * 折叠面板的标题
     */
    title = ''
    /**
     * 包含的控件列表
     */
    widgets_list = {}
    /**
     * 是否隐藏对应折叠面板
     */
    hide = false;
    /**
     * 从组件开始的路径数组
     */
    path = []

    init(data){
    // console.log('data.widgets_list: ', data.widgets_list)
    for(let y in data.widgets_list) {
        let widgetItem = data.widgets_list[y];
        // console.log('widgetItem: ', widgetItem)
        widgetItem.path = this.path
        if(widgetItem.info) {
            // console.log('widgetItem.info: ', widgetItem.info)
            if(WidgetsKeyMap[widgetItem.info.type]) {
                // console.log('[this.componentKey]: ', [this.componentKey])
                this.addOneWidget(new (WidgetsKeyMap[widgetItem.info.type])(widgetItem))
            } else {
                console.warn('未知控件：'+widgetItem.info.type)
            }
        } else {
        this.addOneWidget(new (WidgetsKeyMap['box'])(widgetItem))
        }
    }
    }

    /**
     * 添加一个控件
     * @param {object} widget 某个控件对象
     */
    addOneWidget(widget){
        this.widgets_list[widget.key] = widget;
    }

} 