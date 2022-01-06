<template>
  <a-layout :class="['admin-layout', fixedSideBar ? 'fixed-side-bar' : '', 'beauty-scroll']">
    <side-menu-by :theme="theme.mode" v-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed" :collapsible="true" @toggleCollapse="toggleCollapse" />
    <drawer v-if="!hideSetting" v-model="showSetting" placement="right">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'"/>
      </div>
      <setting />
    </drawer>
    <a-layout class="admin-layout-main">
      <admin-header-by :style="headerStyle" :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
      <a-layout-header v-if="fixedHeader"></a-layout-header>
      <a-layout-content class="admin-layout-content">
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import AdminHeaderBy from './header/AdminHeaderBy'
import Drawer from '../components/tool/Drawer'
import SideMenuBy from '../components/menu/SideMenuBy'
import Setting from '../components/setting/Setting'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'AdminLayout',
  components: {
    Setting, 
    SideMenuBy, 
    Drawer, 
    AdminHeaderBy
  },
  props: {
    minHeight: Number
  },
  data () {
    return {
      collapsed: false,
      showSetting: false
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'theme', 'layout', 'fixedHeader', 'fixedSideBar',
      'hideSetting', 'menuData']),
    sideMenuWidth() {
      return this.collapsed ? '80px' : '256px'
    },
    headerStyle() {
      let width = (this.fixedHeader && this.layout == 'side' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      let transition = this.fixedHeader ? 'transition: width 0.2s' : ''
      return `width: ${width}; position: ${position}; ${transition}`
    }
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight']),
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    onMenuSelect () {
      this.toggleCollapse()
    },
  },
  created() {
    this.correctPageMinHeight(this.minHeight - 1)
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 1)
  }
}
</script>

<style lang="less" scoped>
  .admin-layout{
    &.fixed-side-bar{
      height: 100vh;
    }
    .admin-layout-main{
      position: relative;
      .admin-header{
        top: 0;
        right: 0;
      }
    }
    .admin-layout-content{
      overflow: overlay;
      height: 100%;
    }
    .setting{
      background-color: @primary-color;
      color: @base-bg-color;
      border-radius: 5px 0 0 5px;
      line-height: 40px;
      font-size: 22px;
      width: 40px;
      height: 40px;
      box-shadow: -2px 0 8px @shadow-color;
    }
  }
</style>
