<template>
  <div>
    <a-card>
      <div class="appWrap">
        <a-row
          type="flex"
          justify="space-between"
          align="bottom"
        >
          <a-col :span="14">
            <div class="appIcon">
              <a-avatar class="app-avatar" shape="square" :size="67" :src="detailsInfo.logo"></a-avatar>
            </div>
            <div class="appName">
              <p class="name">
                <span>{{detailsInfo.name}}</span>
                <span class="tip" v-if="detailsInfo.expired_info.status != 0">
                  <byf-icon :class="{'tipWarning': detailsInfo.expired_info.status == 1, 'tipDanger': detailsInfo.expired_info.status == 2}" class="tipWarning" type="iconjinggao"></byf-icon>
                  <span class="tipText">{{detailsInfo.expired_info.msg}}</span>
                </span>
              </p>
              <div class="types">
                  <byf-icon class="typesIcon" type="iconanzhuo"></byf-icon>
              </div>
            </div>
          </a-col>
          <a-col :span="10">
            <a-row
              type="flex"
              justify="end"
              :gutter="10"
            >
              <a-col>
                <a-space>
                  <a-button type="danger" @click="platformDisable" v-if="detailsInfo.limit_status == 0">
                    限制使用
                  </a-button>
                  <a-button type="primary" v-else-if="detailsInfo.limit_status == 1" @click="platformEnable">
                    恢复使用
                  </a-button>
                  <a-button
                    type="danger"
                    @click="platformDel"
                  >
                    删除
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>

      <a-tabs default-active-key="1">
        <a-tab-pane
          key="1"
          tab="基本信息"
        >
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
          <a-form-model-item
              label="平台ID"
              prop="pmid"
            >
              {{form.pmid}}
            </a-form-model-item>
            <a-form-model-item
              label="平台名称"
              prop="name"
            >
              <a-input
                v-model="form.name"
                placeholder="请输入平台名称"
              ></a-input>
            </a-form-model-item>
            <a-form-model-item
              label="平台logo"
              prop="logo"
              class="logoFormItem"
            >
              <div class="byf-upload">
                <!-- 图片列表 -->
                <ul v-if="imgList.length > 0" class="img-list">
                  <li v-for="(item, index) in imgList" :key="'img'+index">
                    <img :src="item" alt="" >
                    <byf-icon class="close" type="iconclose" @click="deleteImg(index)" />
                    <div class="img-replace-box">
                      <div class="img-replace" @click="openModal">替换</div>
                    </div>
                  </li>

                </ul>
                <!-- 添加图片的li -->
                <div v-else
                  class="upload"
                  @click="openModal"
                >
                  <div class="text-icon">
                    <byf-icon type="iconjiahao"></byf-icon>
                    <span>添加图片</span>
                  </div>
                </div>
              </div>
              <p class="tip">请上传1024*1024像素的png图片</p>
            </a-form-model-item>
            <a-form-model-item
              label="服务周期"
              prop="time"
            >
              <a-range-picker 
                v-if="form.start_at"
                :valueFormat="'YYYY-MM-DD'" 
                :default-value="[form.start_at, form.expired_at]"  
                @change="onRangeChange"/>
            </a-form-model-item>
            <a-form-model-item label="平台类型" prop="type" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- TODO 后续对接其他平台类型 -->
              <a-checkbox-group :value="form.type" :options="typeCheckOptions" />
            </a-form-model-item>

            <a-form-model-item label="版权标识">
              <a-radio-group v-model="form.copyright_status" @change="copyrightLogoTypeChange">
                <a-radio :value="1"> 系统默认 </a-radio>
                <a-radio :value="2"> 自定义 </a-radio>
                <a-radio :value="0"> 不显示 </a-radio>
              </a-radio-group>
              <div class="form-item-block" v-show="form.copyright_status == 2">
                <a-form-model-item prop="copyright_text">
                  <a-input placeholder="请输入版权标识" v-model="form.copyright_text"/>
                </a-form-model-item>
              </div>
            </a-form-model-item>
          </a-form-model>
          <a-divider />
          <a-row
            class="bottom-btns"
            type="flex"
            align="middle"
            :gutter="10"
          >
            <a-col>
              <a-button :loading="doSaveLoading" type="primary" @click="doSave">保存</a-button>
            </a-col>
            <a-col>
              <a-button @click="jumpParent">返回列表</a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="使用者管理"
          force-render
        >
          <a-card
            class="table-card-box"
            :title="'结果展示: 符合条件的数据一共有' + paginationOfUser.total + '条'"
            style="margin-top:10px;"
            size="small"
          >
            <template slot="extra">
              <div class="table-extra">
                <a-space>
                    <!-- <byf-button
                      type="danger"
                    >权限控制</byf-button> -->
                    <byf-button
                      type="primary"
                      @click="addUsersVisible = true"
                    >添加用户</byf-button>
                </a-space>
              </div>
            </template>
            <a-table
              :loading="tableLoadingOfUser"
              :columns="columnsOfUsers"
              :pagination="paginationOfUser"
              :data-source="sourceDataOfUser"
              rowKey="mid"
              @change="onTableChangeOfUser"
            >
              <template slot="is_master" slot-scope="text, record">
                <span v-show="record.is_master == 1">主管理员</span>
                <span v-show="record.is_master == 0">子管理员</span>
              </template>
              <!-- 状态控制 -->
              <template
                slot="controlIsStatus"
                slot-scope="text, record"
              >
                <span v-show="record.is_master == 1">
                  <span v-show="record.status == 0">禁用</span>
                  <span v-show="record.status == 1">正常</span>
                </span>
                <a-switch v-show="record.is_master != 1" checked-children="ON" un-checked-children="OFF" :checked="!!record.status" 
                  @click="switchArticleStatusOfUser(record, text)"
                />
              </template>
              <!-- 状态 -->
              <template
                slot="status"
                slot-scope="text"
              >
                <template v-if="!!text">
                  <a-badge status="success" /> 正常
                </template>
                <template v-else>
                  <a-badge status="default" /> 禁用
                </template>
              </template>
              <template slot="operate" slot-scope="text, record, index">
                <byf-button type="link" size="small" v-show="record.is_master != 1" @click="deleteOfUser(record, index)">删除</byf-button>
              </template>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3" tab="当前安装应用">
        <a-card size="small">
          <template slot="title">
            <span>{{'当前套餐组：' + addonsGroup.group_name}}</span><a-button type="link" @click="toggleChangeGroupShow(true)">修改</a-button>
          </template>
          <a-select slot="extra" default-value="0" style="width: 120px;" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
            <a-select-option value="0">全部</a-select-option>
          </a-select>
          <a-list class="currentApps beauty-scroll" :loading="addonsGroupLoading" item-layout="horizontal" :bordered="false" :data-source="addonsGroup.list" 
            :grid="{ gutter: 16, column: 6 }"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <apps-item :itemData="item"></apps-item>
            </a-list-item>
          </a-list>
        </a-card>
        <br/>
        <a-card size="small">
          <template slot="title">
            <span>附加应用/模块</span><a-button type="link" @click="toggleChooseAppsShow()">修改</a-button>
          </template>
          <a-select slot="extra" default-value="0" style="width: 120px;" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
            <a-select-option value="0">通用应用</a-select-option>
          </a-select>
          <a-list class="currentApps beauty-scroll" :loading="addonsExtraLoading" item-layout="horizontal" :bordered="false" :data-source="addonsExtra.list"
            :grid="{ gutter: 16, column: 6 }"
          >
            <div v-if="addonsExtraShowMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px'}">
              <a-spin v-if="addonsExtraLoadingMore" />
              <a-button v-else @click="onLoadaddonsExtraMore">加载更多</a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item">
              <apps-item :itemData="item"></apps-item>
            </a-list-item>
          </a-list>
        </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-modal :maskClosable="false" title="添加使用者" :visible="addUsersVisible" :confirm-loading="addUsersConfirmLoading" @ok="addUsersConfirm" @cancel="cancelAddUsers" okText="保存">
      <a-form-model :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" ref="addUsersForm" :rules="addUsersFormDataRule" :model="addUsersFormData">
        <a-form-model-item label="手机号码" prop="mobile">
          <a-input v-model="addUsersFormData.mobile" placeholder="请输入使用者手机号码"></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <a-radio-group v-model="addUsersFormData.status">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <choose-apps ref="chooseApps" @ok="onChooseAppsOk"></choose-apps>
    <change-group-modal :visible="changeGroupModalVisible" :pmid="detailsInfo.pmid" :groupId="addonsGroup.group_id" :groupName="addonsGroup.group_name" 
      @cancel="toggleChangeGroupShow(false)" 
      @ok="onChangeGroupModalOk"
    ></change-group-modal>
  </div>
</template>
<script>
import { 
  platformUsersAdd, 
  platformUserEdit, 
  platformUsersDelete,
  platformEdit,
  getPlatformAddonsGroup,
  getPlatformAddonsExtra,
  getPlatformUserIndex  
} from "@/services/platform";
import { getAdminPlatformDetail, getAdminPlatformLimit, getAdminPlatformUnLimit, getAdminPlatformDel  } from '@/services/adminPlatform'
import {getAdminAddonsIndex} from '@/services/addons'
import ChooseApps from '@/pages/genBackstage/super/common/ChooseApps'
import AppsItem from '@/pages/genBackstage/common/AppsItem'
import ChangeGroupModal from '@/pages/genBackstage/super/platformManage/changeGroupModal'
import { cloneDeep } from 'lodash';
import moment from 'moment';

export default {
  components: { ChooseApps, AppsItem, ChangeGroupModal},
  data() {
    return {
      changeGroupModalVisible: false, // 控制是否展示修改套餐组组件
      typeCheckOptions: [
        { label: 'APP', value: 0 },
        { label: '微信', value: 2, disabled: true },
        { label: 'H5', value: 3, disabled: true },
      ],
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      detailsInfo: {
        pmid: '',
        expired_info: {
          status: 0, // 0无提醒，1即将到期，2已到期
          msg: '', // 提醒信息
        }
      },
      form: {
        pmid: '',
        name: "",
        type: [0],
        logo: "",
        start_at: undefined,
        expired_at: undefined,
        copyright_status: 1,
        copyright_text: ''
      },
      rules: {
        name: [ { required: true, message: "请输入平台名称", trigger: "blur" } ],
        logo: [ { required: true, message: "请选择应用logo", trigger: "blur" } ],
        type: [ { required: true, message: "请选择平台类型", trigger: "blur" } ],
      },
      imgList: [],
      doSaveLoading: false,
      disableLoading: false,
      tableLoadingOfUser: false,
      rowKeyOfUser: 'mid',
      columnsOfUsers: [
        {
          title: "账号",
          dataIndex: "mobile"
        },
        {
          title: "真实姓名",
          dataIndex: "real_name"
        },
        {
          title: "账号类型",
          dataIndex: "is_master",
          scopedSlots: { customRender: "is_master" }
        },
        {
          title: "状态控制",
          dataIndex: "controlIsStatus",
          scopedSlots: { customRender: "controlIsStatus" }
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          scopedSlots: { customRender: "operate" }
        }
      ],
      sourceDataOfUser: [],
      paramsOfUsersList: {
        page_size: 10,
        page: 1,
        pmid: ''
      },
      paginationOfUser: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ["10", "20", "30", "40", "50"],
        pageSize: 10,
        "show-size-changer": true,
      },
      addUsersVisible: false,
      addUsersConfirmLoading: false,
      addUsersFormData: {
        mobile: "",
        status: 1,
        pmid: ''
      },
      addUsersFormDataRule: {
        mobile: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
      },
      
      platformUsersDeleteForm: {
        pmid: '',
        mid: ''
      },
      addonsGroupLoading: false,
      addonsGroup: {
        list: [],
        group_id: undefined,
        group_name: '',
        pages: {}
      },
      addonsExtraLoading: false,
      addonsExtraShowMore: true,
      addonsExtraLoadingMore: false,
      addonsExtra: {
        list: [],
        group_name: '',
        pages: {}
      },
      addonsExtraParams: {
        page: 1,
        page_size: 10,
      },
    };
  },
  created() {
    this.addUsersFormData.pmid = this.platformUsersDeleteForm.pmid = this.paramsOfUsersList.pmid = this.$route.query.pmid;
    this.getPlatformInfo();
    this.getPlatformUserIndex();
  },
  methods: {
    /**
     * 时间范围变化
     */
    onRangeChange(dates){
      this.form.start_at = dates[0]
      this.form.expired_at = dates[1]
      this.$refs.ruleForm.validateField('start_at')
    },
    copyrightLogoTypeChange(){
       console.log(this.form.copyright_status)
      if(this.form.copyright_status == 2){
        this.$set(this.rules, 'copyright_text', [{ required: true, message: '请输入版权标识', trigger: 'blur' }])
      }else{
        delete this.rules.copyright_text;
      }
      this.$refs.ruleForm.clearValidate('copyright_text')
    },
    /**
     * 点击 修改套餐组
     * @param [boolean] isShow 
     */ 
    toggleChangeGroupShow(isShow){
      this.changeGroupModalVisible = isShow
    },
    /**
     * 切换显示
     */
    toggleChooseAppsShow(){
      this.$refs.chooseApps.show('changePlatform', this.addonsExtra.list,this.detailsInfo.pmid)
    },
    // 附加应用加载更多
    onLoadaddonsExtraMore(){
      this.addonsExtraParams.page++;
      this.addonsExtraLoadingMore = true;
      getPlatformAddonsExtra({pmid: this.detailsInfo.pmid, ...this.addonsExtraParams}).then(res => {
        this.addonsExtraLoadingMore = false;
        if(res.code == 200){
          this.addonsExtra.group_name = res.data.group_name;
          this.addonsExtra.list = this.addonsExtra.list.concat(res.data.list);
          this.addonsExtra.page = res.data.pages
          if(res.data.list.length < this.addonsExtraParams.page_size){
            this.addonsExtraShowMore = false;
          }
        }
      })
    },
    openModal() {
      this.$byfUpload({multiple: false, imgsList: this.imgList}).then(res => {
        if (res.action == 'confirm') {
          let arr = []
          res.selectedImgs.forEach(item => {
            arr.push(item.url)
          })
          this.imgList = arr;
          this.form.logo = this.imgList[0];
        }
      });
    },
    deleteImg(index){
      this.imgList.splice(index,1);
      this.form.logo = '';
    },
    // 获取平台套餐组，初始获取
    getPlatformAddonsGroup(){
      this.addonsGroup.list = [];
      getPlatformAddonsGroup({pmid: this.detailsInfo.pmid, page_size: 999}).then(res => {
        if(res.code == 200){
          this.addonsGroup.group_name = res.data.group_name;
          this.addonsGroup.group_id = res.data.group_id || undefined
          this.addonsGroup.list = this.addonsGroup.list.concat(res.data.list);
          this.addonsGroup.page = res.data.pages;
        }
      })
    },
    // 获取平台附加应用
    getPlatformAddonsExtra(){
      this.addonsExtraParams.page = 1;
      this.addonsExtra.list = [];
      getPlatformAddonsExtra({pmid: this.detailsInfo.pmid}).then(res => {
        if(res.code == 200){
          this.addonsExtra.group_name = res.data.group_name;
          this.addonsExtra.list = this.addonsExtra.list.concat(res.data.list);
          this.addonsExtra.page = res.data.pages;
          if(res.data.list.length < this.addonsExtraParams.page_size){
            this.addonsExtraShowMore = false;
          }
        }
      })
    },
     // 启用平台
    platformEnable(){
      this.$confirm({
        title: '你想恢复使用当前平台吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            getAdminPlatformUnLimit({pmid: this.detailsInfo.pmid}).then(res => {
              resolve()
              if(res.code == 200){
                this.$message.info('已启用');
                this.detailsInfo.limit_status = 0;
              }
            }).catch(err => {
              console.log(err)
              reject()
            })
          });
        },
        onCancel() {},
      });
    },
    // 停用当前平台（应用）
    platformDisable() {
      this.$confirm({
        title: "你想限制使用当前平台吗？",
        onOk:() => {
          return new Promise((resolve, reject) => {
            getAdminPlatformLimit({pmid: this.detailsInfo.pmid}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                this.detailsInfo.limit_status = 1;
              }
            }).catch(err => {
              console.log(err)
              reject()
            })
          })
        },
        onCancel() {}
      });
    },
    // 删除平台
    platformDel(){
      this.$confirm({
        title: "你想删除当前平台吗？",
        onOk: ()=> {
          return new Promise((resolve, reject) => {
            getAdminPlatformDel({pmid: this.detailsInfo.pmid}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                this.jumpParent();
              }
            }).catch(err => {
              console.log(err)
              reject()
            })
          })
        },
        onCancel() {}
      });
    },
    // 修改平台信息
    platformEdit(){
      this.doSaveLoading = true;
      let formData = cloneDeep(this.form);
      if (formData.start_at) {
        formData.start_at = moment(formData.start_at).startOf('day').unix(),
        formData.expired_at = moment(formData.expired_at).endOf('day').unix()
      }
      platformEdit(formData).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg);
          this.getPlatformInfo();
        }
      }).finally(()=>{
        this.doSaveLoading = false;
      });
    },
    // 获取平台详情
    getPlatformInfo(){
      getAdminPlatformDetail({pmid: this.$route.query.pmid}).then(res => {
        if(res.code == 200){
          this.detailsInfo = res.data.info;
          for(let k in res.data.info){
            this.form[k] = res.data.info[k];
          }
          this.imgList[0] = this.form.logo;
          this.form.start_at = moment.unix(this.form.start_at)
          this.form.expired_at = moment.unix(this.form.expired_at)
          console.log(this.form)
          this.getPlatformAddonsGroup();
          this.getPlatformAddonsExtra();
        }
      });
    },
    // 切换用户状态
    switchArticleStatusOfUser(record) {
      let status = record.status == 0 ? 1 : 0;
      this.$confirm({
        title: "提示",
        content: "确定更改用户状态吗?",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          // 修改用户状态
          return new Promise((resolve, reject) => {
            platformUserEdit({pmid: this.detailsInfo.pmid,mid:record.mid, status}).then(res => {
              console.log(res)
              if(res.code == 200){
                this.$message.success(res.msg);
                record.status = status;
                resolve();
              }else{
                reject();
              }
            }).catch(err => {
              console.log(err);
              reject();
            });
          })
        },
        onCancel() {}
      });
    },
    onTableChangeOfUser(pagination){
      this.paramsOfUsersList.page = pagination.current;
      this.getPlatformUserIndex();
    },
    jumpParent(){
      this.$router.go(-1)
    },
    // 平台用户删除
    deleteOfUser(item, index){
      this.platformUsersDeleteForm.mid = item.mid;
      this.$confirm({
        title: "你想删除当前账号吗？",
        onOk: () => {
          return new Promise((resolve, reject) => {
            platformUsersDelete(this.platformUsersDeleteForm).then(res => {
              console.log(res);
              if(res.code == 200){
                resolve();
                this.$message.success(res.msg);
                this.sourceDataOfUser.splice(index, 1);
              }else{
                reject();
              }
            })
          })
        },
        onCancel() {}
      });
    },
    // 获取平台用户列表
    getPlatformUserIndex(){
      getPlatformUserIndex(this.paramsOfUsersList).then(res => {
        if(res.code == 200){
          this.sourceDataOfUser = res.data.list;
          this.paginationOfUser.total = res.data.pages.total * 1;
        }
      })
    },
    // 添加平台用户
    addUsersConfirm(){
      this.$refs.addUsersForm.validate(valid => {
        if(valid){
          this.addUsersConfirmLoading = true;
          platformUsersAdd(this.addUsersFormData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.addUsersVisible = false;
              this.$refs.addUsersForm.resetFields();
              this.paramsOfUsersList.page = 1;
              this.getPlatformUserIndex();
            }
          }).finally(()=>{
            this.addUsersConfirmLoading = false;
          })
        }else{
          return false;
        }
      })
    },
    // 添加使用者模态框
    showAddModel() {
      this.addUsersVisible = true;
    },
    cancelAddUsers() {
      this.$refs.addUsersForm.resetFields();
      this.addUsersVisible = false;
    },
    doSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.platformEdit();
        } else {
          return false;
        }
      });
    },
    /**
     * 修改套餐组完成接口
     */
    onChangeGroupModalOk(groupInfo){
      this.changeGroupModalVisible = false
      this.addonsGroup.group_name = groupInfo.name
      this.addonsGroup.group_id = groupInfo.id

      // 请求新的套餐组的应用
      getAdminAddonsIndex({page_size:999, group_id: groupInfo.id}).then(res=>{
        if(res.code == 200) {
          this.addonsGroup.list = res.data.list;
        }
      })
    },
    /**
     * 修改 附加应用成功
     */
    onChooseAppsOk(list){
      this.addonsExtra.list = list
    }
  }
};
</script>
<style lang="less" scoped>
.appIcon {
  float: left;
}
.logoFormItem{
  .tip{
    color: #a0a0a0;
    font-size: 12px;
  }
}
.appWrap {
  background: rgb(245, 245, 245);
  padding: 15px;
  .appName {
    // float: left;
    height: 67px;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      padding: 0;
      margin: 0;
    }
    p:nth-child(1) {
      font-weight: bold;
      font-size: 15px;
    }
    p:nth-child(2) {
      color: #a0a0a0;
    }
    .tip{
      padding-left: 20px;
      .tipWarning{
        color: rgb(212, 177, 6);
      }
      .tipText{
        padding-left: 5px;
        font-size: 12px;
      }
      .tipDanger{
        color: rgb(207, 19, 34);
      }
    }
  }
}
.types{
  margin-top: 5px;
  .typesIcon{
    font-size: 18px;
    margin-right: 5px;
    color: rgba(18, 150, 219, 1);
  }
}

.currentApps{
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  height: 174px;
}
.byf-upload {
  display: flex;
  margin-top: 5px;
  > .img-list {
    margin: 0;
    padding: 0;
    li {
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px solid #e9edef;
      background-color: #F4F6F8;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .close {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 20px;
        cursor: pointer;
        color: #b8b9bd;
        display: none;
      }
      .img-replace-box{
        position: absolute;
        left: 0;
        right: 0;
        height: 20px;
        bottom:0;
        overflow: hidden;
        .img-replace {
          height: 20px;
          margin-top: 20px;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.7);
          text-align: center;
          line-height: 20px;
          color: #ffffff;
          font-size: 12px;
          pointer-events: none;
          transition: margin-top .3s;
        }
      }
      &:hover {
        .img-replace {
          pointer-events:auto;
          display: block;
          margin-top: 0px;
        }
        .close {
          display: block;
          &:hover {
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
  > .upload {
    .text-icon {
      display: flex;
      flex-direction: column;
      > i {
        font-size: 24px;
        color:#2d8cf0;
        margin-bottom: 10px;
      }
      > span {
        color: #b8b9bd;
        font-size: 12px;
      }
    }
    width: 100px;
    height: 100px;
    /* margin-left: 20px; */
    border: 1px dashed #e9edef;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
  }
}
.form-item-block{
  overflow: hidden;
  background: @background-color-light;
  padding: 0 20px;
  padding-top: 24px;
}
</style>
