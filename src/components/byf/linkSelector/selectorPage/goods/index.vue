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
              <a-select v-model="searchFormData.data_source_type" @change="searchSelectChange" style="width:100px">
                  <a-select-option :value="item.type" v-for="item in businessList" :key="item.type">
                    {{item.name}}
                  </a-select-option>
              </a-select>
              <a-input @pressEnter="search" style="width: 50%" v-model="searchFormData.keyword" placeholder="请输入搜索内容"/>
            </a-input-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <a-tabs size="small" :animated="false" v-model="activeKey" @change="tabsChange">
      <a-tab-pane v-for="item in tabsList" :key="item.id" :tab="item.title"></a-tab-pane>
    </a-tabs>
    <a-table
      :data-source="dataSourceList"
      :columns="columns"
      :pagination="pagination"
      rowKey="id"
      :loading="loading"
      @change="onTableChange">
      <template slot="goods" slot-scope="text, record">
        <div class="goods">
          <div class="goods_img">
            <a-avatar shape="square" :src="record.main_img" :size="65" />
          </div>
          <div class="goods_tags">
             <a-tag class="identify identify-a" v-if="record.is_virtual == 1">虚</a-tag>
             <a-tag class="identify identify-a" v-else>实</a-tag>
             <a-tag class="identify identify-b" v-if="record.is_multi_spec == 1">多</a-tag>
             <span class="goods_name text-overflow-2">
               {{record.title}}
             </span>
          </div>
        </div>
      </template>
      <template slot="price" slot-scope="text">
        ¥{{text}}
      </template>
      <template slot="operate" slot-scope="text, record">
        <a-button :type="actived(record) ? 'primary' : ''" @click="checkItem(record)">选择</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getShopGoodsCategoryIndex } from '@/components/byf/linkSelector/services/admin/byShop/shopGoodsCategory'
import { getShopGoodsSpuIndex } from '@/components/byf/linkSelector/services/admin/byShop/shopGoodsSpu'
import { cloneDeep } from 'lodash'
import mixin from '@/components/byf/linkSelector/mixin/index.js'
export default {
  mixins: [mixin],
  props: {},
  data(){
    return {
      businessList: [
        { type: 1, name: '淘宝' },
        { type: 2, name: '京东' },
        { type: 3, name: '拼多多' },
        { type: 4, name: '唯品会' },
        { type: 5, name: '线上商城' },
      ],
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      searchFormData: {
        keyword: '',
        category_ids: '',
        data_source_type: 5
      },
      tabsList: [],
      activeKey: '',
      columns: [
        {
          title: "商品",
          dataIndex: "goods",
          width: 400,
          scopedSlots: { customRender: "goods" },
        },
        {
          title: "价格",
          dataIndex: "price",
          scopedSlots: { customRender: "price" },
        },
        {
          title: "库存",
          dataIndex: "stock",
          scopedSlots: { customRender: "stock" },
        },
        {
          width: 120,
          title: "操作",
          scopedSlots: { customRender: "operate" },
        },
      ],
      dataSource: [],
      loading: false,
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 10,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      selecdedLinks: cloneDeep(this.links)
    }
  },
  computed: {
    dataSourceList(){
      let list = cloneDeep(this.dataSource);
      list.forEach(item => {
        item.link_id = this.linkFormat.link_id + item.id;
      })
      return list;
    },
    paramsOfGoodsCategory(){
      // 商品分类参数
      let params = {};
      if(this.apiParams.goodsPageParams){
        if(this.apiParams.goodsPageParams.shopGoodsCategoryIndex){
          params = this.apiParams.goodsPageParams.shopGoodsCategoryIndex;
        }
      }
      return params
    },
    paramsOfGoods(){
      // 商品列表参数
      let params = {};
      if(this.apiParams.goodsPageParams){
        if(this.apiParams.goodsPageParams.shopGoodsSpuIndex){
          params = this.apiParams.goodsPageParams.shopGoodsSpuIndex;
        }
      }
      return params
    }
  },
  created(){
    this.getShopGoodsCategoryIndex();
    this.getShopGoodsSpuIndex(this.pagination);
  },
  methods: {
    // 是否选中状态
    actived(activeLink){
      let flag = false;
      if(this.selecdedLinks.length > 0){
        flag = this.selecdedLinks.some(item => {return item.link_id == activeLink.link_id})
      }
      return flag;
    },
    linkFormatData(linkFormat, link){
      linkFormat.link_id = linkFormat.link_id + link.id;
      linkFormat.name = link.title;
      linkFormat.desc = link.title;
      linkFormat.params.goods_id = link.id;
      return linkFormat;
    },
    // 选中
    checkItem(link){
      // 格式化成需要导出的数据
      let linkItem = this.linkFormatData(cloneDeep(this.linkFormat), link)
      let hasLink = this.selecdedLinks.some(item => {return item.link_id == linkItem.link_id});
      if(hasLink){
        // 选中列表中有此链接，删除
        this.delLinkForSelectedLinks(linkItem);
      }else{
        // 否则添加
        this.addLinkToSelectedLinks(linkItem)
      }
      this.$emit('checkedLink', this.selecdedLinks)
    },
    addLinkToSelectedLinks(link){
      // 添加链接到选中列表中
      if(this.multiple){
        // 多选
        if(this.max > 0 && this.selecdedLinks.length == this.max){
          this.$message.error('超出可选择数量')
          return;
        }
        this.selecdedLinks.push(link);
      }else{
        // 单选
        this.$set(this.selecdedLinks, 0, link);
      }
    },
    delLinkForSelectedLinks(link){
      // 从选择列表中删除
      this.selecdedLinks.splice(this.selecdedLinks.findIndex(item => {return item.link_id == link.link_id}), 1);
    },
    tabsChange(value){
      this.searchFormData.category_ids = value + '';
      this.searchFormData.keyword = '';
      this.pagination.current = 1;
      this.getShopGoodsSpuIndex(this.pagination)
    },
    onTableChange(pagination){
      this.getShopGoodsSpuIndex(pagination)
    },
    searchSelectChange(){

    },
    search(){
      this.activeKey = '';
      this.pagination.current = 1;
      this.getShopGoodsSpuIndex(this.pagination);
    },
    getShopGoodsCategoryIndex(){
      getShopGoodsCategoryIndex({...this.paramsOfGoodsCategory }).then(res => {
        if(res.code == 200){
          this.tabsList = res.data.list;
          this.tabsList.unshift({
            id: '',
            title: '全部'
          })
        }
      })
    },
    getShopGoodsSpuIndex(pageData){
      this.loading = true;
      getShopGoodsSpuIndex({page: pageData.current, 
        pageSize: pageData.pageSize, 
        status: 1, 
        ...this.searchFormData, 
        ...this.paramsOfGoods
      }).then(res => {
        if(res.code == 200){
          this.dataSource = res.data.list;
          pageData.total = +res.data.totalCount;
          this.pagination = {...this.pagination, ...pageData}
        }
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped lang="less">
.goods{
  display: flex;
  width: 400px;
  .goods_img{
    width: 65px;
    height: 65px;
  }
  .goods_tags{
    display: flex;
    align-items: flex-start;
    margin-left: 10px;
    width: 100%;
    .identify{
      border: none;
    }
    .identify-a{
      background: #F0FAFF;
      color: #2d8cf0;
    }
    .identify-b{
      background: #ffefe6;
      color: #ed4014;
    }

  }
}
</style>