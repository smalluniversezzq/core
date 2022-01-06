<template>
    <a-row>
      <a-col :span="12">
        <a-card title="时间选择器">
          <a-card title="时分秒">
            <byf-time-picker v-model="time1"/>
            <a-alert :message="time1 && time1.format('H:mm:ss')" style="margin-top:10px;" />
          </a-card>
          <a-card title="时分">
            <byf-time-picker v-model="time2" format="H:m"/>
            <a-alert :message="time2 && time2.format('H:mm')" style="margin-top:10px;" />
          </a-card>
        </a-card>
      </a-col>
      <a-col :span="12">
        <byf-card title="API">
          <byf-card title="属性">
            <byf-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
              <span slot="type" slot-scope="text" style="color: #c41d7f;">1{{text}}</span>
            </byf-table>
          </byf-card>
          <byf-card title="事件" style="margin-top:10px;">
            <byf-table :columns="columns2" :dataSource="dataSource2" :pagination="false">

            </byf-table>
          </byf-card>
        </byf-card>
      </a-col>
    </a-row>
</template>
<script>
import moment from 'moment'
export default {
  name: 'demoTimePicker',
  data(){
    return { 
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'v-model', description: '时间', type: 'moment',default: ''},
        { key:'2', param: 'format', description: '展示的时间格式', type: 'string',default: 'HH:mm:ss'}
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'change', description: '时间发生变化的回调', callBack: 'function(time: moment | string, timeString: string): void'}
      ],
      time1: moment(),
      time2: moment()
    }
  }
}
</script>