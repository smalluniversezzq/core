<template>
  <div>
    <a-spin :spinning="spinning" style="width: 100%; min-height: 50px">
      <a-tree v-if="treeData.length > 0" class="tree-wrap" 
        :load-data="onLoadData"
        :show-line="true"
        :tree-data="treeData"
        :replaceFields="{children:'children', title: 'is_fans', key: 'uid'}">
        <byf-icon slot="switcherIcon" type="iconxiajiantou" class="switcherIcon" />
        <template slot="custom" slot-scope="item">
          <vipsItem :item="item"></vipsItem>
        </template>
        <template slot="operate" slot-scope="item">
          <a-button 
            type="link" 
            size="small" 
            :disabled="item.finished"
            :loading="item.btnLoading" 
            @click="loadMore(item)">
            {{item.title}}
          </a-button>
        </template>
      </a-tree>
      <a-empty  v-show="treeData.length == 0" />
    </a-spin>
  </div>
</template>

<script>
import { getUserRelationList } from '@/services/admin/user/userRelation'
import vipsItem from './common/vipsItem'
import mixin from './mixin'
import { cloneDeep } from 'lodash'
export default {
  mixins: [mixin],
  components: {
    vipsItem
  },
  data(){
    return {
      spinning: false,
      treeData: [],
    }
  },
  created(){
    this.spinning = true;
    this.initGetUserRelationList(this.pagination);
  },
  methods: {
    fansChange(is_fans){
      this.is_fans = is_fans;
      this.pagination.current = 1;
      this.treeData = [];
      this.spinning = true;
      this.initGetUserRelationList(this.pagination);
    },
    // 初始化树数据请求
    initGetUserRelationList(pageData){
      getUserRelationList({
        page_size: pageData.pageSize, 
        page: pageData.current, 
        parent_id: 0, 
        is_fans: this.is_fans,
      }).then(res => {
        if(res.code == 200){
          let currentList = res.data.list;
          this.initTreeData(currentList)
          this.addLoadMoreBtn(currentList, 0, cloneDeep(pageData))
          this.treeData = [...currentList];
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    // 
    initTreeData(arr){
      arr.forEach((item) => {
        // 如果不存在插槽配置，添加
        if(!item.scopedSlots){
          this.$set(item, 'scopedSlots', {title: 'custom'})
        }
        if(item.children && item.children.length > 0){
          this.initTreeData(item.children)
        }
      })
    },
    // 根据uid在数组中找到某一项 arr不传则在treeData中查找
    getItemOfKey(uid, arr = this.treeData){
      let node;
      let getItem = (arr) => {
        for(let i = 0; i < arr.length; i++){
          let item = arr[i];
          if(item.uid == uid){
            node = item;
            break;
          }else{
            if(item.children && item.children.length > 0){
              getItem(item.children);
            }
          }
        }
      }
      getItem(arr)
      return node;
    },
    // 列表中添加加载更多按钮
    addLoadMoreBtn(list, parent_id, pagination){
      // 不是最后一页 并且没有加载更多按钮 添加按钮
      if(list.length >= this.pagination.pageSize && !this.hasLoadBtn(list)){
        list.push(this.loadingBtnObj(parent_id, pagination))
      }
    },
    // 列表中删除最后一项加载更多按钮
    delLoadMoreBtn(list){
      // 有按钮才执行删除
      if(this.hasLoadBtn(list)){
        list.pop();
      }
    },
    // 点击加载更多按钮
    loadMore(item){
      // 按钮节点item
      let data = item.dataRef;
      item.dataRef.title = '加载中...';
      item.dataRef.btnLoading = true;
      item.dataRef.pagination.current += 1;
      // 父级节点
      let parentItem = null;
      if(data.parent_id != 0){
        parentItem = this.getItemOfKey(data.parent_id)
      }
      let pagination = cloneDeep(data.pagination);
      getUserRelationList({
        page_size: data.pagination.pageSize, 
        page: data.pagination.current, 
        parent_id: data.parent_id, 
        is_fans: this.is_fans,
      }).then(res => {
        if(res.code == 200){
          let currentList = res.data.list;
          if(currentList.length > 0){
            this.initTreeData(currentList);
          }
          // 请求成功后先删除按钮，后添加数据再次添加加载更多按钮；
          if(parentItem){
            this.delLoadMoreBtn(parentItem.children);
          }else{
            this.delLoadMoreBtn(this.treeData);
          }
          // 未加载完毕 按钮重新添加到末尾 加载完毕则不需要加载按钮，不再添加
          if(parentItem){
            this.addLoadMoreBtn(currentList, parentItem.uid, cloneDeep(pagination))
          }else{
            this.addLoadMoreBtn(currentList, 0, cloneDeep(pagination))
          }
          currentList.forEach(item => {
            if(parentItem){
              parentItem.children.push(item);
            }else{
              this.treeData.push(item);
            }
          })
          this.treeData = [...this.treeData]
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    // 展开时的加载
    onLoadData(treeNode){
      let dataRef = treeNode.dataRef;
      return new Promise((resolve, reject) => {
        if (dataRef.children && dataRef.children.length > 0) {
          resolve();
          return;
        }
        getUserRelationList({
          page_size: this.pagination.pageSize, 
          page: this.pagination.current, 
          parent_id: dataRef.uid,
          is_fans: this.is_fans,
        }).then(res => {
          if(res.code == 200){
            let currentList = res.data.list;
            if(currentList.length > 0){
              this.initTreeData(currentList)
              this.addLoadMoreBtn(currentList, dataRef.uid, cloneDeep(this.pagination))
              this.$set(dataRef, 'children', currentList);
            }
          }
          resolve();
        }).catch(() => {
          reject()
        }).finally(() => {
          this.spinning = false;
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>