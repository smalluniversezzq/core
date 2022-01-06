<template>
  <a-modal :maskClosable="false"
    :width="800"
    title="文章编辑"
    style="top: 10px;"
    :visible="modal1Visible"
    @ok="() => setModal1Visible(false)"
    @cancel="() => setModal1Visible(false)"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-form-model-item
        ref="name"
        label="文章标题"
        prop="name"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          placeholder="请输入文章标题"
          v-model="form.name"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item
        label="文章标签"
        prop="resource"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group v-model="form.resource">
          <a-radio value="1">
            美食
          </a-radio>
          <a-radio value="2">
            历史
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- 文章内容 -->
      <a-form-model-item
        label="文章内容"
        prop="content"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
      
        <simple-editor
          ref="editor"
          @changelHtml="setMsg"
        />
      </a-form-model-item>
      <a-form-model-item
        label="上传时间"
        required
        prop="date1"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-date-picker
          v-model="form.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item
        label="任务负责人"
        prop="region"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          v-model="form.region"
          placeholder="please select your zone"
        >
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item
        label="产品描述"
        prop="desc"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-model="form.desc"
          type="textarea"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import SimpleEditor from "@/components/byf/richEditor";
export default {
  name: 'taskAddEdit',
  data() {
    return {
      modal1Visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "1",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setMsg(val) {
      this.form.msg = val;
    },
    setModal1Visible(val) {
      this.modal1Visible = val;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  components: {
    SimpleEditor
  }
};
</script>
