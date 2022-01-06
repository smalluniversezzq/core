<template>
  <div>
    <a-card>
      <a-spin style="width: 100%" :spinning="spinning">
        <a-form-model
          v-if="!spinning"
          ref="form"
          :model="formData"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <div class="head-title mb">
            基本配置
          </div>
          <a-form-model-item label="积分名称" prop="name">
            <a-input :maxLength="3" v-model="formData.name" placeholder="请输入积分名称" >
              <span slot="suffix">
                {{formData.name.length}}/3
              </span>
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="积分图标" prop="icon" help="说明：建议上传50*50像素，JPG、PNG格式的图片">
            <a-radio-group v-model="formData.icon_type" @change="iconTypeChange">
              <ul class="logo-list">
                <li>
                  <a-avatar class="default-logo" shape="square" :size="100" :src="defaultIntegral" />
                  <a-radio class="radio-item" value="0"> 默认	</a-radio>
                </li>
                <li>
                  <byf-upload-btn :imgsList="[selectedIcon]" @change="customIconChange"></byf-upload-btn>
                  <a-radio class="radio-item" value="1"> 自定义 </a-radio>
                </li>
              </ul>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="积分时效" prop="prescription">
            <a-radio-group v-model="formData.prescription">
              <a-radio value="1"> 长期有效	</a-radio>
              <a-radio value="2"> 年末清零 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="积分说明" prop="explain">
            <a-textarea :rows="4" v-model="formData.explain" placeholder="请输入积分说明" />
          </a-form-model-item>

          <div class="head-title mb">
            商城积分抵现
          </div>
          <a-form-model-item label="积分抵现" prop="status">
            <a-radio-group v-model="formData.integral_shop_cash.status">
              <a-radio value="1"> 开启	</a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
            <div class="sub-form-item" v-if="formData.integral_shop_cash.status == '1'">
              <a-form-model-item label="抵扣比例" ref="integral_shop_cash_integral_money" prop="integral_shop_cash_integral_money" :label-col="{span: 4, xxl: {span: 3}}" :wrapper-col="{ span: 20 }">
                <ul class="input-number-list">
                  <li>
                    <a-input type="number" 
                    @blur="() => {$refs.integral_shop_cash_integral_money.onFieldBlur()}"
                    v-model="formData.integral_shop_cash.integral">
                      <span slot="addonAfter">
                        积分
                      </span>
                    </a-input>
                  </li>
                  <li class="action-text">
                    抵扣
                  </li>
                  <li>
                    <a-input type="number" 
                    @blur="() => {$refs.integral_shop_cash_integral_money.onFieldBlur()}"
                    v-model="formData.integral_shop_cash.money">
                      <span slot="addonAfter">
                        元
                      </span>
                    </a-input>
                  </li>
                </ul>
              </a-form-model-item>
              <a-form-model-item class="mb" label="商家可设最高" ref="integral_shop_cash_max" prop="integral_shop_cash_max" :label-col="{span: 4, xxl: {span: 3}}" :wrapper-col="{ span: 17 }" help="允许商家设置的最高商品金额抵扣比例/金额">
                <div>
                  <a-input-group compact>
                    <a-select v-model="formData.integral_shop_cash.max_type">
                      <a-select-option value="1">
                        按比例
                      </a-select-option>
                      <a-select-option value="2">
                        按金额
                      </a-select-option>
                    </a-select>
                    <a-input type="number" style="width: 50%" 
                    @blur="() => {$refs.integral_shop_cash_max.onFieldBlur()}"
                    v-model="formData.integral_shop_cash.max">
                      <span slot="suffix">
                        {{formData.integral_shop_cash.max_type == '1' ? '%' : '元'}}
                      </span>
                    </a-input>
                  </a-input-group>
                </div>
              </a-form-model-item>
              <a-form-model-item label="商家可设最低" ref="integral_shop_cash_min" prop="integral_shop_cash_min" :label-col="{span: 4, xxl: {span: 3}}" :wrapper-col="{ span: 17 }" help="允许商家设置的最低商品金额抵扣比例/金额">
                <div>
                  <a-input-group compact>
                    <a-select v-model="formData.integral_shop_cash.min_type">
                      <a-select-option value="1">
                        按比例
                      </a-select-option>
                      <a-select-option value="2">
                        按金额
                      </a-select-option>
                    </a-select>
                    <a-input type="number" style="width: 50%" 
                    @blur="() => {$refs.integral_shop_cash_min.onFieldBlur()}"
                    v-model="formData.integral_shop_cash.min">
                      <span slot="suffix">
                        {{formData.integral_shop_cash.min_type == '1' ? '%' : '元'}}
                      </span>
                    </a-input>
                  </a-input-group>
                </div>
              </a-form-model-item>
            </div>
          </a-form-model-item>
          
          <div class="head-title mb">
            常规积分奖励
          </div>
          <a-form-model-item label="注册成为会员">
            <a-radio-group v-model="formData.integral_register_user.status">
              <a-radio value="1"> 开启	</a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
            <div class="sub-form-item" v-if="formData.integral_register_user.status == '1'">
              <a-form-model-item label="奖励数量" prop="integral_register_user_number" :label-col="{span: 3, xxl:{span: 2}}" :wrapper-col="{ span: 17 }">
                <a-input type="number" 
                v-model="formData.integral_register_user.number">
                  <span slot="addonAfter">
                    积分
                  </span>
                </a-input> 
              </a-form-model-item>
              <a-form-model-item label="奖励提示" :label-col="{span: 3, xxl:{span: 2}}" :wrapper-col="{ span: 17 }">
                <a-radio-group v-model="formData.integral_register_user.reward_tips">
                  <a-radio value="1"> 开启	</a-radio>
                  <a-radio value="0"> 关闭 </a-radio>
                </a-radio-group>
                <span slot="help">
                  说明：用户注册成功首次登录时的积分奖励
                  <help class="ml"></help>
                </span>
              </a-form-model-item>
            </div>
          </a-form-model-item>

          <a-form-model-item label="邀请好友注册">
            <a-radio-group v-model="formData.integral_invite.status">
              <a-radio value="1"> 开启	</a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
            <div class="sub-form-item" v-if="formData.integral_invite.status == '1'">
              <a-form-model-item class="mb" label="奖励数量" prop="integral_invite_number" :label-col="{span: 3, xxl:{span: 2}}" :wrapper-col="{ span: 17 }" help="说明：每邀请一位好友注册成功的积分奖励数量">
                <a-input type="number" v-model="formData.integral_invite.number">
                  <span slot="addonAfter">
                    积分
                  </span>
                </a-input> 
              </a-form-model-item>
               <a-form-model-item label="每日上限" prop="integral_invite_max" :label-col="{span: 3, xxl:{span: 2}}" :wrapper-col="{ span: 17 }" help="说明：每日奖励的次数上限">
                <a-input type="number" v-model="formData.integral_invite.max">
                  <span slot="addonAfter">
                    次
                  </span>
                </a-input> 
              </a-form-model-item>
            </div>
          </a-form-model-item>
          <a-form-model-item label="订单确认收货">
            <a-radio-group v-model="formData.integral_order_received.status">
              <a-radio value="1"> 开启	</a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
            <div class="sub-form-item" v-if="formData.integral_order_received.status == '1'">
              <a-form-model-item label="奖励比例" ref="integral_order_received_money_integral" prop="integral_order_received_money_integral" :label-col="{span: 3, xxl:{span:2}}" :wrapper-col="{ span: 20 }">
                <ul class="input-number-list">
                  <li>
                    <a-input type="number" 
                    @blur="() => {$refs.integral_order_received_money_integral.onFieldBlur()}"
                    v-model="formData.integral_order_received.money" >
                      <span slot="addonAfter">
                        元
                      </span>
                    </a-input>
                  </li>
                  <li class="action-text">
                    奖励
                  </li>
                  <li>
                    <a-input type="number" 
                    @blur="() => {$refs.integral_order_received_money_integral.onFieldBlur()}"
                    v-model="formData.integral_order_received.integral" >
                      <span slot="addonAfter">
                        积分
                      </span>
                    </a-input>
                  </li>
                </ul>
              </a-form-model-item>
              <a-form-model-item class="mb" label="每笔最低" prop="integral_order_received_min" :label-col="{span: 3, xxl:{span:2}}" :wrapper-col="{ span: 17 }" help="说明：应奖励的积分低于此数量时，奖励此积分数量">
                <a-input type="number" v-model="formData.integral_order_received.min">
                  <span slot="addonAfter">
                    积分
                  </span>
                </a-input> 
              </a-form-model-item>
              <a-form-model-item label="奖励提示" :label-col="{span: 3, xxl:{span:2}}" :wrapper-col="{ span: 17 }">
                <a-radio-group v-model="formData.integral_order_received.reward_tips">
                  <a-radio value="1"> 开启	</a-radio>
                  <a-radio value="0"> 关闭 </a-radio>
                </a-radio-group>
                <span slot="help">
                  说明：用户确认收货成功时的积分奖励弹窗提示
                  <help class="ml"></help>
                </span>
              </a-form-model-item>
            </div>
          </a-form-model-item>
          <a-form-model-item label="商品评价">
            <a-radio-group v-model="formData.integral_goods_appraise.status">
              <a-radio value="1"> 开启	</a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
            <div class="sub-form-item" v-if="formData.integral_goods_appraise.status == '1'">
              <a-form-model-item class="mb" label="仅打星" prop="integral_goods_appraise_star" :label-col="{span: 3}" :wrapper-col="{ span: 17 }" help="说明：用户仅打星评价时奖励的积分数量">
                <a-input type="number" v-model="formData.integral_goods_appraise.star">
                  <span slot="addonAfter"> 积分 </span>
                </a-input> 
              </a-form-model-item>
              <a-form-model-item class="mb" label="打星+文字" prop="integral_goods_appraise_star_words" :label-col="{span: 3}" :wrapper-col="{ span: 17 }" help="说明：用户打星+文字评价时奖励的积分数量">
                <a-input type="number" v-model="formData.integral_goods_appraise.star_words">
                  <span slot="addonAfter"> 积分 </span>
                </a-input> 
              </a-form-model-item>
              <a-form-model-item class="mb" label="打星+图文" prop="integral_goods_appraise_star_picture" :label-col="{span: 3}" :wrapper-col="{ span: 17 }" help="说明：用户打星+图文评价时奖励的积分数量">
                <a-input type="number" v-model="formData.integral_goods_appraise.star_picture">
                  <span slot="addonAfter"> 积分 </span>
                </a-input> 
              </a-form-model-item>

              <a-form-model-item label="评价中心提示" :label-col="{span: 3}" :wrapper-col="{ span: 17 }">
                <a-radio-group v-model="formData.integral_goods_appraise.assess_tips">
                  <a-radio value="1"> 开启	</a-radio>
                  <a-radio value="0"> 关闭 </a-radio>
                </a-radio-group>
                <span slot="help">
                  说明：APP评价中心页面评价按钮显示奖励积分数量
                  <help class="ml"></help>
                </span>
              </a-form-model-item>
              <a-form-model-item label="奖励提示" :label-col="{span: 3}" :wrapper-col="{ span: 17 }">
                <a-radio-group v-model="formData.integral_goods_appraise.reward_tips">
                  <a-radio value="1"> 开启	</a-radio>
                  <a-radio value="0"> 关闭 </a-radio>
                </a-radio-group>
                <span slot="help">
                  说明：用户评价商品成功时的积分奖励弹窗提示
                  <help class="ml"></help>
                </span>
              </a-form-model-item>
            </div>
          </a-form-model-item>
          <a-form-model-item label="余额充值">
            <a-radio-group v-model="formData.integral_recharge.status">
              <a-radio value="1"> 开启	</a-radio>
              <a-radio value="0"> 关闭 </a-radio>
            </a-radio-group>
            <div class="sub-form-item" v-if="formData.integral_recharge.status == '1'">
              <a-form-model-item label="奖励比例" ref="integral_recharge_money_integral" prop="integral_recharge_money_integral" :label-col="{span: 3}" :wrapper-col="{ span: 20 }">
                <ul class="input-number-list">
                  <li>
                    <a-input type="number" 
                    @blur="() => {$refs.integral_recharge_money_integral.onFieldBlur()}"
                    v-model="formData.integral_recharge.money" >
                      <span slot="addonAfter">
                        元
                      </span>
                    </a-input>
                  </li>
                  <li class="action-text">
                    奖励
                  </li>
                  <li>
                    <a-input type="number" 
                    @blur="() => {$refs.integral_recharge_money_integral.onFieldBlur()}"
                    v-model="formData.integral_recharge.integral" >
                      <span slot="addonAfter">
                        积分
                      </span>
                    </a-input>
                  </li>
                </ul>
              </a-form-model-item>
              <a-form-model-item label="奖励提示" :label-col="{span: 3}" :wrapper-col="{ span: 17 }">
                <a-radio-group v-model="formData.integral_recharge.reward_tips">
                  <a-radio value="1"> 开启	</a-radio>
                  <a-radio value="0"> 关闭 </a-radio>
                </a-radio-group>
                <span slot="help">
                  说明：用户余额充值成功时的积分奖励弹窗提示
                  <help class="ml"></help>
                </span>
              </a-form-model-item>
            </div>
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
            <a-button type="primary" @click="save" :loading="saveLoading">保存</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-spin>


    </a-card>
  </div>
</template>

<script>
import { 
  getAdminPlatformIntegralGetSite, 
  adminPlatformInteGralSite
} from '@/services/admin/platform/integral'
import help from '@/pages/platform/common/help.vue'
export default {
  components: {
    help
  },
  data(){
    let integral_shop_cash_integral_money = (rule, value, callback) => {
      if(this.formData.integral_shop_cash.status == '1'){
        if(this.formData.integral_shop_cash.integral == '' 
        || (this.formData.integral_shop_cash.integral * 1 <= 0)
        || this.formData.integral_shop_cash.money == ''
        || (this.formData.integral_shop_cash.money * 1 <= 0)){
          callback(new Error('抵扣比例/抵扣金额不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_shop_cash_max = (rule, value, callback) => {
      if(this.formData.integral_shop_cash.status == '1'){
        if(this.formData.integral_shop_cash.max == '' || (this.formData.integral_shop_cash.max * 1 <= 0)){
          callback(new Error('商家可设最高金额不能为空，且值必须大于0'))
        }else{
          callback();
        }
      }else{
        callback();
      }
    };
    let integral_shop_cash_min = (rule, value, callback) => {
      if(this.formData.integral_shop_cash.status == '1'){
        if(this.formData.integral_shop_cash.min == '' || (this.formData.integral_shop_cash.min * 1 <= 0)){
          callback(new Error('商家可设最低金额不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_register_user_number = (rule, value, callback) => {
      if(this.formData.integral_register_user.status == '1'){
        if(this.formData.integral_register_user.number == '' || (this.formData.integral_register_user.number * 1 <= 0)){
          callback(new Error('奖励数量不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_invite_number = (rule, value, callback) => {
      if(this.formData.integral_invite.status == '1'){
        if(this.formData.integral_invite.number == '' || (this.formData.integral_invite.number * 1 <= 0)){
          callback(new Error('奖励数量不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_invite_max = (rule, value, callback) => {
      if(this.formData.integral_invite.status == '1'){
        if(this.formData.integral_invite.max == '' || (this.formData.integral_invite.max * 1 <= 0)){
          callback(new Error('每日上限不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_order_received_money_integral = (rule, value, callback) => {
      if(this.formData.integral_order_received.status == '1'){
        if(this.formData.integral_order_received.integral == '' 
        || (this.formData.integral_order_received.integral * 1 <= 0)
        || this.formData.integral_order_received.money == ''
        || (this.formData.integral_order_received.money * 1 <= 0)){
          callback(new Error('奖励比例/奖励金额不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_order_received_min = (rule, value, callback) => {
      if(this.formData.integral_order_received.status == '1'){
        if(this.formData.integral_order_received.star == '' || (this.formData.integral_order_received.star * 1 <= 0)){
          callback(new Error('每笔最低奖励不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_goods_appraise_star = (rule, value, callback) => {
      if(this.formData.integral_goods_appraise.status == '1'){
        if(this.formData.integral_goods_appraise.star == '' || (this.formData.integral_goods_appraise.star * 1 <= 0)){
          callback(new Error('奖励数量不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_goods_appraise_star_words = (rule, value, callback) => {
      if(this.formData.integral_goods_appraise.status == '1'){
        if(this.formData.integral_goods_appraise.star_words == '' || (this.formData.integral_goods_appraise.star_words * 1 <= 0)){
          callback(new Error('奖励数量不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_goods_appraise_star_picture = (rule, value, callback) => {
      if(this.formData.integral_goods_appraise.status == '1'){
        if(this.formData.integral_goods_appraise.star_picture == '' || (this.formData.integral_goods_appraise.star_picture * 1 <= 0)){
          callback(new Error('奖励数量不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    let integral_recharge_money_integral = (rule, value, callback) => {
      if(this.formData.integral_recharge.status == '1'){
        if(this.formData.integral_recharge.integral == '' 
        || (this.formData.integral_recharge.integral * 1 <= 0)
        || this.formData.integral_recharge.money == ''
        || (this.formData.integral_recharge.money * 1 <= 0)){
          callback(new Error('奖励比例/奖励金额不能为空，且值必须大于0'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    };
    
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 17 },
      spinning: false,
      formData: {
      },
      rules: {
        name: [ { required: true, message: "积分名称不能为空", trigger: "blur" } ],
        icon: [{ required: true, message: "自定义积分图标不能为空", trigger: "blur" }],
        integral_shop_cash_integral_money: [{ required: true, validator: integral_shop_cash_integral_money, trigger: 'blur' }],
        integral_shop_cash_max: [{ required: true, validator: integral_shop_cash_max, trigger: 'blur' }],
        integral_shop_cash_min: [{ required: true, validator: integral_shop_cash_min, trigger: 'blur' }],
        integral_register_user_number: [{ required: true, validator: integral_register_user_number, trigger: 'blur' }],
        integral_invite_number: [{ required: true, validator: integral_invite_number, trigger: 'blur' }],
        integral_invite_max: [{ required: true, validator: integral_invite_max, trigger: 'blur' }],
        integral_order_received_money_integral: [{ required: true, validator: integral_order_received_money_integral, trigger: 'blur' }],
        integral_order_received_min: [{ required: true, validator: integral_order_received_min, trigger: 'blur' }],
        integral_goods_appraise_star: [{ required: true, validator: integral_goods_appraise_star, trigger: 'blur' }],
        integral_goods_appraise_star_words: [{ required: true, validator: integral_goods_appraise_star_words, trigger: 'blur' }],
        integral_goods_appraise_star_picture: [{ required: true, validator: integral_goods_appraise_star_picture, trigger: 'blur' }],
        integral_recharge_money_integral: [{ required: true, validator: integral_recharge_money_integral, trigger: 'blur' }],
      },
      saveLoading: false,
      defaultIconUrl: '/static/img/default/integral.png',
      selectedIcon: ''
    }
  },
  computed: {
    defaultIntegral(){
      return localStorage.getItem('driveHost') + '/static/img/default/integral.png'
    },
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      this.getAdminPlatformIntegralGetSite()
    },
    // 请求后初始化数据
    initFormData(){
      if(this.formData.icon_type == 1){
        this.selectedIcon = this.formData.icon;
      }
    },
    iconTypeChange(e){
      this.setIconVal();
      if(e.target.value == '0'){
        this.$refs.form.validateField('icon');
      }
    },
    customIconChange(val){
      this.selectedIcon = val[0];
      this.setIconVal();
      this.$refs.form.validateField('icon');
    },
    setIconVal(){
      if(this.formData.icon_type == '0'){
        this.formData.icon = this.defaultIconUrl;
      }else{
        this.formData.icon = this.selectedIcon;
      }
    },
    getAdminPlatformIntegralGetSite(){
      this.spinning = true;
      getAdminPlatformIntegralGetSite().then(res => {
        if(res.code == 200){
          this.formData = res.data;
          this.initFormData();
          this.setIconVal();
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    save(){
      this.$refs.form.validate(valid => {
        if(valid){
          this.saveLoading = true;
          adminPlatformInteGralSite(this.formData).then(res => {
            if(res.code == 200){
              this.$message.success(res.msg);
            }
          }).finally(() => {
            this.saveLoading = false;
          })
        }else{
          this.$message.error('请填写完整后提交')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.head-title{
  padding: 0 10px;
  width: calc(100% - 48px);
  height: 44px;
  background: #f5f5f5;
  line-height: 44px;
  margin-left: 35px;
}
.logo-list{
  display: flex;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
  li{
    margin-right: 30px;
    text-align: center;
    .radio-item{
      margin-top: 10px;
    }
    .default-logo{
      display: block;
    }
  }
}
.sub-form-item{
  background: @background-color-light;
  padding: 10px;
}
.input-number-list{
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  .action-text{
    padding: 0 5px;
  }
  .unit{
    display: inline-block;
    padding: 0 5px;
    background: #e8e8e8;
    line-height: 32px;
    width: 40px;
    text-align: center;
  }
}
</style>