// 必须有这个组件，因为获取AllWidgets时用到了require.context()。要在本组件中import AllWidgets才能正常获取。
// 如果在某个控件中，比如DiyRadio.vue中import AllWidgets，获取到的会是undefined。
<template>
  <div class="one-widget-box" :class="'level-'+level">
    <component ref="myWidget" :is="getComponentName(widgetData)" :level="level" :widgetData="widgetData"></component>
  </div>
</template>

<script>
import {getComponentName} from '@/components/byf/renovation/pageDiy/views/common/common.js'
import AllWidgets from '@/components/byf/renovation/pageDiy/views/configArea/widgets'

export default {
  name: 'OneWidget',
  // eslint-disable-next-line
  components: { ...AllWidgets},
  props: {
    widgetData: {
      type: Object,
      required: true
    },
    /**
     * 控件的层级
     */
    level: {
      type:Number,
      required: true
    }
  },
  methods: {
    getComponentName
  }
}
</script>

<style lang="less" scoped>
.one-widget-box {
  &.level-2:last-child {
    /deep/ .ant-form-item {
      // margin-bottom: 0;
    }
  }
}
</style>