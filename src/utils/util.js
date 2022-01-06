

import ByfComponentsApiList from '@/config/byfComponentsApi.js'
export function isDef (v){
  return v !== undefined && v !== null
}

/**
 * Remove an item from an array.
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

const _toString = Object.prototype.toString

/**
 * 生成唯一id
 */
export function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

/**
 * 获取组件api地址
 * @param [Object] ByfComponentsApiList api配置对象
 * @param [String] key 接口的KEY
 * @param [String] componentsKey 接口组件的key如：链接选择器为：linkSelector
 */
export function getByfComponentsApi(key, componentsKey) {
  let api = null;
  if(ByfComponentsApiList[componentsKey]){
    api = ByfComponentsApiList[componentsKey][key] || null;
  }
  return api;
}