import Vue from 'vue'
import Router from 'vue-router'
import { formatAuthority } from '@/utils/routerUtil'

// TODO 解决页面自我跳转报错，如：带有url路径参数的路由需要自我跳转
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// end
Vue.use(Router)

// 不需要登录拦截的路由配置
const loginIgnore = {
  names: ['404', '403'],      //根据路由名称匹配
  paths: ['/login'],   //根据路由fullPath匹配
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path)
  }
}

/**
 * 初始化路由实例
 * @param isAsync 是否异步路由模式
 * @returns {VueRouter}
 */
async function initRouter(isAsync) {
  const options = isAsync ? require('./config.async').default : require('./config').default
  formatAuthority(options.routes)
  return new Router(options)
}
export {loginIgnore, initRouter}
