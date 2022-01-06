<template>
  <a-select v-bind="$attrs" v-on="$listeners" v-model="selectVal" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
    <slot></slot>
  </a-select>
</template>
<script>
import { Select } from "ant-design-vue";
export default {
  data() {
    return {
      selectVal: ""
    };
  },
  props: {
    ...Select.props
  },
  isSelect: true,
  model: {
    prop: "value",
    event: "input"
  },
  watch: {
    value(val) {
      this.selectVal = val;
    },
    selectVal(val, oldVal) {
      if (val != oldVal) {
        this.$emit("input", val);
        // this.$emit("select", val);
        // 状态需要进行改变
        this.$emit("change");
      }
    }
  }
};
</script>
