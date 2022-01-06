import { request, METHOD } from '@/utils/request'
import { getByfComponentsApi } from '@/utils/util'

const apiList = {
  AdminUserUserLevelGetAllLevel: '/admin/user/user-level/get-levels', // 获取平台所有会员等级(包含已删除)
}

const ApiConfigKey = 'diyPage'

/**平台设置的所有用户等级 */
let allUserLevel = null;
/**
 * 后台-模板修改
 * parameter: {
 *  模板数据
 * }
 */
export function getAdminUserUserLevelGetAllLevel(parameter) {
    return request({
        url: getByfComponentsApi('AdminUserUserLevelGetAllLevel', ApiConfigKey) || apiList.AdminUserUserLevelGetAllLevel,
        method: METHOD.GET,
        data: parameter
    }).then(res=>{
        if(res.code == 200) {
            allUserLevel = res.data;
            return allUserLevel
        }
    })
}

export function getAllUserLevel() {
    return allUserLevel
}