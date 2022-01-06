<template>
<a-card
  class="table-card-box"
  :title="'结果展示: 符合条件的数据一共有'+pagination.total+'条'"
  style="margin-top: 10px"
  size="small"
>
  <template slot="extra">
    <div class="table-extra">
      <byf-button type="primary" @click="showAddOrEdit">添加用户</byf-button>
    </div>
  </template>
  <a-table
    :data-source="dataSource"
    :columns="columns"
    :pagination="pagination"
    rowKey="mid"
    :loading="loading"
    @change="onTableChange"
  >
    <!-- 头像 -->
    <template slot="avatar" slot-scope="text">
      <a-avatar icon="user" :src="text" :size="50"></a-avatar>
    </template>

    <!-- 普通的文本 -->
    <template slot="normal-text" slot-scope="text">
      {{ text ? text : "-" }}
    </template>

    <template slot="platform_current" slot-scope="text">
      <a-button type="link" @click="goApp">
        {{ text }}
      </a-button>
    </template>

    <template slot="status" slot-scope="text">
      <span v-if="text == 1">正常</span>
      <span v-else>禁用</span>
    </template>
    <!-- 认证状态 -->
    <template slot="authStauts" slot-scope="text">
      <span v-if="text == 0">未认证</span>
      <span v-else-if="text == 1">个人认证</span>
      <span v-else>公司认证</span>
    </template>
    <template slot="operate" slot-scope="text, record">
      <byf-button
        type="link"
        size="small"
        style="padding-left: 0"
        @click="showAddOrEdit(record)"
      >
        编辑</byf-button
      >
      <a-popconfirm title="确定修改用户状态？" @confirm="onConfirmChangeStatus(record)">
        <byf-button type="link" size="small">{{record.status == 1?'禁用':'启用'}}</byf-button>
      </a-popconfirm>
    </template>
  </a-table>
  <add-or-edit ref="addOrEdit" @confirm="addOrEditOk"></add-or-edit>
</a-card>
</template>

<script>
import { getAdminPlatformUsersList, adminPlatformUsersEdit, exportUserTableData } from "@/services/adminUser";
import addOrEdit from "./addOrEdit";
import moment from "moment";
export default {
  components: { addOrEdit,},
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
          title: "用户ID",
          dataIndex: "mid",
        },
        {
          title: "用户头像",
          dataIndex: "avatar",
          scopedSlots: { customRender: "avatar" },
        },
        {
          title: "用户姓名",
          dataIndex: "real_name",
          scopedSlots: { customRender: "normal-text" },
        },
        {
          title: "用户手机号",
          dataIndex: "mobile",
          scopedSlots: { customRender: "normal-text" },
        },
        // 等后端补充接口参数
        {
          title: "当前平台个数",
          dataIndex: "platform_current",
          scopedSlots: { customRender: "platform_current" },
        },
        {
          title: "最大平台个数",
          dataIndex: "platform_limit",
        },
        {
          title: "账号状态",
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
    // 导出表格
    exportExcel(){
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      if (conditionData.date[0]) {
        conditionData.start_time= moment(conditionData.date[0]).startOf('day').unix()
        conditionData.end_time= moment(conditionData.date[1]).endOf('day').unix()
      }
      exportUserTableData({
        page: this.pagination.current, 
        page_size: this.pagination.pageSize,
        export: 1,
        ...conditionData
      })
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
    onTableChange(pagination){
      this.getList(pagination)
    },
    showAddOrEdit(data) {
      this.$refs.addOrEdit.showModalAction(data);
    },
    // 当前平台数跳转我的应用
    goApp() {},
    // 获取总平台用户列表
    getList(pageData) {
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      if(!pageData.export){
        pageData.export = 0;
      }
      if (conditionData.date[0]) {
        conditionData.start_time= moment(conditionData.date[0]).startOf('day').unix()
        conditionData.end_time= moment(conditionData.date[1]).endOf('day').unix()
      }
      this.loading = true;
      return getAdminPlatformUsersList({page: pageData.current, page_size: pageData.pageSize, export: pageData.export, ...conditionData}).then((res) => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          this.pagination = {...this.pagination, ...pageData}
        }
        return res
      }).finally(() => {
        this.loading = false;
      });
    },
    /**
     * 搜索
     */
    search(){
      this.pagination.current = 1
      this.getList(this.pagination)
    },
    onConfirmChangeStatus(record){
      adminPlatformUsersEdit({mid: record.mid, status: Math.abs(record.status - 1)}).then(res => {
        if(res.code == 200) {
          record.status = Math.abs(record.status - 1)
          this.$message.success(res.msg)
        }
      })
      console.log(record)
    }
  }
}
</script>

<style lang="less" scoped>

</style>