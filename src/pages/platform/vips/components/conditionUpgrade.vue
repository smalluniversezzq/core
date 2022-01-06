 <!--条件升级-->
<template>
  <div class="conditionUpgrade">
    <!-- {{formData}} -->
    <a-form-model
      ref="form"
      :rules="rules"
      :model="formData"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        label="条件升级"
      >
        <a-radio-group :options="stateOptions" v-model="formData.status" @change="conditionchange">
        </a-radio-group>

      </a-form-model-item>

      <a-form-model-item
        v-show='formData.status==1'
        label="自购订单"
      >
       <div class='helps-reletive'>
          <byf-radio-tab :options="stateOptions" :hide="[1]" v-model="formData.info.self_purchase_order.status" @change="zgddchange">
            <div slot="toggle">
              <div class='bg toggle-box1 '>
              <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.info.self_purchase_order.info.time" @change="xzsjchange">
                  <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  label="统计类型" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.info.self_purchase_order.info.type" @change="tjlxchange">
                  <a-radio :value="item.value" v-for="(item,index) in StatisticalType" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item    prop="zgdd_num" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <template slot="label">
                  <span><span style='color:red ; lineHeight:19px'> * </span>输入数值</span>
                </template>
                <byf-input-number 
                width='300' 
                :min="0" 
                :precision="formData.info.self_purchase_order.info.type==1?2:0"
                v-model='formData.info.self_purchase_order.info.num_value'  
                placeholder="请输入数值" 
                :unit="formData.info.self_purchase_order.info.type==1?'元':'个'" 
                @change="()=>{}"></byf-input-number>
              </a-form-model-item>
              <a-form-model-item   prop="zgdd_content" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <template slot="label">
                  <span><span style='color:red ; lineHeight:19px'> * </span>APP展示内容</span>
                </template>
                <a-input 
                :maxLength="15"
                :style="{width:'calc(335px)'}" 
                :suffix="setSuffixFn(formData.info.self_purchase_order.info.display_content,15)"
                v-model="formData.info.self_purchase_order.info.display_content" 
                placeholder="请输入APP展示内容"
                >
                </a-input>
              </a-form-model-item>
              </div>
            </div>
          </byf-radio-tab>
        </div>
      </a-form-model-item>
      <a-form-model-item
      v-show='formData.status==1'
        label="个人收益"
      >
       <div class='helps-reletive'>
          <byf-radio-tab :options="stateOptions" :hide="[1]" v-model="formData.info.personal_income.status" @change="zgddchange">
            <div slot="toggle">
              <div class='bg toggle-box1 '>
              <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.info.personal_income.info.time" @change="xzsjchange">
                  <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  label="统计类型" :labelCol='{span:3}' :wrapperCol="{span: 18}">
              <a-radio-group v-model="formData.info.personal_income.info.type" @change="tjlxchange">
                <a-radio :value="item.value" v-for="(item,index) in shouyiType" :key="index">
                  {{item.label}}
                </a-radio>
              </a-radio-group>
              </a-form-model-item>
              <a-form-model-item   prop="grsy_num" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <template slot="label">
                  <span><span style='color:red ; lineHeight:19px'> * </span>输入数值</span>
                </template>
                <!-- :precision='2'  -->
                <byf-input-number width='300' :min="0" v-model='formData.info.personal_income.info.num_value'  placeholder="请输入数值" :unit="'元'"></byf-input-number>
              </a-form-model-item>
              <a-form-model-item  prop="grsy_content" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <template slot="label">
                  <span><span style='color:red ; lineHeight:19px'> * </span>APP展示内容</span>
                </template>
                <a-input  
                :style="{width:'calc(335px)'}" 
                :maxLength="15"
                :suffix="setSuffixFn(formData.info.personal_income.info.display_content,15)"
                v-model="formData.info.personal_income.info.display_content" 
                placeholder="请输入APP展示内容">
                </a-input>
              </a-form-model-item>
              </div>
            </div>
          </byf-radio-tab>
        </div>
      </a-form-model-item>
      <a-form-model-item
      v-show='formData.status==1'
        label="发展粉丝"
      >
       <div class='helps-reletive'>
          <byf-radio-tab :options="stateOptions" :hide="[1]" v-model="formData.info.fans.status" @change="zgddchange">
            <div slot="toggle">
              <div class='bg toggle-box1 bg-box mt' v-for="(item,index) in formData.info.fans.info" :key='index'>
                <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <a-radio-group v-model="item.time" @change="xzsjchange">
                    <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                      {{item.label}}
                    </a-radio>
                  </a-radio-group>
                </a-form-model-item>
                <a-form-model-item :prop="'fzfs_range'+index" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <template slot="label">
                    <span><span style='color:red ; lineHeight:19px'> * </span>粉丝范围</span>
                  </template>
                  <a-checkbox-group
                  v-model="item.fans_range"
                  @change="(e)=>{fansRangeChange(e,index)}">
                    <a-checkbox :value="1">
                      一代粉丝
                    </a-checkbox>
                    <a-checkbox :value="2">
                      二代粉丝
                    </a-checkbox>
                    <a-checkbox :value="3">
                      三代粉丝
                    </a-checkbox>
                    <a-checkbox :value="4" v-if='GradeType == 2'>
                      三代外粉丝（仅运营商可用）
                    </a-checkbox>
                  </a-checkbox-group>
                </a-form-model-item>
                <a-form-model-item   :prop="'fzfs_grade'+index" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <template slot="label">
                    <span><span style='color:red ; lineHeight:19px'> * </span>要求最低等级</span>
                  </template>
                  <a-select 
                    :getPopupContainer='triggerNode => triggerNode.parentNode'
                    v-model='item.fans_level' 
                    style="width:335px" 
                    @change="selectchange">
                    <a-select-option :value="item.key" v-for='(item,index) in gradeList' :key="index">
                      {{item.name}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-form-model-item   :prop="'fzfs_num'+index" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <template slot="label">
                    <span><span style='color:red ; lineHeight:19px'> * </span>输入人数</span>
                  </template>
                  <byf-input-number width='300' :min="0" v-model='item.people_number' :precision='0'  placeholder="请输入人数" :unit="'个'"></byf-input-number>
                </a-form-model-item>
                <a-form-model-item  label="有效粉丝" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <a-radio-group v-model="item.fans_type" @change="yxfschange">
                    <a-radio :value="item.value" v-for="(item,index) in fansOptions" :key="index">
                      {{item.label}}
                    </a-radio>
                  </a-radio-group>
                </a-form-model-item>
                  <a-form-model-item   :prop="'fzfs_content'+index" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <template slot="label">
                    <span><span style='color:red ; lineHeight:19px'> * </span>APP展示内容</span>
                  </template> 
                    <a-input  
                    :maxLength="15"
                    :style="{width:'calc(335px)'}" 
                    :suffix="setSuffixFn(item.display_content,15)"
                    v-model="item.display_content" 
                    placeholder="请输入APP展示内容">
                    </a-input>
                  </a-form-model-item>
                 <byf-icon v-if="formData.info.fans.info.length>1" class="close" type="iconclose" @click="deleteMe(index)" />
              </div>
              <a-button v-show='formData.info.fans.info.length<3' type='link' @click="addfans()">{{`+添加条件(${formData.info.fans.info.length}/3)`}}</a-button>
                <a-row>
                  <a-col>
                    <a-radio-group v-model="formData.info.fans.type" @change="yxfschange">
                      <a-radio :value="item.value" v-for="(item,index) in fansConditionOptions" :key="index">
                        {{item.label}}
                      </a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
            </div>
          </byf-radio-tab>
        </div>
      </a-form-model-item>
      <a-form-model-item
        v-show='formData.status==1'
        label="支线任务"
      >
       <div class='helps-reletive'>
          <byf-radio-tab :options="stateOptions" :hide="[1]" v-model="formData.info.side_quest.status" @change="zgddchange">
            <div slot="toggle">
              <div class='bg toggle-box1'>
              <a-form-model-item  label="限制时间" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.info.side_quest.info.time" @change="xzsjchange">
                  <a-radio :value="item.value" v-for="(item,index) in timeOptions" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item  prop="zxrw_num" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <template slot="label">
                  <span><span style='color:red ; lineHeight:19px'> * </span>要求支线数</span>
                </template>
                <byf-input-number width='300' v-model='formData.info.side_quest.info.branch_line_number' :precision='0'  placeholder="请输入要求支线数" :unit="'个'"></byf-input-number>

              </a-form-model-item>
              <a-form-model-item   prop="zxrw_nums" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <template slot="label">
                  <span><span style='color:red ; lineHeight:19px'> * </span>每支线人数</span>
                </template>
                <byf-input-number width='300' :min="0" v-model='formData.info.side_quest.info.branch_people_number' :precision='0'  placeholder="请输入支线人数" :unit="'个'"></byf-input-number>
              </a-form-model-item>
              <a-form-model-item  label="要求最低等级" prop="zxrw_grade"  :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <template slot="label">
                  <span><span style='color:red ; lineHeight:19px'> * </span>要求最低等级</span>
                </template>
                <a-select 
                :getPopupContainer='triggerNode => triggerNode.parentNode'
                v-model='formData.info.side_quest.info.fans_level' 
                style="width:335px" 
                @change="selectchange">
                  <a-select-option :value="item.key" v-for='(item,index) in gradeList' :key="index">
                    {{item.name}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item  label="有效粉丝" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                <a-radio-group v-model="formData.info.side_quest.info.fans_type" @change="yxfschange">
                  <a-radio :value="item.value" v-for="(item,index) in fansOptions" :key="index">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
                <a-form-model-item   prop="zxrw_content" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <template slot="label">
                    <span><span style='color:red ; lineHeight:19px'> * </span>APP展示内容</span>
                  </template>
                  <a-input  
                  :maxLength="15"
                  :style="{width:'calc(335px)'}" 
                  :suffix="setSuffixFn(formData.info.side_quest.info.display_content,15)"
                  v-model="formData.info.side_quest.info.display_content" 
                  placeholder="请输入APP展示内容">
                  </a-input>
                </a-form-model-item>
              </div>
            </div>
          </byf-radio-tab>
        </div>
        <a-radio-group v-model="formData.condition_type" @change="yxfschange" style='margin-left:-70px'>
          <a-radio :value="item.value" v-for="(item,index) in conditionOptions"  :key="index">
            {{item.label}}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="升级说明"
        v-show='formData.status==1'
      >
      <div class='helps-reletive'>
        <a-input :style='{width:"calc(80%)"}' type='textarea' 
        v-model="formData.info.upgrade_explain" :auto-size="{ minRows: 3, maxRows: 5 }" :maxLength='30'>
        </a-input>
        <a-row class='suffix-flex' :style='{width:"calc(80%)"}'>
          <a-col class='tar'>
           {{setSuffixFn(formData.info.upgrade_explain,30)}}
          </a-col>
        </a-row>
        <div class='icon-help'>
        <a-popover placement="rightTop" title="示例">
           <template slot="content">
             <div style='width:250px'>
               <img style="width:100%" :src="helptiaojian" alt="">
             </div>
          </template>
           <byf-icon type="iconhelp" style='widht:20px' :size='30'></byf-icon><span class='ml-sm cursor-pointer'>示例</span>
        </a-popover>
        </div>
      </div>
      </a-form-model-item>
      <a-row class='mt '>
        <a-col class='footer-btn '>
          <a-row>
            <a-col offset="2">
              <a-button type='primary' :loading='submitLoading' @click='submit()'>保存</a-button>
              <a-button class="ml" @click="goBack()">返回列表</a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>
<script>
import { AdminUserUserlevelSetCondition } from '@/services/platform/vips.js'
// import { cloneDeep } from 'lodash'
import ByfRadioTab from '@/components/byf/radio/ByfRadioTab'
import ByfInputNumber from '@/components/byf/input/ByfInputNumber'
//  src\assets\img\ConditionUpgrades

export default {
  name:"basicInfo",
  components:{
    ByfRadioTab,
    ByfInputNumber,
  },
  props:{
    conditionUpgradeformData:{
      type:Object
    },
    gradeList:{
      type:Array
    },
    GradeType:{
      type:[String,Number]
    }
  },
  data(){
    let zgdd_num = (rule, value, callback) => {
      let val = this.formData.info.self_purchase_order.info.num_value
      if(this.formData.status == 0){
        callback();
      }else if(!val && this.formData.info.self_purchase_order.status == 1) {
        return callback(new Error('输入数值'));
      }else{
        callback();
      }
    };
    let zgdd_content = (rule, value, callback) => {
      console.log(value,'value')
      let val = this.formData.info.self_purchase_order.info.display_content
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.status==1 && this.formData.info.self_purchase_order.status == 1) {
        return callback(new Error('APP展示内容'));
      }else{
        callback();
      }
    };
      let grsy_num = (rule, value, callback) => {
      console.log(value,'value')
      let val = this.formData.info.personal_income.info.num_value
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.personal_income.status == 1) {
        return callback(new Error('请输入数值'));
      }else{
        callback();
      }
    };
    let grsy_content = (rule, value, callback) => {
      console.log(value,'value')
      
      let val = this.formData.info.personal_income.info.display_content
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.personal_income.status == 1) {
        return callback(new Error('请输入APP展示内容'));
      }else{
        callback();
      }
    };
    let fzfs_num0 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[0].people_number
      if(this.formData.status == 0){
        callback();
      }else if (!val  && this.formData.info.fans.status == 1) {
        return callback(new Error('请输入人数'));
      }else{
        callback();
      }
    };
    let fzfs_content0 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[0].display_content
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1) {
        return callback(new Error('请输入APP展示内容'));
      }else{
        callback();
      }
    };
    let fzfs_range0 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[0].fans_range
      console.log(val)
      if(this.formData.status == 0){
        callback();
      }else if (val.length<1 && this.formData.info.fans.status == 1) {
        return callback(new Error('请选择粉丝范围'));
      }else{
        callback();
      }
    };
    let fzfs_grade0 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[0].fans_level
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1 ) {
        return callback(new Error('请选择要求最低等级'));
      }else{
        callback();
      }
    };
    
    let fzfs_num1 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[1].people_number
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1) {
        return callback(new Error('请输入人数'));
      }else{
        callback();
      }
    };
    let fzfs_content1 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[1].display_content
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1) {
        return callback(new Error('请输入APP展示内容'));
      }else{
        callback();
      }
    };
    let fzfs_range1 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[1].fans_range
      console.log(val)
      if(this.formData.status == 0){
        callback();
      }else if (val.length<1 && this.formData.info.fans.status == 1) {
        return callback(new Error('请选择粉丝范围'));
      }else{
        callback();
      }
    };
    let fzfs_grade1 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[1].fans_level
      console.log(val)
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1) {
        return callback(new Error('请选择要求最低等级'));
      }else{
        callback();
      }
    };
    // 
    let fzfs_num2 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[2].people_number
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1) {
        return callback(new Error('请输入人数'));
      }else{
        callback();
      }
    };
    let fzfs_content2 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[2].display_content
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1) {
        return callback(new Error('请输入APP展示内容'));
      }else{
        callback();
      }
    };
    let fzfs_range2 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[2].fans_range
      if(this.formData.status == 0){
        callback();
      }else
      if (val.length<1 && this.formData.info.fans.status == 1) {
        return callback(new Error('请选择粉丝范围'));
      }else{
        callback();
      }
    };
    let fzfs_grade2 = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.fans.info[2].fans_level
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.fans.status == 1) {
        return callback(new Error('请选择要求最低等级'));
      }else{
        callback();
      }
    };

    let zxrw_num = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.side_quest.info.branch_line_number
      console.log(val)
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.side_quest.status == 1 ) {
        return callback(new Error('请输入要求支线数'));
      }else{
        callback();
      }
    };

    let zxrw_nums = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.side_quest.info.branch_people_number
      console.log(val)
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.side_quest.status == 1 ) {
        return callback(new Error('请输入每支线人数'));
      }else{
        callback();
      }
    };
    let zxrw_content = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.side_quest.info.display_content
      console.log(val)
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.side_quest.status == 1 ) {
        return callback(new Error('请输入APP展示内容'));
      }else{
        callback();
      }
    };
    let zxrw_grade = (rule, value, callback) => {
      console.log(value,'people_number' , )
      let val = this.formData.info.side_quest.info.fans_level
      console.log(val)
      if(this.formData.status == 0){
        callback();
      }else if (!val && this.formData.info.side_quest.status == 1 ) {
        return callback(new Error('请选择要求最低等级'));
      }else{
        callback();
      }
    };


    return {
      rules:{
        //自购订单
        zgdd_num:[{ validator: zgdd_num, trigger: 'change' }],
        zgdd_content: [{ validator: zgdd_content,  trigger: 'change' }],
        // //个人收益
        grsy_num: [{ validator: grsy_num,  trigger: 'change' }],
        grsy_content: [{ validator: grsy_content, message: '请输入APP展示内容', trigger: 'change' }],
        // // //发展粉丝
        fzfs_num0: [{ validator: fzfs_num0, message: '请输入人数', trigger: 'change' }],
        fzfs_content0: [{ validator: fzfs_content0, message: '请输入APP展示内容', trigger: 'change' }],
        fzfs_range0: [{ validator: fzfs_range0, message: '请选择粉丝范围', trigger: 'change' }],
        fzfs_grade0: [{ validator: fzfs_grade0, message: '请选择要求最低等级', trigger: 'change' }],

        fzfs_num1: [{ validator: fzfs_num1, message: '请输入人数', trigger: 'change' }],
        fzfs_content1: [{ validator: fzfs_content1, message: '请输入APP展示内容', trigger: 'change' }],
        fzfs_range1: [{ validator: fzfs_range1, message: '请选择粉丝范围', trigger: 'change' }],
        fzfs_grade1: [{ validator: fzfs_grade1, message: '请选择要求最低等级', trigger: 'change' }],

        fzfs_num2: [{ validator: fzfs_num2, message: '请输入人数', trigger: 'change' }],
        fzfs_content2: [{ validator: fzfs_content2, message: '请输入APP展示内容', trigger: 'change' }],
        fzfs_range2: [{ validator: fzfs_range2, message: '请选择粉丝范围', trigger: 'change' }],
        fzfs_grade2: [{ validator: fzfs_grade2, message: '请选择要求最低等级', trigger: 'change' }],
        // //支线任务
        zxrw_num:[{ validator: zxrw_num, zxrw_num: '请输入要求支线数', trigger: 'change' }],
        zxrw_nums:[{ validator: zxrw_nums, message: '请输入每支线人数', trigger: 'change' }],
        zxrw_content:[{ validator: zxrw_content, message: '请输入APP展示内容', trigger: 'change' }],
        zxrw_grade:[{ validator: zxrw_grade, message: '请选择要求最低等级', trigger: 'change' }],

      },
      helptiaojian:require('@/assets/img/ConditionUpgrade/helptiaojian.png'),
      submitLoading:false,
      formData:this.conditionUpgradeformData,
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      stateOptions:[
        {label:"开启",value:1},
        {label:"关闭",value:0},
      ],
      timeOptions:[
        {label:"不限时间",value:1},
        {label:"近30天",value:2},
        {label:"近60天",value:3},
        {label:"近90天",value:4},
        {label:"近180天",value:5},
      ],
      StatisticalType:[
        {label:"订单金额",value:1},
        {label:"订单数量",value:2},
      ],
      shouyiType:[
        {label:"预估收益",value:1},
        {label:"结算收益",value:2},
      ],
      fansOptions:[
        {label:"统计所有粉丝",value:1},
        {label:"仅统计有效粉丝",value:2},
      ],
      fansConditionOptions:[
        {label:"同时满足发展粉丝条件",value:1},
        {label:"任意满足发展粉丝条件",value:2},
      ],
      conditionOptions:[
        {label:"以上条件须同时满足",value:1},
        {label:"以上条件可任意满足",value:2},
      ],
    }
  },
  created(){
  },
  mounted(){
  },
  methods:{
    conditionchange(e){
      console.log(e.target.value)
    },
    zgddchange(e){
      console.log(e)
    },
    xzsjchange(e){
      console.log(e)
    },
    tjlxchange(e){
      console.log(e)
    },
    selectchange(e){
      console.log(e)
    },
    setSuffixFn(value,num){
      // console.log(value)
      if(value){
        return `${value.length}/${num}`
      }else{
        return `0/${num}`
      } 
    },
    yxfschange(e){
      console.log(e)
    },
    fansRangeChange(e,index){
      console.log(e,index)
    },
    deleteMe(index){
      console.log(index)
      this.formData.info.fans.info.splice(index,1)
    },
    addfans(){
      let fansObj = {
        time:1,  // 限制时间 1/不限时间  2/近30天 3/近60天  4近180天
        // branch_line_number:"", //支线数
        people_number:"",  // 输入人数 字符串类型
        fans_range:[1], //粉丝范围
        fans_level:"", // 要求最低等级  
        fans_type:1, // 有效粉丝 1 统计所有粉丝 2 仅统计有效粉丝
        display_content:"",  // APP展示内容 字符串类型
      }
      if(this.formData.info.fans.info.length < 3){
        this.formData.info.fans.info.push(fansObj)
      }
    },
    // 保存
    submit(){
      let _this = this
    
      _this.$refs.form.validate(valid => {
        console.log(valid)
        if (valid) {
          console.log(valid)
          if(_this.formData.status == 1 && this.formData.info.self_purchase_order.status == 0 && this.formData.info.personal_income.status == 0 && this.formData.info.fans.status == 0 && this.formData.info.side_quest.status == 0){
            console.log('不允许保存')
            this.$message.error('条件升级开启状态下，升级条件至少开启一项')
          }else{
            _this.$confirm({
              title: '保存',
              content: "确认保存吗",
              okText:"确认",
              cancelText:"取消",
              onOk() {
                console.log(_this.formData)
                AdminUserUserlevelSetCondition(_this.formData).then(res=>{
                  if(res.code === 200){
                  _this.$message.success(res.msg)
                  _this.goBack()
                  }
                })
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    goBack(){
      this.$router.push({name:'GradeList'})
    }
  },
}
</script>
<style scoped lang="less" >

  .helps-reletive{
    position: relative;
  }
  .toggle-box1{
    padding:20px 20px 20px 0px;
  }
  .icon-help{
    width: 100px;
    position: absolute;
    top: -10px;
    right: 20px;
  }
  .footer-btn{
    width: 100%;
    z-index: 999;
    -webkit-box-shadow: 0 -1px 2px rgba(0,0,0,.15);
    box-shadow: 0 -1px 2px rgba(0,0,0,.15);
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 12px 0;
    position: fixed;
    bottom: 0;
    margin-left: -25px;
    min-width: 1200px;
  }
  .bg-box{
    position: relative;
    &:hover {
      .close {
        display: block;
      }
    }
  }
  .close{
    position: absolute;
    top: -11px;
    right: -10px;
    font-size: 20px;
    cursor: pointer;
    color: #b8b9bd;
    display: block;
    z-index: 10;
  }
  .close {
    display: block;
    &:hover {
      color: rgba(0, 0, 0, 0.7);
    }
  }
  .suffix-flex{
    position: absolute;
    bottom: 0;
    right: calc(21%);
    
  }
</style>