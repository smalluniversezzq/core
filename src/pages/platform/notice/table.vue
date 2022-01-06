<template>
<div>
  <a-card
    class="table-card-box"
    style="margin-top: 10px"
    size="small"
  >
    <span slot="title" style="line-height: 32px">
      数据展示：共{{pagination.total}}条数据，未读{{noticeNotReadNum}}条
    </span>
    <a-table
      :data-source="noticeList"
      :columns="columns"
      :pagination="pagination"
      :rowKey="rowKey"
      :loading="loading"
      @change="onTableChange"
      :row-selection="byfRowSelection"
    >
      <template slot="titleSlot" slot-scope="text, record">
        <a-tooltip>
          <template slot="title">
            {{text}}
          </template>
          <div style="display: flex">
            <a-tag color="#f50" v-if="record.importance == 1"> 重要 </a-tag>
            <div class="text-overflow-1">{{text}}</div>
          </div>
        </a-tooltip>
      </template>
      
      <template slot="read_time" slot-scope="text">
        {{momentDate(text)}}
      </template>
      <template slot="release_time" slot-scope="text">
        {{momentDate(text)}}
      </template>

      <template slot="is_read" slot-scope="text">
        <span v-if="text == 1"><a-badge status="success" /> 已读</span>
        <span v-else><a-badge status="processing" /> 未读</span>
      </template>

      <template slot="operate" slot-scope="text, record">
        <byf-button
          type="link"
          size="small"
          style="padding-left: 0"
          @click="show(record)"
        >
          查看</byf-button
        >
        <byf-button type="link" size="small" @click="batchDel([record.id])">删除</byf-button>
      </template>
        <!-- 底部全选的功能 -->
      <template slot="footer">
        <a-space size='large'>
          <a-checkbox class="batch-checkbox" @change="onCheckBoxChange" :checked="checkAll" :indeterminate="indeterminate"></a-checkbox>
          <a-button :disabled="selectedRowKeys.length == 0" @click="batchDel(selectedRowKeys)">批量删除</a-button>
          <a-button :disabled="selectedRowKeys.length == 0" @click="batchRead(selectedRowKeys)">批量已读</a-button>
        </a-space>
      </template>
    </a-table>
  </a-card>
  <noticeModal ref="noticeModal" @modalCancel="modalCancel"></noticeModal>
</div>
</template>

<script>
import moment from 'moment'
import noticeModal from './noticeModal.vue';
import { mapMutations, mapGetters, mapState } from 'vuex'
import { getCoreNoticeIndex, coreNoticeDel, coreNoticeRead } from '@/services/platformNotice'
export default {
  props: ['condition'],
  components: {
    noticeModal,
  },
  data(){
    return {
      loading: false,
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
          ellipsis: true,
          title: "标题",
          dataIndex: "title",
          scopedSlots: { customRender: "titleSlot" },
        },
        {
          title: "接收时间",
          dataIndex: "release_time",
          scopedSlots: { customRender: "release_time" },
        },
        {
          title: "查阅时间",
          dataIndex: "read_time",
          scopedSlots: { customRender: "read_time" },
        },
        {
          title: "状态",
          dataIndex: "is_read",
          scopedSlots: { customRender: "is_read" },
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operate" },
        },
      ],
      selectedRowKeys: [],
      checkAll: false,
    }
  },
  computed: {
    ...mapState('notice', ['noticeNotReadNum']),
    ...mapGetters('notice', ['noticeList']),
    indeterminate() {
      if (this.selectedRowKeys.length == this.noticeList.length) {
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
    ...mapMutations('notice', ['setRead', 'setNoticeList', 'setNoticeNotReadNum']),
    onCheckBoxChange(e) {
      this.checkAll = e.target.checked;
      if (e.target.checked === true) {
        this.selectHandler(
          this.noticeList.map(item => {
            return item[this.rowKey];
          }),
          this.noticeList
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
        selectedRowKeys.length === this.noticeList.length
      ) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    momentDate(timeStamp){
      if(timeStamp){
         return moment.unix(timeStamp).format("YYYY-MM-DD HH:mm:ss")
      }else{
        return '— —'
      }
    },
    batchRead(ids){
      if(ids.length == 0){
        this.$message.error('请先勾选需要设置的公告')
        return;
      }
      this.$confirm({
        title: "提示",
        content: "确定批量设置已读吗?",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            coreNoticeRead({id: ids}).then(res => {
              resolve();
              if(res.code == 200){
                this.selectedRowKeys = [];
                // 获取列表中未读状态的公告，用于修改未读数量
                let notReadNoticeIds = []
                this.noticeList.forEach(item => {
                  if(ids.some(id => {return item.id == id}) && item.is_read == 0){
                    notReadNoticeIds.push(item.id)
                  }
                })
                this.setRead(ids);
                this.setNoticeNotReadNum(this.noticeNotReadNum - notReadNoticeIds.length)
                this.$message.success(res.msg);
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
    batchDel(ids){
      if(ids.length == 0){
        this.$message.error('请先勾选需要删除的公告')
        return;
      }
      this.$confirm({
        title: "提示",
        content: "确定删除公告吗?删除后不可恢复",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          // 修改用户状态
          return new Promise((resolve, reject) => {
            coreNoticeDel({id: ids}).then(res => {
              resolve();
              if(res.code == 200){
                this.selectedRowKeys = [];
                // 获取列表中未读状态的公告，用于修改未读数量
                let notReadNoticeIds = []
                this.noticeList.forEach(item => {
                  if(ids.some(id => {return item.id == id}) && item.is_read == 0){
                    notReadNoticeIds.push(item.id)
                  }
                })
                this.setNoticeNotReadNum(this.noticeNotReadNum - notReadNoticeIds.length)
                this.$message.success(res.msg);
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
    show(data){
      this.$refs.noticeModal.showModal(data);
    },
    modalCancel(data){
      this.checkAll = false;
      if(data.is_read == 1){
        this.getList(this.pagination)
      }
    },
    onTableChange(pagination){
      this.getList(pagination)
    },
    getList(pageData) {
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      this.loading = true;
      return getCoreNoticeIndex({page: pageData.current, page_size: pageData.pageSize, ...conditionData}).then((res) => {
        if (res.code == 200) {
          this.setNoticeList(res.data.list)
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
  }
}
</script>

<style lang="less" scoped>
.batch-checkbox {
  margin-left: 6px;
}
</style>