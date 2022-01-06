<template>
  <div>
    <a-card
      class="table-card-box"
      :title="'结果展示: 符合条件的数据一共有' + pagination.total+'条'"
      style="margin-top: 10px"
      size="small"
    >
      <template slot="extra">
        <div class="table-extra">
          <byf-button type="primary" @click="toAddOrEditor">添加版本</byf-button>
        </div>
      </template>
      <a-table
      :data-source="dataSource"
      :columns="columns"
      rowKey="id"
      :pagination="pagination">
        <template slot="device_type"  slot-scope="text">
          <a-tag style="border-radius: 20px;" :color="text == 0 ? '#108ee9' : '#87d068'">
            {{text == 0 ? '安卓' : '苹果'}}
          </a-tag>
        </template>
        <template slot="download_type"  slot-scope="text">
          <a-tag style="border-radius: 20px;" :color="text == 0 ? '#108ee9' : '#87d068'">
            {{text == 0 ? '直接下载' : '跳转下载'}}
          </a-tag>
        </template>
        <template slot="force_update"  slot-scope="text">
          <a-tag style="border-radius: 20px;" :color="text == 0 ? '#108ee9' : '#87d068'">
            {{text == 0 ? '否' : '是'}}
          </a-tag>
        </template>
        <template slot="operate" slot-scope="text, record">
          <a-space>
            <a-button type="primary" size="small" @click="editor(record)">
              <byf-icon type="iconbianji"></byf-icon>
            </a-button>
            <a-button type="danger" size="small" @click="editor(record)">
              <byf-icon type="iconshanchu"></byf-icon>
            </a-button>
          </a-space>
        </template>
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
          device_type: 0,
          version: '3.4.1',
          versioncode: 25,
          downloadurl: 'www.baidu.com',
          download_type: 0,
          force_update: 0,
          create_date: '2020-11-12',
        },
        {
          id: 1,
          device_type: 1,
          version: '3.4.1',
          versioncode: 25,
          downloadurl: 'www.baidu.com',
          download_type: 1,
          force_update: 1,
          create_date: '2020-11-12',
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
          title: "设备类型",
          dataIndex: "device_type",
          scopedSlots: { customRender: "device_type" },
        },
        {
          title: "版本号",
          dataIndex: "version",
        },
        {
          title: "versioncode",
          dataIndex: "versioncode",
        },
        {
          title: "下载地址",
          dataIndex: "downloadurl",
        },
        {
          title: "下载类型",
          dataIndex: "download_type",
          scopedSlots: { customRender: "download_type" },
        },
        {
          title: "强制更新",
          dataIndex: "force_update",
          scopedSlots: { customRender: "force_update" },
        },
        {
          title: "创建时间",
          dataIndex: "create_date",
        },
        {
          title: "操作",
          key: 'operate',
          scopedSlots: { customRender: "operate" },
        },
      ],
    }
  },
  methods: {
    toAddOrEditor(){
      this.$router.push({
        name:'appVersionsAddOrEditor',
      })
    },
    editor(record){
      console.log(record)
    },
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