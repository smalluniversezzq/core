<template>
  <div class='ByfRadioTab'>
    <a-radio-group 
      v-bind="$props"
      :ref="prop"
      v-model="radioGroupValue"
      :disabled="disabled"
      @change="onChange"
      :options="options"
    >
    </a-radio-group>
    <div v-show='radioGroupValue==hide'>
       <transition name='slide-fade'>
        <slot name='toggle' >
        </slot>
      </transition>
    </div>
  </div>
</template>
<script>
import { Radio } from 'ant-design-vue'
export default {
  name:"ByfRadioTab",
  props: {
    ...Radio.props,
    value: Radio.Group.props.value,
    disabled: Radio.Group.props.disabled,
    prop: {
      type: String
    },
    options:{
      type:Array,
    },
    hide:{}
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      radioGroupValue: this.value
    }
  },
  methods: {
    onChange(e){
      this.$emit('change', e.target.value)
    }
  }
}
</script>
<style scoped>
  .slide-fade-enter-active {transition: all .5s ease;}
  .slide-fade-leave-active {transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .slide-fade-enter, .slide-fade-leave-to{transform: translateX(5px);opacity: 0;}
</style>