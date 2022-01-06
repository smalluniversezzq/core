/**
 * 新增的控件放入./list 目录下。此文件会自动将./list目录下的文件处理，一块导出。
 */

const files = require.context('./list', false, /.js$/);
const objects = {}

files.keys().forEach(key => {
  if(files(key).default.staticName) {
    objects[files(key).default.staticName] = files(key).default
  } else {
    console.warn('自定义装修组件异常：'+key+'staticName')
  }
})

export default objects