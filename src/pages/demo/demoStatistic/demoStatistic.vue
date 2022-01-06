<template>
  <div>
    <byf-card title="统计数值">
      <byf-card title="基本展示">
        <byf-statistic title="活跃用户" value="123457" />
        <byf-statistic title="平台余额(CNY)" value="98546451" :precision="2" />
      </byf-card>
      <byf-card title="前缀后缀">
        <byf-statistic title="好评数" value="123457" >
          <template #suffix>
            <byf-icon type="icondianzan"></byf-icon>
          </template>
        </byf-statistic>
        <byf-statistic title="平台余额(CNY)" value="98546451" :precision="2" >
          <template #prefix>￥</template>
        </byf-statistic>
      </byf-card>
    </byf-card>
  </div>
</template>
<script>
export default {
  data(){
    return { 
    }
  }
}
</script>