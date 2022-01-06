<template>
  <a-select
    v-model="selectList"
    mode="multiple"
    style="width: 100%"
    placeholder="Please select"
  >
    <a-select-option
      v-for="(item, index) in list"
      :key="index"
      :value="item"
    >
      {{item}}
    </a-select-option>
  </a-select>
</template>
<script>
export default {
  props: ["list"],
  data() {
    return {
      selectList: []
    };
  },
  model: {
    prop: "value",
    event: "input"
  },
  watch: {
    selectList(val) {
      this.$emit("input", val);
    }
  },
  created() {
  }
};
</script>