<template>
  <fragment class="byf-input">
    <a-input
      v-bind="$props"
      row="1"
      :auto-size="{ minRows: 1, maxRows: 6 }"
      v-model="byfInputValue"
      @blur="changeHandler"
      :ref="prop"
    />
    <span
      class="suffix"
      v-if="type=='textarea'"
    >{{suffix}}</span>
  </fragment>
</template>

<script>
import { Input } from "ant-design-vue";
export default {
  name: "byf-input",
  // 继承Input上面所有的属性
  props: {
    ...Input.props,
    prop: {
      type: String
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      byfInputValue: this.value
    };
  },
  methods: {
    changeHandler() {
      this.$emit("blur");
    }
  },
  mounted() {},
  watch: {
    byfInputValue(newVal) {
      this.$emit("change", newVal);
    }
  }
};
</script>
<style scoped lang="less">
/deep/ .ant-input {
  border-radius: 2px;
  height: 32px !important;
}
/deep/ .ant-input-suffix {
  font-size: 12px;
  color: #b8b9bd;
}
textarea {
  padding-right: 40px;
}

.suffix {
  position: absolute;
  right: 5px;
  bottom: -15px;
  font-size: 12px;
  color: #b8b9bd;
}
</style>