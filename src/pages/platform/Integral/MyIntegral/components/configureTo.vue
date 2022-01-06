<template>
  <div class='taskmanage' >
    <!-- {{taskLists.day}}
    <br> -->
    <!-- {{formData.day.status}} -->
    <br>
    <a-form-model
      v-if="spining"
      ref="from"
      :rules="rules"
      :model="formData"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        v-for="(item,index) in taskName" :key="index"
        :label="taskCnName[index]+'任务'"
      > 
        <byf-radio-tab :options="showOptions" :hide="[1]" class='showOptions' v-model='formData[item].status' >
        </byf-radio-tab>
          <div >
            <div class='bg toggle-box1 mb'>
              <div class='boxpd'>
                <a-radio-group v-if="item !== 'newbie_task'"  v-model='formData[item].type' @change="(e)=>{selectDaychange(e,item)}">
                  <a-radio :value="1">
                    每{{taskTime[index]}}从以下任务随机展示
                  </a-radio>
                  <a-radio :value="2">
                    自定义循环
                  </a-radio>
                </a-radio-group>
                <div>
                  <div v-if='formData[item].type == 2'>
                    <a-button 
                    class="mr-sm"
                    :type="task_loop[item].num == inx?'primary':'default'"
                    v-for='(itm,inx) in formData[item].custom_data'
                    @click='setList(inx,item)'
                     :key="inx"
                     >第{{CnNum[inx]}}{{taskTimes[index]}}</a-button>
                     <a-button type='link' style='color:#1989FA' @click="addCustom(item,'custom_data')">+增加循环{{taskTime[index]}}</a-button>
                     <a-button type='link' style='color:red' @click="delCustom(item,'custom_data')">-减少循环{{taskTime[index]}}</a-button>
                  </div>
                  <div class='mt' v-if='formData[item].type == 1'>
                    <drag-table :dataList="formData[item].random_data" :taskName="taskCnName[index]" :task="item"   @acceptData="(e)=>{acceptData(e,item,'random_data')}"></drag-table>
                    <a-button type='link' class='p-left-clear' @click="addTask(formData[item].random_data,item,'random_data')">+选择任务</a-button>
                  </div>
                  <div class='mt' v-if='formData[item].type == 2' >
                    <drag-table :dataList="formData[item].custom_data[task_loop[item].num]" :taskName="taskCnName[index]" :task="item" @acceptData="(e)=>{acceptData(e,item,'custom_data',task_loop[item].num)}"></drag-table>
                    <a-button type='link' class='p-left-clear' @click="addTasks(formData[item].custom_data[task_loop[item].num],item,'custom_data')">+选择任务</a-button>
                  </div>
                  <a-row type='flex' v-if="formData[item].type != 2 && item !== 'newbie_task'" >
                    <a-col class='col-label'>
                      {{taskCnName[index]}}任务展示数量：
                    </a-col>
                    <a-col>
                      <a-radio-group :options='showNumOptions' v-model='formData[item].task_volume'>
                      </a-radio-group>
                      <a-row>
                        <a-col v-if='formData[item].task_volume == 1'>
                          <a-input-number v-model='formData[item].task_num_fixed' :min='1' :max="15" :precision='0'></a-input-number>
                        </a-col>
                        <a-col v-if='formData[item].task_volume == 2'>
                          <a-input-number 
                          v-model='formData[item].task_num_min' 
                          :min='1' :max="15" 
                          :precision='0'
                          placeholder="请输入最小值"
                           @change='minTmax(formData[item].task_num_min,formData[item].task_num_max,item)'></a-input-number>
                          -
                          <a-input-number v-model='formData[item].task_num_max' 
                          :min='1' 
                          :max="15" 
                          :precision='0' 
                          placeholder="请输入最大值"
                          @change='maxTmin(formData[item].task_num_max,formData[item].task_num_min,item)'></a-input-number>
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                </div>
              </div>
              <a-row>
                <a-col offset="15" class='mb'>
                  <a-button type='primary' @click='submit(item,formData[item].type)' >保存</a-button>
                </a-col>
              </a-row>
            </div>
          </div>
      </a-form-model-item>
    </a-form-model>
    <a-modal
       title="选择任务"
      :visible="taskvisible"
      :width="860"
      @ok="taskhandleOk"
      @cancel="taskhandleCancel"
    >
      <div class='table-box'>
        <!-- {{taskList}} -->
        <a-table
        :data-source="taskList"
        :columns="columns"
        :pagination="false"
        >
        <template slot="name_before" slot-scope="record">
          {{record.name_before}}{{record.task}}{{record.name_after}}
        </template>
        <template slot="action" slot-scope="record">
          <a-button size="small" v-if="record.type=='0'" @click="stateChange(record,1)">选择</a-button>
          <a-button size="small" v-if="record.type=='1'" type="primary"  @click="stateChange(record,0)">已选</a-button>
        </template>
        </a-table>
        <a-row>
          <a-col class='mt tar' span='20' v-show='taskList.length > 0'>
            <a-button size="small" :type='whole?"primary":"defult"' @click='wholeChange()'>{{whole?"已全选":"全选"}}</a-button>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <!-- 保存弹窗 -->
    <a-modal
      v-model="submitvisible"
      :title="modal.title"
      :width="680"
      @cancel="handleCancel"
      :confirm-loading="submitLoading"
      @ok="handleOk"
    >
      <a-row v-if='modal.type != 0'>
        <a-col span="5" class='tar'>新配置执行时间：</a-col>
        <a-col span="16">
        <a-radio-group  v-model='submitType.execute_type'>
          <a-radio  :value="1">
            {{modal.timeTxt}}
          </a-radio>
          <a-radio  :value="2">
            立即执行（不推荐）
          </a-radio>
        </a-radio-group>
        </a-col>
      </a-row>
      <span v-if='modal.type == 0'></span>
      <a-row class='mt' v-if='modal.type == 2'>
        <a-col span="5" class='tar'>{{modal.LoopTxt}}</a-col>
        <a-col span="16">
        <a-radio-group v-model='submitType.is_reset'>
          <a-radio  :value="0">
            不重置
          <a-radio  :value="1">
            {{modal.timeLoop}}
          </a-radio>
          </a-radio>
        </a-radio-group>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import ByfRadioTab from '@/components/byf/radio/ByfRadioTab'
import dragTable from './dragTable'
import { cloneDeep } from 'lodash'
  import { 
    AdminPlatformInteGralTaskGetConfig,
    AdminPlatformInteGralTaskSetConfig
  } from '@/services/admin/platform/integral'
  export default{
    name:"taskmanage",
    components:{
      ByfRadioTab,
      dragTable
    },
    data(){
      return {
        spining:false,
        submitLoading:false,
        submitvisible:false,
        info:{},
        modal:{
          title:"",
          timeTxt:"",
          timeLoop:"",
          type:"",
        },
        submitType:{
          execute_type:1,
          is_reset:0,
        },
        labelCol: { span: 2 },
        wrapperCol: { span: 14 },
        whole:false,// 任务全选
        CnNum:['一','二','三','四','五','六','七','八','九','十'],
        keys:[],
        task_loop:{
          day:{
            num:0,
            type:"",  
          },
          week:{
            num:0,
            type:"",
          },
          month:{
            num:0,
            type:"",
          },
          newbie_task:{
            num:0,
            type:"",
          },
        },
        columns:[
          {
            title: '任务',
            // dataIndex: 'task_name',
            key: 'task_name',
            scopedSlots: { customRender: 'name_before' },
          },
              {
            title: '奖励积分',
            dataIndex: 'integral',
            key: 'integral',
          },
          {
            title: '操作',
           scopedSlots: { customRender: 'action' },
            key: 'action',
          },
        ], 
        taskLists:[],
        taskList:[
          {
            id:"1",
            task_name:"浏览商品达到15分钟",
            task_number:"10",
            type:0,
          },
          {
            id:"2",
            task_name:"浏览商品达到20分钟",
            task_number:"20",
            type:0,
          },
          {
            id:"3",
            task_name:"浏览商品达到30分钟",
            task_number:"30",
            type:0,
          },
          {
            id:"4",
            task_name:"浏览商品达到40分钟",
            task_number:"40",
            type:0,
          },
          {
            id:"5",
            task_name:"浏览商品达到50分钟",
            task_number:"50",
            type:0,
          },
          {
            id:"6",
            task_name:"浏览商品达到60分钟",
            task_number:"60",
            type:0,
          },
        ],
        showOptions:[
          {label:"开启",value:1},
          {label:"关闭",value:0}
        ],
        showNumOptions:[
          {label:"固定数量",value:1},
          {label:"随机数量",value:2},
        ],
        showTypeOptions:[
          {label:"每日从以下任务随机展示",value:1},
          {label:"自定义循环",value:2},
        ],
        rules:{},
        // 'newbie_task'
        taskName:["day",'week','month','newbie_task'],
        taskCnName:["每日","每周","每月",'新手'],
        taskTime:["日","周","月",],
        taskTimes:["天","周","月",],
        defalutData:{
          day:{
            status:1, //控制任务是否开启关闭
            type:1,
            task_volume:1,
            task_num_fixed:"",
            task_num_max:"",
            task_num_min:"",
            random_data:[
            ],
            custom_data:[
              [],[]
            ],
          },
          week:{
            status:1,
            type:1,
            task_volume:1,
            task_num_fixed:"",
            task_num_max:"",
            task_num_min:"",
            random_data:[
            ],
            custom_data:[
             [],[],
            ],
          },
          month:{
            status:1,
            type:1,
            task_volume:1,
            task_num_fixed:"",
            task_num_max:"",
            task_num_min:"",
            random_data:[
            ],
            custom_data:[
             [],[],
            ],
          },
          newbie_task:{
            status:1,
            type:1,
            task_volume:1,
            task_num_fixed:"",
            task_num_max:"",
            task_num_min:"",
            random_data:[
            ],
         
          },
        },
        formData:{
        },
        taskvisible:false,
      }
    },
    methods:{
      acceptData(data,key1,key2,key3){
        console.log(data,key1,key2,key3)
        if(!key3 && key3!==0){
          console.log(data,'acceptData1')
          this.formData[key1][key2] = cloneDeep(data)
        }else{
          console.log(data,'acceptData2')
          this.formData[key1][key2][key3] = cloneDeep(data)
        }
      },
      addTask(data,key1,key2){
        console.log(data,key1,key2)
        this.task_loop[key1].type = 1
        this.keys[0] = key1
        this.keys[1] = key2
        console.log(data);
        this.taskList = cloneDeep(this.taskLists[key1])
        this.taskvisible = true
        let num = 0
        this.whole = false
        data.forEach((item,index)=>{
          this.taskList.forEach((im,inx)=>{
            if(item.id == im.id){
              num ++
              console.log(im.id)
              this.taskList[inx].type = 1
            }
          })
          console.log(item,index)
        })
        if(this.taskList.length == num ){
          this.whole = true
        }
        console.log(this.taskList)
      },
      minTmax(min,max,item){
        if(min>max){
          this.$message.error('最小值不能大于最大值')
          this.formData[item].task_num_min = ""
        }
      },
      maxTmin(max,min,item){
        if(max<min){
          this.$message.error('最大值不能小于最小值')
          this.formData[item].task_num_max = ""
        }
      },
      //循环 
      addTasks(data,key1,key2){
        console.log(data,key1,key2)
        this.task_loop[key1].type = 2
        this.keys[0] = key1
        this.keys[1] = key2
        console.log(data);
        this.taskList = cloneDeep(this.taskLists[key1])
        this.taskvisible = true
        let num = 0
        this.whole = false
        data.forEach((item,index)=>{
          this.taskList.forEach((im,inx)=>{
            if(item.id == im.id){
              num ++
              console.log(im.id)
              this.taskList[inx].type = 1
            }
          })
          console.log(item,index)
        })
        if(this.taskList.length == num ){
          this.whole = true
        }
        console.log(this.taskList)
      },
      taskhandleOk(){
        if(this.task_loop[this.keys[0]].type == 1){
          this.formData[this.keys[0]][this.keys[1]] = []
          let num = 0
          this.taskList.forEach((item)=>{
            if(item.type == 1){
              // this.formData[this.keys[0]][this.keys[1]].push(item)
              this.$set(this.formData[this.keys[0]][this.keys[1]],num,item);
              num ++
            }
          })
          console.log(this.formData[this.keys[0]][this.keys[1]])
          this.taskvisible = false
        }else if(this.task_loop[this.keys[0]].type == 2){
          console.log(this.keys[0],this.keys[1],this.task_loop[this.keys[0]].num)
          this.formData[this.keys[0]][this.keys[1]][this.task_loop[this.keys[0]].num] = []
          let num = 0
          this.taskList.forEach((item)=>{
            if(item.type == 1){
              console.log(item,'item')
              this.$set(this.formData[this.keys[0]][this.keys[1]][this.task_loop[this.keys[0]].num],num,item);
              num ++
            }
          })
          this.taskvisible = false
        }
      },
      taskhandleCancel(){
        this.taskvisible = false
      },
      stateChange(record,num){
        record.type = num
        let baseNum = 0
        this.taskList.forEach(item=>{
          if(item.type== 1){
            baseNum++
          }
        })
        if(this.taskList.length == baseNum){
          this.whole = true;
        }else{
          this.whole = false;
        }
      },
      submit(value,type){
        this.submitType = {
          execute_type:1,
          is_reset:0,
        },
        console.log(value, this.formData[value],type)
        if(value == 'day'){
          this.modal.title = '每日任务配置保存'
          this.modal.timeTxt = "从次日开始执行"
          this.modal.timeLoop = "重置（从第一天重新开始循环）"
          this.modal.LoopTxt = "是否重置天数循环："
          this.modal.type = type
        }else if(value == 'week'){
          this.modal.title = '每周任务配置保存'
          this.modal.timeTxt = "从下周一开始执行"
          this.modal.timeLoop = "重置（从第一周重新开始循环）"
          this.modal.LoopTxt = "是否重置周循环："
          this.modal.type = type
        }else if(value == 'month'){
          this.modal.title = '每月任务配置保存'
          this.modal.timeTxt = "从下月1号开始执行"
          this.modal.timeLoop = "重置（从第一月重新开始循环）"
          this.modal.LoopTxt = "是否重置月循环："
          this.modal.type = type
        }else if(value  == 'newbie_task'){
          this.handleOk()
        }
        if(value  !== 'newbie_task'){
          this.submitvisible = true
        }
        this.info = {}
        this.info.data = this.formData[value]
        this.info.type = value
      },
      handleOk(){
        this.submitLoading = true
        this.info.execute_type = this.submitType.execute_type
        this.info.is_reset = this.submitType.is_reset
        console.log(this.info)
        this.AdminPlatformInteGralTaskSetConfigFn(this.info)
      },
      handleCancel(){},
      wholeChange(){
        console.log(this.whole)
        if(this.whole == false){
          this.taskList.forEach((item)=>{
            item.type = 1
          })
          this.whole = true
        }else{
          this.taskList.forEach((item)=>{
            item.type = 0
          })
          this.whole = false
        }
      },
      selectDaychange(e,key1){
        console.log(e.target.value)
        let keys = e.target.value
        if(keys == 2){
          this.task_loop[key1].num = 0
        }
      },
      setList(index,key){
        this.task_loop[key].num = index
      },
      //增加循环周
      addCustom(key1,key2){
        console.log('111')
        let arr = [
        ]
        if(this.formData[key1][key2].length < 10){
          this.formData[key1][key2].push(arr)
        }
      },
      delCustom(key1,key2){
        if(this.formData[key1][key2].length > 2){
          this.formData[key1][key2].pop()
        }
      },
      AdminPlatformInteGralTaskGetConfigFn(){
        AdminPlatformInteGralTaskGetConfig().then(res=>{
          if(res.code ===200){
            console.log(res.data)
            this.taskLists = res.data.list
            this.formData = res.data.config
            console.log(this.formData)
            // if(JSON.stringify(res.data.day) == "{}")
            let task = ["day","week","month","newbie_task"]
            task.forEach((item)=>{
              if(JSON.stringify(res.data.config[item])=="[]"){
                console.log(item)
                this.formData[item] = this.defalutData[item]
              }
            })
            console.log(this.formData)
            this.spining = true
          }
        })
      },
      AdminPlatformInteGralTaskSetConfigFn(info){
        AdminPlatformInteGralTaskSetConfig(info).then(res=>{
          if(res.code === 200){
            console.log(res.code)
            this.submitvisible = false
            this.submitLoading = false
            this.$message.success(res.msg)
          }else{
            this.submitLoading = false
          }
        })
      },
    },
    // 保存
    created(){
      this.AdminPlatformInteGralTaskGetConfigFn()
    },
    mounted(){
    },
  }
</script>
<style lang="less" scoped>
  .boxpd{
    padding: 20px 40px;
  }
  .col-label{
    font-size: 14px;
    color:rgba(0, 0, 0, 0.85);
  }
  .p-left-clear{
    padding-left: 0px;
  }


</style>