<template>
  <div>
    <a-row>
      <byf-space direction="vertical">
      <a-col :span="24">
        <a-card title="链接选择器" size="small">
          <a-alert 
            message="注意：使用链接选择器Input组件时，如需要链接名字超出省略，请在外层增加固定宽度" 
            type="info" show-icon />
          <a-alert 
            type="info" show-icon >
            <span slot="message">
              其他说明可参考wiki：
              <a-button size="small" type="link">
                <a style="text-decoration: underline" target="_blank" href="http://172.16.0.32:8090/pages/viewpage.action?pageId=8519789">
                  http://172.16.0.32:8090/pages/viewpage.action?pageId=8519789
                </a> 
              </a-button>
            </span>
          </a-alert>
          <linkInput 
            style="width: 300px"
            :disabled="disabled"
            @confirm="confirm" 
            :jurisdiction="false" 
            :selectors="selectors" 
            :links="link"
            :apiParams="apiParams"
            extraTitle="这里是extraTitle额外的title"></linkInput>
            当前选中：{{link}}
            <br/>
            <a-button @click="openLinkSelector">多选(部分支持)</a-button>
            <br/>
            当前选中：
            {{selectedLinks}}
        </a-card>
      </a-col>
      <a-col :span="24">
        <a-card title="链接选择器-API" size="small">
          <a-space direction="vertical" style="width:100%">
            <a-alert 
            message="通过'this.$byfLinkSelector(params)'方法调起上传组件, 此方法会返回一个promise对象。" 
            type="info" show-icon />
            <a-card title="传参" size="small">
              <a-table size="small" :columns="columns1" :dataSource="dataSource1" :pagination="false">
                <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
              </a-table>
            </a-card>
            <a-card title="结果回调 Promise.then(res=>{ /**some business*/})" size="small">
              <a-table size="small" :columns="columns2" :dataSource="dataSource2" :pagination="false"></a-table>
            </a-card>
            <a-card title="selectors[]说明" size="small">
              <a-table size="small" :columns="columns3" :dataSource="dataSource3" :pagination="false"></a-table>
            </a-card>
            <a-card title="links{}说明" size="small">
              <a-table size="small" :columns="columns4" :dataSource="dataSource4" :pagination="false"></a-table>
            </a-card>
            <a-card title="apiParams{}说明，每个页面参数内部区分接口参数，字段为接口api配置字段（小驼峰）" size="small">
              <a-table size="small" :columns="columns5" :dataSource="dataSource5" :pagination="false"></a-table>
              <a-alert
                message="filterSelecteList：页面中下拉框筛选时使用的过滤参数，用于过滤支持筛选种类，默认选中第一个，数组顺序可控制下拉框顺序，注意，每个页面的类型值可能不同，type：Array<Any>，当数组长度为1时，则页面不在显示下拉选择"/>
            </a-card>
          </a-space>
        </a-card>
      </a-col>
      </byf-space>
    </a-row>
  </div>
</template>

<script>
import linkInput from '@/components/byf/linkSelector/linkSelectorInput'
export default {
  components: {
    linkInput
  },
  data(){
    return {
      apiParams: {
        tabParams: {
          tab: {
            ceshi: '测试tab接口参数'
          }
        },
        appPageParams: {
          appPage: {
            ceshi: '测试参数appPage接口'
          }
        },
        goodsPageParams: {
          shopGoodsCategoryIndex: {
            ceshi: '测试参数shopGoodsCategoryIndex'
          },
          shopGoodsSpuIndex: {
            ceshi: '测试参数shopGoodsSpuIndex'
          }
        },
        goodsClassifyPageParams: {
          shopGoodsCategoryIndex: {
            ceshi: '测试参数shopGoodsCategoryIndex'
          },
          filterSelecteList: [],
        },
        customPageParams: {
          templateIndex: {
            ceshi: '测试参数templateIndex'
          }
        },

      },
      disabled: false,
      selectedLinks: [],
      link: [],
      links: [
        {
          access_control: {
            sys: [],
            user: []
          },
          desc: "通用业务：我的余额",
          link_id: "3",
          name: "我的余额",
          params: null,
          type: 0,
          url: "/center/index",
        }
      ],
      selectors: [],
      multiple: false,
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'multiple', description: '是否支持多选(链接选择输入框组件不支持此参数),true：多选。false：单选，注意：部分选择器不支持多选', type: 'boolean',default: 'false'},
        { key:'2', param: 'max', description: '限制多选数量，多选时有效，现仅商品/商品分类/自定义页面支持', type: 'Number',default: '0'},
        { key:'3', param: 'selectors', description: '需要调用的链接选择器中的类型列表，Number数组，空数组或不传则为全部，多选时数组长度只能为1', type: 'Array<Number>描述见下方',default: '[]'},
        { key:'4', param: 'links', description: '默认选中的链接数组：见下方说明', type: 'Array<Obj>',default: '[]'},
        { key:'5', param: 'jurisdiction', description: '是否展示权限按钮（第一版不可使用）', type: 'boolean',default: 'false'},
        { key:'6', param: 'disabled', description: '链接输入框组件参数：是否禁用', type: 'boolean',default: 'false'},
        { key:'7', param: 'apiParams', description: '链接输入api接口参数：见下方说明', type: 'Object',default: {}},
        { key:'8', param: 'extraTitle', description: '链接选择器顶部title额外追加字段，会以括号形式追加', type: 'String',default: ''},
      ],
      columns2: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource2: [
        { key:'1', param: 'action', description: "用户操作：'confirm':用户点击了确认,'cancel':用户点击取消或关闭。", type: 'string',default: ''},
        { key:'2', param: 'links', description: "当action=confirm时会有此参数，表示选中的链接数组", type: 'Array<linkObj>',default: '[]'},
      ],
      columns3: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
      ],
      dataSource3: [
        { key:'1', param: '1', description: 'APP页面', type: 'Number', default: 'false'},
        { key:'2', param: '2', description: '商品', type: 'Number',default: '[]'},
        { key:'3', param: '3', description: '商品分类', type: 'Number',default: '[]'},
        { key:'4', param: '4', description: '自定义页面', type: 'Number',default: '[]'},
        { key:'5', param: '5', description: '文章选择', type: 'Number',default: '[]'},
        { key:'6', param: '6', description: '链接跳转', type: 'Number',default: '[]'},
      ],
      columns4: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
      ], 
      dataSource4: [
        { key:'1', param: 'type', description: '链接类型', type: 'Number',},
        { key:'2', param: 'link_id', description: '链接ID', type: 'String',},
        { key:'3', param: 'url', description: '链接（或schema或其他）', type: 'String',},
        { key:'4', param: 'name', description: '链接名称', type: 'String',},
        { key:'5', param: 'access_control', description: '访问控制{sys[{key: 1, data: null}]系统级，user[{key: 4, data: {level: ["level-01", "level-02"]}}]用户及}', type: 'Number',},
        { key:'6', param: 'params', description: '额外控制参数，没有数据值为null', type: 'Number',},
      ],
      columns5: [
        { title: '页面参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
      ],
      dataSource5: [
        { key:'0', param: 'tabParams', description: '链接选择器顶部tabs标签页参数', type: 'Object{ tab:{}, filterSelecteList: []}',},
        { key:'1', param: 'appPageParams', description: 'app页面选择器参数', type: 'Object{appPage:{}, filterSelecteList: []}',},
        { key:'2', param: 'goodsPageParams', description: '商品选择参数', type: 'Object{shopGoodsCategoryIndex:{//商品选择页面分类接口参数},shopGoodsSpuIndex: {//商品选择页面商品列表接口参数}, filterSelecteList: []}',},
        { key:'3', param: 'goodsClassifyPageParams', description: '商品分类选择参数', type: 'Object{shopGoodsCategoryIndex:{}, filterSelecteList: []}',},
        { key:'4', param: 'customPageParams', description: '自定义页面选择参数', type: 'Object{templateIndex:{}, filterSelecteList: []}',},
      ],
    }
  },
  methods: {
    confirm(link){
      console.log('linkSelectorInput确认选择链接')
      console.log(link)
      this.link = link;
    },
    openLinkSelector(){
      console.log('openLinkSelector')
       this.$byfLinkSelector({multiple: true,max: 3, links: this.selectedLinks, apiParams:this.apiParams}).then(res => {
        console.log(res)
        if(res.action == 'confirm'){
          // 确认
          this.selectedLinks = res.links;
        }
      })
    }
  }
}
</script>

<style>

</style>