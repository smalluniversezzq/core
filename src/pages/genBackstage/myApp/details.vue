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
              <a-avatar
                class="app-avatar"
                shape="square"
                :size="67"
                :src="detailsInfo.logo"
              ></a-avatar>
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
                <typesIcon :list="typesList"></typesIcon>
                  <!-- <byf-icon class="typesIcon iconanzhuo" type="iconanzhuo"></byf-icon> -->
                  <!-- 暂时只有app -->
                  <!-- <byf-icon class="typesIcon" type="iconweixin"></byf-icon>
                  <byf-icon class="typesIcon" type="iconxiaochengxu"></byf-icon>
                  <a-popover title="平台类型" placement="right" @click.stop>
                    <template slot="content">
                      <p>APP</p>
                      <p>公众号</p>
                      <p>H5</p>
                    </template>
                    <byf-icon class="typesIcon" type="iconiconfontgengduo"></byf-icon>
                  </a-popover> -->
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
                  <a-button v-show="detailsInfo.status == 1" type="primary" @click="goOneBizConsole(detailsInfo)">进入平台</a-button>
                  <a-button
                    type="danger"
                    @click="platformDisable"
                    v-if="detailsInfo.status == 1"
                  >
                    停用
                  </a-button>
                  <a-button
                    type="danger"
                    style="background:rgb(39, 177, 72);border:none"
                    v-if="detailsInfo.status == 0"
                    @click="platformEnable"
                  >
                    启用
                  </a-button>
                  <a-button
                    type="danger"
                    v-if="detailsInfo.status == 0"
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
              help="平台名称可以是汉字、字母、数字的任意一种或任意组合，长度不得超过15个字"
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
              help="请上传1024*1024像素的png图片"
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
            </a-form-model-item>
            <a-form-model-item
              label="服务周期"
              prop="time"
            >
              {{moment.unix(form.start_at).format('YYYY-MM-DD')}}
              &nbsp;
              至
              &nbsp;
              {{moment.unix(form.expired_at).format('YYYY-MM-DD')}}
            </a-form-model-item>
            <a-form-model-item
              label="平台类型"
              prop="type"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              
            >
            <!-- TODO 暂时使用:value 后续开放多平台时需改动为双向绑定 -->
              <a-checkbox-group
                :value="form.type"
                :options="plainOptions"
              />
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
              <a-button
                :loading="doSaveLoading"
                type="primary"  
                @click="doSave"
              >保存</a-button>
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
                <a-switch
                v-show="record.is_master != 1" 
                checked-children="ON" 
                un-checked-children="OFF" 
                :checked="!!record.status" 
                @click="switchArticleStatusOfUser(record, text)"/>
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
              <template
                slot="operate"
                slot-scope="text, record, index"
              >
                <!-- <byf-button
                  type="link"
                  size="small"
                  style="padding-left:0;"
                  @click="editArticle(record)"
                >权限设置</byf-button> -->
                <byf-button
                  type="link"
                  size="small"
                  v-show="record.is_master != 1"
                  @click="deleteOfUser(record, index)"
                >删除</byf-button>
              </template>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane
          key="3"
          tab="当前安装应用"
        >
        <a-card size="small" :title="'当前套餐组：' + addonsGroup.group_name">
          <a-select slot="extra" default-value="0" style="width: 120px;" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
            <a-select-option value="0">
              全部
            </a-select-option>
          </a-select>
          <a-list
            class="currentApps beauty-scroll"
            :loading="addonsGroupLoading"
            item-layout="horizontal"
            :bordered="false"
            :data-source="addonsGroup.list"
            :grid="{ gutter: 16, column: 6 }"
          >
            <div
              v-if="addonsGroupShowMore"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px'}"
            >
              <a-spin v-if="addonsGroupLoadingMore" />
              <a-button v-else @click="onLoadaddonsGruopMore">
                加载更多
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item" class="addonsItem">
                <div class="leftAvatar">
                  <a-avatar
                    class="app-avatar" 
                    shape="square"
                    :size="67"
                    :src="item.logo"
                  ></a-avatar>
                </div>
                <div class="rightDesc">
                  <div class="name">{{item.name}}</div>
                  <div class="types">
                    <typesIcon :list="typesList" :size="18"></typesIcon>
                  </div>
                </div>
            </a-list-item>
          </a-list>
        </a-card>
        <br/>
        <a-card size="small" title="附加应用/模块">
          <a-select slot="extra" default-value="0" style="width: 120px;" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
            <a-select-option value="0">
              通用应用
            </a-select-option>
          </a-select>
          <a-list
            class="currentApps beauty-scroll"
            :loading="addonsExtraLoading"
            item-layout="horizontal"
            :bordered="false"
            :data-source="addonsExtra.list"
            :grid="{ gutter: 16, column: 6 }"
          >
            <div
              v-if="addonsExtraShowMore"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px'}"
            >
              <a-spin v-if="addonsExtraLoadingMore" />
              <a-button v-else @click="onLoadaddonsExtraMore">
                加载更多
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item" class="addonsItem">
                <div class="leftAvatar">
                  <a-avatar
                    class="app-avatar" 
                    shape="square"
                    :size="67"
                    :src="item.logo"
                  ></a-avatar>
                </div>
                <div class="rightDesc">
                  <div class="name">{{item.name}}</div>   
                  <div class="types">
                    <typesIcon :list="typesList" :size="18"></typesIcon>
                  </div>
                </div>
            </a-list-item>
          </a-list>
        </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-modal :maskClosable="false"
      title="添加使用者"
      :visible="addUsersVisible"
      :confirm-loading="addUsersConfirmLoading"
      @ok="addUsersConfirm"
      okText="保存"
      @cancel="cancelAddUsers"
    >
      <a-form-model
        :label-col="{ span: 6 }" 
        :wrapper-col="{ span: 18 }"
        ref="addUsersForm"
        :rules="addUsersFormDataRule"
        :model="addUsersFormData"
      >
        <a-form-model-item
          label="手机号码"
          prop="mobile"
        >
          <a-input
            v-model="addUsersFormData.mobile"
            placeholder="请输入使用者手机号码"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item
          label="手机号验证码"
          prop="code"
        >
          <a-input
            v-model="addUsersFormData.code"
            placeholder="请输入验证码"
          >
          <a-button 
            type="link" 
            size="small" 
            slot="addonAfter" 
            @click="sendCode" 
            :disabled="timerText != '发送验证码'"
            :loading="sendCodeLoading"
            >
            {{timerText}}
          </a-button>
          </a-input>
        </a-form-model-item>
        <a-form-model-item
          label="状态"
          prop="status">
          <a-radio-group v-model="addUsersFormData.status">
            <a-radio :value="1">
              启用
            </a-radio>
            <a-radio :value="0">
              禁用
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { 
  platformUsersAdd, 
  platformUserEdit, 
  platformUsersDelete,
  platformDisable, 
  platformEnable,
  getPlatformInfo,
  platformEdit,
  platformDel,
  getPlatformAddonsGroup,
  getPlatformAddonsExtra,
  getPlatformUserIndex,
  getPlatformUserAddSms
} from "@/services/platform";
import { mapMutations } from 'vuex'
import { getAdminSysMenuIndex } from "@/services/admin/sys/menu/index.js";
import typesIcon from '@/pages/genBackstage/common/typesIcon'
import moment from 'moment'
export default {
  components: {
    typesIcon
  },
  data() {
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入平台名称'));
      }
      let pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi; // 中文数字字母正则
      if (value.length > 15 || !pattern.test(value)) {
        callback(new Error('平台名称可以是汉字、字母、数字的任意一种或任意组合，长度不得超过15个字'));
      }else{
        callback();
      }
    };
    return {
      moment,
      // TODO 后续每个地方的端类型列表要区分开，暂时使用一个 
      typesList: [
        {type: 0, name: "APP", icon: 'iconanzhuo'},
        // {type: 1, name: "微信", icon: 'iconweixin'},
        // {type: 2, name: "H5", icon: 'iconxiaochengxu'},
        // {type: 3, name: "H5", icon: 'iconxiaochengxu'},
      ],
      plainOptions: [
        { label: 'APP', value: 0 },
        { label: '微信', value: 1, disabled: true },
        { label: 'H5', value: 2, disabled: true },
      ],
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      detailsInfo: {
        pmid: '',
        expired_info: {
          status: '0'
        }
      },
      form: {
        pmid: '',
        name: "",
        type: [0],
        logo: "",
        start_at: '',
        expired_at: '',
      },
      rules: {
        name: [ { required: true, validator: validateName, trigger: "blur" } ],
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
        // {
        //   title: "角色",
        //   dataIndex: "is_master",
        //   scopedSlots: { customRender: "is_master" }
        // },
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
        pmid: ''
      },
      paginationOfUser: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      addUsersVisible: false,
      addUsersConfirmLoading: false,
      addUsersFormData: {
        mobile: "",
        code: "",
        status: 1,
        pmid: ''
      },
      addUsersFormDataRule: {
        mobile: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        code: [{ required: true, message: '请填写短信验证码', trigger: 'blur' }],
      },
      sendCodeLoading: false,
      timer: null,
      timerText: '发送验证码',
      
      platformUsersDeleteForm: {
        pmid: '',
        mid: ''
      },
      addonsGroupLoading: false,
      addonsGroupShowMore: true,
      addonsGroupLoadingMore: false,
      addonsGroup: {
        list: [],
        group_name: '',
        pages: {}
      },
      addonsGroupParams: {
        page: 1,
        page_size: 10,
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
    this.getPlatformUserIndex(this.paginationOfUser);
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(1111111111)
      console.log(from.name)
      vm.parentPath = from.path
    })
  },
  methods: {
    ...mapMutations("setting", ["setPlatformInfo"]),
    // 套餐组加载更多
    onLoadaddonsGruopMore(){
      this.getPlatformAddonsExtra({page: this.addonsGroupParams.page+1})
    },
    // 附加应用加载更多
    onLoadaddonsExtraMore(){
      this.getPlatformAddonsGroup({page: this.addonsGroupParams.page+1})
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
        this.$refs.ruleForm.validateField('logo')
      });
    },
    deleteImg(index){
      this.imgList.splice(index,1);
      this.form.logo = '';
    },
    // 获取平台套餐组
    getPlatformAddonsGroup(pageData){
      this.addonsGroupLoadingMore = true;
      let pageParam = {...this.addonsGroupParams, ...pageData};
      getPlatformAddonsGroup({pmid: this.detailsInfo.pmid, ...pageParam}).then(res => {
        if(res.code == 200){
          this.addonsGroup.group_name = res.data.group_name;
          this.addonsGroup.list = this.addonsGroup.list.concat(res.data.list);
          if(res.data.list.length < this.addonsGroupParams.page_size){
            this.addonsGroupShowMore = false;
          }
        }
      })
    },
    // 获取平台附加应用
    getPlatformAddonsExtra(pageData){
      this.addonsExtraLoadingMore = true;
      let pageParam = {...this.addonsExtraParams, ...pageData};
      getPlatformAddonsExtra({pmid: this.detailsInfo.pmid, ...pageParam}).then(res => {
        if(res.code == 200){
          this.addonsExtra.group_name = res.data.group_name;
          this.addonsExtra.list = this.addonsExtra.list.concat(res.data.list);
          if(res.data.list.length < this.addonsExtraParams.page_size){
            this.addonsExtraShowMore = false;
          }
        }
      })
    },
     // 启用平台
    platformEnable(){
      this.$confirm({
        title: '你想启用当前平台吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            platformEnable({pmid: this.detailsInfo.pmid}).then(res => {
              resolve()
              if(res.code == 200){
                this.$message.success('已启用');
                this.detailsInfo.status = 1;
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
        title: "你想停用当前平台吗？",
        onOk:() => {
          return new Promise((resolve, reject) => {
            platformDisable({pmid: this.detailsInfo.pmid}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                this.detailsInfo.status = 0;
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
        onOk:() => {
          return new Promise((resolve, reject) => {
            platformDel({pmid: this.detailsInfo.pmid}).then(res => {
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
      platformEdit(this.form).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg);
          this.getPlatformInfo();
        }
      }).finally(() => {
        this.doSaveLoading = false;
      });
    },
    // 获取平台详情
    getPlatformInfo(){
      getPlatformInfo({pmid: this.$route.query.pmid}).then(res => {
        if(res.code == 200){
          this.detailsInfo = res.data.info;
          for(let k in res.data.info){
            this.form[k] = res.data.info[k];
          }
          this.imgList[0] = this.form.logo;

          this.getPlatformAddonsGroup(this.addonsGroupParams);
          this.getPlatformAddonsExtra();
          console.log(this.form)
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
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                record.status = status;
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
      this.getPlatformUserIndex(pagination);
    },
    itemStatusClick(record){
      record.statusCheckedLoading = true;
      setTimeout(() => {
        record.statusCheckedLoading = false;
      }, 1000);
    },
    goOneBizConsole(item) {
       if(item.audit_status != 1){
        this.goCreate(item);
        return;
      }
      if(item.status != 1){
        // 已被禁用
        return;
      }
      // 存储平台数据到store及storage
      let data = JSON.parse(JSON.stringify(item));
      data.expired_at = moment.unix(data.expired_at).format('YYYY-MM-DD');
      data.start_at = moment.unix(data.start_at).format('YYYY-MM-DD');
      this.setPlatformInfo(data)
      
      getAdminSysMenuIndex().then(res=>{
        this.$router.push(res);
      })
    },
    jumpParent(){
      // this.$router.go(-1)
      // if (this.parentPath == '/genBackstage/myPlatform/myAppList') {
      // } else {
      this.$router.replace(this.parentPath)
      // }
    },
    // 平台用户删除
    deleteOfUser(item, index){
      this.platformUsersDeleteForm.mid = item.mid;
      this.$confirm({
        title: "你想删除当前账号吗？",
        onOk:() => {
          return new Promise((resolve, reject) => {
            platformUsersDelete(this.platformUsersDeleteForm).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                this.sourceDataOfUser.splice(index, 1);
              }
            }).catch(err => {
              console.log(err)
              reject();
            })
          })
        },
        onCancel() {}
      });
    },
    // 获取平台用户列表
    getPlatformUserIndex(pageData){
      getPlatformUserIndex({page: pageData.current, page_size: pageData.pageSize,...this.paramsOfUsersList}).then(res => {
        if(res.code == 200){
          this.sourceDataOfUser = res.data.list;
          pageData.total = res.data.pages.total;
          this.paginationOfUser = { ...this.paginationOfUser, ...pageData};
        }
      })
    },
    // 添加平台用户
    addUsersConfirm(){
      this.$refs.addUsersForm.validate(valid => {
        if(valid){
          this.addUsersConfirmLoading = true;
          platformUsersAdd(this.addUsersFormData).then(res => {
            this.addUsersConfirmLoading = false;
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.$refs.addUsersForm.resetFields();
              this.addUsersVisible = false;
              this.getPlatformUserIndex({page:1});
            }
          })
        }else{
          return false;
        }
      })
    },
    // 发送验证码
    sendCode(){
      if(this.addUsersFormData.mobile == ''){
        this.$message.error('请输入手机号码')
        return;
      }
      this.sendCodeLoading = true;
      getPlatformUserAddSms({
        pmid: this.addUsersFormData.pmid, 
        mobile: this.addUsersFormData.mobile
      }).then(res => {
        this.sendCodeLoading = false;
        if(res.code == 200){
          this.$message.success(res.msg);
          this.sendCodeTimer();
        }
      })
    },
    // 发送验证码倒计时
    sendCodeTimer(){
      if(this.timerText == '发送验证码'){
        this.timerText = 60;
      }
      this.timer = setInterval(() => {
        this.timerText--;
        if(this.timerText < 0){
          this.timerText = '发送验证码';
          clearInterval(this.timer);
        }
      }, 1000);
      // if(this.timerText >= 0){
        
      // }
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
}
.tableTop {
  padding: 15px 15px;
  padding-top: 0;
}

.currentApps{
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  height: 174px;
  
  .addonsItem{
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    min-width: 200px;
    .leftAvatar{
      float: left;
      width: 40%;
      min-width: 70px;
    }
    .rightDesc{
      float: left;
      width: 60%;
      max-width: calc(100% - 70px);
      .name{
        margin-bottom: 10px;
        width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  // li{
  //   width: 200px;
  //   float: left;
  //   margin-right: 10px;
  //   margin-bottom: 20px;
  //   .leftAvatar{
  //     float: left;
  //   }
  //   .rightDesc{
  //     float: left;
  //     padding-left: 10px;
  //     line-height: 26px;
  //     .name{
  //       margin-bottom: 10px;
  //       width: 120px;
  //       white-space: nowrap;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //     }
  //     .typesIcon{
  //       font-size: 16px;
  //       margin-right: 5px;
  //       color: rgba(18, 150, 219, 1);
  //     }
  //   }
  // }
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

</style>
