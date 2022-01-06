<template>
<!-- 主菜单不使用ant-design menu 组件 -->
  <a-layout-sider :theme="sideTheme" :class="['side-menu', isMobile ? null : 'shadow']" :width="selectedMainMenuData.children && selectedMainMenuData.children.length > 0 && !collapsed?'236px':'114px'" :trigger="null">
    <div class="level-0-menu beauty-scroll">
      <div :class="['logo', theme]">
        <!-- <router-link to="/dashboard/workplace"> -->
        <a-tooltip>
          <template slot="title">
            <span v-if="platformInfo">{{platformInfo.name}}</span>
          </template>
          <img v-if="platformInfo" :src="platformInfo.logo">
          <a-avatar v-else icon="user" :size="40"></a-avatar>
        </a-tooltip>
          
        <!-- </router-link> -->
      </div>
      <div class="main-menu-box">
        <div class="main-menu-item" 
        :class="{selected: selectedMainMenuData.fullPath == item.fullPath}" 
        v-for="item in menuData" :key="item.fullPath" 
        v-show="!item.meta.invisible"
        @click="onMainMenuClick(item)">
          
          <byf-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          <span>{{$t(getI18nKey(item.fullPath))}}</span>
        </div>
      </div>
    </div>
    <div class="sub-menu-box beauty-scroll">
      <div class="sub-menu-title">
        <byf-icon v-if="selectedMainMenuData.meta && selectedMainMenuData.meta.icon" :type="selectedMainMenuData.meta.icon" />
        <span v-if="selectedMainMenuData">{{$t(getI18nKey(selectedMainMenuData.fullPath))}}</span>
      </div>
      <i-menu-by v-show="selectedMainMenuData.children && selectedMainMenuData.children.length > 0" levelType="sub" theme="light" :options="selectedMainMenuData.children || []" @select="onSubSelect" class="menu"/>
    </div>
  </a-layout-sider>
</template>

<script>
import IMenuBy from './menuBy'
import {mapState, mapGetters} from 'vuex'
import { getI18nKey } from '@/utils/routerUtil'

export default {
  name: 'SideMenuBy',
  components: {IMenuBy},
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data(){
    return {
      subMenuData: {}, // 记录子菜单数组。key:一级菜单path，value：一级菜单的children
      selectedMainMenuData: {}, // 被选中的主菜单
    }
  },
  watch: {
    $route(){
      let matchedRoute = this.$route.matched[1];
      this.addMenuLevel(this.menuData)
      for(let i = 0; i<this.menuData.length;i++) {
        if(this.menuData[i].fullPath == matchedRoute.path) {
          this.selectedMainMenuData = this.menuData[i]
        }
        this.subMenuData[this.menuData[i].fullPath]=this.menuData[i]
      }
    }
  },
  created(){
    let matchedRoute = this.$route.matched[1];
    this.addMenuLevel(this.menuData)
    for(let i = 0; i<this.menuData.length;i++) {
      if(this.menuData[i].fullPath == matchedRoute.path) {
        this.selectedMainMenuData = this.menuData[i]
      }
      this.subMenuData[this.menuData[i].fullPath]=this.menuData[i]
    }
  },
  computed: {
    sideTheme() {
      return this.theme == 'light' ? this.theme : 'dark'
    },
    ...mapState('setting', ['isMobile', 'systemName']),
    ...mapGetters("setting", ['platformInfo']),
  },
  methods: {
    getI18nKey,
    /**给菜单路由添加上菜单层级标志
     * @param {array[object]} routes
     * @param {int} level 菜单路由层级
     */
    addMenuLevel(routes, level = 0){
      for(let i = 0;i<routes.length;i++) {
        routes[i].meta.menuLevel = level
        if (routes[i].children) {
          this.addMenuLevel(routes[i].children, level + 1)
        }
      }
    },
    onSubSelect(obj){
      this.$emit('menuSelect', obj)
    },
    onMainMenuClick(mainMenu){
      if (mainMenu.fullPath !== this.$route.matched[1].path) {
        this.selectedMainMenuData = mainMenu
        this.$router.push(mainMenu.fullPath)
      }
      if (mainMenu.children && mainMenu.children.length > 0 && this.collapsed ) {
        this.$emit("toggleCollapse");
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "index";
.side-menu {
  /deep/ .ant-layout-sider-children {
    display: flex;
    .level-0-menu {
      width: 114px;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      background: #1C2C3C;
      flex:0 0 114px;
      &::-webkit-scrollbar{
        width: 0px;
        height: 0px;
      }
      &::-webkit-scrollbar-thumb {
        background: none;
      }
      &::-webkit-scrollbar-track {
        background: none;
      }
      .logo {
        background: none;
        padding-left: 0;
        text-align: center;
        line-height: 0;
        height: 55px;
        border-bottom: 1px solid #4F565E;
        padding-top: 7px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .main-menu-box {
        color: white;
        .main-menu-item {
          height: 46px;
          overflow: hidden;
          line-height: 46px;
          cursor: pointer;
          padding: 0 25px;
          margin-bottom: 3px;
          transition: background-color .3s;
          &:hover {
            background-color: #263D53;
          }
          &.selected {
            background-color: #2D8CF0;
          }
          i {
            margin-right: 10px;
          }
        }
      }
    }
    .sub-menu-box {
      width: 122px;
      height: 100%;
      overflow-y: auto;
      background: white;
      &::-webkit-scrollbar{
        width: 0px;
        height: 0px;
      }
      &::-webkit-scrollbar-thumb {
        background: none;
      }
      &::-webkit-scrollbar-track {
        background: none;
      }
      .sub-menu-title {
        height: 54px;
        line-height: 54px;
        text-align: center;
        font-size: 14px;
        box-shadow:0px -1px 7px 2px rgba(224,224,224,0.5);
        color: #000;
        white-space: nowrap;
        .anticon {
          margin-right: 10px;
        }
      }
      > .ant-menu {
        background: none;
      }

      .ant-menu {
        padding: 0;
        .ant-menu-item {
          height: 49px;
          line-height: 49px;
          margin: 0;
          white-space: nowrap;
        }
      }
      
      .ant-menu-submenu.ant-menu-submenu-open ul{
        background: #F5FAFE;
      }
      ul.ant-menu-sub {
        .ant-menu-item {
          padding-left: 38px !important;
        }
      }
    }
  }
}
</style>
