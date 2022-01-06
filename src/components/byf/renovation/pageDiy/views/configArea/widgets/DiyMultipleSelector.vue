<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div>
        <a-select
          mode="multiple"
          placeholder="请选择"
          v-model="widgetData.value"
          style="width: 200px"
        >
          <a-select-option v-for="item in widgetData.allLevelList" :key="item.id" :disabled="item.isdel == 1 && !hasSelected(item)">
            <!-- <a-badge v-if="item.isdel == 1" status="error" /> -->
            <span :style="{color: item.isdel == 1 ? 'red' : ''}">{{item.name}}</span>
            <span v-if="item.isdel == 1">(无效)</span>
          </a-select-option>
        </a-select>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
export default {
  name: 'DiyMultipleSelector',
  mixins: [WidgetMixin],
  data(){
    return {
      levelList: [],
    }
  },
  methods: {
    hasSelected(item){
      return this.widgetData.value.some(itm => itm == item.id);
    },
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
</style>