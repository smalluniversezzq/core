<template>
  <a-row>
    <a-col :span="12">
      <a-card title="多行输入框 ByfTextarea">
        <a-card title="带移除图标的多行输入框">
          <byf-textarea v-model="text1" allow-clear rows="3" placeholder="请输入文字"/>
          <a-alert :message="`上面输入框的值：${text1}`"></a-alert>
        </a-card>
      </a-card>
    </a-col>
    <a-col :span="12">
      <byf-card title="API">
        <byf-card title="属性">
          <byf-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
            <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
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
      text1: '',
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'v-model', description: '输入框内容', type: 'string',default: ''},
        { key:'2', param: 'allowClear', description: '可以点击清除图标删除内容	', type: 'boolean',default: ''},
        { key:'3', param: 'rows', description: '规定 textarea 的可见高度	', type: 'string|number',default: '2'},
        { key:'4', param: 'placeholder', description: '规定描述文本区域预期值的简短提示。', type: 'string',default: ''}
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'change', description: '输入框内容变化时的回调', callBack: 'function(e)'}
      ]
    }
  }
}
</script>