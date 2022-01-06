<template>
  <a-list-item v-bind="$attrs">
    <slot></slot>
    <slot name="extra"></slot>
    <div>
      <slot name="actions"></slot>
    </div>
  </a-list-item>
</template>
<script>
export default {
  created() {
    
  }
};
</script>