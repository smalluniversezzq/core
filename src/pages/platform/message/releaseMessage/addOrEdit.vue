<template>
  <div>
    <a-modal
      :maskClosable="false"
      width="900px"
      :visible="showModal"
      :destroyOnClose="true"
      okText="保存"
      @cancel="modalCancel"
    >
      <div slot="title">
        <div v-if="operationType == 'add'">创建消息</div>
        <a-tooltip v-else placement="topLeft">
          <template slot="title">
            {{form.title}}
          </template>
          <div class="card-title text-overflow-1">
            {{form.title}}
          </div>
        </a-tooltip>
      </div>
      <div class="beauty-scroll" style="height: 600px;overflow-y: auto;">
      <a-form-model
        ref="form"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
          <a-form-model-item
            label="消息类型"
            prop="type"
          >
            <a-radio-group v-model="form.type" :disabled="form.is_send == 1">
              <a-radio :value="1"> 系统通知	</a-radio>
              <a-radio :value="6"> 活动优惠 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="消息标题" prop="title" >
            <a-input :disabled="form.is_send == 1" v-model="form.title" placeholder="请输入消息标题" ></a-input>
          </a-form-model-item>
          <a-form-model-item label="消息内容" prop="content" >
            <a-textarea :autoSize="form.is_send == 1" :disabled="form.is_send == 1" :rows="4" v-model="form.content" placeholder="请输入消息内容" />
          </a-form-model-item>
          <a-form-model-item label="页面跳转" prop="jump_link" >
            <div class="link-wrap">
              <linkInput :disabled="form.is_send == 1" style="width: 100%" :links="defaultLinks" @confirm="linksConfirm" ></linkInput>
            </div>
          </a-form-model-item>
          <a-form-model-item label="选择图片" prop="show_type" >
            <a-radio-group :disabled="form.is_send == 1" v-model="form.show_type">
              <a-radio :value="4" :disabled="!isGoodsImg"> 使用商品主图 </a-radio>
              <a-radio :value="1"> 无图片 </a-radio>
              <a-radio :value="2"> 样式一 </a-radio>
              <a-radio :value="3"> 样式二 </a-radio>
            </a-radio-group>
            <help>
              <img style="width: 300px" src="@/assets/img/examples/msg.png"/>
            </help>
            <div v-show="form.show_type == 2 || form.show_type == 3">
              <byf-upload-btn v-show="form.is_send != 1" disabled class="byf-upload-btn" @change="changeOfImg" :imgsList="imgList"></byf-upload-btn>
              <img v-show="form.is_send == 1" style="width:100px; height: 100px;" :src="imgList[0]"/>
            </div>
            <template slot="help">
              <span v-if="form.show_type == 2">建议尺寸164*164</span>
              <span v-if="form.show_type == 3">建议尺寸616*164</span>
            </template>
          </a-form-model-item>
          <a-form-model-item label="目标终端" prop="target_device" >
            <a-checkbox-group
              v-model="form.target_device"
              :options="plainOptionsOfTargetDevice"
               :disabled="form.is_send == 1"
            />
          </a-form-model-item>
          <a-form-model-item label="目标用户" prop="target_user_level" ref="target_user_level" >
            <a-checkbox 
            :disabled="form.is_send == 1" 
            :indeterminate="indeterminate" 
            :checked="checkAllTargetUser" 
            @change="onCheckTargetUserAllChange">全选</a-checkbox>
            <br/>
            <a-checkbox-group
             :disabled="form.is_send == 1"
              v-model="form.target_user_level"
              :options="plainOptionsOfTargetUsers"
              @change="onCheckTargetUserChange"
            />
          </a-form-model-item>
          <a-form-model-item label="通知途径" prop="noticeChannels">
            <a-checkbox :disabled="form.is_send == 1" 
              :defaultChecked="form.is_site_notice == 1" @change="val => noticeChange(val, 'is_site_notice')"> 站内通知 </a-checkbox>
            <a-checkbox :disabled="form.is_send == 1" 
              :defaultChecked="form.is_push_notice == 1" @change="val => noticeChange(val, 'is_push_notice')"> 推送通知 </a-checkbox>
          </a-form-model-item>
          <a-form-model-item
            label="发布方式"
            prop="send_type"
          >
            <a-radio-group v-if="form.is_send != 1" :disabled="form.is_send == 1" v-model="form.send_type">
              <a-radio :value="1"> 立即发布 </a-radio>
              <a-radio :value="2"> 定时发布 </a-radio>
              <a-radio :value="3"> 存为预发布 </a-radio>
            </a-radio-group>
            <div v-else>
              <a-radio disabled :checked="form.send_type == 1 || form.send_type == 3"> 直接发布 </a-radio>
              <a-radio disabled :checked="form.send_type == 2"> 定时发布 </a-radio>
            </div>
          </a-form-model-item>
          <a-form-model-item
            label="发布时间"
            prop="send_time"
            v-if="form.send_type == 2"
          >
            <a-date-picker format="YYYY-MM-DD HH:mm" :defaultValue="defaultDendTime" @change="sendTimeChange" :disabled="form.is_send == 1" :show-time="{format:'HH:mm'}" placeholder="请选择时间"/>
          </a-form-model-item>
          <a-form-model-item label="备注" prop="remark" >
            <a-textarea :disabled="form.is_send == 1" :rows="4" v-model="form.remark" placeholder="请输入备注" ></a-textarea>
          </a-form-model-item>
        </a-form-model>
      </div>
      <template slot="footer">
        <byf-space>
          <a-button @click="modalCancel">取消</a-button>
          <a-button :disabled="form.is_send == 1" type="primary" v-if="form.send_type == 1 && form.is_send != 1" :loading="confirmLoading" @click="save">立即发布</a-button>
          <a-button :disabled="form.is_send == 1" type="primary" v-if="form.send_type == 2" :loading="confirmLoading" @click="save">定时发布</a-button>
          <a-button type="primary" v-if="form.send_type == 3 || form.is_send == 1" :loading="confirmLoading" @click="save">存为预发布</a-button>
        </byf-space>
      </template>
    </a-modal>
  </div>
</template>

<script>
import linkInput from '@/components/byf/linkSelector/linkSelectorInput'
import moment from 'moment'
import help from '@/pages/platform/common/help'
import { platformMessageAdd, platformMessageEdit, platformUserLevel } from '@/services/platformSetting'
let plainOptionsOfTargetUsers = [];
let plainOptionsOfTargetDevice = [
  { label: '安卓', value: 'android' },
  { label: '苹果', value: 'ios' },
];
let form = {
  type: 1,
  title: '',
  content: '',
  show_type: 1,
  show_cover: '',
  target_device: plainOptionsOfTargetDevice.map(item => {
    return item.value;
  }),
  target_user_level: [],
  is_site_notice: 1,
  is_push_notice: 1,
  send_type: 1,
  remark: '',
  send_time: '',
  noticeChannels: [],
  jump_link: null,
}
export default {
  components: {
    help,
    linkInput
  },
  data(){
    let sentTimeRule = (rule, value, callback) => {
      console.log(this.form.is_send)
      if(this.form.send_type == 2){
        if(this.form.is_send != 'undefined' && this.form.is_send == 1){
          callback();
        }
        if(!this.form.send_time){
          callback(new Error('请选择发布时间'));
        }else{
          if(!this.timeRule(moment(new Date()).unix(), value)){
            callback(new Error('定时发布时间不符合要求，时间小于3分钟或超过1年'));
          }else{
            callback();

          }
        }
      }else{
        callback();
      }
    };
    let noticeChannelsRule = (rule, value, callback) => {
      if(!this.form.is_site_notice && !this.form.is_push_notice){
        callback(new Error('请选择通知途径'));
      }else{
        callback()
      }
    };
    let targetUserLevelRule = (rule, value, callback) => {
      if(this.form.target_user_level.length == 0){
        callback(new Error('请选择目标用户'));
      }else{
        callback()
      }
    }
    return {
      operationType: "add", // 操作类型：add：添加；edit：修改
      showModal: false,
      confirmLoading: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 17 },
      defaultDendTime: '',
      form: JSON.parse(JSON.stringify(form)),
      defaultLinks: [],
      rules: {
        title: [ { required: true, message: "消息标题不能为空", trigger: "blur" } ],
        content: [ { required: true, message: "消息内容不能为空", trigger: "blur" } ],
        target_device: [ { required: true, message: "请选择目标终端", trigger: "change" } ],
        target_user_level: [{ required: true, validator: targetUserLevelRule, trigger: "change"}],
        send_time: [{ required: true, validator: sentTimeRule, trigger: "change" }],
        noticeChannels: [{ required: true, validator: noticeChannelsRule, trigger: "change" }],
      },
      imgList: [],
      plainOptionsOfTargetDevice,
      plainOptionsOfTargetUsers,
      indeterminate: false,
      checkAllTargetUser: true,
      isGoodsImg: false,
    }
  },
  created(){
    this.platformUserLevel();
  },
  methods: {
    linksConfirm(val){
      console.log('linksConfirm')
      if(val.length){
        this.form.jump_link = val[0];
      }else{
        this.form.jump_link = null;
      }
      if(this.form.jump_link){
        if(this.form.jump_link.params){
          if(this.form.jump_link.params.goods_id){
            this.isGoodsImg = true;
          }else{
            this.isGoodsImg = false;  
            this.form.show_type = 1;
          }
        }else{
          this.isGoodsImg = false;  
          this.form.show_type = 1;
        }
      }else{
        this.isGoodsImg = false;  
        this.form.show_type = 1;
      }
    },
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
    platformUserLevel(){
      platformUserLevel().then(res => {
        if(res.code == 200){
          this.plainOptionsOfTargetUsers = [];
          for(let k in res.data){
            this.plainOptionsOfTargetUsers.push({
              label: res.data[k],
              value: k
            })
          }
        }
      })
    },
    onCheckTargetUserChange(checkedList){
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptionsOfTargetUsers.length;
      this.checkAllTargetUser = checkedList.length === this.plainOptionsOfTargetUsers.length;
      this.$nextTick(() => {
        this.$refs.form.validateField('target_user_level');
      })
    },
    onCheckTargetUserAllChange(e){
      let allList = this.plainOptionsOfTargetUsers.map(item => {
        return item.value
      })
      this.indeterminate = false;
      this.checkAllTargetUser = e.target.checked;
      this.form.target_user_level = e.target.checked ? allList : []
    },
    resetForm(){
      this.form = JSON.parse(JSON.stringify(form));
    },
    noticeChange(val, key){
      this.form[key] = val.target.checked ? 1 : 0;
      this.$nextTick(() => {
        this.$refs.form.validateField('noticeChannels');
      })
    },
    changeOfImg(val){
      this.form.show_cover = val[0];
    },
    sendTimeChange(value){
      if(value){
        let time = moment(value).unix();
        this.form.send_time = time;
      }else{
        this.form.send_time = '';
      }
      this.$refs.form.validateField('send_time');
    },
    /**
     * 展示弹窗
     * @param [obj] 要编辑的用户数据，不传就是添加用户
     */
    showModalAction(data) {
      this.showModal = true;
      this.imgList = [];
      this.form.send_time = "";
      this.defaultDendTime = ""
      if (data.id) {
        this.operationType = "edit";
        this.form = JSON.parse(JSON.stringify(data))
        if(this.form.show_cover){
          this.imgList = [this.form.show_cover]
        }
        if(this.form.jump_link){
          this.defaultLinks = [this.form.jump_link]
          if(this.form.jump_link.params){
            if(this.form.jump_link.params.goods_id){
              this.isGoodsImg = true;
            }else{
              this.isGoodsImg = false;  
              this.form.show_type = 1;
            }
          }else{
            this.isGoodsImg = false;  
            this.form.show_type = 1;
          }
        }else{
          this.isGoodsImg = false;  
          this.form.show_type = 1;
        }
        if(this.form.send_time){
          this.defaultDendTime = moment.unix(this.form.send_time)
        }
      } else {
        this.operationType = "add";
        this.resetForm()
        // 初始化为全部选中用户等级
        this.form.target_user_level = this.plainOptionsOfTargetUsers.map(item => {
          return item.value;
        })
      }
      this.onCheckTargetUserChange(this.form.target_user_level)
      this.confirmLoading = false;
    },
    modalCancel() {
      this.showModal = false;
    },
    editMessage(data){
      this.confirmLoading = true;
      platformMessageEdit(data).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.modalCancel();
          this.$emit('confirm', {operationType: this.operationType, sendType: data.send_type})
        }else{
          this.confirmLoading = false;
        }
      }).catch(() => {
        this.confirmLoading = false;
      });
    },
    addMessage(data){
      this.confirmLoading = true;
      platformMessageAdd(data).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.modalCancel();
          this.$emit('confirm', {operationType: this.operationType, sendType: data.send_type})
        }else{
          this.confirmLoading = false;
        }
      }).catch(() => {
        this.confirmLoading = false;
      });
    },
    save() {
      this.confirmLoading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          // 校验通过
          let formData = JSON.parse(JSON.stringify(this.form))
          if(formData.show_type == 1){
            formData.show_cover = "";
          }
          if(formData.is_send == 1){
            formData.send_type = 3;
            formData.pre_release = 1; // 存为预发布的标识
          }
          if(this.operationType == 'add'){
            // 新增
            this.addMessage(formData)
          }else{
            // 修改
            if(formData.is_send == 1){
              delete formData.is_send;
              delete formData.id;
              this.addMessage(formData)
            }else{
              this.editMessage(formData)
            }
          }
        }else{
          this.confirmLoading = false;
          this.$message.error('请填写完整后提交')
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.titleWrap{
  font-weight: bold;
  background: rgb(244 246 248);
  padding: 10px;
  
}
.card-title{
  min-width: 200px;
  max-width: 95%;
}
.link-wrap{
    // display: flex;
    // align-items: center;
    margin-top: 4px;
  }
</style>