<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div class="diy-sortable-box">
        <div class="sortable-list" ref="sortableList">
          <div class="sortable-item" :class="'level-'+level" v-for="(item, index) in widgetData.list" :key="item.sortId">
            <byf-icon type="iconsan" class="drag-icon"></byf-icon>
            <div class="sortable-content">
              <template v-for="(widgetItem) in item.widgets">
                <one-widget v-show="!widgetItem.hide" :key="widgetItem.key" :level="level+1" :widgetData="widgetItem" v-bind="$attrs"></one-widget>
              </template>
            </div>
            <byf-icon v-if="widgetData.list.length > widgetData.min" class="close" type="iconclose" @click="deleteMe(index)" />
          </div>
        </div>
        <a-button class="add-btn" block :disabled="widgetData.list.length==widgetData.max" @click="addOne">{{btnText()}}</a-button>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'

import Sortable from "sortablejs";
const OneWidget = ()=>import('@/components/byf/renovation/pageDiy/views/configArea/oneWidget')

export default {
  name: 'DiySortable',
  components: {OneWidget},
  mixins: [WidgetMixin],
  props: {
    level: {
      type: Number
    }
  },
  data(){
    return {
      sortable: null
    }
  },
  mounted(){
    this.initSortable()
  },
  methods: {
    initSortable(){
      this.sortable = new Sortable(this.$refs.sortableList, {
        animation: 150,
        handle: '.drag-icon',
        onEnd: (e)=>{
          // console.log('e: ', e)
          // console.log('oldIndex: ', e.oldIndex)
          // console.log('newIndex: ', e.newIndex)

          this.widgetData.swapTwo(e.oldIndex, e.newIndex)
        }
      })
    },
    addOne(){
      this.widgetData.addOneSortItem()
    },
    deleteMe(index){
      this.widgetData.deleteOneItem(index)
    },
    btnText(){
      if(this.widgetData.max) {
        return `+${this.widgetData.btnText}(${this.widgetData.list.length}/${this.widgetData.max})`
      } else {
        return `+${this.widgetData.btnText}`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';
.diy-sortable-box {
  .sortable-item {
    position: relative;
    display: flex;
    align-items: center;
    background: @background-color-light;
    padding: 10px 0;
    margin-bottom: 10px;
    &:hover {
      .close {
        display: block;
      }
    }
    .drag-icon {
      font-size: 12px;
      margin: 0 12px;
      cursor: grab;
    }
    .close {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 20px;
      cursor: pointer;
      color: #b8b9bd;
      display: none;
    }
    .sortable-content {
      max-width: calc(100% - 46px);
    }
  }
}
</style>