import { request, METHOD } from '@/utils/request'
import { getByfComponentsApi } from '@/utils/util'
// 链接选择器相关api 商城商品部分
const apiList = {
  ShopGoodsCategoryIndex: '/admin/by-shop/shop-goods-category/index', // 商品分类—列表
}

/**
 * 商品分类—列表
 * parameter: {
 * }
 */
export function getShopGoodsCategoryIndex(parameter) {
  return request({
    url: getByfComponentsApi('ShopGoodsCategoryIndex', 'linkSelector') || apiList.ShopGoodsCategoryIndex,
    method: METHOD.GET,
    data: parameter
  })
}