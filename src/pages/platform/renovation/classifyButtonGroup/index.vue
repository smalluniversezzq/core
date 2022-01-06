<template>
  <div>
    <a-card size="small">
      <a-spin :spinning="spinning" style="width: 100%">
        <muti-level-classify 
          ref="mutiLevelClassify" 
          v-if="!spinning" 
          :list="list"
          @operate="onOperate"></muti-level-classify>
      </a-spin>
    </a-card>
    <FooterToolBar style="padding-left: 276px">
      <byf-space slot="extra">
        <a-button type="primary" @click="add">+ 添加分类</a-button>
        <a-button @click="expandAll">
          <byf-icon v-show="!expand" type="iconxiajiantou"></byf-icon>
          <byf-icon v-show="expand" type="iconxiajiantou-copy"></byf-icon>
          全部{{expand ? '折叠' : '展开'}}
        </a-button>
        <a-button type="primary" :loading="saveLoading" @click="save">保存</a-button>
      </byf-space>
    </FooterToolBar>
  </div>
</template>

<script>
import FooterToolBar from '@/components/tool/FooterToolBar'
import MutiLevelClassify from './mutiLevelClassify/MutiLevelClassify'
import {
  getAdminPlatformDesignCbgIndex, 
  adminPlatformDesignCbgAddOrEdit,
  adminPlatformDesignCbgShowUpdate,
  adminPlatformDesignCbgDel
} from '@/services/admin/platform/design'
export default {
  components: {
    MutiLevelClassify,
    FooterToolBar
  },
  data(){
    return {
      spinning: true,
      list: [],
      expand: true,
      saveLoading: false,
    }
  },
  created(){
    this.getAdminPlatformDesignCbgIndex();
  },
  methods: {
    getAdminPlatformDesignCbgIndex(){
      this.spinning = true;
      getAdminPlatformDesignCbgIndex().then(res => {
        if(res.code == 200){
          this.list = res.data.list;
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    getEmpty(arr){
      let flag = true;
      arr.forEach(item => {
        if(item.title == ''){
          flag = false;
        }
        if(item.subs.length){
          item.subs.forEach(sub => {
            if(!sub.title || !sub.image.url){
              flag = false;
            }
          })
        }
      })
      return flag;
    },
    save(){
      let categoryParams = this.$refs.mutiLevelClassify.getData();
      if(!this.getEmpty(categoryParams)){
        this.$message.error('请填写完整后再提交')
        return;
      }
      this.saveLoading = true;
      adminPlatformDesignCbgAddOrEdit({data: categoryParams}).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg);
        }
      }).finally(() => {
        this.saveLoading = false;
      })
    },
    onOperate(type, indexPath,  classify){
      switch(type){
        case 'toggleShow':
          if(classify.id != ''){
            this.$confirm({
              title: "提示",
              content: "确定切换显示状态吗？",
              okText: "确认",
              cancelText: "取消",
              centered: "",
              onOk: () => {
                return new Promise((resolve, reject) => {
                  adminPlatformDesignCbgShowUpdate({
                    id: classify.id, 
                    op: classify.is_show == 1 ? 0 : 1
                  }).then(res => {
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
          if(classify.id != ''){
            this.$confirm({
              title: "提示",
              content: "确定删除分类/导航按钮吗？",
              okText: "确认",
              cancelText: "取消",
              centered: "",
              onOk: () => {
                return new Promise((resolve, reject) => {
                  adminPlatformDesignCbgDel({
                    id: classify.id, 
                  }).then(res => {
                    resolve();
                    if(res.code == 200){
                      this.$message.success(res.msg);
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
    add(){
      this.$refs.mutiLevelClassify.addLevelOne()
    },
    expandAll(){
      this.expand = this.expand ? false : true;
      this.$refs.mutiLevelClassify.expandAll(this.expand)
    },
  }
}
</script>

<style>

</style>