<template>
  <a-modal
    title="Basic Modal"
    v-on="$listeners"
    v-model="newVisible"
  >
    <slot></slot>
  </a-modal>
</template>
<script>
export default {
  props: ["byfvisible"],
  model: {
    prop: "byfvisible",
    event: "change"
  },
  data() {
    return {
      newVisible: this.byfvisible
    };
  },
  watch: {
    byfvisible(val) {
      this.newVisible = val;
    },
    newVisible(val) {
      this.$emit("change", val);
    }
  },
  methods: {
  }
};
</script>