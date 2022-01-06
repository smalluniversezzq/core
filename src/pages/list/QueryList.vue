<template>
  <div class="query-list">
    <div :class="advanced ? 'search' : null">
      <a-card>
        <a-form layout="horizontal">
          <div :class="advanced ? null: 'fold'">
            <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="规则编号"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="使用状态"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="调用次数"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input-number style="width: 100%" placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
            <a-row v-if="advanced">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="更新日期"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-date-picker style="width: 100%" placeholder="请输入更新日期" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="使用状态"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="描述"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
          </div>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left: 8px">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{advanced ? '收起' : '展开'}}
              <byf-icon :type="advanced ? 'iconxiajiantou-copy' : 'iconxiajiantou'" />
            </a>
          </span>
        </a-form>
      </a-card>
    </div>
    <a-card>
      <div class="operator">
        
        <a-button @click="addNew" type="primary">新建</a-button>
        <a-button >批量操作</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick" slot="overlay">
            <a-menu-item key="delete">删除</a-menu-item>
            <a-menu-item key="audit">审批</a-menu-item>
          </a-menu>
          <a-button>
            更多操作 <byf-icon style="color:#999;vertical-align:-3px;" type="iconxiajiantou"></byf-icon>
          </a-button>
        </a-dropdown>
      </div>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="username" slot-scope="{text}">
          {{text}}
        </div>
        <div slot="phone" slot-scope="{text}">
          {{text}}
        </div>
        <div slot="status" slot-scope="{text}">
          <a-switch checked-children="启用" un-checked-children="禁用" :defaultChecked="!!text" />
        </div>
        <div slot="avatar" slot-scope="{text}"><img style="width:40px;height:40px;" :src="text" alt=""></div>
        <div slot="action" slot-scope="{text, record}">
          <a-button type="link" style="padding: 0 7px 0 0;" size="small" @click="editeOne(record)">
            <a-icon type="edit"/>编辑
          </a-button>
          <a-button type="link" style="padding: 0 7px 0 0;" size="small" @click="deleteRecord(record.key)">
            <a-icon type="delete" />删除
          </a-button>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
      <a-drawer title="编辑用户" :width="720" :visible="drawerVisible" @close="drawerVisible = false">
        <user-form></user-form>
      </a-drawer>
    </a-card>
  </div>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import UserForm from '@/pages/form/basic/UserForm'
import { avatars } from '@/mock/common'

const columns = [
  {
    title: '用户id',
    sorter: true,
    dataIndex: 'no'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    scopedSlots: { customRender: 'username' }
  },
  {
    title: '手机',
    dataIndex: 'phone',
    scopedSlots: { customRender: 'phone' }
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    scopedSlots: { customRender: 'avatar' }
  },
  {
    title:'状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

const dataSource = []

for (let i = 0; i < 100; i++) {
  dataSource.push(createOneUser(i))
}

function createOneUser(i){
  return {
    key: i,
    no: parseInt(Math.random()*899999 + 100000),
    username: '用户名'+i,
    phone: '17712'+parseInt(Math.random()*899999 + 100000),
    status: Math.floor(Math.random()*2),
    avatar: avatars[Math.floor(Math.random()*avatars.length)],
    updatedAt: '2018-07-26'
  }
}

export default {
  name: 'QueryList',
  components: {StandardTable, UserForm},
  data () {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      drawerVisible: false
    }
  },
  methods: {
    // eslint-disable-next-line
    editeOne(record) {
      this.drawerVisible = true;
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('您清空了勾选的所有行')
    },
    onStatusTitleClick() {
      this.$message.info('你点击了状态栏表头')
    },
    onChange() {
      this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      this.$message.info('选中行改变了')
    },
    addNew () {
      this.dataSource.unshift(createOneUser(this.dataSource.length))
    },
    handleMenuClick (e) {
      if (e.key === 'delete') {
        this.remove()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 10px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
    button {
      margin-right: 10px;
    }
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
