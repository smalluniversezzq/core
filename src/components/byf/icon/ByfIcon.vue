<template>
  <!-- <icon-font v-bind="$props"></icon-font> -->
  <i class="anticon" v-on="$listeners">
    <i v-if="renderType == 'fontClass'" class="icon-class" :class="[fontFamily, type]"></i>
    <svg v-if="renderType == 'svg'" class="byf-icon-svg" aria-hidden="true">
      <use :xlink:href="'#' + type"></use>
    </svg>
  </i>
</template>
<script>
import { loadIconJsAndCss } from './iconUtil.js'
// import config from '@/config'
// import {Icon} from "ant-design-vue"

// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: config.iconfontUrl[0],
// });
// config.iconfontUrl.map(item => {
//   let aliIconScript = document.createElement("script");  //创建一个script标签
//   aliIconScript.type = "text/javascript";
//   aliIconScript.src = item;
//   document.body.appendChild(aliIconScript);
// })
loadIconJsAndCss('default')
export default {
  name: 'ByfIcon',
  // 继承Icon上面所有的属性
  props: {
    fontFamily: {
      type: String,
      default: () => {
        return 'iconfont'
      }
    },
    renderType: {
      type:String,
      default: () => {
        return 'svg'
      }
    },
    type: {
      type: String,
      default: () => {
        return '';
      }
    },
    // ...Icon.props
  },
  // components: {IconFont},
  methods: {
  }
}
</script>
<style scoped lang="less">
.byf-icon-svg {
    width: 1em; 
    height: 1em;
    // vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.icon-class{
  width: 100%;
  display: inline-block;
  font-size: 1em;
  // vertical-align: -0.15em;
  fill: currentColor;
}
</style>