<template>
<a-card
  class="table-card-box"
  style="margin-top: 10px"
  size="small"
>
  <template slot="title">
    数据展示：共{{pagination.total}}条数据，其中{{pagination.draft_total}}条待发布，{{pagination.time_total}}条定时发布
  </template>
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
    <template slot="target" slot-scope="text">
      {{targetName(text)}}
    </template>
    <template slot="release_status" slot-scope="text">
      {{typeName(text)}}
    </template>
    <template slot="release_time" slot-scope="text, record">
      <byf-icon class="release_time_icon" type="iconshijian" v-if="record.type == 1 && record.release_status != 2"></byf-icon>
      {{momentDate(record.release_time)}}
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
    <!-- 底部全选的功能 -->
    <template slot="footer">
      <a-space size='large'>
        <a-checkbox class="batch-checkbox" @change="onCheckBoxChange" :checked="checkAll" :indeterminate="indeterminate"></a-checkbox>
        <a-button :disabled="selectedRowKeys.length == 0" @click="batchDel(selectedRowKeys)">批量删除</a-button>
      </a-space>
    </template>
  </a-table>
</a-card>
</template>

<script>
import { getCoreNoticeIndex, coreNoticeDel } from "@/services/coreNotice";
import moment from "moment";
export default {
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
      
      targetList: [
        {target: 1, label: '所有平台接收'},
        {target: 2, label: '部分平台接收'},
        {target: 3, label: '部分平台不接收'},
      ],
      typeList: [
        {release_status: 0, label: '待发布（即草稿）'},
        {release_status: 2, label: '已发布'},
        {release_status: 1, label: '定时发布'},
      ],
      selectedRowKeys: [],
      checkAll: false,
      sortedInfo: null,
      filtersParams: {
        release_time: '',
      }
    }
  },
  computed: {
    columns(){
      let { sortedInfo } = this;
      sortedInfo = sortedInfo || {};
      let columns = [
        {
          ellipsis: true,
          title: "标题",
          dataIndex: "title",
          scopedSlots: { customRender: "titleSlot" },
        },
        {
          title: "接收目标",
          dataIndex: "target",
          scopedSlots: { customRender: "target" },
        },
        {
          title: "状态",
          dataIndex: "release_status",
          scopedSlots: { customRender: "release_status" },
        },
        {
          title: "更新时间",
          dataIndex: "updated_at",
          scopedSlots: { customRender: "updated_at" },
        },
        {
          title: "发布时间",
          dataIndex: "release_time",
          scopedSlots: { customRender: "release_time" },
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'release_time' && sortedInfo.order,
        },
        {
          width: 120,
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
          return new Promise((resolve, reject) => {
            coreNoticeDel({id: ids}).then(res => {
              resolve();
              if(res.code == 200){
                this.checkAll = false;
                this.selectedRowKeys = [];
                this.$message.success(res.msg);

                if(this.dataSource.length == 0 && this.pageination.current > 1){
                  // 删除完之后此页面没有数据，并且不在第一页，则页数减1
                  this.pagination.current -= 1;
                }
                this.getList(this.pagination)
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
    momentDate(timeStamp){
      if(timeStamp){
        return moment.unix(timeStamp).format("YYYY-MM-DD HH:mm:ss")
      }else{
        return '— —'
      }
    },
    typeName(release_status){
      let typeText = '';
      this.typeList.forEach(item => {
        if(item.release_status == release_status){
          typeText = item.label;
        }
      })
      return typeText;
    },
    targetName(target){
      let targetText = '';
      this.targetList.forEach(item => {
        if(item.target == target){
          targetText = item.label;
        }
      })
      return targetText;
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
    // 清空选中
    clearSelectedKeys(){
      this.selectedRowKeys = [];
      this.checkAll = false;
    },
    toAddOrEdit(data) {
      if(data.id){
        this.$router.push({name: 'superNoticeAddOrEdit', query: {id: data.id}})
      }else{
        this.$router.push({name: 'superNoticeAddOrEdit'})
      }
    },
    // 获取公告列表
    getList(pageData) {
      this.clearSelectedKeys();
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      this.loading = true;
      return getCoreNoticeIndex({page: pageData.current, page_size: pageData.pageSize, ...conditionData, order: {...this.filtersParams}}).then((res) => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          pageData.draft_total = +res.data.pages.draft_total;
          pageData.time_total = +res.data.pages.time_total;
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