<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div class="diy-slider-box">
        <a-slider class="a-slider" v-model="widgetData.value" :min="widgetData.info.min" :max="widgetData.info.max"></a-slider>
        <div class="input-number">
          <!-- TODO step 步长属性 -->
          <a-input-number ref="inputNumber" class="a-input-number" :value="widgetData.value" :min="widgetData.info.min" :max="widgetData.info.max" @change="onChange"></a-input-number>
          <div class="unit">{{widgetData.info.unit}}</div>
        </div>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
export default {
  name: 'DiySlider',
  mixins: [WidgetMixin],
  props: {
    widgetData: {
      type: Object,
      required: true
    },
  },
  methods: {
    onInput(e){
      let value = e.target.value
      value = +value.toString().match(/\d+(\.\d{0,2})?/)[0]
      if(value > this.widgetData.info.max) value = this.widgetData.info.max
      
      this.widgetData.value = value
      e.target.value = value
    },
    onChange(val){
      if(!val) val = 0
      
      this.widgetData.value = +val.toString().match(/\d+(\.\d{0,2})?/)[0]
      
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-slider-box {
  display: flex;
  align-items: center;
  .a-slider {
    flex-grow: 1;
    margin-right: 30px;
  }
  .input-number {
    display: flex;
    width: 100px;
    border: 1px solid @input-border-color;
    align-items: center;
    .a-input-number {
      border: none;
    }
    .unit {
      min-width: 30px;
      padding: 0 3px;
      background: @background-color-base;
      line-height: 32px;
      text-align: center;
      flex-shrink: 0;
    }
  }
}
</style>