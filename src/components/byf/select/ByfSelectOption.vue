<template>
  <a-select-option
    v-bind="$props"
    v-on="$listeners"
    :value="value"
  >
    <slot></slot>
  </a-select-option>
</template>
<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  isSelectOption: true
};
</script>