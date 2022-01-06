<template>
  <a-layout class="gen">
    <a-layout-header class="admin-header" :class="headerTheme">
      <div class="admin-header-wide">
        <div class="left-wrap">
          <img class="platform-logo" :src="configInfo ? configInfo.sys_site_logo : defaultLogo" alt="邦耀" >
          <span class="title-text">邦耀文档中心</span>
          <a-tabs default-active-key="1" @change="tabsChange">
            <a-tab-pane key="1" tab="文档"></a-tab-pane>
            <a-tab-pane key="2" tab="社区"></a-tab-pane>
          </a-tabs>
        </div>
        <div class="admin-header-right" :class="headerTheme">
          <!-- <a-input-search placeholder="搜索内容" style="width: 200px" @search="onSearch" /> -->
          <a-select
            allowClear
            show-search
            placeholder="请输入搜索关键词"
            style="width: 300px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
          >
            <div slot="dropdownRender" style="padding: 0 10px">
              <a-list :data-source="searchResultListData">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta>
                    <div slot="description" style="width: 260px" class="description text-overflow-1" >{{ item.describe }}</div>
                    <a slot="title" style="width: 260px;display:block" class="title text-overflow-1" @click="toDetails(item)">{{ item.title }}</a>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
            <!-- <a-select-option v-for="item in searchResultList" :key="item.id">
              {{ item.title }}
            </a-select-option> -->
          </a-select>
        </div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="230">
        <sideMenu ref="sideMenu" :menuData="menuData" 
        :defaultOpenKeys="defaultOpenKeys" 
        :defaultSelectedKeys="defaultSelectedKeys" 
        @menuClick="menuClick"/>
      </a-layout-sider>
      <a-layout>
        <a-card>
          <template slot="title">
            <a-breadcrumb>
              <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
                <a v-if="!item.children" @click.prevent="menuClick(item)">{{item.title}}</a>
                <span v-else>{{item.title}}</span>
              </a-breadcrumb-item>
              <a-breadcrumb-item v-if="$route.name == 'helpArticleDetails'">
                <!-- <a v-if="!item.children" @click.prevent="menuClick(item)">{{item.title}}</a> -->
                <span>正文</span>
              </a-breadcrumb-item>
            </a-breadcrumb> 
          </template>
        </a-card>
        <a-layout-content class="gen-layout-content beauty-scroll">
          <router-view class="gen-router-view"></router-view>
          <page-footer v-if="!$route.meta.hideCopyRight" :link-list="footerLinks" :copyright="configInfo ? configInfo.sys_copyright : ''" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>

import sideMenu from "./sideMenu";
import { mapState, mapGetters } from "vuex";
import { siteLogout } from "@/services/site";
import { getArticleCategoryList, getArticleList } from "@/services/admin/platform/assist";

import PageFooter from '@/layouts/footer/PageFooter'
import defaultLogo from '@/assets/img/platform-logo-w.png'
export default {
  components: {
    sideMenu,
    PageFooter
  },
  data(){
    return {
      defaultLogo,
      searchResultList: [],
      routes: [],
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
      menuData: [],
      params: this.$route.params,
      breadcrumb: [],
      categoryOptions: [],
      tabsArticleRoute: null
    }
  },
  watch:{
    $route(value){
      this.params = value.params;
      // if(value.name == 'helpArticleIndex'){
        this.initMenuOpenAndSelected()
        this.initbreadcrumb();
      // }
      this.saveArticleIndexTabsRoute();
      // 如果是详情，则需要在面包屑中增加一项
      // console.log(from)
      // if(from.name != 'helpArticleDetails'){
      //   if(this.params.articleId){
      //     this.breadcrumb.push(
      //       {title: '正文'}
      //     )
      //   }
      // }
    }
  },
  created(){
    this.saveArticleIndexTabsRoute();
    this.getArticleCategoryList();
  },
  mounted(){
  },
  computed: {
    ...mapState("setting", ["theme","consoleMenuData", 'footerLinks', 'copyright']),
    ...mapGetters("account", ['user']),
    ...mapGetters("siteConfig", ['configInfo']),
    searchResultListData(){
      return this.searchResultList.filter((item, index) =>{
        return index <= 4
      })
    },
    headerTheme() {
      if (this.theme.mode == "dark") {
        return "light";
      }
      return this.theme.mode;
    }
  },
  methods: {
    toDetails(item){
      this.$router.push({path: `/help/helpArticleDetails/${item.category_alias}/${item.alias}`})
    },
    handleSearch(value) {
      if(value){
        setTimeout(() => {
          this.getArticleList({keyword: value})
        }, 300);
      }else{
        this.searchResultList = [];
      }
    },
    handleChange(value) {
      if(value){
        this.getArticleList({keyword: value})
      }else{
        this.searchResultList = [];
      }
    },
    getArticleList(data){
      getArticleList(data).then(res => {
        if(res.code == 200){
          this.searchResultList = res.data.list
        }
      })
    },
    // 存储文章tabs跳转路由，用于从其他tab跳转回来
    saveArticleIndexTabsRoute(){
      if(this.$route.name == 'helpArticleIndex'){
        this.tabsArticleRoute = {fullPath: this.$route.fullPath}
      }
    },
    getArticleCategoryList(){
      getArticleCategoryList().then(res => {
        if(res.code == 200){
          this.categoryOptions = res.data.list;
          this.initMenuData();
          this.initMenuOpenAndSelected()
          this.initbreadcrumb();
        }
      })
    },
    initMenuData(){
      // 初始化数据为符合menu使用
      this.menuData = this.initMenuMap(this.categoryOptions);
    },
    initMenuMap(arr){
      return arr.map(item => {
        if(item.subs.length){
          item.children = item.subs;
          this.initMenuMap(item.subs);
        }
        item.key = item.alias;
        return item;
      })
    },
    tabsChange(key){
      if(key == 1){
        this.$router.push(this.tabsArticleRoute)
      }
    },
    initMenuOpenAndSelected(){
      // 初始化选中与展开
      let keys = this.getPaths();
      keys = keys.map(item => {
        return item.key;
      });
      console.log(keys)
      this.defaultOpenKeys = keys;
      this.defaultSelectedKeys = keys;
    },
    // 获取路径
    getPaths(){
      let paths = []
      if(this.params.classId){
        paths = this.mapOpenKey(this.menuData, this.params.classId, [])
      }else{
        paths = this.getFirstMenu(this.menuData, [])
      }
      return paths;
    },
    initbreadcrumb(){
      this.breadcrumb = this.getPaths();
    },
    getFirstMenu(arr, path = []){
      let paths;
      for(let i = 0; i < arr.length; i++){
        let item = arr[i];
          if(item.children){
            paths = this.getFirstMenu(item.children, [...path, item])
            if(paths){
              break;
            }
          }else{
            paths = [...path, item]
            break;
          }
      }
      return paths
    },
    /**
     * 查找符合id的路径
     * @param {Array} arr 要遍历的多维数组
     * @param {String} id 要查找的子节点
     * @param {Array} path 当前查找的路径
     */
    mapOpenKey(arr, id, path = []){
      let paths;
      for(let i = 0; i < arr.length; i++){
        let item = arr[i];
        if(item.key == id ){
          paths = [...path, item]
          break;
        }else{
          if(item.children){
            paths = this.mapOpenKey(item.children, id, [...path, item])
            if(paths){
              break;
            }
          }
        }
      }
      return paths
    },
    menuClick(value){
      this.$router.push({path: `/help/helpArticleIndex/${value.key}`})
    },
    onSearch(){
    },
    setRoutes(route){
      this.routes = route.meta.breadcrumb;
      // this.routes = route.matched;
      // this.routes.splice(0, 1);
    },
    toAccountCenter(){
      this.$router.push({path: '/genBackstage/accountCenter/accountInfo'});
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
      .left-wrap{
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .platform-logo {
        height: 24px;
      }
      .title-text{
        text-align: center;
        font-size: 16px;
        color: #fff;
        padding-left: 10px;
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
  .gen-layout-content {
    padding: 15px 15px 0;
    overflow: auto;
    .gen-router-view {
      min-height: calc(100% - 70px);
      min-width: 1200px;
      box-sizing: border-box;
    }
  }
}
/deep/.ant-tabs-nav .ant-tabs-tab-active{
  color: #fff;
}
/deep/.ant-tabs-nav{
  color: rgba(229, 229, 229, 1);
}
/deep/.ant-tabs-bar{
  border: none;
  margin-bottom: 8px;
}
/deep/.ant-tabs-ink-bar{
  background-color: #fff;
}
</style>