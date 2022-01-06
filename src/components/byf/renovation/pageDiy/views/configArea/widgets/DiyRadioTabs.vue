<template>
  <div class="one-widget" :class="'level-'+level+' '+(widgetData.title?'has-title':'')">
    <a-form-model-item class="ant-form-item" :class="'level-'+level">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div class="diy-radio-tabs-box">
        <a-radio-group class="a-radio-group" :value="widgetData.value.key" @change="onRadioGroupChange">
          <template v-for="(item, index) in list">
            <!-- 后端可以控制是否隐藏某一个单选项 -->
            <template v-if="!item.hide">
              <!-- 当有icon或img属性，使用a-radio-button展示 -->
              <div v-if="item.icon || item.img" class="one-radio-btn" :key="item.key+index">
                <a-radio-button class="a-radio-button" :value="item.key" :style="{marginRight: widgetData.gap+'px'}">
                  <div class="radio-item-box">
                    <img v-if="item.img" :src="item.img" alt="">
                    <byf-icon v-else class="icon" :type="item.icon"></byf-icon>
                  </div>
                </a-radio-button>
                <span>{{item.title}}</span>
              </div>
              <!-- 如果没有icon或img属性，则使用普通的radio -->
              <a-radio v-else :key="widgetData.key+index" :value="item.key">{{item.title}}</a-radio>
            </template>
          </template>
        </a-radio-group>
      </div>
    </a-form-model-item>
    <div class="children-box">
      <template v-for="(item, index) in widgetData.optional">
        <template v-if="widgetData.value.key == item.key && !item.hide_children && item.children && Object.keys(item.children).length>0">
          <!-- 如果某个单选项的第一个子控件是sortable，样式会不一样 -->
          <div class="sortable-box" 
            v-if="item.children && item.children[0] && item.children[0].info.type == 'sortable'" 
            :key="widgetData.key+'content'+index" 
          >
            <template v-for="(childItem, childIndex) in item.children">
              <one-widget v-show="!childItem.hide" :key="childItem.key+childIndex" :level="level+1" :widgetData="childItem" v-bind="$attrs"></one-widget>
            </template>
          </div>
          <div class="radio-tabs-card" :class="'level-'+level" :key="widgetData.key+'content'+index" v-else>
            <template v-for="(childItem, childIndex) in item.children">
              <one-widget v-show="!childItem.hide" :key="childItem.key+childIndex" :level="level+1" :widgetData="childItem" v-bind="$attrs"></one-widget>
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
const OneWidget = ()=>import('@/components/byf/renovation/pageDiy/views/configArea/oneWidget')
import WidgetMixin from './common/widgetMixin'

export default {
  name: 'DiyRadioTabs',
  mixins: [WidgetMixin],
  components: {OneWidget},
  props: {
    level: {
      type: Number
    }
  },
  data(){
    return {
      test:1,
    }
  },
  computed: {
    list(){
      let list = [];
      for(let i in this.widgetData.optional){
        list.push(this.widgetData.optional[i])
      }
      list.sort((a, b) => {
        return a.sort - b.sort;
      })
      return list;
    }
  },
  created(){
  },
  methods: {
    onRadioGroupChange(e){
      this.widgetData.value.key = e.target.value
      this.triggerEventWhenNeed({wUUid: this.widgetData.uuid, value: e.target.value})
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.one-widget {
  &.level-1.has-title > .children-box{
    margin-left: 100px;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .children-box {
    margin-bottom: 24px;
  }
}
.radio-tabs-card {
  background: @background-color-light;
  padding: 12px;
  &.level-2 {
    border:none;
    padding: 0;
  }
}
.a-radio-group {
  display: inline-flex;
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