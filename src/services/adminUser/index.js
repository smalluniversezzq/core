import { request, METHOD, exportExcel } from '@/utils/request'

const apiList = {
  AdminPlatformUsersList: '/admin/admin-user/index', // 总平台用户列表
  AdminPlatformUsersAdd: '/admin/admin-user/add', // 总平台用户添加
  AdminPlatformUsersEdit: '/admin/admin-user/edit', // 总平台用户修改
  AdminUserSearchUser: '/admin/admin-user/search-user', // 搜索用户列表
}
/**
 * 总平台平台用户列表
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] mid 管理ID
 * }
 */
export function getAdminPlatformUsersList(parameter) {
  return request({
    url: apiList.AdminPlatformUsersList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 总平台平台用户添加
 * parameter: {
 *  @param [string] username 用户姓名
 *  @param [string] password 密码
 *  @param [string] avatar 头像url
 *  @param [string] real_name 真实姓名
 *  @param [string] mobile 手机号
 *  @param [string] platform_limit 平台数量限制
 *  @param [string] status 状态
 * }
 */
export function adminPlatformUsersAdd(parameter) {
  return request({
    url: apiList.AdminPlatformUsersAdd,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 总平台平台用户修改
 * parameter: {
 *  @param [string] username 用户姓名
 *  @param [string] password 密码
 *  @param [string] avatar 头像url
 *  @param [string] real_name 真实姓名
 *  @param [string] mobile 手机号
 *  @param [string] platform_limit 平台数量限制
 *  @param [string] status 状态
 * }
 */
export function adminPlatformUsersEdit(parameter) {
  return request({
    url: apiList.AdminPlatformUsersEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 搜索用户列表
 */
export function getAdminUserSearchUser(parameter) {
  return request({
    url: apiList.AdminUserSearchUser,
    method: METHOD.GET,
    data: parameter
  })
}


/**
 * 导出用户数据为表格
 */
export function exportUserTableData(parameter) {
  return exportExcel(apiList.AdminPlatformUsersList, parameter);
}