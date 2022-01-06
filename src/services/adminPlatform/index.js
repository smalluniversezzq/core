import { request, METHOD, exportExcel } from '@/utils/request'

const apiList = {
  AdminPlatformIndex: '/admin/admin-platform/index', // 平台列表
  AdminPlatformDetail: '/admin/admin-platform/detail', // 平台详情
  AdminPlatformLimit: '/admin/admin-platform/limit', // 限制平台
  AdminPlatformUnLimit: '/admin/admin-platform/un-limit', // 取消限制平台
  AdminPlatformDel: '/admin/admin-platform/del', // 删除平台（超管删除）
  AdminPlatformRealDel: '/admin/admin-platform/real-del', // 删除平台（超管删除）
  AdminPlatformUnDel: '/admin/admin-platform/un-del', // 恢复平台（超管恢复删除到正常状态）
  AdminPlatformRecycleIndex: '/admin/admin-platform/recycle-index', // 平台回收站列表
  AdminPlatformAuditIndex: '/admin/admin-platform/audit-index', // 平台审核列表
  AdminPlatformAudit: '/admin/admin-platform/audit', // 平台审核
  AdminPlatformCreate: '/admin/admin-platform/create', // 创建平台
}
/**
 * 获取平台列表
 * @param [string] pmid 搜索-平台ID
 * @param [string] name 搜索-平台名称
 * @param [string] mobile_or_real_name 搜索-主管理员
 * @param [string] status 搜素-状态 1启用 0禁用
 */
export function getAdminPlatformIndex(parameter) {
  return request({
    url: apiList.AdminPlatformIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 创建平台
 */
export function getAdminPlatformCreate(parameter) {
  return request({
    url: apiList.AdminPlatformCreate,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 获取平台详情
 * @param [string] pmid 平台ID
 */
export function getAdminPlatformDetail(parameter) {
  return request({
    url: apiList.AdminPlatformDetail,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 限制平台
 * @param [string] pmid 平台ID
 */
export function getAdminPlatformLimit(parameter) {
  return request({
    url: apiList.AdminPlatformLimit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 取消限制平台
 * @param [string] pmid 平台ID
 */
export function getAdminPlatformUnLimit(parameter) {
  return request({
    url: apiList.AdminPlatformUnLimit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 删除平台（超管删除）
 * @param [string] pmid 平台ID
 */
export function getAdminPlatformDel(parameter) {
  return request({
    url: apiList.AdminPlatformDel,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 超管回收站中真删除平台
 * @param [string] pmid 平台ID
 */
export function getAdminPlatformRealDel(parameter) {
  return request({
    url: apiList.AdminPlatformRealDel,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 恢复平台（超管恢复删除到正常状态）
 * @param [string] pmid 平台ID
 */
export function getAdminPlatformUnDel(parameter) {
  return request({
    url: apiList.AdminPlatformUnDel,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 平台回收站列表
 * @param [string] pmid 平台ID
 * @param [string] name 搜索-平台名称
 * @param [string] mobile_or_real_name 搜索-主管理员
 * @param [string] 搜素-状态 1启用 0禁用
 */
export function getAdminPlatformRecycleIndex(parameter) {
  return request({
    url: apiList.AdminPlatformRecycleIndex,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 平台审核列表
 * @param [string] pmid 平台ID
 * @param [string] name 搜索-平台名称
 * @param [string] mobile_or_real_name 搜索-主管理员
 * @param [string] 搜素-状态 1启用 0禁用
 */
export function getAdminPlatformAuditIndex(parameter) {
  return request({
    url: apiList.AdminPlatformAuditIndex,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 平台审核
 * @param [string] pmid 平台ID
 * @param [string] mid 管理ID
 * @param [string] name 平台ID
 * @param [string] logo 平台logo
 * @param [string] start_at 服务开始时间
 * @param [string] expired_at 服务到期时间，时间戳
 * @param [string] group_id 套餐组ID 可多选
 * @param [string] extra_id 附加ID 可多选
 * @param [string] audit_status 审核状态 1通过 -1 未通过
 * @param [string] audit_msg 审核意见 备注（原型上没有，最早说有，需确认）
 * 
 */
export function getAdminPlatformAudit(parameter) {
  return request({
    url: apiList.AdminPlatformAudit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 导出平台列表
 */
export function exportPlatformTableData(parameter) {
  return exportExcel(apiList.AdminPlatformIndex, parameter);
}

/**
 * 导出平台审核列表
 */
export function exportPlatformAuditTableData(parameter) {
  return exportExcel(apiList.AdminPlatformAuditIndex, parameter);
}

/**
 * 导出平台回收站列表
 */
export function exportPlatformRecycleTableData(parameter) {
  return exportExcel(apiList.AdminPlatformRecycleIndex, parameter);
}
