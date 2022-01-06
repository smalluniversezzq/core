<!--升级记录-->
<template>
  <div>
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
              label="订单编号"
            >
              <a-input
                v-model="searchFormData.order_no"
                placeholder="关键词查询"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="升级等级"
            >
              <a-select v-model="searchFormData.after_level"
              :getPopupContainer='triggerNode => triggerNode.parentNode'
              >
                <a-select-option value=""> 全部 </a-select-option>
                <a-select-option :value="index" v-for="(item,index) in leveList" :key="item">
                  {{item}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="会员信息"
            >
              <a-input
                v-model="searchFormData.uid"
                placeholder="请输入会员ID/姓名/手机号"
              ></a-input>
            </a-form-model-item>
          </a-col> 
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="下单时间"
            >
            <a-range-picker
             :placeholder="['开始时间', '结束时间']"
              v-model="timeValue"
              @change="onChange"
            />
            </a-form-model-item>
          </a-col>   
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item
              label="付费区间"
            >
              <a-input
                :style="{ display: 'inline-block', width: 'calc(50% - 10px)' }"
                v-model="searchFormData.start_amount"
                placeholder="请输入"
              ></a-input>
              -
              <a-input 
                :style="{ display: 'inline-block', width: 'calc(50% - 10px)' }"
                v-model="searchFormData.end_amount"
                placeholder="请输入"
              >
              </a-input>
            </a-form-model-item>
          </a-col>                          
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
              <a-space>
                <a-button type="primary" @click="search">搜索</a-button>
                <a-button type="link" size="small" @click="resetSearch()">重置</a-button>
                <a-button type="link" size="small" @click="exportE()">导出</a-button>
              </a-space>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class='mt'>
      <div slot="title">{{cardTitle}}</div>
      <a-spin :spinning="spinning">
      <a-table
        :pagination="false"
        :row-selection="byfRowSelection"
        :data-source="data"
        :columns="columns"
        rowKey="id"
      >
        <div slot="name" slot-scope="text, record" class='name-box'>
          <div>
            <div v-if="record.avatar" class="avatar-box">
              <img :src="record.avatar" alt="">
            </div>
            <div v-else class="avatar-box-holder ">
              <byf-icon type="icontupian" style="font-size: 50px; color: #ccc"></byf-icon>
            </div>
          </div>
          <div class='ml'>
            <p>{{record.realname}}</p>
            <p>{{record.mobile}}</p>
          </div>  
        </div>
        <div slot="amount" slot-scope="text, record">
          <span class="amount">
            {{record.amount}}
          </span>
        </div>
        <div slot="rebate_price" slot-scope="text, record">
          <span class="rebate-price">
            {{record.rebate_price}}
          </span>
        </div>
        <div slot="created_at" slot-scope="text, record">
          {{record.created_at}}
        </div>
        <div slot="level_info" slot-scope="text, record">
          <p>{{record.origin_level}}</p>
          <p>{{record.after_level}}</p>
          <p>{{record.user_level}}</p>
        </div>
        <div slot="remarks" slot-scope="text, record">
          <p>{{record.active_life}}</p>
          <p>{{record.expire_at}}</p>
        </div>
        <div slot="address" slot-scope="text, record">
          <a-button type="link" @click="checkCommission(record)">查看返佣</a-button>
          <a-popconfirm
              title="确定删除吗？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="del(record)"
              @cancel="cancel"
            >
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </div>  
          <!-- 底部全选的功能 -->
        <template slot="footer">
          <a-space size='large'>
            <a-checkbox class="batch-checkbox" @change="onCheckBoxChange" :checked="checkAll" :indeterminate="indeterminate"></a-checkbox>
            <a-popconfirm
              :disabled="!selectedRowKeys.length>0"
              title="确定删除吗？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delAll()"
              @cancel="cancel"
              >
              <a-button :disabled="!selectedRowKeys.length>0">批量删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>   
      </a-table>
        <a-row class='mt' type="flex" justify="end">
          <a-col >
            <a-pagination 
            :total="(page.lastPage*page.pageSize)" 
            :page-size-options="pageSizeOptions" 
            show-quick-jumper 
            :page-size="pageSize" 
            v-model='currentPage'
            :default-current="1" 
            showSizeChanger
            @change="onChangeSize"
            @showSizeChange="onChangePage">
            </a-pagination>
          </a-col>
        </a-row>
      </a-spin>
    </a-card>
    <a-modal
      title="返佣记录"
      :visible="commissionVisible"
      :width="800"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <div></div>
      </template>
      <div class='commission-box beauty-scroll' >
        <a-timeline>
          <a-timeline-item v-for="(item,index) in rebateData" :key="index">
            <a-row>
              <a-col span="3">
                <div v-if="item.avatar" class='avatar-box-commission ml'>
                  <img :src="item.avatar" alt="">
                </div>
                <div v-else class="avatar-box-commission-holder ml">
                  <byf-icon type="icontupian"  style="font-size: 60px; color: #ccc"></byf-icon>
              </div>
              </a-col>
              <a-col span="18" class='mt-5 ml'>
                <div class='commission-content'>
                  <span>{{item.nickname}}</span>
                  <span class='ml txt'>{{item.level}}</span>
                </div>
                <div  class='mt-sm'>
                  <span>获得</span><span>{{item.type}}</span><span>{{item.credittype}}</span>
                  <span class='price ml-sm'>￥{{item.price}}</span>
                  <span>（{{item.bili}}）</span>
                </div>
              </a-col>
            </a-row>
          </a-timeline-item>
        </a-timeline>
      </div>
    </a-modal>
  </div>
</template>
<script>
  const columns = [
    {
      title: '编号',
      dataIndex: 'order_no',
    },
    {
      title: '用户',
      key: 'name',
      slots: { title: 'name' },
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '付费金额',
      slots: 'amount',
      scopedSlots: { customRender: 'amount' },    
    },
    {
      title: '返佣金额',
      slots: 'rebate_price',
      scopedSlots: { customRender: 'rebate_price' },    
    },
    {
      title: '等级信息',
      slots: 'level_info',
      scopedSlots: { customRender: 'level_info' },  
    },
    {
      title: '下单时间',
      slots: 'created_at',
      scopedSlots: { customRender: 'created_at' },  
    },
    {
      title: '备注',
      slots: 'remarks',
      scopedSlots: { customRender: 'remarks' },  
    },
    {
      title: '操作',
      dataIndex: 'address',
      scopedSlots: { customRender: 'address' },
    },
  ];
  import moment from 'moment';
  import { 
    AdminUserUserLevelGetAllLevel, 
    AdminUserUserLevelUpgradeLog,
    AdminUserUserLevelDelLog,
    exportAdminUserUserLevelUpgradeLog,
    AdminUserUserLevelGetUpRebate,
  } from '@/services/platform/vips.js'
  export default {
    components:{
    },
    computed:{
      indeterminate() {
        if (this.selectedRowKeys.length == this.sourceData.length) {
          return false;
        } else {
          return this.selectedRowKeys.length > 0 ? true : false;
        }
        // return false;
      },
      byfRowSelection() {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectHandler(selectedRowKeys, selectedRows);
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.name === "Disabled User", // Column configuration not to be checked
              name: record.name
            }
          })
        };
      }
    },
    data(){
      return {
        holder:require('@/assets/img/holder.png'),
        columns,
        commissionVisible:false,
        cardTitle:"",
        spinning:false,
        timeValue: null,
        data:[],
        rebateData:[],
        sourceData:[],
        searchSpan:8,
        searchFormData:{
          order_no:"",
          after_level:"",
          uid:"",
          start_created_at:"",
          end_created_at:"",
          start_amount:"",
          end_amount:"",
        },
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        dateFormat: 'YYYY/MM/DD',
        monthFormat: 'YYYY/MM',
        leveList:{},
        selectedRowKeys:[],
        currentPage:1,
        pageSize:10,
        page:{ "total": 9, "pageSize": 10, "currentPage": 1, "lastPage": 1},
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        checkAll:false,
      }
    },
    created(){
    },
    mounted(){
      this.AdminUserUserLevelGetAllLevelFn()
      this.AdminUserUserLevelUpgradeLogFn()
    },
    methods: {
      moment,
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },  
      //获取所有等级
      AdminUserUserLevelGetAllLevelFn(){
        AdminUserUserLevelGetAllLevel().then(res=>{
          if(res.code === 200){
            this.leveList = res.data
          }
        })
      },
      AdminUserUserLevelUpgradeLogFn(){
        this.spinning = true
        AdminUserUserLevelUpgradeLog({
          page:this.currentPage,
          pageSize:this.pageSize,
          order_no:this.searchFormData.order_no,
          after_level:this.searchFormData.after_level,
          uid:this.searchFormData.uid,
          start_created_at:this.searchFormData.start_created_at,
          end_created_at:this.searchFormData.end_created_at,
          start_amount:this.searchFormData.start_amount,
          end_amount:this.searchFormData.end_amount,
        }).then(res=>{
          if(res.code === 200){
            this.data = res.data.list
            this.sourceData = res.data.list
            this.page = res.data.pages
             this.cardTitle = `结果展示:符合条件的数据一共有${this.page.total}条`
            this.pageSize = res.data.pages.pageSize
            this.spinning = false
          }else{
            this.spinning = false
          }
        })
      },
      onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.searchFormData.start_created_at = dateStrings[0]
        this.searchFormData.end_created_at = dateStrings[1]
      },
      search(){
        this.AdminUserUserLevelUpgradeLogFn()
      },
      resetSearch(){
        let clearSearch = {
          order_no:"",
          after_level:"",
          uid:"",
          start_created_at:"",
          end_created_at:"",
          start_amount:"",
          end_amount:"",
        }
        this.timeValue = null
        this.searchFormData = clearSearch
        this.AdminUserUserLevelUpgradeLogFn()
      },
      exportE(){
        this.AdminUserUserLevelUpgradeLogEX()
      },
      del(record){
        console.log(record)
        AdminUserUserLevelDelLog({id:record.id}).then(res=>{
          if(res.code === 200){
            this.$message.success(res.msg)
            this.AdminUserUserLevelUpgradeLogFn()
          }else{
            this.$message.error(res.msg)
            this.AdminUserUserLevelUpgradeLogFn()
          }
        })
      },
      cancel(){},  
      delAll (){
        console.log(this.selectedRowKeys.length)
        if(this.selectedRowKeys.length>0){
          let id = this.selectedRowKeys.join(",")
          AdminUserUserLevelDelLog({id}).then(res=>{
            if(res.code === 200){
              this.$message.success(res.msg)
              this.AdminUserUserLevelUpgradeLogFn()
            }else{
              // this.$message.error(res.msg)
              this.AdminUserUserLevelUpgradeLogFn()
            }
          })
        }else{
          this.$message.error('请勾选删除的选项')
        }
      },
      onChangeSize(current,pageSize){
        console.log('Page:', current,'pageSize',pageSize);
        this.currentPage = current
        this.pageSize = pageSize
        this.AdminUserUserLevelUpgradeLogFn()
      },
      onChangePage(current,pageSize){
        console.log('Page:', current,'pageSize',pageSize);
        this.currentPage = current
        this.pageSize = pageSize
        this.AdminUserUserLevelUpgradeLogFn()
      },
      AdminUserUserLevelUpgradeLogEX(){
        exportAdminUserUserLevelUpgradeLog({
          op:"export",
          page:this.currentPage,
          pageSize:this.pageSize,
        })
      },
      onCheckBoxChange(e) {
        this.checkAll = e.target.checked;
        if (e.target.checked === true) {
          this.selectHandler(
            this.sourceData.map(item => {
              console.log(item,'onCheckBoxChange')
              return item.id;
            }),
            this.sourceData
          );
        } else {
          this.selectHandler([], []);
        }
      },
      selectHandler(selectedRowKeys, selectedRows) {
        this.selectedRows = selectedRows;
        this.selectedRowKeys = selectedRowKeys;
        if (
          selectedRowKeys.length > 0 &&
          selectedRowKeys.length === this.sourceData.length
        ) {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }
      },  
      checkCommission(record){
        AdminUserUserLevelGetUpRebate({
          id:record.id
        }).then(res=>{
          if(res.code === 200){
            console.log(res)
            if(res.data.length === 0){
              this.$message.error("暂无数据")
            }else{
             this.commissionVisible = true
             this.rebateData = res.data
            }
          }
        })
        console.log(record)
      },
      handleOk(){
        this.commissionVisible = false
      },    
      handleCancel(){
        this.commissionVisible = false
      },    
    }
  }
</script>

<style scoped lang="less">
  .name-box{
    display: flex;
  }
  .avatar-box{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .avatar-box-holder{
    width: 50px;
    height: 50px;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .amount{
    color: #40A9FF;
    font-size: 16px;
  }
  .rebate-price{
    color: #52C41A;
    font-size: 16px;
  }
  .batch-checkbox {
    margin-left: 5px;
  }
  .avatar-box-commission{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .avatar-box-commission-holder{
    width: 60px;
    height: 60px;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .mt-5{
    margin-top: 5px;
  }
  .commission-content{
    font-size: 12px;
    .txt{
      color: #1890FF;
    }
  }
  .price{
    color: red;
  }
  .commission-box{
    margin-left:80px;
    height:600px;
    overflow-y: auto;
  }
</style>