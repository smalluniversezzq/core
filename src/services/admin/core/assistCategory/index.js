import { request, METHOD } from '@/utils/request'
// 帮助中心相关API
const apiList = {
  AssistCategoryIndex: '/admin/core/assist-category/index', // 分类列表
  AssistCategoryAddOrEdit: '/admin/core/assist-category/add-or-edit', //分类添加/修改
  AssistCategoryDel: '/admin/core/assist-category/del', //分类删除
  AssistCategoryDisplay: '/admin/core/assist-category/display', // 分类显示/隐藏
}
/**
 * 分类列表
 * parameter: {
 *  @param [String] title 筛选title
 * }
 */
export function getAssistCategoryIndex(parameter) {
  return request({
    url: apiList.AssistCategoryIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 添加/修改
 * parameter: {
 *  @param [Array] categoryParams 分类数据
 * }
 */
export function assistCategoryAddOrEdit(parameter) {
  return request({
    url: apiList.AssistCategoryAddOrEdit,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 分类删除
 * parameter: {
 *  @param [Array] categoryParams 分类数据
 * }
 */
export function assistCategoryDel(parameter) {
  return request({
    url: apiList.AssistCategoryDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
  * 分类显示隐藏
  * parameter: {
  *  @param [Number] id 分类id
  *  @param [Number] is_show 显示/隐藏
  * }
 */
export function assistCategoryDisplay(parameter) {
  return request({
    url: apiList.AssistCategoryDisplay,
    method: METHOD.POST,
    data: parameter
  })
}