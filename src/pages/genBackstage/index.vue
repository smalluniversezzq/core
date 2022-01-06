<template>
  <a-layout class="gen">
    <a-layout-header class="admin-header" :class="headerTheme">
      <div class="admin-header-wide">
        <img
          class="platform-logo"
          :src="configInfo ? configInfo.sys_site_logo : defaultLogo"
          alt=""
        >
        <div class="admin-header-right" :class="headerTheme">
          <!-- <byf-icon class="header-item" type="iconhelp" @click="toHelp"></byf-icon>
          <header-notice class="header-item" /> -->
          <a-dropdown class="header-item">
            <a @click="e => e.preventDefault()">
              <a-avatar :size="30" :src="user.avatar"></a-avatar>
              {{user.real_name}}
              <byf-icon
                style="vertical-align:-3px;"
                type="iconxiajiantou"
              ></byf-icon></a>
            <a-menu slot="overlay">
              <a-menu-item @click="toAccountCenter">
                <byf-icon type="iconyonghu"></byf-icon>
                个人信息
              </a-menu-item>
              <a-menu-item @click="logout">
                <byf-icon type="icontuichu"></byf-icon>
                退出
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>

    <a-layout>
      <a-layout-sider width="162" class="a-layout-sider">
        <side-menu width="162" :showLogo="false"
          :theme="theme.mode"
          :menuData="consoleMenuData"
        />
      </a-layout-sider>
      <a-layout>
        <a-card>
          <template slot="title">
            <a-breadcrumb>
              <a-breadcrumb-item v-for="(item, index) in routes" :key="index">
                <a v-if="item.path" @click.prevent="$router.push(item.path)">{{item.name}}</a>
                <span v-else>{{item.name}}</span>
              </a-breadcrumb-item>
              <!-- <template slot="itemRender" slot-scope="{ route, params, routes, paths }">
                <span v-if="routes.indexOf(route) === routes.length - 1">
                  {{ route.name }}
                </span>
                <router-link v-else :to="`${basePath}/${paths.join('/')}`">
                  {{ route.name }}
                </router-link>
              </template> -->
            </a-breadcrumb>
          </template>
        </a-card>
        <a-layout-content class="gen-layout-content beauty-scroll" id="gen-layout-content">
          <router-view class="gen-router-view"></router-view>
          <page-footer v-if="!$route.meta.hideCopyRight" :link-list="footerLinks" :copyright="configInfo ? configInfo.sys_copyright : ''" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
// import HeaderNotice from "./header/HeaderNotice";
import SideMenu from "@/components/menu/SideMenu";
import { mapState, mapGetters } from "vuex";
import { siteLogout } from "@/services/site";
import PageFooter from '@/layouts/footer/PageFooter'
import defaultLogo from '@/assets/img/platform-logo-w.png'
export default {
  components: {
    // HeaderNotice,
    SideMenu,
    PageFooter
  },
  data(){
    return {
      defaultLogo,
      routes: []
    }
  },
  created(){
    this.setRoutes(this.$route)
  },
  watch:{
    $route(val){
      this.setRoutes(val);
    }
  },
  computed: {
    ...mapState("setting", ["theme","consoleMenuData", 'footerLinks', 'copyright']),
    ...mapGetters("account", ['user']),
    ...mapGetters("siteConfig", ['configInfo']),
    headerTheme() {
      if (this.theme.mode == "dark") {
        return "light";
      }
      return this.theme.mode;
    }
  },
  methods: {
    logo(){
      if(this.configInfo){
        return this.configInfo.sys_site_logo
      }
      return false
    },
    setRoutes(route){
      console.log(route.name)
      console.log(route.meta)
      this.routes = route.meta.breadcrumb;
      // this.routes = route.matched;
      // this.routes.splice(0, 1);
    },
    toAccountCenter(){
      this.$router.push({name: 'accountInfo'});
    },
    logout() {
      // 退出账号
      siteLogout().then(res => {
        if (res.code == 200) {
          this.$router.push("/login");
        }
      });
    },
  }
};
</script>
<style scoped lang="less">
@import "@/layouts/header/index";
.gen {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .admin-header {
    background:#1E2E9D;
    padding:0 37px;
    height: 48px;
    .admin-header-wide {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .platform-logo {
        height: 24px;
      }
      .admin-header-right {
        color: white;
        .helpIcon{
          cursor: pointer;
        }
        .header-item {
          .anticon {
            font-size: 16px;
            width: 24px;
          }
        }
      }
    }
  }
  .a-layout-sider {
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0px;
    }
  }
  .gen-layout-content {
    padding: 15px 15px 0;
    overflow-y: overlay;
    overflow-x: auto;
    .gen-router-view {
      min-height: calc(100% - 70px);
      min-width: 1200px;
      box-sizing: border-box;
    }
  }
}
</style>