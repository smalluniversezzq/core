<template>
  <a-date-picker 
    v-model="dateValue" 
    @change="onChange"
    @blur="onBlur"
  ></a-date-picker>
</template>
<script>
import {DatePicker} from "ant-design-vue"

export default {
  // 继承所有的属性
  props: {...DatePicker.props},
  data(){
    return {
      dateValue: this.value
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  mounted(){
  },
  methods: {
    onBlur(){
      this.$emit('blur')
    },
    onChange(date, dateString){
      this.$emit('change', date, dateString)
    }
  }
}
</script>