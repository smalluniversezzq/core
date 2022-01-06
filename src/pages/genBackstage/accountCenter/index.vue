<template>
  <div>
    <a-card>
      <a-row class="content">
        <a-col :span="6" class="leftWarp">
          <div class="leftLogoBox">
            <div class="avatarWrap">
              <div class="mask" @click="openModal">+</div>
              <a-avatar class="avatar" :size="120" :src="formData.avatar"></a-avatar>
            </div>
            <p class="real_name">{{formData.real_name}}</p>
            <p>{{formData.mobile}}</p>
            <p>注册：{{formData.created_at}}</p>
          </div>
        </a-col>
        <a-col :span="18" class="rightWrap">
          <div class="rightForm">
            <a-form-model
              ref="searchForm"
              layout="vertical"
              :model="formData"
            >
            <a-form-model-item label="用户姓名" prop="real_name">
              <a-input placeholder="请输入自己的真实姓名" v-model="updateFormData.real_name"/>
            </a-form-model-item>
            <a-form-model-item label="手机号码" prop="mobile" >
              <a-input disabled placeholder="请输入你的手机号" v-model="updateFormData.mobile"/>
            </a-form-model-item>
            <a-form-model-item label="登录密码" prop="password">
              <a-input placeholder="不修改密码请留空" v-model="updateFormData.password"/>
            </a-form-model-item>
            <!-- TODO 绑定微信暂时写死后期需要增加上 -->
            <a-form-model-item
              label="绑定微信"
              prop="bindWx"
            >
              <span>
                <byf-icon type="iconweixin"></byf-icon>
                绑定微信
              </span>
              <!-- <span v-show="formData.bindWx == 1">
                <byf-icon type="iconweixin"></byf-icon>
                已绑定
              </span> -->
              <byf-button
                  @click="bindOrUnbind"
                  type="link"
                  size="small"
                  style="padding-left: 10px;color:rgb(82, 196, 26)"
                > 
                <byf-icon type="iconweixin"></byf-icon>
                {{formData.bindWx == 0 ? '去绑定' : '解绑'}}
                </byf-button>
              </a-form-model-item>
            </a-form-model>
            <a-button type="primary" @click="save" :loading="loading">保存</a-button>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-modal :maskClosable="false"
      title="扫描二维码绑定微信账户"
      v-model="qrCodeIsShow"
      okText="保存"
      :footer="null"
      :width="360"
    >
      <div class="qrCodeWrap">
       <a-avatar 
          class="app-avatar"
          shape="square"
          :size="240"
          :src="formData.avatar"
        ></a-avatar>
        <p class="tip">用微信扫描上方二维码，绑定微信账号</p>
      </div>
    </a-modal>
  </div>
</template>
<script>
// import editUser from "./edit";
// import addOrEdit from "./addOrEdit";
import { mapMutations, mapGetters } from "vuex";
import { getAdminUserInfo, adminUserInfoEdit } from "@/services/main";
export default {
  // components: { editUser, addOrEdit },
  data() {
    // // 确认密码验证
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入新密码'));
    //   } else {
    //     if (this.passwordFormData.confirm_password !== '') {
    //       this.$refs.passwordForm.validateField('confirm_password');
    //     }
    //     callback();
    //   }
    // };
    // let validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次确认密码'));
    //   } else if (value !== this.passwordFormData.new_password) {
    //     callback(new Error("两次密码不一致，请重新输入"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
      formData: {
        mid: '',
        avatar: '',
        account: '18888888888',
        mobile: 15555555555,
        real_name: '喜羊羊',
        password: '123456',
        bindWx: 0,
        lastTime: '2020-10-20',
        registerTime: '2020-01-01',
      },
      updateFormData: {
        real_name: '',
        mobile: '',
        password: '',
      },

      qrCodeIsShow: false,
      qrCodeFormData: {
        qrCode: '',
      },
      imgList: [],
      realNameRules: {
        real_name: [{ min: 1, max: 15, message: '最多输入15个字', trigger: 'blur' },]
      },
      loading: false,
    }
  },
  computed:{
    ...mapGetters("account", ["user"])
  },
  created(){
    console.log(this.user)
    this.getAdminUserInfo();
  },
  methods: {
    ...mapMutations("account", ["setUser"]),
    save(){
      let data = {
        real_name: this.updateFormData.real_name,
        password: this.updateFormData.password
      };
      this.loading = true;
      adminUserInfoEdit(data).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
          this.formData.real_name = this.updateFormData.real_name;
          this.updateFormData.password = '';
          this.setUser({...this.user, real_name: this.formData.real_name})
        }
      }).finally(() => {
        this.loading = false;
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
          this.adminUserInfoEdit({avatar: this.imgList[0]})
        }
      });
    },
    adminUserInfoEdit(data){
      adminUserInfoEdit(data).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
          if(data.avatar){
            this.formData.avatar = data.avatar;
            this.setUser({...this.user, avatar: this.formData.avatar})
          }
        }
      })
    },
    getAdminUserInfo(){
      getAdminUserInfo().then(res => {
        this.formData = res.data.info;
        this.updateFormData.real_name = this.formData.real_name;
        this.updateFormData.mobile = this.formData.mobile;
         this.imgList[0] = this.formData.avatar;
      })
    },
    // 微信绑定/解绑
    bindOrUnbind(){
      this.$message.info('功能开发中');
      return false;
      // if(this.formData.bindWx == 0){
      //   // 绑定微信
      //   this.qrCodeIsShow = true;
      // }else{
      //   // 解绑
      //   this.$confirm({
      //     title: "提示",
      //     content: "确定解除微信绑定吗?",
      //     okText: "确认",
      //     cancelText: "取消",
      //     centered: "",
      //     onOk: () => {
      //       // 解除微信绑定
      //       // platformUserEdit().then(res => {
      //       //   console.log(res)
      //       // })
      //       // return new Promise((resolve, reject) => {
      //       //   record.isPublish = !record.isPublish;
      //       //   switchStatus({
      //       //     id: record.id,
      //       //     isPublish: Number(record.isPublish)
      //       //   }).then(res => {
      //       //     if (res.code == 200) {
      //       //       resolve();
      //       //     } else {
      //       //       reject();
      //       //     }
      //       //     this.$message.success(res.msg);
      //       //   });
      //       // });
      //     },
      //     onCancel() {}
      //   });
      // }
    },
  },
};
</script>
<style scoped lang="less">
  .qrCodeWrap{
    text-align: center;
    .tip{
      color: #a0a0a0;
      padding-top: 10px;
      margin-bottom: 0;
    }
  }
  .content{
    .leftWarp{
      padding-top: 20px;
      
      .leftLogoBox{
        text-align: center;
        .avatarWrap{
          display: inline-block;
          margin-bottom: 20px;
          position: relative;
          
          .mask{
            width: 100%;
            height: 100%;
            display: inline-block;
            color: #fff;
            opacity: 0;
            background: rgba(0,0,0,.2);
            position:absolute;
            z-index: 1;
            border-radius: 50%;
            font-size: 30px;
            padding-top: 34px;
            &:hover{
              opacity: 1;
              cursor: pointer;
            }
          }
        }
        .real_name{
          font-weight: bold;
  
        }
      }
    }
    .rightWrap{
      border-left: 1px solid #f0f0f0;
      padding-top: 20px;
      .rightForm{
        width: 80%;
        padding: 0 50px;
      }

    }

  }
  
</style>
