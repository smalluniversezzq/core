import { request, METHOD } from '@/utils/request'
import { getByfComponentsApi } from '@/utils/util'

const apiList = {
  AdminPlatformDesignEdit: '/admin/platform/design-page/edit', // 后台-模板修改
  AdminPlatformDesignElements: '/admin/platform/design/elements', // 后台-组件列表
  AdminPlatformDesignPageDetail: '/admin/platform/design-page/detail', // 后台-模板详情
  AdminPlatformDesignNavDetail: '/admin/platform/design-nav/detail', // 后台-导航详情
  AdminPlatformDesignNavEdit: '/admin/platform/design-nav/edit', // 后台-导航修改
}

const ApiConfigKey = 'diyPage'
/**
 * 后台-模板修改
 * parameter: {
 *  模板数据
 * }
 */
export function getAdminPlatformDesignEdit(parameter) {
  return request({
    url: getByfComponentsApi('AdminPlatformDesignEdit', ApiConfigKey) || apiList.AdminPlatformDesignEdit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-组件列表
 */
export function getAdminPlatformDesignElements(parameter) {
  return request({
    url: getByfComponentsApi('AdminPlatformDesignElements', ApiConfigKey) || apiList.AdminPlatformDesignElements,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 后台-导航详情
 */
export function getAdminPlatformDesignNavDetail(parameter) {
  return request({
    url: getByfComponentsApi('AdminPlatformDesignNavDetail', ApiConfigKey) || apiList.AdminPlatformDesignNavDetail,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 后台-导航修改
 */
export function getAdminPlatformDesignNavEdit(parameter) {
  return request({
    url: getByfComponentsApi('AdminPlatformDesignNavEdit', ApiConfigKey) || apiList.AdminPlatformDesignNavEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
* 后台-模板详情
* parameter: {
*  id: 模板id
* }
*/
export function getAdminPlatformDesignDetail(parameter) {
return request({
  url: getByfComponentsApi('AdminPlatformDesignPageDetail', ApiConfigKey) || apiList.AdminPlatformDesignPageDetail,
  method: METHOD.GET,
  data: parameter
})
}