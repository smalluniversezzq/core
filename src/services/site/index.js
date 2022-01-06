import { request, METHOD, removeAuthorization } from '@/utils/request'
import moment from 'moment'
const apiList = {
  // AdminSiteLogin: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/login', // 登录平台接口
  AdminSiteSid: '/admin/site/sid', // 获取sid
  AdminSiteLogin: '/admin/site/login', // 登录平台接口
  AdminSiteLogout: '/admin/site/logout', // 登录退出接口
}

/**
 * 清空本地存储的用户相关信息
 */
export let removeLocalUserData = ()=>{
  localStorage.removeItem('uSid')
  localStorage.removeItem('uPmid')
  localStorage.removeItem('firstPath')
  localStorage.removeItem('platformInfo')
  localStorage.removeItem(process.env.VUE_APP_USER_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  removeAuthorization()
}

/**
 * 获取sid
 */
export function getSiteSid() {
  return new Promise((resolve, reject) => {
    return request({
      url: apiList.AdminSiteSid,
      method: METHOD.GET
    }).then((res) => {
      if (res.code == 200) {
        localStorage.setItem('uSid', res.data.sid)
        let calibrationTimeDifference = 0; // 校时时间差
        let nowTime = moment().unix();
        let serverTime = res.data.t;
        calibrationTimeDifference = nowTime - serverTime;
        localStorage.setItem("calibrationTimeDifference", calibrationTimeDifference)
      }
      resolve(res)
    }).catch(err => reject(err))
  })
}

/**
 * 登录平台
 * parameter: {
 *     username: 登录账号,
 *     password: 密码,
 * }
 */
export async function siteLogin(parameter) {
  return request({
    url: apiList.AdminSiteLogin,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 退出平台
 */
export function siteLogout() {
  return new Promise((resolve, reject) => {
    request({
      url: apiList.AdminSiteLogout,
      method: METHOD.GET
    }).then((res) => {
      if (res.code == 200) {
        removeLocalUserData()
        // 退出账号成功，重新获取u-sid 改为进登录页时获取
      }
      resolve(res)
    }).catch(err => reject(err))
  })
}

/**
 * 前往登录页
 */
export function goLogin(){
  removeLocalUserData()

  getSiteSid().then(res => {
    if (res.code == 200) {
      top.vueObj.$router.push('/login')
    }
  })
}