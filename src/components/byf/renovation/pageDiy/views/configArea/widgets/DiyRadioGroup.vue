<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <a-radio-group class="a-radio-group" :value="widgetData.value || widgetData.info.default_value"  @change="onChange">
        <div class="one-radio-btn" v-for="item in list" :key="item.key">
          <a-radio-button :disabled="item.disabled" class="a-radio-button" :value="item.key" :style="{marginRight: widgetData.gap+'px'}">
            <div class="radio-item-box">
              <img v-if="item.img" :src="item.img" alt="">
              <byf-icon v-else class="icon" :type="item.icon"></byf-icon>
            </div>
          </a-radio-button>
          <span>{{item.title}}</span>
        </div>
      </a-radio-group>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
export default {
  name: 'DiyRadioGroup',
  mixins: [WidgetMixin],
  props: {
    widgetData: {
      type: Object,
      required: true
    },
  },
  computed: {
    list(){
      let list = [];
      for(let i in this.widgetData.optionsList){
        list.push(this.widgetData.optionsList[i])
      }
      list.sort((a, b) => {
        return a.sort - b.sort;
      })
      return list;
    }
  },
  methods: {
    onChange(e){
      this.widgetData.value = e.target.value
      this.triggerEventWhenNeed({wUUid: this.widgetData.uuid, value: e.target.value})
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.a-radio-group {
  display: flex;
  flex-wrap: wrap;
  .one-radio-btn {
    display: flex;
    flex-direction: column;
    .a-radio-button {
      margin-bottom: 5px;
      .radio-item-box {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        padding: 3px 0;
        img {
          max-height: 100%;
        }
      }
      .icon {
        font-size: 24px;
      }
    }
    span {
      font-size: 12px;
      line-height: normal;
      text-align: center;
    }
  }
}
</style>