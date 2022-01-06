import axios from 'axios'
import { message } from 'ant-design-vue'
import md5 from 'js-md5';
import { goLogin } from '@/services/site'
import qs from 'qs'
// 跨域认证信息 header 名
const xsrfHeaderName = 'token'

axios.defaults.timeout = 5000

axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = xsrfHeaderName
axios.defaults.headers.post['Content-Type'] = 'application/json'
if (process.env.NODE_ENV != 'development') {
  axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
}

// 参数 转为 JSON字符串
axios.defaults.transformRequest = (data) => {
  data = JSON.stringify(data)
  return data
}
/**
 * 请求头通用处理逻辑
 * @param {Object} req 请求
 */
var headerHandle = function(req){
  if (window.vueObj.$route.matched[0] && window.vueObj.$route.matched[0].path != '/genBackstage' && localStorage.getItem('uPmid')) {  // 平台id
    // 当不在控制台 并且 本地有平台id，接口才带上平台id
    req.headers['u-pmid'] = localStorage.getItem('uPmid')
  }
  if (localStorage.getItem('uSid')) {  // sid
    req.headers['u-sid'] = localStorage.getItem('uSid')
  }
  req.headers['u-ver'] = process.env.VUE_APP_API_VER
  req.headers['u-ua'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'
  if (localStorage.getItem(process.env.VUE_APP_USER_KEY)) {
    req.headers['u-mid'] = JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_KEY)).mid
  }
  req.headers['u-t'] = Math.floor(new Date().getTime() / 1000)
  if(Math.abs(localStorage.getItem('calibrationTimeDifference')) >= 0){
    req.headers['u-t'] = req.headers['u-t'] - localStorage.getItem('calibrationTimeDifference');
  }
  let signKeyArray = ['u-mid','u-pmid','u-sid','u-t','u-ua','u-ver'];
  let uSignString = '';
  signKeyArray.forEach(item => {
    if (req.headers[item]) {
      uSignString += (item+req.headers[item])
    }
  })
  req.headers['u-sign'] = md5(uSignString)
}

// 请求拦截
axios.interceptors.request.use((req) => {
  headerHandle(req);
  return req
}, (error) => {
  // 对请求错误做点什么
  return Promise.reject(error);
})

/**
 * 处理接口响应数据
 * @param {object} data {code:200,data:xxx, msg:xxx}
 */
let responseHandle = function(data){
  // 对响应数据做点什么
  if (data.code == 403) {
    // 无权限访问或者操作
    message.warn(data.msg)
  } else if (data.code == 401) {
    // 授权丢失,需要重新登录
    message.warning(data.msg).then(() => {
      goLogin()
    })
  } else if (data.code == 500 && data.data) {
    // 后端业务逻辑出问题，进行提示
    let errorInfo = data.data;
    if (errorInfo.errType == 'error') {
      // 强提示
      message.error({
        content: errorInfo.errMsg,
        key: errorInfo.errMsg
      })
    } else if (errorInfo.errType == 'warning') {
      // 若提示
      message.warn({
        content: errorInfo.errMsg,
        key: errorInfo.errMsg
      })
    }

    switch(errorInfo.errCode) {
      case 'CR100001':  // MID无效
      case 'CR100011':  // SID无效， 重新获取
      case 'CR500002':  // SID无效， 重新获取
        goLogin()
        break;
      case 'CR100010':   // 时间校验出错
        goLogin()
        break;
    }
  }
}

axios.interceptors.response.use((response) => {
  responseHandle(response.data)
  return response.data;
}, (error) => {
  // 网络状态码异常
  switch (error.response.status) {
    case 404:
      message.warn('未知操作')
      break
    case 500:
      message.warn('服务器开小差了，稍后再试吧');
      break;
  }
  // 对响应错误做点什么
  return Promise.reject(error);
})

// 认证类型
const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2',
}

// http method
const METHOD = {
  GET: 'get',
  POST: 'post'
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request({ url, method, data }) {
  switch (method) {
    case METHOD.GET:
      return axios.get(url, { params: data })
    case METHOD.POST:
      return axios.post(url, data)
    default:
      return axios.get(url, { params: data })
  }
}

/**
 * 设置认证信息
 * @param {Object} auth.token
 * @param {AUTH_TYPE} authType 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth, authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      sessionStorage.setItem(xsrfHeaderName, auth.token)
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      sessionStorage.removeItem(xsrfHeaderName)
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      if (localStorage.getItem(process.env.VUE_APP_USER_KEY) && JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_KEY)).mid && localStorage.getItem('uSid')) {
        return true
      }
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
  return false
}


// 判断是否有该图片
// function isAssetTypeAnImage(ext) {
//   return [
//     'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
//     indexOf(ext.toLowerCase()) !== -1;
// }


/**
 *  上传图片接口
 *@param [string] 上传图片接口地址，绝对路径
 @param [file] file 对象
 @param [object] params 要一起传递的参数
*/
function uploadImage(url, library, params) {
  var req = {
    headers: {}
  }
  headerHandle(req)

  // 生成formData数据
  const formData = new FormData();
  formData.append("file", library)
  for(let i in params) {
    formData.append(i, params[i])
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: req.headers,
      body: formData
    }).then((res) => {
      switch (res.status) {
        case 404:
          message.warn('未知操作')
          break
        case 500:
          message.warn('服务器开小差了，稍后再试吧');
          break;
        case 200:
          return res.json();
      }
    }).then((data) => {
      if (data == undefined) {
        reject()
      } else {
        responseHandle(data)
        resolve(data);
      }

    }).catch((error) => {
      reject(error)
    })
  })
}


/**
 *  上传文件接口
 *@param [string] 上传图片接口地址，绝对路径
 @param [file] file 对象
 @param [object] params 要一起传递的参数
*/
function uploadFile(url, params) {
  var req = {
    headers: {}
  }
  headerHandle(req)

  // 生成formData数据
  const formData = new FormData();
  for(let i in params) {
    formData.append(i, params[i])
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: req.headers,
      body: formData
    }).then((res) => {
      switch (res.status) {
        case 404:
          message.warn('未知操作')
          break
        case 500:
          message.warn('服务器开小差了，稍后再试吧');
          break;
        case 200:
          return res.json();
      }
    }).then((data) => {
      if (data == undefined) {
        reject()
      } else {
        responseHandle(data)
        resolve(data);
      }

    }).catch((error) => {
      reject(error)
    })
  })
}
// 导出表格数据，url，接口地址，data，请求参数
function exportExcel (url, data){
  let req = { headers: {} };
  headerHandle(req)
  data = qs.stringify(data);
  url = process.env.VUE_APP_API_BASE_URL + url + '?' + data;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {...req.headers, 'Content-Type': 'utf-8'},
      // body: data
    }).then(res => res.blob().then(blob=> {
      if(res.status == 200){
        let alink= document.createElement('a');
        alink.style.display = 'none'
        alink.href = window.URL.createObjectURL(blob);
        let filename = decodeURI(res.headers.get('Content-Filename'))
        alink.download = filename;   // 设置文件名
        document.body.appendChild(alink)
        alink.click();
        URL.revokeObjectURL(alink.href) // 释放URL 对象
        document.body.removeChild(alink)
        resolve(res)
      }else{
        reject()
      }
    }))
  })
}

export {
  METHOD,
  AUTH_TYPE,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  uploadImage,
  uploadFile,
  exportExcel
}