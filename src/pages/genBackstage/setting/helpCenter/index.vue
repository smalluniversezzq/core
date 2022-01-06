<template>
  <div>
    <a-card
      style="padding: 0"
      size="small"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="key => onTabChange(key, 'noTitleKey')"
    >
      <classify v-if="noTitleKey == 1"></classify>
      <list v-if="noTitleKey == 0"></list>
    </a-card>
  </div>
</template>

<script>
import classify from './classify/index.vue'
import list from './list/index.vue'
export default {
  components: {
    classify,
    list
  },
  data(){
    return {
      tabListNoTitle: [
        {key: '0', tab: '文章列表'},
        {key: '1', tab: '文章分类'},
      ],
      noTitleKey: '0'
    }
  },
  methods: {
    onTabChange(key, type){
      this[type] = key;
    }
  },
}
</script>

<style>

</style>