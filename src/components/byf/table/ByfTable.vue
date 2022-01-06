<template>
  <a-table
    v-bind="$props"
    :row-selection="byfRowSelection"
  >
    <!-- 头像部分 -->
    <div
      class="avatar"
      slot="avatar"
      slot-scope="text, record"
    >
      <img
        :src="text"
        alt=""
      >
      <div class="name">
        <span>{{record.nickname}}</span>
        <byf-icon
          :type="record.source_name=='抖音小程序'?'icondouyin':'iconweixin'"
          style="font-size:18px"
        ></byf-icon>
      </div>
    </div>
    <!-- 积分余额部分 -->
    <div
      class="balance"
      slot="balance"
      slot-scope="text, record"
    >
      <p>
        <span>积分: </span>
        <span>{{record.credit}}</span>
      </p>
      <p>
        <span>余额: </span>
        <span>{{record.balance}}</span>
      </p>
    </div>
    <!-- 成交订单 -->
    <div
      class="order_count"
      slot="order_count"
      slot-scope="text, record"
    >
      <p>
        <span>订单: </span>
        <span>{{record.order_count}}</span>
      </p>
      <p>
        <span>金额: </span>
        <span>{{record.money_count}}</span>
      </p>
    </div>
    <!-- 操作 -->
    <div
      slot="operator"
      class="operator"
    >
      <span>编辑</span>
      <span>订单</span>
    </div>
    <!-- 标签组 -->
    <div
      slot="group_name"
      class="group_name"
      slot-scope="text, record"
    >
      <template v-if="record.groups && record.groups.length>0">
        <span
          v-for="group in record.groups"
          :key="group.id"
        >{{group.group_name}}</span>
      </template>
      <template v-else>
        -
      </template>
    </div>
    <!-- 底部全选的功能 -->
    <div
      slot="footer"
      class="t-footer"
      v-if="selectable && footerBtns"
    >
      <byf-checkbox
        @change="onChange"
        :checked="checkAll"
        :indeterminate="indeterminate"
      ></byf-checkbox>
      <div class="f-btn-groups">
        <byf-button v-for="(item, index) in footerBtns" :key="'btn'+index" @click="onFooterBtnClick(item ,index)">{{item.title}}</byf-button>
      </div>
    </div>
  </a-table>                      
</template>
<script>
import { Table } from "ant-design-vue";
export default {
  props: {
    ...Table.props,
    /**
     * 底部批量操作按钮 配置数据
     * [{title: '按钮名'}]
     */
    footerBtns: {
      type: Array,
      required: false
    },
    /**是否 支持 选择 true：支持；false：不支持 */
    selectable: Boolean
  },
  data() {
    return {
      checkAll: false,
      selectedRowKeys: [],
      selectedRows: []
    };
  },
  created() {
  },
  methods: {
    onChange(e) {
      this.checkAll = e.target.checked;
      if (e.target.checked === true) {
        this.selectHandler(
          this.dataSource.map(item => {
            return item.key;
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
      // this.byfRowSelection.selectedRows = selectedRows;
    },
    onFooterBtnClick(btnItem, index){
      /**
       * 向外分发 底部按钮 点击事件
       * @param {any} btnItem 被点击按钮对应的配置数据
       * @param {any} index 被点击按钮的下标
       * @param {array} selectedRows 选中的行数据
       * @param {array} selectedRowKeys 选中的行的key
       */
      this.$emit('footerBtnClick', btnItem, index, this.selectedRows, this.selectedRowKeys)
    }
  },
  mounted() {
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
      if (this.selectable) {
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
      } else {
        return null
      }
    }
  }
};
</script>
<style lang="less" scoped>
.avatar {
  display: flex;
  > img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  > .name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
    > span {
      width: 100%;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 4px;
    }
  }
}
.balance,
.order_count {
  display: flex;
  flex-direction: column;
  justify-content: center;
  > p {
    margin-bottom: 8px;
    :last-child {
      color: #ff9900;
      font-size: 14px;
    }
  }
}

.operator {
  > span {
    cursor: pointer;
    color: #2d8cf0;
    &:last-child {
      margin-left: 10px;
    }
  }
}

.group_name {
  > span {
    color: #2d8cf0;
    background: #f0faff;
    margin-right: 10px;
    padding: 2px 8px;
    font-size: 12px;
  }
}

.t-footer {
  display: flex;
  align-items: center;
  > .f-btn-groups {
    margin-left: 40px;
    > button {
      margin-right: 10px;
    }
  }
}

/deep/.ant-table-thead > tr > th {
  background: white;
  font-weight: 700;
}

/deep/.ant-table-pagination.ant-pagination {
  text-align: center;
  float: none;
}

/deep/.ant-table-footer {
  background: white;
  border-bottom: 1px solid rgb(240, 240, 240);
}
</style>