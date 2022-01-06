<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
import enquireScreen from "./utils/device";
import { mapState, mapGetters, mapMutations } from "vuex";
import themeUtil from "@/utils/themeUtil";
import { getI18nKey } from "@/utils/routerUtil";
import { getSiteSid } from '@/services/site'
import { getAdminSiteInfo } from '@/services/admin/site'
import {loadIconJsAndCss} from '@/components/byf/icon/iconUtil.js'
export default {
  name: "App",
  data() {
    return {
      locale: {}
    };
  },
  created() {
    console.log(this.configInfo)
    // 在外层框架，每次打开页面 当本地存储没有sid时，拿取sid
    if(process.env.VUE_APP_DEVELOP_GROUP == 'core' && !localStorage.getItem('uSid')) {
      getSiteSid().then(() => {
        this.getAdminSiteInfo()
      });
    } else if(process.env.VUE_APP_DEVELOP_GROUP == 'business'){
      // 业务组框架，对body背景色透明处理
      document.body.style.backgroundColor = 'transparent'
    } else if(process.env.VUE_APP_DEVELOP_GROUP == 'core' && localStorage.getItem('uSid')){
      this.getAdminSiteInfo()
    }
    this.setHtmlTitle();
    this.setLanguage(this.lang);
    enquireScreen(isMobile => {
      this.$store.commit("setting/setDevice", isMobile);
    });
  },
  mounted() {
    console.log(this.$route)
    if(this.$route.path != '/login'){
      // 不是登录页，刷新页面，加载图片文件
      loadIconJsAndCss('other')
    }
    this.setWeekModeTheme(this.weekMode);

    if(this.configInfo){
      this.setFavicon(this.configInfo.sys_site_icon)
    }
  },
  watch: {
    weekMode(val) {
      this.setWeekModeTheme(val);
    },
    lang(val) {
      this.setLanguage(val);
    },
    $route() {
      this.setHtmlTitle();
    },
    "theme.mode": function(val) {
      let closeMessage = this.$message.loading(
        `您选择了主题模式 ${val}, 正在切换...`
      );
      themeUtil.changeThemeColor(this.theme.color, val).then(() => {
        setTimeout(closeMessage, 1000);
      });
    },
    "theme.color": function(val) {
      let closeMessage = this.$message.loading(
        `您选择了主题色 ${val}, 正在切换...`
      );
      themeUtil.changeThemeColor(val, this.theme.mode).then(() => {
        setTimeout(closeMessage, 1000);
      });
    }
  },
  computed: {
    ...mapState("setting", ["theme", "weekMode", "lang"]),
    ...mapGetters("siteConfig", ["configInfo"])
  },
  methods: {
    ...mapMutations('siteConfig', ['setConfigInfo']),
    // 获取平台信息，版权等
    getAdminSiteInfo(){
      getAdminSiteInfo().then(res => {
        if(res.code == 200){
          this.setConfigInfo(res.data);
          this.$nextTick(() => {
            this.setHtmlTitle()
            this.setFavicon(res.data.sys_site_icon)
          });
        }
      })
    },
    setWeekModeTheme(weekMode) {
      if (weekMode) {
        document.body.classList.add("week-mode");
      } else {
        document.body.classList.remove("week-mode");
      }
    },
    setLanguage(lang) {
      this.$i18n.locale = lang;
      switch (lang) {
        case "CN":
          this.locale = require("ant-design-vue/es/locale-provider/zh_CN").default;
          break;
        case "HK":
          this.locale = require("ant-design-vue/es/locale-provider/zh_TW").default;
          break;
        case "US":
        default:
          this.locale = require("ant-design-vue/es/locale-provider/en_US").default;
          break;
      }
    },
    setFavicon(link){
      let $favicon = document.querySelector('link[rel="icon"]')
      if ($favicon !== null) {
        $favicon.href = link;
      } else {
        $favicon = document.createElement("link");
        $favicon.rel = "icon";
        $favicon.href = link;
        document.head.appendChild($favicon);
      }
    },
    setHtmlTitle() {
      const route = this.$route;
      const key =
        route.path === "/"
          ? "home.name"
          : getI18nKey(route.matched[route.matched.length - 1].path);
      let sys_site_name = ` | ${this.configInfo ? this.configInfo.sys_site_name : process.env.VUE_APP_NAME}`
      document.title = this.$t(key) + sys_site_name;
    }
  }
};
</script>

<style lang="less" scoped>
#id {
}
</style>
