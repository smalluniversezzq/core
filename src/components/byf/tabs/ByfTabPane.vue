<template>
  <a-tab-pane 
    v-bind="$props"
    v-on="$listeners"
  >
    <slot></slot>
  </a-tab-pane>
</template>
<script>
import { Tabs } from 'ant-design-vue'
export default {
  props: {
    tab: Tabs.TabPane.props.tab,
    active: Tabs.TabPane.props.active,
    closable: Tabs.TabPane.props.closable,
    disabled: Tabs.TabPane.props.disabled,
    forceRender: Tabs.TabPane.props.forceRender,
    rootPrefixCls: Tabs.TabPane.props.rootPrefixCls,
    destroyInactiveTabPane: Tabs.TabPane.props.destroyInactiveTabPane
  },
  mounted(){
  }
}
</script>