<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="inputClass">{{widgetData.title}}：</div>
      </template>
      <div class="diy-img-selector-box" :class="{'has-error': !widgetData.verifyStatus}">
        <byf-upload-btn size="small" class="byf-upload-btn" :imgsList="[widgetData.image.url]" @change="onChange"></byf-upload-btn>
        <!-- TODO 超出隐藏 -->
        <span class="tips">{{widgetData.tips}}</span>
        <div class="ant-form-explain">{{!widgetData.verifyStatus?'请选择'+widgetData.title:''}}</div>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
export default {
  name: 'DiyImgSelector',
  mixins: [WidgetMixin],
  methods: {
    onChange(arrStr, arrObj){
      if(arrObj[0]) {
        this.widgetData.image.url = arrObj[0].url
        this.widgetData.image.size = [arrObj[0].extend.width, arrObj[0].extend.height]
      } else {
        // 没有第0项，表示删除
        this.widgetData.image.url = ''
        this.widgetData.image.size = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-img-selector-box {
  display: flex;
  align-items: center;
  position: relative;
  .byf-upload-btn {
    background: white;
  }
  .tips {
    margin-left: 10px;
    color: @text-color-secondary;
    font-size: @font-size-sm;
  }
}
</style>