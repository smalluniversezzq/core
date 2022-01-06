// 组件演示和文档 的 路由映射
export default {
  /** 按钮 组件 展示 */
  demoColorPicker: {
    component: () => import('@/pages/demo/demoColorPicker/index')
  },
  /** 按钮 组件 展示 */
  demoButton: {
    component: () => import('@/pages/demo/demoButton/demoButton')
  },
  /** 图标 组件 展示 */
  demoIcon: {
    component: () => import('@/pages/demo/demoIcon/demoIcon')
  },
  /**输入框 组件 展示 */
  inputDemo: {
    component: () => import('@/pages/demo/demoInput/demoInput')
  },
  /**单选框 组件 展示 */
  radioDemo: {
    component: () => import('@/pages/demo/demoRadio/demoRadio')
  },
  /**卡片 组件 展示 */
  demoCard: {
    component: () => import('@/pages/demo/demoCard/demoCard')
  },
  /**统计数值 组件 展示 */
  demoStatistic: {
    component: () => import('@/pages/demo/demoStatistic/demoStatistic')
  },
  /**倒计时 组件 展示 */
  demoStatisticCountdown: {
    component: () => import('@/pages/demo/demoStatistic/demoStatisticCountdown')
  },
  /**标签页 组件 展示 */
  demoTabs: {
    component: () => import('@/pages/demo/demoTabs/demoTabs')
  },
  /** 树形控件 组件 展示 */
  demoTree: {
    component: () => import('@/pages/demo/demoTree/demoTree')
  },
  /** 树选择 组件 展示 */
  demoTreeSelect: {
    component: () => import('@/pages/demo/demoTreeSelect/demoTreeSelect')
  },
  /** 多规格配置 业务组件 展示 */
  demoMultiSpecs: {
    component: () => import('@/pages/demo/demoMultiSpecs/demoMultiSpecs')
  },
  /** 表格 组件 展示 */
  demoTableGridMerge: {
    component: () => import('@/pages/demo/demoTable/demoTableGridMerge')
  },
  /** 级联选择 组件 展示 */
  demoCascader: {
    component: () => import('@/pages/demo/demoCascader/demoCascader')
  },
  /** 多级分类 组件 展示 */
  demoMutiLevelClassify: {
    component: () => import('@/pages/demo/demoMutiLevelClassify/demoMutiLevelClassify')
  },
  /**时间选择框 组件 展示 */
  timePickerDemo: {
    component: () => import('@/pages/demo/demoPicker/demoTimePicker')
  },
  /**日期选择框 组件 展示 */
  datePickerDemo: {
    component: () => import('@/pages/demo/demoPicker/demoDatePicker')
  },
  /**日期范围选择框 组件 展示 */
  demoRangePicker: {
    component: () => import('@/pages/demo/demoPicker/demoRangePicker')
  },
  /**上传组件 组件 展示 */
  demoUpload: {
    component: () => import('@/pages/demo/demoUpload/demoUpload')
  },
  /**地址选择 组件 展示 */  
  demoDistrictSelect: {
    component: () => import('@/pages/demo/demoDistrictSelect')
  },
  /**图标选择 组件 展示 */
  demoIconfontSelector: {
    component: () => import('@/pages/demo/demoIconfontSelector')
  },
  /**全局方法 展示 */
  demoGlobalFunc: {
    component: () => import('@/pages/demo/demoGlobalFunc')
  },
  /** 图片预览组件 展示 */
  demoImgViewer: {
    component: () => import('@/pages/demo/demoImgViewer')
  },
  /** 链接选择器组件 展示 */
  demoLinkSelector: {
    component: () => import('@/pages/demo/demoLinkSelector')
  },
  /** 富文本组件 展示 */
  demoRichEditor: {
    component: () => import('@/pages/demo/demoRichEditor')
  },
}