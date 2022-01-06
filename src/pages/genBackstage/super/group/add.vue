<template>
  <a-card>
    <a-spin :spinning="spinning">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="套餐名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入套餐名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea :autoSize="{minRows:2, maxRows: 5}" :maxLength="512" v-model="form.remark" placeholder="请输入备注(最多输入512个字符)"/>
        </a-form-model-item>
        <a-form-model-item label="附加应用" prop="addonsExtraList" :wrapper-col="{span: 16}">
          <a-button type="pramiry" @click="toggleChooseAppsShow">选择应用</a-button>
          <a-card size="small">
            <template slot="title">
              <span>附加应用/模块</span>
            </template>
            <a-select slot="extra" default-value="0" style="width: 120px;" :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}">
              <a-select-option value="0">通用应用</a-select-option>
            </a-select>
            <a-list class="currentApps beauty-scroll" item-layout="horizontal" :bordered="false" :data-source="form.addonsExtraList" :grid="{ gutter: 16, column: 6 }">
              <a-list-item slot="renderItem" slot-scope="item">
                <apps-item :itemData="item"></apps-item>
              </a-list-item>
            </a-list>
          </a-card>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio :value="1">开启</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{offset: 4}">
          <a-space>
            <a-button v-if="operationType == 'create'" type="primary" @click="onCreate">创建</a-button>
            <a-button v-else type="primary" @click="onEdit">修改</a-button>
            <a-button type="link" size="small" @click="$router.go(-1)">返回列表</a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
    <choose-apps ref="chooseApps" @ok="onChooseAppsOk"></choose-apps>
  </a-card>
</template>
<script>
import {getAdminPlatformGroupAdd, getAdminPlatformGroupEdit} from '@/services/adminPlatformGroup'
import {getAdminAddonsIndex} from '@/services/addons'

import AppsItem from '@/pages/genBackstage/common/AppsItem'
import ChooseApps from '@/pages/genBackstage/super/common/ChooseApps'
import cloneDeep from 'lodash/cloneDeep'

export default {
  components: {AppsItem, ChooseApps},
  data(){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      spinning: false,
      form: {
        name: '',
        remark: '',
        addonsExtraList: [],
        status: 1
      },
      rules: {
        name: [{ required: true, message: "套餐名称不能为空", trigger: "blur"}],
        addonsExtraList: [{ required: true, message: "请选择应用", trigger: "blur"}],
      },
      operationType: 'create', // 'create':创建模式
    }
  },
  created(){
    this.operationType = this.$route.query.operationType;
    if (this.operationType != 'create') {
      this.form = JSON.parse(this.$route.query.info)
      this.getAdminAddonsIndex(this.form.id)
    }
  },
  methods: {
    getAdminAddonsIndex(group_id){
      getAdminAddonsIndex({page_size:999, group_id: group_id}).then(res=>{
        if(res.code == 200) {
          this.$set(this.form, 'addonsExtraList', res.data.list)
        }
      })
    },
    /**
     * 切换显示
     */
    toggleChooseAppsShow(){
      this.$refs.chooseApps.show('choose', this.form.addonsExtraList)
    },
    /**
     * 修改 附加应用成功
     */
    onChooseAppsOk(list){
      this.form.addonsExtraList = list
      this.$refs.ruleForm.validateField('addonsExtraList')
    },
    
    /**
     * 保存并创建 平台
     */
    onCreate(){
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          this.spinning = true
          let params = cloneDeep(this.form)
          params.permission = Array.from(params.addonsExtraList,(item)=>{
            return item.aid
          })
          getAdminPlatformGroupAdd(params).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.$router.go(-1);
            }
          }).finally(()=>{
            this.spinning = false
          })
        }
      })
    },
    /**
     * 保存修改
     */
    onEdit(){
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          this.spinning = true
          let params = cloneDeep(this.form)
          params.permission = Array.from(params.addonsExtraList,(item)=>{
            return item.aid
          })
          getAdminPlatformGroupEdit(params).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg).then(() => {
                this.$router.go(-1)
              })
            }
          }).finally(()=>{
            this.spinning = false
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>

.currentApps{
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  height: 174px;
  li{
    width: 200px;
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
    .leftAvatar{
      float: left;
    }
    .rightDesc{
      float: left;
      padding-left: 10px;
      line-height: 26px;
      .name{
        margin-bottom: 10px;
        width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .typesIcon{
        font-size: 16px;
        margin-right: 5px;
        color: rgba(18, 150, 219, 1);
      }
    }
  }
}
</style>