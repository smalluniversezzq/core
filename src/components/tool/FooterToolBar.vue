<template>
  <div class="toolbar" ref="toolbar">
    <div style="float: left">
      <slot name="extra"></slot>
    </div>
    <div style="float: right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolBar',
  mounted(){
    this.setFooterPosition();
    window.onresize = () => {
      this.setFooterPosition();
    }
  },
  methods:{
    setFooterPosition(){
      // 控制台端时设置
      if(document.getElementById('gen-layout-content')){
        let scrollbarHeight = document.getElementById('gen-layout-content').offsetHeight - document.getElementById('gen-layout-content').clientHeight;
        this.$refs.toolbar.style.bottom = `${scrollbarHeight}px`;
      }
      // 平台端非iframeUrl时设置
      if(!this.$route.meta.iframeUrl && document.getElementById('tabs-view-by-content')){
        let scrollbarHeight = document.getElementById('tabs-view-by-content').offsetHeight - document.getElementById('tabs-view-by-content').clientHeight;
        this.$refs.toolbar.style.bottom = `${scrollbarHeight}px`;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .toolbar{
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    box-shadow: 0 -1px 2px @shadow-color;
    background: @base-bg-color;
    border-top: 1px solid @border-color-split;
    padding: 12px 24px;
    z-index: 9;
  }
</style>
