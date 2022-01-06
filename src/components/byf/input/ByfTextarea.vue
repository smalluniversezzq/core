<template>
  <a-textarea 
    v-model="textareaValue" 
    :placeholder="placeholder" 
    :allow-clear="allowClear"
    :rows="rows"
    @change="onChange" 
    @blur="onBlur"
  ></a-textarea>
</template>
<script>
import { Input } from "ant-design-vue";

export default {
  props: {
    ...Input.TextArea.props,
    rows:{
      type: [Number, String]
    }
  },
  data(){
    return {
      textareaValue: this.value
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  methods: {
    onChange(e){
      this.$emit('change', e.target.value)
    },
    onBlur(){
      this.$emit('blur')
    }
  }
}
</script>