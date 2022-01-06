<template>
  <a-row>
    <a-col :span="12">
      <a-card title="按钮">
        <byf-card title="不同的type类型">
          <byf-button type="primary">Primary</byf-button>
          <byf-button>Default</byf-button>
          <byf-button type="dashed">Dashed</byf-button>
          <byf-button type="danger">Danger</byf-button>
          <byf-button type="link">Danger</byf-button>
        </byf-card>
        <byf-card title="disabled 状态">
          <byf-button type="primary" disabled>Primary</byf-button>
          <byf-button disabled>Default</byf-button>
          <byf-button type="dashed" disabled>Dashed</byf-button>
          <byf-button type="danger" disabled>Danger</byf-button>
          <byf-button type="link" disabled>Danger</byf-button>
        </byf-card>
        <byf-card title="loading 状态">
          <byf-button type="primary" loading>Primary</byf-button>
          <byf-button loading>Default</byf-button>
          <byf-button type="dashed" loading>Dashed</byf-button>
          <byf-button type="danger" loading>Danger</byf-button>
          <byf-button type="link" loading>Danger</byf-button>
        </byf-card>
        <byf-card title="size 按钮大小">
          <byf-button type="primary" size="small">samll</byf-button>
          <byf-button type="primary">default</byf-button>
          <byf-button type="primary" size="large">large</byf-button>
        </byf-card>
        <byf-card title="点击事件">
          <byf-button type="primary" @click="$message.info('点击按钮')">点击事件</byf-button>
        </byf-card>
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
        { key:'1', param: 'type', description: '设置按钮类型，可选值为 primary dashed danger link 或者不设', type: 'string',default: 'default'},
        { key:'2', param: 'disabled', description: '按钮失效状态		', type: 'boolean',default: 'false'},
        { key:'3', param: 'loading', description: '设置按钮载入状态', type: 'boolean',default: 'false'},
        { key:'4', param: 'size', description: '设置按钮大小，可选值为 small large 或者不设', type: 'string',default: 'default'}
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'click', description: '点击按钮时的回调', callBack: '(event) => void'}
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.ant-btn {
  margin: 0 10px;
}
</style>