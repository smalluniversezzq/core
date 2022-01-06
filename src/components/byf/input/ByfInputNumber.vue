<template>
  <div class="input-box" >
    <div class="name" v-if='name' :style="'width:'+nameWidth+'px'">
      {{name}}
    </div>
    <a-input-number
      v-bind="$props"
      row="1"
      :class="unit || isunit?'byf-input-number':''"
      :style="'width:'+width+'px'"
      v-model="Value"
      @blur="changeHandler"
      :ref="prop"
      ></a-input-number>
      <div class="unit" v-if='unit'>
        {{unit}}
      </div>
  </div>
</template>
<script>
import { InputNumber } from "ant-design-vue";
export default {
  props: {
    ...InputNumber.props,
    prop: {
      type: String
    },
    rows:{
      type: [Number, String]
    },
    unit:{
      type:String,
    },
    name:{
      type:String
    },
    isunit:{
      type:String,
    },
    width:{
      type:[Number, String]
    },
    nameWidth:{
      type:[Number, String]
    }
  },
  data(){
    return {
      Value:this.value
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    Value(newVal) {
      this.$emit("change", newVal);
    }
  },
  methods: {
    onChange(e){
      console.log(e,"onChange")
      this.$emit('change',e)
    },
    changeHandler() {
      this.$emit("blur");
    },
  }
}
</script>
<style lang="less" scoped>
.input-box{
  display: flex;
  flex-wrap: wrap;
  .byf-input-number{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .name{
    padding: 0 10px;
    background: #fff;
    border: 1px solid #d9d9d9 ;
    border-right: none;
    height: 32px;
    border-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
  }
  .unit{
    padding: 0 10px;
    background: #fff;
    border: 1px solid #d9d9d9 ;
    border-left: none;
    height: 32px;
    border-radius: 2px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    line-height: 30px;
    font-size: 14px;
    background: #fafafa;
    text-align: center;
  }
}

</style>
<style lang="less" >
  .byf-input-number{
    .ant-input-number-handler-wrap{
      display: none;
    }
  }
</style>