import { request, METHOD } from '@/utils/request'
// 帮助中心帮助文章相关API
const apiList = {
  AssistIndex: '/admin/core/assist/index', // 文章列表
  AssistAdd: '/admin/core/assist/add', // 添加
  AssistEdit: '/admin/core/assist/edit', // 编辑
  AssistDetail: '/admin/core/assist/detail', // 详情
  AssistDisplay: '/admin/core/assist/display', // 显示/隐藏
  AssistDel: '/admin/core/assist/del', // 删除
}
/**
 * 帮助文章添加
 * parameter: {
 *  @param [String] title 文章标题
 *  @param [String] content 文章内容
 *  @param [String] alias 文章别名url使用
 *  @param [String] keywords 关键字
 *  @param [Number] sort 排序
 *  @param [Number] status 状态0不显示;1显示
 *  @param [Number] c_id 分类id
 * }
 */
export function assistAdd(parameter) {
  return request({
    url: apiList.AssistAdd,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 帮助文章列表
 * parameter: {
 *  @param [Number] page_size 每页数量
 *  @param [Number] page 页数
 *  @param [Number] c_id 分类id
 *  @param [String] keyword 搜索关键测
 *  @param [String] status 状态
 * }
 */
export function getAssistIndex(parameter) {
  return request({
    url: apiList.AssistIndex,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 帮助文章详情
 * parameter: {
 *  @param [String] id 文章id
 * }
 */
export function getAssistDetail(parameter) {
  return request({
    url: apiList.AssistDetail,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 文章显示/隐藏
 * parameter: {
 *  @param [Array] ids[] id数组
 *  @param [Number] status 0隐藏;1显示
 * }
 */
export function assistDisplay(parameter) {
  return request({
    url: apiList.AssistDisplay,
    method: METHOD.POST,
    data: parameter
  })
}

/**
  * 文章删除
  * parameter: {
  *  @param [Array] ids[] id数组
  * }
 */
export function assistDel(parameter) {
  return request({
    url: apiList.AssistDel,
    method: METHOD.POST,
    data: parameter
  })
}

/**
  * 文章编辑
  * parameter: {
 *  @param [String] id 文章id
 *  @param [String] title 文章标题
 *  @param [String] content 文章内容
 *  @param [String] alias 文章别名url使用
 *  @param [String] keywords 关键字
 *  @param [Number] sort 排序
 *  @param [Number] status 状态0不显示;1显示
 *  @param [Number] c_id 分类id
  * }
 */
export function assistEdit(parameter) {
  return request({
    url: apiList.AssistEdit,
    method: METHOD.POST,
    data: parameter
  })
}