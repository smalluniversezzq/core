<!--
 * @Author: your name
 * @Date: 2021-02-07 19:04:59
 * @LastEditTime: 2021-03-24 13:43:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /byf_web_core/src/components/byf/renovation/pageDiy/views/configArea/widgets/DiyInput.vue
-->
/**
  输入框控件
 */
<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" :class="inputClass" v-if="widgetData.title">{{widgetData.title}}：</div>
      </template>
      <div class="diy-input" :class="{'has-error': !widgetData.verifyStatus}">
        <a-input class="input" :maxLength="maxLength()" :placeholder="widgetData.placeholder" :value="widgetData.value" @change="onInputChange">
          <span slot="suffix" v-if="widgetData.max!=-1">{{widgetData.value.length+'/'+widgetData.max}}</span>
        </a-input>
        <div class="ant-form-explain">{{!widgetData.verifyStatus?'请输入'+widgetData.title:''}}</div>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
export default {
  name: 'DiyInput',
  mixins: [WidgetMixin],
  props: {
    widgetData: {
      type: Object,
      required: true
    },
  },
  created(){
  },
  methods: {
    maxLength(){
      return (this.widgetData.max * 1) > 0 ? (this.widgetData.max * 1) : null
    },
    onInputChange(e){
      let value = e.target.value
      
      // 限制输入框的最大字符数量
      if (this.widgetData.max != -1 && value.length > this.widgetData.max)  value = value.slice(0,this.widgetData.max)
      
      this.widgetData.value = value
      // 这里要强制刷新视图的值。因为vue 只有当检测到input的value绑定的属性的值有变化时，才会更新视图
      e.target.value = value
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-input {
  position: relative;
  .input {
    /deep/ .ant-input:not(:last-child) {
      padding-right: 40px;
    }
    /deep/ .ant-input-suffix {
      color: @text-color-secondary;
      font-size: 12px;
      right: 5px;
    }
  }
}
</style>