import { request, METHOD , uploadFile} from '@/utils/request'

const apiList = {
  PlatformConfigGet: '/admin/core/config/get',// 配置获取
  PlatformConfigSet: '/admin/core/config/set',// 配置设置
  PlatformMessageTemplateIndex:'/admin/platform/message/template-index', //获取消息模板
  PlatformMessageTemplateEdit:'/admin/platform/message/template-edit', // 消息模板编辑
  PlatformMessageTemplateNoticeUpdate:'/admin/platform/message/template-notice-update', //消息模板状态更新

  PlatformMessageList:'/admin/platform/message/index', //获取发布消息列表
  PlatformMessageAdd:'/admin/platform/message/add', // 新增发布消息
  PlatformMessageEdit:'/admin/platform/message/edit', //编辑消息
  PlatformMessageSend:'/admin/platform/message/send', //发布消息
  PlatformMessageDel:'/admin/platform/message/del', //删除消息

  PlatformMessageJournal:'/admin/platform/message/journal', //消息日志
  PlatformMessageJournalDel:'/admin/platform/message/journal-del', //消息日志删除

  PlatformUserLevel:'/admin/platform/message/user-level', // 获取游客等级

  ConfigSetplatformDefault: "/admin/core/config/set-platform-default",   // 设置平台默认展示配置
  ConfigGetplatformDefault: "/admin/core/config/get-platform-default",   // 获取平台默认展示配置
  AdminPlatformPlatformCheckInviteCode: "/admin/platform/platform/check-invite-code",   // 验证邀请码

  PlatformAppVersionList:'/admin/platform/app-version/list',  //后台列表
  PlatformAppVersionAddOrEdit:'/admin/platform/app-version/add-or-edit',  //后台添加或修改版本
  PlatformAppVersionDel:'/admin/platform/app-version/del',  //后台删除
  PlatformAppVersionDetail:'/admin/platform/app-version/detail',  //后台详情
  PlatformAppVersionSetEffective:'/admin/platform/app-version/set-effective',  //后台设置生效
  PlatformAppVersionCancelEffective:'/admin/platform/app-version/cancel-effective',  //后台取消生效
  PlatformAppVersionCancelMinList:'/admin/platform/app-version/min-list',  //最底可用版本列表
  PlatformCloudPackagePack:'/admin/platform/cloud-package/pack',  //打包
  Platformcloudpackageindex:'/admin/platform/cloud-package/index',  //列表
  PlatformcloudpackageDel:'/admin/platform/cloud-package/del',  //打包记录删除
  PlatformcloudpackageAndroid:'/admin/platform/cloud-package/android',  //安卓配置保存
  PlatformcloudpackageIos:'/admin/platform/cloud-package/ios',  //ios配置保存
  PlatformcloudpackageIosTest:'/admin/platform/cloud-package/ios-test',  //ios测试配置保存
  PlatformcloudpackageCreatedCertificate:'/admin/platform/cloud-package/created-certificate',  //一键创建证书
  PlatformcloudpackageTransfer:'/admin/platform/cloud-package/transfer',  //转存
  PlatformcloudpackageCertificateInfo:'/admin/platform/cloud-package/certificate-info',  //证书详情
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
/**
 * 获取消息模板
 * parameter: {
 * }
 */
export function platformMessageTemplateIndex(parameter) {
  return request({
    url: apiList.PlatformMessageTemplateIndex,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 消息模板编辑
 * parameter: {
 * }
 */
export function platformMessageTemplateEdit(parameter) {
  return request({
    url: apiList.PlatformMessageTemplateEdit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 消息模板编辑
 * parameter: {
 * }
 */
export function PlatformMessageTemplateEdit(parameter) {
  return request({
    url: apiList.PlatformConfigSet,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 消息模板状态更新
 * parameter: {
 * }
 */
export function platformMessageTemplateNoticeUpdate(parameter) {
  return request({
    url: apiList.PlatformMessageTemplateNoticeUpdate,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 获取发布消息列表
 * parameter: {
 * }
 */
export function platformMessageList(parameter) {
  return request({
    url: apiList.PlatformMessageList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 发送推送消息
 * parameter: {
 * }
 */
export function platformMessageAdd(parameter) {
  return request({
    url: apiList.PlatformMessageAdd,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 编辑消息
 * parameter: {
 * }
 */
export function platformMessageEdit(parameter) {
  return request({
    url: apiList.PlatformMessageEdit,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 发送消息
 * parameter: {
 * }
 */
export function platformMessageSend(parameter) {
  return request({
    url: apiList.PlatformMessageSend,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 删除消息
 * parameter: {
 * }
 */
export function platformMessageDel(parameter) {
  return request({
    url: apiList.PlatformMessageDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 获取游客等级
 * parameter: {
 * }
 */
export function platformUserLevel(parameter) {
  return request({
    url: apiList.PlatformUserLevel,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 设置平台默认展示页配置
 * parameter: {
 * }
 */
export function configSetplatformDefault(parameter) {
  return request({
    url: apiList.ConfigSetplatformDefault,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 获取平台默认展示配置
 * parameter: {
 * }
 */
export function configGetplatformDefault(parameter) {
  return request({
    url: apiList.ConfigGetplatformDefault,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 验证邀请码
 * parameter: {
 * }
 */
export function AdminPlatformPlatformCheckInviteCode(parameter) {
  return request({
    url: apiList.AdminPlatformPlatformCheckInviteCode,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 后台列表
 * parameter: {
 *  @param [string] config 后台列表
 * }
 */
export function PlatformAppVersionList(parameter) {
  return request({
    url: apiList.PlatformAppVersionList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 后台列表
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformAppVersionAddOrEdit(parameter) {
  return request({
    url: apiList.PlatformAppVersionAddOrEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 后台删除
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformAppVersionDel(parameter) {
  return request({
    url: apiList.PlatformAppVersionDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 后台详情
 * parameter: {
 *  @param [string] config 后台详情
 * }
 */
export function PlatformAppVersionDetail(parameter) {
  return request({
    url: apiList.PlatformAppVersionDetail,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 后台设置生效
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformAppVersionSetEffective(parameter) {
  return request({
    url: apiList.PlatformAppVersionSetEffective,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 后台取消生效
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformAppVersionCancelEffective(parameter) {
  return request({
    url: apiList.PlatformAppVersionCancelEffective,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 最底可用版本列表
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformAppVersionCancelMinList(parameter) {
  return request({
    url: apiList.PlatformAppVersionCancelMinList,
    method: METHOD.GET,
    data: parameter
  })
}
/**
 * 打包
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformCloudPackagePack(parameter) {
  return request({
    url: apiList.PlatformCloudPackagePack,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 列表
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function Platformcloudpackageindex(parameter) {
  return request({
    url: apiList.Platformcloudpackageindex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 打包记录删除
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformcloudpackageDel(parameter) {
  return request({
    url: apiList.PlatformcloudpackageDel,
    method: METHOD.POST,
    data: parameter
  })
}
/**
 * 安卓配置保存
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformcloudpackageAndroid(parameter) {
  return uploadFile(process.env.VUE_APP_API_BASE_URL + apiList.PlatformcloudpackageAndroid,parameter)
}
/**
 * ios配置保存
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformcloudpackageIosFile(parameter){
    return uploadFile(process.env.VUE_APP_API_BASE_URL + apiList.PlatformcloudpackageIos,parameter)
  }
/**
 * ios测试配置保存
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformcloudpackageIosTest(parameter) {
  return uploadFile(process.env.VUE_APP_API_BASE_URL + apiList.PlatformcloudpackageIosTest,parameter)
}
/**
 * ios一键创建证书
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformcloudpackageCreatedCertificate(parameter) {
  return request({
    url: apiList.PlatformcloudpackageCreatedCertificate,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 转存
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformcloudpackageTransfer(parameter) {
  return request({
    url: apiList.PlatformcloudpackageTransfer,
    method: METHOD.POST,
    data: parameter
  })
}

PlatformcloudpackageCertificateInfo
/**
 * 证书详情
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function PlatformcloudpackageCertificateInfo(parameter) {
  return request({
    url: apiList.PlatformcloudpackageCertificateInfo,
    method: METHOD.GET,
    data: parameter
  })
}


/**
 * 消息日志
 */
 export function getPlatformMessageJournal(parameter) {
  return request({
    url: apiList.PlatformMessageJournal,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 消息日志删除
 */
 export function PlatformMessageJournalDel(parameter) {
  return request({
    url: apiList.PlatformMessageJournalDel,
    method: METHOD.POST,
    data: parameter
  })
}

