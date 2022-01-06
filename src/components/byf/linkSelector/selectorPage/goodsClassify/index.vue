<template>
  <div>
    <a-form-model
      ref="searchForm"
      :model="searchFormData"
      :wrapperCol="wrapperCol"
    >
      <a-row>
        <a-col :span="12">
          <a-form-model-item prop="type">
            <a-input-group compact>
              <a-select v-if="selecteList.length > 1" v-model="searchFormData.data_source_type" @change="searchSelectChange" style="width:100px">
                  <a-select-option :value="item.value" v-for="item in selecteList" :key="item.value">
                    {{item.name}}
                  </a-select-option>
              </a-select>
              <a-input @pressEnter="search" style="width: 50%" v-model="searchFormData.title" placeholder="请输入搜索内容" />
            </a-input-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <a-spin :spinning="spinning" style="width: 100%">
      <muti-level-classify 
        ref="mutiLevelClassify" 
        v-if="!spinning" 
        :list="list" 
        :links="selectedLinks"
        @checkItem="checkItem"
        @operate="onOperate"></muti-level-classify>
    </a-spin>
  </div>
</template>

<script>
import { getShopCategory } from '@/components/byf/linkSelector/services/admin/platform/designLink'
import { cloneDeep } from 'lodash'
import MutiLevelClassify from './mutiLevelClassify/MutiLevelClassify'
import mixin from '@/components/byf/linkSelector/mixin/index.js'
export default {
  mixins: [mixin],
  props: {},
  components: {
    MutiLevelClassify
  },
  data() {
    return {
      businessList: [],
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      searchFormData: {
        title: '',
        data_source_type: 5,
      },
      spinning: true,
      list: [],
      selectedLinks: cloneDeep(this.links),
    }
  },
  computed:{
    paramsOfGoodsCategory(){
      // 商品分类参数
      let params = {};
      if(this.apiParams.goodsClassifyPageParams){
        if(this.apiParams.goodsClassifyPageParams.shopGoodsCategoryIndex){
          params = this.apiParams.goodsClassifyPageParams.shopGoodsCategoryIndex;
        }
      }
      return params
    },
    filterSelecteList(){
      let list = [];
      if(this.apiParams.goodsClassifyPageParams){
        if(this.apiParams.goodsClassifyPageParams.filterSelecteList){
          list = this.apiParams.goodsClassifyPageParams.filterSelecteList;
        }
      }
      return list;
    },
    selecteList(){
      let list = [];
      if(this.filterSelecteList.length > 0){
        this.filterSelecteList.forEach(itm => {
          this.businessList.forEach(item => {
            if(item.value == itm){
              list.push(item)
            }
          })
        });
      }else{
        list = this.businessList;
      }
      return list;
    }
  },
  created(){
    this.businessList = this.tabItemParams.data_source_type || [];
    this.searchFormData.data_source_type = this.selecteList[0].value;
    this.getShopCategory();
  },
  methods: {
    linkFormatData(linkFormat, link){
      linkFormat.link_id = link.link_id;
      linkFormat.name = link.title;
      linkFormat.desc = link.title;
      linkFormat.params.category_id = link.id;
      linkFormat.params.category_image = link.image;
      linkFormat.params.level = link.level;
      return linkFormat;
    },
    // 选中
    checkItem(link){
      // 格式化成需要导出的数据
      let linkItem = this.linkFormatData(cloneDeep(this.linkFormat), link)
      let hasLink = this.selectedLinks.some(item => {return item.link_id == linkItem.link_id});
      if(hasLink){
        // 选中列表中有此链接，删除
        this.delLinkForSelectedLinks(linkItem);
      }else{
        // 否则添加
        this.addLinkToSelectedLinks(linkItem)
      }
      this.$emit('checkedLink', this.selectedLinks)
    },
    addLinkToSelectedLinks(link){
      // 添加链接到选中列表中
      if(this.multiple){
        // 多选
        if(this.max > 0 && this.selectedLinks.length == this.max){
          this.$message.error('超出可选择数量')
          return;
        }
        this.selectedLinks.push(link);
      }else{
        // 单选
        this.$set(this.selectedLinks, 0, link);
      }
    },
    delLinkForSelectedLinks(link){
      // 从选择列表中删除
      this.selectedLinks.splice(this.selectedLinks.findIndex(item => {return item.link_id == link.link_id}), 1);
    },
    getShopCategory(){
      this.spinning = true;
      this.list = [];
      getShopCategory({...this.searchFormData, ...this.paramsOfGoodsCategory}).then(res => {
        if(res.code == 200){
          if(res.data.length > 0){
            this.setLinkId(res.data)
          }
          this.list = res.data;
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    // 设置link_id用于选中
    setLinkId(arr){
      arr.forEach(item => {
        item.link_id = this.linkFormat.link_id;
        if(item.subs.length){
          this.setLinkId(item.subs)
        }
      })
    },
    onOperate(){

    },
    searchSelectChange(){
      this.search()
    },
    search(){
      this.getShopCategory();
    }
  }
}
</script>

<style>

</style>