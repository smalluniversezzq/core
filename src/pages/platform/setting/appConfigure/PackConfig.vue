<!-- // 打包配置 -->
<template>
  <div>
   <a-card
    size="small"
    :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tabChange="(key) => onTabChange(key, 'noTitleKey')">
    <div v-if="noTitleKey == '0'">
      <div >
        <basic-info ></basic-info>
      </div>
    </div>
    <div v-if="noTitleKey == '1'">
      <div >
        <certificate-info></certificate-info>
      </div>
    </div>
    <div v-if="noTitleKey == '2'">
      <div >
        <application-module></application-module>
      </div>
    </div>
   </a-card>
  </div>
</template>

<script>
import BasicInfo from "./components/basicInfo.vue"
import CertificateInfo from "./components/certificate.vue"
import ApplicationModule from "./components/applicationModule.vue"
export default {
  components:{
    BasicInfo,
    CertificateInfo,
    ApplicationModule,
  },
  data(){
    return {
      tabListNoTitle: [
        { key: "0", tab: "基本信息" },
        { key: "1", tab: "证书" },
        { key: "2", tab: "应用模块" },
      ],
      noTitleKey: "0",
      spinning:false,
    }
  },
  methods:{
    onTabChange(key, type) {
      this[type] = key;
    },
  }
}
</script>

<style scoped>
</style>