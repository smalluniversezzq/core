<template>
  <a-card title="倒计时">
    <byf-statistic-countdown title="倒计时" :value="deadline" @finish="onFinish"></byf-statistic-countdown>
    <byf-statistic-countdown title="倒计时" :value="deadline" format="HH:mm:ss:SSS" @finish="onFinish"></byf-statistic-countdown>
  </a-card>
</template>
<script>
export default {
  data(){
    return {
      deadline: Date.now() + 1000 * 20,
    }
  },
  methods: {
    onFinish(){
      this.$message.info('倒计时结束')
    }
  }
}
</script>