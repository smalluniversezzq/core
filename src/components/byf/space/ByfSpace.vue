<template>
  <a-space :direction="direction" :style="{width: direction == 'vertical' ? '100%' : ''}" :align="align" :size="size">
    <slot></slot>
  </a-space>
</template>

<script>
export default {
  props: {
    direction: {
      default: 'horizontal'
    },
    align: {
      defaule: ''
    },
    size: {
      default: 'small'
    }
  },
}
</script>

<style>

</style>