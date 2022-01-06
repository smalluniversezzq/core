<template>
  <a-card
    :title='title'
    :body-style="bodyStyle"
    :bordered="bordered"
    :loading="loading"
  >
    <slot></slot>
    <slot
      name="extra"
      slot="extra"
    ></slot>
  </a-card>
</template>
<script>
import { Card } from "ant-design-vue";
export default {
  props: {
    title: Card.props.title,
    bodyStyle: Card.props.bodyStyle,
    bordered: Card.props.bordered,
    loading: Card.props.loading
  }
};
</script>