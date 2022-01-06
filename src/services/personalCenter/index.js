// uploadFile
import { request, METHOD ,exportExcel} from '@/utils/request'

const apiList = {
  sysLoginLogLis:'/admin/sys/login-log/list',  //证书详情
}

/**
 * 登录日志导出
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function exporsysLoginLogLis(parameter) {
  return exportExcel(apiList.sysLoginLogLis, parameter);
}
/**
 * 登录日志
 * parameter: {
 *  @param [string] config PlatformAppVersionAddOrEdit
 * }
 */
export function sysLoginLogLis(parameter) {
  return request({
    url: apiList.sysLoginLogLis,
    method: METHOD.GET,
    data: parameter
  })
}