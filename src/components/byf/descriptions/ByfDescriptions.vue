<template>
  <a-descriptions
    v-bind="$attrs"
    :column="list.length"
  >
    <a-descriptions-item
      v-for="(item, index) in list"
      :span="item.span"
      :key="index"
      :label="item.label"
    >
      {{item.content}}
    </a-descriptions-item>
  </a-descriptions>
</template>
<script>
export default {
  props: ["list"]
};
</script>