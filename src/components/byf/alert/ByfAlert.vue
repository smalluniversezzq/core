<template>
  <a-alert
    v-bind="$attrs"
    :afterClose="afterClose"
    :showIcon="showIcon"
  ></a-alert>
</template>
<script>
export default {
  props: {
    afterClose: {
      type: Function
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  }
};
</script>