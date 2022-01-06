<template>
<a-card
  class="table-card-box"
  :title="'结果展示: 符合条件的数据一共有' + pagination.total + '条'"
  style="margin-top:10px;"
  size="small"
>
  <template slot="extra">
    <div class="table-extra">
      <byf-button type="primary" @click="goCreate">添加</byf-button>
    </div>
  </template>
  <a-table :data-source="dataSource" :columns="columns" :pagination="pagination" :loading="loading" rowKey="id" @change="onTableChange">
    <!-- 普通的文本 -->
    <template slot="normal-text" slot-scope="text">
      {{ text ? text : "-" }}
    </template>
    <template slot="status" slot-scope="text">
      <span v-if="text == 1"><a-badge status="success" />已启用</span>
      <span v-else><a-badge status="default" />已禁用</span>
    </template>
    <template slot="operation" slot-scope="text, record">
      <a-button type="link" size="small" style="padding-left:0;" @click="onEdit(record)">编辑</a-button>
      <a-popconfirm title="确认删除？" @confirm="onDelete(record)">
        <a-button type="link" size="small" style="padding-left:0;">删除</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</a-card>
</template>

<script>
import { getAdminPlatformGroupIndex, getAdminPlatformGroupDel } from "@/services/adminPlatformGroup";

export default {
  props: {
    condition: {
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      dataSource: [],
      columns: [
        {
          title: "套餐组名称",
          dataIndex: "name",
          scopedSlots: { customRender: "normal-text" },
        },
        {
          title: "备注说明",
          dataIndex: "remark",
          scopedSlots: { customRender: "normal-text" },
          width: '30%'
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
        },
      ],
    };
  },
  created() {
    this.getList(this.pagination);
  },
  mounted(){
  },
  methods: {
    onTableChange(pagination) {
      this.getList(pagination);
    },
    // 获取总平台 平台列表
    getList(pageData) {
      this.loading = true;
      let conditionData = JSON.parse(JSON.stringify(this.condition));
      getAdminPlatformGroupIndex({
        page: pageData.current,
        page_size: pageData.pageSize,
        ...conditionData,
      }).then((res) => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          this.pagination = { ...this.pagination, ...pageData };
        }
      })
      .finally(() => {
        this.loading = false;
      });
    },
    goCreate() {
      this.$router.push({name: "addGroup", query: {operationType: 'create'}});
    },
    onEdit(data) {
      this.$router.push({name:'addGroup', query: {info: JSON.stringify(data), operationType: 'edit'}})
    },
    onDelete(record){
      this.loading = true;
      getAdminPlatformGroupDel({id: record.id}).then(res => {
        if (res.code == 200) {
          this.getList(this.pagination);
          this.$message.success(res.msg)
        }
      }).finally(()=>{
        this.loading = false
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
};
</script>

<style lang="less" scoped>
</style>