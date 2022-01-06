<template>
<a-card
  class="table-card-box"
  style="margin-top:10px;"
  size="small"
>
  <span slot="title" style="line-height: 32px">
    {{'结果展示: 符合条件的数据一共有' + pagination.total + '条'}}
  </span>
  <a-table
    :data-source="dataSource"
    :columns="columns"
    :pagination="pagination"
    rowKey="pmid"
    :loading="loading"
    @change="onTableChange"
  >
    <template slot="name" slot-scope="text, record">
      <platform-avatar-name :record="record"></platform-avatar-name>
    </template>
    <template slot="group" slot-scope="text">
      {{ text && text.name ? text.name : "-" }}
    </template>
    <template slot="number" slot-scope="text, record">
      <span v-if="text == 0">无</span>
      <a-button v-else type="link" size="small" style="padding-left: 0" @click="editApp(record)">{{ text }}个</a-button>
    </template>
    <template slot="cycleTime" slot-scope="text, record">
      {{record.audit_status == 0 || !record.start_at?'-': `${record.start_at} 至 ${record.expired_at}`}}
    </template>
    <template slot="real_name" slot-scope="text, record">
      {{ text }}({{ record.mobile }})
    </template>
    <template slot="audit_status" slot-scope="text">
      <span v-if="text == 1"><a-badge status="success" />审核通过</span>
      <span v-else-if="text == 0"><a-badge status="default" />未审核</span>
      <span v-else-if="text == -1"><a-badge status="error" />审核拒绝</span>
    </template>
    <template slot="operation" slot-scope="text, record">
      <a-button type="link" size="small" style="padding-left:0;" v-if="record.audit_status != 1" @click="examinePlatform(record)"> 审核</a-button>
    </template>
  </a-table>
</a-card>
</template>

<script>
import PlatformAvatarName from '../common/PlatformAvatarName'
import { getAdminPlatformAuditIndex, exportPlatformAuditTableData } from "@/services/adminPlatform";

export default {
  components: { PlatformAvatarName},
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
          title: "平台名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "应用套餐组",
          dataIndex: "group",
          scopedSlots: { customRender: "group" },
        },
        {
          title: "附加应用",
          dataIndex: "number",
          scopedSlots: { customRender: "number" },
        },
        {
          title: "服务周期",
          dataIndex: "start_at",
          scopedSlots: { customRender: "cycleTime" },
        },
        {
          title: "主管理员",
          dataIndex: "real_name",
          scopedSlots: { customRender: "real_name" },
        },
        {
          title: "状态",
          dataIndex: "audit_status",
          scopedSlots: { customRender: "audit_status" },
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
    editApp(record) {
      this.$router.push({name: "superPlatform", query: {pmid: record.pmid}});
    },
    // 导出表格
    exportExcel(){
      let conditionData = JSON.parse(JSON.stringify(this.condition));
      exportPlatformAuditTableData({
        page: this.pagination.current, 
        page_size: this.pagination.pageSize,
        export: 1,
        ...conditionData
      })
    },
    onTableChange(pagination) {
      this.getList(pagination);
    },
    // 获取总平台 平台列表
    getList(pageData) {
      this.loading = true;
      let conditionData = JSON.parse(JSON.stringify(this.condition));
      getAdminPlatformAuditIndex({
        page: pageData.current,
        page_size: pageData.pageSize,
        ...conditionData,
      }).then((res) => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          this.pagination = { ...this.pagination, ...pageData };
        }
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
    examinePlatform(data) {

      if (data.audit_status == 0) {
        // 当处于未审核状态，服务到期时间默认不展示
        data.start_at = null
        data.expired_at = null
      }
      // 审核平台
      this.$router.push({name:'examine', query: {pInfo: JSON.stringify(data)}})
    },
  },
};
</script>

<style lang="less" scoped>
.platform-name-box {
  display: flex;
  align-items: center;
  .ant-avatar {
    margin-right: 20px;
  }
  .name-pmid {
    display: flex;
    flex-direction: column;
    span:first-child {
      margin-bottom: 5px;
    }
  }
}
</style>