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
    rowKey="pmid"
    :loading="loading"
    :pagination="pagination"
    @change="onTableChange"
  >
    <template slot="name" slot-scope="text, record">
      <platform-avatar-name :record="record"></platform-avatar-name>
    </template>
    
    <template slot="group" slot-scope="text">
      {{ text && text.name ? text.name : "-" }}
    </template>

    <template slot="number" slot-scope="text">
      <span v-if="text == 0">无</span>
      <router-link to="/" v-else >{{text}}个</router-link>
    </template>
    <template slot="cycleTime" slot-scope="text, record">
      {{ record.start_at }}&nbsp;至&nbsp;{{ record.expired_at }}
    </template>
    <template slot="real_name" slot-scope="text, record">
      {{ text }}({{ record.mobile }})
    </template>
    <template slot="delete_msg" slot-scope="text, record">
      {{ record.is_deleted==1?'用户删除':'站长删除' }}<div class="text-overflow-2" style="max-width:100px;">{{text}}</div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <a-button type="link" size="small" style="padding-left:0;" @click="examinePlatform(record)">设置</a-button>
      <a-popconfirm title="确认恢复？" @confirm="onUnDelConfirm(record)">
        <a-button type="link" size="small" style="padding-left:0;">恢复正常</a-button>
      </a-popconfirm>
      <a-popconfirm title="确认删除？" @confirm="onDelConfirm(record)">
        <a-button type="link" size="small" style="padding-left:0;">删除</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</a-card>
</template>

<script>
import PlatformAvatarName from '../../common/PlatformAvatarName'
import { getAdminPlatformRecycleIndex, getAdminPlatformRealDel, getAdminPlatformUnDel, exportPlatformRecycleTableData } from "@/services/adminPlatform";
import moment from "moment";

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
          title: "备注",
          dataIndex: "delete_msg",
          scopedSlots: { customRender: "delete_msg" },
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
    // 导出表格
    exportExcel(){
      let conditionData = JSON.parse(JSON.stringify(this.condition));
      if (conditionData.date && conditionData.date[0]) {
        conditionData.start_time = moment(conditionData.date[0]).startOf('day').unix(),
        conditionData.end_time = moment(conditionData.date[1]).endOf('day').unix()
        delete conditionData.date
      }
      exportPlatformRecycleTableData({
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
      if (conditionData.date && conditionData.date[0]) {
        conditionData.start_time = moment(conditionData.date[0]).startOf('day').unix(),
        conditionData.end_time = moment(conditionData.date[1]).endOf('day').unix()
        delete conditionData.date
      }
      getAdminPlatformRecycleIndex({
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
    editApp() {},
    examinePlatform(record) {
      this.$router.push({name: "superPlatform", query: {pmid: record.pmid}});
    },
    /**
     * 确认删除
     */
    onDelConfirm(record){
      this.loading = true;
      getAdminPlatformRealDel({pmid: record.pmid}).then(res=>{
        if (res.code == 200) {
          this.getList(this.pagination);
          this.$message.success(res.msg)
        }
      }).finally(()=>{
        this.loading = false
      })
    },
    /**
     * 确认恢复
     */
    onUnDelConfirm(record){
      this.loading = true;
      getAdminPlatformUnDel({pmid: record.pmid}).then(res=>{
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