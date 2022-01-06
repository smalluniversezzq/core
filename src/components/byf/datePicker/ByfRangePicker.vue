<template>
  <a-range-picker 
    v-bind="$attrs" 
    v-model="rangeValue" 
    @change="onChange" 
    @blur="onBlur"
  ></a-range-picker>
</template>
<script>
import {DatePicker} from "ant-design-vue"
export default {
  // 继承所有的属性
  props: {
    ...DatePicker.RangePicker.props,
  },
  created(){
  },
  data(){
    return {
      rangeValue: this.value
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  methods: {
    onChange(dates, dateStrings){
      this.$emit('change', dates, dateStrings)
    },
    onBlur(){
      this.$emit('blur')
    }
  }
}
</script>