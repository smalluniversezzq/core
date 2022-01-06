<template>
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
      help="这里输入文章标题，不能输入相应的特殊字符"
    >
      <a-input
        placeholder="请输入文章标题"
        v-model="form.name"
      />
    </a-form-model-item>
    <a-form-model-item
      label="文章标签"
      prop="resource"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      help="这里输入文章标签，不能输入相应的特殊字符"
    >
      <a-radio-group v-model="form.resource">
        <a-radio value="美食">
          美食
        </a-radio>
        <a-radio value="历史">
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
        placeholder="请选择时间"
        style="width: 100%;"
      />
    </a-form-model-item>
    <a-form-model-item
      label="编辑作者"
      prop="region"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select
        v-model="form.region"
        placeholder="请选择作者"
      >
        <a-select-option value="蒯翔">
          蒯翔
        </a-select-option>
        <a-select-option value="子豪">
          子豪
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapperCol="{ offset: 6 }">
      <byf-button
        type="primary"
        @click="onSubmit"
      >提交</byf-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import SimpleEditor from "@/components/byf/richEditor";
import ByfButton from "@/components/byf/button/ByfButton";
import { addArticle, editArticle } from "@/services/demo";
import moment from "moment";
export default {
  props: {
    editData: {
      type: Object
    },
    modalStatus: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      disabled: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: null,
        delivery: false,
        type: [],
        resource: "美食",
        desc: "",
        content: "",
        dateString: ""
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
            max: 70,
            message: "Length should be 3 to 70",
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
            message: "请填写文章内容",
            trigger: "blur"
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
  mounted() {
    this.initShow();
  },
  methods: {
    initShow() {
      this.form.name = this.editData.title;
      this.form.resource = this.editData.label;
      this.form.region = this.editData.author;
      this.form.date1 = this.editData.upload_time
        ? moment(Number(this.editData.upload_time) * 1000)
        : moment();
      this.form.content = this.editData.content;
      this.$refs.editor.setHtml(this.editData.content);
    },
    setMsg(val) {
      this.form.content = val;
    },
    // 关闭Modal框
    closeModal() {
      // 同时需要清除模态框
      // this.$refs.ruleForm.resetFields();
      this.form.name = "";
      this.form.label = "";
      this.form.content = "";
      this.form.date1 = null;
      this.form.region = "";
      // 取消
      this.$emit("cancel", event.target.value);
    },
    // 时间进行编号
    // timeChange(date, dataString) {
    //   // console.log(dataString);
    //   this.form.dataString = dataString;
    // },
    onSubmit() {
      // 判断是编辑还是添加
      if (this.modalStatus == "edit") {
        // 编辑模式
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            var obj = {
              id: this.editData.id,
              label: this.form.resource,
              title: this.form.name,
              content: this.form.content,
              upload_time: moment(this.form.date1).valueOf() / 1000,
              isPublish: 1,
              author: this.form.region
            };
            editArticle(obj).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.$emit("cancel");
                this.$emit("ok", 1);
                // 清空数据
                // this.$refs.ruleForm.resetFields();
                // this.form.content = "";
                // obj.id = res.data.id;

                // 增加一条数据,需要通知父元素添加数据
                // this.$emit("edit", obj);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            return false;
          }
        });
        return;
      } else {
        // 添加模式
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var obj = {
            label: this.form.resource,
            title: this.form.name,
            content: this.form.content,
            upload_time: moment(this.form.date1).valueOf() / 1000,
            isPublish: 1,
            author: this.form.region
          };
          addArticle(obj).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.$emit("cancel");
              this.$emit("ok", 1);
              // 清空数据
              this.$refs.ruleForm.resetFields();
              this.form.content = "";
              obj.id = res.data.id;

              // 增加一条数据,需要通知父元素添加数据
              this.$emit("add", obj);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  watch: {
    editData: function() {
      this.initShow();
    }
  },
  components: {
    SimpleEditor,
    ByfButton
  }
};
</script>
