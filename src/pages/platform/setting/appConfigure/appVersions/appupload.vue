<template>
  <!-- app更新 -->
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
            <a-form-model-item label="终端">
              <a-select v-model="searchFormData.terminal"
              :getPopupContainer='triggerNode => triggerNode.parentNode'
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item, index) in terminal"
                  :key="index"
                >
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="强制更新">
              <a-select v-model="searchFormData.is_update"
                :getPopupContainer='triggerNode => triggerNode.parentNode'
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item, index) in upload"
                  :key="index"
                >
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="下载方式">
              <a-select v-model="searchFormData.download_type"
                :getPopupContainer='triggerNode => triggerNode.parentNode'
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item, index) in download"
                  :key="index"
                >
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="创建时间">
              <a-range-picker
                :placeholder="['开始时间', '结束时间']"
                v-model="timeValue"
      
                @change="onChange"
              />
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item label="版本号">
              <a-input
                v-model="searchFormData.version"
                placeholder="请输入版本号"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
              <a-space>
                <a-button type="primary" @click="search()">搜索</a-button>
                <a-button type="link" size="small" @click="resetSearch()"
                  >重置</a-button
                >
              </a-space>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-spin :spinning="tableLoading">
      <a-card title='当前生效版本' class='mt'>
        <a-table
          :columns="CurrentVersionColumns"
          :data-source="CurrentVersionData"
          :pagination="false"
        >
          <template slot="terminal" slot-scope="scope">
            <div
              :class="scope.terminal == 1 ? 'androd-style' : 'ios-style'"
            >
              <span v-if="scope.terminal==1">安卓</span>
              <span v-if="scope.terminal==2">苹果</span>
            </div>
          </template>
          <template slot="versioncode" slot-scope="scope">
            {{scope.terminal == 1 ? scope.version_code:"-" }}
          </template>
          <span slot="customTitle">
            最低可用版本
            <a-tooltip placement="right">
              <template slot="title">
                低于此版本号的版本会默认提示强制更新
              </template>
              <byf-icon type="iconhelp"></byf-icon>
            </a-tooltip>
          </span>
          <template slot="is_update" slot-scope="scope">
            {{scope.is_update=='0'?'否':'是'}}
          </template>
          <template slot="action" slot-scope="scope">
            <a-button class='paddingleft0' @click='Cancellation(scope.id,scope.is_effective)' type='link'>取消生效版本</a-button>
          </template>
          <template slot="set_version" slot-scope="scope">
            <a-select v-if='scope.terminal ==1' :allowClear='true' :default-value="scope.min" style="width: 120px" @change="(e)=>{handleChangeversion(e,'android')}">
              <a-select-option :value="item" v-for="(item,index) in minList.android" :key="index">
                {{item}}
              </a-select-option>
            </a-select>
            <a-select v-if='scope.terminal ==2' :default-value="scope.min" :allowClear='true' style="width: 120px" @change="(e)=>{handleChangeversion(e,'ios')}">
              <a-select-option :value="item" v-for="(item,index) in minList.ios" :key="index">
                {{item}}
              </a-select-option>
            </a-select>
          </template>
        </a-table>
      </a-card>
      <a-card title='版本记录' class='mt' >
        <div slot="extra">
          <a-button type="primary" @click='toAddOrEditor()'>新增版本</a-button>
        </div>
        <a-table
          :columns="VersionRecordColumns"
          :data-source="VersionRecordData"
          @change="onTableChange"
          rowKey="key"
          :pagination="false"
        >
          <template slot="terminal" slot-scope="scope">
            <div
              :class="scope.terminal == 1 ? 'androd-style' : 'ios-style'"
            >
              <!-- {{ scope.terminal==1?'安卓':'苹果' }} -->
              <span v-if="scope.terminal==1">安卓</span>
              <span v-if="scope.terminal==2">苹果</span>
            </div>
          </template>
          <template slot="version_code" slot-scope="scope">
            {{scope.terminal == 1 ? scope.version_code:"-" }}
          </template>
          <template slot="is_update" slot-scope="scope">
            {{scope.is_update=='0'?'否':'是'}}
          </template>
          <template slot="download_type" slot-scope="scope">
            {{scope.download_type === 1 ? "跳转下载":"直接下载" }}
          </template> 
          <template slot="created_at" slot-scope="scope">
            {{moment(scope.created_at*1000).format("YYYY-MM-DD") }}
          </template> 
          created_at
          <template slot="action" slot-scope="scope">
            <a-button class='paddingleft0' @click='Cancellation(scope.id,scope.is_effective)' type='link'>{{scope.is_effective==1?'取消生效版本':'设为当前版本'}}</a-button>
            <a-button class='paddingleft0' type='link' @click="editVersion(scope.id)">编辑</a-button>
            <a-popconfirm 
              title="确认删除吗"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delVersion(scope.id)"
              @cancel="cancel"
              >
              <a-button v-if="scope.is_effective==0" class='paddingleft0'  type="link" style="color:red">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table>
        <a-row type='flex' justify="end" class='mt'>
          <a-col>
            <a-pagination 
              show-quick-jumper 
              :default-current="1" 
              show-size-changer
              :page-size="pageSize"
              :page-size-options="pageSizeOptions"
              :total="(page.lastPage*page.pageSize)"
              @showSizeChange="onPageChange"
              />
          </a-col>
        </a-row>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
const CurrentVersionColumns = [
  {
    title: "终端",
    key: "terminal",
    scopedSlots: { customRender: "terminal" },
  },
  {
    title: "版本号",
    dataIndex: "version",
    key: "version",
  },
  {
    title: "Versioncode",
    key: "versioncode",
    scopedSlots: { customRender: "versioncode" },
  },
  {
    title: "强制更新",
    key: "is_update",
    scopedSlots: { customRender: "is_update" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
  {
    key: "set_version",
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: "set_version" },
  },
];
import moment from "moment";
// platformConfigSet platform_min_version_ios platform_min_version_android
import { PlatformAppVersionList, 
PlatformAppVersionCancelEffective,
PlatformAppVersionSetEffective,
PlatformAppVersionDel,
PlatformAppVersionCancelMinList,
platformConfigSet
} from '@/services/platformSetting'
export default {
  props: {
  },
  components: {
  },
  computed: {
    VersionRecordColumns(){
      let { sortedInfo } = this;
      console.log(sortedInfo,'sortedInfo')
      sortedInfo = sortedInfo || {};
      // ascend "descend"
      let columns = [
        {
          title: "终端",
          key: "terminal",
          scopedSlots: { customRender: "terminal" },
          sorter: true,
        },
        {
          title: "版本号",
          dataIndex: "version",
          sorter: true,
        },
        {
          title: "Versioncode",
          key: "version_code",
          scopedSlots: { customRender: "version_code" },
        },
        {
          title: "强制更新",
          key: "is_update",
          scopedSlots: { customRender: "is_update" },
        },
        {
          title: "下载地址",
          key: "download_address",
          dataIndex: "download_address",
        },
        {
          title: "下载方式",
          key: "download_type",
           scopedSlots: { customRender: "download_type" },
        },
        {
          title: "创建时间",
          key: "created_at",
          scopedSlots: { customRender: "created_at" },
          sorter: true,
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ]
      return columns;
    },
    indeterminate() {
      if (this.selectedRowKeys.length == this.dataSource.length) {
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
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      tabListNoTitle: [
        { key: "0", tab: "APP更新" },
        { key: "1", tab: "APP下载" },
        { key: "2", tab: "更新设置" },
      ],
      minList:[],
      timeValue: null,
      tableLoading:false,
      noTitleKey: "0",
      terminal: [
        {
          title: "全部",
          value: "",
        },
        {
          title: "安卓",
          value: 1,
        },
        {
          title: "苹果",
          value: 2,
        },
      ],
      upload: [
        {
          title: "全部",
          value: "",
        },
        {
          title: "是",
          value: 1,
        },
        {
          title: "否",
          value: 0,
        },
      ],
      download: [
        {
          title: "全部",
          value: "",
        },
        {
          title: "跳转下载",
          value: 1,
        },
        {
          title: "直接下载",
          value: 2,
        },
      ],
      searchFormData: {
        terminal: "",
        is_update: "",
        download_type: "",
        start_time: "",
        end_time: "",
        version: "",
      },
      currentPage:1,
      pageSize:10,
      page:{ "total": 9, "pageSize": 10, "currentPage": 1, "lastPage": 1},
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      CurrentVersionColumns,
      CurrentVersionData:[],
      VersionRecordData:[],
      sortedInfo:null,
      sort:{
        terminal:"",
        version:"",
        created_at:2,
      },
      sortData:{},
    };
  },
  created() {
    this.PlatformAppVersionListFn()
    this.PlatformAppVersionCancelMinListFn()
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      this.searchFormData.start_time = dateStrings[0];
      this.searchFormData.end_time = dateStrings[1];
    },
    // 重置搜索
    resetSearch() {
      let clearSearch = {
        terminal: "",
        is_update: "",
        download_type: "",
        start_time: "",
        end_time: "",
        version: "",
      };
      this.timeValue = null;
      this.searchFormData = clearSearch;
      this.PlatformAppVersionListFn()
    },
    search() {
      console.log(this.searchFormData);
      this.PlatformAppVersionListFn()
    },
    handleChangeversion(value,type){
      console.log(`selected ${value},${type}`);
      var versionInfo = {}
      if(type=='android'){
        versionInfo = {platform_min_version_android:value?value:""}
      }
      if(type=='ios'){
        versionInfo = {platform_min_version_ios:value?value:""}
      }
      console.log(versionInfo)
      platformConfigSet(versionInfo).then(res=>{
        if(res.code===200){
          this.$message.success(res.msg)
        }
      })
    },
    PlatformAppVersionListFn(){
      this.tableLoading = true
      PlatformAppVersionList({
        page:this.currentPage,
        page_size: this.page.pageSize,
        ...this.searchFormData,
        sort:{...this.sortData}
      }).then(res=>{
        if(res.code === 200){
          console.log(res)
          this.CurrentVersionData = res.data.effective
          this.VersionRecordData = res.data.list
          this.page = res.data.pages
          this.tableLoading = false
          this.pageSize = res.data.pages.pageSize
          this.PlatformAppVersionCancelMinListFn()
        }else{
          this.tableLoading = false
        }
      })
    },
    PlatformAppVersionCancelMinListFn(){
      PlatformAppVersionCancelMinList().then(res=>{
        if(res.code === 200){
          console.log(res)
          this.minList = res.data
        }
      })
    },
    onPageChange(current,pageSize) {
      console.log('Page: ');
      this.currentPage = current
      this.pageSize = pageSize
      this.PlatformAppVersionListFn()
    },
    onTableChange(pagination, filters, sorter){
      console.log(pagination, filters, sorter,'onTableChange')
      this.sortedInfo = sorter;
      let sort = '';
      switch(this.sortedInfo.order){
        case "ascend" :
        sort = 1;
        break;
        case "descend" :
        sort = 2;
        break;
        default:
        sort = '';
        break;
      }
      this.sortData = {}
      for(let k in this.sort){
        console.log(k)
        if(k == sorter.columnKey){
          this.sort[k] = sort;
        }else{
          this.sort[k] = '';
        }

        if(this.sort[k]){
          this.sortData[k] = this.sort[k]
        }
        
      }
      console.log('执行请求携带分页及搜索参数',this.sort,this.sortData)
      this.PlatformAppVersionListFn()
    },
    toAddOrEditor(){
      this.$router.push({
        name:'appVersionsAddOrEditor',
      })
    },
    editVersion(id){
      this.$router.push({
        name:'appVersionsAddOrEditor',
        query:{
          id
        }
      })
    },
    // 当前生效版本
    Cancellation(id,type){
      console.log(id,type)
      // 0 设为当前版本  1取消当前版本
      if(type==1){
        PlatformAppVersionCancelEffective({id}).then(res=>{
          if(res.code === 200){
            this.PlatformAppVersionListFn()
          }
        })
      }else if(type==0){
        PlatformAppVersionSetEffective({id}).then(res=>{
          if(res.code === 200){
            this.PlatformAppVersionListFn()
          }
        })
      }
    },
    pageSizeChange(current, pageSize){
      console.log(current,pageSize)
    },
    // 版本记录

    delVersion(id){
      console.log(id)
      PlatformAppVersionDel({id}).then(res=>{
        if(res.code === 200){
          this.PlatformAppVersionListFn()
          this.$message.success(res.msg)
        }
      })
    },
    cancel(){},
  },
};
</script>

<style scoped lang='less'>
.androd-style {
  width: 60px;
  height: 24px;
  border-radius: 15px;
  background: #1989fa;
  color: #fff;
  text-align: center;
  line-height: 24px;
}
.ios-style {
  width: 60px;
  height: 24px;
  border-radius: 15px;
  background: #c89026;
  color: #fff;
  text-align: center;
  line-height: 24px;
}
.paddingleft0{
  padding-left:0;
}
</style>