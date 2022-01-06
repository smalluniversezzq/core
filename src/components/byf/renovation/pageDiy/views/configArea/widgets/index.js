const files = require.context('.', true, /.vue$/);
const resultComps = {}

files.keys().forEach(key => {
  // notWidget 表示该文件不是控件
  if(files(key).default.name && !files(key).default.notWidget) {
    resultComps[files(key).default.name] = files(key).default
  } else if(!files(key).default.notWidget) {
    console.warn('自定义装修控件异常：'+key+'没有name')
  }
})

export default resultComps