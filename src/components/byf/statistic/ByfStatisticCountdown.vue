<template>
  <a-statistic-countdown
    :title="title"
    :value="value"
    :format="format"
    @finish="onFinish"
  ></a-statistic-countdown>
</template>
<script>
import { Statistic } from 'ant-design-vue'

export default {
  props: {
    title: Statistic.Countdown.props.title,
    value: Statistic.Countdown.props.value,
    format: Statistic.Countdown.props.format,
  },
  methods: {
    onFinish(){
      this.$emit('finish')
    }
  }
}
</script>