import { request, METHOD } from '@/utils/request'
// 会员关系相关API
const apiList = {
  UserRelationList: '/admin/user/user-relation/list', // 会员关系树
}
/**
 * 会员关系树
 * parameter: {
 *  @param [Number] page_size 每页数量
 *  @param [Number] page 页数
 *  @param [String] keyword 搜索关键词
 *  @param [String] parent_id 父级id
 * }
 */
export function getUserRelationList(parameter) {
  return request({
    url: apiList.UserRelationList,
    method: METHOD.GET,
    data: parameter
  })
}