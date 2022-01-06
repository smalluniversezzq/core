<template>
  <a-card title="多级分类">
    <a-card title="演示" :bodyStyle="{background: '#f0f2f5'}">
      <a-space>
        <a-button @click="getData">拿取数据</a-button>
        <a-button @click="add">添加一级分类</a-button>
        <a-button @click="expandAll(false)">全部折叠</a-button>
        <a-button @click="expandAll(true)">全部展开</a-button>
      </a-space>
      <muti-level-classify ref="mutiLevelClassify" :list="list" @operate="onOperate"></muti-level-classify>
    </a-card>
    <a-card title="API">
      <a-card title="属性">
        <a-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
          <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
        </a-table>
      </a-card>
      <a-card title="事件" style="margin-top:10px;">
        <a-table :columns="columns2" :dataSource="dataSource2" :pagination="false">
          <template slot="callBack" slot-scope="text">
            <pre>{{text}}</pre>
          </template>
        </a-table>
      </a-card>
      <a-card title="方法" style="margin-top:10px;" :bodyStyle="{background: 'white'}">
        <a-table :columns="columns3" :dataSource="dataSource3" :pagination="false">
          <!-- 普通的文本 -->
          <template slot="normal-text" slot-scope="text">
            {{ text ? text : "-" }}
          </template>
        </a-table>
      </a-card>
    </a-card>
  </a-card>
</template>
<script>
import testData from './mutiLevelClassifyData.json'
import MutiLevelClassify from '@/components/byf/mutiLevelClassify/MutiLevelClassify'

export default {
  components: {MutiLevelClassify}, 
  data(){
    return {
      list: testData,
      p1:'',
      p2: '',
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'list', description: '多级分类数据', type: 'Array<Object>',default: '[]'},
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack', scopedSlots: { customRender: 'callBack' }  }
      ],
      dataSource2: [
        { 
          key:'1', 
          eventName: 'operate', 
          description: '操作按钮点击事件', 
          callBack: `
@param [string] type 操作类型
@param [array] indexPath 索引路径数组
@param [object] classify 一条分类数据
Function(type, indexPath, classify)
          `
        }
      ],
      columns3: [
        { title: '名称', dataIndex: 'methodName' },
        { title: '描述', dataIndex: 'description' },
        { title: '传参', dataIndex: 'params', scopedSlots: { customRender: 'normal-text' }, },
        { title: '返回值', dataIndex: 'callBack' }
      ],
      dataSource3: [
        { key:'1', methodName: 'addLevelOne', description: '添加一级分类', callBack: '-'},
        { key:'2', methodName: 'toggleShow', description: '切换某个分类的显示隐藏状态', params:'[array] indexPath 索引路径', callBack: '-'},
        { key:'3', methodName: 'setAd', description: '设置广告 的方法', params:'[array] indexPath 索引路径, [string] ad_img, [string] ad_url', callBack: '-'},
        { key:'4', methodName: 'delete', description: '删除某条分类数据', params:'[array] indexPath 索引路径', callBack: '-'},
        { key:'5', methodName: 'getData', description: '获取分类数据', params:'-', callBack: '当前分类数据Array<Object>'},
        { key:'6', methodName: 'expandAll', description: '扩展或折叠', params:'[boolean] type true:全展开;false:全折叠。', callBack: '-'}
      ],
    }
  },
  methods: {
    getData(){
      console.log(this.$refs.mutiLevelClassify.getData())
    },
    add(){
      this.$refs.mutiLevelClassify.addLevelOne()
    },
    /**
     * 操作按钮被点击
     * @param [string] type 操作类型
     * @param [array] indexPath 索引路径数组
     * @param [object] classify 一条分类数据
     */
    onOperate(type, indexPath, classify){
      console.log('classify: ', classify)
      switch(type){
        case 'toggleShow':
          // 请求切换状态接口
          // .......
          // 请求接口 完成

          this.$refs.mutiLevelClassify.toggleShow(indexPath)
          break;
        case 'setAd':
          // 设置广告操作 开始
          // .......
          // 设置广告操作 完成
          this.$refs.mutiLevelClassify.setAd(indexPath, 'http://a3.att.hudong.com/64/52/01300000407527124482522224765.jpg', 'http://www.baidu.com')
          break;
        case 'delete':
          // 请求删除接口 开始
          // .......
          // 请求删除接口 完成
          this.$refs.mutiLevelClassify.delete(indexPath)
          break;
      }
    },
    expandAll(type){
      this.$refs.mutiLevelClassify.expandAll(type)
    }
  }
}
</script>
<style lang="less" scoped>
</style>