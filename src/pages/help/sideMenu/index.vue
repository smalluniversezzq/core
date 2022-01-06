<template>
  <div class="menu-wrap beauty-scroll">
    <a-menu
      @click="menuClick"
      v-model="selectedKeys"
      :open-keys.sync="openKeys"
      @openChange="openChange"
      @select="select"
      mode="inline"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.key">
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item"/>
      </template>
    </a-menu>
  </div>
</template>

<script>

import {cloneDeep} from 'lodash'
import SubMenu from './subMenu'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  props: {
    menuData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultOpenKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultSelectedKeys: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    defaultSelectedKeys(val){
      this.selectedKeys = cloneDeep(val);
    },
    defaultOpenKeys(val){
      this.openKeys = cloneDeep(val);
    }
  },
  data(){
    return {
      openKeys: cloneDeep(this.defaultOpenKeys),
      selectedKeys: cloneDeep(this.defaultSelectedKeys)
    }
  },
  mounted(){
  },
  methods:{
    select(value){
      console.log(value)
    },
    openChange(openKeys){
      console.log(openKeys)
    },
    menuClick(item){
      this.$emit('menuClick', item)
      
    },
  }
}
</script>

<style scoped lang="less">
.menu-wrap{
  background: #fff;
  height: 100%;
  overflow-y: auto;
  .item-content{
    padding: 15px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    .item-icon{
      font-size: 12px;
      padding-right: 4px;
      cursor: pointer;
    }
    .item-name{
    }
  }
  .checked{
    background: #eee;
  }
  .subs-menu{
    padding-left: 1em;
  }
}
</style>