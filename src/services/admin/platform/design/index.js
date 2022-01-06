import { request, METHOD } from '@/utils/request'

const apiList = {
  AdminPlatformDesignAdd: '/admin/platform/design-page/add', // 后台-模板添加
  AdminPlatformDesignDel: '/admin/platform/design-page/del', // 后台-模板删除
  AdminPlatformDesignSetting: '/admin/platform/design-page/setting', // 后台-模板编辑
  AdminPlatformDesignStatusUpdate: '/admin/platform/design-page/status-update', // 后台-模板状态修改
  AdminPlatformDesignCopy: '/admin/platform/design-page/copy', // 后台-模板复制
  AdminPlatformDesignFavoriteUpdate: '/admin/platform/design-page/favorite-update', // 后台-模板标记修改
  AdminPlatformDesignNavIndex: '/admin/platform/design-nav/index', // 后台-导航列表
  AdminPlatformDesignNavAdd: '/admin/platform/design-nav/add', // 后台-导航添加
  AdminPlatformDesignNavStatusUpdate: '/admin/platform/design-nav/status-update', // 后台-导航状态修改
  AdminPlatformDesignNavSetting: '/admin/platform/design-nav/setting', // 后台-导航设置
  AdminPlatformDesignNavDel: '/admin/platform/design-nav/del', // 后台-导航删除

  AdminPlatformDesignCbgIndex: '/admin/platform/design/cbg-index', // 后台-数据按钮组-列表
  AdminPlatformDesignCbgAddOrEdit: '/admin/platform/design/cbg-add-or-edit', // 后台-数据按钮组-添加/编辑
  AdminPlatformDesignCbgShowUpdate: '/admin/platform/design/cbg-show-update', // 后台-数据按钮组-状态修改
  AdminPlatformDesignCbgDel: '/admin/platform/design/cbg-del', // 后台-数据按钮组-删除
  AdminByTbkConfigGetConfig: '/admin/by-tbk/config/get-config', //搜索个性化配置获取
  AdminByTbkConfigSetConfig: '/admin/by-tbk/config/set-config', //搜索个性化配置设置
}
/**
 * 后台-模板添加
 * parameter: {
 *  title: 模板标题
 * }
 */
export function getAdminPlatformDesignAdd(parameter) {
  return request({
    url: apiList.AdminPlatformDesignAdd,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-模板删除
 * parameter: {
 *  id: 模板id
 * }
 */
export function getAdminPlatformDesignDel(parameter) {
  return request({
    url: apiList.AdminPlatformDesignDel,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-模板设置
 */
export function getAdminPlatformDesignSetting(parameter) {
  return request({
    url: apiList.AdminPlatformDesignSetting,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-模板状态修改
 */
export function getAdminPlatformDesignStatusUpdate(parameter) {
  return request({
    url: apiList.AdminPlatformDesignStatusUpdate,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-模板复制
 */
export function getAdminPlatformDesignCopy(parameter) {
  return request({
    url: apiList.AdminPlatformDesignCopy,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-模板标记修改
 */
export function getAdminPlatformDesignFavoriteUpdate(parameter) {
  return request({
    url: apiList.AdminPlatformDesignFavoriteUpdate,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 后台-导航列表
 */
export function getAdminPlatformDesignNavIndex(parameter) {
  return request({
    url: apiList.AdminPlatformDesignNavIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 后台-导航添加
 */
export function getAdminPlatformDesignNavAdd(parameter) {
  return request({
    url: apiList.AdminPlatformDesignNavAdd,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-导航状态修改
 */
export function getAdminPlatformDesignNavStatusUpdate(parameter) {
  return request({
    url: apiList.AdminPlatformDesignNavStatusUpdate,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-导航设置
 */
export function getAdminPlatformDesignNavSetting(parameter) {
  return request({
    url: apiList.AdminPlatformDesignNavSetting,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台-导航删除
 */
export function getAdminPlatformDesignNavDel(parameter) {
  return request({
    url: apiList.AdminPlatformDesignNavDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 后台-数据按钮组-列表
 */
export function getAdminPlatformDesignCbgIndex(parameter) {
  return request({
    url: apiList.AdminPlatformDesignCbgIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 后台-数据按钮组-添加/编辑
 */
export function adminPlatformDesignCbgAddOrEdit(parameter) {
  return request({
    url: apiList.AdminPlatformDesignCbgAddOrEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 后台-数据按钮组-状态修改
 */
export function adminPlatformDesignCbgShowUpdate(parameter) {
  return request({
    url: apiList.AdminPlatformDesignCbgShowUpdate,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 后台-数据按钮组-删除
 */
export function adminPlatformDesignCbgDel(parameter) {
  return request({
    url: apiList.AdminPlatformDesignCbgDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 搜索个性化配置获取
 */
export function AdminByTbkConfigGetConfig(parameter) {
  return request({
    url: apiList.AdminByTbkConfigGetConfig,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 搜索个性化配置设置
 */
export function AdminByTbkConfigSetConfig(parameter) {
  return request({
    url: apiList.AdminByTbkConfigSetConfig,
    method: METHOD.POST,
    data: parameter
  })
}

