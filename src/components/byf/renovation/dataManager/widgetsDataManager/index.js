/**
 * 新增的控件放入./list 目录下。此文件会自动将./list目录下的文件处理，一块导出。
 */
const files = require.context('./list', false, /.js$/);
const objects = {}
let keys = files.keys()
keys.forEach(key => {
  // 下面
  let staticWidgetName = files(key).default.staticWidgetName
  if(staticWidgetName) {
    objects[staticWidgetName] = files(key).default
  } else {
    console.warn('自定义装修控件异常：'+key+'staticWidgetName')
  }
})

  // 后端数据中的控件名与 控件类名映射
export default {...objects}