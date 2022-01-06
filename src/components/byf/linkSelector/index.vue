<template>
  <div>
    <a-config-provider :locale="locale">
      <a-modal :maskClosable="false" :width="1000" v-model="visible" :title="modalTitle" :afterClose="afterClose">
        <a-spin :spinning="spinning" style="width: 100%">
          <a-tabs v-if="!spinning && selectors.length != 1" v-model="activeKey">
            <a-tab-pane v-for="item in tabsList" :key="item.tab_key">
              <template slot="tab">
                {{item.title}}
              </template>
            </a-tab-pane>
          </a-tabs>
        </a-spin>
        <div class="content beauty-scroll" v-if="!spinning">
          <appPage 
            v-if="activeKey == 1" 
            @checkedLink="checkedLink"
            :max="max"
            :business="business" 
            :links="selectedLinks" 
            :linkFormat="linkObj(1)"
            :apiParams="apiParams"
            ></appPage>
          <goodsPage 
            v-if="activeKey == 2"
            @checkedLink="checkedLink"
            :max="max"
            :multiple="multiple" 
            :business="business" 
            :links="selectedLinks" 
            :linkFormat="linkObj(2)"
            :apiParams="apiParams"
            ></goodsPage>
          <goodsClassifyPage 
            v-if="activeKey == 3"
            @checkedLink="checkedLink"
            :max="max"
            :multiple="multiple" 
            :business="business" 
            :links="selectedLinks" 
            :linkFormat="linkObj(3)"
            :tabItemParams="tabItemParamsObj(3)"
            :apiParams="apiParams"
            ></goodsClassifyPage>
          <customPage 
            v-if="activeKey == 4"
            @checkedLink="checkedLink"
            :max="max"
            :multiple="multiple" 
            :links="selectedLinks" 
            :linkFormat="linkObj(4)"
            :apiParams="apiParams"
            ></customPage>
          <articlePage v-if="activeKey == 5"></articlePage>
          <linkJumpPage 
            ref="linkJumpPage"
            v-if="activeKey == 6"
            :links="selectedLinks" 
            :linkFormat="linkObj(6)"
            ></linkJumpPage>
        </div>
        <div slot="footer" class="footer">
          <byf-space size="large">
            <a-button type="primary" @click="confirm">确认</a-button>
            <a-button @click="cancel">关闭</a-button>
          </byf-space>
        </div>
      </a-modal>
    </a-config-provider>
  </div>
</template>

<script>
import { getTab } from '@/components/byf/linkSelector/services/admin/platform/designLink'
import { cloneDeep } from 'lodash'
import appPage from './selectorPage/app';
import goodsPage from './selectorPage/goods';
import goodsClassifyPage from './selectorPage/goodsClassify';
import customPage from './selectorPage/custom';
import articlePage from './selectorPage/article';
import linkJumpPage from './selectorPage/linkJump';
import mixin from '@/components/byf/linkSelector/mixin/index.js'

let locale = require("ant-design-vue/es/locale-provider/zh_CN").default;
export default {
  mixins: [mixin],
  props: {
    extraTitle: {
      type: String,
      default: () => {
        return '';
      }
    },
    selectors: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  components: {
    appPage,
    goodsPage,
    goodsClassifyPage,
    customPage,
    articlePage,
    linkJumpPage
  },
  data(){
    return {
      locale,
      visible: true,
      activeKey: 1,
      tabs: [],
      spinning: true,
      selectedLinks: cloneDeep(this.links),
    }
  },
  computed: {
    tabsList(){
      let list = this.tabs;
      return list;
    },
    modalTitle(){
      let title = '链接选择器';
      if(this.selectors.length == 1){
        if(this.tabs.length){
          let titleItem = this.tabs.filter(item => {
            return item.tab_key == this.selectors[0]
          })
          title = titleItem[0].title;
          title += '选择器'
        }
      }
      if(this.extraTitle){
        title += `（${this.extraTitle}）`
      }
      return title;
    },
    params(){
      let params = {};
      if(this.apiParams.tabParams){
        if(this.apiParams.tabParams.tab){
          params = this.apiParams.tabParams.tab;
        }
      }
      return params
    }
  },
  created(){
    this.getTab();
  },
  methods: {
    /**
     * Modal 完全关闭后的回调
     */
    afterClose() {
      // 发出这个事件，为了销毁这次创建的dom元素。
      this.$emit("afterClose");
    },
    // 对应标签页的tab上的参数
    tabItemParamsObj(tab_key){
      let link = this.tabs.filter(item => {return tab_key == item.tab_key});
      return link[0];
    },
    linkObj(tab_key){
      let link = this.tabs.filter(item => {return tab_key == item.tab_key});
      return link[0].link;
    },
    getTab(){
      this.spinning = true;
      getTab({tabs: this.selectors, ...this.params}).then(res => {
        this.tabs = [];
        if(res.code == 200){
          this.tabs = res.data.list;
          this.activeKey = this.tabs[0].tab_key;
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    checkedLink(links){
      this.selectedLinks = links;
    },
    showModal(){
      this.visible = true;
    },
    getLinkJumpSelectedLinks(){
      // 获取链接跳转中的数据，给到selectedLinks
      if(this.activeKey == 6){
        this.selectedLinks = this.$refs.linkJumpPage.getSelectedLinks();
      }
    },
    confirm(){
      this.getLinkJumpSelectedLinks();
      this.$emit('confirm', {
        action: "confirm",
        links: this.selectedLinks,
      })
      this.visible = false;
    },
    cancel(){
      this.visible = false;
    }
  }
}
</script>

<style scoped lang="less">
.content{
  max-height: 50vh;
  min-height: 100px;
  overflow-x: hidden;
  overflow-y: overlay;
}
.footer{
  text-align: center;
}
</style>