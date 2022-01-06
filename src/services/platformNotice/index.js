import { request, METHOD } from '@/utils/request'
// 平台端通知公告相关API
const apiList = {
  CoreNoticeIndex: '/admin/platform/notice/list', // 公告列表
  CoreNoticeRead: '/admin/platform/notice/read', //标记已读
  CoreNoticeNotRead: '/admin/platform/notice/not-read', //未读数量
  CoreNoticeDel: '/admin/platform/notice/del', // 删除
}
/**
 * 公告列表
 * parameter: {
 *  @param [Number] page_size 每页数量
 *  @param [Number] page 页数
 *  @param [String] title 搜索标题
 *  @param [String] type 公告状态
 *  @param [String] target 接收目标
 * }
 */
export function getCoreNoticeIndex(parameter) {
  return request({
    url: apiList.CoreNoticeIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 标记已读
 * parameter: {
 *  @param [String] id 公告id
 * }
 */
export function coreNoticeRead(parameter) {
  return request({
    url: apiList.CoreNoticeRead,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 未读数量
 * parameter: {
 * }
 */
export function getCoreNoticeNotRead(parameter) {
  return request({
    url: apiList.CoreNoticeNotRead,
    method: METHOD.GET,
    data: parameter
  })
}

/**
  * 公告删除
  * parameter: {
  *  @param [Number] id 公告id
  * }
 */
export function coreNoticeDel(parameter) {
  return request({
    url: apiList.CoreNoticeDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
  * 公告详情
  * parameter: {
  *  @param [Number] id 公告id
  * }
 */
export function getCoreNoticeDetail(parameter) {
  return request({
    url: apiList.CoreNoticeDetail,
    method: METHOD.GET,
    data: parameter
  })
}