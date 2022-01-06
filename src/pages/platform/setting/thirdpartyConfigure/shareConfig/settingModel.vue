<template>
  <div>
    <a-modal :maskClosable="false"
      :title="currentFormData.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="45%"
    >
      <a-form-model
          ref="form"
          :model="currentFormData"
          :label-col="{span: 6}"
          :wrapper-col="{span: 18}"
        >
          <a-form-model-item v-for="item in currentFormData.formItemList" :key="item.id" :label="item.label" :prop="item.field">
            <a-input v-if="item.type == 0" :placeholder="item.placeholder" v-model="item.value" />
            <a-switch v-if="item.type == 1" v-model="item.value"/>
          </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data(){
    return {
      visible: false,
      confirmLoading: false,
      currentFormData: {},
      formObj: {}
    }
  },
  mounted(){
  },
  methods:{
    show(data){
      this.currentFormData = JSON.parse(JSON.stringify(data))
      this.visible = true;
    },
    handleOk(){
      this.$emit('save', this.setReturnForm(this.currentFormData));
    },
    handleCancel(){
      if(!this.confirmLoading){
        this.visible = false;
      }
    },
    setReturnForm(data){
      let form = {}
      for(let k in data){
        if(!Array.isArray(data[k])){
          if(k != 'title'){
            form[k] = data[k]
          }
        }else{
          data[k].forEach(el => {
            form[el.field] = el.value;
          });
        }
      }
      return form;
    }
  }
}
</script>

<style>

</style>