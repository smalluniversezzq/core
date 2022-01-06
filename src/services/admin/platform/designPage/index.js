import { request, METHOD } from '@/utils/request'

const apiList = {
    AdminPlatformDesignIndex: '/admin/platform/design-page/index', // 后台-模板列表
    AdminPlatformDesignIndexFavorite: '/admin/platform/design-page/index-favorite', // 后台-模板标记列表
    AdminPlatformDesignGetShare: '/admin/platform/design-page/get-share', // 后台-获取共享模板
    AdminPlatformDesignShare: '/admin/platform/design-page/share', // 后台-生成共享模板
    AdminPlatformDesignDelShare: '/admin/platform/design-page/del-share', // 后台-取消生成共享模板
    
  }

/**
 * 后台-模板列表
 */
export function getAdminPlatformDesignIndex(parameter) {
  return request({
    url: apiList.AdminPlatformDesignIndex,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 后台-模板标记列表
 */
export function getAdminPlatformDesignIndexFavorite(parameter) {
  return request({
    url: apiList.AdminPlatformDesignIndexFavorite,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 后台-获取共享模板
 */
export function getAdminPlatformDesignGetShare(parameter) {
  return request({
    url: apiList.AdminPlatformDesignGetShare,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-生成共享模板
 */
export function adminPlatformDesignShare(parameter) {
  return request({
    url: apiList.AdminPlatformDesignShare,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-取消生成共享模板
 */
export function adminPlatformDesignDelShare(parameter) {
  return request({
    url: apiList.AdminPlatformDesignDelShare,
    method: METHOD.POST,
    data: parameter
  })
}


