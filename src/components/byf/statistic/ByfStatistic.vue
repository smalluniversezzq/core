<template>
  <a-statistic
    :title="title"
    :value="value"
    :precision="precision"
  >
    <slot name="prefix"  slot="prefix"></slot>
    <slot name="suffix"  slot="suffix"></slot>
  </a-statistic>
</template>
<script>
import { Statistic } from 'ant-design-vue'
export default {
  props: {
    /**
     * {string} 数值的标题	
     */
    title: Statistic.props.title,
    /**
     * {string | number} 数值内容		
     */
    value: Statistic.props.value,
    /**
     * {number} 数值精度		
     */
    precision: Statistic.props.precision
  }
}
</script>