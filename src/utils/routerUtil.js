import routerMap from '@/router/router.map'
import { mergeI18nFromRoutes } from '@/utils/i18n'
import Router from 'vue-router'
import { loginIgnore } from '@/router'
import { checkAuthorization } from '@/utils/request'

/**
 * 根据 路由配置 和 路由组件注册 解析路由
 * @param routesConfig 路由配置
 * @param routerMap 本地路由组件注册配置
 */
function parseRoutes(routesConfig, routerMap) {
  let routes = []
  routesConfig.forEach(item => {
    // 获取注册在 routerMap 中的 router，初始化 routeCfg
    let router = undefined, routeCfg = {}
    if (typeof item === 'string' && routerMap[item]) {
      router = routerMap[item]
      routeCfg = { path: router.path || item, router: item }
    } else if (typeof item === 'object') {
      router = routerMap[item.router]
      routeCfg = item
    }
    // 从 router 和 routeCfg 解析路由
    if (!router) {
      console.warn(`can't find register for router ${routeCfg.router}, please register it in advance.`)
    } else {
      const route = {
        path: routeCfg.path || router.path || routeCfg.router,
        name: routeCfg.name || router.name,
        component: router.component,
        redirect: routeCfg.redirect || router.redirect,
        meta: {
          authority: routeCfg.authority || router.authority || '*',
          icon: routeCfg.icon || router.icon,
          page: routeCfg.page || router.page
        }
      }
      if (routeCfg.invisible || router.invisible) {
        route.meta.invisible = true
      }

      // 基于框架源代码新增 start
      if (routeCfg.meta || router.meta) {
        // 当接口传来的路由数据中有meta信息，就合并一下
        // Object.assign(a, b) 合并a，b两个对象，当有重复的key时，b中的值会覆盖a中的值
        route.meta = Object.assign(router.meta || {}, routeCfg.meta || {}, route.meta )
      }
      // 基于框架源代码新增 end

      if (routeCfg.children && routeCfg.children.length > 0) {
        route.children = parseRoutes(routeCfg.children, routerMap)
      }
      routes.push(route)
    }
  })
  return routes
}

/**
 * 加载路由
 * @param router 应用路由实例
 * @param store 应用的 vuex.store 实例
 * @param i18n 应用的 vue-i18n 实例
 * @param routesConfig 路由配置
 */
function loadRoutes({ router, store, i18n }, routesConfig) {
  // 如果 routesConfig 有值，则更新到本地，否则从本地获取
  if (routesConfig) {
    store.commit('account/setRoutesConfig', routesConfig)
  } else {
    routesConfig = store.getters['account/routesConfig']
  }
  
  // 如果开启了异步路由，则加载异步路由配置
  const asyncRoutes = store.state.setting.asyncRoutes

  if (asyncRoutes) {
    if (routesConfig && routesConfig.length > 0) {
      const routes = parseRoutes(routesConfig, routerMap)
      formatAuthority(routes)
      const finalRoutes = mergeRoutes(router.options.routes, routes)
      router.options = { ...router.options, routes: finalRoutes }
      router.matcher = new Router({ ...router.options, routes: [] }).matcher
      router.addRoutes(finalRoutes)
    }
  }
  // 提取路由国际化数据
  mergeI18nFromRoutes(i18n, router.options.routes)
  
  if (process.env.VUE_APP_DEVELOP_GROUP == 'core') {
    // 外层框架多生成一个控制台端的菜单
    const consoleRootRoute = router.options.routes.find(item => item.path === '/genBackstage')
    const consoleMenuRoutes = consoleRootRoute && consoleRootRoute.children
    if (consoleMenuRoutes) {
      store.commit('setting/setPlatformMenuData', consoleMenuRoutes)
    }
    // 初始化架构组Admin后台菜单数据
    const rootRoute = router.options.routes.find(item => item.path === '/corePlatform')
    const menuRoutes = rootRoute && rootRoute.children
    if (menuRoutes) {
      store.commit('setting/setMenuData', menuRoutes)
    }
  } else {
    // 初始化业务组Admin后台菜单数据
    const rootRoute = router.options.routes.find(item => item.path === '/')
    const menuRoutes = rootRoute && rootRoute.children
    if (menuRoutes) {
      store.commit('setting/setMenuData', menuRoutes)
    }
  }
}

/**
 * 合并路由
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
function mergeRoutes(target, source) {
  const routesMap = {}
  target.forEach(item => routesMap[item.path] = item)
  source.forEach(item => routesMap[item.path] = item)
  return Object.values(routesMap)
}

/**
 * 登录守卫
 * @param router 应用路由实例
 */
function loginGuard(router) {
  router.beforeEach((to, from, next) => {
    if (!loginIgnore.includes(to) && !checkAuthorization()) {
      next({ path: '/login' })
    } else {
      next()
    }
  })
}

/**
 * 权限守卫
 * @param router 应用路由实例
 * @param store 应用的 vuex.store 实例
 */
function authorityGuard(router, store) {
  router.beforeEach((to, form, next) => {
    const permissions = store.getters['account/permissions']
    const roles = store.getters['account/roles']
    if (!hasPermission(to, permissions) && !hasRole(to, roles)) {
      next({ path: '/403' })
    } else {
      next()
    }
  })
}

/**
 * 判断是否有路由的权限
 * @param route 路由
 * @param permissions 用户权限集合
 * @returns {boolean|*}
 */
function hasPermission(route, permissions) {
  const authority = route.meta.authority || '*'
  let required = '*'
  if (typeof authority === 'string') {
    required = authority
  } else if (typeof authority === 'object') {
    required = authority.permission
  }
  return required === '*' || (permissions && permissions.findIndex(item => item === required || item.id === required) !== -1)
}

/**
 * 判断是否有路由需要的角色
 * @param route 路由
 * @param roles 用户角色集合
 */
function hasRole(route, roles) {
  const authority = route.meta.authority || '*'
  let required = undefined
  if (typeof authority === 'object') {
    required = authority.role
  }
  return authority === '*' || (required && roles && roles.findIndex(item => item === required || item.id === required) !== -1)
}

/**
 * 格式化路由的权限配置
 * @param routes
 */
function formatAuthority(routes) {
  routes.forEach(route => {
    const meta = route.meta
    if (meta) {
      let authority = {}
      if (!meta.authority) {
        authority.permission = '*'
      } else if (typeof meta.authority === 'string') {
        authority.permission = meta.authority
      } else if (typeof meta.authority === 'object') {
        authority = meta.authority
      } else {
        console.log(typeof meta.authority)
      }
      meta.authority = authority
    } else {
      route.meta = {
        authority: { permission: '*' }
      }
    }
    if (route.children) {
      formatAuthority(route.children)
    }
  })
}

/**
 * 从路由 path 解析 i18n key
 * @param path
 * @returns {*}
 */
function getI18nKey(path) {
  const keys = path.split('/').filter(item => !item.startsWith(':') && item != '')
  keys.push('title')
  return keys.join('.')
}

/**
 * 根据后台传的菜单数据动态生成路由
 * @param {array} routesData 
 * @param {number} level 路由层级，'/'路由的子路由为0级
 * @returns {array} 返回菜单路由数组 格式参考如下
 * [
      {
        path: 'level1_1',
        router: 'iframeview',
        name: 'test1',
        meta: { url: 'http://native.youquanyun.com/'}
      },
      {
        path: 'level1_2',
        router: 'blankview',
        name: 'parent1',
        children: [
          {
            path: 'level2_1',
            router: 'iframeview',
            name: 'm1p1',
            meta: { url: 'https://native.youquanyun.com/uqWeb/js/http.js'}
          },
          {
            path: 'level2_2',
            router: 'blankview',
            name: 'l2l2',
            children: [
              {
                path: 'level3_1',
                router: 'demo',
                name: 'l2l2l1'
              }
            ]
          }
        ]
      },
      {
        path: 'level1_3',
        router: 'blankview',
        name: 'module3',
        children: [
          {
            path: 'level2_1',
            router: 'blankview',
            name: 'l3l1',
            children: [
              {
                path: 'level3_1',
                router: 'iframeview',
                name: 'm3p1',
                meta: {url: 'https://n.youquanyun.com/pcWeb/apidoc/'}
              }
            ]
          }
        ]
      }
    ]
 */
function createdRoutesFromData(routesData, level) {
  if(process.env.VUE_APP_DEVELOP_GROUP == 'core' && !level) {
    // 添加通用iframeView页面路由
    routesData.push({
      "icon": "",
      "router": "iframeview",
      "meta": {
        "title": "iframe页面",
        "invisible": true,
        "iframeUrl": "diy"
      }
    })
  }
  let routesArr = []
  !level && (level = 0)
  for (let i = 0; i < routesData.length; i++) {
    // 默认路由数据模板
    let pathTemplate = {
      path: 'level' + level + '_' + i,
    }
    
    for(let x in routesData[i]) {
      if(x != 'subs') {
        pathTemplate[x] = routesData[i][x]
      }
    }
    
    if (routesData[i].subs && routesData[i].subs.length > 0) {
      // 如果有子路由
      pathTemplate.router = 'blankview'
      pathTemplate.children = [];
      pathTemplate.children = pathTemplate.children.concat(createdRoutesFromData(routesData[i].subs, level + 1))
      pathTemplate.redirect = pathTemplate.path + '/level' + (level + 1) + '_0'
    } else {
      // 如果没有子路由
      pathTemplate.router = routesData[i].router
    }
    routesArr.push(pathTemplate);
  }
  return routesArr
}


export { parseRoutes, loadRoutes, loginGuard, authorityGuard, formatAuthority, getI18nKey, createdRoutesFromData }
