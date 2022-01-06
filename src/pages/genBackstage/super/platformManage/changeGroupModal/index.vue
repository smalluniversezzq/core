<template>
  <a-modal :maskClosable="false" :visible="visible" title="修改应用套餐组" @cancel="onCancel" @ok="onOk" okText="保存">
    <a-space>
      <label>选择套餐：</label>
      <a-select placeholder="请选择套餐" :value="group.id" style="width:200px;" @change="onGroupSelectChange" 
        :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
      >
        <a-select-option v-for="(item) in platformGroup" :key="item.id" :value="item.id" :groupName="item.name" >{{item.name}}</a-select-option>
      </a-select>
    </a-space>
  </a-modal>
</template>

<script>
import {getAdminPlatformGroupIndex} from '@/services/adminPlatformGroup'
import {getAdminAddonsGroupEdit} from '@/services/addons'

export default {
  props: {
    visible: {
      type: Boolean
    }, 
    'groupName':{
      type: String
    },
    groupId: {
      type: [Number, String]
    },
    pmid: {
      type: [Number, String]
    }
  },
  data(){
    return {
      platformGroup: [],
      confirmLoading: false,
      group: {
        id: this.groupId,
        name: this.groupName
      }
    }
  },
  created(){
    this.getAdminPlatformGroupIndex();
  },
  methods: {
    /**
     * 获取套餐组列表
     */
    getAdminPlatformGroupIndex(){
      getAdminPlatformGroupIndex({page_size: 999, status: 1}).then(res=>{
        if (res.code == 200) {
          this.platformGroup = res.data.list
        }
      })
    },
    onCancel(){
      this.$emit('cancel')
    },
    onOk(){
      if (this.group.id && this.group.id != this.groupId) {
        // 请求修改平台套餐组接口
        getAdminAddonsGroupEdit({pmid: this.pmid, group_id: this.group.id}).then(res=>{
          if (res.code == 200) {
            // 当修改成功
            this.$message.success(res.msg)
            this.$emit('ok', {id: this.group.id, name: this.group.name})
          }
        })
      } else {
        this.onCancel();
      }
    },
    /**
     * select组件 切换事件
     */
    onGroupSelectChange(value, option){
      this.group.id = value
      this.group.name = option.data.attrs.groupName
    }
  }
}
</script>

<style>

</style>