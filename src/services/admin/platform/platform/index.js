import { request, METHOD } from '@/utils/request'

const apiList = {
  AdminPlatformIndex: '/admin/platform/platform/index', // 平台首页头部
  AdminPlatformStoreRank: '/admin/platform/platform/store-rank', // 平台首页店铺排行
  AdminPlatformIndexHistogram: '/admin/platform/platform/index-histogram', // 平台首页可搜索部分
  AdminPlatformSystemUpdateIndex: '/admin/platform/system-update/list', // 平台首页可搜索部分
}
/**
 * 平台首页头部
 */
export function getAdminPlatformIndex(parameter) {
  return request({
    url: apiList.AdminPlatformIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 平台端更新记录
 */
export function getAdminPlatformSystemUpdateIndex(parameter) {
  return request({
    url: apiList.AdminPlatformSystemUpdateIndex,
    method: METHOD.GET,
    data: parameter
  })
}


/**
 * 平台首页店铺排行
 */
export function getAdminPlatformStoreRank(parameter) {
  return request({
    url: apiList.AdminPlatformStoreRank,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 平台首页可搜索部分
 */
export function getAdminPlatformIndexHistogram(parameter) {
  return request({
    url: apiList.AdminPlatformIndexHistogram,
    method: METHOD.GET,
    data: parameter
  })
}