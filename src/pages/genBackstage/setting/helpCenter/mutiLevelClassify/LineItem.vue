<template>
  <div class="line" :class="'level-'+level">
    <div class="line-info">
      <div class="name-column">
        <byf-icon class="drag-btn" type="iconsan"></byf-icon>
        <div class="corner" v-if="level > 0"></div>
        <byf-icon class="arrow-icon" v-if="level < 2" :class="{show: classifyData.subs.length > 0, 'show-children': classifyData.showChildren}" type="iconaaaziyuan" 
          @click="toggleShowChildren"
        ></byf-icon>
        <div class="level">{{['一','二','三'][level]+'级'}}</div>
        <a-input class="name-input" placeholder="请输入分类名" :value="classifyData.title" @change="(e)=>(onInputChange(e, 'title'))">
          <span slot="suffix">{{classifyData.title.length}}/10</span>
        </a-input>
        <a-button v-if="level < 2" type="link" @click="addChild">+添加{{['二','三'][level]}}级分类</a-button>
        <byf-icon class="ad-icon" v-if="classifyData.ad_img || classifyData.ad_url" type="iconguanggao"></byf-icon>
      </div>
      <div class="img-column">
        <a-input class="name-input" placeholder="URL路径，不输入默认使用数据ID，URL不能重复" :value="classifyData.alias" @change="(e)=>(onInputChange(e, 'alias'))">
        </a-input>
      </div>
      <div class="time-column">{{getTime(classifyData.updated_at)}}</div>
      <div class="status-column">
        <a-switch :checked="!!classifyData.is_show" 
                checked-children="ON" 
                un-checked-children="OFF" 
                @click="onSwitchStatus(classifyData)" />
      </div>
      <div class="operate-column">
        <a-button type="link" size="small" @click="onOperate('delete')">删除</a-button>
      </div>
    </div>
    <div :id="'box'+indexPath.join('')" class="children-box" v-show="classifyData.showChildren && classifyData.subs.length > 0">
      <line-item v-for="(item, index) in classifyData.subs" :key="(level+1)+'item'+index" :classifyData="item" :level="level+1" :indexPath="[...indexPath, index]" @operate="onChildOperate"></line-item>
    </div>
  </div>
</template>

<script>
import {getOneClassify, IS_SHOW_VALUE} from './common'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'
import Sortable from "sortablejs";

export default {
  name: 'LineItem',
  props: {
    /**
     * 一条分类数据
     */
    classifyData: {
      type: Object,
      required: true
    },
    /**
     * 索引路径数组
     */
    indexPath: {
      type: Array,
      required: true
    },
    /**
     * 层级
     */
    level: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      realClassifyData: cloneDeep(this.classifyData),
      IS_SHOW_VALUE,
      sortable: undefined,
    }
  },
  mounted(){
    this.initSortable()
  },
  methods: {
    onSwitchStatus(){
      this.onOperate('toggleShow');
    },
    initSortable(){
      this.sortable = new Sortable(document.getElementById('box'+this.indexPath.join('')), {
        animation: 150,
        handle: '.drag-btn',
        onEnd: (e)=>{
          if(e.oldIndex != e.newIndex) {
            // 更新 数据模板 的realIndex
            // 1:说明 从大到小 。-1：说明从小到大
            let step = e.oldIndex < e.newIndex? -1:1;
            // 更新 数据模板 的realIndex
            for(let i = 0;i<this.classifyData.subs.length;i++){
              let item = this.classifyData.subs[i]
              if(item.realIndex == e.oldIndex) {
                item.realIndex = e.newIndex
              } else {
                if(step == 1){
                  if(item.realIndex < e.oldIndex && item.realIndex >=e.newIndex) {
                    item.realIndex += step
                  }
                } else if(step == -1){
                  if(item.realIndex > e.oldIndex && item.realIndex <=e.newIndex) {
                    item.realIndex += step
                  }
                }
              }

            }

            // this.swapArray(this.classifyData.subs, e.oldIndex, e.newIndex)
            // this.swapDom('#'+'box'+this.indexPath.join(''), '#'+'box'+this.indexPath.join('')+'>div', e.oldIndex, e.newIndex)
          }
        }
      })
    },
    /**
    * 数组元素交换位置
    * @param {array} arr 数组
    * @param {number} index1 添加项目的位置
    * @param {number} index2 删除项目的位置
    * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
    */
    swapArray(arr, index1, index2){
      // 交换数据的位置
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      
    },
    swapDom(parentSelector, childrenSelector, p1, p2){
      let minIndex, maxIndex
      minIndex = p1 < p2? p1: p2
      maxIndex = p1 < p2? p2: p1
      
      let parent = document.querySelector(parentSelector)
      let children = document.querySelectorAll(childrenSelector)
      // eslint-disable-next-line
      let clength = children.length;
      if(maxIndex >= clength) {
        console.warn('交换位置数据 异常，超出范围')
        return 
      }
      let tmp = children[minIndex]
      parent.removeChild(tmp)
      parent.insertBefore(tmp, children[maxIndex])
      
      children = document.querySelectorAll(childrenSelector)
      tmp = children[maxIndex]
      parent.insertBefore(tmp, children[minIndex])
    },
    /**
     * 添加二级分类
     */
    addChild(){
      if(this.classifyData.article_number > 0){
        this.$message.error('当前分类下有文章，不可添加下级分类')
        return;
      }
      let newClassify = getOneClassify()
      newClassify.realIndex = this.classifyData.subs.length
      this.classifyData.subs.push(newClassify)

      // 添加子项 时 展开
      this.classifyData.showChildren = true
    },
    /**
     * 点击操作按钮
     * @param [string] type 操作类型.toggleShow:切换显隐；setAd：设置广告；delete：删除
     */
    onOperate(type){
      this.$emit('operate', {type, indexPath: this.indexPath, classify: cloneDeep(this.classifyData)})
    },
    onChildOperate(data){
      this.$emit('operate', data)
    },
    /**
     * 选择图片 变化事件
     */
    onImgChange(list){
      this.classifyData.image = list[0]
    },
    getTime(time){
      if(!time) {
        return "-";
      } else {
        return moment.unix(time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    toggleShowChildren(){
      this.classifyData.showChildren = !this.classifyData.showChildren
    },
    onInputChange(e, key){
      let value = e.target.value
      if(key == 'title'){
        if (value.length > 10)  value = value.slice(0,10)
      }
      this.classifyData[key] = value
      // 这里要强制刷新视图的值。因为vue 只有当检测到input的value绑定的属性的值有变化时，才会更新视图
      e.target.value = value
    }
  },
  beforeDestroy(){
    // 销毁sortable
    this.sortable.destroy()
  }

}
</script>

<style lang="less" scoped>
@import './common/style.css';

.level-0 {
  background: #F4F6F8;
  border: solid 1px @border-color-split;
  margin-bottom: 10px;
  border-radius: @border-radius-base;
}
.level-1 {
  background: #FAFDFF;
  .line-info {
    .corner {
      margin-left: 60px;
    }
  }
}
.level-2 {
  background: #FFFDF9;
  .line-info {
    .corner {
      margin-left: 120px;
    }
  }
}
.line {
  .line-info {
    height: 70px;
    display: flex;
    align-items: center;
    .name-column {
      display: flex;
      align-items: center;
      .drag-btn {
        margin: 0 10px;
        padding: 0 10px;
        font-size: 10px;
        cursor: grab;
      }
      .corner {
        border-left: 1px solid @border-color-base;
        border-bottom: 1px solid @border-color-base;
        width: 20px;
        height: 20px;
        margin-right: 15px;
        position: relative;
      }
      .arrow-icon {
        color: @text-color-secondary;
        font-size: 10px;
        opacity: 0;
        transition: transform .3s;
        &.show {
          opacity: 1;
          cursor: pointer;
          &.show-children {
            transform: rotate(90deg);
          }
        }
        &:hover {
          color: @icon-color-hover;
        }
      }
      .level {
        padding: 0 10px;
      }
      .name-input {
        width: 200px;
        /deep/  input {
          padding-right: 10px;
        }
        /deep/ .ant-input-suffix {
          color: #b8b9bd;
          font-size: 12px;
          right: 5px;
        }
      }
      .ad-icon {
        font-size: 30px;
      }
    }
  }
}
</style>