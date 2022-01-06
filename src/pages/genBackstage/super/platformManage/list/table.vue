<template>
  <a-card
    class="table-card-box"
    :title="'结果展示: 符合条件的数据一共有' + pagination.total + '条'"
    style="margin-top: 10px"
    size="small"
  >
    <template slot="extra">
      <div class="table-extra">
        <byf-button type="primary" @click="goCreate">添加平台</byf-button>
      </div>
    </template>
    <a-table
      :data-source="dataSource"
      :columns="columns"
      rowKey="pmid"
      :pagination="pagination"
      :loading="loading"
      @change="onTableChange"
    >
      <template slot="name" slot-scope="text, record">
        <div class="platform-name-box">
          <a-avatar class="hover" :class="{limit: record.limit_status == 1}" @click="goOneBizConsole(record)" :src="record.logo" shape="square" :size="64"></a-avatar>
          <div class="name-pmid">
            <span class="name hover" @click="goOneBizConsole(record)">{{ record.name }}</span>
            <span>{{ record.pmid }}</span>
          </div>
        </div>
      </template>

      <!-- 普通的文本 -->
      <template slot="group" slot-scope="text">
        {{ text && text.name ? text.name : "-" }}
      </template>

      <template slot="number" slot-scope="text, record">
        <span v-if="text == 0">无</span>
        <a-button v-else type="link" size="small" style="padding-left: 0" @click="editApp(record)">{{ text }}个</a-button>
      </template>
      <template slot="cycleTime" slot-scope="text, record">
        {{ record.start_at }}&nbsp;至&nbsp;{{ record.expired_at }}
      </template>
      <template slot="real_name" slot-scope="text, record">
        {{ text }}({{ record.mobile }})
      </template>

      <template slot="status" slot-scope="text">
        <span v-if="text == 1"><a-badge status="success" /> 正常</span>
        <span v-else><a-badge status="default" /> 禁用</span>
      </template>
      <template slot="operation" slot-scope="text, record">
        <byf-button type="link" size="small" style="padding-left: 0" @click="editApp(record)">设置</byf-button>
        <a-popconfirm
          :title="record.limit_status == 0?'确定限制使用?':'确定恢复使用?'"
          @confirm="() => onChangeLimit(record)"
        >
          <byf-button type="link" size="small">{{record.limit_status == 0?'限制使用':'恢复使用'}}</byf-button>
        </a-popconfirm>
        <byf-button type="link" size="small" @click="deleteVisible = true;deletingPlatform=record;">删除</byf-button>
        <byf-button type="link" size="small" v-if="record.delete_status == 1">恢复</byf-button>
      </template>
    </a-table>
    <a-modal :maskClosable="false" title="删除平台" :visible="deleteVisible" :confirmLoading="confirmLoading" @cancel="onDeleteHide" @ok="onDelete">
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="删除原因" prop="reason">
          <a-textarea placeholder="请输入原因" :auto-size="{ minRows: 3, maxRows: 6 }" v-model="deletForm.reason"/>
        </a-form-model-item>
      </a-form-model>
      <a-alert message="平台删除后，如想恢复可以前往回收站操作。" banner />
    </a-modal>
  </a-card>
</template>

<script>
import { mapMutations } from 'vuex'
import { getAdminPlatformIndex, getAdminPlatformLimit, getAdminPlatformUnLimit, getAdminPlatformDel, exportPlatformTableData } from "@/services/adminPlatform";
import { getAdminSysMenuIndex } from "@/services/admin/sys/menu/index.js";
import moment from "moment";

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
      deleteVisible:false,
      deletingPlatform: {},
      deletForm:{
        reason: ''
      },
      confirmLoading:false,
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
        // 状态的搜索和展示需要产品确认
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
  methods: {
    ...mapMutations("setting", ["setPlatformInfo"]),
    goOneBizConsole(item) {
      console.log(item)
      if(item.audit_status != 1){
        this.goCreate(item);
        return;
      }
      if(item.status != 1){
        // 已被禁用
        return;
      }
      // 存储平台数据到store及storage
      this.setPlatformInfo(item)

      getAdminSysMenuIndex().then(res=>{
        this.$router.push(res);
      })
    },
    // 导出表格
    exportExcel(){
      let conditionData = JSON.parse(JSON.stringify(this.condition));
      if (conditionData.date && conditionData.date[0]) {
        conditionData.start_time = moment(conditionData.date[0]).startOf('day').unix(),
        conditionData.end_time = moment(conditionData.date[1]).endOf('day').unix()
        delete conditionData.date
      }
      exportPlatformTableData({
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
      getAdminPlatformIndex({
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
    goCreate() {
      this.$router.push({name: 'platformCreate'});
    },
    editApp(record) {
      this.$router.push({name: "superPlatform", query: {pmid: record.pmid}});
    },
    onDeleteHide(){
      this.deleteVisible = false;
      this.deletForm.reason='';
    },
    onDelete() {
      this.confirmLoading = true;
      getAdminPlatformDel({pmid: this.deletingPlatform.pmid, delete: this.deletForm.reason}).then(res => {
        if (res.code == 200) {
          this.getList(this.pagination);
          this.$message.success(res.msg)
          this.onDeleteHide();
        }
      }).finally(()=>{
        this.confirmLoading = false
      })
    },
    /**
     * 修改平台的限制状态
     * @param [Object] record
     */
    onChangeLimit(record){
      this.loading = true
      if (record.limit_status == 1) {
        getAdminPlatformUnLimit({pmid: record.pmid}).then(res => {
          if (res.code == 200) {
            record.limit_status = 0
          }
        }).finally(()=>{
          this.loading = false
        })
      } else if (record.limit_status == 0) {
        getAdminPlatformLimit({pmid: record.pmid}).then(res => {
          if (res.code == 200) {
            record.limit_status = 1
          }
        }).finally(()=>{
          this.loading = false
        })
      }
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
    position: relative;
    &.limit::after {
      content: '限制使用';
      color: white;
      background: rgba(0, 0, 0, 0.29);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      font-size: 14px;
    }
  }
  .name-pmid {
    display: flex;
    flex-direction: column;
    span:first-child {
      margin-bottom: 5px;
      color: @link-color
    }
  }
}
.hover{
  cursor: pointer;
}
</style>