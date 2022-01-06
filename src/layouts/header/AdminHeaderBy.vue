<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div class="admin-header-wide side">
      <a-tooltip
          class="header-item"
          :title="collapsed ? '展开' : '收起'"
          placement="bottom"
        >
          <a class="header-left-icon first" @click="toggleCollapse" href="javascript:;" >
            <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a>
        </a-tooltip>
      
      <a-tooltip
          class="header-item"
          title="回到控制台"
          placement="bottom"
        >
          <a
           class="header-left-icon"
          @click="goHome"
            target="_blank"
            
          >
            <byf-icon class="iconshuaxin" type="iconbiaopan"></byf-icon>
          </a>
        </a-tooltip>
        <a-tooltip
          class="header-item"
          title="刷新当前页"
          placement="bottom"
        >
          <a
           class="header-left-icon last"
            @click="reloadPage"
            href="javascript:;"
          >
            <byf-icon class="refresh-icon" type="iconshuaxin"></byf-icon>
          </a>
        </a-tooltip>
      
      <div
        class="app-select-box"
        style="display: inline-block;"
      >
        <a-dropdown>
          <a @click="e => e.preventDefault()">
            <byf-icon
              type="iconhuojian"
              style="color: rgb(45,140,240);"
            ></byf-icon> 选择模块 <byf-icon
              style="color:#999;vertical-align:-3px;"
              type="iconxiajiantou"
            ></byf-icon>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              淘客
            </a-menu-item>
            <a-menu-item>
              商城
            </a-menu-item>
            <a-menu-item>
              小店
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div :class="['admin-header-right', headerTheme]">
        <header-notice class="header-item" />
        <span class="header-item" @click="toHelp">
          <byf-icon type="iconshiyongjiaocheng"></byf-icon>
        </span>
        <span class="header-item">{{platformInfo.expired_at ? platformInfo.expired_at + ' 到期' : ''}}</span>
        <a-dropdown class="header-item">
          <a @click="e => e.preventDefault()">{{user.username}}<byf-icon
              style="color:#999;vertical-align:-3px;"
              type="iconxiajiantou"
            ></byf-icon></a>
          <a-menu slot="overlay">
            <a-menu-item @click="logout">退出</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>

    <byf-tabs
      class="tabs-box"
      v-if="multiPage"
      type="editable-card"
      v-model="activePage"
      :hide-add="true"
      @change="changePage"
      @edit="editPage"
    >

    <a-dropdown slot="tabBarExtraContent">
      <span class="tabsmenuicon">
        <byf-icon type="iconxiajiantou" />
      </span>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;" @click="closeCurrent">关闭当前标签页</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="closeOthers">关闭其他标签页</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="closeAll">关闭全部标签页</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
      <byf-tab-pane
        :key="page.fullPath"
        v-for="page in pageList"
        :closable="page.meta.closable != 1"
      >
        <span
          slot="tab"
          :pagekey="page.fullPath"
        >
          <byf-icon style="padding-left: 5px" type="iconhome" v-show="page.meta.closable == 1"></byf-icon>
          <span v-show="page.meta.closable != 1">{{getPageTitle(page)}}</span>
        </span>
      </byf-tab-pane>
    </byf-tabs>
  </a-layout-header>
</template>

<script>
import HeaderNotice from "./HeaderNotice";
import { mapState, mapMutations, mapGetters } from "vuex";
import { getI18nKey } from "@/utils/routerUtil";
import { siteLogout } from "@/services/site";
import { filterTagsList } from "./filterTags"
export default {
  name: "AdminHeaderBy",
  components: { HeaderNotice },
  props: ["collapsed", "menuData"],
  data() {
    return {
      activePage: "",
      pageList: [],
      homeKey: '',
      filterTagsList,
    };
  },
  created() {
    const route = this.$route;
    this.pageList.push(route);
    let homeRoute = this.getHomeRoute();
    if(homeRoute && this.pageList[0].fullPath != homeRoute.fullPath){
      this.pageList.unshift(homeRoute);
    }
    if(homeRoute){
      this.pageList[0].meta.closable = 1;
    }
    this.activePage = route.fullPath;
    if (this.multiPage) {
      window.addEventListener("page:close", this.closePageListener);
    }
  },
  mounted() {
    this.correctPageMinHeight(-this.tabsOffset);

  },
  beforeDestroy() {
    window.removeEventListener("page:close", this.closePageListener);
    this.correctPageMinHeight(this.tabsOffset);
  },
  computed: {
    ...mapState("setting", ["theme", "multiPage", "systemName", "platformInfo"]),
    ...mapGetters("account", ['user']),
    headerTheme() {
      if (this.theme.mode == "dark") {
        return "light";
      }
      return this.theme.mode;
    }
  },
  watch: {
    $route: function(newRoute,oldRoute) {
      this.activePage = newRoute.fullPath;
      if (!this.multiPage) {
        this.pageList = [newRoute];
      } else if (
        this.pageList.findIndex(item => item.fullPath == newRoute.fullPath) ==
        -1
      ) {
          /**
           *    列表切换详情页，不打开新标签页功能
           *    需要在 filterTags/index.js 配置对象
           *    例子  列表跳转详情 列表的name作为键  详情的name作为值，可存在多个值
           *    GradeList:["editDefaultLevel",'setReturnedCommission','setRightsInterests'], 
           *    详情跳转列表 详情的name作为键 ,列表的name作为值
           *    editDefaultLevel:['GradeList'],
           *    setReturnedCommission:['GradeList'],
           *    setRightsInterests:['GradeList'],
          */
        if(this.filterTagsList[newRoute.name]){
          if(this.filterTagsList[newRoute.name].length>1){
            if(this.filterTagsList[newRoute.name].findIndex(item=> item === oldRoute.name)==-1){
              this.pageList.push(newRoute);
            }else{
              this.filterTagsList[newRoute.name].forEach((item)=>{
                if(oldRoute.name == item){
                  let index = this.pageList.findIndex(item => item.name == item);
                  this.pageList.splice(index,1,newRoute)
                }
              })
            }
          }else{
            if(oldRoute.name == this.filterTagsList[newRoute.name]){
              if(newRoute.name == 'WebShopGoodsGoodsListOnOffer' ){
                // let index = this.pageList.findIndex(item => item.name == this.filterTagsList[newRoute.name]);
                // this.pageList.splice(index,1,newRoute)
                if(newRoute.query.jump=="1"){
                  console.log(this.pageList,this.filterTagsList[newRoute.name])
                  let index = this.pageList.findIndex(item => item.name == this.filterTagsList[newRoute.name]);
                  this.pageList.splice(index,1,newRoute)
                }
              }else{
                console.log(this.pageList,this.filterTagsList[newRoute.name])
                let index = this.pageList.findIndex(item => item.name == this.filterTagsList[newRoute.name]);
                this.pageList.splice(index,1,newRoute)
              }
            }else{
              this.pageList.push(newRoute);
            }
          }
        }else{
          this.pageList.push(newRoute);
        }
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
    getPageTitle(page){
      if(page.query && page.query.title) {
        return page.query.title
      } else {
        return page.meta.title || page.name
      }
    },
    ...mapMutations("page", ["reload", "reloadIframe"]),
    toHelp(){
      let routeData = this.$router.resolve({
        name: "help",
      });
      window.open(routeData.href, '_blank');
    },
    closeCurrent(){
      if(this.$route.name != 'analysis'){
        this.remove(this.$route.fullPath)
      }
    },
    closeOthers(){
      let pageList = this.pageList.map(item => {
        return item;
      }) 
      pageList.forEach(item => {
        if(item.fullPath != this.$route.fullPath && item.name != 'analysis'){
          this.remove(item.fullPath)
        }
      })
    },
    closeAll(){
      let pageList = this.pageList.map(item => {
        return item;
      }) 
      pageList.forEach(item => {
        if(item.name != 'analysis'){
          this.remove(item.fullPath)
        }
      })
    },
    getHomeRoute(){
      let homeRoute = null, routes = JSON.parse(JSON.stringify(this.menuData));
      homeRoute = this.getRouteByName(routes)
      return homeRoute;
    },
    getRouteByName(routes){
      for(let i = 0; i < routes.length; i++){
        let item = routes[i];
        if(item.children){
          this.getRouteByName(item.children)
        }else{
          return item
        }
      }
    },
    reloadPage(){
      // 刷新页面
      if(this.$route.meta.iframeUrl){
        // iframe页面
        this.reloadIframe(this.$route.fullPath);
      }else{
        // vue页面
        this.reload(this);
      }
    },
    logout() {
      // 退出账号
      siteLogout().then(res => {
        if (res.code == 200) {
          this.$router.push("/login");
        }
      });
    },
    goHome() {
      this.$router.push("/genBackstage");
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
      this.pageList.splice(index, 1);
      if (next) {
        this.$router.push(next);
      } else if (key === this.activePage) {
        index = index >= this.pageList.length ? this.pageList.length - 1 : index;
        this.activePage = this.pageList[index].fullPath;
        this.$router.push(this.activePage);
      }

      // 清除下面的iframe
      // 删除路由并且删除相应的iframe
      window.vueObj.$emit("removeIframe", key);
    },
    // TODO 中英文需要用到，暂时不使用
    pageName(page) {
      return this.$t(getI18nKey(page.matched[page.matched.length - 1].path));
    },
    closePageListener(event) {
      const { closeRoute, nextRoute } = event.detail;
      const closePath = typeof closeRoute === "string" ? closeRoute : closeRoute.path;
      this.remove(closePath, nextRoute);
    },
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
    ...mapMutations("setting", ["correctPageMinHeight"])
  }
};
</script>

<style lang="less" scoped>
@import "index";
.tabsmenuicon{
  border-left: 1px solid #ededed;
  padding: 0 10px;
  &:hover{
    cursor: pointer;
  }
}
.ant-layout-header {
  height: 94px;
  line-height: 54px;
  .admin-header-wide {
    border-bottom: 1px solid #ededed;
    .header-left-icon{
      margin: 0 12px;
    }
    .first.header-left-icon{
      margin-left: 24px;
    }
    .last.header-left-icon{
      margin-right: 24px;
    }
    
    .trigger {
      line-height: 54px;
      font-size: 16px;
    }
    .iconshuaxin{
      line-height: 54px;
      font-size: 18px;
      cursor: pointer;
    }
    .refresh-icon{
      line-height: 54px;
      font-size: 14px;
      cursor: pointer;
    }
    .admin-header-right {
      color: #999;
      .header-item {
        .anticon {
          font-size: 16px;
          width: 24px;
        }
      }
    }
  }
  .ant-tabs {
    color: #999;
    &.ant-tabs-card {
      /deep/ .ant-tabs-card-bar {
        border: none;
        margin: 0;
        .ant-tabs-nav-container-scrolling {
          padding-left: 37px;
          padding-right: 37px;
          .ant-tabs-tab-prev {
            width: 37px;
            border-right: 2px solid #ededed;
          }
          .ant-tabs-tab-next {
            width: 37px;
            border-left: 2px solid #ededed;
          }
        }
        .ant-tabs-nav-wrap {
          padding-top: 6px;
          .ant-tabs-tab {
            border: none;
            background: none;
            border-radius: 0;
            height: 25px;
            line-height: 25px;
            &:not(:last-child) {
              border-right: 1px solid #dedede;
            }
          }
        }
      }
    }
  }
}
</style>
