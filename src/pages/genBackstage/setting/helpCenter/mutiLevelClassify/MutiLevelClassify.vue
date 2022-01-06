<template>
  <a-card class="muti-level-classify-box" :bodyStyle="{padding:0,'padding-left': '24px','padding-right':'24px'}">
    <div class="header">
      <div class="name-column">分类名称</div>
      <div class="img-column">url路径</div>
      <div class="time-column">更新时间</div>
      <div class="status-column">状态</div>
      <div class="operate-column">操作</div>
    </div>
    <div class="main-content">
      <div id="list-box" class="list-box" v-show="realList.length > 0">
        <line-item v-for="(item, index) in realList" :key="'0item'+index" :classifyData="item" :level="0" :indexPath="[index]" @operate="onOperate"></line-item>
      </div>
      <a-empty v-if="realList.length == 0"></a-empty>
    </div>
  </a-card>
</template>

<script>
import LineItem from './LineItem'

import {getOneClassify, IS_SHOW_VALUE} from './common'

import cloneDeep from 'lodash/cloneDeep'
// eslint-disable-next-line
import Sortable from "sortablejs";


export default {
  components: {LineItem},
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      realList: cloneDeep(this.list),
      sortable: undefined,
    }
  },
  created(){
    this.initData(this.realList)
  },
  mounted(){
    this.initSortable()
  },
  methods: {
    /**
     * 初始话数据
     */
    initData(list){
      list.forEach((item, index) => {
        if(!('showChildren' in item)){
          this.$set(item, 'showChildren', true)
        }
        this.$set(item, 'realIndex', index)
        if (item.subs.length > 0) {
          this.initData(item.subs)
        }
      })
    },
    initSortable(){
      this.sortable = new Sortable(document.getElementById('list-box'), {
        animation: 150,
        handle: '.drag-btn',
        onEnd: (e)=>{
          if(e.oldIndex != e.newIndex) {
            // 1:说明 从大到小 。-1：说明从小到大
            let step = e.oldIndex < e.newIndex? -1:1;
            // 更新 数据模板 的realIndex
            for(let i = 0;i<this.realList.length;i++){
              let item = this.realList[i]
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


            // let item1, item2
            // // 找到操作的两个数据
            // for(let i = 0;i<this.realList.length;i++){
            //   let item = this.realList[i]
            //   if(item.realIndex == e.oldIndex) {
            //     item1 = item
            //   } else if(item.realIndex == e.newIndex) {
            //     item2 = item
            //   }
            //   if(item1 && item2) {
            //     break;
            //   }
            // }
            // item1.realIndex = e.newIndex;
            // item2.realIndex = e.oldIndex;



            // this.swapArray(this.realList, e.oldIndex, e.newIndex)
            // this.swapDom('#list-box', '#list-box>div', e.oldIndex, e.newIndex)
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
     * 对外提供
     */
    addLevelOne(){
      let obj = getOneClassify()
      obj.realIndex = this.realList.length;
      this.realList.push(obj)
    },
    onOperate(data){
      this.$emit('operate', data.type, data.indexPath, data.classify)
    },
    /**
     * 对外提供 切换显隐 方法
     * @param [array] indexPath 索引路径
     */
    toggleShow(indexPath){
      let oneList = this.realList
      // 保存 目标分类对象
      let obj = {}
      indexPath.forEach(item => {
        obj = oneList[item]
        oneList = obj.subs
      })

      obj.is_show = obj.is_show == IS_SHOW_VALUE.SHOWING? IS_SHOW_VALUE.HIDING: IS_SHOW_VALUE.SHOWING
    },
    /**
     * 对外提供 设置广告 的方法
     * @param [array] indexPath 索引路径
     * @param [string] ad_img
     * @param [string] ad_url
     */
    setAd(indexPath, ad_img, ad_url){
      let oneList = this.realList
      // 保存 目标分类对象
      let obj = {}
      indexPath.forEach(item => {
        obj = oneList[item]
        oneList = obj.subs
      })
      obj.ad_img = ad_img
      obj.ad_url = ad_url
    },
    /**
     * 对外提供 删除数据
     * @param [array] indexPath 索引路径。
     */
    delete(indexPath){
      let oneList = this.realList
      // 保存 目标分类对象
      let obj = {}
      indexPath.forEach((item, index) => {
        obj = oneList[item]
        if (index == indexPath.length - 1) {
          oneList.splice(item, 1)

          // 删除改项后，更新后面数据 的 realIndex
          for(let i =item;i<oneList.length;i++){
            oneList[i].realIndex--
          }
        } else {
          oneList = obj.subs
        }
      })
    },
    /**
     * 对外提供 获取组件数据
     */
    getData(){
      let list = cloneDeep(this.realList)
      list = this.sortList(list)
      return list
    },
    sortList(list){
      for(let i=0;i<list.length;i++){
        let obj = list[i]
        if(obj.subs.length>0) {
          obj.subs = this.sortList(obj.subs)
        }
      }

      // 重排序
      let arr = cloneDeep(list)
      list = []
      arr.forEach(item => {
        list[item.realIndex] = item
      })
      return list
    },
    /**
     * 对外提供 扩展或折叠
     * @param [boolean] type true:全展开;false:全折叠。
     */
    expandAll(type){
      this.realList.forEach(item => {
        this.expandOne(item, type)
      })
    },
    expandOne(oneClassify, value){
      oneClassify.showChildren = value
      if(oneClassify.subs && oneClassify.subs.length > 0) {
        oneClassify.subs.forEach(item=>{
          this.expandOne(item, value)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './common/style.css';

.muti-level-classify-box {
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    height: 60px;
    .name-column {
      padding-left: 50px;
    }
  }
}
</style>