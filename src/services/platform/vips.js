import { request, METHOD ,exportExcel} from '@/utils/request'

const apiList = {
  AdminUserUserlevelList: '/admin/user/user-level/list', // 获取会员等级列表
  AdminUserUserlevelAdd: '/admin/user/user-level/add', // 添加会员等级
  AdminUserUserlevelDetail: '/admin/user/user-level/detail', // 根据等级id获取详情
  AdminUserUserlevelEdit: '/admin/user/user-level/edit', // 编辑会员等级
  AdminUserUserlevelSetCondition: '/admin/user/user-level/set-condition', // 设置升级条件/设置为默认等级
  AdminUserUserlevelInterestsEdit: '/admin/user/user-level/interests-edit', // 设置等级权益
  AdminUserUserlevelDel: '/admin/user/user-level/del', // 删除等级
  AdminUserUserLevelGetAllLevel:"/admin/user/user-level/get-all-level",   // 获取平台所有会员等级
  AdminUserUserLevelUpgradeLog:"/admin/user/user-level/upgrade-log",  // 升级记录列表
  AdminUserUserLevelDelLog:"/admin/user/user-level/del-log",  // 删除升级记录
  AdminUserUserLevelSetRebateInfo:"/admin/user/user-level/set-rebate-info",  // 设置等级返佣
  AdminUserUserLevelgGetLevel:"/admin/user/user-level/get-level",  // 获取会员等级(全量OR指定条件)
  AdminUserUserLevelSetUpRebateInfo:"/admin/user/user-level/set-up-rebate-info",  // 设置等级返佣
  AdminUserUserLevelGetUpRebate:"/admin/user/user-level/get-up-rebate",  // 付费订单佣金记录数据获取

  

}

/**
 * 获取会员等级列表
 * parameter: {
 *  @param [string] name 等级名称
 *  @param [string] status 等级状态
 *  @param [string] page_size 每页数量
 *  @param [string] page 页数
 * }
 */
export function AdminUserUserlevelList(parameter) {
  return request({
    url: apiList.AdminUserUserlevelList,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 添加会员等级
 * parameter: {
 *  @param [string] name 等级名称
 *  @param [string] type 等级类型
 *  @param [string] icon 等级图标
 *  @param [string] power 等级权重
 *  @param [string] ishide 是否隐藏等级:0否,1是
 *  @param [string] status 等级状态
 * }
 */
export function AdminUserUserlevelAdd(parameter) {
  return request({
    url: apiList.AdminUserUserlevelAdd,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 根据等级id获取详情
 * parameter: {
 *  @param [string] id 等级名称
 * }
 */
export function AdminUserUserlevelDetail(parameter) {
  return request({
    url: apiList.AdminUserUserlevelDetail,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 编辑会员等级
 * parameter: {
 *  @param [string] id 等级名称
 *  @param [string] name 等级名称
 *  @param [string] type 等级类型
 *  @param [string] icon 等级图标
 *  @param [string] power 等级权重
 *  @param [string] ishide 是否隐藏等级:0否,1是
 *  @param [string] status 状态:0禁用 1启用
 * }
 */
export function AdminUserUserlevelEdit(parameter) {
  return request({
    url: apiList.AdminUserUserlevelEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 设置升级条件/设置为默认等级
 * parameter: {
 *  @param [string] id 等级id
 *  @param [string] type 模式:fufei:付费升级,libao:礼包升级,tiaojian:条件升级,default:默认等级
目前仅支持付费升级和默认等级
 *  @param [string] info 付费升级套餐信息,最多三条数据
 *  @param [string] status 当前升级模式是否开启:0关闭,1开启
 * }
 */
export function AdminUserUserlevelSetCondition(parameter) {
  return request({
    url: apiList.AdminUserUserlevelSetCondition,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 设置等级权益
 * parameter: {
 *  @param [string] id 等级名称
 *  @param [Array] info 权益内容
 *  @param [Array] more_interests 更多权益设置
 *  @param [string] icon 等级图标
 * }
 */
export function AdminUserUserlevelInterestsEdit(parameter) {
  return request({
    url: apiList.AdminUserUserlevelInterestsEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 删除等级
 * parameter: {
 *  @param [string] id 等级名称
 * }
 */
export function AdminUserUserlevelDel(parameter) {
  return request({
    url: apiList.AdminUserUserlevelDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 获取平台所有会员等级
 * parameter: {
 *  @param [string] type 1,只获取代理等级,2 只获取运营商等级
 * }
 */
export function AdminUserUserLevelGetAllLevel(parameter) {
  return request({
    url: apiList.AdminUserUserLevelGetAllLevel,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 升级记录列表
 * parameter: {
 *  @param [string] order_no  订单编号
 *  @param [string] after_level 
 *  @param [string] uid 
 *  @param [string] start_created_at 
 *  @param [string] end_created_at
 *  @param [string] start_amount
 *  @param [string] end_amount
 *  @param [string] op op=export代表执行excel数据导出
 * }
 */
export function AdminUserUserLevelUpgradeLog(parameter) {
  return request({
    url: apiList.AdminUserUserLevelUpgradeLog,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 导出平台列表
 */
export function exportAdminUserUserLevelUpgradeLog(parameter) {
  return exportExcel(apiList.AdminUserUserLevelUpgradeLog, parameter);
}

/**
 * 删除升级记录
 * parameter: {
 *  @param [string] id 需要删除的记录id,多个记录用英文逗号拼接
 * }
 */
export function AdminUserUserLevelDelLog(parameter) {
  return request({
    url: apiList.AdminUserUserLevelDelLog,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 设置等级返佣
 * parameter: {
 *  @param [string] id 要设置返佣的等级id
 * }
 */
export function AdminUserUserLevelSetRebateInfo(parameter) {
  return request({
    url: apiList.AdminUserUserLevelSetRebateInfo,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 设置升级返佣
 * parameter: {
 *  @param [string] id 要设置返佣的等级id
 * }
 */
export function AdminUserUserLevelSetUpRebateInfo(parameter) {
  return request({
    url: apiList.AdminUserUserLevelSetUpRebateInfo,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 升级记录列表
 * parameter: {
 *  @param [string] id  当前等级id,可以不传,获取所有的等级信息(区分代理和运营商)
 * }
 */
export function AdminUserUserLevelgGetLevel(parameter) {
  return request({
    url: apiList.AdminUserUserLevelgGetLevel,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 付费订单佣金记录数据获取
 * parameter: {
 *  @param [string] id  当前等级id,可以不传,获取所有的等级信息(区分代理和运营商)
 * }
 */
export function AdminUserUserLevelGetUpRebate(parameter) {
  return request({
    url: apiList.AdminUserUserLevelGetUpRebate,
    method: METHOD.GET,
    data: parameter
  })
}
