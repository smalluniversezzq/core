<template>
  <a-card title="标签页">
    <a-card title="基本用法">
      <byf-tabs v-model="activeKey1">
        <byf-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</byf-tab-pane>
        <byf-tab-pane key="2" tab="Tab 2">
          Content of Tab Pane 2
        </byf-tab-pane>
        <byf-tab-pane key="3" tab="Tab 3">
          Content of Tab Pane 3
        </byf-tab-pane>
      </byf-tabs>
        <a-alert :message="'选中key为'+activeKey1+'项'" style="margin-top:10px;" />
    </a-card>
    <a-card title="禁用某一项">
      <byf-tabs >
        <byf-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</byf-tab-pane>
        <byf-tab-pane key="2" tab="Tab 2" disabled>
          Content of Tab Pane 2
        </byf-tab-pane>
        <byf-tab-pane key="3" tab="Tab 3">
          Content of Tab Pane 3
        </byf-tab-pane>
      </byf-tabs>
    </a-card>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      activeKey1: '2'
    };
  },
  methods: {
  },
};
</script>