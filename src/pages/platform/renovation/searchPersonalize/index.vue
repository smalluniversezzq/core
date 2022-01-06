<template>
  <div class="searchPersonalize">
    <a-spin
      :spinning="spinning"
      style="width: 100%"
    >
      <a-card>
        <div class="title">
          搜索个性化
        </div>
        <div class="content">
          <formSearch
            :businessArr='businessArr'
            @init='initData'
          />
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
import formSearch from "./formSeach";
import { AdminByTbkConfigGetConfig } from "@/services/admin/platform/design";
export default {
  components: {
    formSearch,
  },
  data() {
    return {
      spinning: false,
      businessArr: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 平台名称转换
    transformPlat(arr) {
      arr.forEach((v) => {
        v.type = Number(v.type);
        if (v.type === 1) {
          v.platName = "淘宝";
        }
        if (v.type === 2) {
          v.platName = "京东";
        }
        if (v.type === 3) {
          v.platName = "拼多多";
        }
        if (v.type === 4) {
          v.platName = "唯品会";
        }
        if (v.type === 99) {
          v.platName = "自营商城";
        }
      });
      return arr;
    },
    // 初始化数据
    initData() {
      let that = this;
      let form = {
        name: "search_style",
      };
      that.spinning = true;
      AdminByTbkConfigGetConfig(form)
        .then((res) => {
          console.log("res: ", res);
          if (res.code == 200) {
            that.spinning = false;
            that.businessArr = that.transformPlat(res.data);
          }
        })
        .finally(() => {
          this.spinning = false;
        });
    },
  },
};
</script>

<style lang='less' scoped>
.searchPersonalize {
  /deep/.ant-card-body {
    padding: 0;
    .title {
      padding: 0 25px;
      line-height: 60px;
      border-bottom: 1px solid rgb(224, 224, 224);
    }
    .content {
      margin: 20px 0 0 0;
    }
  }
}
</style>
