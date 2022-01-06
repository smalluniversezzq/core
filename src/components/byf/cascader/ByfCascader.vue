<template>
  <div>
    <a-cascader
      :options="options"
      :placeholder="placeholder"
      :load-data="loadData"
      :disabled="disabled"
      :fieldNames="fieldNames"
      v-model="cascaderValue"
      @change="changeVal"
    />
  </div>
</template>
<script>
import { Cascader } from "ant-design-vue";
export default {
  props: {
    ...Cascader.props,
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      cascaderValue: this.value
    }
  },
  methods: {
    changeVal(val, selectedOptions) {
      let objKeys = ['provinceId', 'cityId', 'countyId', 'addressName']
      let addressInfoObj = {};
      val.forEach((item, index) => {
        addressInfoObj[objKeys[index]] = item
      })
      if (selectedOptions) {
        let string = '';
        selectedOptions.forEach(element => {
          string= string + ' '+element.name;
        });
        addressInfoObj.addressName = string;
      }

      this.$emit("change", val,addressInfoObj, selectedOptions); // 事件传值
    }
  }
};
</script>
