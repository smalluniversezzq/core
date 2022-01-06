<template>
  <div>
    <a-card size="small">
      <a-spin :spinning="spinning">
        <div class="title">{{details.title}}</div>
        <br/>
        <div class="wangeditor-content" v-html="details.content"></div>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { getArticleCategoryArticle } from '@/services/admin/platform/assist'

export default {
  data(){
    return {
      details: {},
      spinning: false,
    }
  },
  created(){
    this.getDetails();
  },
  methods: {
    getDetails(){
      this.spinning = true;
      getArticleCategoryArticle({alias: this.$route.params.articleId}).then(res => {
        if(res.code == 200){
          this.details = res.data;
        }
      }).finally(() => {
        this.spinning = false;
      })
    }
  }
}
</script>

<style scoped lang="less">
.title{
  font-weight: bold;
  font-size: 16px;
}
</style>