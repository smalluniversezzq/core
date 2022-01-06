<template>
  <div class="components-list">
    <component-item 
      v-for="(item, index) in elementsList" 
      :key="index"  
      :component="item" 
      v-bind="$attrs" 
      v-on="$listeners"
    ></component-item>
  </div>
</template>

<script>
import ComponentItem from './componentItem'
export default {
  components: {ComponentItem},
  props: {
    elementsList: {
      type: Array
    }
  },
  mounted(){
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.components-list {
  display: flex;
  flex-wrap: wrap;
}
</style>