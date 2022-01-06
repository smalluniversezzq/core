 <!--付费升级-->
<template>
  <div class="basic-info">
    <a-form-model 
      ref="form"
      :model="formData"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item  label="付费升级"  prop="status">
        <a-radio-group :options="statusOptions" v-model="formData.status" />
      </a-form-model-item>
      <transition name="slide-fade">
        <a-row v-show="formData.status=='1'">
          <a-col>
            <a-form-model-item class='' label="付费套餐"  prop="power">
              <a-row :class="index == 0?'bg  pt bg-box':'bg  mt pt bg-box'" v-for="(item,index) in formData.info" :key="index" :style="{ width:'calc(70%)'}" >
                <a-col >
                  <a-form-model-item :label-col="labelColChild" :wrapper-col="wrapperColChild"  label="套餐名称"  prop="status">
                    <a-input style="width:250px" v-model="item.title" placeholder="请输入套餐名称"></a-input>
                  </a-form-model-item>
                  <a-form-model-item :label-col="labelColChild" :wrapper-col="wrapperColChild"  label="支付金额"  prop="status">
                    <byf-input-number :width="250-35" unit="元" v-model="item.price" :precision='2' :min="0"  placeholder="请输入支付金额"></byf-input-number>
                  </a-form-model-item>
                  <a-form-model-item :label-col="labelColChild" :wrapper-col="wrapperColChild" help="说明：输入0表示永久权益" label="输入月数"  prop="status">
                    <byf-input-number :width="250-35"  unit="月" v-model="item.time"  :precision='0' :min="0" placeholder="请输入月数"></byf-input-number>
                  </a-form-model-item>
                  <a-form-model-item class='mt-sm' :label-col="labelColChild" :wrapper-col="wrapperColChild"  label="返佣金额"  prop="status">
                    <byf-input-number :width="250-35"  unit="元" v-model="item.money" :precision='2' :min="0"  placeholder="请输入返佣金额"></byf-input-number>
                  </a-form-model-item>
                </a-col>
                <byf-icon v-if="formData.info.length>1" class="close" type="iconclose" @click="deleteMe(index)" />
              </a-row>
            </a-form-model-item>
            <a-row>
              <a-col offset="2" v-if="formData.info.length<3">
                <a-button @click="addSetMeal()" style='padding-left:0px' type="link">{{`+添加套餐(${formData.info.length}/3)`}}</a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </transition>
    </a-form-model>
    <a-divider />
    <a-row class='mt '>
      <a-col class='footer-btn '>
          <a-row>
            <a-col offset="2">
              <a-button class='mr' @click="submit" :loading='saveLoading'  type="primary">保存</a-button>
              <a-button @click='goBack()'>返回列表</a-button>
            </a-col>
          </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import ByfInputNumber from '@/components/byf/input/ByfInputNumber'
import { AdminUserUserlevelSetCondition} from '@/services/platform/vips.js'
export default {
  props:{
    id:{
      type:[Number,String]
    },
    payUpgradeformData:{
      type:Object,
    },
  },
  name:"basicInfo",
  components:{
    ByfInputNumber,
  },
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      labelColChild: { span: 4 },
      wrapperColChild: { span: 14 },
      info:{
        title:"",
        price:"",
        time:"",
        money:"",
      },
      formData:this.payUpgradeformData,
      help:{
        time:"说明：输入0表示永久权益",
      },
      statusOptions:[
        {label: '开启', value: "1"},
        {label: '关闭', value: "0"},
      ],
      saveLoading:false,
    }
  },
  created(){
  },
  mounted(){
    
  },
  methods:{
    onTabChange(key, type){
      this[type] = key;
    },
    changeImg(e){
      console.log(e,'changeImg')
    },
    submit(){
      this.saveLoading = true
      console.log(this.formData)
      if(this.id){
        this.formData.id =this.id
        this.AdminUserUserlevelSetConditionFn()
      }else{
        this.$message.error("请先保存基本信息")
        this.saveLoading = false
      }
    },
    AdminUserUserlevelSetConditionFn(){
      AdminUserUserlevelSetCondition(this.formData).then(res=>{
        if(res.code === 200){
          this.saveLoading = false
          console.log(res)
          this.$message.success(res.msg)
          this.goBack()
        }else{
          this.saveLoading = false
        }
      })
    },
    //添加套餐
    addSetMeal(){
      this.formData.info.push(cloneDeep(this.info))
    },
    //删除套餐
    deleteMe(index){
      console.log(index)
      this.formData.info.splice(index,1)
    },
    goBack(){
      this.$router.push({name:'GradeList'})
    }
  },
}
</script>
<style scoped lang="less" >
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
    top: -10px;
    right: -10px;
    font-size: 20px;
    cursor: pointer;
    color: #b8b9bd;
    display: none;
  }
  .slide-fade-enter-active {transition: all .2s ease;}
  .slide-fade-leave-active {transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .slide-fade-enter, .slide-fade-leave-to{transform: translateX(5px);opacity: 0;}
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