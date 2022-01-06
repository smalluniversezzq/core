<!-- 站点设置 -->
<template>
  <div>
    <a-card>
      <a-form-model
        ref="form"
        :model="formData"
        :rules="rules"
        :label-col="labelCol" 
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item  label="平台状态" :help="formData.platform_status==0?'说明:关闭平台后,移动端无法再打开页面':''" prop="platform_status">
          <a-radio-group :options="plainOptions" v-model="formData.platform_status" @change="onChangeClose" />
          <a-row class="bg" v-show='formData.platform_status==0' :style="{ width: 'calc(70% )'}">
            <a-col class="mt">
              <a-form-model-item label="提示文字" :label-col="{span: 4,}" :wrapperCol="{span: 20}"  prop="platform_close_tips">
                <a-textarea style="width:400px" :rows="6" v-model="formData.platform_close_tips"  placeholder="请输入提示文字"></a-textarea>
              </a-form-model-item>
            </a-col>
        </a-row>
        </a-form-model-item>
        <a-form-model-item  label="项目名称"  prop="platform_project_name"  help="说明:用于APP端展示系统名称时显示，建议和APP名称保持一致">
          <a-input style="width:400px"  v-model="formData.platform_project_name"  placeholder="请输入项目名称"></a-input>
        </a-form-model-item>
        <a-form-model-item class='mt' label="项目logo" help="说明:请上传1024*1024大小的logo图片，用于APP端展示logo时显示"  prop="platform_project_logo">
          <byf-upload-btn @change="changeImage" :imgsList="[formData.platform_project_logo]" ></byf-upload-btn>
        </a-form-model-item>
        <a-form-model-item class='mt' label="客服电话"  help="说明:用于APP端联系客服使用" prop="platform_tel">
          <a-input style="width:400px"  v-model="formData.platform_tel" placeholder="请输入客服电话"></a-input>
        </a-form-model-item>
      </a-form-model>
      <a-row class="mt">
        <a-col span="2" offset="2">
          <a-button type="primary" @click="platformConfigSet" :loading="saveLoading">保存</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-modal :destroyOnClose="true" :maskClosable="false" width="60%" v-model="resultModalVisible" @ok="resultModalVisible = false" title="设置失败">
      <a-form-model :label-col="labelCol"
      :wrapper-col="wrapperCol">
        <a-form-model-item v-for="(item, index) in saveResult" :key="index" :label="item.title" v-show="!item.success">
          {{item.msg}}
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import mixin from '@/pages/platform/setting/mixin/index'
  // let checkTel = (rule, value, callback) => {
  //   console.log(!(/^1(3|4|5|6|7|8|9)d{9}$/.test(value)))
  //   if (value === '') {
  //     callback(new Error('客服电话不能为空'));
  //   }else if (!(/^1[3456789]\d{9}$/.test(value))) {
  //     callback(new Error("请填写正确的手机号!"));
  //   }else {
  //     callback();
  //   }
  // };
export default {
  mixins: [mixin],
  data(){
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      formData:{
        platform_status: 0,
        platform_close_tips:"系统加紧维护中，暂时关闭使用~",
        platform_project_name:"",
        platform_project_logo:"",
        platform_tel:"",
      },
      plainOptions: [
        {label: '开启', value: "1"},
        {label: '关闭', value: "0"}
      ],
      rules:{
        platform_status: [
          { required: true, message: '平台状态不能为空'},
        ],
        platform_close_tips: [
          { required: true, message: '提示文字不能为空',trigger: 'change'},
        ],
        platform_project_name: [
          { required: true, message: '项目名称不能为空' ,trigger: 'change'},
        ],
        platform_project_logo:[
          { required: true, message: '请上传一张项目logo,规格为1024*1024' ,trigger: 'change'},
        ],
        platform_tel:[
          { required: true, message: '请填写客服电话' ,trigger: 'change' }
        ]
      },
      keyOfValue:{
        platform_status: '平台状态不能为空',
        platform_close_tips: '提示文字不能为空',
        platform_project_name: '项目名称不能为空',
        platform_project_logo: '项目logo不能为空',
        platform_tel: '客服电话不能为空',
      },

    }
  },
  methods:{
    onChange(val){
      console.log(val)
    },
    submit(){
      console.log(this.formData,"formData")
    },
    changeImage(val){
      console.log(val,"changeImage")
      this.formData.platform_project_logo = val[0]
    },
    onChangeClose(val){
      console.log(val.target.value)
      this.formData.platform_status = val.target.value
    },
  },
}
</script>

<style scoped>
</style>