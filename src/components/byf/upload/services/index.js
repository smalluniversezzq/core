import { request, METHOD, uploadImage } from '@/utils/request'
import { getByfComponentsApi } from '@/utils/util'
const apiList = {
  SiteFile: '/admin/site/file', // 图片，视频，文件 操作 相关接口

  IMGGROUPLIST: `/byf/kuai/v1/group/groupList`, // 获取图片分组信息
  ADDIMGGROUPLIST: `/byf/kuai/v1/group/groupList/add`, // 增加图片分组信息
  DELETEIMGGROUPLIST: `/byf/kuai/v1/group/groupList/delete`, // 删除图片分组信息
  IMGSLIST: `/byf/kuai/v1/group/getGroupImgs`, // 获取分组下所有的图片信息
}

export function uploadImageRequest(file, params){
  return uploadImage(process.env.VUE_APP_API_BASE_URL + (getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile) + '?op=upload&type=image', file, params);
}
/**
 * 请求图片列表信息
 */
export function getImgList(parameter){
  return request({
    url: getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile,
    method: METHOD.GET,
    data: {
      op: 'list',
      type: 'image',
      ...parameter
    }
  })
}
/**
 * 获取分组列表
 */
export function getGroupList(parameter){
  return request({
    url: getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile,
    method: METHOD.GET,
    data: {
      op: 'group-list',
      type: 'image',
      ...parameter
    }
  })
}
/**
 * 添加分组
 */
export function addGroup(parameter){
  return request({
    url: (getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile) + '?op=group-add',
    method: METHOD.POST,
    data: {
      ...parameter
    }
  })
}
/**
 * 编辑分组
 */
export function editGroup(parameter){
  return request({
    url: (getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile) + '?op=group-edit',
    method: METHOD.POST,
    data: {
      ...parameter
    }
  })
}
/**
 * 删除分组
 */
export function delGroup(parameter){
  return request({
    url: (getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile) + '?op=group-del',
    method: METHOD.POST,
    data: {
      ...parameter
    }
  })
}
/**
 * 获取网络图片
 *  */ 
export function getWebImg(params) {
  return request({
    url: (getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile) + '?op=save',
    method: METHOD.POST,
    data: params
  })
}

/**
 * 添加分组列表
 *  */ 
export function addGroupList(params) {
  return request({
    url: getByfComponentsApi('ADDIMGGROUPLIST', 'upload') || apiList.ADDIMGGROUPLIST,
    method: METHOD.POST,
    data: params
  })
}

/**
 * 删除图片（单个或多个）
 *  */ 
export function delImgs(params) {
  return request({
    url: (getByfComponentsApi('SiteFile', 'upload') || apiList.SiteFile) + "?op=del",
    method: METHOD.POST,
    data: params
  })
}