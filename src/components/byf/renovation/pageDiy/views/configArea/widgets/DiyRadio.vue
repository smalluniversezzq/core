<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <a-radio-group class="diy-radio" name="radio-group" :value="widgetData.value" @change="onChange">
        <a-radio 
          v-for="(item, index) in widgetData.optional" 
          :key="widgetData.key+index" 
          :value="item.key"
          :disabled="item.disabled"
        >{{item.title}}</a-radio>
      </a-radio-group>
      <div v-if="widgetData.info.tips">
        <span class="tips">{{widgetData.info.tips}}</span>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
export default {
  name: 'DiyRadio',
  mixins: [WidgetMixin],
  methods: {
    onChange(e){
      this.widgetData.value = e.target.value
      this.triggerEventWhenNeed({wUUid: this.widgetData.uuid, value: e.target.value})
    },
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.ant-form-item{
  .diy-radio {
    .ant-radio-wrapper {
      margin-bottom: 10px;
    }
  }
  .tips {
    color: @text-color-secondary;
    font-size: @font-size-sm;
    line-height: 20px;
    margin-top: 5px;
    display: inline-block;
  }
}
</style>