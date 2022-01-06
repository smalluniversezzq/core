<template>
<div>


  <a-card
    class="table-card-box"
    style="margin-top: 10px"
    size="small"
    :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tabChange="key => onTabChange(key, 'noTitleKey')"
  >
    <template slot="all">全部页面({{list_data[1]+list_data[2]+list_data[3]}})</template>
    <template slot="home">首页({{list_data[1]}})</template>
    <template slot="personalCenter">个人中心({{list_data[2]}})</template>
    <template slot="customPage">自定义页面({{list_data[3]}})</template>

    <template slot="tabBarExtraContent">
      <div class="table-extra">
        <byf-space>
          <a-button class="get-share-btn" @click="showGetShareModel()">获取模板</a-button>
          <a-button type="primary" @click="showAddOrEdit('add')">添加模板</a-button>
        </byf-space>
      </div>
    </template>
    <a-table
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      rowKey="id"
      :loading="loading"
      @change="onTableChange"
    >
      <template slot="template-title" slot-scope="text, record">
        <div class="template-title">
          <!-- 共享中图标 -->

          <a-dropdown class="timeline-dropdown" :trigger="['hover']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <byf-icon v-if="record.share.code" class="share-icon" type="icontubiaozhizuomoban"></byf-icon>
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" @click="showShareDetails(record)">
                查看共享
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="1" @click="cancelShare(record)">
                取消共享
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div class="title text-overflow-1" :title="text">{{text}}</div>
          <a-popconfirm title="是否添加到标记区域?" @confirm="doFavorite(record,1)">
            <a-button class="add-btn" type="link">添加标记</a-button>
            <!-- <div class="add"><byf-icon type="iconjiahao"></byf-icon></div> -->
          </a-popconfirm>
        </div>
      </template>
      <template slot="page_type_group" slot-scope="text, record">
        <span>{{PageTypeKeyMap[record.page_type_group] || '--'}}</span>
      </template>
      <template slot="device_type" slot-scope="text, record">
        <template v-if="record.device_type == 1">
          <span v-for="(item,index) in record.apply_os" :key="index">{{(index>0?',':'')+ApplyOs[item]}}</span>
        </template>
        <template v-else>--</template>
      </template>
      <!-- 适用模板 -->
      <template slot="version" slot-scope="text, record">
        <template v-if="record.version_start == null">全部版本</template>
        <template v-else-if="record.version_end == null">V{{record.version_start}}</template>
        <template v-else>V{{record.version_start}}-V{{record.version_end}}</template>
      </template>
      <!-- 更新时间 -->
      <template slot="time" slot-scope="text">
        {{moment.unix(text).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
      <!-- 模板状态 -->
      <template slot="status" slot-scope="text">
        <span v-if="text == 1"><a-badge status="success" />应用中</span>
        <span v-else><a-badge status="error" />已禁用</span>
      </template>
      <template slot="operate" slot-scope="text, record">
        <a-button type="link" size="small" @click="goDiy(record)">装修</a-button>
        <a-button type="link" size="small" @click="openDrawer(record)">预览</a-button>
        <a-popconfirm :title="`确定${record.status==1?'禁用':'启用'}吗？`" @confirm="onConfirmChangeStatus(record)">
          <a-button type="link" size="small">{{record.status==1?'禁用':'启用'}}</a-button>
        </a-popconfirm>
        <a-button type="link" size="small" @click="doClone(record)">克隆</a-button>
        <a-button type="link" size="small" @click="goShare(record)">共享</a-button>
        <a-button type="link" size="small" @click="showAddOrEdit(record)">编辑</a-button>
        <a-popconfirm v-if="record.status == 0" title="确定删除此页面吗？" @confirm="onConfirmDel(record)">
          <a-button type="link" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <add-or-edit ref="addOrEdit" @confirm="addOrEditOk"></add-or-edit>
  </a-card>
  <a-modal 
    :width="600"
    :maskClosable="false"
    title="共享模板"
    :visible="createShareModalVisible"
    :destroyOnClose="true"
    :confirmLoading="createShareConfirmLoading"
    okText="保存"
    @cancel="createShareModalCancel"
    @ok="saveShare"
  >
    <a-form-model ref="createShareForm" :model="createShareForm" 
      :labelCol="labelCol"
      :wrapperCol="wrapperCol">
      <a-form-model-item label="有效期" prop="use_time" help="说明：从共享时开始多少天内有效，在有效期内任意平台都可以获取模板">
        <a-radio-group v-model="createShareForm.use_time">
          <a-radio :value="0"> 永久有效 </a-radio>
          <a-radio :value="7"> 7天 </a-radio>
          <a-radio :value="1"> 1天 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="使用次数" prop="use_number" help="说明：共享的模板可以使用的次数">
        <a-radio-group v-model="createShareForm.use_number">
          <a-radio :value="1"> 单次 </a-radio>
          <a-radio :value="0"> 不限次数 </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>

  <a-modal 
    :width="600"
    :maskClosable="false"
    title="共享模板"
    :visible="shareDetailsModalVisible"
    :destroyOnClose="true"
    @cancel="shareDetailsModalCancel"
  >
    <a-form-model ref="shareDetailsForm" :model="shareDetailsForm" 
      :labelCol="labelCol"
      :wrapperCol="wrapperCol">
      <a-form-model-item label="提取码" prop="use_time" :help="shareDetailsForm.expire == 0 ? '永久有效' : ('提取码将于' + moment.unix(shareDetailsForm.expire).format('YYYY-MM-DD HH:mm:ss') + '失效')">
        <a-input disabled v-model="shareDetailsForm.code">
          <a-button slot="suffix" size="small" type="link" @click="copyCode">复制</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="使用次数" prop="use_number">
        {{shareDetailsForm.use_number == 0 ? '不限次数' : '单次'}}
      </a-form-model-item>

    </a-form-model>
    <template slot="footer">
      <a-button type="primary" @click="shareDetailsModalCancel">
        确认
      </a-button>
    </template>
  </a-modal>

<a-modal 
    :width="600"
    :maskClosable="false"
    title="获取模板"
    :visible="getShareModalVisible"
    :confirmLoading="getShareConfirmLoading"
    :destroyOnClose="true"
    okText="确定"
    @cancel="getShareModalCancel"
    @ok="getShareTemplate"
  >
    <a-form-model ref="getShareForm" :model="getShareForm" :rules="getShareFormRules"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol">
      <a-form-model-item label="提取码" prop="code">
        <a-input v-model="getShareForm.code"/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>

  <a-drawer class="preview-drawer" 
      :closable="true"
      @close="closeDrawer" :visible="drawerVisible" width="500">
      <template slot="title">
        <div class="title-box">
          <span>页面预览</span>
        </div>
      </template>
      <a-spin style="width:100%" :spinning="!dataRead">
        <div class="box" id="box" v-if="dataRead">
          <preview
            v-if="pageDataManager.selectedComponentsList" 
            :previewComponents="pageDataManager.selectedComponentsList"
            :pageDataManager="pageDataManager"></preview>
        </div>
      </a-spin>
    </a-drawer>
    </div>
</template>

<script>
import addOrEdit from "./addOrEdit";
import {
  getAdminPlatformDesignDel, 
  getAdminPlatformDesignStatusUpdate, 
  getAdminPlatformDesignCopy,
  getAdminPlatformDesignFavoriteUpdate,
} from '@/services/admin/platform/design'
import { getAdminPlatformDesignElements, getAdminPlatformDesignDetail } from '@/components/byf/renovation/services/admin/platform/designPage'
import {getAdminUserUserLevelGetAllLevel} from '@/components/byf/renovation/services/admin/user/userLevel'
import preview from '@/components/byf/renovation/pageDiy/views/previewArea/common/preview.vue'
import PageDataManager from '@/components/byf/renovation/dataManager/pageDataManager/index.js'
import { getAdminPlatformDesignIndex, adminPlatformDesignShare, getAdminPlatformDesignGetShare, adminPlatformDesignDelShare } from '@/services/admin/platform/designPage'
import {PageTypeKeyMap, DeviceTypeKeyMap, ApplyOs} from '../common'
import moment from 'moment'

export default {
  components: { addOrEdit, preview},
  props: ['condition'],
  data(){
    return {
      tabListNoTitle: [
        {key: '0', scopedSlots: { tab: 'all' },},
        {key: '1', scopedSlots: { tab: 'home' },},
        {key: '2', scopedSlots: { tab: 'personalCenter' },},
        {key: '3', scopedSlots: { tab: 'customPage' },},
      ],
      noTitleKey: '0',
      loading: false,
      PageTypeKeyMap,
      DeviceTypeKeyMap,
      ApplyOs,
      dataSource: [],
      moment,
      list_data: {1:0,2:0,3:0},
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      columns: [
        {
          title: "模板名称",
          dataIndex: "title",
          scopedSlots: { customRender: "template-title" },
        },
        {
          title: "页面类型",
          dataIndex: "page_type_group",
          scopedSlots: { customRender: "page_type_group" },

        },
        {
          title: "终端类型",
          dataIndex: "device_type",
          scopedSlots: { customRender: "device_type" },
        },
        {
          title: "适用版本",
          dataIndex: "version",
          scopedSlots: { customRender: "version" },
        },
        {
          title: "更新时间",
          dataIndex: "updated_at",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operate" },
        },
      ],
      
      drawerVisible: false,
      pageDataManager: {},
      dataRead: false,

      createShareModalVisible: false,
      createShareConfirmLoading: false,
      labelCol: {span: 3},
      wrapperCol: {span: 21},
      createShareForm: {
        id: '',
        use_time: 0,
        use_number: 0
      },

      shareDetailsModalVisible: false,
      shareDetailsForm: {
        code: 654654654,
        expire: 0
      },

      getShareModalVisible: false,
      getShareConfirmLoading: false,
      getShareForm: {
        code: ''
      },
      getShareFormRules: {
        code: [{ required: true, message: '请输入提取码', trigger: 'blur' },],
      }

    }
  },
  created(){
    this.getList(this.pagination);
  },
  methods: {
    // 取消共享
    cancelShare(record){
      console.log(record)
      this.$confirm({
        title: "取消共享",
        content: "确认取消共享吗？取消后当前模板共享出去的提取码将失效",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            adminPlatformDesignDelShare({id: record.id}).then(res => {
              console.log(res)
              if(res.code == 200){
                record.share = {};
                this.$message.success(res.msg)
                resolve()
              }
            }).catch(err => {
              reject(err)
            })
          })
        },
        onCancel() {}
      });
    },
    // 展示分享信息
    showShareDetails(data){
      this.shareDetailsForm = data.share;
      this.shareDetailsModalVisible = true;
    },
    // 获取分享模板
    getShareTemplate(){
      this.getShareConfirmLoading = true;
      getAdminPlatformDesignGetShare(this.getShareForm).then(res => {
        if(res.code == 200){
          this.pagination.current = 1;
          this.getShareModalVisible = false;
          this.getShareForm.code = '';
          this.getList(this.pagination);
          this.$message.success(res.msg)
        }
      }).finally(() => {
        this.getShareConfirmLoading = false;
      })
    },
    // 关闭获取模板弹窗
    getShareModalCancel(){
      this.getShareModalVisible = false;
    },
    // 打开获取模板弹窗
    showGetShareModel(){
      this.getShareModalVisible = true;
    },
    // 复制内容到粘贴板
    copyCode(){
      let oInput = document.createElement("input");
      oInput.type = "text";
      oInput.value = this.shareDetailsForm.code;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.parentNode.removeChild(oInput); //执行完之后删除该对象
      this.$message.success('已复制到粘贴板')
    },
    // 关闭提取码展示弹窗
    shareDetailsModalCancel(){
      this.shareDetailsModalVisible = false;
    },
    // 关闭创建共享模板弹窗
    createShareModalCancel(){
      this.createShareModalVisible = false;
    },
    // 创建共享模板
    saveShare(){
      this.createShareConfirmLoading = true;
      adminPlatformDesignShare(this.createShareForm).then(res => {
        console.log(res)
        if(res.code == 200){
          this.setTableItemShare(this.createShareForm.id, res.data)
          this.createShareModalCancel();
          setTimeout(() => {
            this.showShareDetails({share: res.data})
          }, 300);
        }
      }).finally(() => {
        this.createShareConfirmLoading = false;
      })
    },
    // 给某一项设置分享数据
    setTableItemShare(id, data){
      this.dataSource.map(item => {
        if(item.id == id){
          item.share = data;
        }
        return item;
      })
    },
    /**
     * 关闭遮罩层
     */
    closeDrawer(){
      this.drawerVisible = false;
      this.dataRead = false;
    },
    async openDrawer(data){
      console.log(data)
      /**
     * 初始化数据，拿组件列表->拿模板详情
     */
      this.drawerVisible = true;
      await getAdminUserUserLevelGetAllLevel();
      // 初始化装修页面使用的全局页面对象
      this.pageDataManager = new PageDataManager(data.id)
      getAdminPlatformDesignElements({id: data.id,page_type: data.page_type}).then(res=>{
        if(res.code == 200) {
          // 初始化页面可用组件
          this.pageDataManager.initUsableComponents(res.data)
          getAdminPlatformDesignDetail({id:data.id}).then(detail=>{
            if(detail.code == 200) {
              console.log('pageDataManager: ', this.pageDataManager)
              // 更新页面的详情
              this.pageDataManager.updatePageDetail(detail.data)
              this.dataRead = true;
            }
          })
        }
      })
    },
    onTabChange(key, type) {
      this[type] = key;
      if(key > 0) {
        this.page_type_group = key
      } else {
        this.page_type_group = undefined
      }
      this.search()
    },
    // 添加/编辑 确认
    addOrEditOk(res) {
      if (res.operationType == "add") {
        // 重新请求第一页
        this.pagination.current = 1;
        this.getList(this.pagination)
      } else {
        this.$emit('changeFavorite')
        // 修改指定项
        this.getList(this.pagination)
      }
    },
    onTableChange(pagination){
      this.getList(pagination)
    },
    /**
     * @param {any} data 'add':表示新增。
     */
    showAddOrEdit(data) {
      if (data == 'add') {
        this.$refs.addOrEdit.showModalAction();
      } else {
        this.$refs.addOrEdit.showModalAction(data);
      }
    },
    goDiy(data){
      this.$router.push({
        name:'CoreDiyOnePage', 
        query: {
          id:data.id,
          pageType:data.page_type,
          deviceType: data.device_type,
          applyOs: data.apply_os
        }
      });
    },
    // 获取总平台用户列表
    getList(pageData) {
      let conditionData = JSON.parse(JSON.stringify(this.condition))
      
      this.loading = true;
      
      getAdminPlatformDesignIndex({page: pageData.current, page_size: pageData.pageSize, export: pageData.export, ...conditionData, page_type_group: this.page_type_group}).then((res) => {
        if (res.code == 200) {
          this.dataSource = res.data.list;
          this.list_data = res.data.list_data
          if(res.data.pages) pageData.total = +res.data.pages.total;
          this.pagination = {...this.pagination, ...pageData}
        }
        return res
      }).finally(() => {
        this.loading = false;
      });
    },
    /**
     * 搜索
     */
    search(){
      this.getList(this.pagination)
    },
    onConfirmChangeStatus(record){
      getAdminPlatformDesignStatusUpdate({id: record.id, op: Math.abs(record.status-1)}).then(res => {
        if(res.code == 200) {
          this.search()
          this.$message.success(res.msg)
        }
      })
    },
    onConfirmDel(record){
      getAdminPlatformDesignDel({id: record.id}).then(res => {
        if(res.code == 200) {
          if(this.pagination.total % this.pagination.pageSize == 1 && this.pagination.current > 1 ){
            this.pagination.current --
          }
          this.search()
          this.$message.success(res.msg)
        }
      })
    },
    goShare(data){
      console.log(data)
      this.createShareForm.id = data.id;
      if(data.share.code){
        this.$confirm({
          title: "创建新共享",
          content: "目前该模板处于共享状态，如果创建新的共享，原来的提取码将失效，是否确定创建新共享？",
          okText: "确认",
          cancelText: "取消",
          centered: "",
          onOk: () => {
            // 创建新的共享
            this.createShareModalVisible = true;
          },
          onCancel() {}
        });
      }else{
        this.createShareModalVisible = true;
      }
      // this.$message.info('敬请期待')
    },
    preview(){
      this.$message.info('敬请期待')
    },
    doClone(record){
      getAdminPlatformDesignCopy({id: record.id}).then(res => {
        if(res.code == 200) {
          this.search()
          this.$message.success(res.msg)
        }
      })
    },
    /**
     * @param {object} record
     * @param {number} op 1: 标记。0：取消标记
     */
    doFavorite(record, op){
      getAdminPlatformDesignFavoriteUpdate({id: record.id, op:op}).then(res => {
        if(res.code == 200) {
          this.search()
          this.$emit('changeFavorite')
          this.$message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.get-share-btn{
  background: #FA8C16;
  color: #fff;
  border: none;
}
.ant-table-wrapper {
  /deep/ .ant-table-row:hover {
    .add {
      opacity: 1;
    }
    .add-btn {
      opacity: 1;
    }
  }
  .template-title {
    display: flex;
    align-items: center;
    .share-icon{
      font-size: 20px;
      margin-right: 4px;
      color: @primary-color;
      cursor: pointer;
    }
    .title {
      margin-right: 10px;
      max-width: 400px;
    }
    .add {
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: @border-color-base;
      border: 1px solid @border-color-base;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transition: opacity .3s, border-color .3s;
      &:hover {
        color: @primary-color;
        border-color: @primary-color;
      }
    }
    .add-btn {
      opacity: 0;
      transition: opacity .3s, border-color .3s;
    }
  }
}
.preview-drawer{
  /deep/.ant-drawer-close{
    height: 100%;
    line-height: 100%;
  }
  /deep/.ant-drawer-header{
    padding-top: 10px;
    padding-bottom: 10px;
  } 
  .title-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>