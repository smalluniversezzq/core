import { request, METHOD } from '@/utils/request'
// 帮助中心平台端相关API
const apiList = {
  ArticleList: '/admin/platform/assist/article-list', // 文章列表
  ArticleCategoryList: '/admin/platform/assist/category-list', // 平台端分类列表
  ArticleCategoryArticle: '/admin/platform/assist/article', // 平台端文章详情

  
}
/**
 * 文章列表
 * parameter: {
 *  @param [Number] page_size 每页数量
 *  @param [Number] page 页数
 *  @param [Number] c_id 分类id
 *  @param [String] keyword 搜索关键测
 *  @param [String] alias 分类别名或者分类id
 * }
 */
export function getArticleList(parameter) {
  return request({
    url: apiList.ArticleList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 分类列表
 * parameter: {
 * }
 */
export function getArticleCategoryList(parameter) {
  return request({
    url: apiList.ArticleCategoryList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 文章详情
 * parameter: {
 *  @param [String] alias 文章别名或者文章id
 * }
 */
export function getArticleCategoryArticle(parameter) {
  return request({
    url: apiList.ArticleCategoryArticle,
    method: METHOD.GET,
    data: parameter
  })
}