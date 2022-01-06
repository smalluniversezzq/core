<template>
  <div>
    <a-card 
      size="small"
      >
        <a-tabs
        v-model="activeKey"
        default-active-key="0"
        tab-position="top"
        @prevClick="callback"
        @nextClick="callback"
      >
        <a-tab-pane v-for="item in tabListNoTitle" :key="item.key" :tab="item.tab"></a-tab-pane>
      </a-tabs>
      <weixinConfig v-if="activeKey == 1"></weixinConfig>
      <alipayConfig v-if="activeKey == 2"></alipayConfig>
      <oneClickLogin v-if="activeKey == 3"></oneClickLogin>
      <shareConfig v-if="activeKey == 4"></shareConfig>
      <pushConfig v-if="activeKey == 5"></pushConfig>
      <smsConfigIndex v-if="activeKey == 6"></smsConfigIndex>
      <supportStaffConfig v-if="activeKey == 7"></supportStaffConfig>
      <logisticsConfig v-if="activeKey == 8"></logisticsConfig>
      <realNameAuthentication v-if="activeKey == 9"></realNameAuthentication>
      <aMapConfig v-if="activeKey == 10"></aMapConfig>
      <storageConfig v-if="activeKey == 11"></storageConfig>
      <weixinOfficialAccountsConfig v-if="activeKey == 12"></weixinOfficialAccountsConfig>
    </a-card>
  </div>
</template>

<script>
import weixinConfig from './weixinConfig'
import alipayConfig from './alipayConfig'
import smsConfigIndex from './smsConfig/index'
import storageConfig from './storageConfig'
import oneClickLogin from './oneClickLogin'
import shareConfig from './shareConfig/index'
import pushConfig from './pushConfig'
import supportStaffConfig from './supportStaffConfig'
import logisticsConfig from './logisticsConfig'
import realNameAuthentication from './realNameAuthentication'
import aMapConfig from './aMapConfig'
import weixinOfficialAccountsConfig from './weixinOfficialAccountsConfig'

export default {
  components: {
    weixinConfig,
    alipayConfig,
    smsConfigIndex,
    storageConfig,
    oneClickLogin,
    shareConfig,
    pushConfig,
    supportStaffConfig,
    logisticsConfig,
    realNameAuthentication,
    aMapConfig,
    weixinOfficialAccountsConfig
  },
  data(){
    return {
      activeKey: '1',
      tabListNoTitle: [
        {key: '1', tab: '微信开放平台'},
        {key: '12', tab: '微信公众号'},
        {key: '2', tab: '支付宝'},
        {key: '3', tab: '一键登录认证'},
        {key: '4', tab: '分享'},
        {key: '5', tab: '推送'},
        {key: '6', tab: '短信'},
        {key: '7', tab: '客服'},
        {key: '8', tab: '物流'},
        {key: '9', tab: '实名认证'},
        {key: '10', tab: '地图'},
        {key: '11', tab: '存储'},
      ],
    }
  },
  created(){
    if(this.$route.query.activeKey){
      this.activeKey = this.$route.query.activeKey.toString()
    }
  },
  methods: {
    onTabChange(){},
    callback(){}
  }
}
</script>

<style>

</style>