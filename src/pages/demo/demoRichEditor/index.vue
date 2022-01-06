<template>
  <a-row>
    <a-col :span="12">
      <a-card title="富文本">
        <rich-editor :content="content" @changelHtml="onChange"></rich-editor>
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
import RichEditor from '@/components/byf/richEditor/index.vue'
export default {
  components: {RichEditor},
  data(){
    return {
      content: '<p>上次保存的富文本。</p><p>要确保是正常的富文本格式。两边必须被html标签包裹着。</p>',
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'content', description: '预设富文本内容。要确保是正常的富文本格式。两边必须被html标签包裹着。', type: 'string',default: "-"},
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'changelHtml', description: '富文本变化事件', callBack: '(content) => {content:富文本内容}'}
      ]
    }
  },
  methods: {
    onChange(content){
      console.log('富文本输入了: ', content)
    }
  }
}
</script>
<style lang="less" scoped>
.ant-btn {
  margin: 0 10px;
}
</style>