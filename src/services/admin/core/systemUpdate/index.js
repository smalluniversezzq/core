import { request, METHOD } from '@/utils/request'

const apiList = {
  SystemUpdateIndex: '/admin/core/system-update/list', //控制台列表
  SystemUpdateAddOrEdit: '/admin/core/system-update/add-or-edit', // 添加或更新
  SystemUpdateDel: '/admin/core/system-update/del', //删除
}
/**
 * 控制台列表
 * parameter: {
 *  @param [Number] page_size 每页数量
 *  @param [Number] page 分页页数
 * }
 */
export function getSystemUpdateIndex(parameter) {
  return request({
    url: apiList.SystemUpdateIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 添加/修改
 * parameter: {
 *  @param [String] title 标题
 *  @param [Array] update_items 更新项
 *  @param [String] release_time 发布时间
 *  @param [String] is_show 是否显示0不显示;1显示
 *  @param [String] id id,修改时传入
 * }
 */
export function systemUpdateAddOrEdit(parameter) {
  return request({
    url: apiList.SystemUpdateAddOrEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 删除
 * parameter: {
 *  @param [String] id 记录id
 * }
 */
export function systemUpdateDel(parameter) {
  return request({
    url: apiList.SystemUpdateDel,
    method: METHOD.POST,
    data: parameter
  })
}
