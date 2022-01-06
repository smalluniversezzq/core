<!--等级列表-->
<template>
  <div>
    <byf-space direction="vertical">
      <a-card>
        <a-form-model
          ref="searchForm"
          :model="searchFormData"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row :gutter="48">
            <a-col :lg="12" :xl="8" :xxl="6">
              <a-form-model-item
                label="等级名称"
              >
                <a-input
                  v-model="searchFormData.name"
                  placeholder="关键词查询"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6">
              <a-form-model-item
                label="等级状态"
              >
                <a-select v-model="searchFormData.status"
                  :getPopupContainer='triggerNode => triggerNode.parentNode'
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                  <a-select-option value="0"> 禁用 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6">
              <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
                <a-space>
                  <a-button type="primary" @click="search">搜索</a-button>
                  <a-button type="link" size="small" @click="resetSearch">重置</a-button>
                </a-space>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card >
      <a-spin :spinning="spinning">
        <a-card >
          <div slot="title">{{cardTitle}}</div>
          <div slot="extra">
            <a-button @click='AddGrade' type="primary">添加</a-button>
          </div>
          <a-table
            :pagination="false"
            :data-source="data"
            :columns="columns"
            rowKey="id"
          >
          <div slot="name" class="cursor-hand" slot-scope="text, record"  @mouseenter="enters(record)" @mouseleave="leaver(record)">
            <span v-show="record.power == 0" style="color:#1890ff">[内置]</span>
            <span >{{record.name}}</span>
            <span  v-if="record.up_info.default.status=='1'" class='ml-sm'>
              <a-tag color="green">
                默认
              </a-tag>
            </span>
            <a-button  type="link" v-else-if="record.up_info.default.status=='0' && record.status =='1'" v-show="record.defaults=='1'" @click='setDefault(record)'>
              设为默认
            </a-button>
          </div>
          <div slot="up_info" slot-scope="text, record">
            <div v-if="record.ishide=='0'">
              <span v-if="record.up_status.default=='0' && record.up_status.tiaojian=='0' && record.up_status.fufei=='0' && record.up_status.libao=='0'">
              </span>
              <span v-else v-for="(item,index) in record.up_status" :key="index">
                <span v-if="item == '1'">
                  {{index=="default"?"注册默认等级":""}}
                  {{index=="tiaojian"?"条件升级":""}}
                  {{index=="fufei"?"付费升级":""}}
                  {{index=="libao"?"礼包升级":""}}
                </span>
              </span>
            </div>
            <div v-else>
              不可主动升级
            </div>
          </div>
          <div slot="type" slot-scope="text, record">
            <span v-if='record.type==0' >内置等级</span>
            <span v-if='record.type==1' >代理等级</span>
            <span v-if='record.type==2' >运营商等级</span>
          </div>
          <div slot="status" slot-scope="text, record">
            <span>{{record.status=="0"?"禁用":"启用"}}</span>
          </div>
          <div slot="address" slot-scope="text, record">
            <a-button type="link" @click="edit(record)">编辑</a-button>
            <a-button type="link" @click="setCommission(record)">设置返佣</a-button>
            <a-button type="link" @click="rights(record)">设置权益</a-button>
            <a-popconfirm
                title="确定删除吗？"
                ok-text="确认"
                cancel-text="取消"
                @confirm="del(record)"
                @cancel="cancel"
              >
            <a-button v-show="!record.power == 0" type="link">删除</a-button>
            </a-popconfirm>
          </div>
          </a-table>
          <a-row class='mt' type='flex' justify="end">
            <a-col>
              <a-pagination show-quick-jumper :default-current="1" :total="(page.lastPage*page.pageSize)" @change="onChange" />
            </a-col>
          </a-row>
        </a-card>
      </a-spin>
    </byf-space>
  </div>
</template>

<script>
let defaultSearchFormData = { 
  name:"",
  status:"",
}
const columns = [
  {
    title: '等级权重',
    dataIndex: 'power',
  },
  {
    title: '等级名称',
    dataIndex: 'name',
    width:250,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '等级类型',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' },
  },
  {
    title: '升级模式',
    dataIndex: 'up_info',
    scopedSlots: { customRender: 'up_info' },
  },
  {
    title: '等级人数',
    dataIndex: 'userCount',
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '操作',
    dataIndex: 'address',
    scopedSlots: { customRender: 'address' },
  },

];
import { AdminUserUserlevelList ,AdminUserUserlevelDel, AdminUserUserlevelSetCondition} from '@/services/platform/vips.js'
export default {
  components:{
  },
  data(){
    return {
      columns,
      spinning:false,
      cardTitle:"",
      currentPage:"1",
      page:{ "total": 9, "pageSize": 10, "currentPage": 1, "lastPage": 1},
      data:[],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      defaultSearchFormData,
      searchFormData:{
        name:"",
        status:"",
      },
      selectedRowKeys:[],
      record:{},

    }
  },
  methods:{  
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },                                                                                                                   
    onTabChange(key){
      this.tableNoTitleKey = key;
      this.resetSearch();
    },
    // 条件搜索
    search() {
      this.AdminUserUserlevelListFn()
    },
    // 重置搜索
    resetSearch() {
      this.searchFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
      this.$nextTick(() => {
        this.AdminUserUserlevelListFn()
      })
    },
    edit(record){
      console.log(record,'edit')
          this.$router.push({
            name:'editDefaultLevel',
            query:{
              id:record.id,
            }
          })
    },
    // 设置返佣
    setCommission(record){
      // status 0 代理 1 运行商
      console.log(record,'setCommission')
      this.$router.push({
        name:"setReturnedCommission",
        query:{
          id:record.id,
          type:record.type
        }
      })
    },
    // 设置权益
    rights(record){
      console.log(record)
      // this.$router.push({name:'CoreDiyOneNav', query: {id:data.id}});
      this.$router.push({
        name:'setRightsInterests',
        query:{
          id:record.id
          }
        }
      )
    },
    // 删除
    del(record){
      console.log(record)
      this.AdminUserUserlevelDelFn(record.id)
    },
    cancel(){},
    // 设为默认
    setDefault(record){
      console.log(record,'setDefault')
      AdminUserUserlevelSetCondition({
        id:record.id,
        type:'default',
        status:'1',
      }).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.AdminUserUserlevelListFn()
        }else{
          this.$message.error(res.msg)
        }
      })

    },
    enters(record){
      this.$set(record,'defaults',"1")
    },
    leaver(record){
      this.$set(record,'defaults',"0")
    },
    AdminUserUserlevelListFn(){
      this.spinning = true
      AdminUserUserlevelList({
        page:this.currentPage,
        name:this.searchFormData.name,
        status:this.searchFormData.status,
      }).then(res=>{
        if(res.code === 200){
          this.spinning = false
          this.data = res.data.list
          this.page = res.data.pages
          this.cardTitle = `数据展示：当前等级共${this.page.total}个，${this.page.enabledCount}个处于启用状态`
        }else{
          this.spinning = false
        }
      })
    },
    AdminUserUserlevelDelFn(id){
      AdminUserUserlevelDel({
        id
      }).then(res=>{
        if(res.code === 200){
          console.log(res)
          this.AdminUserUserlevelListFn()
        }
      })
    },
    onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      this.currentPage = pageNumber
      this.AdminUserUserlevelListFn()
    },
    AddGrade(){
      this.$router.push({name:'editDefaultLevel'})
    },
  },
  created(){
    this.AdminUserUserlevelListFn()
  },
}
</script>

<style scoped lang="less">
/deep/.ant-calendar-picker{
  width: 100%
}
.sign{
  color: red;
}
.cursor-hand{
  cursor:pointer;
}
.default-box{
  display: inline-block;
  color: #fff;
  background: #43cf7c;
  padding: 2px;
  font-size: 10px;
}
</style>