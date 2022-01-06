<template>
  <div class="demo-table">
    <a-alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      closable 
      style="margin-bottom:10px;"
    />
    <a-card>
      <div class="demo-header">
        <a-form-model
          class="article-search"
          :label-col="{span:6}"
          :wrapper-col="{span:14}"
        >
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-model-item label="关键词" >
                <a-input
                  placeholder="请输入关键词"
                />
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-model-item label="支付方式">
                <a-select
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">支付宝</a-select-option>
                  <a-select-option value="2">微信</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-model-item label="下单时间">
                <a-date-picker style="width:100%;"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-model-item label="订单来源">
                <a-select
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">淘宝</a-select-option>
                  <a-select-option value="2">京东</a-select-option>
                  <a-select-option value="3">拼多多</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-model-item label="订单类型">
                <a-select
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">类型1</a-select-option>
                  <a-select-option value="2">类型2</a-select-option>
                  <a-select-option value="3">类型3</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-model-item label="维权状态">
                <a-select
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                  <a-select-option value="2">禁用</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-model-item label="配送方式">
                <a-select
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">方式1</a-select-option>
                  <a-select-option value="2">方式2</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-model-item :wrapper-col="{ offset: 6 }">
                <a-space>
                  <a-button type="primary" @click="onSearch">搜索</a-button>
                  <a-button type="link" size="small" @click="resetSearch">重置</a-button>
                  <a-button type="link" size="small">导出</a-button>
                </a-space>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-card>
    <a-card class="table-card-box" :title="'结果展示: 符合条件的数据一共有' + pagination.total + '条'" style="margin-top:10px;">
      <template slot="extra">
        <div class="table-extra">
          <a-button type="primary" @click="onClickAdd">添加</a-button>
        </div>
      </template>
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :pagination="pagination"
        :data-source="sourceData"
        :rowKey="rowKey"
        @change="onTableChange"
        :row-selection="byfRowSelection"
      >
        <!-- 封面 -->
        <template
          slot="cover"
          slot-scope="text"
        >
          <img v-if="text" :src="text" alt="封面图" style="width:70px;height:70px;">
          <div v-else style="width:70px;height:70px;display:flex;align-items:center;">
            <byf-icon type="icontupian" style="font-size: 30px; color: #ccc"></byf-icon>
          </div>
        </template>
        <!-- 发布控制 -->
        <template
          slot="controlIsPublish"
          slot-scope="text, record"
        >
          <a-switch checked-children="ON" un-checked-children="OFF" :checked="!!text" @click="switchArticleStatus(record, text)"/>
        </template>
        <!-- 发布状态 -->
        <template
          slot="isPublish"
          slot-scope="text"
        >
          <!-- <a-tag color="red" v-if="!text">禁用</a-tag>
          <a-tag color="blue" v-else>启用</a-tag> -->
          <template v-if="!text">
            <a-badge status="success" /> 发布中
          </template>
          <template v-else>
            <a-badge status="default" /> 已禁用
          </template>
        </template>
        <template
          slot="upload_time"
          slot-scope="text"
        >
          {{moment(Number(text)*1000).format('YYYY-MM-DD hh:mm:ss')}}
        </template>
        <template
          slot="operate"
          slot-scope="text, record"
        >
          <a-button
            type="link"
            size="small"
            style="padding-left:0;"
            @click="editArticle(record)"
          >编辑</a-button>
          <a-button
            type="link"
            size="small"
            @click="deleteArticle(record)"
          >删除</a-button>
        </template>
        
        <!-- 底部全选的功能 -->
        <template slot="footer">
          <a-space size='large'>
            <a-checkbox class="batch-checkbox" @change="onCheckBoxChange" :checked="checkAll" :indeterminate="indeterminate"></a-checkbox>
            <a-button v-for="(item, index) in footerBtns" :key="'btn'+index" @click="onFooterBtnClick(item ,index)">{{item.title}}</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <!-- <demo-edit
      :visible="showEdit"
      :modalStatus="modalStatus"
      :editData="editData"
      @add="AddOneArticle"
      @edit="modiyArticle"
      @ok="onEditOk"
      @cancel="showEdit = false"
    ></demo-edit> -->

    <a-modal :maskClosable="false"
      :width="800"
      title="文章编辑"
      style="top: 10px;"
      :destroyOnClose="true"
      :visible="showEdit"
      :footer="null"
      @cancel="showEdit = false"
    >
      <demo-edit
        :modalStatus="modalStatus"
        :editData="editData"
        @add="AddOneArticle"
        @edit="modiyArticle"
        @ok="onEditOk"
        @cancel="showEdit = false"
      >
      </demo-edit>
    </a-modal>
  </div>
</template>
<script>
import { format } from "date-fns/esm";
import { getDemoList, deletOne, getById, switchStatus } from "@/services/demo";
import DemoEdit from "./demoEdit";
import moment from "moment";
export default {
  name: "demoTable",
  components: {
    DemoEdit
  },
  data() {
    return {
      // 默认的是增加的状态
      modalStatus: "add",
      editData: null,
      rowKey: 'id',
      columns: [
        { dataIndex: "id", key: "id", title: "文章ID" },
        { dataIndex: "label", key: "label", title: "文章标签" },
        { dataIndex: "cover", key: "cover", title: "封面", scopedSlots: { customRender: "cover" } },
        { dataIndex: "title", key: "title", title: "文章标题" },
        { dataIndex: "author", key: "author", title: "作者" },
        {
          dataIndex: "upload_time",
          key: "upload_time",
          title: "上传时间",
          sorter: (a, b) => {
            return Number(a.upload_time) - Number(b.upload_time);
          },
          scopedSlots: { customRender: "upload_time" }
        },
        {
          dataIndex: "isPublish",
          key: "controlIsPublish",
          title: "发布控制",
          scopedSlots: { customRender: "controlIsPublish" }
        },
        {
          dataIndex: "isPublish",
          key: "isPublish",
          title: "发布状态",
          scopedSlots: { customRender: "isPublish" }
        },
        {
          dataIndex: "operate",
          key: "operate",
          title: "操作",
          scopedSlots: { customRender: "operate" }
        }
      ],
      sourceData: [],
      showEdit: false,
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ["10", "20", "30", "40", "50"],
        "show-size-changer": true
      },
      tableLoading: false,
      checkAll: false,
      selectedRowKeys: [],
      footerBtns: [
        {'title': '设置黑名单'},
        {'title': '取消黑名单'},
        {'title': '修改分组'},
        {'title': '修改等级'}
      ],
      rowSelection: {
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
      }
    };
  },
  computed: {
    indeterminate() {
      if (this.selectedRowKeys.length == this.sourceData.length) {
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
  created() {
    this.getData(this.pagination.current);
  },
  methods: {
    onSearch(){
      this.pagination.current = 1
    },
    resetSearch(){
      console.log('重置搜索')
    },
    /**添加文章 */
    onClickAdd() {
      this.modalStatus = "add";
      this.showEdit = true;
      this.editData = {};
    },
    // 切换文章的状态
    switchArticleStatus(record) {
      this.$confirm({
        title: "提示",
        content: "确定更改发布状态吗?",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            record.isPublish = !record.isPublish;
            switchStatus({
              id: record.id,
              isPublish: Number(record.isPublish)
            }).then(res => {
              if (res.code == 200) {
                resolve();
              } else {
                reject();
              }
              this.$message.success(res.msg);
            });
          });
        },
        onCancel() {}
      });
    },
    // 对相应的数据进行修改
    modiyArticle(val) {
      console.log(val);
    },
    // 添加一条数据
    AddOneArticle(val) {
      this.sourceData.unshift(val);
    },
    format,
    moment,
    openUrl(url) {
      window.open(url);
    },
    hideOne(record) {
      record.status = Math.abs(record.status - 1);
    },
    // 删除文章
    deleteArticle(record) {
      this.$confirm({
        title: "提示",
        content: "确认删除此商品？",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            // 删除内容
            deletOne({ id: record.id }).then(res => {
              if (res.code == 200) {
                resolve();
                this.$message.success("删除成功");
                this.getData(this.pagination.current);
              } else {
                reject();
                this.$message.error(res.msg);
              }
            });
          });
        },
        onCancel() {}
      });
    },
    // 编辑文章
    editArticle(record) {
      // 编辑文章
      // 首先打开编辑页面，
      // 通过请求数据，将数组赋值给弹出框
      getById({ id: record.id }).then(res => {
        this.editData = res.data;
        this.modalStatus = "edit";
        this.showEdit = true;
      });
    },
    onTableChange(pagination) {
      this.getData(pagination.current);
    },
    getData(page) {
      this.tableLoading = true;
      getDemoList({ page: page }).then(res => {
        this.tableLoading = false;
        this.pagination.current = page;
        this.sourceData = res.data.list;
        this.pagination.total = res.data.total;
      });
    },
    onEditOk() {
      this.getData(this.pagination.current);
    },
    onCheckBoxChange(e) {
      this.checkAll = e.target.checked;
      if (e.target.checked === true) {
        this.selectHandler(
          this.sourceData.map(item => {
            return item[this.rowKey];
          }),
          this.sourceData
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
        selectedRowKeys.length === this.sourceData.length
      ) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    onFooterBtnClick(btnItem, index){
      this.$message.info(`点击了第${1+index}个按钮"${btnItem.title}"`)
      console.log('this.selectedRowKeys', this.selectedRowKeys)
      console.log('this.selectedRows', this.selectedRows)
    }
  }
};
</script>
<style lang="less" scoped>
.article-search {
  .ant-form-item {
    margin-bottom: 20px;
  }
}
.table-card-box {
  .table-extra {
    display: flex;
    align-items: center;
    .btns {
      .anticon {
        font-size: 16px;
      }
    }
  }
  .batch-checkbox {
    margin-left: 5px;
  }
}
</style>