import { request, METHOD } from '@/utils/request'
import { getByfComponentsApi } from '@/utils/util'
// 链接选择器相关api
const apiList = {
  TemplateIndex: '/admin/platform/design-page/index', // 后台-模板列表
}

/**
 * 后台-模板列表
 * parameter: {
 *  @param [Number] page_size 每页数量
 *  @param [Number] page 页数
 *  @param [String] keyword 搜索关键测
 *  @param [String] page_type 页面类型：1首页、2个人中心、3自定义页面
 * }
 */
export function getTemplateIndex(parameter) {
  return request({
    url: getByfComponentsApi('TemplateIndex', 'linkSelector') || apiList.TemplateIndex,
    method: METHOD.GET,
    data: parameter
  })
}

