<template>
  <a-card>
    <a-space>
      <label>批量设置: </label>
      <setting-input :placeholder="item.title" v-for="(item ,index ) in options" :key="'input'+index" :value="item.value" :type="item.type" @change="(value)=>{onChange(value, item)}"/>
      <a-button @click="onApply">应用</a-button>
    </a-space>
  </a-card>
</template>
<script>
import SettingInput from './settingInput'
export default {
  props: {
    batchInputOptions: {
      required: true
    }
  },
  data(){
    return {
      // 用一个data属性深拷贝接收一下，防止子组件内修改属性值时影响到父组件
      options: JSON.parse(JSON.stringify(this.batchInputOptions))
    }
  },
  components: {SettingInput},
  methods: {
    onApply(){
      this.$emit('batchApply', JSON.parse(JSON.stringify(this.options)))
      this.resetOptions();
    },
    onChange(value, item){
      item.value = value
    },
    /**
     * 应用完就重置
     */
    resetOptions(){
      this.options.forEach(item => {
        item.value = null
      })
    }
  }
}
</script>