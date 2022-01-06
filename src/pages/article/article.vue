<template>
  <div class="article">
    <byf-card
      :body-style="{padding: '24px 32px'}"
      :bordered="false"
    >
      <!-- 这里的name和prop需要保持一致 -->
      <byf-form-model
        ref="ruleForm"
        prop="ruleForm"
        :model="form"
        :rules="rules"
      >
        <!-- 描述列表 -->
        <byf-form-item
          ref="title"
          :label="'描述列表'"
          prop="title"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 15}"
        >
          <byf-descriptions
            :title="'用户订单'"
            layout="vertical"
            bordered
            :list="descripitionList"
          ></byf-descriptions>
        </byf-form-item>
        <!-- 徽章 -->
        <byf-form-item
          ref="title"
          :label="'徽章'"
          prop="title"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-badge dot>
            <a-icon type="notification" />
          </byf-badge>
        </byf-form-item>
        <!-- 个人头像 -->
        <byf-form-item
          ref="title"
          :label="'个人头像'"
          prop="title"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >{{form.title}}
          <byf-avatar :size="64"></byf-avatar>
        </byf-form-item>
        <!-- 标题 -->
        <byf-form-item
          ref="title"
          :label="$t('describe')"
          prop="title"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >{{form.title}}
          <byf-input
            :auto-size="{ minRows: 1, maxRows: 6 }"
            :suffix="form.title.length+'/'+rules.title[1].max"
            v-model="form.title"
            :maxLength="rules.title[1].max"
            placeholder="请输入您的标题"
          />
        </byf-form-item>
        <!-- 简介 -->
        <byf-form-item
          ref="region"
          :label="$t('date')"
          prop="region"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-select
            v-model="form.region"
            placeholder="please select your zone"
          >
            <byf-select-option value="shanghai">
              Zone one
            </byf-select-option>
            <byf-select-option value="beijing">
              Zone two
            </byf-select-option>
          </byf-select>
          {{form.region}}
        </byf-form-item>
        <!-- 图片上传 -->
        <a-form-model-item
          :label="$t('describe')"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-upload-btn></byf-upload-btn>
        </a-form-model-item>
        <!-- form-item 任务添加 -->
        <a-form-model-item
          :label="$t('describe')"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <a-button @click="openTask">编辑</a-button>
          <byf-task-edit ref="task"></byf-task-edit>
        </a-form-model-item>
        <a-form-model-item
          :label="$t('describe')"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byfCascader
            :options="options"
            placeholder="请输入选择"
            :load-data="loadData"
            change-on-select
            v-model="casVal"
            @change="onChange"
          ></byfCascader>
          {{casVal}}
        </a-form-model-item>
        <!-- 标签 -->
        <a-form-model-item
          :label="'标签'"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-tag
            v-for="(tag,index) in tags"
            :key="index"
          >{{tag}}</byf-tag>
        </a-form-model-item>
        <a-form-model-item
          :label="'警告提示'"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-alert
            message="Very long warning text warning text text text text text text text"
            banner
            :after-close="handleClose"
            :show-icon="false"
            closable
          />
        </a-form-model-item>
        <a-form-model-item
          :label="'对话框'"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-button
            type="primary"
            @click="showModal"
          >打开模态框</byf-button>
          {{visible}}
          <byf-modal
            v-model="visible"
            title="Basic Modal"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </byf-modal>
        </a-form-model-item>
        <!-- spin -->
        <byf-form-item
          :label="'加载'"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-spin
            :spinning="spinning"
            :delay="delayTime"
          >
            <div class="spin-content">
              可以点击‘切换’按钮，延迟显示 loading 效果。当 spinning 状态在 `delay` 时间内结束，则不显示
              loading 状态。
            </div>
          </byf-spin>
          Loading state：
          <a-switch v-model="spinning" />
        </byf-form-item>
        <byf-form-item
          :label="'多选'"
          prop="date1"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <byf-mul-select
            v-model="form.myselect"
            :list="[1,2,3,4,5,6]"
          ></byf-mul-select>
          {{form.myselect}}
        </byf-form-item>
      </byf-form-model>
    </byf-card>
  </div>
</template>
<script>
// 修改group分组的弹出框
import byfTaskEdit from "./common/byf-task/taskAddEdit";
export default {
  name: 'articleDemo',
  i18n: require("./i18n"),
  components: {
    byfTaskEdit,
  },
  data() {
    return {
      spinning: false,
      delayTime: 500,
      visible: false,
      tags: ["正品保证", "假一赔十", "7天无理由退货"],
      descripitionList: [
        {
          label: "Product",
          content: "Cloud Database"
        },
        {
          label: "Billing Mode",
          content: "Prepaid"
        },
        {
          label: "Automatic Renewal",
          content: "YES"
        },
        {
          label: "Order time",
          content: "2018-04-24 18:00:00"
        },
        {
          label: "Order time",
          content: "2018-04-24 18:00:00"
        },
        {
          label: "Usage Time",
          content: "2019-04-24 18:00:00",
          span: 2
        },
        {
          label: "Negotiated Amount",
          content: "$80.00"
        },
        {
          label: "Discount",
          content: "$20.00"
        },
        {
          label: "Official Receipts",
          content: "$60.00"
        }
      ],
      casVal: null,
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          isLeaf: false
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          isLeaf: false
        }
      ],
      // 图片地址
      imageUrl: "",
      form: {
        title: "",
        brief: "",
        region: undefined,
        myselect: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 70,
            message: "请输入正确标题",
            trigger: "blur"
          }
        ],
        brief: [
          {
            min: 0,
            max: 80,
            message: "请输入正确简介",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    showModal() {
      // this.visible = !this.visible;
      this.$byfconfirm({
        title: "你是否是一个"
      });
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {},
    handleClose() {},
    log() {},
    // eslint-disable-next-line
    onChange(value) {
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      // load options lazily
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: "dynamic1"
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: "dynamic2"
          }
        ];
        this.options = [...this.options];
      }, 1000);
    },
    // 打开或者编辑页面
    openTask() {
      this.$refs.task.setModal1Visible(true);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped lang="less">
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>