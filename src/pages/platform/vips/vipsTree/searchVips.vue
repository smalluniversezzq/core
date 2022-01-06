<template>
  <div>
    <a-spin :spinning="spinning">
      <a-tree v-if="treeData.length > 0" class="tree-wrap" 
        :default-expanded-keys="defaultExpandedKeys" 
        :default-selected-keys="defaultSelectedKeys"
        :replaceFields="{children:'children', title: 'is_fans', key: 'uid'}" 
        :load-data="onLoadData"
        :show-line="true"
        :tree-data="treeData">
        <byf-icon slot="switcherIcon" type="iconxiajiantou" class="switcherIcon" />
        <template slot="custom" slot-scope="item">
          <div v-if="item.top_level_list && item.top_level_list.length > 0">
            <a-popover title="上级会员" placement="rightTop">
              <span slot="content">
                <span v-for="(levelItem, index) in item.top_level_list" :key="levelItem.uid">
                  <span v-show="index != 0">--></span>
                  {{levelItem.nickname || '暂无昵称'}}
                </span>
              </span>
              <a-button type="link" style="padding: 0; height: 100%">
                ···>
              </a-button>
            </a-popover>
          </div>
          <vipsItem v-else :item="item"></vipsItem>
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
      <a-empty v-else />
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
      defaultExpandedKeys: [],
      defaultSelectedKeys: [],
      multiple: true,
      is_fans: 0
    }
  },
  created(){},
  methods: {
    fansChange(searchFormData){
      this.is_fans = searchFormData.is_fans;
      this.search(searchFormData);
    },
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
    // 查找最后一项
    getLastItem(arr){
      let node = null;
      let getItem = (arr) => {
        for(let i = 0; i < arr.length; i++){
          let item = arr[i];
          if(item.children && item.children.length > 0){
            getItem(item.children);
          }else{
            node = item;
          }
        }
      }
      getItem(arr)
      return node;
    },
    // 列表中添加加载更多按钮
    addLoadMoreBtn(list, parent_id, pagination){
      // 不是最后一页 并且没有加载更多按钮 添加按钮
      if(list.length == this.pagination.pageSize && !this.hasLoadBtn(list)){
        list.push(this.loadingBtnObj(parent_id, pagination))
      }
    },
    // 列表中删除最后一项加载更多按钮
    delLoadMoreBtn(list){
      // 没有才执行删除
      if(this.hasLoadBtn(list)){
        list.pop();
      }
    },
    // 点击加载更多按钮
    loadMore(item){
      // 按钮节点item
      let data = item.dataRef;
      data.pagination.current += 1;
      // 父级节点
      let parentItem = this.getItemOfKey(data.parent_id);
      let pagination = cloneDeep(data.pagination);

      data.title = '加载中...';
      data.btnLoading = true;
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
    },
    search(searchFormData){
      this.spinning = true;
      this.treeData = [];
      let parent_id = 0;
      getUserRelationList({
        page_size: this.pagination.pageSize, 
        page: this.pagination.current, 
        parent_id: parent_id, 
        is_fans: searchFormData.is_fans,
        keyword: searchFormData.keyword
      }).then(res => {
        if(res.code == 200){
          let currentList = res.data.list;
          this.initTreeData(currentList, parent_id);
          let lastItem = this.getLastItem(currentList);
          this.defaultExpandedKeys = [lastItem.parent_id];
          this.defaultSelectedKeys = [lastItem.uid];
          this.treeData = currentList;

        }
      }).finally(() => {
        this.spinning = false;
      })
    }
  }
}
</script>

<style scoped lang="less">
.tree-wrap{
  .vips-item{
    .tags-status{
      &.disabled{
        color: rgba(0,0,0,.25);
        background-color: #f5f5f5;
      }
    }
  }
}
</style>