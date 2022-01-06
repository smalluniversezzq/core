<template>
  <a-row>
    <a-col :span="12">
      <byf-card title="日期选择器">
        <byf-card title="选择某日">
          <byf-date-picker v-model="date1" @change="onChange"></byf-date-picker>
          <a-alert :message="date1 && date1.toString()"></a-alert>
        </byf-card>
      </byf-card>
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
export default {
  data(){
    return {
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'v-model', description: '日期', type: 'moment',default: ''}
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'change', description: '时间发生变化的回调', callBack: 'function(date: moment | string, dateString: string)'}
      ],
      date1: null
    }
  },
  methods: {
    onChange(date, dateString){
      console.log(date, dateString)
    }
  }
}
</script>
<style lang="less" scoped>
</style>