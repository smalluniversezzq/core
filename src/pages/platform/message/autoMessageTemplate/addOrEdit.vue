<template>
  <div>
    <a-modal :maskClosable="false"
      :width="800"
      :dialog-style="{ top: '20px' }"
      title="消息模板编辑"
      style="top: 10px"
      :visible="showModal"
      :destroyOnClose="true"
      :confirmLoading="confirmLoading"
      okText="保存"
      @cancel="modalCancel"
      @ok="save"
    >
      
        <div @mousedown="onMousedown">
          <a-form-model
            ref="form"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="触发事件" prop="event_name" >
              {{form.event_name}}<span class="tip">（{{form.desc}}）</span>
            </a-form-model-item>
            <a-form-model-item label="消息类型" prop="type_name" >
              {{form.type_name}}
            </a-form-model-item>
            <a-form-model-item label="消息标题" prop="title" help="推送和站内通知的标题" >
              <a-input v-model="form.title" placeholder="请输入消息标题" ></a-input>
            </a-form-model-item>
            <br/>
            <a-form-model-item :label="'消息内容' + (form.type == 2 ? '(单件商品)' : '')" prop="content">
              <a-textarea id="content" ref="content" @blur="onBlur" @focus="onFocus" :rows="4" v-model="form.content" placeholder="请输入消息内容" />
              <div>
                <a-tag id="hoverpointer" v-for="(item, index) in form.tag" :key="index" @click="clickOneTag(item.key, 'content')">{{'{' + item.key +'}'}}{{item.label}}</a-tag>
              </div>
            </a-form-model-item>
            <a-form-model-item v-if="form.type == 2" label="消息内容(多件商品)" prop="content_more">
              <a-textarea id="content_more" ref="content_more" @blur="onBlur" @focus="onFocus" :rows="4" v-model="form.content_more" placeholder="请输入消息内容" />
              <div>
                <a-tag id="hoverpointer" v-for="(item, index) in form.tag" :key="index" @click="clickOneTag(item.key, 'content_more')">{{'{' + item.key +'}'}}{{item.label}}</a-tag>
              </div>
            </a-form-model-item>
            <a-form-model-item label="通知途径" prop="notice_channel" >
              <byf-space>
                <span>站内通知</span>
                <a-switch :checked="!!form.is_site_notice" @click="changeStatus('is_site_notice')"></a-switch>
                <span>推送通知</span>
                <a-switch :checked="!!form.is_push_notice" @click="changeStatus('is_push_notice')"></a-switch>
              </byf-space>
            </a-form-model-item>
            <a-form-model-item label="开启跳转" prop="is_jump" >
              <byf-space>
                <a-switch :checked="!!form.is_jump" @click="changeStatus('is_jump')"></a-switch>
               </byf-space>
            </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>

import { platformMessageTemplateEdit } from '@/services/platformSetting'

import moment from 'moment'
export default {
  data(){
    return {
      operationType: "add", // 操作类型：add：添加；edit：修改
      showModal: false,
      confirmLoading: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
      form: {
        tid: '',
        title: '',
        content: '',
        is_site_notice: 0,
        is_push_notice: 0,
      },
      rules: {
        title: [ { required: true, message: "消息标题不能为空", trigger: "blur" } ],
        content: [ { required: true, message: "消息内容不能为空", trigger: "blur" } ],
      },
      mouseDownTarget: null,
      focusingOptionItem: null,
    }
  },
  created(){
    
  },
  methods: {
    clickOneTag(tagName, content) {
      tagName = `{${tagName}}`;
      const textarea = document.activeElement
      if (textarea.nodeName === 'TEXTAREA' && this.$refs[content].$el.id == textarea.id) {   
        const selectionStart = textarea.selectionStart
        const nextSelectionStart = selectionStart + tagName.length
        // 当焦点在textarea时
        this.form[content] = textarea.value.substr(0, selectionStart) + tagName + textarea.value.substr(selectionStart, textarea.value.length)
        
        this.$nextTick(() => {
          // 上面插入文字后，光标会自动跑到最后，所以js控制下光标位置
          textarea.setSelectionRange(nextSelectionStart, nextSelectionStart)
        })
      } else {
        // this.$message.warning('请先将光标放在要插入标签的位置')
        this.form[content] += tagName;
      }
    },
    onBlur(e) {
      if (this.mouseDownTarget && this.mouseDownTarget.nodeName !== 'TEXTAREA' && this.mouseDownTarget.className === 'ant-tag') { // 当不是因为点击另一个textarea或者按钮而失焦时，才重新聚焦
        e.target.focus();
      }
    },
    onMousedown(e) {
      // 记录鼠标按下触发的节点
      this.mouseDownTarget = e.target;
    },
    onFocus(optionItem, useIndex) {
      // 记录下聚焦的textarea的对应绑定的对象
      this.focusingOptionItem = optionItem;
      this.focusingUseIndex = useIndex;
    },
    /**
     * 展示弹窗
     * @param [obj] 要编辑的用户数据，不传就是添加用户
     */
    showModalAction(data) {
      if (data) {
        this.operationType = "edit";
        this.initForm(JSON.parse(JSON.stringify(data)));
      } else {
        this.operationType = "add";
      }
      this.showModal = true;
    },
    changeStatus(type){
      if(type == 'is_jump' && !this.form.link_name){
        return this.$message.error('跳转地址不存在，不可开启')
      }
      this.form[type] = this.form[type] == 0 ? 1 : 0;
    },
    resetForm() {
      this.$nextTick(() => {
        this.form.password = "";
        this.form.avatar = "";
      });
    },
    modalCancel() {
      this.showModal = false;
      this.confirmLoading = false;
      this.resetForm();
    },
    releaseTimeOk(value){
      let time = moment(value).unix();
      console.log(time)
    },
    initForm(data) {
      if (!data) {
        this.resetForm();
      } else {
        this.form = data;
        this.$set(this.form, 'content_more', '')
      }
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 校验通过
          this.confirmLoading = true;
            // 修改
          this.form.tid = this.form.id;
          console.log(this.form)
          platformMessageTemplateEdit(this.form).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg)
              this.$emit('confirm', {operationType: this.operationType})
              this.modalCancel();
            }
          }).finally(() => {
            this.confirmLoading = false;
          });
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
.link-wrap{
    display: flex;
    >span{
      line-height: 30px;
      padding-right: 5px;
    }
    .link-input{
      width: 82%;
      .link-input-btn{
        cursor: pointer;
      }
    }
  }
.tip{
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
#hoverpointer{
  cursor: pointer;
}
</style>