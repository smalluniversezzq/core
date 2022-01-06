import { request, METHOD } from '@/utils/request'

const apiList = {
  ArticleGetList: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/article/getList', // demo列表
  ArticleDelete: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/article/delete', // 删除某个文章
  ArticleAdd: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/article/add', // 增加文章
  ArticleGetById: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/article/getById',// 通过id获取文章
  ArticleEdit: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/article/update',// 编辑文章
  ArticleSwitchStatus: 'https://byf-web-node.bangyaosoft.cn/byf/kuai/v1/article/switchStatus',// 编辑文章
}

/**
 * 获取demo列表
 */
export function getDemoList(parameter) {
  return request({
    url: apiList.ArticleGetList,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 删除一项
 * @param {number} id 要删除的文章id
 */
export function deletOne(parameter) {
  return request({
    url: apiList.ArticleDelete + "?id=" + parameter.id,
    method: METHOD.POST
  })
}

/**
 * 增加文章
 * @param {string} label 文章标签
 * @param {string} title 文章标题
 * @param {string} author 作者
 * @param {string} upload_time 上传时间
 * @param {string} isPublish 发布状态
 */
export function addArticle(parameter) {
  return request({
    url: apiList.ArticleAdd,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 通过id获取详细信息
 * @param {number} id 要获取的文章id
 */
export function getById(parameter) {
  return request({
    url: apiList.ArticleGetById + "?id=" + parameter.id,
    method: METHOD.GET
  })
}


/**
 * 通过id对文件进行编辑
 * @param {number} id 通过对文件进行编辑
 */
export function editArticle(parameter) {
  return request({
    url: apiList.ArticleEdit + "?id=" + parameter.id,
    method: METHOD.POST,
    data: parameter
  })
}


/**
 * 通过id对文章切换状态
 * @param {number} id 通过对文件进行编辑
 */
export function switchStatus(parameter) {
  return request({
    url: apiList.ArticleSwitchStatus + "?id=" + parameter.id,
    method: METHOD.POST,
    data: parameter
  })
}

/**
 * 通过id删除对应的数据
 * @param {number} id 通过对文件进行编辑
 */
export function deleteImgs(parameter) {
  return request({
    url: apiList.ArticleSwitchStatus + "?id=" + parameter.id,
    method: METHOD.POST,
    data: parameter
  })
}


/**
 * @param
 */
// export function byfUploadFile(url, file) {
//   const form = new FormData()
//   form.append('file', file);
//   return request({
//     url,
//     method: METHOD.POST,
//     data: form
//   })
// }