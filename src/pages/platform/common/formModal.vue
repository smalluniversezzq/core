<template>
  <div>
    <a-modal :maskClosable="false"
      :title="modalConfig.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
          ref="form"
          :rules="rules"
          :model="formData"
          :label-col="{span: 6}"
          :wrapper-col="{span: 18}"
        >
          <a-form-model-item v-for="item in formList" :key="item.id" :label="item.label" :prop="item.field" :help="item.help">
            <a-input v-if="item.type == 1" :disabled="item.disabled" :placeholder="item.placeholder" v-model="item.value"/>
            <a-textarea v-if="item.type == 2" :placeholder="item.placeholder" v-model="item.value" :rows="item.rows"/>
            <a-radio-group v-if="item.type == 3" :options="item.options" v-model="item.value" />
            <a-checkbox-group v-if="item.type == 4" v-model="item.value" :options="item.options" />
            <a-switch v-if="item.type == 5" v-model="item.value"/>
          </a-form-model-item>
          <a-form-model-item :label-col="{span: 6}"
          :wrapper-col="{offset: 6}">
            <slot></slot>
          </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
 /**formList: [
  * type：表单项类型
  * 1：输入框，2.文本框，3.单选框，4.多选框，5.switch切换按钮
  * label：表单项的label
  * field：字段名
  * value： 字段值
  * placeholder： 输入框内提示信息
  * help：表单项下面的帮助信息
  *   {type: 1, label: '输入框', field: 'input', value: '', placeholder: '测试一下', help: '帮帮我'},
  *   {type: 2, label: '文本框', field: 'textarea', value: '', placeholder: '测试一下', help: '帮帮我', rows: 4},
  *   {type: 3, label: '单选框', field: 'radio', value: 0,options: [{label: '苹果6', value: 0},{label: '苹果6s', value: 1}], placeholder: '测试一下', help: '帮帮我', },
  *   {type: 4, label: '多选框', field: 'checkbox', value: [0],options: [{label: '苹果6', value: 0},{label: '苹果6s', value: 1}], placeholder: '测试一下', help: '帮帮我', },
  *   {type: 5, label: '切换按钮', field: 'switch', value: false, placeholder: '测试一下', help: '帮帮我', },
  *]
  */
          
export default {
  props: {
    modalConfig: {
      type: Object,
      default: () => {
        return {
          title: '表单'
        }
      }
    },
    formList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rules: {
      type: Object,
      default: null
    },
    confirmLoading: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data(){
    return {
      formData: {},
      visible: false,
    }
  },
  mounted(){
    console.log(this.formList)
  },
  methods:{
    show(){
      this.visible = true;
    },
    handleOk(){
      console.log(this.setReturnForm(this.formList))
      // this.$emit('save', this.formData);
    },
    handleCancel(){
      if(!this.confirmLoading){
        this.visible = false;
      }
    },
    setReturnForm(data){
      let form = {}
      data.forEach((item) => {
        form[item.field] = item.value;
      })
      return form;
    }
  }
}
</script>

<style>

</style>