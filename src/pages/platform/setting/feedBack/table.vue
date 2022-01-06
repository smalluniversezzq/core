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
              :rowKey="rowKey"
              :loading="loading"
              @change="onTableChange"
              :row-selection="byfRowSelection"
      >
        <template slot="userSlot" slot-scope="text, record">
          <span v-if="!text && !record.mobile">
            --
          </span>
          <span v-else>
            {{text}} <span v-if="text && record.mobile">(</span><span v-if="record.mobile">{{record.mobile}}</span><span v-if="text && record.mobile">)</span>
          </span>
        </template>
        <template slot="contentSlot" slot-scope="text, record">
          <span v-if="record.is_read == 0" style="font-weight: bold">{{text}}</span>
          <span v-if="record.is_read == 1">{{text}}</span>
        </template>
        <template slot="is_image" slot-scope="text">
          <span v-if="text == 1"><a-badge status="success" /> 有图 </span>
          <span v-else><a-badge status="default" /> 无图 </span>
        </template>
        <template slot="created_at" slot-scope="text, record">
          {{momentDate(record.created_at)}}
        </template>
        <template slot="operate" slot-scope="text, record">
          <byf-button
                  type="link"
                  size="small"
                  style="padding-left: 0"
                  @click="feedBackDetails(record)"
          >查看</byf-button>
          <byf-button type="link" size="small" @click="batchDel([record.id])">删除</byf-button>
        </template>
        <!-- 底部全选的功能 -->
        <template slot="footer">
          <a-space size='large'>
            <a-checkbox class="batch-checkbox" @change="onCheckBoxChange" :checked="checkAll" :indeterminate="indeterminate"></a-checkbox>
            <a-button :disabled="selectedRowKeys.length==0" @click="batchDel(selectedRowKeys)">批量删除</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <feed-back-details ref="feedBackDetails"></feed-back-details>
  </div>
</template>

<script>
import feedBackDetails from "./feedBackDetails";
import { getAdminPlatformFeedbackIndex, getAdminPlatformFeedbackDel, getAdminPlatformFeedbackDetail } from "@/services/admin/platform/feedback";
import moment from "moment";
export default {
  components: {
    feedBackDetails
  },
  props: ['condition'],
  data(){
    return {
      loading: false,
      dataSource: [],
      rowKey: 'id',
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
          width:220,
          title: "反馈用户",
          dataIndex: "name",
          scopedSlots: { customRender: "userSlot" },
        },
        {
          ellipsis: true,
          title: "反馈内容",
          dataIndex: "content",
          scopedSlots: { customRender: "contentSlot" },
        },
        {
          width: 120,
          title: "有图&无图",
          dataIndex: "is_image",
          scopedSlots: { customRender: "is_image" },
        },
        {
          width: 200,
          title: "创建时间",
          dataIndex: "created_at",
          scopedSlots: { customRender: "created_at" },
        },
        {
          width: 120,
          title: "操作",
          scopedSlots: { customRender: "operate" },
        },
      ],
      selectedRowKeys: [],
      checkAll: false,
    }
  },
  computed: {
    indeterminate() {
      if (this.selectedRowKeys.length == this.dataSource.length) {
        return false;
      } else {
        return this.selectedRowKeys.length > 0 ? true : false;
      }
      // return false;
    },
    byfRowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectHandler(selectedRowKeys, selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  },
  created(){
    this.getList(this.pagination);
  },
  methods: {
    onCheckBoxChange(e) {
      this.checkAll = e.target.checked;
      if (e.target.checked === true) {
        this.selectHandler(
          this.dataSource.map(item => {
            return item[this.rowKey];
          }),
          this.dataSource
        );
      } else {
        this.selectHandler([], []);
      }
    },
    selectHandler(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
      if (
        selectedRowKeys.length > 0 &&
        selectedRowKeys.length === this.dataSource.length
      ) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    batchDel(ids){
      if(ids.length == 0){
        this.$message.error('请先勾选需要删除的记录')
        return;
      }
      this.$confirm({
        title: "提示",
        content: "确定删除记录吗?删除后不可恢复",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          console.log(ids);
          return new Promise((resolve, reject) => {
            getAdminPlatformFeedbackDel({ids: ids}).then(res => {
              resolve();
              if(res.code == 200){
                this.selectedRowKeys = [];
                this.$message.success(res.msg);
                this.checkAll = false;
                this.calculation(ids.length, this.dataSource.length);
                this.search();
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
    calculation(delLength, nowLength){
      // delLength删除个数，nowLength 当前页个数
      var totalPage = Math.ceil(this.pagination.total / this.pagination.pageSize);
      totalPage == 0 ? totalPage = 1 : null;
      if(this.pagination.current == totalPage && delLength == nowLength && this.pagination.current > 1){
        this.pagination.current -= 1;
      }
    },
    momentDate(timeStamp){
      if(timeStamp){
        return moment.unix(timeStamp).format("YYYY-MM-DD HH:mm:ss")
      }else{
        return '— —'
      }
    },
    onTableChange(pagination){
      this.getList(pagination)
    },
    feedBackDetails(data){
      this.loading = true;
      getAdminPlatformFeedbackDetail({id: data.id}).then((res) => {
        this.loading = false;
        if(res.code == 200){
          data.is_read = 1;
          this.$refs.feedBackDetails.showModalAction(res.data);
        }
      });
    },
    // 获取记录列表
    getList(pageData) {
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      this.loading = true;
      return getAdminPlatformFeedbackIndex({page: pageData.current, page_size: pageData.pageSize, ...conditionData}).then((res) => {
        if (res.code == 200) {
          this.checkAll = false;
          this.selectedRowKeys = [];
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
      // this.pagination.current = 1
      this.getList(this.pagination)
    },
  }
}
</script>

<style lang="less" scoped>
.release_time_icon{
  color: @primary-color;
  font-size: 20px;
  display: block;
  float: left;
  margin-bottom: -5px;
  margin-right: 5px;
}
.batch-checkbox {
  margin-left: 6px;
}
</style>
