<template>
  <div>
    <a-form-model
      ref="form"
      :model="formData"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-form-model-item label="类型" prop="type">
        <a-radio-group name="type" v-model="formData.type" @change="typeChange">
          <a-radio v-for="item in typeList" :key="item.value" :value="item.value">{{item.name}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <div v-if="formData.type == 2">
        <a-form-model-item label="选择APP" prop="use_app">
          <a-radio-group name="app" v-model="formData.params.use_app" @change="appChange">
            <a-radio v-for="item in appList" :key="item.value" :value="item.value">{{item.name}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <div v-show="formData.params.use_app != 6">
          <a-form-model-item help="说明：请输入目标链接" label="目标链接" prop="url" >
            <a-input v-model="formData.url" placeholder="https://" ></a-input>
          </a-form-model-item>
        </div>
        <div v-show="formData.params.use_app == 6">
          <a-form-model-item label="schema(安卓)" prop="schema_android"  help="说明：选择自定义APP跳转时，需要输入目标APP的schema，这个schema需要去对应APP的官方文档中查找。">
            <a-input v-model="formData.params.android_schema" placeholder="请输入" ></a-input>
          </a-form-model-item>
          <a-form-model-item label="schema(苹果)" prop="schema_ios"  help="说明：选择自定义APP跳转时，需要输入目标APP的schema，这个schema需要去对应APP的官方文档中查找。">
            <a-input v-model="formData.params.ios_schema" placeholder="请输入" ></a-input>
          </a-form-model-item>
        </div>
      </div>
      <div v-show="formData.type == 1">
        <a-form-model-item label="链接" prop="url" >
          <a-input v-model="formData.url" placeholder="请输入" ></a-input>
        </a-form-model-item>
      </div>
      <div v-if="formData.type == 4">
        <a-form-model-item label="小程序ID" prop="appid" help="说明：输入小程序对应的原始ID">
          <a-input v-model="formData.params.appid" placeholder="请输入" ></a-input>
        </a-form-model-item>
        <br/>
        <a-form-model-item label="页面路径" prop="page" help="说明：输入小程序页面的路径，不输入则默认进入小程序首页">
          <a-input v-model="formData.params.page" placeholder="请输入页面路径，可不输" ></a-input>
        </a-form-model-item>
      </div>
      <div v-show="formData.type == 6">
        <a-form-model-item label="选择事件" prop="app">
          <a-radio-group name="event" v-model="formData.url" @change="eventChange">
            <a-radio v-for="item in eventList" :key="item.value" :value="item.value">{{item.name}}</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <div v-if="formData.url == 'toast'">
          <a-form-model-item label="提示文字" prop="msg">
            <a-input :maxLength="20" v-model="formData.params.msg" placeholder="请输入" >
              <div slot="suffix">{{formData.params.msg.length || 0}}/20</div>
            </a-input>
          </a-form-model-item>
        </div>
        <div v-if="formData.url == 'alert'">
          <a-form-model-item label="提示文字" prop="msg">
            <a-textarea :maxLength="500" :auto-size="{ minRows: 2}" v-model="formData.params.msg" placeholder="请输入" >
            </a-textarea >
            <div slot="help">文字弹窗最多500字：{{formData.params.msg.length || 0}}/500</div>
          </a-form-model-item>
        </div>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
// const defaultInputValueObj = {
//   schema_android: '',
//   schema_ios: '',
//   url: '',
//   link: '',
//   mini_app_id: '',
//   mini_app_link: '',
//   msg: '',
// }
const defaultFormData = {
  type: 2,
  link_id: '',
  name: '',
  url: '',
  access_control: {},
  params: {
    use_app: 1,
    ios_schema: '',
    android_schema: '',
    appid: '',
    page: '',
    msg: '',
  }
}
export default {
  props: {
    linkFormat: {
      type: Object,
      default: () => {
        return {}
      }
    },
    links: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data(){
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      formData: {},
      typeList: [
        {value: 2, name: '跳转外部APP'},
        {value: 1, name: 'APP内打开链接'},
        {value: 4, name: '跳转微信小程序'},
        {value: 6, name: '事件'},
      ],
      appList: [
        {value: 1, name: '手机浏览器'},
        {value: 2, name: '淘宝'},
        {value: 3, name: '京东'},
        {value: 4, name: '拼多多'},
        {value: 5, name: '唯品会'},
        {value: 6, name: '自定义(schema)'},
      ],
      eventList:[
        {value: 'refresh', name: '刷新页面'},
        {value: 'goback', name: '返回上页'},
        {value: 'scan', name: '扫一扫'},
        {value: 'systemSet', name: '打开系统通知'},
        {value: 'toast', name: 'toast提示'},
        {value: 'alert', name: '文字弹窗'},
      ]
    }
  },
  created(){
    this.initFormData();
  },
  methods: {
    initFormData(){
      defaultFormData.access_control = this.linkFormat.access_control;
      if(this.links.length){
        // 判断是否为链接跳转中的type
        let hasLinkJump = this.typeList.some(item => {return item.value == this.links[0].type});
        if(hasLinkJump){
          this.formData = cloneDeep(this.links[0])
          this.formData.params = {...defaultFormData.params,...this.formData.params}
        }else{
          this.formData = cloneDeep(defaultFormData)
        }
      }else{
        this.formData = cloneDeep(defaultFormData)
      }
    },
    getLinkName(link){
      let name = '';
      if(link.type == 2){
        name += '跳转-';
        name += this.appList.filter(item => {return item.value == link.params.use_app})[0].name;
      }
      if(link.type == 1 || link.type == 4){
        name += this.typeList.filter(item => {return item.value == link.type})[0].name;
      }
      if(link.type == 6){
        name += this.typeList.filter(item => {return item.value == link.type})[0].name + '-';
        name += this.eventList.filter(item => {return item.value == link.url})[0].name;
      }
      return name;
    },
    getSelectedLinks(){
      let link = cloneDeep(this.formData);
      if(link.type == 2){
        delete link.params.appid
        delete link.params.page
        delete link.params.msg
        if(link.params.use_app != 6){
          // 跳转外部app，并且不是自定义app
          delete link.params.android_schema
          delete link.params.ios_schema
        }
      }
      if(link.type == 1){
        // APP内打开链接 h5
        link.params = null;
        link.params = {
          native_ability: true
        }
        // TODO 后续需要去掉，暂时实现
        link.access_control.sys.push({
          key: 1,
          data: null
        })
      }
      if(link.type == 4){
        delete link.params.use_app
        delete link.params.android_schema
        delete link.params.ios_schema
        delete link.params.msg
      }
      if(link.type == 6){
        if(link.url != 'toast' && link.url != 'alert'){
          link.params = null;
        }else{
          delete link.params.appid
          delete link.params.page
          delete link.params.use_app
          delete link.params.android_schema
          delete link.params.ios_schema
        }
      }
      link.name = this.getLinkName(link);
      link.desc = link.name;
      return [link];
    },
    emitCheckedLink(){
      this.$emit('checkedLink', this.selectedLinks)
    },
    addLinkToSelectedLinks(link){
      // 添加链接到选中列表中
      if(this.multiple){
        // 多选
        this.selectedLinks.push(link);
      }else{
        // 单选
        this.$set(this.selectedLinks, 0, link);
      }
    },
    delLinkForSelectedLinks(link){
      // 从选择列表中删除
      this.selectedLinks.splice(this.selectedLinks.findIndex(item => {return item.link_id == link.link_id}), 1);
    },
    typeChange(){
      this.clearAllInput();
      if(this.formData.type == 6){
        // 处理默认事件选中
        this.formData.url = 'refresh'
      }
    },
    appChange(){
      this.clearAllInput();
    },
    eventChange(){
      // this.clearAllInput();
    },
    clearAllInput(){
      this.formData.url = '';
      // this.formData = {...this.formData, ...defaultInputValueObj}
    }
  }
}
</script>

<style scoped lang="less">
</style>