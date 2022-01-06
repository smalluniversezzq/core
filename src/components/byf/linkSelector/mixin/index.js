/*
 * @Author: your name
 * @Date: 2021-03-25 10:24:33
 * @LastEditTime: 2021-03-26 09:27:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /byf_web_core/src/components/byf/linkSelector/mixin/index.js
 */
export default {
  props: {
    tabItemParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    linkFormat: {
      type: Object,
      default: () => {
        return {}
      }
    },
    business: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: () => {
        return 0
      }
    },
    links: {
      type: Array,
      default: () => {
        return []
      }
    },
    apiParams: {
      type: Object,
      default: () => {
        return {
          tabParams: {
            tab: {}
          },
          appPageParams: {
            appPage: {}
          },
          goodsPageParams: {
            shopGoodsCategoryIndex: {},
            shopGoodsSpuIndex: {}
          },
          goodsClassifyPageParams: {
            shopGoodsCategoryIndex: {},
          },
          customPageParams: {
            templateIndex: {}
          },
        }
      }
    }
  },
  data(){
    return {
    }
  }
}