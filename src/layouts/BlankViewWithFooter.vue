// 从BlankView.vue 复制而来，添加上了PageFooter
<template>
  <page-toggle-transition id="blank-view-with-footer-content" :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction" :class="{ 'page-toggle-transition':  isCore, 'not-is-core': !isCore}" class="beauty-scroll">
    <router-view style="padding: 15px 15px 0;" class="router-view"/>
    <page-footer v-if="!$route.meta.iframeUrl" :link-list="footerLinks" :copyright="copyrightText()" />
  </page-toggle-transition>
</template>

<script>
import PageToggleTransition from '../components/transition/PageToggleTransition';
import PageFooter from '@/layouts/footer/PageFooter'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'BlankViewWithFooter',
  components: {PageToggleTransition, PageFooter},
  computed: {
    ...mapState('setting', ['multiPage', 'animate', 'footerLinks', 'copyright']),
    ...mapGetters('setting', ['platformInfo']),
    ...mapGetters('siteConfig', ['configInfo']),
    isCore(){
      let isCore = false;
      if(process.env.VUE_APP_DEVELOP_GROUP == 'core'){
        isCore = true;
      }
      return isCore;
    }
  },
  methods: {
    copyrightText(){
      let text = '';
      if(this.platformInfo.copyright_status == 1){
        if(this.configInfo){
          text = this.configInfo.sys_copyright
        }
      }else if(this.platformInfo.copyright_status == 2){
        text = this.platformInfo.copyright_text;
      }
      return text;
    },
  }
}
</script>

<style lang="less" scoped>
#blank-view-with-footer-content {
  overflow: overlay;
}
.page-toggle-transition {
  height: 100%;
  min-width: 1200px;

  .router-view {
    min-height: calc(100% - 70px);
  }
}
.not-is-core{
  height: 100%;
  overflow: auto;
}
</style>
