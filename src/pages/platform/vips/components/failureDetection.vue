 <!-- 失效检测 failureDetection--> <!--条件升级-->
<template>
  <div class="conditionUpgrade">
    <a-form-model
      ref="from"
      :rules="rules"
      :model="formData"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        label="失效检测"
        help="说明:失效检测既用户需要一直满足一下条件，否则用户会成为失效粉丝。"
      >
        <a-radio-group :options="stateOptions" v-model="formData.failure_detection" @change="sxjcchange">
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="三方授权"
      >
        <byf-radio-tab :options="stateOptions" :hide="[1]" :value="formData.empower.state" @change="sfsqchange">
          <div slot="toggle">
            <div class='bg toggle-box1 '>
              <a-form-model-item  label="授权平台" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-checkbox-group
                  v-model="formData.empower.info.empower_platform"
                  @change="sqptChange">
                    <a-checkbox :value="0">
                      淘宝授权
                    </a-checkbox>
                    <a-checkbox :value="1">
                      京东授权
                    </a-checkbox>
                    <a-checkbox :value="2">
                      拼多多授权
                    </a-checkbox>
                    <a-checkbox :value="3">
                      唯品会授权
                    </a-checkbox>
                  </a-checkbox-group>
              </a-form-model-item>
            </div>
          </div>
        </byf-radio-tab>
      </a-form-model-item>
      <a-form-model-item
        label="自购订单"
      >
        <byf-radio-tab :options="stateOptions" :hide="[1]" :value="formData.order.state" @change="sfsqchange">
          <div slot="toggle">
            <div class='bg toggle-box1 '>
              <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.order.info.time" @change="xzsjchange">
                  <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  label="统计类型" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.order.info.type" @change="tjlxchange">
                  <a-radio :value="item.value" v-for="(item,index) in StatisticalType" :key="index">
                      {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  label="输入数值" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <!-- :precision='2'  -->
                <byf-input-number width='300'  v-model='formData.order.info.num_value'  placeholder="请输入数值" :unit="'元'"></byf-input-number>
              </a-form-model-item>
            </div>
          </div>
        </byf-radio-tab>
      </a-form-model-item>
      <a-form-model-item
        label="个人收益"
      >
        <byf-radio-tab :options="stateOptions" :hide="[1]" :value="formData.order.state" @change="sfsqchange">
          <div slot="toggle">
            <div class='bg toggle-box1 '>
              <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.order.info.time" @change="xzsjchange">
                  <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  label="统计类型" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.order.info.type" @change="tjlxchange">
                  <a-radio :value="item.value" v-for="(item,index) in StatisticalType" :key="index">
                      {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  label="输入数值" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <!-- :precision='2'  -->
                <byf-input-number width='300'  v-model='formData.order.info.num_value'  placeholder="请输入数值" :unit="'元'"></byf-input-number>
              </a-form-model-item>
            </div>
          </div>
        </byf-radio-tab>
      </a-form-model-item>
      <a-form-model-item
        label="发展粉丝"
      >
       <div class='helps-reletive'>
          <byf-radio-tab :options="stateOptions" :hide="[1]" :value="formData.fans.state" >
            <div slot="toggle">
              <div class='bg toggle-box1 bg-box mt' v-for="(item,index) in formData.fans.info" :key='index'>
                <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                    <a-radio-group v-model="item.time" @change="xzsjchange">
                      <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                        {{item.label}}
                      </a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item  label="粉丝范围" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <a-checkbox-group
                  v-model="item.fans_range"
                
                  @change="(e)=>{fansRangeChange(e,index)}">
                    <a-checkbox :value="0">
                      一代粉丝
                    </a-checkbox>
                    <a-checkbox :value="1">
                      二代粉丝
                    </a-checkbox>
                    <a-checkbox :value="2">
                      三代粉丝
                    </a-checkbox>
                    <a-checkbox :value="3">
                      3三代外粉丝（仅运营商可用）
                    </a-checkbox>
                  </a-checkbox-group>
                </a-form-model-item>
                <a-form-model-item  label="粉丝等级" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <a-select v-model='item.fans_rating' style="width:335px" @change="fansselectchange">
                    <a-select-option :value="1">
                      1
                    </a-select-option>
                    <a-select-option :value="2">
                      2
                    </a-select-option>
                    <a-select-option :value="3">
                      3
                    </a-select-option>
                  </a-select>
                </a-form-model-item>                
             
                <a-form-model-item  label="输入人数" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <byf-input-number width='300' v-model='item.people_number'  placeholder="请输入支线人数" :unit="'个'"></byf-input-number>
                </a-form-model-item>
       
                <a-form-model-item  label="有效粉丝" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <a-radio-group v-model="item.fans_type" >
                    <a-radio :value="item.value" v-for="(item,index) in fansOptions" :key="index">
                      {{item.label}}
                    </a-radio>
                  </a-radio-group>
                </a-form-model-item>
                 <byf-icon v-if="formData.fans.info.length>1" class="close" type="iconclose" @click="deleteMe(index)" />
              </div>
              <a-button v-show='formData.fans.info.length<3' type='link' @click="addfans()">{{`+添加条件(${formData.fans.info.length}/3)`}}</a-button>
                <a-row>
                  <a-col>
                    <a-radio-group v-model="formData.fans.type" >
                      <a-radio :value="item.value" v-for="(item,index) in fansConditionOptions" :key="index">
                        {{item.label}}
                      </a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
            </div>
          </byf-radio-tab>
        </div>
      </a-form-model-item>
      <a-form-model-item
        label="支线任务"
      >
       <div class='helps-reletive'>
          <byf-radio-tab :options="stateOptions" :hide="[1]" :value="formData.side_quest.state" @change="zxrwchange">
            <div slot="toggle">
              <div class='bg toggle-box1'>
              <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <a-radio-group v-model="formData.side_quest.info.time" @change="xzsjchange">
                    <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                      {{item.label}}
                    </a-radio>
                  </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  label="要求支线数" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <byf-input-number width='300' v-model='formData.side_quest.info.branch_line_number'  placeholder="请输入要求支线数" :unit="'个'"></byf-input-number>
              </a-form-model-item>
              <a-form-model-item  label="每支线人数" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <byf-input-number width='300' v-model='formData.side_quest.info.people_number'  placeholder="请输入支线人数" :unit="'个'"></byf-input-number>
              </a-form-model-item>
              <a-form-model-item  label="粉丝等级" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-select v-model='formData.side_quest.info.fans_rating' style="width:335px" >
                  <a-select-option :value="1">
                    1
                  </a-select-option>
                  <a-select-option :value="2">
                    2
                  </a-select-option>
                  <a-select-option :value="3">
                    3
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item  label="有效粉丝" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.side_quest.info.fans_type" >
                  <a-radio :value="item.value" v-for="(item,index) in fansOptions" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              </div>
            </div>
          </byf-radio-tab>
        </div>
      </a-form-model-item>
      <a-form-model-item
        label="付费升级到期"
        help=""
      >
        <a-radio-group :options="stateOptions" v-model="formData.pay_expire_time" >
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="条件类型"
      >
        <a-radio-group :options="conditionOptions" v-model="formData.condition_type" >
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="考核周期"
        help="说明：既用户未达到考核条件后，当前等级和权益还可以保留天数，系统会每天检测一次条件，失效检测会有一定延迟。"
      >
        <byf-input-number width='300' v-model='formData.assessment_cycle'  placeholder="请输入支线人数" :unit="'填'"></byf-input-number>
      </a-form-model-item>
      <a-form-model-item
        label="失效处理"
        help="说明；检测到失效用户后的处理"
      >
        <a-radio-group :options="shixiaoOptions" v-model="formData.failure_treatment" >
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
    <a-row class='mt '>
        <a-col class='footer-btn '>
            <a-row>
              <a-col offset="2">
                <a-button type='primary' :loading='submitLoading' @click='submit()'>保存</a-button>
                <a-button class="ml" @click="goBack()">返回列表</a-button>
              </a-col>
            </a-row>
        </a-col>
      </a-row>
  </div>
</template>
<script>
import ByfRadioTab from '@/components/byf/radio/ByfRadioTab'
import ByfInputNumber from '@/components/byf/input/ByfInputNumber'
export default {
  name:"basicInfo",
  components:{
    ByfRadioTab,
    ByfInputNumber
  },
  props:{
  },

  data(){
    return {
      rules:{
      },
      submitLoading:false,
      formData:{
        failure_detection:1,
        empower:{    // 三方授权
          state:1,  //三方授权  0关闭 1开启
          info:{
            empower_platform:[1,2]
          }
        },
        order:{    // 自购订单
          state:1,  //三方授权  0关闭 1开启
          info:{
            time:0,  // 限制时间 0/不限时间  1/近30天 2/近60天  3近180天
            type:0,  // 0  订单金额  1 订单数量
            num_value:"", //  输入数值  数字类型
          }
        },
        profit:{    // 个人收益
          state:1,  //个人收益  0关闭 1开启
          info:{
            time:0,  // 限制时间 0/不限时间  1/近30天 2/近60天  3近180天
            type:0,  // 0  订单金额  1 订单数量
            num_value:"", //  输入数值  数字类型
          }
        },
        fans:{  //发展粉丝
          state:1,  // 条件升级 1开启 0关闭
          type: 0, // 0 同时满足发展粉丝条件 1 任意满足发展粉丝条件
          info:[
            {
              time:0,  // 限制时间 0近30天  1/近60天 2/近90天  3近180天
              fans_range:[0],  // 粉丝范围 0  一代粉丝  1 二代粉丝 2 三代粉丝 3三代外粉丝
              fans_rating:"", // 粉丝等级  
              people_number:"",  // 输入人数 字符串类型
              fans_type:1, // 有效粉丝 0 统计所有粉丝 1 仅统计有效粉丝
            }
          ]
        },
        side_quest :{  //支线任务
          state:1,  // 条件升级 1开启 0关闭
          info:{
            time:0,  // 限制时间 0/不限时间  1/近30天 2/近60天  3近180天
            branch_line_number:"",//要求支线数 数字类型 正 整数
            branch_people_number:"",// 每支线人数 数字类型 正 整数
            fans_rating:"", // 粉丝等级  
            fans_type:1, // 有效粉丝 0 统计所有粉丝 1 仅统计有效粉丝
          }
        },
        pay_expire_time :0, // 付费到期时间 1开启 0关闭
        condition_type:0, // 条件类型  0以上条件同时不满足失效 1以上条件任意不满足失效
        assessment_cycle :"",  //考核周期
        failure_treatment :0,  //失效处理 0不处理 1降级处理 
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      stateOptions:[
        {label:"开启",value:1},
        {label:"关闭",value:0},
      ],
      timeOptions:[
        {label:"近30天",value:0},
        {label:"近60天",value:1},
        {label:"近90天",value:2},
        {label:"近180天",value:3},
      ],
      StatisticalType:[
        {label:"订单金额",value:0},
        {label:"订单数量",value:1},
      ],
      fansOptions:[
        {label:"统计所有粉丝",value:0},
        {label:"仅统计有效粉丝",value:1},
      ],
      fansConditionOptions:[
        {label:"同时满足发展粉丝条件",value:0},
        {label:"任意满足发展粉丝条件",value:1},
      ],
      conditionOptions:[
        {label:"以上条件须同时满足",value:0},
        {label:"以上条件可任意满足",value:1},
      ],
      shixiaoOptions:[
        {label:"不处理",value:0},
        {label:"降级处理（同时会降级权益）",value:1},
      ],

    }
  },
  created(){
  },
  mounted(){
  },
  methods:{
    sxjcchange(e){
      console.log(e,'sxjc')
    },
    sfsqchange(e){
      console.log(e,'sfsq')
    },
    sqptChange(e){
      console.log(e,'sfsq_授权平台')
    },
    xzsjchange(e){
      console.log(e,'xzsj')
    },
    tjlxchange(e){
      console.log(e,'tjlx')
    },
    fansselectchange(e){
      console.log(e,'fs')
    },
    zxrwchange(e){
      console.log(e,'zxrw')
    },
    deleteMe(index){
      console.log(index)
      this.formData.fans.info.splice(index,1)
    },
    addfans(){
      let fansObj = {
        time:0,  // 限制时间 0/不限时间  1/近30天 2/近60天  3近180天
        branch_line_number:"", //支线数
        people_number:"",  // 输入人数 字符串类型
         fans_range:[], //粉丝范围
        fans_rating:"", // 粉丝等级  
        fans_type:1, // 有效粉丝 0 统计所有粉丝 1 仅统计有效粉丝
        display_content:"",  // APP展示内容 字符串类型
      }
      if(this.formData.fans.info.length < 3){
        this.formData.fans.info.push(fansObj)
      }
    },
 
  },
}
</script>
<style scoped lang="less" >
  .toggle-box1{
    padding:20px 20px 20px 0px;
  }
  .bg-box{
    position: relative;
    &:hover {
      .close {
        display: block;
      }
    }
  }
  .close{
    position: absolute;
    top: -11px;
    right: -10px;
    font-size: 20px;
    cursor: pointer;
    color: #b8b9bd;
    display: block;
    z-index: 10;
  }
  .close {
    display: block;
    &:hover {
      color: rgba(0, 0, 0, 0.7);
    }
  }
  .footer-btn{
    width: 100%;
    z-index: 1999;
    -webkit-box-shadow: 0 -1px 2px rgba(0,0,0,.15);
    box-shadow: 0 -1px 2px rgba(0,0,0,.15);
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 12px 0;
    position: fixed;
    bottom: 0;
    margin-left: -25px;
    min-width: 1200px;
  }
</style>