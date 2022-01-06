<template>
  <div>
    <byf-space direction="vertical">
      <a-alert message="注意：添加下级分类时，需保证该分类下没有文章" banner />
      <a-spin :spinning="spinning">
        <div style="min-height: 150px">
          <muti-level-classify v-if="!spinning" ref="mutiLevelClassify" :list="list" @operate="onOperate"></muti-level-classify>
        </div>
      </a-spin>
    </byf-space>
     <FooterToolBar style="padding-left: 178px">
        <byf-space slot="extra">
          <a-button type="primary" @click="add">+ 添加一级分类</a-button>
          <a-button @click="expandAll">
            <byf-icon v-show="!expand" type="iconxiajiantou"></byf-icon>
            <byf-icon v-show="expand" type="iconxiajiantou-copy"></byf-icon>
            全部{{expand ? '折叠' : '展开'}}
          </a-button>
          <a-button type="primary" :loading="saveLoading" @click="assistCategoryAddOrEdit">保存分类</a-button>
        </byf-space>
      </FooterToolBar>
    
  </div>
</template>

<script>
import MutiLevelClassify from '@/pages/genBackstage/setting/helpCenter/mutiLevelClassify/MutiLevelClassify'
import FooterToolBar from '@/components/tool/FooterToolBar'
import { 
  getAssistCategoryIndex, 
  assistCategoryAddOrEdit, 
  assistCategoryDisplay, 
  assistCategoryDel 
} from "@/services/admin/core/assistCategory";
export default {
  components: {
    MutiLevelClassify,
    FooterToolBar
  },
  data(){
    return {
      spinning: false,
      list: [],
      expand: true,
      saveLoading: false,
      categoryParams: []
    }
  },
  created(){
    this.getAssistCategoryIndex();
  },
  methods: {
    getAssistCategoryIndex(){
      this.spinning = true;
      getAssistCategoryIndex().then(res => {
        if(res.code == 200){
          this.list = res.data.list;
          if(this.categoryParams.length){
            this.spinning = true;
            this.getPaths(this.list, []);
            this.spinning = false;
          }
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    getPaths(arr, path = []){
      let paths;
      for(let i = 0;  i < arr.length; i++){
        let item = arr[i];
        if(item.subs.length){
          paths = this.getPaths(item.subs, [...path, i])
        }else{
          paths = [...path, i];
          this.setChildrenShow(paths)
        }
      }
      return paths;
    },
    setChildrenShow(paths){
      let item, categoryItem;
      for(let i = 0; i < paths.length; i++){
        let key = paths[i];
        if(item){
          item = item.subs[key];
          categoryItem = categoryItem.subs[key];
        }else{
          item = this.list[key];
          categoryItem = this.categoryParams[key];
        }
        if('showChildren' in categoryItem){
          this.$set(item, 'showChildren', categoryItem.showChildren)
        }
      }
    },
    assistCategoryAddOrEdit(){
      this.categoryParams = this.$refs.mutiLevelClassify.getData();
      if(this.categoryParams.length == 0){
        this.$message.error('暂无分类')
        return;
      }
      this.saveLoading = true;
      assistCategoryAddOrEdit({categoryParams: this.categoryParams}).then(res => {
        if(res.code == 200){
          this.getAssistCategoryIndex();
          this.$message.success(res.msg);
        }
      }).finally(() => {
        this.saveLoading = false;
      })
    },
    add(){
      this.$refs.mutiLevelClassify.addLevelOne()
    },
    /**
     * 操作按钮被点击
     * @param [string] type 操作类型
     * @param [array] indexPath 索引路径数组
     * @param [object] classify 一条分类数据
     */
    onOperate(type, indexPath, classify){
      switch(type){
        case 'toggleShow':
          // 请求切换状态接口
          // 请求接口 完成
          if(classify.id != ''){
            this.$confirm({
              title: "提示",
              content: "确定切换显示状态吗？会影响其子分类状态",
              okText: "确认",
              cancelText: "取消",
              centered: "",
              onOk: () => {
                return new Promise((resolve, reject) => {
                  assistCategoryDisplay({id: classify.id, is_show: classify.is_show == 1 ? 0 : 1}).then(res => {
                    resolve();
                    if(res.code == 200){
                      this.$message.success(res.msg);
                      this.$refs.mutiLevelClassify.toggleShow(indexPath)
                    }
                  }).catch(err => {
                    console.log(err);
                    reject();
                  });
                })
              },
              onCancel() {}
            });
          }else{
            this.$refs.mutiLevelClassify.toggleShow(indexPath)
          }
          // this.$refs.mutiLevelClassify.toggleShow(indexPath)
          break;
        case 'delete':
          // 请求删除接口 开始
          if(classify.id != ''){
            this.$confirm({
              title: "提示",
              content: "确定删除此分类吗？会同时删除子分类",
              okText: "确认",
              cancelText: "取消",
              centered: "",
              onOk: () => {
                return new Promise((resolve, reject) => {
                  assistCategoryDel({ids: [classify.id]}).then(res => {
                    resolve();
                    if(res.code == 200){
                      this.$message.success(res.msg);
                      // 请求删除接口 完成
                      this.$refs.mutiLevelClassify.delete(indexPath)
                    }
                  }).catch(err => {
                    console.log(err);
                    reject();
                  });
                })
              },
              onCancel() {}
            });
          }else{
            this.$refs.mutiLevelClassify.delete(indexPath)
          }
          break;
      }
    },
    expandAll(){
      this.expand = this.expand ? false : true;
      this.$refs.mutiLevelClassify.expandAll(this.expand)
    }
  },
}
</script>

<style>

</style>