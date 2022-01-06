import { request, METHOD } from '@/utils/request'

const apiList = {
  AdminPlatformFeedbackIndex: '/admin/platform/feedback/index', // 反馈列表
  AdminPlatformFeedbackDetail: '/admin/platform/feedback/detail', // 反馈详情
  AdminPlatformFeedbackDel: '/admin/platform/feedback/del', // 批量删除
}


/**
 * 反馈列表
 */
export function getAdminPlatformFeedbackIndex(parameter) {
  return request({
    url: apiList.AdminPlatformFeedbackIndex,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 反馈详情
 * parameter: {
 *  id: 反馈记录id
 * }
 */
export function getAdminPlatformFeedbackDetail(parameter) {
  return request({
    url: apiList.AdminPlatformFeedbackDetail,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 批量删除
 * parameter: {
 *  ids: 反馈记录ids
 * }
 */
export function getAdminPlatformFeedbackDel(parameter) {
  return request({
    url: apiList.AdminPlatformFeedbackDel,
    method: METHOD.POST,
    data: parameter
  })
}
