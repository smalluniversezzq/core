import { request, METHOD } from '@/utils/request'
import { getByfComponentsApi } from '@/utils/util'
// 链接选择器相关api 商城商品部分
const apiList = {
  ShopGoodsSpuIndex: '/admin/by-shop/shop-goods-spu/index', // 商品—列表
}

/**
 * 商品—列表
 * parameter: {
 *  @param [String] keyword 关键字检索 纯数字表示id
 * }
 */
export function getShopGoodsSpuIndex(parameter) {
  return request({
    url: getByfComponentsApi('ShopGoodsSpuIndex', 'linkSelector') || apiList.ShopGoodsSpuIndex,
    method: METHOD.GET,
    data: parameter
  })
}