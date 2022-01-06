import { request, METHOD } from '@/utils/request'

const apiList = {
  AdminPlatformGroupIndex: '/admin/admin-platform-group/index', // 套餐组列表
  AdminPlatformGroupAdd: '/admin/admin-platform-group/add', // 套餐组添加
  AdminPlatformGroupEdit: '/admin/admin-platform-group/edit', // 套餐组修改
  AdminPlatformGroupDel: '/admin/admin-platform-group/del', // 套餐组删除
}
/**
 * 套餐组列表
 * @param [string] status 搜索-状态
 * @param [string] name 搜索-套餐组名称
 */
export function getAdminPlatformGroupIndex(parameter) {
  return request({
    url: apiList.AdminPlatformGroupIndex,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 套餐组添加
 */
export function getAdminPlatformGroupAdd(parameter) {
  return request({
    url: apiList.AdminPlatformGroupAdd,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 套餐组修改
 */
export function getAdminPlatformGroupEdit(parameter) {
  return request({
    url: apiList.AdminPlatformGroupEdit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 套餐组删除
 */
export function getAdminPlatformGroupDel(parameter) {
  return request({
    url: apiList.AdminPlatformGroupDel,
    method: METHOD.POST,
    data: parameter
  })
}
