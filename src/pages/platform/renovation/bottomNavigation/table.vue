<template>
  <a-card
    class="table-card-box"
    style="margin-top: 10px"
    size="small"
    :title="'结果展示: 符合条件的数据一共有' + pagination.total + '条'"
  >

    <template slot="extra">
      <div class="table-extra">
        <a-button type="primary" @click="showAddOrEdit('add')">添加模板</a-button>
      </div>
    </template>
    <a-table
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      rowKey="id"
      :loading="loading"
      @change="onTableChange"
    >
      <template slot="template-title" slot-scope="text">
        <div class="template-title text-overflow-1" :title="text">{{text}}</div>
      </template>
      <template slot="device_type" slot-scope="text, record">
        <template v-if="record.device_type == 1">
          <span v-for="(item,index) in record.apply_os" :key="index">{{(index>0?',':'')+ApplyOs[item]}}</span>
        </template>
        <template v-else>--</template>
      </template>
      <!-- 适用模板 -->
      <template slot="version" slot-scope="text, record">
        <template v-if="record.version_start == null">全部版本</template>
        <template v-else-if="record.version_end == null">V{{record.version_start}}</template>
        <template v-else>V{{record.version_start}}-V{{record.version_end}}</template>
      </template>
      <!-- 预览 -->
      <template slot="preview" slot-scope="text">
        <img style="width: 300px" :src="text">
      </template>
      <!-- 更新时间 -->
      <template slot="time" slot-scope="text">
        {{moment.unix(text).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
      <!-- 模板状态 -->
      <template slot="status" slot-scope="text">
        <span v-if="text == 1"><a-badge status="success" /> 启用</span>
        <span v-else><a-badge status="error" /> 禁用</span>
      </template>
      <template slot="operate" slot-scope="text, record">
        <a-button type="link" size="small" @click="goDiy(record)">装修</a-button>
        <a-popconfirm :title="`确定${record.status==1?'禁用':'启用'}吗？`" @confirm="onConfirmChangeStatus(record)">
          <a-button type="link" size="small">{{record.status==1?'禁用':'启用'}}</a-button>
        </a-popconfirm>
        <a-button type="link" size="small" @click="showAddOrEdit(record)">编辑</a-button>
        <a-popconfirm v-if="record.status == 0" title="确定删除此页面吗？" @confirm="onConfirmDelete(record)">
          <a-button type="link" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <add-or-edit ref="addOrEdit" @confirm="addOrEditOk"></add-or-edit>
  </a-card>
</template>

<script>
import addOrEdit from "./addOrEdit";
import {getAdminPlatformDesignNavIndex, getAdminPlatformDesignNavStatusUpdate, getAdminPlatformDesignNavDel} from '@/services/admin/platform/design'
import { DeviceTypeKeyMap, ApplyOs} from '../common'
import moment from 'moment'

export default {
  components: { addOrEdit,},
  props: ['condition'],
  data(){
    return {
      loading: false,
      DeviceTypeKeyMap,
      ApplyOs,
      dataSource: [],
      moment,
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
          title: "模板名称",
          dataIndex: "title",
          scopedSlots: { customRender: "template-title" },
        },
        {
          title: "终端类型",
          dataIndex: "device_type",
          scopedSlots: { customRender: "device_type" },
        },
        {
          title: "适用版本",
          dataIndex: "version",
          scopedSlots: { customRender: "version" },
        },
        {
          title: "预览",
          dataIndex: "preview",
          scopedSlots: { customRender: "preview" },
        },
        {
          title: "更新时间",
          dataIndex: "updated_at",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "状态",
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
    /**
     * @param {any} data 'add':表示新增。
     */
    showAddOrEdit(data) {
      if (data == 'add') {
        this.$refs.addOrEdit.showModalAction();
      } else {
        this.$refs.addOrEdit.showModalAction(data);
      }
    },
    goDiy(data){
      this.$router.push({name:'CoreDiyOneNav', query: {id:data.id, pageType: data.page_type}});
    },
    // 获取总平台用户列表
    getList(pageData) {
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      // console.log(pageData, conditionData)
      this.loading = true;
      getAdminPlatformDesignNavIndex({page: pageData.current, page_size: pageData.pageSize, export: pageData.export, ...conditionData}).then((res) => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          if(res.data.pages) pageData.total = +res.data.pages.total;
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
      this.getList(this.pagination)
    },
    onConfirmDelete(record){
      getAdminPlatformDesignNavDel({id: record.id}).then(res => {
        if(res.code == 200) {
          if(this.pagination.total % this.pagination.pageSize == 1 && this.pagination.current > 1 ){
            this.pagination.current --
          }
          this.search()
          this.$message.success(res.msg)
        }
      })
    },
    onConfirmChangeStatus(record){
      getAdminPlatformDesignNavStatusUpdate({id: record.id, op: Math.abs(record.status-1)}).then(res => {
        if(res.code == 200) {
          this.search()
          this.$message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.template-title {
  max-width: 400px;

}
</style>