<template>
  <a-modal :maskClosable="false"
    :width="800"
    :title="operationType == 'add' ? '添加模板' : '编辑模板'"
    style="top: 10px"
    :visible="showModal"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    okText="保存"
    @cancel="modalCancel"
    @ok="save"
  >
    <a-form-model ref="form" :model="form" :rules="rules" 
      :labelCol="labelCol"
      :wrapperCol="wrapperCol">
      <a-form-model-item label="模板名称" prop="title" >
        <a-input placeholder="请输入模板名称" v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="页面类型" prop="page_type_group">
        <a-radio-group v-model="form.page_type_group" :disabled="operationType=='edit'">
          <a-radio v-for="(item,index) in PageTypeKeyMap" :key="index" :value="+index">{{item}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="终端类型" prop="device_type">
        <a-radio-group v-model="form.device_type" :disabled="operationType=='edit'">
          <a-radio v-for="(item,index) in DeviceTypeKeyMap" :key="index" :value="+index">{{item}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item v-show="form.page_type_group!=3 && form.device_type == 1" label="适用设备" prop="apply_os">
        <a-checkbox-group
          v-model="form.apply_os"
          name="checkboxgroup"
          :options="plainOptions"
        />
      </a-form-model-item>
      <a-form-model-item label="审核专用" prop="is_audit" v-if="form.page_type_group==1">
        <a-radio-group v-model="form.is_audit">
          <a-radio :value="1"> 是 </a-radio>
          <a-radio :value="0"> 否 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="适用版本" prop="version_start" help="说明：可以设置当前模板仅在某个APP版本中使用，版本号格式为1.2.10" v-if="form.page_type_group!=3">
        <a-radio-group v-model="version_type" style="margin-top: 9px;">
          <a-radio :value="0"> 全部版本 </a-radio>
          <a-radio :value="1"> 单个版本 </a-radio>
          <a-radio :value="2"> 多个版本 </a-radio>
          <br/>
          <br/>
          <ul class="update-logs" v-if="version_type != 0">
            <li v-if="version_type == 1">
              <div class="title">版本号</div>
              <div class="input"><a-input-number v-model="form.version_start[0]" :min="0" :max="99" :step="1"/></div>
              <div class="dot-wrap">.</div>
              <div class="input"><a-input-number v-model="form.version_start[1]" :min="0" :max="99" :step="1"/></div>
              <div class="dot-wrap">.</div>
              <div class="input"><a-input-number v-model="form.version_start[2]" :min="version_3(form.version_start[0], form.version_start[1])" :max="99" :step="1"/></div>
            </li>
            <li v-if="version_type == 2">
              <div class="title">最小版本号</div>
              <div class="input"><a-input-number v-model="form.version_start[0]" :min="0" :max="99" :step="1"/></div>
              <div class="dot-wrap">.</div>
              <div class="input"><a-input-number v-model="form.version_start[1]" :min="0" :max="99" :step="1"/></div>
              <div class="dot-wrap">.</div>
              <div class="input"><a-input-number v-model="form.version_start[2]" :min="version_3(form.version_start[0], form.version_start[1])" :max="99" :step="1"/></div>
            </li>
            <li v-if="version_type == 2">
              <div class="title">最大版本号</div>
              <div class="input"><a-input-number v-model="form.version_end[0]" :min="0" :max="99" :step="1"/></div>
              <div class="dot-wrap">.</div>
              <div class="input"><a-input-number v-model="form.version_end[1]" :min="0" :max="99" :step="1"/></div>
              <div class="dot-wrap">.</div>
              <div class="input"><a-input-number v-model="form.version_end[2]" :min="version_3(form.version_end[0], form.version_end[1])" :max="99" :step="1"/></div>
            </li>
          </ul>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item v-if="operationType=='edit'" label="模板状态" prop="status">
        <a-radio-group v-model="form.status">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="0">禁用</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {getAdminPlatformDesignAdd, getAdminPlatformDesignSetting} from '@/services/admin/platform/design'
import cloneDeep from 'lodash/cloneDeep'
import {PageTypeKeyMap, DeviceTypeKeyMap, ApplyOs} from '../common'
export default {
  props: {},
  data() {
    return {
      plainOptions: [],
      showModal: false,
      disabled: false,
      confirmLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
      form: {
        device_type: 1,
        title: "",
        page_type_group: 1,
        apply_os: [],
        is_audit: 0,  //审核专用：1是 0 否
        version_start: [0,0,1],
        version_end: [0,0,1],
      },
      version_type: 0,
      PageTypeKeyMap,
      DeviceTypeKeyMap,
      // 表单校验规则
      rules: {
        title: [{ required: true, message: '请输入模板标题', trigger: 'blur' },],
        page_type_group: [{ required: true, message: '请选择页面类型', trigger: 'blur' },],
        device_type: [{ required: true, message: '请选择终端类型', trigger: 'blur' },],
        apply_os: [{ required: true, message: '请选择使用设备', trigger: 'blur' },],
        is_audit: [{ required: true, message: '请选择审核专用', trigger: 'blur' },],
        version_start: [{ required: true, message: '请选择使用版本', trigger: 'blur' },]
      },
      operationType: "add", // 操作类型：add：添加；edit：修改
    };
  },
  computed:{
    
    
  },
  created() {
    for(let x in ApplyOs) {
      this.plainOptions.push({label: ApplyOs[x], value: x})
    }
    this.resetForm();
  },
  methods: {
    // 最后一位版本号最小值
    version_3(v1, v2){
      let version = 0;
      if(v1 == 0 && v2 == 0){
        version = 1
      }
      return version
    },
    chooseAvatar() {
      this.$byfUpload().then((res) => {
        if (res.action == "confirm") {
          this.form.avatar = res.selectedImgs[0].url;
        }
      });
    },
    resetForm() {
      this.$nextTick(() => {
        this.form.device_type = 1;
        this.form.title = "";
        this.form.page_type_group = 1;
        this.form.apply_os = ['android', 'ios'];
        this.form.is_audit = 0
      });
    },
    modalCancel() {
      this.showModal = false;
      this.confirmLoading = false;
      this.resetForm();
    },
    /**
     * 展示弹窗
     * @param [obj] 要编辑的用户数据，不传就是添加用户
     */
    showModalAction(data) {
      if (data) {
        this.operationType = "edit";
        
        let copyData = JSON.parse(JSON.stringify(data))
        
        // 判断version_type
        if(copyData.version_end) {
          this.version_type = 2
        } else if(copyData.version_start) {
          this.version_type = 1
        } else {
          this.version_type = 0
        }
        if(copyData.version_start && typeof copyData.version_start == 'string') {
          copyData.version_start = copyData.version_start.split('.')
        } else {
          copyData.version_start = [0,0,1]
        }
        if(copyData.version_end && typeof copyData.version_end == 'string') {
          copyData.version_end = copyData.version_end.split('.')
        } else {
          copyData.version_end = [0,0,1]
        }
        this.initForm(copyData);
      } else {
        this.operationType = "add";
      }
      this.showModal = true;
      console.log(this.form)
    },
    initForm(data) {
      if (!data) {
        this.resetForm();
      } else {
        this.form = data;
      }
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 校验通过
          this.confirmLoading = true;
          let data = cloneDeep(this.form)
          if(this.version_type == 0) {
            // 全部版本
            data.version_start = null
            data.version_end = null
          } else if(this.version_type == 1) {
            data.version_start = data.version_start.join('.')
            data.version_end = null
          } else {
            data.version_start = data.version_start.join('.')
            data.version_end = data.version_end.join('.')
          }

          if (this.operationType == 'add') {
            // 新增
            getAdminPlatformDesignAdd(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.$emit('confirm', {operationType: this.operationType})
                this.modalCancel();
              }
            }).finally(() => {
              this.confirmLoading = false;
            });
          } else {
            // 修改
            getAdminPlatformDesignSetting(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.$emit('confirm', {operationType: this.operationType})
                this.modalCancel();
              }
            }).finally(() => {
              this.confirmLoading = false;
            });
          }
        }
      })
    },
  },
};
</script>
<style lang="less" scoped>
.choose-avatar {
  cursor: pointer;
}
.input-max {
  width: 100%;
}
.update-logs{
    border: 1px solid #d9d9d9;
    border-bottom: none;
    padding: 0;
    width: 470px;
    li{
      overflow: hidden;
      border-bottom: 1px solid #d9d9d9;
      >div{
        box-sizing: border-box;
        float: left;
        text-align: center;
        font-size: 12px;
        height: 32px;
        line-height: 32px;
        &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5){
          border-right: 1px solid #d9d9d9;
        }
      }
      .title{
        width: 20%;
      }
      .input{
        width: 20%;
        /deep/ .ant-input-number{
          border:none;
        }
      }
      .dot-wrap{
        width: 10%;
        font-weight: bold;
      }
      
    }
  }
</style>