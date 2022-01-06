<template>
  <a-form-model-item
    v-bind="$props"
    v-on="$listeners"
    :ref="prop"
  >
    <slot></slot>
  </a-form-model-item>
</template>
<script>
export default {
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    },
    labelCol: {
      type: Object
    },
    wrapperCol: {
      type: Object
    },
    help: {
      type: String
    }
  },
  methods: {
  },
  created() {
  }
};
</script>