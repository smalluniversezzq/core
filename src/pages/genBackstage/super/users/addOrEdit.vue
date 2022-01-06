<template>
  <a-modal :maskClosable="false"
    :width="800"
    :title="operationType == 'add' ? '添加用户' : '用户编辑'"
    style="top: 10px"
    :visible="showModal"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    okText="保存"
    @cancel="modalCancel"
    @ok="save"
  >
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item
        label="用户姓名"
        prop="real_name"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="请输入用户姓名" v-model="form.real_name" />
      </a-form-model-item>
      <a-form-model-item
        label="用户头像"
        prop="avatar"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-avatar
          class="choose-avatar"
          :src="form.avatar"
          shape="square"
          icon="user"
          :size="64"
          @click="chooseAvatar"
        />
      </a-form-model-item>
      <a-form-model-item
        label="登录手机号"
        prop="mobile"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="登录手机号" v-model="form.mobile" />
      </a-form-model-item>
      <a-form-model-item
        label="登录密码"
        prop="password"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input :placeholder="operationType=='add'?'不输入默认为手机号':'不输入则不修改密码'" v-model="form.password" />
      </a-form-model-item>
      <a-form-model-item
        label="最大平台数"
        prop="platform_limit"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-number class="input-max" :precision="0" :min="0" placeholder="请输入商户最大数" v-model="form.platform_limit"></a-input-number>
      </a-form-model-item>
      <a-form-model-item
        label="账号状态"
        prop="status"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group v-model="form.status">
          <a-radio :value="1"> 正常 </a-radio>
          <a-radio :value="0"> 禁用 </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {
  adminPlatformUsersAdd,
  adminPlatformUsersEdit,
} from "@/services/adminUser";
export default {
  props: {},
  data() {
    let checkPlatformLimit = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('最大平台数不能为空'));
      }
      if (value < this.form.platform_current) {
        return callback(new Error('用户当前平台数为' + this.form.platform_current + '修改的最大平台数不能小于当前平台数'));
      }
      callback();
    };
    return {
      plainOptions: ["APP", "H5", "小程序"],
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
        id: "",
        password: "",
        avatar: "",
        real_name: "",
        mobile: "",
        platform_limit: 0,
        status: 1,  // 1:正常；0：禁用
      },
      // 表单校验规则
      rules: {
        real_name: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "登录手机号不能为空", trigger: "blur" },
          {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号' }
        ],
        platform_limit: [
          { validator: checkPlatformLimit, trigger: "blur" },
        ],
      },
      operationType: "add", // 操作类型：add：添加；edit：修改
    };
  },
  created() {
    this.resetForm();
  },
  methods: {
    chooseAvatar() {
      this.$byfUpload().then((res) => {
        if (res.action == "confirm") {
          this.form.avatar = res.selectedImgs[0].url;
        }
      });
    },
    resetForm() {
      this.$nextTick(() => {
        this.form.id = "";
        this.form.password = "";
        this.form.avatar = "";
        this.form.real_name = "";
        this.form.mobile = "";
        this.form.platform_limit = 0;
        this.form.status = 1;
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
        this.initForm(JSON.parse(JSON.stringify(data)));
      } else {
        this.operationType = "add";
      }
      console.log(data)
      this.showModal = true;
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
          if (this.operationType == 'add') {
            // 新增
            adminPlatformUsersAdd(this.form).then((res) => {
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
            adminPlatformUsersEdit(this.form).then((res) => {
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
</style>