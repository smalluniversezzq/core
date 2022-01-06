<template>
  <a-time-picker
    v-model="timePickerValue" 
    :format="format"
    @change="onChange" 
    @blur="onBlur"
  />
</template>
<script>
import { TimePicker } from 'ant-design-vue'
export default {
  props: {
    value: TimePicker.props.value,
    format: TimePicker.props.format
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      timePickerValue: this.value
    }
  },
  methods: {
    onChange(time){
      this.$emit('change', time)
    },
    onBlur(){
      this.$emit('blur')
    }
  }
}
</script>