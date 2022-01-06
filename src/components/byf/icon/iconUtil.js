
import config from '@/config'

function appendTag (tag, attrs){
  let tags = document.createElement(tag);  //创建一个标签
  for(let k in attrs){ // 添加属性到标签
    tags[k] = attrs[k]
  }
  document.body.appendChild(tags);
}
export function loadIconJsAndCss (type) {
  if(type == 'default'){
    // 加载默认
    appendTag('script', {
      type: 'text/javascript',
      src: config.iconfontUrl[0]
    })
    appendTag('link', {
      rel: 'stylesheet',
      href: config.iconfontClasses[0]
    })
  }else if(type == 'other'){
    // 加载其他（除默认之外）
    // 加载js
    config.iconfontUrl.map((item, index) => {
      if(index > 0){
        appendTag('script', {
          type: 'text/javascript',
          src: item
        })
      }
    })
    // 加载css
    config.iconfontClasses.map((item, index) => {
      if(index > 0){
        appendTag('link', {
          rel: 'stylesheet',
          href: item
        })
      }
    })
  }else{
    // 加载所有
    // 加载js
    config.iconfontUrl.map(item => {
      appendTag('script', {
        type: 'text/javascript',
        src: item
      })
    })
    // 加载css
    config.iconfontClasses.map(item => {
      appendTag('link', {
        rel: 'stylesheet',
        href: item
      })
    })
  }
}