<template>
  <a-card title="多规格组件">
    <a-card title="演示">
      <a-button style="margin-bottom:10px;" @click="getMultiSpecs">拿多规格组件的值</a-button>
      <a-button @click="onBtnClick">验证必填</a-button>
      <byf-multi-specs ref="multiSpecs" :dataSource="dataSource" specsNumLimit="3" :batchOptions="batchOptions" @specsChange="onSpecsChange"></byf-multi-specs>
    </a-card>
    
    <a-card title="API" class="api-card">
      <a-card title="属性" :bodyStyle="{background: 'white'}">
        <a-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
          <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
          <template slot="description" slot-scope="text">
            <pre>{{text}}</pre>
          </template>
        </a-table>
      </a-card>
      <a-card title="事件" style="margin-top:10px;" :bodyStyle="{background: 'white'}">
        <a-table :columns="columns2" :dataSource="dataSource2" :pagination="false"></a-table>
      </a-card>
      <a-card title="方法" style="margin-top:10px;" :bodyStyle="{background: 'white'}">
        <a-table :columns="columns3" :dataSource="dataSource3" :pagination="false">
          <!-- 普通的文本 -->
          <template slot="normal-text" slot-scope="text">
            {{ text ? text : "-" }}
          </template>
        </a-table>
      </a-card>
    </a-card>
  </a-card>
</template>
<script>
import dataJson from './test.json'
console.log('dataJSON: ', dataJson)
export default {
  data(){
    return {
      dataSource: dataJson,
      batchOptions: [
        {key:'prime_price', title: '成本价(元)', value: null, type: 'number', unRequire: false, maxLength: 5},
        {key:'line_price', title: '划线价(元)', value: null, type: 'number', unRequire: false, maxLength: 10},
        {key:'price', title: '售卖价(元)', value: null, type: 'number', unRequire: false, maxLength: 10},
        {key:'stock', title: '库存', value: null, type: 'number', unRequire: false, maxLength: 10},
        {key:'code', title: '商品编码', value: null, unRequire: true},
        {key:'bar_code', title: '商品条码', value: null, maxLength: 10},
        {key:'weight', title: '重量(g)', value: null, type: 'number', unRequire: true, maxLength: 10}
      ],
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description', scopedSlots: { customRender: 'description' }, },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'dataSource', description: '后端传来的多规格数据', type: 'object',default: '{spec:[ ],option:[ ]}'},
        { key:'2', param: 'specsNumLimit', description: '规格类型的数量限制 默认3种规格类型', type: 'Number | String',default: '3'},
        { key:'3', param: 'batchOptions', description: `配置 批量设置的键名、标题、默认值、输入类型。
        例如：[
          {key:'prime_price', title: '成本价(元)', value: null, type: 'number', unRequire: false,, maxLength: 5},
          {key:'line_price', title: '划线价(元)', value: null, type: 'number', unRequire: false,, maxLength: 5},
          {key:'price', title: '售卖价(元)', value: null, type: 'number', unRequire: false,, maxLength: 5},
          {key:'stock', title: '库存', value: null, type: 'number', unRequire: false,, maxLength: 5},
          {key:'code', title: '商品编码', value: null, unRequire: false,, maxLength: 5},
          {key:'bar_code', title: '商品条码', value: null, unRequire: false,, maxLength: 5},
          {key:'weight', title: '重量(g)', value: null, type: 'number', unRequire: false,, maxLength: 5}
        ]`, type: 'Array',default: '-'},
        { key:'4', param: 'batchOptions[index].unRequire', description: '是否非必填，true则为非必填', type: 'Boolean',default: 'false'},
        { key:'5', param: 'batchOptions[index].maxLength', description: '输入长度限制，包含特殊字符', type: 'Number',default: '-'},
        
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'specsChange', description: '规格类型和规格值变化时的回调', callBack: 'function(specsData)'}
      ],
      columns3: [
        { title: '名称', dataIndex: 'methodName' },
        { title: '描述', dataIndex: 'description' },
        { title: '传参', dataIndex: 'params', scopedSlots: { customRender: 'normal-text' }, },
        { title: '返回值', dataIndex: 'callBack' }
      ],
      dataSource3: [
        { key:'1', methodName: 'getMultiSpecsData', description: '拿取多规格组件的数据', callBack: '{spec: 规格数据,option:表格输入数据}'},
        { key:'2', methodName: 'validate', description: '校验表格输入的必填项', callBack: 'true：已全填。false：有漏填项。'}
      ],
    }
  },
  methods: {
    getMultiSpecs(){
      console.log(this.$refs.multiSpecs.getMultiSpecsData())
    },
    /**
     * 规格类型或值 变化的事件
     * @param [Array] specsData
     */
    onSpecsChange(specsData){
      console.log(specsData)
    },
    onBtnClick(){
      let pass = this.$refs.multiSpecs.validate()
      this.$message.info('验证'+(pass?'通过':'不通过'))
    }
  }
}
</script>
<style lang="less" scoped>
.api-card {
  /deep/ .ant-card-body {
    background: @layout-body-background;
  }
}
</style>