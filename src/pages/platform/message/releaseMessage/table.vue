<template>
  <div>
    <a-card size="small">
      <template slot="title">
          <a-tabs v-model="noTitleKey" :animated="false" @change="onTabChange">
            <template slot="tabBarExtraContent">
              <a-button type="primary" @click="toAddOrEdit">创建新消息</a-button>
            </template>
            <a-tab-pane style="padding-bottom: 10px" v-for="item in tabList" :key="item.key" :tab="item.tab"></a-tab-pane>
          </a-tabs>
      </template>
      
      <a-table
        :scroll="{ x: 1000 }"
        :data-source="dataSource"
        :columns="columns"
        :pagination="pagination"
        rowKey="id"
        :loading="loading"
        @change="onTableChange">
        <template slot="type" slot-scope="text, record">
          <span v-show="record.type == 1">系统通知</span>
          <span v-show="record.type == 6">活动优惠</span>
        </template>
        <template slot="title-wrap" slot-scope="text">
          <a-tooltip>
            <template slot="title">
              {{text}}
            </template>
            <div class="text-overflow-2">{{text}}</div>
          </a-tooltip>
        </template>
        <template slot="content" slot-scope="text">
          <a-tooltip>
            <template slot="title">
              {{text}}
            </template>
            <div class="text-overflow-2">{{text}}</div>
          </a-tooltip>
        </template>
        <template slot="remark" slot-scope="text">
          <a-tooltip>
            <template slot="title">
              {{text}}
            </template>
            <div class="text-overflow-2">{{text}}</div>
          </a-tooltip>
        </template>
        <template slot="notice_type" slot-scope="text, record">
          <span v-show="record.is_site_notice == 1">站内通知</span>
          <span v-show="record.is_site_notice == 1 && record.is_push_notice == 1">、</span>
          <span v-show="record.is_push_notice == 1">推送通知</span>
        </template>
        <template slot="created_at" slot-scope="text, record">
          {{moment.unix(record.created_at).format("YYYY-MM-DD HH:mm:ss")}}
        </template>
        <!-- 定时发布时间 -->
        <template slot="send_time" slot-scope="text, record">
          {{moment.unix(record.send_time).format("YYYY-MM-DD HH:mm:ss")}}
        </template>
        <!-- 已发布时间 -->
        <template slot="sent_time" slot-scope="text, record">
          {{moment.unix(record.sent_time).format("YYYY-MM-DD HH:mm:ss")}}
        </template>
        <template slot="send_type" slot-scope="text, record">
          <span v-if="record.send_type == 2">定时发布</span>
          <span v-else>直接发布</span>
        </template>
        <template slot="operate" slot-scope="text, record">
          <byf-button 
          v-show="noTitleKey == 3 || noTitleKey == 2" 
          type="link" size="small" 
          @click="toAddOrEdit(record)" >
            编辑
          </byf-button>
          <byf-button 
          v-show="noTitleKey == 3" 
          type="link" size="small" 
          @click="toRelease(record)" >
            发布
          </byf-button>
          <byf-button 
          v-show="noTitleKey == 2" 
          type="link" size="small"
          @click="toRelease(record)" >
            现在发布
          </byf-button>
          <byf-button 
          v-show="noTitleKey == 1" 
          type="link" size="small" 
          @click="toAddOrEdit(record)" >
            查看
          </byf-button>
          <!-- <byf-button 
          v-show="noTitleKey == 1" 
          type="link" size="small" 
          @click="toRelease(record)" >
            重新发布
          </byf-button> -->
          <byf-button type="link" size="small" @click="platformMessageDel(record)">删除</byf-button>
        </template>
      </a-table>
    </a-card>
    <add-or-edit ref="addOrEdit" @confirm="addOrEditOk"></add-or-edit>
  </div>
</template>

<script>
import moment from 'moment'
import addOrEdit from "./addOrEdit";
import { platformMessageList, platformMessageSend, platformMessageDel } from '@/services/platformSetting'

export default {
  components: {
    addOrEdit
  },
  props: ['condition'],
  data(){
    return {
      moment: moment,
      tabList: [
        {key: '3', tab: '预发布消息'},
        {key: '2', tab: '定时发布消息'},
        {key: '1', tab: '已发布消息'},
      ],
      noTitleKey: '3',
      loading: false,
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ["10", "20", "30", "40", "50"],
        pageSize: 10,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      }
    }
  },
  computed:{
    columns(){
      let columns = [];
      // 预发布
      let title = {
          title: "消息标题",
          dataIndex: "title",
          scopedSlots: { customRender: "title-wrap" },
      }
      let content = {
        title: "消息内容",
        dataIndex: "content",
        scopedSlots: { customRender: "content" },
      }
      let type = {
        title: "消息类型",
        dataIndex: "type",
        scopedSlots: { customRender: "type" },
      }
      let notice_type = {
        title: "通知途径",
        dataIndex: "notice_type",
        scopedSlots: { customRender: "notice_type" },
      }
      let remark = {
        title: "备注",
        dataIndex: "remark",
        scopedSlots: { customRender: "remark" },
      }
      let operate = {
        title: "操作",
        scopedSlots: { customRender: "operate" },
      }
      let preColumns = [
        title,
        content,
        type,
        notice_type,
        {
          width: 170,
          title: "创建时间",
          dataIndex: "created_at",
          scopedSlots: { customRender: "created_at" },
        },
        remark,
        operate,
      ]
      // 定时发布
      let regularRelease = [
        title,
        content,
        type,
        notice_type,
        {
          width: 170,
          title: "定时发布时间",
          dataIndex: "send_time",
          scopedSlots: { customRender: "send_time" },
        },
        remark,
        operate,
      ]
      // 已发布
      let published = [
        title,
        content,
        type,
        notice_type,
        {
          width: 170,
          title: "发布时间",
          dataIndex: "sent_time",
          scopedSlots: { customRender: "sent_time" },
        },
        {
          width: 110,
          title: "发布方式",
          dataIndex: "send_type",
          scopedSlots: { customRender: "send_type" },
        },
        remark,
        operate,
      ]
      if(this.noTitleKey == 3){
        columns = preColumns;
      }else if(this.noTitleKey == 2){
        columns = regularRelease;
      }else{
        columns = published;
      }
      
      return columns
    }
  },
  created(){
    this.getList(this.pagination)
  },
  methods:{
    addOrEditOk(params){
      console.log(params)
      if(params.sendType != this.noTitleKey){
        this.onTabChange(params.sendType + '')
      }else{
        this.search()
      }
    },
    platformMessageDel(data){
       this.$confirm({
        title: "提示",
        content: "确定删除此消息吗?删除后不可恢复",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          // 修改用户状态
          return new Promise((resolve, reject) => {
            platformMessageDel({id: data.id}).then(res => {
              resolve();
              if(res.code == 200){
                console.log(this.dataSource.length)
                this.$message.success(res.msg);
                if(this.dataSource.length == 1 && this.pagination.current > 1){
                  this.pagination.current -= 1
                }
                this.search();
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
    toRelease(data){
      this.$confirm({
        title: "提示",
        content: "确定发布此消息吗?",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          // 修改用户状态
          return new Promise((resolve, reject) => {
            platformMessageSend({msg_id: data.id}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                if(this.dataSource.length == 1 && this.pagination.current > 1){
                  this.pagination.current -= 1
                }
                this.search();
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
    toAddOrEdit(data){
      this.$refs.addOrEdit.showModalAction(data);
    },
    onTabChange(key){
      this.pagination.current = 1 
      this.noTitleKey = key;
      this.$emit('onTabChange', key);
    },
    onTableChange(pagination){
      this.getList(pagination);
    },
    /**
     * 搜索
     */
    search(){
      // this.pagination.current = 1 // 测试要求操作完只刷新当前页数据，不回到第一页
      this.getList(this.pagination)
    },
    getList(pageData){
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      // 创建时间处理为时间戳
      if (conditionData.date[0]) {
        conditionData.start_at= moment(conditionData.date[0]).startOf('day').unix()
        conditionData.end_at= moment(conditionData.date[1]).endOf('day').unix()
      }
      // 定时发布时间处理为时间戳
      if (conditionData.sendDate[0]) {
        conditionData.send_time_start= moment(conditionData.sendDate[0]).startOf('day').unix()
        conditionData.send_time_end= moment(conditionData.sendDate[1]).endOf('day').unix()
      }
      // 发布时间（已发布）处理为时间戳
      if (conditionData.sentDate[0]) {
        conditionData.sent_time_start= moment(conditionData.sentDate[0]).startOf('day').unix()
        conditionData.sent_time_end= moment(conditionData.sentDate[1]).endOf('day').unix()
      }
      // 处理通知途径
      if(conditionData.notice_type != ''){
        conditionData[conditionData.notice_type] = 1
      }
      // 处理send_type（发布类型）和is_send（是否已发送）
      let is_send = 0;
      let send_type = 0;
      if(this.noTitleKey == 1){
        // 已发布消息时
        is_send = 1;
        console.log(conditionData.sent_type)
        if(conditionData.sent_type === ''){
          send_type = [1,2,3];
        }else if(conditionData.sent_type === 0){
          send_type = [1,3];
        }else{
          send_type = [2];
        }
      }else if(this.noTitleKey == 3) {
        // 预发布和立即发布状态的，未发布消息
        send_type = [1,3];
      }else{
        send_type = this.noTitleKey;
      }
      // 删除其他无用字段
      delete conditionData.notice_type;
      delete conditionData.sent_type;
      this.loading = true;
      platformMessageList({page: pageData.current, page_size: pageData.pageSize, ...conditionData, send_type, is_send}).then(res => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          pageData.total = +res.data.pages.total;
          this.pagination = {...this.pagination, ...pageData}
        }
      }).finally(() => {
        this.loading = false;
      })
    },
  },
}
</script>

<style scoped lang="less">
/deep/.ant-tabs-nav{
  padding-bottom: 8px;
}
/deep/.ant-card-head{
  border: none;
}
</style>