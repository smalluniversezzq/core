 <!--条件升级-->
<template>
  <div class="GiftPackUpgrade">
    <a-form-model
      ref="from"
      :rules="rules"
      :model="formData"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        label="付费模式"
      >
        <a-radio-group :options="stateOptions" v-model="formData.conditionState" @change="conditionchange">
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="礼包商品"
      >
        <div class='helps-reletive'>
          <div class='bg toggle-box1 ' >
            <a-tabs default-active-key="1" @change="callback">
              <a-tab-pane key="1" tab="分类1">
                <a-table
                :columns="columns" 
                :data-source="data"
                >
                <template slot="updated_at" slot-scope="record,text">
                  {{record}}{{text}}
                </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="2" tab="分类2" force-render>
                Content of Tab Pane 2
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>
<script>
const columns = [
  {
    title:"排序",
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '商品',
    dataIndex: 'order',
    scopedSlots: { customRender: 'order' },
  },
  {
    title: '价格',
    // dataIndex: 'price',
    key: 'price',
    scopedSlots: { customRender: 'price' },
  },
  {
    title: '销量/库存',
    key: 'sales',
    scopedSlots: { customRender: 'sales' },
  },
  {
    title: '权益类型',
    key: 'rights_type',
    dataIndex: 'rights_type',
  },
  {
    title: '赠送内容',
    key: 'giveContent',
    dataIndex: 'giveContent',
  },
  {
    title: '创建时间',
    key: 'create_at',
    dataIndex: 'create_at',
  },
];
const data = [
  {
    sort: '1',
    title: '我是标题',
    pic: 'https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210222/97fbe8a39c2bf0034cd230ee4b27da7d60331dd044809.png',
    sales: 32,
    salese: 32,
    price: '200',
    rights_type: '升级权益',
    giveContent: '399成长值',
    create_at: '2021-3-1',
  },
];
// import { 
//   AdminUserUserlevelAdd,
//   AdminUserUserlevelEdit
//   } from '@/services/platform/vips.js'
// import { cloneDeep } from 'lodash'
export default {
  name:"basicInfo",
  components:{
  },
  props:{
  },

  data(){
    return {
      rules:{
      },
      columns,
      data,
      formData:{
        conditionState:"1",
        order:"1",
        limitTime:"0",
        StatisticalType:"0",
        numValue:"10",
        display_content :"10",
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      stateOptions:[
        {label:"开启",value:"1"},
        {label:"关闭",value:"0"},
      ],
      timeOptions:[
        {label:"不限时间",value:"0"},
        {label:"近30天",value:"1"},
        {label:"近60天",value:"2"},
        {label:"近90天",value:"3"},
        {label:"近180天",value:"4"},
      ],
      StatisticalType:[
        {label:"订单金额",value:"0"},
        {label:"订单数量",value:"1"},
      ],

    }
  },
  created(){
  },
  mounted(){
  },
  methods:{
    conditionchange(e){
      console.log(e.target.value)
    },
    zgddchange(e){
      console.log(e)
    },
    xzsjchange(e){
      console.log(e)
    },
    tjlxchange(e){
      console.log(e)
    },
  },
}
</script>
<style scoped lang="less" >
  .conditionUpgrade{

  }
  .helps-reletive{
    position: relative;
  }
  .toggle-box1{
    padding:20px 20px 20px 0px;
  }
</style>