<template>
  <div>
    <a-card
      class="table-card-box"
      :title="'结果展示: 符合条件的数据一共有' + pagination.total+'条'"
      style="margin-top: 10px"
      size="small"
    >
      <a-table
      :data-source="dataSource"
      :columns="columns"
      rowKey="id"
      :pagination="pagination">
      </a-table>
    </a-card>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ['condition'],
  data(){
    return {
      loading: false,
      dataSource: [
        {
          id: 0,
          account: '超级管理员',
          ip: '乌拉圭',
          create_date: '2020-11-11 12:00:00',
        },
        {
          id: 1,
          account: '市场管理员',
          ip: '小卖部',
          create_date: '2020-11-11 12:00:00',
        }

      ],
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ["10", "20", "30", "40", "50"],
        pageSize: 10,
        "show-size-changer": true,
      },
      columns: [
        {
          title: "登录账号",
          dataIndex: "account",
        },
        {
          title: "IP地址",
          dataIndex: "ip",
        },
        {
          title: "登录时间",
          dataIndex: "create_date",
        },
      ],
    }
  },
  methods: {
    search(){
      this.pagination.current = 1
      this.getList(this.pagination)
    },
    getList(pageData){
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      if(!pageData.export){
        pageData.export = 0;
      }
      if (conditionData.date[0]) {
        conditionData.start_time= moment(conditionData.date[0]).startOf('day').unix()
        conditionData.end_time= moment(conditionData.date[1]).endOf('day').unix()
      }
      // getList({page: pageData.current, page_size: pageData.pageSize, ...conditionData})
    },
  }
}
</script>

<style lang="less" scoped>

</style>