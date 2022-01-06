<template>
  <a-card title="区域选择">
    <a-card title="演示">
      <a-button @click="getData">获取数据</a-button>
      <district-select ref="districtSelect" height="500" :list="testData"></district-select>
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
      <a-card title="方法" style="margin-top:10px;" :bodyStyle="{background: 'white'}">
        <a-table :columns="columns3" :dataSource="dataSource3" :pagination="false">
          <template slot="callBack" slot-scope="text">
            <pre>{{text}}</pre>
          </template>
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
import DistrictSelect from '@/components/byf/districtSelect'
import testData from './testData.json'
export default {
  components: {
    // eslint-disable-next-line
    DistrictSelect
  },
  data(){
    return {
      testData: testData,
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description', scopedSlots: { customRender: 'description' }, },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'list', description: '传入部分省市区数据', type: 'array',default: '[]'},
        { key:'2', param: 'height', description: '行政列表滚动区域的高度。不带单位时，默认单位为px,支持px和vh单位', type: '[string, number]',default: '400'},
      ],
      columns3: [
        { title: '名称', dataIndex: 'methodName', width: 100, fixed: 'left' },
        { title: '描述', dataIndex: 'description', width: 200 },
        { title: '传参', dataIndex: 'params', scopedSlots: { customRender: 'normal-text' }, width: 100 },
        { title: '返回值', dataIndex: 'callBack', scopedSlots: { customRender: 'callBack' }, }
      ],
      dataSource3: [
        { key:'1', methodName: 'getData', description: '拿取已选区域的数据', 
          callBack: `例:
          [
            {
              "code":"11",
              "name":"北京市",
              /**
               * 三种选中状态：
               * 0：完全未选中（自己和子元素没有一个被选中）。
               * 1：半选中（自己未选中，部分子元素被选中，部分子元素未选中）。
               * 2：完全选中（自己和子元素都被选中）
              */
              "selectedStatus": 1, 
              "children":[
                {
                  "code":"1101",
                  "name":"市辖区",
                  "selectedStatus": 1, 
                  "children":[
                    {
                      "code":"110101",
                      "selectedStatus": 2,
                      "name":"东城区"
                    }
                  ]
                }
              ]
            }
          ]`
        },
      ],
    }
  },
  created(){
    console.time()
  },
  mounted(){
    console.timeEnd()
  },
  methods: {
    getData(){
      console.log(this.$refs.districtSelect.getData())
    }
  }
}
</script>
<style lang="less" scoped>
</style>