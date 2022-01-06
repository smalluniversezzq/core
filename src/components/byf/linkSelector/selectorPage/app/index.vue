<template>
  <div>
    <a-form-model
        ref="searchForm"
        :model="searchFormData"
        :wrapperCol="wrapperCol"
      >
        <a-row>
          <a-col :span="12">
            <a-form-model-item prop="type">
              <a-input-group compact>
                <a-select v-model="searchFormData.business_type" @change="searchSelectChange" style="width:100px">
                  <a-select-option :value="item.type" v-for="item in businessList" :key="item.type">
                    {{item.name}}
                  </a-select-option>
                </a-select>
                <a-input @pressEnter="getAppPage" style="width: 50%" v-model="searchFormData.keyword" placeholder="请输入搜索内容" />
              </a-input-group>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <br/>
      <a-spin :spinning="spinning">
        <a-empty v-if="linkList.length == 0"/>
        <div class="content">
          <ul class="item">
            <li v-for="item in linkList" :key="item.category_id">
              <p>{{item.category_name}}</p>
              <ul class="btn-wrap">
                <li v-for="link in item.children" :key="link.link.link_id" class="btn-item">
                  <a-button :disabled="link.icon == 4" :title="link.link.desc" :type="actived(link.link) ? 'primary' : ''" class="link-btn" @click="checkItem(link.link)">
                    {{link.link.name | nameFormat}}
                    <a-tag v-if="link.icon" class="tag-item" :color="iconItem(link.icon).color">{{iconItem(link.icon).name}}</a-tag>
                  </a-button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </a-spin>
  </div>
</template>

<script>
import { getAppPage } from '@/components/byf/linkSelector/services/admin/platform/designLink'
import { cloneDeep } from 'lodash'
import mixin from '@/components/byf/linkSelector/mixin/index.js'
export default {
  mixins: [mixin],
  props: {
  },
  data(){
    return {
      businessList: [
        { type: 1, name: '淘宝' },
        { type: 2, name: '京东' },
        { type: 3, name: '拼多多' },
        { type: 4, name: '唯品会' },
        { type: 5, name: '线上商城' },
      ],
      tagColors: [
        {icon: 1, color: '#ff8d1a', name: 'new'},
        {icon: 2, color: '#ff5a00', name: 'hot'},
        {icon: 3, color: '#808080', name: '下架'},
        {icon: 4, color: '#a6a6a6', name: '期待'},
      ],
      spinning: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      selectedLinks: cloneDeep(this.links),
      list: [],
      searchFormData: {
        keyword: '',
        business_type: 5
      },
    }
  },
  computed: {
    linkList(){
      let list = cloneDeep(this.list);
      for(let i = 0; i < list.length; i++){
        let item = list[i];
        if(item.children.length){
          for(let k = 0; k < item.children.length; k++){
            let linkItem = item.children[k];
            linkItem.link_id = linkItem.id;
          }
        }
      }
      return list;
    },
    params(){
      let params = {};
      if(this.apiParams.appPageParams){
        if(this.apiParams.appPageParams.appPage){
          params = this.apiParams.appPageParams.appPage;
        }
      }
      return params
    }
  },
  mounted(){
    this.getAppPage();
  },
  filters: {
    nameFormat(value){
      return value.substr(0, 7)
    }
  }, 
  methods: {
    iconItem(icon){
      return this.tagColors.filter(item => item.icon == icon)[0];
    },
    // 获取链接列表
    getAppPage(){
      this.spinning = true;
      getAppPage({...this.searchFormData, ...this.params}).then(res => {
        if(res.code == 200){
          this.list = res.data.list;
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    // 是否选中状态
    actived(activeLink){
      let flag = false;
      if(this.selectedLinks.length > 0){
        flag = this.selectedLinks.some(item => {return item.link_id == activeLink.link_id})
      }
      return flag;
    },
    linkFormatData(linkFormat, link){
      // linkFormat.link_id = link.link_id + '';
      // linkFormat.name = link.name;
      // linkFormat.url = link.url;
      // linkFormat.desc = link.desc;
      // linkFormat.params = link.params;
      // linkFormat.access_control = link.access_control;
      return link;
    },
    // 选中
    checkItem(link){
      // 格式化成需要导出的数据
      let linkItem = this.linkFormatData(cloneDeep(this.linkFormat), link)
      let hasLink = this.selectedLinks.some(item => {return item.link_id == linkItem.link_id});
      if(hasLink){
        // 选中列表中有此链接，删除
        this.selectedLinks.splice(this.selectedLinks.findIndex(item => {return item.link_id == linkItem.link_id}), 1);
      }else{
        if(this.multiple){
          // 多选
          // 选中列表中无此链接，添加进去
          this.selectedLinks.push(linkItem);
        }else{
          // 单选
          this.$set(this.selectedLinks, 0, linkItem)
        }
      }
      this.$emit('checkedLink', this.selectedLinks)
    },
    searchSelectChange(){
      this.searchFormData.keyword = '';
    },
  }
}
</script>

<style scoped lang="less">
ul{
  margin: 0;
  padding: 0;
}
.btn-wrap{
  display: flex;
  flex-wrap: wrap;
  .btn-item{
    margin-right: 30px;
    margin-bottom: 30px;
    .link-btn{
      width: 105px;
      position: relative;
      padding: 0 2px;
      .tag-item{
        position: absolute;
        top: -12px;
        left: 0px;
        border-radius: 10px;
        transform: scale(.8);
      }
    }
  }
}
</style>