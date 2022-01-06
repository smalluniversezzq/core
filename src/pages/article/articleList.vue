<template>
  <div class="article-list">
    <byf-card>
      <div class="article-header">
        <div class="left">
          <byf-button type="primary">+添加文章</byf-button>
        </div>
        <a-form
          class="article-search"
          layout="inline"
        >
          <a-form-item label="关键词">
            <a-input placeholder="请输入关键词"></a-input>
          </a-form-item>
          <a-form-item label="状态">
            <a-select
              style="width:160px"
              default-value="0"
            >
              <a-select-option value="0">全部</a-select-option>
              <a-select-option value="1">显示</a-select-option>
              <a-select-option value="2">隐藏</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <byf-button type="primary">搜索</byf-button>
          </a-form-item>
          <a-form-item>
            <byf-button type="link">重置</byf-button>
          </a-form-item>
        </a-form>
      </div>
    </byf-card>
    <byf-card>
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :row-selection="rowSelection"
      >
        <template
          slot="link"
          slot-scope="text"
        >
          <byf-button
            v-if="text"
            type="link"
            @click="openUrl(text)"
            style="padding:0;"
          >{{text}}</byf-button>
          <template v-else>-</template>
        </template>
        <template
          slot="status"
          slot-scope="text"
        >
          <a-tag
            v-if="text == 0"
            color="pink"
          >显示</a-tag>
          <a-tag
            v-else-if="text == 1"
            color="cyan"
          >隐藏</a-tag>
        </template>
        <template
          slot="createTime"
          slot-scope="text"
        >
          {{format(text, 'yyyy年M月d日')}}
        </template>
        <template
          slot="operate"
          slot-scope="text, record"
        >
          <byf-button
            type="link"
            size="small"
            @click="hideOne(record)"
            style="padding-left:0;"
          >隐藏</byf-button>
          <byf-button
            type="link"
            size="small"
            @click="hideOne(record)"
          >编辑</byf-button>
          <byf-button
            type="link"
            size="small"
          >删除</byf-button>
        </template>
      </a-table>
    </byf-card>
  </div>
</template>
<script>
import ByfButton from "@/components/byf/button/ByfButton";
import { format } from "date-fns/esm";
export default {
  name: "articleList",
  components: { ByfButton },
  data() {
    return {
      columns: [
        { dataIndex: "sort", key: "sort", title: "排序" },
        { dataIndex: "title", key: "title", title: "标题" },
        {
          dataIndex: "link",
          key: "link",
          title: "链接",
          scopedSlots: { customRender: "link" }
        },
        {
          dataIndex: "createTime",
          key: "createTime",
          title: "创建时间",
          scopedSlots: { customRender: "createTime" }
        },
        {
          dataIndex: "status",
          key: "status",
          title: "状态",
          scopedSlots: { customRender: "status" }
        },
        {
          dataIndex: "operate",
          key: "operate",
          title: "操作",
          scopedSlots: { customRender: "operate" }
        }
      ],
      data: [
        {
          id: 1,
          sort: "0",
          title: "文章1",
          link: "http://www.baidu.com",
          status: 0,
          createTime: 1599215062334
        },
        {
          id: 2,
          sort: "0",
          title: "文章2",
          link: "",
          status: 1,
          createTime: 1599215062334
        },
        {
          id: 3,
          sort: "0",
          title: "文章3",
          link: "http://www.baidu.com",
          status: 0,
          createTime: 1599215062334
        },
        {
          id: 4,
          sort: "0",
          title: "文章4",
          link: "http://www.baidu.com",
          status: 1,
          createTime: 1599215062334
        }
      ],
      rowSelection: {}
    };
  },
  methods: {
    openUrl(url) {
      window.open(url);
    },
    hideOne(record) {
      record.status = Math.abs(record.status - 1);
    },
    format
  }
};
</script>
<style lang="less" scoped>
.article-header {
  display: flex;
  justify-content: space-between;
}
</style>