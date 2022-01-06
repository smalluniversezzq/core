<template>
  <div>
    <a-card size="small">
    <span slot="title" style="line-height: 32px">
      {{'结果展示: 符合条件的数据一共有' + pagination.total + '条'}}
    </span>
      <a-table
        :data-source="dataSource"
        :columns="columns"
        :pagination="pagination"
        rowKey="id"
        :loading="loading"
        @change="onTableChange">
        <template slot="is_read_title">
          <span>是否已读 </span>
          <a-tooltip placement="left" title="仅单个用户发送时有是否已读状态，仅站内通知已读才会标为已读">
            <byf-icon type="iconhelp" />
          </a-tooltip>
        </template>
        <template slot="type" slot-scope="text">
          {{typeList.filter(item => item.value == text)[0].name}}
        </template>
        <template slot="notification_object" slot-scope="text, record">
          <span v-if="record.target_user_uid == 0">
            {{record.level}}
          </span>
          <span v-else style="white-space: nowrap;">
            <span>会员名称：{{record.nickname}}</span>
            <br/>
            <span>会员ID：{{record.uid}}</span>
          </span>
        </template>
        <template slot="target_device" slot-scope="text, record">
          <span style="white-space: nowrap;" v-for="(item, index) in getDeviceType(record)" :key="item">
            {{item}} {{index == getDeviceType(record).length - 1 ? '' : '、'}}
          </span>
        </template>
        <template slot="is_read" slot-scope="text, record">
          <div style="text-algin:center" v-if="record.target_user_uid == 0">--</div>
          <div v-else>
            <span v-if="text == 1"><a-badge status="success" /> 已读</span>
            <span v-else><a-badge status="processing" /> 未读</span>
          </div>
        </template>
        <template slot="sent_time" slot-scope="text">
          {{moment.unix(text).format('YYYY/MM/DD HH:mm:ss')}}
        </template>
        <template slot="notice_type" slot-scope="text, record">
          <span style="white-space: nowrap;" v-show="record.is_site_notice == 1">站内通知</span>
          <span v-show="record.is_site_notice == 1 && record.is_push_notice == 1">、</span>
          <span style="white-space: nowrap;" v-show="record.is_push_notice == 1">推送通知</span>
        </template>
        <template slot="operate" slot-scope="text, record">
          <byf-button type="link" size="small" @click="platformMessageJournalDel(record)" >
            删除
          </byf-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getPlatformMessageJournal, PlatformMessageJournalDel } from '@/services/platformSetting'
import moment from 'moment'
export default {
  components: {
  },
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
        "show-total": total => `共 ${total} 条数据`
      },
      typeList: [
        {name: '系统通知', value: 1},
        {name: '订单通知', value: 2},
        {name: '消息互动', value: 3},
        {name: '资产通知', value: 4},
        {name: '活动优惠', value: 6},
      ],
      targetDeviceList: [
        {name: 'iOS', value: 'ios'},
        {name: '安卓', value: 'android'},
      ],
      columns: [
        {
          width: 100,
          title: "消息标题",
          dataIndex: "title",
        },
        {
          title: "消息内容",
          dataIndex: "content",
        },
        {
          width: 90,
          title: "消息类型",
          dataIndex: "type",
          scopedSlots: { customRender: "type" },
        },
        {
          title: "通知对象",
          dataIndex: "notification_object",
          scopedSlots: { customRender: "notification_object" },
        },
        {
          title: "通知终端",
          dataIndex: "target_device",
          scopedSlots: { customRender: "target_device" },
        },
        {
          title: "通知途径",
          dataIndex: "notice_type",
          scopedSlots: { customRender: "notice_type" },
        },
        {
          title: "发布时间",
          dataIndex: "sent_time",
          scopedSlots: { customRender: "sent_time" },
        },
        {
          width: 110,
          dataIndex: "is_read",
          scopedSlots: { customRender: "is_read", title: 'is_read_title' },
          slots: {title: 'is_read_title'}
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
    getDeviceType(record){
      let list = [];
      this.targetDeviceList.forEach(item => {
        record.target_device.forEach(value => {
          if(item.value == value){
            list.push(item.name)
          }
        })
      })
      return list;
    },
    // 删除日志
    platformMessageJournalDel(record) {
      this.$confirm({
        title: "提示",
        content: "确定删除这条日志吗?",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          // 修改用户状态
          return new Promise((resolve, reject) => {
            PlatformMessageJournalDel({id: record.id}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
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
    onTableChange(pagination){
      this.getList(pagination);
    },
    getList(pageData){
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      if(conditionData.notice_type != ''){
        conditionData[conditionData.notice_type] = 1;
        delete conditionData.notice_type
      }
      if(conditionData.date.length > 0){
        conditionData.send_time_start = moment(conditionData.date[0]).startOf('day').unix();
        conditionData.send_time_end = moment(conditionData.date[1]).endOf('day').unix();

        delete conditionData.date;
      }
      this.loading = true;
      getPlatformMessageJournal({page: pageData.current, page_size: pageData.pageSize, ...conditionData}).then(res => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
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

<style>

</style>