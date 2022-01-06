<template>
  <div class="article-list">
    <byf-card>
      <byf-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        :footerBtns="footerBtns"
        :selectable="true"
        @footerBtnClick="onFooterBtnClick"
      >
      </byf-table>
    </byf-card>
  </div>
</template>

<script>
const columns = [
  {
    title: "会员",
    dataIndex: "avatar",
    scopedSlots: { customRender: "avatar" },
    width: "16%"
  },
  {
    title: "会员等级",
    dataIndex: "level_name"
  },
  {
    title: "标签组",
    dataIndex: "group_name",
    scopedSlots: { customRender: "group_name" }
  },
  {
    title: "注册时间",
    dataIndex: "create_time"
  },
  {
    title: "积分/余额",
    dataIndex: "balance",
    scopedSlots: { customRender: "balance" }
  },
  {
    title: "成交",
    dataIndex: "order_count",
    scopedSlots: { customRender: "order_count" }
  },
  {
    title: "优惠券",
    dataIndex: "coupon_count"
  },
  {
    title: "操作",
    dataIndex: "operator",
    scopedSlots: { customRender: "operator" }
  }
];

import { getUserList } from "@/services/table";
export default {
  data() {
    return {
      data: [],
      columns,
      pagination: {
        total: 30,
        showTotal: total => {
          return `总 ${total} 条`;
        },
        showSizeChanger: true,
        showQuickJumper: true
      },
      footerBtns: [
        {'title': '设置黑名单'},
        {'title': '取消黑名单'},
        {'title': '修改分组'},
        {'title': '修改等级'}
      ]
    };
  },
  created() {
    this.getDataList();
  },

  methods: {
    getDataList() {
      getUserList({ page: 1}).then(res => {
        if (res.code == 200) {
          res.data.list.forEach(element => {
            element.key = element.id;
          });
          this.data = res.data.list;
        }
      });
    },
    /**
     * 表单底部按钮被点击
     */
    onFooterBtnClick(btnItem, index, selectedRows, selectedRowKeys){
      console.log('onFooterBtnClick',btnItem, index, selectedRows, selectedRowKeys)
    }
  }
};
</script>