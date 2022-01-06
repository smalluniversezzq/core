<template>
  <div>
    <byf-space direction="vertical">
      <a-card size="small">
        <a-form-model
          ref="searchForm"
          :model="searchVipsFormData"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row :gutter="48">
            <a-col :sm="8" :xxl="6">
              <a-form-model-item
                label="搜索用户"
                prop="keyword"
              >
                <a-input v-model="searchVipsFormData.keyword" placeholder="请输入完整的手机号/会员ID" ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :sm="8" :xxl="6">
              <a-form-model-item>
                <a-space>
                  <a-button type="primary" @click="search">搜索</a-button>
                  <a-button type="link" size="small" @click="resetSearch">重置</a-button>
                  <a-checkbox v-if="activedKey == '1'" :checked="!!searchFormData.is_fans" @change="showFansOnChange">
                    同时显示锁粉用户
                  </a-checkbox>
                  <a-checkbox v-if="activedKey == '2'" :checked="!!searchVipsFormData.is_fans" @change="showFansOnChange">
                    同时显示锁粉用户
                  </a-checkbox>
                </a-space>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <a-card size="small">
        <a-tabs v-model="activedKey" @change="tabsChange">
          <a-tab-pane key="1" tab="会员关系树">
            <div class="tree-wrap beauty-scroll">
              <treeVips ref="treeVips"></treeVips>
            </div>
          </a-tab-pane>
          <a-tab-pane v-if="hasSearch" key="2" tab="搜索结果" force-render>
            <div class="tree-wrap beauty-scroll">
              <searchVips ref="searchVips"></searchVips>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </byf-space>
  </div>
</template>

<script>
import searchVips from './searchVips';
import treeVips from './treeVips';
const defaultSearchFormData = {
  keyword: '',
  is_fans: 0
}
export default {
  components: {
    searchVips,
    treeVips
  },
  data(){
    return {
      activedKey: '1',
      hasSearch: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
      searchVipsFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
      treeData: [
        {
          key: '0',
          title: '测试',
          scopedSlots: {title: 'custom'},
          pagination: {
            current: 1,
            pageSize: 20,
          },
          current: 1,
          pageSize: 20,
          children: [
            {
              key: '1',
              title: '测试',
              scopedSlots: {title: 'custom'},
              children: [
                {
                  key: '2',
                  title: '测试',
                  scopedSlots: {title: 'custom'},
                  children: []
                }
              ]
            },
          ]
        },
        {
          key: '3',
          title: '测试',
          scopedSlots: {title: 'custom'},
          children: [
            {
              key: '4',
              title: '测试',
              scopedSlots: {title: 'custom'},
              children: [
                {
                  key: '5',
                  title: '测试',
                  scopedSlots: {title: 'custom'},
                  children: []
                }
              ]
            }
          ]
        },
      ],
    }
  },
  created(){
   
  },
  methods: {
    showFansOnChange(e){
      let checked = e.target.checked;
      if(this.activedKey == '1'){
        this.searchFormData.is_fans = checked ? 1 : 0;
        this.$refs.treeVips.fansChange(this.searchFormData.is_fans);
      }
      if(this.activedKey == '2'){
        this.searchVipsFormData.is_fans = checked ? 1 : 0;
        this.$refs.searchVips.fansChange(this.searchVipsFormData);
      }
    },
    tabsChange(){

    },
    // 条件搜索
    search() {
      if(this.searchVipsFormData.keyword == ''){
        this.$message.error('请输入搜索内容');
        return;
      }
      this.hasSearch = true;
      this.activedKey = '2'
      this.$nextTick(() => {
        this.$refs.searchVips.search(this.searchVipsFormData);
      })
    },
    // 重置搜索
    resetSearch() {
      this.activedKey = '1';
      this.hasSearch = false;
      this.searchVipsFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
    },
  }
}
</script>

<style scoped lang="less">
.tree-wrap{
  width: 100%;
  overflow-x:auto;
}
</style>