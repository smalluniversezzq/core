<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="inputClass">{{widgetData.title}}：</div>
      </template>
      <div class="diy-icon-selector" :class="{'has-error': !widgetData.verifyStatus}">
        <byf-iconfont-selector-btn :icon="widgetData.icon.font_class" @change="iconChange" @clear="onClear"></byf-iconfont-selector-btn>
        <a-slider v-if="!widgetData.hide_icon_slider" class="a-slider" v-model="widgetData.icon.font_size" :max="widgetData.max" :min="widgetData.min"></a-slider>
        <div class="input-number" v-if="!widgetData.hide_icon_slider">
          <!-- TODO step 步长属性 -->
          <a-input-number ref="inputNumber" class="a-input-number" :value="widgetData.icon.font_size" :max="widgetData.info.max" @change="onChange"></a-input-number>
          <div class="unit">{{widgetData.info.unit}}</div>
        </div>
        <div class="ant-form-explain">{{!widgetData.verifyStatus?'请选择'+widgetData.title:''}}</div>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
export default {
  name: 'DiyIconSelector',
  mixins: [WidgetMixin],
  methods: {
    iconChange(val){
      this.widgetData.icon.changeIcon(val)
    },
    changeIconSize(val){
      this.widgetData.icon.changeIconSize(val)
    },
    onClear(){
      this.widgetData.icon.clear()
    },
    onChange(val){
      this.widgetData.icon.font_size = val
      // this.changeIconSize(val)
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-icon-selector {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  .iconWrap {
    background-color: white;
  }
  .a-slider {
    flex-grow: 1;
    margin-right: 15px;
    margin-left: 15px;
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
.diy-icon-selector-slider{
  .diy-slider-box {
    display: flex;
    align-items: center;
    
  }
}
</style>