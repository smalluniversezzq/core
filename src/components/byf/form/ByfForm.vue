<template>
  <a-form-model
    v-bind="$props"
    v-on="$listeners"
    :ref="prop"
  >
    <slot></slot>
  </a-form-model>
</template>
<script>
import { FormModel } from "ant-design-vue";
export default {
  props: {
    ...FormModel.props,
    prop: {
      type: String
    }
  },
  methods: {
    validate(fn) {
      this.$refs[this.prop].validate(fn);
    },
    resetFields() {
      this.$refs[this.prop].resetFields();
    }
  }
};
</script>