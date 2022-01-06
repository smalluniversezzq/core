//跨域代理前缀
// const API_PROXY_PREFIX='/admin'
// const BASE_URL = process.env.NODE_ENV === 'production' ? window.location.origin : ''
const BASE_URL = window.location.origin
module.exports = {
  ROUTES: `${BASE_URL}/api/site/menus`,
  LOGIN: `localMock/login`, // workplace 演示页用到的一个接口
  SiteMenus: `${BASE_URL}/site/menus`, // 后台菜单
}
