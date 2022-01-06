<template>
  <a-card>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="初始化内容配置">
        <init-content-config></init-content-config>
      </a-tab-pane>
      <a-tab-pane key="2" tab="App下载配置">
        <download-config></download-config>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import InitContentConfig from './initContentConfig'
import DownloadConfig from './downloadConfig'
export default {
  components: { InitContentConfig, DownloadConfig}

}
</script>

<style>

</style>