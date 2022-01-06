/**
 * 重置iframe框架的滚动条到某个位置
 * 此方法只能重置框架容器的滚动条。开发自己写的容器的滚动条无效。
 * @param {number} position 目标位置。默认为0
 */
export let resetFrameContentScroll = function (position = 0){
  // 将各种可能是容器的滚动条重置。因为需要判断的情况太复杂了，所以不判断了
  document.getElementById('blank-view-with-footer-content') && (document.getElementById('blank-view-with-footer-content').scrollTop = position)
  document.getElementById('tabs-view-by-content') && (document.getElementById('tabs-view-by-content').scrollTop = position)
}

/**
 * 判断页面是否在iframe中
 * @returns {boolean} true：在。false：不在。
 */
export let ifInIframe = function(){
  return self != top
}

/**
 * 打开新的标签页 给iframe内的页面使用
 * @param {object} pageData 要打开的页面的信息
 * @param {string} pageData.name 要打开的页面的名字（通过后台接口传过来的页面配置数据都有name）
 * @param {object} pageData.query 和name配合使用。键值对
 * 
 * 想要打开菜单中没有的页面时：openNewTabsPage({name:'iframeview', query: {url:'http://www.baidu.com', title: '百度1'}})
 */
export let openNewTabsPage =  function(pageData){
  if(pageData.name) {
    if(!pageData.query) pageData.query = {}
    top.vueObj.$router.push({name: pageData.name, query: {...pageData.query}})
  }
}