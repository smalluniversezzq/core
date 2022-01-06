 <!--设置返佣权益-->
<template>
  <a-card
    size="small"
    :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tabChange="(key) => onTabChange(key, 'noTitleKey')"
  >
    <div v-if="type == 1 || type == 0" v-show="noTitleKey == '0'">
      <a-spin class="fixed" tip="Loading..." :spinning="payUpgradeformDataShow && levelState">
      </a-spin>
      <div v-if='!payUpgradeformDataShow && !levelState'>
        <agent-commission :id="id" :levelList="levelList" :gradeName="gradeName" :sourceData="sourceData"></agent-commission>
      </div>
    </div>
    <div v-if="type == 1 || type == 0" v-show="noTitleKey == '3'">
      <a-spin class="fixed" tip="Loading..." :spinning="payUpgradeformDataShow && levelState">
      </a-spin>
      <div v-if='!payUpgradeformDataShow && !levelState && noTitleKey == "3"'>
        <agent-upgrade-commission :id="id" :levelList="levelList" :gradeName="gradeName" :sourceData="up_rebate_info"></agent-upgrade-commission>
      </div>
    </div>
    <div v-if="type == 2" v-show="noTitleKey == '1'">
      <a-spin class="fixed" tip="Loading..." :spinning="payUpgradeformDataShow && levelState">
      </a-spin>
      <div v-if='!payUpgradeformDataShow && !levelState'>
        <mall-commission :id="id" :levelList="levelList" :gradeName="gradeName" :sourceData="sourceData"></mall-commission>
      </div>
    </div>
    <div v-if="type == 2" v-show="noTitleKey == '2'">
      <a-spin class="fixed" tip="Loading..." :spinning="payUpgradeformDataShow && levelState">
      </a-spin>
      <div v-if='!payUpgradeformDataShow && !levelState && noTitleKey == "2"'>
        <upgrade-commission :id="id" :levelList="levelList" :gradeName="gradeName" :sourceData="up_rebate_info"></upgrade-commission>
      </div>
    </div>
  </a-card>
</template>
<script>
  import {
    AdminUserUserlevelDetail,
    AdminUserUserLevelSetRebateInfo,
    AdminUserUserLevelgGetLevel,
  } from "@/services/platform/vips.js";
  import agentCommission from "./components/agentCommission";
  import agentUpgradeCommission from "./components/agentUpgradeCommission";
  import mallCommission from "./components/mallCommission";
  import upgradeCommission from "./components/upgradeCommission ";

  export default {
    components: {
      agentCommission,
      mallCommission,
      upgradeCommission,
      agentUpgradeCommission
    },
    
    data() {
      return {
        id: "",
        type: "",
        tabListNoTitle: [
          { key: "0", tab: "商城CPS返佣" },
          { key: "3", tab: "付费返佣" },
          { key: "1", tab: "商城CPS返佣" },
          { key: "2", tab: "付费返佣" },
        ],
        noTitleKey: "0",
        payUpgradeformDataShow: false,
        levelState:false,
        sourceData:"",
        levelList:"",
        data:"",
        gradeName:"",
        up_rebate_info:"",
      };
    },
    watch:{
      $route: function(newRoute,oldRoute) {
        console.log(newRoute,oldRoute)
        if(newRoute.path === oldRoute.path){
          if(newRoute.fullPath !== oldRoute.fullPath){
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
            console.log(this.id, this.type);
            if (this.type == 1 || this.type ==0) {
              let tablist = [
                { key: "0", tab: "商城CPS返佣" },
                { key: "3", tab: "付费返佣" },
                ];
              this.tabListNoTitle = tablist;
              this.noTitleKey = "0";
            } else if (this.type == 2) {
              let tablist = [
                { key: "1", tab: "商城CPS返佣" },
                { key: "2", tab: "付费返佣" },
              ];
              this.tabListNoTitle = tablist;
              this.noTitleKey = "1";
            }
            this.AdminUserUserLevelgGetLevelFn();
            if (this.id) {
              this.AdminUserUserlevelDetailFn(this.id);
              this.payUpgradeformDataShow = true;
            }
          }
        }
      }
    },
    created() {},
    mounted() {
      this.id = this.$route.query.id;
      this.type = this.$route.query.type;
      console.log(this.id, this.type);
      if (this.type == 1 || this.type ==0) {
        let tablist = [
          { key: "0", tab: "商城CPS返佣" },
          { key: "3", tab: "付费返佣" },
        ];
        this.tabListNoTitle = tablist;
        this.noTitleKey = "0";
      } else if (this.type == 2) {
        let tablist = [
          { key: "1", tab: "商城CPS返佣" },
          { key: "2", tab: "付费返佣" },
        ];
        this.tabListNoTitle = tablist;
        this.noTitleKey = "1";
      }
      this.AdminUserUserLevelgGetLevelFn();
      if (this.id) {
        this.AdminUserUserlevelDetailFn(this.id);
        this.payUpgradeformDataShow = true;
      }
    },
    methods: {
      onTabChange(key, type) {
        this[type] = key;
      },
      // 获取会员等级
      AdminUserUserLevelgGetLevelFn() {
        this.levelState = true
        AdminUserUserLevelgGetLevel({
          id: this.id,
        }).then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.levelList = res.data
            this.levelState =false
          }else{
            this.levelState =false
          }
        });
      },
      AdminUserUserlevelDetailFn(id) {
        AdminUserUserlevelDetail({ id }).then((res) => {
          if (res.code === 200) {
            this.data = res.data
            console.log(res);
            this.sourceData = res.data.rebate_info
            this.up_rebate_info = res.data.up_rebate_info
            this.payUpgradeformDataShow = false
            this.gradeName = res.data.name
          } else {
            this.data = res.data
            this.$message.error(res.msg);
            this.sourceData = res.data.rebate_info
            this.up_rebate_info = res.data.up_rebate_info
            this.payUpgradeformDataShow = false
            this.gradeName = res.data.name
          }
        });
      },
      AdminUserUserLevelSetRebateInfoFn() {
        AdminUserUserLevelSetRebateInfo({}).then((res) => {
          if (res.code === 200) {
            console.log(res);
          }
        });
      },
    },
  };
</script>
<style scoped lang="less" >
.fixed {
  position: fixed;
  top: 50%;
  left: 50%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>