<template>
  <a-card class="options-area" size="small" :bodyStyle="bodyStyle">
    <template slot="title">
      <a-space style="padding:2px 0">
        <byf-icon class="options-icon" :type="configAreaData.icon"/>
        <span class="options-title text-overflow-1" :title="configAreaData.title">{{configAreaData.title}}</span>
      </a-space>
    </template>
    <!-- 不用wrapper-col 和 label-col属性，因为这两个属性设置的是百分比宽度，当滚动条显示隐藏时，整体内容都会抖一下。 -->
    <a-form-model class="config-form beauty-scroll">
      <a-collapse class="collapse-box" :bordered="false" v-model="activeKey">
        <template v-for="(item, index) in configAreaData.configBoxs">
          <a-collapse-panel class="attrs-box" v-if="!item.hide" :key="'collapse'+index" :header="item.title">
            <div class="widgets-list">
              <template v-for="(oneWidget) in item.widgets_list">
                <one-widget v-show="!oneWidget.hide" :ref="oneWidget.key" :key="oneWidget.key" :widgetData="oneWidget" :level="1" @></one-widget>
              </template>
            </div>
          </a-collapse-panel>
        </template>
        <a-collapse-panel class="attrs-box" v-if="pageDataManager && configAreaData == pageDataManager" key="collapes-page-components" header="页面组件">
          <page-com-config :pageDataManager="pageDataManager" @changeEditingTarget="refreshActiveKey"></page-com-config>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
  </a-card>
</template>

<script>
import OneWidget from './oneWidget'
import PageComConfig from './pageComConfig'

export default {
  components: {OneWidget, PageComConfig},
  props: {
    configAreaData: {
      type: Object
    },
    pageDataManager: {
      type: Object
    }
  },
  data(){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      bodyStyle: {padding:0, height:'calc(100vh - 48px - 56px)'},
      activeKey: [], // 折叠面板中展开的面板
    }
  },
  created(){
    this.refreshActiveKey(this.configAreaData)
  },
  methods: {
    /**
     * 重置折叠面板的激活key
     */
    refreshActiveKey(configAreaData){
      let arr = []
      for(let x in configAreaData.configBoxs) {
        arr.push('collapse'+x)
      }
      // 编辑页面时，才展示页面组件配置
      if(this.pageDataManager && this.pageDataManager == this.pageDataManager.editingTarget) {
        arr.push('collapes-page-components')
      }
      this.activeKey = arr;
    }
  }
}
</script>

<style lang="less" scoped>
  .options-area {
    width: 540px;
    min-width: 540px;
    height: 100%;
    /deep/ .ant-card-head {
      flex-shrink: 0;
      .ant-card-head-title {

        .options-icon {
          color: @primary-color;
          font-size: 24px;
        }
        .options-title {
          font-size: 18px;
          font-weight: bold;
          max-width: 500px;
          display: block;
        }
      }
    }

    .config-form {
      height: 100%;
      overflow: auto;
      padding: 10px 0;
      .collapse-box {
        background: none;
        .ant-collapse-item {
          border: none;
          /deep/ .ant-collapse-header {
            font-weight: bold;
          }
          /deep/ .ant-collapse-content {
            overflow:visible;
            .ant-collapse-content-box {
              margin: 4px 16px 16px;
              padding: 0;
            }
          }
          &:not(:last-child) {
            /deep/ .ant-collapse-content-box {
              border-bottom: 1px solid @border-color-base;
            }
          }
        }
      }
    }
    
  }

</style>