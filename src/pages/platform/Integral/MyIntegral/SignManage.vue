<!--签到管理 -->
<template>
  <div >
    <a-card >
      <a-spin :spinning="spins">
        <a-form-model 
          ref="from"
          :rules="rules"
          :model="formData"
          :label-col="labelCol" 
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item
            label="签到模式"
          >
          <div class='helps-reletive' >
            <!-- <byf-radio-tab style='width:400px' :options="signModeOptions" v-model="formData.sign_model" @change="sigchange">
            </byf-radio-tab> -->
            <a-radio-group :options="signModeOptions"  v-model='formData.sign_model' @change="(e)=>{sigchange(e.target.value)}">
            </a-radio-group>
              <span>
                <byf-icon type="iconhelp" style='widht:20px' :size='30'>
                </byf-icon>
                <span class='ml-sm'>示例</span>
              </span>
              <div>
                <div class='bg toggle-box1 pt'>
                  <a-form-model-item v-if="false"  label="签到奖励"  :labelCol='{span:3}' :wrapperCol="{span: 18}">
                    <!-- <a-radio-group :options="signOptions"  v-model='formData[amount].sign_reward'> -->
                    <!-- </a-radio-group> -->
                  </a-form-model-item>
                  <a-form-model-item v-if='formData.sign_model==1'  label="奖励数量"  :labelCol='{span:3}' :wrapperCol="{span: 18}">
                    <byf-input-number width='300'  v-model='formData[amount].reward_number' :precision="0"  placeholder="请输入奖励数量" :unit="'积分'"></byf-input-number>
                  </a-form-model-item>
                  <a-form-model-item v-if='formData.sign_model==2'  label="奖励数量"  :labelCol='{span:3}' :wrapperCol="{span: 18}">
                    <a-table 
                      :columns="columnsNum" 
                      :data-source="formData.week_sign.reward_number"
                      align="center"
                      bordered
                      :pagination="false"
                      >
                      <template slot="week" slot-scope="record" >
                        <div style=" margin:0 auto">
                          {{weekName[record.week]}}
                        </div>
                      </template>
                      <template slot="num" slot-scope=" record" >
                        <div style="width:120px;  margin:0 auto">
                          <a-input-number style="width:120px; margin:0 auto"  :precision="0" :min="0" v-model="record.num" placeholder="请输入积分数量"></a-input-number >
                        </div>
                      </template>
                    </a-table>
                  </a-form-model-item>
                  
                  <a-form-model-item  label="额外奖励"  :labelCol='{span:3}' :wrapperCol="{span: 18}">
                    <a-radio-group  :options="(amount=='day_sign'?bonusOptions:bonusWeekOptions)"  v-model='formData[amount].bonus' @change="bonusChange">
                    </a-radio-group>
                    <a-table 
                    v-if='formData[amount].bonus !==0'
                    :columns="columns" 
                    :data-source="formData[amount].reward_list"
                    bordered
                    align="center"
                    :pagination="false"
                    >
                      <template slot="day" slot-scope=" record" >
                        <div style="width:120px;  margin:0 auto">
                          <a-input-number style="width:120px; margin:0 auto" :max='31' :precision="0" :min="1" v-model="record.day" placeholder="请输入签到天数"></a-input-number >
                        </div>
                      </template>
                      <template slot="num" slot-scope=" record" >
                        <div style="width:120px; margin:0 auto">
                          <a-input-number style="width:120px; margin:0 auto"  :precision="0" :min="0" v-model="record.num" placeholder="请输入奖励积分数量"></a-input-number >
                        </div>
                      </template>
                    </a-table>
                    <div v-if='formData[amount].bonus !==0'>
                      <a-button v-if='amount=="day_sign"' class='p-left-none' v-show='formData[amount].reward_list.length<=6' @click='addReward' type="link">+增加阶梯</a-button>
                      <a-button v-if='amount=="day_sign"' class='p-left-none red' @click='delReward' v-show='formData[amount].reward_list.length>3'  type="link">-减少阶梯</a-button>
                      <a-button v-if='amount=="week_sign"' class='p-left-none' v-show='formData[amount].reward_list.length<=3' @click='addReward' type="link">+增加阶梯</a-button>
                      <a-button v-if='amount=="week_sign"' class='p-left-none red' @click='delReward' v-show='formData[amount].reward_list.length>2'  type="link">-减少阶梯</a-button>
                    </div>
                  </a-form-model-item>
                  <div class='helps-reletive'>
                    <a-form-model-item
                      label='显示奖励数量'
                      help="说明：APP端领取积分的图标处是否显示积分数量"
                      :labelCol='{span:3}' :wrapperCol="{span: 18}"
                      class='flex'
                    >
                      <a-radio-group :options="showOptions"  v-model='formData[amount].show_reward_num'>
                      </a-radio-group>
                      <span >
                        <byf-icon type="iconhelp" style='widht:20px' :size='30'>
                        </byf-icon>
                        <span class='ml-sm'>示例</span>
                      </span>
                    </a-form-model-item>
                    <!-- <div class='icon-help'>
                      <byf-icon type="iconhelp" style='widht:20px' :size='30'>
                      </byf-icon>
                      <span class='ml-sm'>示例</span>
                    </div> -->
                  </div>
                  <div class='helps-reletive'>
                    <a-form-model-item
                      label='签到日历'
                      :labelCol='{span:3}' :wrapperCol="{span: 18}"
                    >
                      <a-radio-group :options="showOptions"  v-model='formData[amount].calendar'>
                      </a-radio-group>
                      <span>
                        <byf-icon type="iconhelp" style='widht:20px' :size='30'>
                        </byf-icon>
                        <span class='ml-sm'>示例</span>
                      </span>
                    </a-form-model-item>
                  </div>
                </div>
              </div>
    
          </div>
          </a-form-model-item>
          <a-row>
            <a-col offset="2">
              <a-button type='primary' :loading="submitLoading" @click='submit()'>保存</a-button>
            </a-col>
          </a-row>
        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>
<script>
 import {
   AdminPlatformInteGralSignInfo,
   AdminPlatformInteGralSignConfig
 } from '@/services/admin/platform/integral'
//  import ByfRadioTab from '@/components/byf/radio/ByfRadioTab'
 import ByfInputNumber from '@/components/byf/input/ByfInputNumber'
  export default {
    name:"SignManage", 
    components:{
      // ByfRadioTab,
      ByfInputNumber,
    },
    data(){
      return {
        spins:false,
        submitLoading:false,
        rules:{},
        columns:[
          {
            title: "累计签到天数",
            align:"center",
            scopedSlots: { customRender: 'day' },
          },
          {
            title: '奖励积分数量',
            align: 'center',
            scopedSlots: { customRender: 'num' },
          },
        ],
        columnsNum:[
          {
            title: "每周",
            align:"center",
            scopedSlots: { customRender: 'week' },
          },
          {
            title: "奖励积分数量",
            align:"center",
            scopedSlots: { customRender: 'num' },
          },
        ],
        amount:"day_sign",
        formData:{},
        formDatas:{
          sign_model:1,  //签到模式
          day_sign:{
            sign_reward:1,  //签到奖励
            reward_number:1,  //奖励数量
            bonus:0, //额外奖励
            show_reward_num:1, //显示奖励数量
            calendar:1,
            reward_list:[
              {
                day: '',
                num: '1',
              },
              {
                day: '',
                num: '1',
              },
              {
                day: '',
                num: '',
              },
              {
                day: '',
                num: '',
              },
              {
                day: '',
                num: '',
              },
            ],
          },
          week_sign:{
            sign_reward:0,  //签到奖励
            reward_number:[
              {
                week:"1",
                num:"1",
              },  
              {
                week:"2",
                num:"1",
              },
              {
                week:"3",
                num:"1",
              },  
              {
                week:"4",
                num:"1",
              }, 
              {
                week:"5",
                num:"1",
              },
              {
                week:"6",
                num:"1",
              }, 
              {
                week:"7",
                num:"1",
              },  
            ],  //奖励数量
              bonus:2, //额外奖励
              show_reward_num:0, //显示奖励数量
              calendar:0, //日历
              reward_list:[
              {
                day: '',
                num: '',
              },
              {
                day: '',
                num: '',
              },
              {
                day: '',
                num: '',
              },
              {
                day: '',
                num: '',
              },
              {
                day: '',
                num: '',
              },
            ],
          }, 
        },
        weekName:{
          1:"周一",
          2:"周二",
          3:"周三",
          4:"周四",
          5:"周五",
          6:"周六",
          7:"周日",
        },
        labelCol: { span: 2 },
        wrapperCol: { span: 14 },
        signModeOptions:[
          {label:"日签到",value:"1"},
          {label:"周签到",value:"2"}
        ],
        signOptions:[
          {label:"积分",value:1},
          {label:"其他(开发中)",value:0}
        ],
        // 额外奖励
        bonusOptions:[
          {label:"无额外奖励",value:0},
          {label:"每月累计签到奖励",value:1},
          {label:"每月连续签到奖励",value:2}
        ],
        bonusWeekOptions:[
          {label:"无额外奖励",value:0},
          {label:"每周累计签到奖励",value:1},
          {label:"每周连续签到奖励",value:2}
        ],
        showOptions:[
          {label:"显示",value:1},
          {label:"不显示",value:0}
        ],
      }
    },
    methods:{
      addReward(){
        console.log("addReward")
        let list = {
          day: '',
          num: '',
        }
        if(this.formData.sign_model == 1){
          console.log(1)
           this.formData.day_sign.reward_list.push(list)
        }else{
          this.formData.week_sign.reward_list.push(list)
        }
      },
      delReward(){
        if(this.formData.sign_model == 1){
          console.log(this.formData.day_sign.reward_list.length)
          this.formData.day_sign.reward_list.splice(this.formData.day_sign.reward_list.length-1,1)
        }else{
          this.formData.week_sign.reward_list.splice(this.formData.week_sign.reward_list.length-1,1)
        }
      },
      bonusChange(e){
        console.log(e.target.value)
        this.setColumns(e.target.value)
      },
      setColumns(e){
        console.log(e)
        if(e === 1){
          this.columns[0].title = "累计签到天数"
        }else{
           this.columns[0].title = "连续签到天数"
        }
      },
      sigchange(e){
        console.log(e)
        if(e == 1){
          this.amount = "day_sign"
          console.log(this.formData.day_sign.bonus,'奖励')
          this.setColumns(this.formData.day_sign.bonus)
        }else if(e == 2){
          this.amount = "week_sign"
          console.log(this.formData.week_sign.bonus,'奖励')
          this.setColumns(this.formData.week_sign.bonus)
        }
      },
      // 请求 详情
      AdminPlatformInteGralSignInfoFn(){
        AdminPlatformInteGralSignInfo().then(res=>{
          if(res.code == 200){
            this.spins = false
            console.log(res)
            this.formData = res.data
            this.sigchange(res.data.sign_model)
          }else{
            this.spins = false
          }
        })
      },
      submit(){
        this.submitLoading = true
        console.log(this.formData)
        AdminPlatformInteGralSignConfig(this.formData).then(res=>{
          if(res.code === 200){
            console.log(res,'123')
            this.$message.success(res.msg)
            this.submitLoading = false
          }else{
            this.submitLoading = false
          }
        })
      },
    },
    created(){
      // 数据请求的时候要 给amount 赋值  day_sign /  week_sign
      // 改变额外奖励的  sigchange()  bonus 1 累计签到天数 2 连续签到天数
      this.spins = true
      this.AdminPlatformInteGralSignInfoFn()
    },
    mounted(){},
  }
</script>
<style >
  .p-left-none{
    padding-left:0px;
  }
</style>
<style lang="less" scoped>
  .helps-reletive{
    position: relative;
  }
  .icon-help{
    width: 100px;
    // position: absolute;
    // top: 0px;
    // left: 260px;
  }
  .red{
    color:red;
  }



</style>