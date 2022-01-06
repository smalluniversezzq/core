<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="inputClass">{{widgetData.title}}：</div>
      </template>
      <div class="diy-img-link-selector" :class="{'has-error': !widgetData.verifyStatus}">
        <byf-upload-btn class="byf-upload-btn" size="small" :imgsList="[widgetData.image.url]" @change="onChange"></byf-upload-btn>
        <div class="right">
          <diy-link-selector :widgetData="widgetData.linkData" :level="level"></diy-link-selector>
          <span class="tips">{{widgetData.tips}}</span>
        </div>
        <div class="ant-form-explain">{{!widgetData.verifyStatus?'请选择'+widgetData.title:''}}</div>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
import DiyLinkSelector from '@/components/byf/renovation/pageDiy/views/configArea/widgets/DiyLinkSelector' 

export default {
  name: 'DiyImgLinkSelector',
  mixins: [WidgetMixin],
  components: {DiyLinkSelector},
  created(){

  },
  methods: {
    onChange(arrStr, arrObj){
      if(arrObj == undefined || arrObj === '' || !arrObj[0]){
        this.widgetData.image.url = ''
        this.widgetData.image.size = []
      } else {
        this.widgetData.image.url = arrObj[0].url
        this.widgetData.image.size = [arrObj[0].extend.width, arrObj[0].extend.height]
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-img-link-selector {
  display: flex;
  position: relative;
  .byf-upload-btn {
    margin-top: 0;
    /deep/ .upload {
      background: white;
    }
  }
  .right {
    margin-left: 10px;
    flex-grow: 1;
    /deep/ .ant-form-item {
      margin-bottom: 0;
    }
    .tips {
      color: @text-color-secondary;
      font-size: @font-size-sm;
      line-height: 20px;
      margin-top: 5px;
      display: inline-block;
    }
  }
}
</style>