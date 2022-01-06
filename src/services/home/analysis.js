import { request, METHOD } from '@/utils/request'

const apiList = {
  PlatformPlatformPlatformInfo: '/admin/platform/platform/platform-info', // 获取会员等级列表

}

/**
 * 删除升级记录
 * parameter: {
 *  @param [string] id 需要删除的记录id,多个记录用英文逗号拼接
 * }
 */
export function PlatformPlatformPlatformInfo(parameter) {
  return request({
    url: apiList.PlatformPlatformPlatformInfo,
    method: METHOD.GET,
    data: parameter
  })
}

