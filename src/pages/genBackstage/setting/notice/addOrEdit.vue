<template>
  <div>
    <a-card>
      <a-spin :spinning="spinning">
        <a-form-model
          ref="form"
          :rules="rules"
          :model="formData"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item
            label="公告标题"
            prop="title"
          >
            <a-input
              v-model="formData.title"
              placeholder="请输入公告标题"
              :maxLength="50"
            >
            <div slot="suffix">{{formData.title.length || 0}}/50</div>
          </a-input>
          </a-form-model-item>
          <a-form-model-item label="公告内容" prop="content">
            <div id="content"></div>
          </a-form-model-item>
          <a-form-model-item label="重要程度" prop="importance">
            <a-radio-group :disabled="disabledReleaseStatus" name="importance" v-model="formData.importance">
              <a-radio :value="0">一般</a-radio>
              <a-radio :value="1">重要</a-radio>
            </a-radio-group>
          </a-form-model-item>
        
          <a-form-model-item label="接收目标" prop="target">
            <a-radio-group name="target" v-model="formData.target" :disabled="disabledReleaseStatus">
              <a-radio :value="1">所有平台接收</a-radio>
              <a-radio :value="2">部分平台接收</a-radio>
              <a-radio :value="3">部分平台不接收</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-show="formData.target != 1" label="选择平台" prop="platform_ids" help="说明：支持平台多选">
            <a-select 
              :getPopupContainer='triggerNode => triggerNode.parentNode'
              :disabled="disabledReleaseStatus"
              allow-clear 
              mode="multiple" 
              style="width: 100%" 
              placeholder="请选择" 
              v-model="formData.platform_ids" 
              :filter-option="false"
              :not-found-content="fetching ? undefined : null"
              @search="fetchUser"
              @change="platformListChange">
              <a-spin v-if="fetching && filterPlatformList.length > 0" slot="notFoundContent" size="small" />
              <a-select-option v-for="item in filterPlatformList" :key="item.key">
                {{ item.label }}（{{item.pmid}}）
              </a-select-option>
              <div slot="dropdownRender" slot-scope="menu">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0;" />
                <div
                  style="padding: 4px 8px; cursor: pointer;"
                  @mousedown="e => e.preventDefault()"
                >
                <a-spin :spinning="paginationSpinning">
                  <a-pagination 
                    size="small"
                    @click.prevent.stop
                    :show-total="pagination['show-total']" 
                    v-model="pagination.current" 
                    :page-size="pagination.pageSize" 
                    :total="pagination.total" 
                    @change="onChange"/>
                </a-spin>
                </div>
              </div>
            </a-select>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="发布类型" prop="type">
            <a-radio-group name="type" v-model="formData.type" :disabled="disabledReleaseStatus">
              <a-radio :value="0">待发布（即草稿）</a-radio>
              <a-radio :value="2">立即发布</a-radio>
              <a-radio :value="1">定时发布</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
              label="发布时间"
              prop="release_time"
              v-if="formData.type == 1"
            >
              <a-date-picker :disabled="disabledReleaseStatus" :defaultValue="defaultSendTime" @change="sendTimeChange" show-time placeholder="请选择时间"/>
            </a-form-model-item>
          <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
            <a-space>
              <a-button type="primary" @click="save">提交</a-button>
              <a-button @click="back">返回</a-button>
              <a-tooltip>
                <template slot="title">
                  另存为草稿会保存一份新的公告数据，但是不会修改原来的公告数据
                </template>
                <a-button @click="save(0)">另存为草稿</a-button>
              </a-tooltip>
              
            </a-space>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { getAdminPlatformIndex } from "@/services/adminPlatform";
import { coreNoticeAdd, coreNoticeEdit, coreNoticeDetail } from "@/services/coreNotice"
import moment from 'moment'
import { cloneDeep } from 'lodash'
import E from 'wangeditor'
const { BtnMenu } = E
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data(){
    let sentTimeRule = (rule, value, callback) => {
      if(this.formData.type == 1){
        if(!this.formData.release_time){
          callback(new Error('请选择发布时间'));
        }else{
          console.log(this.formData.id)
          if(!this.timeRule(moment(new Date()).unix(), value) && !this.formData.id){
            callback(new Error('定时发布时间不符合要求，时间小于3分钟或超过1年'));
          }else{
            callback();

          }
        }
      }else{
        callback();
      }
    };
    let platformIdsRule = (rule, value, callback) => {
      if(this.formData.target != 1 && value.length == 0){
        callback(new Error('请选择平台'));
      }else{
        callback()
      }
    }
    return {
      paginationSpinning: false,
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 10,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      spinning: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 18 },
      formData: {
        title: '',
        content: '',
        importance: 0,
        target: 1,
        platform_ids: [],
        type: 0,
        release_time: ''
      },
      rules: {
        title: [ { required: true, message: "公告标题不能为空", trigger: "blur" } ],
        content: [ { required: true, message: "公告内容不能为空", trigger: "blur" } ],
        release_time: [{ required: true, validator: sentTimeRule, trigger: "change" }],
        platform_ids: [{ required: true, validator: platformIdsRule, trigger: "change" }],
        
      },
      defaultSendTime: '',
      platformList: [], // {key: '', label: 'text'}
      fetching: false,
      contentEditor: null,
      editorMenus: [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'editorImgMenu',
          'editorVideoMenu',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
      ],
    }
  },
  computed: {
    disabledReleaseStatus(){
      let flag = false;
      if(this.formData.id){
        if(this.formData.release_status == 1){
          flag = true;
        }
      }
      return flag;
    },
    filterPlatformList(){
      if(this.platformList){
        return this.platformList.map(item => {
          item.key = item.pmid;
          item.label = item.name;
          return item;
        });
      }else{
        return []
      }
    }
  },
  created(){
    console.log(this.$route.query.id)
    this.init();
    this.getAdminPlatformIndex(this.pagination)
  },
  mounted(){
    this.initEditor();
  },
  methods: {
    timeRule(startDate, endDate){
      let ruleTime = 60 * 3;
      let duration = endDate - startDate;
      let lastYear = moment().add(1, 'y').unix()
      if(duration < ruleTime || endDate > lastYear){
        return false;
      }else{
        return true;
      }
    },
    init(){
      if(this.$route.query.id){
        // 编辑
        this.coreNoticeDetail(this.$route.query.id)
      }
    },
    coreNoticeDetail(id){
      this.spinning = true;
      coreNoticeDetail({id}).then(res => {
        if(res.code == 200){
          this.formData = res.data.info;
          this.contentEditor.txt.html(this.formData.content);
          if(this.formData.release_time){
            this.defaultSendTime = moment.unix(this.formData.release_time)
          }
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    pageSizeChange(current, pageSize){
      this.pagination.pageSize = pageSize;
      this.pagination.current = 1;
      this.fetching = true;
      this.getAdminPlatformIndex(this.pagination);
    },
    onChange(currentPage){
      this.pagination.current = currentPage;
      this.fetching = true;
      this.getAdminPlatformIndex(this.pagination);
    },
    getAdminPlatformIndex(pageData, params = {}){
      this.paginationSpinning = true;
      return getAdminPlatformIndex({...params, page: pageData.current, page_size: pageData.pageSize, }).then(res => {
        if(res.code == 200){
          this.paginationSpinning = false;
          this.platformList = res.data.list;
          pageData.total = res.data.pages.total;
          this.pagination = { ...this.pagination, ...pageData};
        }
      })
    },
    sendTimeChange(value){
      if(value){
        let time = moment(value).unix();
        this.formData.release_time = time;
      }else{
        this.formData.release_time = '';
      }
      this.$refs.form.validateField('release_time');
    },
    platformListChange(val){
      console.log(val)
      console.log(this.formData.platform_ids)
    },
    fetchUser(value) {
      console.log('fetching user', value);
      this.platformList = [];
      this.fetching = true;
      if(value){
        this.getAdminPlatformIndex(this.pagination, {keyword: value})
      }else{
        this.getAdminPlatformIndex(this.pagination);
      }
    },
    initImgBtn(editorName){
      let _this = this;
      class imgMenu extends BtnMenu {
          constructor(editor) {
              const $elem = E.$(
                  `<div class="w-e-menu">
                      <i class="w-e-icon-image"></i>
                  </div>`
              )
              super($elem, editor)
          }
          // 菜单点击事件
          clickHandler() {
              // 做任何你想做的事情
              // 可参考【常用 API】文档，来操作编辑器
              _this.checkImage(editorName);
          }
          // 菜单是否被激活（如果不需要，这个函数可以空着）
          // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
          // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
          tryChangeActive() {
              // 激活菜单
              // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
              // 2. this.this.isActive === true
              // this.active()
              // // 取消激活菜单
              // // 1. 菜单 DOM 节点会删掉 .w-e-active
              // // 2. this.this.isActive === false
              // this.unActive()
          }
      }
      return imgMenu;
    },
    initVideoBtn(editorName){
      let _this = this;
      class imgMenu extends BtnMenu {
          constructor(editor) {
              const $elem = E.$(
                  `<div class="w-e-menu">
                      <i class="w-e-icon-play"></i>
                  </div>`
              )
              super($elem, editor)
          }
          clickHandler() {
              // 做任何你想做的事情
              // 可参考【常用 API】文档，来操作编辑器
              _this.checkVideo(editorName);
          }tryChangeActive() {
              // 激活菜单
              // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
              // 2. this.this.isActive === true
              // this.active()
              // // 取消激活菜单
              // // 1. 菜单 DOM 节点会删掉 .w-e-active
              // // 2. this.this.isActive === false
              // this.unActive()
          }
      }
      return imgMenu;
    },
    initEditor(){
      this.contentEditor = new E('#content');
      this.contentEditor.config.focus = false;
      this.contentEditor.config.withCredentials = false;
      this.contentEditor.config.menus = this.editorMenus;
      this.contentEditor.menus.extend('editorImgMenu', this.initImgBtn('contentEditor'))
      // 将菜单加入到 editor.config.menus 中
      // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
      this.contentEditor.menus.extend('editorVideoMenu', this.initVideoBtn('contentEditor'))
      this.contentEditor.config.zIndex = 500;
      this.contentEditor.config.onchange = () => {
        this.formData.content = this.contentEditor.txt.html();
        this.$refs.form.validateField('content')
      }
      this.contentEditor.create();
    },
    checkVideo(editor){
      this.$byfUploadVideo({videosList: []}).then(res => {
        if (res.action == 'confirm') {
          this.videoList = [];
          res.selectedVideos.forEach(item => {
            this.videoList.push(item)
          });
          console.log(res.selectedVideos)
          let video = `<iframe style="width: 50%; height: 400px" src="${res.selectedVideos[0].url}" />`
          this[editor].cmd.do('insertHTML', video)
        }
      });
    },
    checkImage(editor){
      console.log(editor)
      this.$byfUpload({multiple: false, imgsList: []}).then(res => {
        if (res.action == 'confirm') {
          let img = `<img src="${res.selectedImgs[0].url}" />`
          this[editor].cmd.do('insertHTML', img)
        }
      });
    },
    coreNoticeAdd(type){
      let titleType = '保存';
      if(type == 0){
        titleType = '另存';
      }
      let formData = cloneDeep(this.formData);
      this.$refs.form.validate(valid => {
        if(valid){
          if(formData.target == 1){
            formData.platform_ids = [];
          }
          if(formData.type != 1){
            formData.release_time = '';
          }
          if(formData.id){
            delete formData.id;
            formData.type = 0;
          }
          // 调用接口
          this.$confirm({
            title: "提示",
            content: `确定${titleType}吗？`,
            okText: "确认",
            cancelText: "取消",
            centered: "",
            onOk: () => {
              return new Promise((resolve, reject) => {
                coreNoticeAdd(formData).then(res => {
                  if(res.code == 200){
                    resolve();
                    if(type == 0){
                      this.$confirm({
                        title: "提示",
                        content: `另存成功，确认返回列表吗？`,
                        okText: "确认",
                        cancelText: "取消",
                        centered: "",
                        onOk: () => {
                          this.$router.go(-1);
                        },
                        onCancel() {}
                      });
                    }else{
                      this.$router.go(-1);
                    }
                    this.$message.success(res.msg)
                  }else{
                    reject();
                  }
                }).catch(() => {
                  reject();
                })
              })
            },
            onCancel() {}
          });
        }
      })


      

      // this.spinning = true;
      // return coreNoticeAdd(this.formData).then(res => {
      //   if(res.code == 200){
      //     this.back();
      //     this.$message.success(res.msg)
      //   }
      // }).finally(() => {
      //   this.spinning = false;
      // })
    },
    coreNoticeEdit(){
      this.$refs.form.validate(valid => {
        if(valid){
          // 调用接口
          this.$confirm({
            title: "提示",
            content: `确定保存吗？`,
            okText: "确认",
            cancelText: "取消",
            centered: "",
            onOk: () => {
              return new Promise((resolve, reject) => {
                coreNoticeEdit(this.formData).then(res => {
                  if(res.code == 200){
                    resolve();
                    this.$router.go(-1);
                    this.$message.success(res.msg)
                  }else{
                    reject();
                  }
                }).catch(() => {
                  reject();
                })
              })
            },
            onCancel() {}
          });
        }
      })
      


      // this.spinning = true;
      // return coreNoticeEdit(this.formData).then(res => {
      //   if(res.code == 200){
      //     this.back();
      //     this.$message.success(res.msg)
      //   }
      // }).finally(() => {
      //   this.spinning = false;
      // })
    },
    save(type){
      this.formData.content = this.contentEditor.txt.html();
      if(type == 0){
        console.log('另存草稿')
        this.coreNoticeAdd(0);
      }else{
        console.log('编辑/新增')
        if(this.formData.id){
          // 编辑
          this.coreNoticeEdit();
        }else{
          // 新增
          this.coreNoticeAdd();
        }
      }
      

      // this.spinning = true;
      // this.formData.content = this.contentEditor.txt.html();
      // this.$refs.form.validate(valid => {
      //   if(valid){
      //     if(this.formData.target == 1){
      //       this.formData.platform_ids = [];
      //     }
      //     if(this.formData.type != 2){
      //       this.formData.release_time = '';
      //     }
      //     if(type == 0){
      //       console.log('另存草稿')
      //       if(this.formData.id){
      //         delete this.formData.id;
      //       }
      //       this.formData.type = 0;
      //       this.coreNoticeAdd();
      //     }else{
      //       console.log('编辑/新增')
      //       if(this.formData.id){
      //         // 编辑
      //         this.coreNoticeEdit();
      //       }else{
      //         // 新增
      //         this.coreNoticeAdd();
      //       }
      //     }
      //   }else{
      //     this.spinning = false;
      //   }
      // })
    },
    back(){
      this.$confirm({
        title: "提示",
        content: `确定返回列表吗？`,
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          this.$router.go(-1);
        },
        onCancel() {}
      });
      
    }
  }
}
</script>
      
<style scoped lang="less">
/deep/ .ant-input-affix-wrapper .ant-input:not(:last-child){
  padding-right: 60px;
}
</style>