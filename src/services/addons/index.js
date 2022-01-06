import { request, METHOD } from '@/utils/request'

const apiList = {
  AdminAddonsIndex: '/admin/addons/index', // 应用模块列表
  AdminAddonsGroupEdit: '/admin/addons/group-edit', // 修改平台套餐
  AdminAddonsEdit: '/admin/addons/edit', // 修改平台应用
}
/**
 * 应用模块列表
 * @param [string] status 搜索-状态
 */
export function getAdminAddonsIndex(parameter) {
  return request({
    url: apiList.AdminAddonsIndex,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 修改平台应用
 * @param [string] pmid 
 * @param [Json_Array] aid 应用ID字符串
 */
export function getAdminAddonsEdit(parameter) {
  return request({
    url: apiList.AdminAddonsEdit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 修改平台套餐
 * @param [string] pmid 平台ID
 * @param [int] group_id 组ID
 */
export function getAdminAddonsGroupEdit(parameter) {
  return request({
    url: apiList.AdminAddonsGroupEdit,
    method: METHOD.POST,
    data: parameter
  })
}
