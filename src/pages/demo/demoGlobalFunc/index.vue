<template>
  <a-row>
    <a-col :span="12">
      <a-card title="演示">
        <a-card title="打开新的标签页: openNewTabsPage">
          <a-space direction="vertical">
            <a-space>
              <a-input placeholder="打开某个网址" v-model="url"></a-input>
              <a-button @click="openUrl" type="primary">打开网址</a-button> 
            </a-space>
            <a-space>
              <a-input placeholder="打开某个菜单" v-model="menuName"></a-input>
              <a-button @click="openMenu" type="primary">打开菜单</a-button> 
            </a-space>
            <a-button @click="openThisInIframe" type="primary">iframe中打开本页面</a-button>
          </a-space>
        </a-card>
        <a-card title="判断是否在iframe中: ifInIframe">
          <a-space>
            <a-button @click="ifInIframe">判断是否在iframe中</a-button> 
          </a-space>
        </a-card>
        <a-card title="重置iframe框架的滚动条到某个位置: resetFrameContentScroll">
          <a-alert message="此方法只能重置框架容器的滚动条。开发自己写的容器的滚动条无效。"></a-alert><br>
          <a-button @click="reset">重置滚动条为100</a-button> 
        </a-card>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="API">
        <a-card title="打开新的标签页: openNewTabsPage(pageData)">
          <a-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
            <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
          </a-table>
        </a-card>
        <a-card title="判断是否在iframe中: ifInIframe()" style="margin-top:10px;">
          <a-table :columns="columns2" :dataSource="dataSource2" :pagination="false">

          </a-table>
        </a-card>
        <a-card title="重置iframe框架的滚动条到某个位置: resetFrameContentScroll(position)" style="margin-top:10px;">
          <a-table :columns="columns3" :dataSource="dataSource3" :pagination="false">

          </a-table>
        </a-card>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import {openNewTabsPage, ifInIframe, resetFrameContentScroll} from '@/utils/globalFun.js'

export default {
  data(){
    return {
      url: 'https://www.baidu.com/s?wd=vue',
      menuName: 'analysis',
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'pageData.name', description: '路由名。iframe页面路由名：iframeview。', type: 'string',default: ''},
        { key:'2', param: 'pageData.query', description: '传参', type: 'object',default: '--'},
        { key:'3', param: 'pageData.query.url', description: '和name=iframeview配合使用。表示要打开的页面链接。', type: 'string',default: '--'},
        { key:'4', param: 'pageData.query.title', description: '标签的标题', type: 'string',default: '--'}
      ],
      columns2: [
        { title: '返回', dataIndex: 'return' },
        { title: '说明', dataIndex: 'description' },
      ],
      dataSource2: [
        { key:'1', return: 'true', description: '在iframe中'},
        { key:'2', return: 'false', description: '不在iframe中'}
      ],
      columns3: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource3: [
        { key:'1', param: 'position', description: '目标位置。', type: 'number',default: '0'},
      ]
    }
  },
  methods: {
    openUrl(){
      openNewTabsPage({name:'iframeview', query: {url: this.url, title: '外部链接'}})
    },
    openMenu(){
      openNewTabsPage({name: this.menuName, query: {title:'可以重写菜单的标签名'}})
    },
    ifInIframe(){
      alert(ifInIframe()?'在iframe中':'不在iframe中')
    },
    openThisInIframe(){
      openNewTabsPage({name:'iframeview', query: {url:window.location.href, title: 'iframe功能函数'}})
    },
    reset(){
      resetFrameContentScroll(100)
    }
  }
}
</script>
<style lang="less" scoped>
.anticon {
  margin: 10px;
  font-size: 60px;
}
</style>