<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div>
        <rich-editor :content="widgetData.value" @changelHtml="onChange"></rich-editor>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
import RichEditor from '@/components/byf/richEditor/index.vue'
export default {
  name: 'DiyRichText',
  mixins: [WidgetMixin],
  components: {RichEditor},
  methods: {
    onChange(content){
      this.widgetData.value = content
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
</style>