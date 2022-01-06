ll<template>
  <a-row>
    <a-col :span="12">
      <byf-card title="级联选择">
        <byf-card title="普通">
          <byf-cascader :options="options" :fieldNames="{label: 'name', value:'code', children: 'children'}" placeholder="请选择" @change="onChange"/>
        </byf-card>
        <byf-card title="v-model 双向绑定">
          <byf-cascader :options="options" v-model="addressData" :fieldNames="{label: 'name', value:'code', children: 'children'}" placeholder="请选择" @change="onChange"/>
          <a-alert :message="addressData.join()"></a-alert>
        </byf-card>
        <byf-card title="禁用">
          <byf-cascader :options="options1" placeholder="请选择" disabled/>
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
import Address from '@/assets/address.json'

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
        { key:'1', param: 'options', description: '可选项数据源', type: 'object',default: ''},
        { key:'2', param: 'placeholder', description: '输入框占位文本', type: 'string',default: 'Please select'},
        { key:'3', param: 'allowClear', description: '是否支持清除', type: 'boolean',default: 'true'},
        { key:'4', param: 'disabled', description: '禁用', type: 'boolean',default: 'false'},
        { key:'5', param: 'fieldNames', description: '自定义 options 中 label name children 的字段', type: 'object',default: "{ label: 'label', value: 'value', children: 'children' }"}
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'change', description: '选择完成后的回调', callBack: '(value, selectedOptions) => void'}
      ],
      options: Address,
      addressData: ['11'],
      options1: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ]
    }
  },
  methods: {
    onChange( value,addressObj, selectedOptions) {
      console.log('addressObj: ', addressObj)
      console.log('value: ', value)
      this.$message.info('选中的值：'+value+'; '+ JSON.stringify(selectedOptions))
    },
  }
}
</script>
<style lang="less" scoped>
</style>