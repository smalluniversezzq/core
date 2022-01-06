import { request, METHOD } from '@/utils/request'
// 积分基本配置相关接口
const apiList = {
  AdminPlatformIntegralGetSite: '/admin/platform/integral/get-site', // 基本配置获取
  AdminPlatformInteGralSite: '/admin/platform/integral/site', // 基本配置设置
  AdminPlatformInteGralIndexStyle: '/admin/platform/integral/index-style', // 积分首页配置获取
  AdminPlatformInteGralSiteIndexStyle: '/admin/platform/integral/site-index-style', // 积分首页配置
  AdminPlatformInteGralTaskPool: '/admin/platform/integral-task/pool', // 积分首页配置
  AdminPlatformInteGralTaskSavePool: '/admin/platform/integral-task/save-pool', // 任务池配置
  AdminPlatformInteGralTaskGetConfig: '/admin/platform/integral-task/get-config', // 任务配置详情
  AdminPlatformInteGralTaskSetConfig: '/admin/platform/integral-task/set-config', // 修改任务配置
  AdminPlatformInteGralSignInfo: '/admin/platform/integral/sign-info', // 设置配置详情
  AdminPlatformInteGralSignConfig: '/admin/platform/integral/sign-config', // 设置签到配置
  AdminPlatformInteGralRecordExecType: '/admin/platform/integral/record-exec-type', // 积分明细类型
  AdminPlatformInteGralRecord: '/admin/platform/integral/record', // 积分明细
  
}


/**
 * 基本配置获取
 */
export function getAdminPlatformIntegralGetSite(parameter) {
  return request({
    url: apiList.AdminPlatformIntegralGetSite,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 基本配置设置
 */
export function adminPlatformInteGralSite(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralSite,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 积分首页配置获取
 */
 export function getAdminPlatformInteGralIndexStyle(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralIndexStyle,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 积分首页配置
 */
 export function adminPlatformInteGralSiteIndexStyle(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralSiteIndexStyle,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 任务池
 */
 export function AdminPlatformInteGralTaskPool(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralTaskPool,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 任务池配置
 */
 export function AdminPlatformInteGralTaskSavePool(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralTaskSavePool,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 任务配置详情
 */
 export function AdminPlatformInteGralTaskGetConfig(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralTaskGetConfig,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 修改任务配置
 */
 export function AdminPlatformInteGralTaskSetConfig(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralTaskSetConfig,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 设置配置详情
 */
 export function AdminPlatformInteGralSignInfo(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralSignInfo,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 设置签到配置
 */
 export function AdminPlatformInteGralSignConfig(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralSignConfig,
    method: METHOD.POST,
    data: parameter
  })
}






/**
 * 积分明细类型
 */
 export function getAdminPlatformInteGralRecordExecType(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralRecordExecType,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 积分明细
 */
 export function getAdminPlatformInteGralRecord(parameter) {
  return request({
    url: apiList.AdminPlatformInteGralRecord,
    method: METHOD.GET,
    data: parameter
  })
}



