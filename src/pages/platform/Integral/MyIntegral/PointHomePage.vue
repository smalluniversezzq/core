// 积分主页
<template>
  <div>
    <a-card>
      <a-spin :spinning="spinning">
        <a-form-model
          ref="form"
          :model="formData"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-form-model-item label="积分主页">
            <div class="integral-radio-help">
              <a-radio-group v-model="formData.style" @change="styleChange">
                <a-radio value="1"> 主页1	</a-radio>
                <a-radio value="2"> 主页2 </a-radio>
              </a-radio-group>
              <help class="help"></help>
            </div>
            <div class="sub-form-item">
              <a-form-model-item v-if="formData.style == '1'" class="mb" label="积分商城链接图" prop="img" help="说明：我的积分主页积分商城跳转图片，建议上传750*200像素，JPG、PNG格式图片"
                :label-col="{span: 4, xxl: {span: 3}}"
                :wrapper-col="wrapperCol">
                <div class="integral-logo-help">
                  <byf-upload-btn :imgsList="[formData.img]" @change="imgChange"></byf-upload-btn>
                  <help class="help"></help>
                </div>
              </a-form-model-item>
              <a-form-model-item v-if="formData.style == '2'" label="跳转页面-赚积分" prop="earn_link"
                :label-col="{span: 4, xxl: {span: 3}}"
                :wrapper-col="wrapperCol">
                <linkInput 
                  class="link-input"
                  @confirm="val => confirm(val, 'earn_link')" 
                  :selectors="selectors"
                  :jurisdiction="false" 
                  :links="link_earn_link"></linkInput>
              </a-form-model-item>
              <a-form-model-item v-if="formData.style == '2'" label="跳转页面-花积分" prop="consume_link"
                :label-col="{span: 4, xxl: {span: 3}}"
                :wrapper-col="wrapperCol">
                <linkInput 
                  class="link-input"
                  @confirm="val => confirm(val, 'consume_link')" 
                  :selectors="selectors"
                  :jurisdiction="false" 
                  :links="link_consume_link"></linkInput>
              </a-form-model-item>
            </div>
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
            <a-button type="primary" @click="save" :loading="saveLoading">保存</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { 
  getAdminPlatformInteGralIndexStyle, 
  adminPlatformInteGralSiteIndexStyle,
} from '@/services/admin/platform/integral'

import linkInput from '@/components/byf/linkSelector/linkSelectorInput'
import help from '@/pages/platform/common/help.vue'
export default {
  components: {
    linkInput,
    help
  },
  data(){
    let img = (rule, value, callback) => {
      if(this.formData.style == '1'){
        if(this.formData.img == ''){
          callback(new Error('请选择积分商城链接图'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let earn_link = (rule, value, callback) => {
      if(this.formData.style == '2'){
        if(this.formData.earn_link == ''){
          callback(new Error('请选择跳转页面-赚积分链接'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let consume_link = (rule, value, callback) => {
      if(this.formData.style == '2'){
        if(this.formData.consume_link == ''){
          callback(new Error('请选择跳转页面-花积分链接'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 17 },
      formData: {},
      rules: {
        img: [{ required: true, validator: img, trigger: 'change' }],
        earn_link: [{ required: true, validator: earn_link, trigger: 'change' }],
        consume_link: [{ required: true, validator: consume_link, trigger: 'change' }],
      },
      spinning: false,

      selectors: [1,2,3,4,5,6],
      link_earn_link: [],
      link_consume_link: [],

      saveLoading: false,

    }
  },
  created(){
    this.getAdminPlatformInteGralIndexStyle()
  },
  methods: {
    styleChange(){
      this.$refs.form.clearValidate()
    },
    imgChange(val){
      this.formData.img = val[0] || ''
      this.$refs.form.validateField('img');
    },
    getAdminPlatformInteGralIndexStyle(){
      getAdminPlatformInteGralIndexStyle().then(res => {
        if(res.code == 200){
          this.formData = res.data;
          if(this.formData.earn_link){
            this.link_earn_link = [this.formData.earn_link];
          }
          if(this.formData.consume_link){
            this.link_consume_link = [this.formData.consume_link];
          }
        }
      })
    },
    confirm(val, type){
      this.formData[type] = val[0] || '';
      this.$refs.form.validateField(type);
    },
    save(){
      this.$refs.form.validate(valid => {
        if(valid){
          this.saveLoading = true;
          adminPlatformInteGralSiteIndexStyle(this.formData).then(res => {
            if(res.code == 200){
              this.$message.success(res.msg);
            }
          }).finally(() => {
            this.saveLoading = false;
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sub-form-item{
  background: @background-color-light;
  padding: 10px;
}
.integral-logo-help{
  display: flex;
  .help{
    margin-left: 20px;
  }
}
.link-input{
  margin-top: 6px;
}
</style>