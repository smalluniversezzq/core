<template>
  <div>
    <a-card size="small">
    <span slot="title" style="line-height: 32px">
      {{'结果展示: 符合条件的数据一共有' + pagination.total + '条'}}
    </span>
      <a-table
        :data-source="dataSource"
        :columns="columns"
        :pagination="pagination"
        rowKey="id"
        :loading="loading"
        @change="onTableChange">
        <template slot="status" slot-scope="text, record">
          <byf-space>
            <span>站内通知</span>
            <a-switch :checked="!!record.is_site_notice" @click="switchStatus(record, 'is_site_notice')"></a-switch>
          </byf-space>
          <br/>
          <byf-space>
            <span>推送通知</span>
            <a-switch :checked="!!record.is_push_notice" @click="switchStatus(record, 'is_push_notice')"></a-switch>
          </byf-space>
        </template>
        <template slot="is_jump" slot-scope="text, record">
          <a-switch :checked="!!record.is_jump" @click="switchStatus(record, 'is_jump')"></a-switch>
        </template>
        <template slot="operate" slot-scope="text, record">
          <byf-button type="link" size="small" @click="toAddOrEdit(record)" >
            编辑
          </byf-button>
        </template>
      </a-table>
    </a-card>
    <add-or-edit ref="addOrEdit" @confirm="addOrEditOk"></add-or-edit>
  </div>
</template>

<script>
import addOrEdit from "./addOrEdit";
import { platformMessageTemplateIndex, platformMessageTemplateNoticeUpdate } from '@/services/platformSetting'

export default {
  components: {
    addOrEdit
  },
  props: ['condition'],
  data(){
    return {
      loading: false,
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "触发事件",
          dataIndex: "event_name",
        },
        {
          title: "消息标题",
          dataIndex: "title",
        },
        {
          title: "消息内容",
          dataIndex: "content",
        },
        {
          width: 90,
          title: "跳转页面",
          dataIndex: "link_name",
        },
        {
          width: 90,
          title: "开启跳转",
          dataIndex: "is_jump",
          scopedSlots: { customRender: "is_jump" },
        },
        {
          width: 90,
          title: "消息类型",
          dataIndex: "type_name",
        },
        {
          width: 90,
          title: "所属业务",
          dataIndex: "business",
        },
        {
          width: 150,
          title: "通知途径启用状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operate" },
        },
      ],
    }
  },
  created(){
    this.getList(this.pagination);
  },
  methods: {
    // 切换状态
    switchStatus(record, type) {
      let obj = {
        'is_site_notice': record.is_site_notice,
        'is_push_notice': record.is_push_notice,
        'is_jump': record.is_jump,
      }
      // 存在跳转页面名称的时候，才可以修改is_jump
      if(!record.link_name && type == 'is_jump'){
        return this.$message.error('跳转地址不存在，不可开启')
      }
      obj[type] = record[type];
      obj[type] = obj[type] == 0 ? 1 : 0;
      this.$confirm({
        title: "提示",
        content: "确定更改此状态吗?",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          // 修改用户状态
          return new Promise((resolve, reject) => {
            platformMessageTemplateNoticeUpdate({tid: record.id, ...obj}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                record[type] = obj[type];
              }
            }).catch(err => {
              console.log(err);
              reject();
            });
          })
        },
        onCancel() {}
      });
    },
    // 添加/编辑 确认
    addOrEditOk(res) {
      if (res.operationType == "add") {
        // 重新请求第一页
        this.pagination.current = 1;
        this.getList(this.pagination)
      } else {
        // 修改指定项
        this.getList(this.pagination)
      }
    },
    toAddOrEdit(data){
      this.$refs.addOrEdit.showModalAction(data);
    },
    onTableChange(pagination){
      this.getList(pagination);
    },
    getList(pageData){
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      this.loading = true;
      platformMessageTemplateIndex({page: pageData.current, page_size: pageData.pageSize, ...conditionData}).then(res => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          this.pagination = {...this.pagination, ...pageData}
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    /**
     * 搜索
     */
    search(){
      this.pagination.current = 1
      this.getList(this.pagination)
    },
  },
}
</script>

<style>

</style>