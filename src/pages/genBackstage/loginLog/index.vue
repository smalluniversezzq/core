<template>
  <div class="loginlog">
    <a-card title="登录日志">
      <a-form-model
        ref="searchFormDataLogin"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-model-item
              label="登录账号"
              prop="account"
            >
              <a-input v-model="searchFormDataLogin.username" placeholder="请输入登录账号" > </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <!-- <a-form-model-item label="登录时间" prop="date">
              <a-range-picker :value="[start_time, end_time]" :placeholder="['请选择起始时间', '请选择结束时间']" @click='timeChange'/>
         
            </a-form-model-item> -->
            <a-form-model-item label="登录时间">
              <a-range-picker
                :placeholder="['开始日期', '结束日期']"
                v-model="timeValue"
                @change="onChange"
              />
            </a-form-model-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-model-item :wrapper-col="{ offset: 7 }">
              <a-space>
                <a-button type="primary" @click="searchLogin">搜索</a-button>
                <a-button type="link" size="small" @click="resetSearchLogin">重置</a-button>
                <a-button type="link" size="small" @click="exportExcelLogin">导出</a-button>
              </a-space>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <a-card :title="'结果展示: 符合条件的数据一共有' + pagination.total+'条'">
        <a-table
        :data-source="dataSource"
        :columns="columns"
        rowKey="id"
        :pagination="pagination"
        @change="onTableChange"
        >
          <template slot="created_at" slot-scope="record">
           {{moment(record.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")}}
          </template>
          <template slot="ipOperators" slot-scope="record">
           {{record.ip}}&nbsp;{{record.operators?"（"+record.operators + "）":''}}
          </template>
          <template slot="status" slot-scope="record">
           {{record.status==1?'失败':'成功'}}
          </template>
          <template slot="remark" slot-scope="record">
           {{record.remark?record.remark:'--'}}
          </template>
        </a-table>
      </a-card>
    </a-card>
  </div>
</template>
<script>
import moment from 'moment'
import { 
  sysLoginLogLis,
  exporsysLoginLogLis
} from '@/services/personalCenter'
export default {
  components: {
    // loginTable
  },
  data(){
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      searchFormDataLogin:{
        username:"",
        start_time:null,
        end_time:null,
      },
      timeValue: null,
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ["10", "20", "30", "40", "50"],
        pageSize: 10,
        "show-size-changer": true,
      },
      dataSource: [],
      columns: [
        {
          title: "登录账号",
          dataIndex: "username",
        },
        {
          title: "登录时间",
          scopedSlots:{customRender:"created_at"}
        },
        {
          title: "登录IP",
          scopedSlots:{customRender:"ipOperators"}
          // operators
        },
        {
          title: "登录状态",
          scopedSlots:{customRender:"status"}
        },
        {
          title: "登录所在地",
          dataIndex: "city",
        },
        {
          title: "其他",
          scopedSlots:{customRender:"remark"}
        },
      ],

    }
  },
  mounted(){
    this.getsysLoginLogLisFn()
  },
  methods:{
    moment,
    searchLogin(){
      console.log('搜索')
      this.getsysLoginLogLisFn()
    },
    getsysLoginLogLisFn(){
      sysLoginLogLis({
        start_time:this.searchFormDataLogin.start_time,
        end_time:this.searchFormDataLogin.end_time,
        username:this.searchFormDataLogin.username,
        page: this.pagination.current, 
        page_size: this.pagination.pageSize, 
      }).then(res=>{
        console.log(res)
        this.dataSource = res.data.list
        this.pagination = res.data.pages
      })
    },
    // 重置
    resetSearchLogin(){
      console.log('重置')
      this.searchFormDataLogin = {
        start_time:"",
        end_time:"",
        username:""
      }
      this.timeValue = null;
      //请求
      this.getsysLoginLogLisFn()
    },
    // 导出
    exportExcelLogin(){
      console.log('导出')
      // this.getsysLoginLogLisFn(1)
      exporsysLoginLogLis({
        start_time:this.searchFormDataLogin.start_time,
        end_time:this.searchFormDataLogin.end_time,
        username:this.searchFormDataLogin.username,
        page: this.pagination.current, 
        page_size: this.pagination.pageSize, 
        export: 1,
        })
    },
    onChange(dates,dateStrings) {
      console.log(dateStrings)
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      this.searchFormDataLogin.start_time = dateStrings[0];
      this.searchFormDataLogin.end_time = dateStrings[1];
    },
    onTableChange(pagination,page){
      console.log(pagination,page)
      this.pagination = pagination
      this.getsysLoginLogLisFn();
    },
  },
}
</script>

<style scoped>
.tip{
  color: #a0a0a0;
  font-size: 14px;
  line-height: 20px;
}
</style>
  