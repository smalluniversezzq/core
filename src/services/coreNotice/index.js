import { request, METHOD } from '@/utils/request'
// 控制台通知公告相关API
const apiList = {
  CoreNoticeIndex: '/admin/core/notice/index', // 公告列表
  CoreNoticeAdd: '/admin/core/notice/add', //公告添加
  CoreNoticeEdit: '/admin/core/notice/edit', // 修改
  CoreNoticeDel: '/admin/core/notice/del', // 删除
  CoreNoticeDetail: '/admin/core/notice/detail', // 详情
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
 * 公告添加
 * parameter: {
 *  @param [String] title 公告标题
 *  @param [String] content 公告内容
 *  @param [String] importance 重要程度
 *  @param [String] target 接收目标
 *  @param [String] platform_ids 接收或不接收的平台id列表
 *  @param [String] release_time 发布时间，时间戳
 *  @param [String] type 类型
 * }
 */
export function coreNoticeAdd(parameter) {
  return request({
    url: apiList.CoreNoticeAdd,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 公告修改
 * parameter: {
 *  @param [Number] id 公告id
 *  @param [String] title 公告标题
 *  @param [String] content 公告内容
 *  @param [String] importance 重要程度
 *  @param [String] target 接收目标
 *  @param [String] platform_ids 接收或不接收的平台id列表
 *  @param [String] release_time 发布时间，时间戳
 *  @param [String] type 类型
 * }
 */
export function coreNoticeEdit(parameter) {
  return request({
    url: apiList.CoreNoticeEdit,
    method: METHOD.POST,
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
export function coreNoticeDetail(parameter) {
  return request({
    url: apiList.CoreNoticeDetail,
    method: METHOD.GET,
    data: parameter
  })
}