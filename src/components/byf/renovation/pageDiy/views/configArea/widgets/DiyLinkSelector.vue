<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div class="diy-link-selector">
        <link-input :links="getLinks()" :selectors="widgetData.link_params.tabs" :apiParams="apiParams" @confirm="onConfigm"></link-input>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
import LinkInput from '@/components/byf/linkSelector/linkSelectorInput'

export default {
  name: 'DiyLinkSelector',
  components: {LinkInput},
  mixins: [WidgetMixin],
  data(){
    return {
      apiParams: {
        tabParams: {
          tab: this.widgetData.link_params.tab
        },
        appPageParams: {
          appPage: this.widgetData.link_params.params? this.widgetData.link_params.params[1]: {}
        }
      }
    }
  },
  methods: {
    getLinks(){
      let arr = []
      if(this.widgetData.value.type!=-1) {
        arr.push(this.widgetData.value)
      }
      return arr
    },
    onConfigm(selectedLinks){
      this.widgetData.value = selectedLinks[0]
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-link-selector {
  background: white;
  max-width: 377px;
}
</style>