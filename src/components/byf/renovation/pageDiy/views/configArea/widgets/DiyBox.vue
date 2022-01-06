<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <a-card class="widget-content" size="small">
        <!-- 通过v-bind="$attrs"将本组件没用在props中接收的属性，往下传递。比如：level -->
        <template v-for="(item, index) in widgetData.children">
          <one-widget v-show="!item.hide" :key="index" :level="level+1" :widgetData="item"></one-widget>
        </template>
      </a-card>
    </a-form-model-item>
  </div>
</template>
 
<script>
import WidgetMixin from './common/widgetMixin'
/**
 * 组件之间的循环引用 要通过异步import
 * 文档：https://vuejs.bootcss.com/guide/components-edge-cases.html#%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8
 */
const OneWidget = ()=>import('@/components/byf/renovation/pageDiy/views/configArea/oneWidget')
export default {
  name: 'DiyBox',

  // eslint-disable-next-line
  components: {OneWidget},
  mixins: [WidgetMixin],
  data(){
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.widget-content {
  background: @background-color-light;
}
</style>