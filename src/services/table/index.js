import { request, METHOD } from '@/utils/request'

const apiList = {
  UserGetList: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/users/getList', // user
}

/**
 * 获取用户列表
 */
export function getUserList(parameter) {
  return request({
    url: apiList.UserGetList,
    method: METHOD.GET,
    data: parameter
  })
}

