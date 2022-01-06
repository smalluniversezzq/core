<template>
  <div>
    <a-form-model
      ref="searchForm"
      :model="searchFormData"
      :wrapperCol="wrapperCol"
    >
      <a-row>
        <a-col :span="10">
          <a-form-model-item prop="value">
            <a-input @pressEnter="search" v-model="searchFormData.title" placeholder="请输入搜索内容">
              <a-button @click="search" slot="addonAfter" size="small" type="link">搜索</a-button>
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <a-table
      :data-source="dataSourceList"
      :columns="columns"
      :pagination="pagination"
      rowKey="id"
      :loading="loading"
      @change="onTableChange">
      <template slot="updated_at" slot-scope="text">
        {{momentDate(text)}}
      </template>
      <template slot="operate" slot-scope="text, record">
        <a-button :type="actived(record) ? 'primary' : ''" @click="checkItem(record)">选择</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getTemplateIndex } from '@/components/byf/linkSelector/services/admin/platform/design'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import mixin from '@/components/byf/linkSelector/mixin/index.js'
export default {
  mixins: [mixin],
  props: {
    
  },
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
      searchFormData: {
        title: '',
        page_type_group: 3
      },
      loading: false,
      dataSource: [],
      columns: [
        {
          ellipsis: true,
          title: "模板名称",
          dataIndex: "title",
          scopedSlots: { customRender: "title" },
        },
        {
          title: "更新时间",
          dataIndex: "updated_at",
          scopedSlots: { customRender: "updated_at" },
        },
        {
          width: 120,
          title: "操作",
          scopedSlots: { customRender: "operate" },
        },
      ],
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      selectedLinks: cloneDeep(this.links)
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
    params(){
      let params = {};
      if(this.apiParams.customPageParams){
        if(this.apiParams.customPageParams.templateIndex){
          params = this.apiParams.customPageParams.templateIndex;
        }
      }
      return params
    }
  },
  created(){
    this.getTemplateIndex(this.pagination);
  },
  methods: {
    momentDate(timeStamp){
      return moment.unix(timeStamp).format("YYYY-MM-DD HH:mm:ss")
    },
    actived(activeLink){
      let flag = false;
      if(this.selectedLinks.length > 0){
        flag = this.selectedLinks.some(item => {return item.link_id == activeLink.link_id})
      }
      return flag;
    },
    linkFormatData(linkFormat, link){
      linkFormat.link_id = linkFormat.link_id + link.id;
      linkFormat.name = link.title;
      linkFormat.desc = link.title;
      linkFormat.params.template_id = link.id;
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
    getTemplateIndex(pageData){
      this.loading = true;
      getTemplateIndex({
        page: pageData.current, 
        page_size: pageData.pageSize, 
        ...this.searchFormData, 
        ...this.params
      }).then(res => {
        if(res.code == 200){
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          this.pagination = {...this.pagination, ...pageData}
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    search(){
      this.pagination.current = 1;
      this.getTemplateIndex(this.pagination)
    },
    onTableChange(pagination){
      this.getTemplateIndex(pagination)
    },
  }
}
</script>

<style>

</style>