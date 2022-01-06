<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div class="diy-magic-cube">
        <div class="radio-select">
          <a-radio-group class="a-radio-group" :value="widgetData.selectedKey" @change="onRadioGroupChange">
            <div class="one-radio-btn" v-for="(item, index) in widgetData.optional" :key="index">
              <a-radio-button class="a-radio-button" :value="item.key" :style="{marginRight: widgetData.gap+'px'}">
                <div class="radio-item-box">
                  <byf-icon class="icon" :type="item.key == widgetData.selectedKey?item.active_icon:item.icon"></byf-icon>
                </div>
              </a-radio-button>
              <span>{{item.title}}</span>
            </div>
          </a-radio-group>
        </div>
        <div class="layouts-box">
          <div class="layout-1" v-if="widgetData.selectedKey == 1">
            <layout-item :class="{active: selectedIndex==0}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[0].image.url" tips="图1" @click="onLayoutItemClick(0)" />
          </div>
          <div class="layout-2" v-else-if="widgetData.selectedKey == 2">
            <layout-item :class="{active: selectedIndex==0}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[0].image.url" tips="图1" @click="onLayoutItemClick(0)" />
            <layout-item :class="{active: selectedIndex==1}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[1].image.url" tips="图2" @click="onLayoutItemClick(1)" />
          </div>
          <div class="layout-3" v-else-if="widgetData.selectedKey == 3">
            <layout-item :class="{active: selectedIndex==0}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[0].image.url" tips="图1" @click="onLayoutItemClick(0)" />
            <layout-item :class="{active: selectedIndex==1}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[1].image.url" tips="图2" @click="onLayoutItemClick(1)" />
            <layout-item :class="{active: selectedIndex==2}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[2].image.url" tips="图3" @click="onLayoutItemClick(2)" />
          </div>
          <div class="layout-4" v-else-if="widgetData.selectedKey == 4">
            <layout-item class="item-0" :class="{active: selectedIndex==0}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[0].image.url" tips="图1" @click="onLayoutItemClick(0)" />
            <div class="right">
              <layout-item :class="{active: selectedIndex==1}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[1].image.url" tips="图2" @click="onLayoutItemClick(1)" />
              <layout-item :class="{active: selectedIndex==2}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[2].image.url" tips="图3" @click="onLayoutItemClick(2)" />
            </div>
          </div>
          <div class="layout-5" v-else-if="widgetData.selectedKey == 5">
            <layout-item class="item-0" :class="{active: selectedIndex==0}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[0].image.url" tips="图1" @click="onLayoutItemClick(0)" />
            <div class="bottom">
              <layout-item :class="{active: selectedIndex==1}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[1].image.url" tips="图2" @click="onLayoutItemClick(1)" />
              <layout-item :class="{active: selectedIndex==2}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[2].image.url" tips="图3" @click="onLayoutItemClick(2)" />
            </div>
          </div>
          <div class="layout-6" v-else-if="widgetData.selectedKey == 6">
            <layout-item class="item-0" :class="{active: selectedIndex==0}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[0].image.url" tips="图1" @click="onLayoutItemClick(0)" />
            <div class="right">
              <layout-item class="item-1" :class="{active: selectedIndex==1}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[1].image.url" tips="图2" @click="onLayoutItemClick(1)" />
              <div class="bottom">
                <layout-item :class="{active: selectedIndex==2}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[2].image.url" tips="图3" @click="onLayoutItemClick(2)" />
                <layout-item :class="{active: selectedIndex==3}" :imgUrl="widgetData.optional[widgetData.selectedKey].imgLinks[3].image.url" tips="图4" @click="onLayoutItemClick(3)" />
              </div>
            </div>
          </div>
        </div>
        <a-card size="small" class="a-card">
          <diy-img-link-selector class="diy-img-link-selector" :widgetData="getOperatingImgLink()" :level="level+1"></diy-img-link-selector>
        </a-card>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from '../common/widgetMixin'
import DiyImgLinkSelector from '@/components/byf/renovation/pageDiy/views/configArea/widgets/DiyImgLinkSelector'
import layoutItem from '@/components/byf/renovation/pageDiy/views/configArea/widgets/DiyMagicCube/layoutItem'
export default {
  name: 'DiyMagicCube',
  components: {DiyImgLinkSelector, layoutItem},
  mixins: [WidgetMixin],
  data(){
    return {
      selectedIndex: 0
    }
  },
  created(){
  },
  methods: {
    /**
     * 获取正在操作的图片链接选择控件
     */
    getOperatingImgLink(){
      return this.widgetData.optional[this.widgetData.selectedKey].imgLinks[this.selectedIndex]
    },
    onRadioGroupChange(e){
      // 切换布局时，重置为 操作 第一个图片链接选择控件
      this.selectedIndex = 0
      this.widgetData.selectedKey = e.target.value
    },
    onLayoutItemClick(index){
      this.selectedIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.one-widget {
  &.level-2:last-child {
    .ant-form-item {
      margin-bottom: 0;
    }
  }
  .ant-form-item {
    display: flex;
    /deep/ .ant-form-item-label {
      flex-shrink: 0;
      > label::after {
        content:'';
        display: none;
      }
    }
    /deep/ .ant-form-item-control-wrapper {
      flex-grow: 1;
    }
    .form-item-label.level-1 {
      width: 100px;
      padding-right: 10px;
    }
    .form-item-label.level-2 {
      width: 80px;
      padding-right: 10px;
    }
  }
}
.a-radio-group {
  display: flex;
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
.layouts-box {
  width: 360px;
  margin: 10px 0;
  line-height: normal;
  text-align: center;
  .layout-1 {
    width: 100%;
    height: 360px;
    .layout-item {
      height: 100%;
    }
  }
  .layout-2 {
    width: 100%;
    display: flex;
    .layout-item {
      width: 180px;
      height: 180px;
    }
  }
  .layout-3 {
    width: 100%;
    display: flex;
    .layout-item {
      width: 120px;
      height: 120px;
    }
  }
  .layout-4 {
    width: 100%;
    display: flex;
    .item-0 {
      width: 180px;
      height: 360px;
    }
    .right {
      .layout-item {
        width: 180px;
        height: 180px;
      }
    }
  }
  .layout-5 {
    width: 100%;
    .item-0 {
      width: 360px;
      height: 180px;
    }
    .bottom {
      display: flex;
      .layout-item {
        width: 180px;
        height: 180px;
      }
    }
  }
  .layout-6 {
    width: 100%;
    display: flex;
    .item-0 {
      width: 180px;
      height: 360px;
    }
    .right {
      .item-1 {
        width: 180px;
        height: 180px;
      }
      .bottom {
        display: flex;
        .layout-item {
          width: 90px;
          height: 180px;
        }
      }
    }
  }
}
.a-card {
  background-color: @background-color-light;
  .diy-img-link-selector {
    /deep/ .img-list li {
      background: white;
    }
  }
}
</style>