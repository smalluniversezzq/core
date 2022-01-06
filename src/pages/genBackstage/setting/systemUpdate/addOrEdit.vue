<template>
  <a-modal :maskClosable="false"
    :destroyOnClose="true"
    :width="950"
    :title="operationType == 'add' ? '新增记录' : '修改记录'"
    style="top: 10px"
    :visible="showModal"
    :confirmLoading="confirmLoading"
    okText="保存"
    @cancel="modalCancel"
    @ok="save"
  >
    <a-form-model 
      ref="form" 
      :model="form" 
      :rules="rules"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol">
      <a-form-model-item
        label="更新标题"
        prop="title"
      >
        <a-input placeholder="请输入更新标题，最大长度25个字符" v-model="form.title" :maxLength="25"/>
      </a-form-model-item>
      
      <a-form-model-item
        label="更新项"
        prop="update_items"
      >
        <div class="form-item-block">
          <ul ref="updateItems" class="update-items">
            <li class="update-item" v-for="item in update_items" :key="item.id">
              <byf-icon class="drag-btn" type="iconsan"></byf-icon>
              <a-input placeholder="请输入更新项" v-model="item.text" />
            </li>
          </ul>
        </div>
        <div>
          <a-button type="link" @click="addUpdateItem">增加更新项</a-button>
          <a-button type="link" @click="delUpdateItem" v-if="update_items.length > 1">减少更新项</a-button>
        </div>
      </a-form-model-item>
      <a-form-model-item
        label="发布日期"
        prop="release_time"
      >
        <a-date-picker :defaultValue="defaultSendTime" @change="sendTimeChange" placeholder="请选择时间"/>
      </a-form-model-item>
      <a-form-model-item
        label="创建时间"
        v-if="form.created_at"
      >
        {{moment.unix(form.created_at).format("YYYY-MM-DD")}}
      </a-form-model-item>
      <a-form-model-item
        label="状态"
        prop="is_show"
      >
        <a-radio-group v-model="form.is_show">
          <a-radio :value="1"> 显示 </a-radio>
          <a-radio :value="0"> 隐藏 </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { cloneDeep } from 'lodash'
import Sortable from "sortablejs";
import moment from 'moment'
import { generateUUID } from '@/utils/util'
import { systemUpdateAddOrEdit } from '@/services/admin/core/systemUpdate/index'
const defaultForm = {
  title: "",
  update_items: [],
  release_time: "",
  is_show: 1,  // 1:正常；0：禁用
}
export default {
  props: {},
  data() {
    let updateItemsRule = (rule, value, callback) => {
      let flag = this.form.update_items.some((item) => {return item != ''});
      if(!flag){
        callback(new Error('请至少填写一项更新项'));
      }else{
        callback()
      }
    }
    return {
      moment,
      operationType: 'add',
      plainOptions: ["APP", "H5", "小程序"],
      showModal: false,
      disabled: false,
      confirmLoading: false,
      labelCol: {span: 2},
      wrapperCol: {span: 22},
      form: cloneDeep(defaultForm),
      // 表单校验规则
      rules: {
        title: [
          { required: true, message: "更新标题不能为空", trigger: "blur" },
        ],
        update_items: [
          { required: true, validator: updateItemsRule, trigger: "blur" },
        ],
        release_time: [
          { required: true, message: "发布日期不能为空", trigger: "change" },
        ],
      },
      sortable: null,
      defaultSendTime: '',
      update_items: [
        
      ]
    };
  },
  created() {
  },
  mounted(){},
  methods: {
    sendTimeChange(value){
      if(value){
        this.form.release_time = this.moment(value).unix()
      }else{
        this.form.release_time = '';
      }
    },
    initUpdateItem(){
      if(!this.form.id){
        this.update_items = [
          {id: generateUUID(), text: ''},
          {id: generateUUID(), text: ''}
        ]
      }
    },
    addUpdateItem(){
      this.update_items.push(
        {id: generateUUID(), text: ''}
      );
    },
    delUpdateItem(){
      this.update_items.pop();
    },
    initSortable(){
      this.sortable = new Sortable(this.$refs.updateItems, {
        animation: 150,
        handle: '.drag-btn',
        // 结束拖拽
        onEnd: (e) => {
          console.log(e)
          this.swapArray(this.update_items, e.oldIndex, e.newIndex)
          console.log(this.update_items)
        },
      })
    },
    swapArray(arr, index1, index2){
      // 交换数据的位置
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    },
    /**
     * 展示弹窗
     * @param [obj] 要编辑的用户数据，不传就是添加用户
     */
    showModalAction(data) {
      this.showModal = true;
      console.log(data)
      if (data) {
        this.operationType = "edit";
        this.form = JSON.parse(JSON.stringify(data));
        this.update_items = cloneDeep(this.form.update_items).map(item => {
          return {id: generateUUID(), text: item}
        })

        this.defaultSendTime = this.moment.unix(this.form.release_time)
      } else {
        this.operationType = "add";
        this.form = cloneDeep(defaultForm);
        this.defaultSendTime = ''
      }
      this.initUpdateItem()
      this.$nextTick(() =>{
        this.initSortable()
      })
    },
    modalCancel(){
      this.$refs.form.resetFields();
      this.showModal = false;
    },
    save(){
      this.form.update_items = this.update_items.map(item => {
        return item.text;
      })
      console.log(this.form.update_items)
      this.$refs.form.validate(valid => {
        if(valid){
          this.confirmLoading = true;
          systemUpdateAddOrEdit(this.form).then(res => {
            if(res.code == 200){
              this.showModal = false;
              this.$emit('saveSuccess', this.form.id ? this.form : '');
            }
          }).finally(() => {
            this.confirmLoading = false;
          })
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
ul,li{
  list-style: none;
  padding: 0;
  margin: 0;
}
.update-items{
  .update-item{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .drag-btn{
      margin-right: 15px;
      cursor: pointer;
    }
  }

}
.form-item-block{
  overflow: hidden;
  background: @background-color-light;
  padding: 0 20px;
  padding-top: 24px;
}
</style>