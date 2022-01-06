<template>
  <div>
    <a-card size="small">
    <span slot="title" style="line-height: 32px">
      {{`结果展示：共${pagination.total}条积分变化记录，共奖励积分${pagination.obtain}，共消耗积分${pagination.consume}`}}
    </span>
      <a-table
        :data-source="dataSource"
        :columns="columns"
        :pagination="pagination"
        rowKey="id"
        :loading="loading"
        @change="onTableChange">
        <template slot="created_at" slot-scope="text">
          {{moment.unix(text).format("YYYY-MM-DD HH:mm:ss")}}
        </template>
        <template slot="user" slot-scope="text, record">
          <div class="user">
            <a-avatar :src="record.avatar" :size="44"></a-avatar>
            <div class="user-msg">
              <p>{{record.nickname}}</p>
              <p>{{record.user_level}}</p>
            </div>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getAdminPlatformInteGralRecord } from '@/services/admin/platform/integral'
import moment from 'moment'
export default {
  props: ['condition'],
  data(){
    return {
      moment,
      loading: false,
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`,
        obtain: '',
        consume: ''
      },
      columns: [
        {
          title: "会员",
          dataIndex: "user",
          scopedSlots: { customRender: "user" },
        },
        {
          title: "积分变化",
          dataIndex: "amount",
        },
        {
          title: "变化后积分",
          dataIndex: "after_balance",
        },
        {
          title: "当前积分",
          dataIndex: "now_balance",
        },
        {
          title: "时间",
          dataIndex: "created_at",
          scopedSlots: { customRender: "created_at" },
        },
        {
          width: 150,
          title: "类型",
          dataIndex: "exec_type",
        },
        {
          title: "备注",
          dataIndex: "remarks",
        },
      ],
    }
  },
  created(){
    this.getList(this.pagination);
  },
  methods: {
    onTableChange(pagination){
      this.getList(pagination);
    },
    getList(pageData){
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      if (conditionData.date[0]) {
        conditionData.start_time= moment(conditionData.date[0]).startOf('day').unix()
        conditionData.end_time= moment(conditionData.date[1]).endOf('day').unix()
      }
      this.loading = true;
      getAdminPlatformInteGralRecord({page: pageData.current, page_size: pageData.pageSize, ...conditionData}).then(res => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          pageData.obtain = res.data.pages.obtain;
          pageData.consume = res.data.pages.consume;
          this.pagination = {...this.pagination, ...pageData}
        }
      }).finally(() => {
        this.loading = false;
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
}
</script>

<style lang="less" scoped>
.user{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .user-msg{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 44px;
    padding-left: 6px;
    p{
      margin-bottom: 0;
    }
  }
}
</style>