<template>
  <a-switch
    v-model="switchValue"
    @change="onChange"
  ></a-switch>
</template>
<script>
import { Switch } from 'ant-design-vue'
export default {
  props: {
    value: Switch.props.value,
    checked: Switch.props.checked
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      switchValue: this.value
    }
  },
  created(){
  },
  methods: {
    onChange(checked){
      this.$emit('change', checked)
    }
  }

}
</script>