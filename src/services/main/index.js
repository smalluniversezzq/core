import { request, METHOD } from '@/utils/request'

const apiList = {
  AdminMainMenu: '/admin/main/menu', // 控制台菜单
  AdminUserInfo: '/admin/main/user-info', // 个人信息
  AdminUserInfoEdit: '/admin/main/user-info-edit', // 个人信息修改，头像、真实姓名
  AdminUserInfoPasswordEdit: '/admin/main/user-password-edit', // 个人信息修改密码
}

/**
 * 获取个人信息
 */
export function getAdminUserInfo() {
  return request({
    url: apiList.AdminUserInfo,
    method: METHOD.GET
  })
}
/**
 * 修改个人信息：头像、真实姓名等
 */
export function adminUserInfoEdit(parameter) {
  return request({
    url: apiList.AdminUserInfoEdit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 修改个人信息：密码
 */
export function adminUserInfoPasswordEdit(parameter) {
  return request({
    url: apiList.AdminUserInfoPasswordEdit,
    method: METHOD.POST,
    data: parameter
  })
}