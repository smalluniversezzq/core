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
            <a-input v-model="searchFormData.value" placeholder="请输入搜索内容">
              <a-button  slot="addonAfter" size="small" type="link">搜索</a-button>
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <a-table
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      rowKey="id"
      :loading="loading"
      @change="onTableChange">
      <template slot="operate" slot-scope="text, record">
        <a-button :type="actived(item) ? 'primary' : ''" @click="checkItem(record)">选择</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    links: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
      searchFormData: {
        value: ''
      },
      loading: false,
      dataSource: [],
      columns: [
        {
          title: "文章标题",
          dataIndex: "title",
          scopedSlots: { customRender: "title" },
        },
        {
          title: "所属分类",
          dataIndex: "classify",
          scopedSlots: { customRender: "classify" },
        },
        {
          title: "更新时间",
          dataIndex: "update_at",
          scopedSlots: { customRender: "update_at" },
        },
        {
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
      
      selecdedLinks: cloneDeep(this.links)
    }
  },
  methods: {
    actived(activeLink){
      let flag = false;
      if(this.selecdedLinks.length > 0){
        flag = this.selecdedLinks.some(item => {return item.link_id == activeLink.link_id})
      }
      return flag;
    },
    // 选中
    checkItem(link){
      if(this.multiple){
        // 多选
        let hasLink = this.selecdedLinks.some(item => {return item.link_id == link.link_id});
        if(hasLink){
          // 选中列表中有此链接，删除
          this.selecdedLinks.splice(this.selecdedLinks.findIndex(item => {return item.link_id == link.link_id}), 1);
        }else{
          // 选中列表中无此链接，添加进去
          this.selecdedLinks.push(link);
        }
      }else{
        // 单选
        this.$set(this.selecdedLinks, 0, link)
      }
      this.$emit('checkedLink', this.selecdedLinks)
    },
    onTableChange(){

    },
  }
}
</script>

<style>

</style>