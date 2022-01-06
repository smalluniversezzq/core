<!--
 * @Author: your name
 * @Date: 2021-02-07 19:04:59
 * @LastEditTime: 2021-03-24 14:34:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /byf_web_core/src/components/byf/tabs/ByfTabs.vue
-->
<template>
  <a-tabs
    class="tabs"
    v-model="tabsValue"
    :default-active-key="defaultActiveKey"
    :type="type"
    :hide-add="hideAdd"
    :size="size"
    :tabBarStyle="tabBarStyle"
    :tabPositon="tabPositon"
    :animated="animated"
    :destroyInactiveTabPane="destroyInactiveTabPane"
    :prefixCls="prefixCls"
    :renderTabBar="renderTabBar"
    :tabBarGutter="tabBarGutter"
    @change="onChange"
    @edit="onEdit"
  >
    <slot></slot>
    <slot name="tabBarExtraContent" slot="tabBarExtraContent"></slot>
  </a-tabs>
</template>
<script>
import { Tabs } from 'ant-design-vue'
export default {
  props: {
    defaultActiveKey: Tabs.props.defaultActiveKey,
    type: Tabs.props.type,
    value: Tabs.props.value,
    hideAdd: Tabs.props.hideAdd,
    size: Tabs.props.size,
    tabBarStyle: Tabs.props.tabBarStyle,
    tabPositon: Tabs.props.tabPositon,
    animated: Tabs.props.animated,
    destroyInactiveTabPane: Tabs.props.destroyInactiveTabPane,
    prefixCls: Tabs.props.prefixCls,
    renderTabBar: Tabs.props.renderTabBar,
    tabBarGutter: Tabs.props.tabBarGutter
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      tabsValue: this.value == undefined? this.$slots.default[0].key: this.value 
    }
  },
  watch: {
    value(newValue){
      this.tabsValue = newValue
    }
  },
  created(){
  },
  methods: {
    onChange(activeKey){
      console.log(this.$slots.default[0])
      this.$emit('change', activeKey)
    },
    onEdit(targetKey, action){
      this.$emit('edit', targetKey, action)
    }
  }
}
</script>
<style scoped lang="less">

/deep/ .ant-tabs-tab-prev{
  border-right: 1px solid #ededed !important;
}
/deep/ .ant-tabs-tab-next{
  border-left: 1px solid #ededed !important;
}

/deep/ .ant-tabs-tab:not(:last-child){
  border-color:  rgba(0, 0, 0, 0.1);
}
</style>