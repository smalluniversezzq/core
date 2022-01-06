<!--基础配置-->
<template>
  <div>
    <a-card>
      <div class="head-title mb">
        基本配置
      </div>
      <a-form-model 
        ref="form"
        :model="formData"
        :label-col="labelCol" 
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item  label="付费升级"  prop="status">
          <a-radio-group :options="statusOptions" v-model="formData.status" />
          <a-row v-show="formData.status=='1'">
            <a-col>
              <a-form-model-item prop="power">
                <a-row class="bg pt bg-box"  :style="{ width:'calc(70%)'}" >
                  <a-col >
                    <a-form-model-item :label-col="labelColChild" :wrapper-col="wrapperColChild"  label="订单类型"  prop="status">
                       <a-radio-group :options="orderTypeOptions" v-model="formData.order_type" />
                    </a-form-model-item>
                    <a-form-model-item :label-col="labelColChild" :wrapper-col="wrapperColChild"  label="付款最低金额"  prop="status">
                      <byf-input-number :width="250-35" unit="元" v-model="formData.num" :precision='2' :min="0"  placeholder="请输入付款最低金额"></byf-input-number>
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-form-model>
      <a-row>
        <a-col offset="2">
          <a-button type="primary">保存</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import ByfInputNumber from '@/components/byf/input/ByfInputNumber'
export default {
  components:{
    ByfInputNumber
  },
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      labelColChild: { xxl:{ span: 4 }, xl:{ span: 5 }, lg: { span: 6 }, sm: { span: 6 } },
      wrapperColChild: { span: 14 },
      statusOptions:[
        {label: '开启', value: "1"},
        {label: '关闭', value: "0"},
      ],
      orderTypeOptions:[
        {label: '已付款订单', value: "1"},
        {label: '确认收获订单', value: "0"},
      ],
      formData:{
        status:"1",
        order_type:"1",
        num:"10"
      }
    }
  },
  created(){
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .head-title{
    padding: 0 10px;
    width: calc(100% - 48px);
    height: 44px;
    background: #f5f5f5;
    line-height: 44px;
    margin-left: 35px;
    .head-info{
      font-size: 12px;
      color: #919191;
      margin-left: 10px;
    }
  }
</style>