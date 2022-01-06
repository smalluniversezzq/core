/*
 * @Author: your name
 * @Date: 2021-02-07 19:04:59
 * @LastEditTime: 2021-03-25 14:05:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /byf_web_core/src/components/byf/linkSelector/services/admin/platform/designLink/index.js
 */
import { request, METHOD } from '@/utils/request'
import { getByfComponentsApi } from '@/utils/util'

// 链接选择器相关api
const apiList = {
  Tab: '/admin/platform/design-link/tab', // 链接选择器-获取tab页
  AppPage: '/admin/platform/design-link/page?page=app', // 链接选择器-获取APP页面
  ShopCategoryPage: '/admin/platform/design-link/page?page=shop-category', // 链接选择器-获取商品分类页面
}

/**
 * 链接选择器-获取tab页
 * parameter: {
 * }
 */
export function getTab(parameter) {
  return request({
    url: getByfComponentsApi('Tab', 'linkSelector') || apiList.Tab,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 链接选择器-获取APP页面
 * parameter: {
 *  @param [String] keyword 搜索关键词
 * }
 */
export function getAppPage(parameter) {
  return request({
    url: getByfComponentsApi('AppPage', 'linkSelector') || apiList.AppPage,
    method: METHOD.GET,
    data: parameter
  })
}

/**
 * 链接选择器-商品分类页面分类列表接口
 * parameter: {
 *  @param [String] keyword 搜索关键词
 * }
 */
export function getShopCategory(parameter) {
  return request({
    url: getByfComponentsApi('ShopCategoryPage', 'linkSelector') || apiList.ShopCategoryPage,
    method: METHOD.GET,
    data: parameter
  })
}
