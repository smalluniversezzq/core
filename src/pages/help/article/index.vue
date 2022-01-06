<template>
  <div>
    <a-card size="small">
      <a-spin :spinning="spinning">
        <a-list item-layout="vertical"  :pagination="pagination" :data-source="dataSource">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <div slot="description" class="description">{{ item.describe }}</div>
              <a slot="title" class="title" @click="toDetails(item)">{{ item.title }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { getArticleList } from '@/services/admin/platform/assist'
export default {
  data(){
    return {
      dataSource: [],
      pagination: {
        total: 50,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`,
        onChange: currentPage => {
          this.onChange(currentPage)
        },
        onShowSizeChange: (current, pageSize) => {
          this.pageSizeChange(current, pageSize)
        }
      },
      spinning: false,
      params: null
    }
  },
  watch: {
    $route(val){
      this.params = val.params;
      this.getList(this.pagination)
    }
  },
  mounted(){
    this.getList(this.pagination);
  },
  methods: {
    getList(pageData){
      // 获取文章列表
      this.spinning = true;
      getArticleList({page: pageData.current, page_size: pageData.pageSize, alias: this.$route.params.classId || ''}).then(res => {
        if(res.code == 200){
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          this.pagination = {...this.pagination, ...pageData}
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    toDetails(item){
      this.$router.push({path: `/help/helpArticleDetails/${item.category_alias}/${item.alias}`})
    },
    pageSizeChange(current, pageSize){
      this.pagination.pageSize = pageSize;
      this.pagination.current = 1;
      this.getList(this.pagination);
    },
    onChange(currentPage){
      this.pagination.current = currentPage;
      this.getList(this.pagination);
    },
  }
}
</script>

<style scoped lang="less">
.title{
  font-weight: bold;
  display: block;
  // max-width: 1000px;
}
.description{
  // max-width: 1100px;
}
.pagination-wrap{
  display: flex;
  flex-direction: row-reverse;
}
</style>