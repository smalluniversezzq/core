<!-- 任务池 -->
<template>
  <div class='taskpool'>
    <a-spin :spinning="spinning">
      <div>
        <!-- {{formData[amount]}} -->
        <a-row>
          <a-col offset="1">
            <a-button-group>
              <a-button @click='tabTask(1)' :type="activeBtn==1?'primary':'default'" >
                每日任务
              </a-button>
              <a-button @click='tabTask(2)' :type="activeBtn==2?'primary':'default'" >
                每周任务
              </a-button>
              <a-button @click='tabTask(3)' :type="activeBtn==3?'primary':'default'" >
                每月任务
              </a-button>
              <a-button @click='tabTask(4)' :type="activeBtn==4?'primary':'default'" >
                新手任务
              </a-button>
            </a-button-group>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <div class="header mt">
              <a-row >
                <a-col span="6" offset='1' class='tal'>
                  每日任务
                </a-col>
                <a-col span="6" class='tal'>
                  任务图标
                </a-col>
                <a-col span="10" class='tal'>
                  奖励积分
                </a-col>
              </a-row>
              <div class='content-list' v-for='(item,index) in formData[amount]' :key="index">
                <a-row >
                  <a-col span="6" offset='1' class='tal'>
                    <div :class='formData[amount].length==index+1?"flex border-b ":"flex border-b bb"' >
                      <span>{{item.name_before}}</span>
                        <a-input-number v-if='amount!=="newbie_task"' class='int-box' :precision='0' v-model='item.task'></a-input-number>
                      <span v-if='amount!=="newbie_task"'>{{item.name_after}}</span>
                    </div>
                  </a-col>
                  <a-col span="6" v-show='activeBtn == 1' :class='formData.day.length==index+1?"tal border-b img-box":"tal border-b img-box bb"' >
                    <small-img v-if='activeBtn == 1' :imgsList="[item.icon]" @change="((e)=>{onImgChange(e,'day',index)})"></small-img>
                  </a-col>
                  <a-col span="6" v-show='activeBtn == 2'  :class='formData.week.length==index+1?"tal border-b img-box":"tal border-b img-box bb"' >
                    <small-img  v-if='activeBtn == 2'  :imgsList="[item.icon]" @change="((e)=>{onImgChange(e,'week',index)})"></small-img>
                  </a-col>
                  <a-col span="6" v-show='activeBtn == 3'  :class='formData.month.length==index+1?"tal border-b img-box":"tal border-b img-box bb"' >
                    <small-img  v-if='activeBtn == 3'  :imgsList="[item.icon]" @change="((e)=>{onImgChange(e,'month',index)})"></small-img>
                  </a-col>
                  <a-col span="6" v-show='activeBtn == 4'  :class='formData.newbie_task.length==index+1?"tal border-b img-box":"tal border-b img-box bb"' >
                    <small-img  v-if='activeBtn == 4'  :imgsList="[item.icon]" @change="((e)=>{onImgChange(e,'newbie_task',index)})"></small-img>
                  </a-col>

                  <a-col span="10" :class='formData[amount].length==index+1?"tal border-b":"tal border-b bb"'>
                    <a-input-number class='int' :precision='0' v-model='item.integral'></a-input-number>
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col offset="1" class='mt-xl'>
            <a-button type="primary" @click="submit()">
              保存
            </a-button>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>
<script>
  import smallImg from './smallImg.vue'
  import { 
    AdminPlatformInteGralTaskPool,
    AdminPlatformInteGralTaskSavePool
  } from '@/services/admin/platform/integral'
  export default{
    name:"taskmanage",
    components:{
      smallImg
    },
    data(){
      return {
        spinning:false,
        activeBtn:1,
        icon: '',
        amount:"day",
        formData:{},
      }
    },
    methods:{
      tabTask(value){
        this.activeBtn = value
        if(value == 1){
          this.amount = "day"
        }else if(value == 2){
          this.amount = "week"
        }else if(value == 3){
          this.amount = "month"
        }else if(value == 4){
          this.amount = "newbie_task"
        }
      },
      onImgChange(e,amount,index){
        console.log(e,amount,index)
        console.log(this.formData[amount][index].icon)
        this.formData[amount][index].icon = e[0]
        console.log(this.formData[amount][index])
      },
      submit(){
        console.log(this.formData)
        this.AdminPlatformInteGralTaskSavePoolFn(this.formData)
      },
      AdminPlatformInteGralTaskPoolFn(){
        AdminPlatformInteGralTaskPool().then(res=>{
          if(res.code == 200){
            this.spinning = false
            this.formData = res.data
          }else{
            this.spinning = false
          }
        })
      },
      AdminPlatformInteGralTaskSavePoolFn(data){
        AdminPlatformInteGralTaskSavePool(data).then(res=>{
          if(res.code === 200){
            console.log(res)
            this.$message.success(res.msg)
          }
        })
      },
    },
    created(){
      this.AdminPlatformInteGralTaskPoolFn()
      this.spinning = true
    },
    mounted(){

    },
  }
</script>
<style lang="less" scoped>
  .taskpool{
    margin-bottom: 100px;
  }
  .mt-xl{
      margin-top: 50px;
  }
  .header{
    padding: 0px 10px 0px;
    width: 100%;
    height: 44px;
    background: #f5f5f5;
    line-height: 44px;
    // margin-left: 35px;
  }
  .flex{
    // display:flex;
    // flex-wrap: wrap;
  }
  .int{
    width: 200px;
  }
  .int-box{
    width: 120px;
    margin: 0 10px;
  }

  .border-b{
    height: 82px;
    line-height: 82px;
  }
  .bb{
    border-bottom: 1px solid #f0f0f0;
  }
  .img-box{
    margin-top: 20px;
    height: 62px;
  }

</style>