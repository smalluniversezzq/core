<template>
  <div class="one-widget" :class="'level-'+level">
    <a-form-model-item class="ant-form-item">
      <template slot="label">
        <div class="form-item-label" v-if="widgetData.title" :class="'level-'+level">{{widgetData.title}}：</div>
      </template>
      <div class="diy-goods-selector">
        <div class="head">
          <div class="head-item">商品</div>
          <!-- <div class="head-item">价格</div> -->
          <div class="head-item">操作</div>
        </div>
        <div class="sortable-list" ref="sortableList">
          <div class="sortable-item" :class="'level-'+level" v-for="(item, index) in widgetData.list" :key="item.sortId">
            <byf-icon type="iconsan" class="drag-icon"></byf-icon>
            <div class="sortable-content">
              商品名：{{item.goods.name}}
            </div>
            <div class="operate-box">
              <!-- <a-button size="small" type="link" @click="addOne">替换</a-button> -->
              <a-button size="small" type="link" @click="deleteMe(index)">删除</a-button>
            </div>
          </div>
        </div>
        <a-button class="add-btn" type="link" block :disabled="widgetData.list.length==widgetData.max" @click="addOne">{{btnText()}}</a-button>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import WidgetMixin from './common/widgetMixin'
import Sortable from "sortablejs";
export default {
  name: 'DiyGoodsSelector',
  mixins: [WidgetMixin],
  props: {
    level: {
      type: Number
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
          this.widgetData.swapTwo(e.oldIndex, e.newIndex)
        }
      })
    },
    addOne(){
      let links = Array.from(this.widgetData.list, item=>{
        return item.goods
      })
       this.$byfLinkSelector({multiple:true, selectors:[2], links}).then(res => {
        if(res.action == 'confirm'){
          // 确认
          this.widgetData.clearAllItem()
          res.links.forEach(item=>{
            this.widgetData.addOneSortItem(item)
          })
        }
      })
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
.diy-goods-selector {
  background: white;
  border: 1px solid @border-color-split;
  .head {
    display: flex;
    align-items: center;
    line-height: 43px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid @border-color-split;
    .head-item {
      line-height: 43px;
      &:nth-child(1) {
        flex-grow: 1;
        margin-left: 10px;
      }
      &:nth-child(2), &:nth-child(3) {
        width: 88px;
        text-align: center;
      }
    }
  }
  .sortable-list {
    border-bottom: 1px solid  @border-color-split;
    .sortable-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 10px 0;
      margin-bottom: 10px;
      overflow: hidden;
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
      .sortable-content {
        flex: 1;
        height: 40px;
      }
      .operate-box {
        width: 88px;
        text-align: center;
        button {
          font-size: 12px;
          padding: 0 5px;
        }
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
    }
  }
}
</style>