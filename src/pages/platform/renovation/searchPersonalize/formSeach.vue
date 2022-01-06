<template>
  <div class="form">

    <a-form-model
      v-for="(item,index) in businessArr"
      :key='index'
      :label-col="{xxl:{span:2},sm:{span:3}}"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        :label="`${item.platName}业务`"
        class="header"
      >
        <!-- 平台 -->
        <a-radio-group v-model="item.status">
          <a-radio :value="1">开启</a-radio>
          <a-radio :value="0">关闭</a-radio>

        </a-radio-group>

        <a-popover
          placement="leftTop"
          v-if="index===0"
        >
          <template slot="title">
            <span>示例</span>
          </template>
          <template
            slot="content"
            class="demo"
          >
             <img src="@/assets/img/goodsIndividualization/search-example.png" alt="">
          </template>
          <div class="formToopltip">
            <byf-icon type="iconhelp"></byf-icon>
            <span>示例</span>
          </div>
        </a-popover>
        <!-- 设置平台信息 -->

      </a-form-model-item>
      <a-form-model-item :wrapper-col="{span: 12, offset: 2}">
        <div class="childrenForm">
          <a-form-model
            ref="formRule"
            :model="item"
            :rules="rules"
          >
            <a-form-model-item
              label="显示顺序"
              v-bind='childrenForm'
              prop='sort'
            >
              <a-input v-model.trim="item.sort" />
            </a-form-model-item>
            <a-form-model-item
              label="显示文字"
              v-bind='childrenForm'
              prop='text'
            >
              <a-input v-model.trim="item.text" />
            </a-form-model-item>
            <a-form-model-item
              label="业务广告"
              v-bind='childrenForm'
              class="adlink"
              help="图片建议尺寸22*22px"
            >
              <div class="upload">
                <byf-upload-btn
                  :imgsList="[item.banner]"
                  :info='item.platName'
                  @change='getImgUrl(arguments)'
                ></byf-upload-btn>
              </div>
            </a-form-model-item>
            <a-form-model-item
              label="广告链接"
              v-bind='childrenForm'
            >
              <div
                style="margin: 7px 0 0 0;"
              >
                <link-selector-input
                  style="width:200px;background:#fff;"
                  :links="item.link.url?[item.link]:[]"
                  @confirm="changeLinkSelect(arguments,item)"
                ></link-selector-input>
              </div>
              <!-- <a-input
                addon-before="Http://"
                v-model="item.url"
              /> -->
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{span: 12, offset: 2}">
        <div
          v-if="index===businessArr.length-1"
          class="submitBtn"
        >
          <a-button
            :loading="spinning"
            @click="submit"
            type="primary"
          >保存</a-button>
        </div>
      </a-form-model-item>
    </a-form-model>

  </div>
</template>

<script>
import linkSelectorInput from "@/components/byf/linkSelector/linkSelectorInput";

import { AdminByTbkConfigSetConfig } from "@/services/admin/platform/design";

export default {
  components: {
    linkSelectorInput,
  },
  props: {
    businessArr: {
      type: Array,
    },
  },

  data() {
    // 显示顺序重复验证
    const sortCheck = async (rule, value, callback) => {
      if (value.length < 1) {
        return callback(new Error("显示顺序不能为空！"));
      } else if (value) {
        let arrLength = this.businessArr.filter(
          (v) => Number(v.sort) === Number(value)
        );

        if (arrLength.length > 1) {
          return callback(new Error("显示顺序不能重复"));
        }
      } else {
        callback();
      }
    };
    return {
      rules: {
        sort: [
          {
            required: true,
            validator: sortCheck,
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "显示文字不能为空",
            trigger: "blur",
          },
        ],
      },
      spinning: false,
      childrenForm: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },

      labelCol: { span: 2 },
      wrapperCol: { span: 14 },

      platDemo: [],
    };
  },

  methods: {
    // 选择链接地址
    changeLinkSelect(e,item) {
      console.log("e: ", e[0][0]);
      console.log(item);
      if (e[0].length > 0) {
        this.businessArr.forEach((v) => {
          if (v.platName == item.platName) {
            v.link = e[0][0];
          }
        });
      } else {
        this.businessArr.forEach((v) => {
          if (v.platName == item.platName) {
            v.link = "";
          }
        });
      }
    },
    // 选择广告图
    getImgUrl(e) {
      if (!e[0][0]) {
        this.businessArr.forEach((v) => {
          if (v.platName == e[2]) {
            v.banner = "";
          }
        });
      } else {
        this.businessArr.forEach((v) => {
          if (v.platName == e[2]) {
            v.banner = e[0][0];
          }
        });
      }
    },
    // 提交
    async submit() {
      let that = this;
      let validArr = that.$refs.formRule.length;

      await that.$refs.formRule.forEach((v) => {
        v.validate((valid) => {
          if (!valid) {
            validArr--;
          }
        });
      });
      if (validArr < that.$refs.formRule.length) return;
      let config = that.businessArr.map((v) => {
        let json = {};
        json.type = v.type;
        json.banner = v.banner;
        json.text = v.text;
        json.link = v.link;
        json.sort = v.sort;
        json.status = v.status;
        json.search_link = v.search_link;
        return json;
      });
      let form = {
        name: "search_style",
        config,
      };
      that.spinning = true;
      AdminByTbkConfigSetConfig(form).then((res) => {
        if (res.code === 200) {
          this.$emit("init");

          that.spinning = false;
          this.$message.success(res.msg);
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.form {
  padding: 0 25px;
  .header {
    /deep/ .ant-form-item-children {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      .formToopltip {
        font-size: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 12px;
          margin: 0px 0px 0px 5px;
        }
      }
      .demo {
        flex: none;
        cursor: pointer;
        color: #999;
      }
    }
  }

  .childrenForm {
    padding: 10px 20px;
    width: 400px;
    background: #eaeaea;
    border-radius: 4px;
    /deep/ .adlink {
      .ant-form-item-control {
        display: flex;
      }
      .ant-form-explain {
        margin: 0 0 0 10px;
        display: flex;
        align-items: center;
      }
    }
    .upload {
      display: flex;
      align-items: center;
      border: 1px dashed rgb(175, 174, 174);
      width: 102px;
      height: 102px;
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
      .ant-upload-picture-card-wrapper {
        width: 128px;
      }
    }
  }
  .submitBtn {
    margin: 20px 0 0 0;
  }
}
</style>
