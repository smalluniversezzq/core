<template>
  <div>
    <a-card
      class="table-card-box"
      :title="'数据展示: 共' + pagination.total + '条数据，其中' + pagination.showStatus + '条启用'"
      style="margin-top: 10px"
      size="small"
    >
      <template slot="extra">
        <div class="table-extra">
          <byf-button type="primary" @click="toAddOrEdit">+ 添加</byf-button>
        </div>
      </template>
      <a-table
        :data-source="dataSource"
        :columns="columns"
        :pagination="pagination"
        :rowKey="rowKey"
        :loading="loading"
        @change="onTableChange"
        :row-selection="rowSelection"
      >
        <template slot="status" slot-scope="text, record">
          <a-switch 
            checked-children="ON" 
            un-checked-children="OFF" 
            :checked="!!record.status" @click="switchStatus(record)"></a-switch>
        </template>
        <template slot="updated_at" slot-scope="text, record">
          {{momentDate(record.updated_at)}}
        </template>
        <template slot="operate" slot-scope="text, record">
          <byf-button
            type="link"
            size="small"
            style="padding-left: 0"
            @click="toAddOrEdit(record)"
          >
            编辑</byf-button
          >
          <byf-button type="link" size="small" @click="batchDel([record.id])">删除</byf-button>
        </template>
        <template slot="footer">
          <a-space size='large'>
            <a-checkbox class="batch-checkbox" @change="onCheckBoxChange" :checked="checkAll" :indeterminate="indeterminate"></a-checkbox>
            <a-button :disabled="selectedRowKeys.length == 0" @click="batchDisabled(selectedRowKeys, 0)">批量禁用</a-button>
            <a-button :disabled="selectedRowKeys.length == 0" @click="batchDisabled(selectedRowKeys, 1)">批量启用</a-button>
            <a-button :disabled="selectedRowKeys.length == 0" @click="batchDel(selectedRowKeys)">批量删除</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <addOrEdit ref="addOrEdit" @addOrEditOk="search"></addOrEdit>
  </div>
</template>

<script>
import { getAssistIndex, assistDisplay, assistDel } from "@/services/admin/core/assist";
import moment from "moment";
import addOrEdit from './addOrEdit'
export default {
  props: ['condition'],
  components: {
    addOrEdit
  },
  data(){
    return {
      loading: false,
      rowKey: 'id',
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`,
        showStatus: 0
      },
      checkAll: false,
      selectedRowKeys: [],
      filteredInfo: null,
      sortedInfo: null,
      filtersParams: {
        title: '',
        sort: '',
        updated_at: '',
        views: '',
      }
    }
  },
  computed: {
    columns(){
      let { sortedInfo } = this;
      sortedInfo = sortedInfo || {};
      const columns = [
        {
          key: 'sort',
          width: 100,
          title: "排序",
          dataIndex: "sort",
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'sort' && sortedInfo.order,
        },
        {
          key: 'title',
          ellipsis: true,
          title: "文章标题",
          dataIndex: "title",
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
        },
        {
          key: 'category_name',
          title: "所属分类",
          dataIndex: "category_name",
        },
        {
          key: 'views',
          title: "浏览数",
          dataIndex: "views",
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'views' && sortedInfo.order,
        },
        {
          key: 'status',
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          key: 'updated_at',
          title: "更新时间",
          dataIndex: "updated_at",
          scopedSlots: { customRender: "updated_at" },
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'updated_at' && sortedInfo.order,
        },
        {
          key: 'operate',
          title: "操作",
          scopedSlots: { customRender: "operate" },
        },
      ]
      return columns;
    },
    indeterminate() {
      if (this.selectedRowKeys.length == this.dataSource.length) {
        return false;
      } else {
        return this.selectedRowKeys.length > 0 ? true : false;
      }
      // return false;
    },
    rowSelection(){
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
    },
  },
  created(){
    this.getList(this.pagination);
  },
  methods: {
    resetSortorder(){
      this.sortedInfo = null;
    },
    momentDate(timeStamp){
      if(timeStamp){
        return moment.unix(timeStamp).format("YYYY-MM-DD HH:mm:ss")
      }else{
        return '— —'
      }
    },
    // 清空选中
    clearSelectedKeys(){
      this.selectedRowKeys = [];
      this.checkAll = false;
    },
    batchDisabled(ids, status){
      let action = '禁用';
      if(status == 1){
        action = '启用';
      }
      this.$confirm({
        title: "提示",
        content: `确定${action}文章吗？`,
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            assistDisplay({ids, status}).then(res => {
              resolve();
              if(res.code == 200){
                this.clearSelectedKeys();
                this.dataSource.forEach(item => {
                  if(ids.some(hasItem => {return hasItem == item.id})){
                    item.status = status;
                    if(status == 1){
                      this.pagination.showStatus += 1;
                    }else{
                      this.pagination.showStatus -= 1;
                    }
                  }
                })
                this.$message.success(res.msg);
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
      this.$confirm({
        title: "提示",
        content: "确定删除文章吗？删除后不可恢复",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            assistDel({ids}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                if(this.dataSource.length == ids.length && this.pagination.current > 1){
                  this.pagination.current -= 1
                }
                this.clearSelectedKeys();
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
    switchStatus(record){
      this.$confirm({
        title: "提示",
        content: "确定切换显示状态吗？",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            assistDisplay({ids: [record.id], status: record.status == 1 ? 0 : 1}).then(res => {
              resolve();
              if(res.code == 200){
                if(record.status == 1){
                  record.status = 0;
                  this.pagination.showStatus -= 1;
                }else{
                  record.status = 1;
                  this.pagination.showStatus += 1;
                }
                
                this.$message.success(res.msg);
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
    onTableChange(pagination, filters, sorter){
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
      let sort = '';
      switch (this.sortedInfo.order) {
        case 'ascend':
          sort = 1;
          break;
        case 'descend':
          sort = 2;
          break;
        default:
          sort = '';
          break;
      }
      for(let k in this.filtersParams){
        if(k == sorter.columnKey){
          this.filtersParams[k] = sort;
        }else{
          this.filtersParams[k] = '';
        }
      }
      this.getList(pagination)
    },
    toAddOrEdit(data) {
      if(data.id){
        this.$refs.addOrEdit.showAction(data);
      }else{
        this.$refs.addOrEdit.showAction();
      }
    },
    // 获取总平台用户列表
    getList(pageData) {
      this.clearSelectedKeys();
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      this.loading = true;
      return getAssistIndex({page: pageData.current, page_size: pageData.pageSize, ...conditionData, order: {...this.filtersParams}}).then((res) => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          pageData.showStatus = +res.data.pages.showStatus;
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
.batch-checkbox {
  margin-left: 6px;
}
</style>