const files = require.context('.', false, /.vue$/);
const resultComps = {}

files.keys().forEach(key => {
  
  if(files(key).default.name) {
    resultComps[files(key).default.name] = files(key).default
  } else {
    console.warn('自定义装修组件异常：'+key+'没有name')
  }
})

export default resultComps