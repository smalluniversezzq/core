<template>
  <div>
    <a-card title="单选框">
      <byf-radio-group v-model="value">
        <byf-radio :value="index" v-for="(item, index) in radioItems" :key="item">{{item}}</byf-radio>
        <a-alert :message="'选中第'+value+'项,内容为：'+ radioItems[value]" style="margin-top:10px;" />
      </byf-radio-group>
    </a-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      value: 1,
      radioItems: ['选项1','选项2','选项3','选项4',]
    }
  }
}
</script>