import { request, METHOD } from '@/utils/request'

const apiList = {
  AdminSiteInfo: '/admin/site/site-info', // 获取站点信息
}
/**
 * 获取站点信息
 */
export function getAdminSiteInfo() {
  return request({
    url: apiList.AdminSiteInfo,
    method: METHOD.GET,
  })
}