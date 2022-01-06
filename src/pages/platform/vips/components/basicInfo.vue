 <!--基本信息-->
<template>
  <div class="basic-info">
    <!-- {{$store.state.setting.routerList}}
    <a-button @click="getrouter">clickme</a-button> -->
    <a-form-model 
      ref="form"
      :rules="rules"
      :model="formData"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item  label="等级名称"  prop="name">
        <a-input style="width:300px" :maxLength="10" v-model="formData.name" placeholder="请输入等级名称"></a-input>
      </a-form-model-item>
      <a-form-model-item  label="等级图标"  prop="icon" :help="help.icon">
        <byf-upload-btn @change="changeImg"  :imgsList="[formData.icon]"></byf-upload-btn>
      </a-form-model-item>
      <a-form-model-item class='mt' help="说明：默认等级的权重最小，权重参数不可重复"  label="等级权重"  prop="power">
        <a-input-number style="width:300px" :min="power === 0?0:1" :disabled="power === 0"  v-model="formData.power" placeholder="请输入等级权重"></a-input-number>
      </a-form-model-item>
      <a-form-model-item  label="等级类型"  prop="type">
        <a-radio-group :disabled="power === 0" :options="typeOptions" v-model="formData.type" />
      </a-form-model-item>
      <a-form-model-item v-if="power !== 0"  label="隐藏类型" :help="help.ishide" prop="type">
        <a-radio-group :options="ishideOptions" v-model="formData.ishide" />
      </a-form-model-item>
      <a-form-model-item  label="等级状态"  prop="type">
        <a-radio-group :options="statusOptions" v-model="formData.status" />
        <a-tooltip  placement="top">
          <template slot="title">
            <p>等级禁用</p>
            <p>1、用户升级时无法看到被禁用的等级，如升级则会跳过禁用等级。</p>
            <p>2、禁用等级下的用户不会有返佣。</p>
            <p>3、默认等级不允许禁用。</p>
            <p>建议：调为禁用状态后，需要立即转移禁用等级下的用户</p>
          </template>
          <byf-icon type="iconinfo" :style="{fontSize:'18px',color:'#ffad5b',verticalAlign:'sub'}"></byf-icon>
        </a-tooltip>
      </a-form-model-item>
    </a-form-model>
    <a-divider />

    <a-row class='mt '>
        <a-col class='footer-btn '>
            <a-row>
              <a-col offset="2">
                <a-button class='mr' :loading="saveLoading" @click="submit" type="primary">保存</a-button>
                <a-button @click="goBack()">返回列表</a-button>
              </a-col>
            </a-row>
        </a-col>
      </a-row>
    <a-row>
      <a-col offset="2">

      </a-col>
    </a-row>
  </div>
</template>
<script>
import { 
  AdminUserUserlevelAdd,
  AdminUserUserlevelEdit
  } from '@/services/platform/vips.js'
import { cloneDeep } from 'lodash'
export default {
  name:"basicInfo",
  components:{
  },
  props:{
    id:{
      defalut:[]
    },
    basicInfoFromData:{
      type:Object,
    },
    power:{
      defalut:""
    },
    up_info_default:{},
  },

  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      formData:"",
      
      rules:{
        name:[
          { required: true, message: '等级名称不能为空', trigger: 'change'},
        ], 
        icon:[
          { required: true, message: '等级图标不能为空', trigger: 'change'},
        ], 
        power:[
          { required: true, message: '等级权重不能为空', trigger: 'change'},
        ], 
        type:[
          { required: true, message: '等级类型不能为空', trigger: 'change'},
        ], 
        ishide:[
          { required: true, message: '隐藏类型不能为空', trigger: 'change'},
        ], 
        status:[
          { required: true, message: '等级状态不能为空', trigger: 'change'},
        ], 
      },
      help:{
        icon:"说明：该图标用于APP端展示，请上传尺寸为60*60px的png图标",
        power:"说明：默认等级的权重最小，权重参数不可重复",
        ishide:"说明：设置为隐藏等级后，低等级用户无法看到更高等级，也无法完成升级操作。如必须设置隐藏等级，建议设置系统的最高等级为隐藏等级"
      },

      typeOptions:[
        {label: '代理等级', value: 1},
        {label: '运营商等级', value: 2},
      ],
      ishideOptions:[
        {label: '是', value: 1},
        {label: '否', value: 0},
      ],
      statusOptions:[
        {label: '启用', value: 1},
        {label: '禁用', value: 0},
      ],
      saveLoading:false
    }
  },
  created(){
    console.log(this.id,'id')
    console.log(this.power,'power',this.basicInfoFromData)
    this.formData = cloneDeep(this.basicInfoFromData)
  },
  mounted(){
    // console.log(this.$store.state.routerList,'getrouter')
  },
  methods:{
    getrouter(){
      // this.$store.commit("setting/setRoute", '666');
      console.log(this.$store.state.setting.routerList,'getrouter')
    },
    onTabChange(key, type){
      this[type] = key;
    },
    changeImg(e){
      console.log(e,'changeImg')
      this.formData.icon = e[0]
    },
    submit(){
      // :disabled="formData.power==0 && formData.status==0" 
      if(this.up_info_default.status == "1" && this.formData.status=="0"){
        console.log('不允许保存')
        this.$message.error("默认等级的等级状态不允许禁用")
      }else{
      console.log(this.formData)
      this.saveLoading = true
      this.$refs.form.validate(valid => {
        if(valid){
          if(this.id){
            this.formData.id = this.id
            this.AdminUserUserlevelEditFn(this.formData)
          }else{
            this.AdminUserUserlevelAddFn(this.formData)
          }
        }else{
          this.saveLoading = false
        }
      })
      console.log('允许')
      }
    },
    // 编辑
    AdminUserUserlevelEditFn(formData){
      console.log("AdminUserUserlevelAddFn",formData)
      AdminUserUserlevelEdit(formData).then(res=>{
        if(res.code === 200){
          this.saveLoading = false
          this.$message.success(res.msg)
          setTimeout(()=>{
            this.$router.push({name:'GradeList'})
          },500)
        }else{
          this.saveLoading = false
        }
      })
    },
    //新增
    AdminUserUserlevelAddFn(formData){
      console.log("AdminUserUserlevelAddFn",formData)
      AdminUserUserlevelAdd(formData).then(res=>{
        if(res.code === 200){
          this.saveLoading = false
          this.$message.success(res.msg)
          setTimeout(()=>{
            this.$router.push({name:'GradeList'})
          },500)
        }else{
          this.saveLoading = false
        }
      })
    },
    goBack(){
      this.$router.push({name:'GradeList'})
    }
  },
}
</script>
<style scoped lang="less" >
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