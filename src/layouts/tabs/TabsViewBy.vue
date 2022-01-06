<template>
  <admin-layout-by :minHeight="minHeight">
    <div id="tabs-view-by-content" class="tabs-view-content beauty-scroll">
      <page-toggle-transition class="page-toggle-transition" :class="{ 'is-core': isCore}"
        :disabled="animate.disabled"
        :animate="animate.name"
        :direction="animate.direction"
      >
        <!-- <keep-alive
          v-if="multiPage"
        >
          <router-view v-show="!$route.meta.iframeUrl" class="keep-alive-router-view router-view-box"
            ref="tabContent"
          />
        </keep-alive> -->
        <a-keep-alive v-if='isRouterAlive'>
          <router-view v-if='$route.meta.keepAlive'  v-show="!useIframe()" class="router-view-box" ref="tabContent" :key="$route.fullPath" />
        </a-keep-alive>
          <router-view v-if='!$route.meta.keepAlive && isRouterAlive'  v-show="!useIframe()" class="router-view-box" ref="tabContent" :key="$route.fullPath" />
        <page-footer v-show="!$route.meta.iframeUrl" :link-list="footerLinks" :copyright="copyrightText()" />
        <!-- iframe页面 -->
        <div class="iframe-box" v-for="(item,index) in hasOpenIframePagesArr" :key='index' v-show="item.fullPath==$route.fullPath">
          <iframe class="iframe-view" :src="getIframeUrl(item)" :key='index' :id="item.fullPath" > </iframe>
        </div>
      </page-toggle-transition>
      
    </div>
  </admin-layout-by>
</template>

<script>
import AdminLayoutBy from "@/layouts/AdminLayoutBy";
import PageToggleTransition from "@/components/transition/PageToggleTransition";
import { mapState, mapMutations, mapGetters } from "vuex";
import { getI18nKey } from "@/utils/routerUtil";
import AKeepAlive from "@/components/cache/AKeepAlive";
import PageFooter from '@/layouts/footer/PageFooter'
import qs from 'qs'

export default {
  name: "TabsViewBy",
  i18n: require("./i18n"),
  components: {
    PageToggleTransition,
    AdminLayoutBy,
    // eslint-disable-next-line
    AKeepAlive,
    PageFooter
  },
  data() {
    return {
      clearCaches: [],
      pageList: [],
      cachedKeys: [],
      activePage: "",
      menuVisible: false,
      filterRoutes: [],
      hasOpenIframePagesArr: [],
      minHeight: window.innerHeight - 94 - 20 - 80
    };
  },
  computed: {
    ...mapState("setting", ["multiPage", "animate", "layout", 'footerLinks', 'copyright']),
    ...mapState("page", ['isRouterAlive']),
    ...mapGetters('setting', ['platformInfo']),
    ...mapGetters('siteConfig', ['configInfo']),
    tabsOffset() {
      return this.multiPage ? 24 : 0;
    },
    isCore(){
      let isCore = false;
      if(process.env.VUE_APP_DEVELOP_GROUP == 'core'){
        isCore = true;
      }
      return isCore;
    }
  },
  created() {
    const route = this.$route;
    this.pageList.push(route);
    this.activePage = route.fullPath;
    if (this.multiPage) {
      window.addEventListener("page:close", this.closePageListener);
      // 创建一个监听事件

      // this.hasOpenIframePagesArr = this.filterMenu(JSON.parse(JSON.stringify(window.vueObj.$router.options.routes.find((item)=>{return item.path == '/'}).children)));
      // 将有iframe的路由加入hasOpenIframePagesArr中
      if (route.meta.iframeUrl) {
        this.hasOpenIframePagesArr.push(route);
      }
      window.vueObj.$on("removeIframe", key => {
        for (let i = 0; i < this.hasOpenIframePagesArr.length; i++) {
          if (this.hasOpenIframePagesArr[i].fullPath == key) {
            this.hasOpenIframePagesArr.splice(i, 1);
          }
        }
      });
    }
  },
  mounted() {
    this.correctPageMinHeight(-this.tabsOffset);
    if (this.$refs.tabContent) {
      this.cachedKeys.push(this.$refs.tabContent.$vnode.key);
    }
  },
  beforeDestroy() {
    window.removeEventListener("page:close", this.closePageListener);
    this.correctPageMinHeight(this.tabsOffset);
  },
  watch: {
    $route: function(newRoute) {
      this.activePage = newRoute.fullPath;
      if (!this.multiPage) {
        this.pageList = [newRoute];
      } else if ( this.pageList.findIndex(item => item.fullPath == newRoute.fullPath) == -1 ) {
        this.$nextTick(() => {
          if (this.$refs.tabContent) {
            this.cachedKeys.push(this.$refs.tabContent.$vnode.key);
          }
        });
        this.pageList.push(newRoute);
      }
      
      // 将有iframe的路由加入hasOpenIframePagesArr中
      if (newRoute.meta.iframeUrl && !this.isExistInIframeList(newRoute)) {
        this.hasOpenIframePagesArr.push(newRoute);
      }
    },
    multiPage: function(newVal) {
      if (!newVal) {
        this.pageList = [this.$route];
        window.removeEventListener("page:close", this.closePageListener);
      } else {
        window.addEventListener("page:close", this.closePageListener);
      }
    },
    tabsOffset(newVal, oldVal) {
      this.correctPageMinHeight(oldVal - newVal);
    }
  },
  methods: {
    copyrightText(){
      let text = '';
      if(this.platformInfo.copyright_status == 1){
        if(this.configInfo){
          text = this.configInfo.sys_copyright
        }
      }else if(this.platformInfo.copyright_status == 2){
        text = this.platformInfo.copyright_text;
      }
      return text;
    },
    /**
     * 判断是否使用iframe
     */
    useIframe(){
      // 当路由的meta.iframeUrl存在时就使用iframe展示页面
      return this.$route.meta.iframeUrl
    },
    /**
     * 处理生成正确的iframe URL
     */
    getIframeUrl(route){
      let url = route.meta.iframeUrl

      console.log(route)
      console.log(this.$route.fullPath)
      if(url == 'diy') {
        // 自定义iframe的url
        url = route.query.url
        !url && this.$router.go(-1)
      }
      // return 'https://byf-web.bangyaosoft.cn'+url
      if (url.indexOf('http') == 0 || url.indexOf('https') == 0) {
        return url
      } else {
        // return window.location.origin + route.fullPath
        // // 因为标签页切换会导致每个iframe的这个方法都会被触发，所以要判断下是不是当前路由页面。不然当前路由的query参数会给不相干的iframe页面地址也加上。
        let queryString = '';

        // if(route.name == this.$route.name && qs.stringify(route.query) == qs.stringify(this.$route.query)) {
        // if(route.fullPath == this.$route.fullPath) {
          // 将query参数带到iframe链接上
          queryString = qs.stringify(route.query)
          // return window.location.origin + url
          if(queryString != '') queryString= '?'+ queryString;
        // }
        return window.location.origin + url + queryString
      }
    },
    // 判断该路径是否在hasopen中
    isExistInIframeList(router) {
      var flag = false;
      for (let i = 0; i < this.hasOpenIframePagesArr.length; i++) {
        if (router.fullPath == this.hasOpenIframePagesArr[i].fullPath) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    /**
     * 直接遍历出所有iframe 同时展示
     */
    filterMenu(menuList) {
      if (Array.isArray(menuList) && menuList.length > 0) {
        menuList.forEach(item => {
          if (item.meta.iframeUrl) {
            this.filterRoutes.push(item);
          }
          
          if (item.children && item.children.length > 0) {
            this.filterMenu(item.children);
          }
        });
      }

      return this.filterRoutes;
    },
    changePage(key) {
      this.activePage = key;
      this.$router.push(key);
    },
    editPage(key, action) {
      this[action](key); // remove
    },
    remove(key, next) {
      if (this.pageList.length === 1) {
        return this.$message.warning(this.$t("warn"));
      }
      let index = this.pageList.findIndex(item => item.fullPath === key);
      //清除缓存
      this.clearCaches = this.cachedKeys.splice(index, 1);
      this.pageList.splice(index, 1);
      if (next) {
        this.$router.push(next);
      } else if (key === this.activePage) {
        index =
          index >= this.pageList.length ? this.pageList.length - 1 : index;
        this.activePage = this.pageList[index].fullPath;
        this.$router.push(this.activePage);
      }
    },
    onContextmenu(e) {
      const pageKey = getPageKey(e.target);
      if (pageKey) {
        e.preventDefault();
        this.menuVisible = true;
      }
    },
    onMenuSelect(key, target) {
      let pageKey = getPageKey(target);
      switch (key) {
        case "1":
          this.closeLeft(pageKey);
          break;
        case "2":
          this.closeRight(pageKey);
          break;
        case "3":
          this.closeOthers(pageKey);
          break;
        default:
          break;
      }
    },
    closeOthers(pageKey) {
      const index = this.pageList.findIndex(item => item.fullPath === pageKey);
      // 清除缓存
      this.clearCaches = this.cachedKeys.filter((item, i) => i != index);
      this.cachedKeys = this.cachedKeys.slice(index, index + 1);

      this.pageList = this.pageList.slice(index, index + 1);
      if (this.activePage != pageKey) {
        this.activePage = pageKey;
        this.$router.push(this.activePage);
      }
    },
    closeLeft(pageKey) {
      const index = this.pageList.findIndex(item => item.fullPath === pageKey);
      // 清除缓存
      this.clearCaches = this.cachedKeys.filter((item, i) => i < index);
      this.cachedKeys = this.cachedKeys.slice(index);

      this.pageList = this.pageList.slice(index);
      if (!this.pageList.find(item => item.fullPath === this.activePage)) {
        this.activePage = pageKey;
        this.$router.push(this.activePage);
      }
    },
    closeRight(pageKey) {
      const index = this.pageList.findIndex(item => item.fullPath === pageKey);
      // 清除缓存
      this.clearCaches = this.cachedKeys.filter((item, i) => i > index);
      this.cachedKeys = this.cachedKeys.slice(0, index + 1);

      this.pageList = this.pageList.slice(0, index + 1);
      if (!this.pageList.find(item => item.fullPath === this.activePage)) {
        this.activePage = pageKey;
        this.$router.push(this.activePage);
      }
    },
    pageName(page) {
      return this.$t(getI18nKey(page.matched[page.matched.length - 1].path));
    },
    closePageListener(event) {
      const { closeRoute, nextRoute } = event.detail;
      const closePath =
        typeof closeRoute === "string" ? closeRoute : closeRoute.path;
      this.remove(closePath, nextRoute);
    },
    ...mapMutations("setting", ["correctPageMinHeight"])
  }
};
/**
 * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
 * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
 * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
 * @param target 查询开始目标
 * @param depth 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
 * @returns {String}
 */
function getPageKey(target, depth = 0) {
  if (depth > 2 || !target) {
    return null;
  }
  return (
    target.getAttribute("pagekey") ||
    getPageKey(target.firstElementChild, ++depth)
  );
}
</script>

<style scoped lang="less">
.iframe-view {
  border: none;
  width: 100%;
}
.tabs-view-content {
  position: relative;
  height: 100%;
  overflow: overlay;
  overflow-x: auto;
  .page-toggle-transition {
    height: 100%;
    &.is-core {
      min-width: 1200px;
    }
    .router-view-box {
      min-height: calc(100% - 70px);
      padding: 15px 15px 0;
    }
    .iframe-box {
      height: 100%;
      iframe {
        height: 100%;
      }
    }
  }
}
</style>
