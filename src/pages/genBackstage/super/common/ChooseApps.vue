<template>
  <a-modal :maskClosable="false" title="添加应用" :visible="visible" @cancel="onCancel" @ok="onOk" :width="1200" :confirmLoading="confirmLoading" okText="保存">
    <a-list class="currentApps beauty-scroll" item-layout="horizontal" :bordered="false" :data-source="list"
      :grid="{ gutter: 16, column: 6 }"
    >
      <div v-if="addonsExtraShowMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px'}">
        <a-spin v-if="addonsExtraLoadingMore" />
        <a-button v-else @click="onLoadaddonsExtraMore">加载更多</a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <apps-item :itemData="item" selectable @click="onClickItem(item)"></apps-item>
      </a-list-item>
    </a-list>
  </a-modal>
</template>
<script>
import {getAdminAddonsIndex, getAdminAddonsEdit} from '@/services/addons'
import AppsItem from '@/pages/genBackstage/common/AppsItem'

export default {
  components: {AppsItem},
  data(){
    return {
      visible: false,
      addonsExtraLoadingMore: false,
      addonsExtraShowMore: true,
      pageData: {
        page: 1,
        page_size: 10
      },
      list: [],
      selectedList: [],
      confirmLoading: false,
      parentSelectedList: {}, // 保存从父组件传过来的应用列表
      operateType: 'changePlatform', // 'changePlatform': 在平台详情中修改附加应用。'choose': 在创建和审核时选择应用（不走接口）
    }
  },
  created(){
    this.getList(this.pageData)
  },
  methods: {
    /**
     * 展示此组件
     * @param [string] operateType。 
     * @param [array] list
     * @param [number] pmid
     */
    show(operateType, list, pmid){
      this.operateType = operateType
      this.visible = true
      this.pmid = pmid
      list.forEach(item=>{
        this.parentSelectedList[item.aid] = item
      })
      this.handleNewDataSelected(this.list)
    },
    onCancel(){
      this.visible = false
      this.clearSelected()
    },
    clearSelected(){
      this.selectedList.forEach(item=>{
        item.selectedIndex = -1
        item.selected = false
      })
      this.selectedList = []
    },
    /**
     * 获取应用列表
     */
    getList(pageData){
      this.addonsExtraLoadingMore = true
      let pageParam = {...this.pageData, ...pageData}
      getAdminAddonsIndex(pageParam).then(res=>{
        if(res.code == 200) {
          this.handleNewDataSelected(res.data.list)
          this.list = this.list.concat(res.data.list)
          this.pageData = pageParam
          if(res.data.pages.currentPage == res.data.pages.lastPage) {
            this.addonsExtraShowMore = false
          }
        }
      }).finally(()=>{
        this.addonsExtraLoadingMore = false
      })
    },
    /**
     * 处理新拉过来的数据的选择状态
     */
    handleNewDataSelected(newDatas){
      newDatas.forEach(item=>{
        if(this.parentSelectedList[item.aid]) {
          this.$set(item, 'selected', true)
          // 记录在被选中数组中的位置
          item.selectedIndex = this.selectedList.length;
          this.selectedList.push(item)
          delete this.parentSelectedList[item.aid]
        } else {
          this.$set(item, 'selected', false)
        }
      })
    },
    onLoadaddonsExtraMore(){
      this.getList({page: this.pageData.page+1})
    },
    onClickItem(item){
      if (item.selected) {
        this.$set(item, 'selected', false)
        this.selectedList.splice(item.selectedIndex,1)
        item.selectedIndex = -1;
      } else {
        this.$set(item, 'selected', true)
        // 记录在被选中数组中的位置
        item.selectedIndex = this.selectedList.length;
        this.selectedList.push(item)
      }
    },
    onOk(){
      if (this.operateType == 'changePlatform') {
        this.confirmLoading = true
        let aid = Array.from(this.selectedList, (item)=>{
          return item.aid
        })
        getAdminAddonsEdit({pmid: this.pmid, aid:JSON.stringify(aid)}).then(res=>{
          if(res.code == 200 ){
            this.$message.success(res.msg)
            let arr = Array.from(this.selectedList,item=>{
              let tmp = JSON.parse(JSON.stringify(item))
              // 去除多余的属性
              delete tmp.selected
              delete tmp.selectedIndex
              return tmp
            })
            this.$emit('ok', arr)
            this.onCancel()
          }
        }).finally(()=>{ this.confirmLoading = false})
      } else if (this.operateType == 'choose') {
        let arr = Array.from(this.selectedList,item=>{
          let tmp = JSON.parse(JSON.stringify(item))
          // 去除多余的属性
          delete tmp.selected
          delete tmp.selectedIndex
          return tmp
        })
        this.$emit('ok', arr)
        this.onCancel()
      }
    }
  }
}
</script>
<style lang="less" scoped>

.currentApps{
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  height: 174px;
}
</style>