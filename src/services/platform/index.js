import { request, METHOD } from '@/utils/request'


const apiList = {
  AdminAppList: '/admin/platform/default/index', // 应用列表
  AdminFavoriteAppList: '/admin/platform/default/favorite-index', // 星标列表
  AdminRecycleAppList: '/admin/platform/default/recycle-index', // 回收站列表
  AdminAppCreate: '/admin/platform/default/add', // 创建应用
  PlatformUsersList: '/admin/platform/default/user-index', // 平台用户列表
  PlatformUsersAdd: '/admin/platform/default/user-add', // 平台用户添加
  PlatformUserEdit: '/admin/platform/default/user-edit', // 平台用户修改状态
  PlatformUsersDelete: '/admin/platform/default/user-del', // 平台用户删除
  PlatformAddFavorite: '/admin/platform/default/favorite-add', // 平台添加星标
  PlatformDelFavorite: '/admin/platform/default/favorite-del', // 平台删除星标
  PlatformInfo: '/admin/platform/default/detail', // 平台详情
  PlatformDisable: '/admin/platform/default/disable', // 禁用平台
  PlatformEnable: '/admin/platform/default/enable', // 启用平台
  PlatformDel: '/admin/platform/default/del', // 删除平台，进入超管回收站
  PlatformEdit: '/admin/platform/default/edit', // 平台详情修改信息
  PlatformAddonsGroup: '/admin/platform/default/addons-group', // 平台详情套餐组
  PlatformAddonsExtra: '/admin/platform/default/addons-extra', // 平台详情附加应用
  PlatformUserIndex: '/admin/platform/default/user-index', // 平台详情查询平台用户
  PlatformUserAddSms: '/admin/platform/default/user-add-sms', // 平台详情添加用户短信验证码
  PlatformReapply: '/admin/platform/default/reapply', // 重新提交审核
  PlatformConfigGet: '/admin/core/config/sys-get',// 配置获取
  PlatformConfigSet: '/admin/core/config/sys-set',// 配置设置
}


/**
 * 获取应用列表
 * parameter: {
 *  @param [string] name 应用名称
 *  @param [string] page_size 每页数量
 *  @param [string] page 页数
 * }
 */
export function getAdminAppList(parameter) {
  return request({
    url: apiList.AdminAppList,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 获取星标平台列表
 * parameter: {
 *  @param [string] name 应用名称
 *  @param [string] page_size 每页数量
 *  @param [string] page 页数
 * }
 */
export function getAdminFavoriteAppList(parameter) {
  return request({
    url: apiList.AdminFavoriteAppList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 获取回收站平台列表
 * parameter: {
 *  @param [string] name 应用名称
 *  @param [string] page_size 每页数量
 *  @param [string] page 页数
 * }
 */
export function getAdminRecycleAppList(parameter) {
  return request({
    url: apiList.AdminRecycleAppList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 创建平台
 * parameter: {
 *  @param [string] name 平台名称
 *  @param [string] logo 平台logo
 *  @param [string] type 平台类型
 * }
 */
export function createAdminApp(parameter) {
  return request({
    url: apiList.AdminAppCreate,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 获取平台用户列表
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] page_size 每页数量
 *  @param [string] page 页数
 * }
 */
export function getPlatformUsersList(parameter) {
  return request({
    url: apiList.PlatformUsersList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 平台用户添加
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] mobile 用户手机号
 *  @param [string] password 用户密码
 * }
 */
export function platformUsersAdd(parameter) {
  return request({
    url: apiList.PlatformUsersAdd,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 平台用户修改（状态）
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] mid 管理用户ID
 *  @param [string] status 用户状态：1正常，0禁用
 * }
 */
export function platformUserEdit(parameter) {
  return request({
    url: apiList.PlatformUserEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 平台用户删除
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] mid 管理ID
 * }
 */
export function platformUsersDelete(parameter) {
  return request({
    url: apiList.PlatformUsersDelete,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 平台添加星标
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function platformAddFavorite(parameter) {
  return request({
    url: apiList.PlatformAddFavorite,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 平台删除星标
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function platformDelFavorite(parameter) {
  return request({
    url: apiList.PlatformDelFavorite,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 禁用平台
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function platformDisable(parameter) {
  return request({
    url: apiList.PlatformDisable,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 启用平台
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function platformEnable(parameter) {
  return request({
    url: apiList.PlatformEnable,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 删除平台
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function platformDel(parameter) {
  return request({
    url: apiList.PlatformDel,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 平台详情
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function getPlatformInfo(parameter) {
  return request({
    url: apiList.PlatformInfo,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 平台详情修改
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] logo 平台logo url
 *  @param [string] name 平台名称
 * }
 */
export function platformEdit(parameter) {
  return request({
    url: apiList.PlatformEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 获取平台详情套餐组
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function getPlatformAddonsGroup(parameter) {
  return request({
    url: apiList.PlatformAddonsGroup,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 获取平台详情附加应用
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function getPlatformAddonsExtra(parameter) {
  return request({
    url: apiList.PlatformAddonsExtra,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 获取平台详情平台用户
 * parameter: {
 *  @param [string] pmid 平台ID
 * }
 */
export function getPlatformUserIndex(parameter) {
  return request({
    url: apiList.PlatformUserIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 获取平台详情平台用户
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] mobile 手机号
 * }
 */
export function getPlatformUserAddSms(parameter) {
  return request({
    url: apiList.PlatformUserAddSms,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 获取平台详情平台用户
 * parameter: {
 *  @param [string] pmid 平台ID
 *  @param [string] mobile 手机号
 * }
 */
export function platformReapply(parameter) {
  return request({
    url: apiList.PlatformReapply,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 配置获取
 * parameter: {
 *  @param [string] config 配置对象
 * }
 */
export function platformConfigGet(parameter) {
  return request({
    url: apiList.PlatformConfigGet,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 配置设置
 * parameter: {
 *  @param [string] config 配置对象
 * }
 */
export function platformConfigSet(parameter) {
  return request({
    url: apiList.PlatformConfigSet,
    method: METHOD.POST,
    data: parameter
  })
}
