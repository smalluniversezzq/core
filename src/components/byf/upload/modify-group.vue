<template>
  <a-card
    v-if="isShow"
    title="修改分组"
    :bordered="false"
    style="width: 228px;position:absolute;z-index:19;border-raduis:10px"
  >
    <a-input v-model="groupName"></a-input>
    <div class="m-btn-group">
      <a-button>取消</a-button>
      <a-button type="primary">确定</a-button>
    </div>
  </a-card>
</template>
<script>
export default {
  props: ["groupName"],
  data() {
    return {};
  },
  mounted() {
  },
  methods: {},
  computed: {
    isShow() {
      return this.$store.getters["upload/getStatus"];
    }
  }
};
</script>
<style lang="less" scoped>
.m-btn-group {
  margin-top: 20px;
  text-align: right;
  > button {
    margin-left: 10px;
  }
}
</style>