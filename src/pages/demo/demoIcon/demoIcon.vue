<template>
  <a-row>
    <a-col :span="12">
      <byf-card title="矢量图标">
        <byf-card title="一般使用和 点击事件">
          <byf-icon type="iconweixin" @click="onClick"></byf-icon>
          <byf-icon type="icondouyin" @click="onClick"></byf-icon>
          <byf-icon type="icondianzan" @click="onClick"></byf-icon>
          <byf-icon type="iconzujian" @click="onClick"></byf-icon>
          <a-alert message="基于使用阿里图标库进行封装"></a-alert>
        </byf-card>
        <byf-card title="设置样式">
          <byf-icon type="iconweixin" style="color: red; font-size: 90px;"></byf-icon>
          <byf-icon type="icondouyin" style="color: red; font-size: 90px;"></byf-icon>
          <byf-icon type="icondianzan" style="color: red; font-size: 90px;"></byf-icon>
          <byf-icon type="iconzujian" style="color: red; font-size: 90px;"></byf-icon>
          <a-alert message="color属性对彩色图标无法生效"></a-alert>
        </byf-card>
        <byf-card title="spin 旋转动画">
          <byf-icon type="iconweixin" spin></byf-icon>
          <byf-icon type="icondouyin" spin></byf-icon>
          <byf-icon type="icondianzan" spin></byf-icon>
          <byf-icon type="iconzujian" spin></byf-icon>
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
      text1: '',
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'type', description: '图标名', type: 'string',default: ''},
        { key:'2', param: 'style', description: '设置图标的样式，例如 fontSize 和 color', type: 'CSSProperties',default: ''},
        { key:'3', param: 'spin', description: '是否有旋转动画', type: 'boolean',default: 'false'}
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'click', description: '点击事件', callBack: '(event) => void'}
      ]
    }
  },
  methods: {
    onClick(){
      this.$message.info('点击了图标')
    }
  }
}
</script>
<style lang="less" scoped>
.anticon {
  margin: 10px;
  font-size: 60px;
}
</style>