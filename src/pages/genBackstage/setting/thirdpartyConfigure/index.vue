<template>
  <div>
    <a-card size="small">
      <a-tabs
        v-model="activeKey"
        default-active-key="0"
        tab-position="top"
      >
        <a-tab-pane v-for="item in tabListNoTitle" :key="item.key" :tab="item.tab"></a-tab-pane>
      </a-tabs>
      <smsConfigIndex v-if="activeKey == 5"></smsConfigIndex>
      <storageConfig v-if="activeKey == 10"></storageConfig>
    </a-card>
  </div>
</template>

<script>
import smsConfigIndex from './smsConfig/index'
import storageConfig from './storageConfig'

export default {
  components: {
    smsConfigIndex,
    storageConfig,
  },
  data(){
    return {
      activeKey: '5',
      tabListNoTitle: [
        // {key: '0', tab: '微信'},
        // {key: '1', tab: '支付宝'},
        // {key: '2', tab: '一键登录认证'},
        // {key: '3', tab: '分享'},
        // {key: '4', tab: '推送'},
        {key: '5', tab: '短信'},
        // {key: '6', tab: '客服'},
        // {key: '7', tab: '物流'},
        // {key: '8', tab: '实名认证'},
        // {key: '9', tab: '地图'},
        {key: '10', tab: '存储'},
      ],
    }
  },
}
</script>

<style>

</style>