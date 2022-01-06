<template>
  <a-list
    v-bind="$attrs"
    :pagination="pagination"
  >
    <template slot="default">
      <slot name="default"></slot>
    </template>

    <template
      v-for="(item) in dataSource"
      :data="item"
    >
      <slot
        name="renderItem"
        v-bind="item"
      ></slot>
    </template>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </a-list>
</template>
<script>
import { List } from "ant-design-vue";
export default {
  props: {
    ...List.props
  },
  created() {
    
  }
};
</script>