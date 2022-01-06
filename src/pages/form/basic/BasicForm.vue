<template>
  <byf-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <byf-form-model ref="ruleForm" :model="form" :rules="rules">
      <byf-form-item
        prop="name"
        :label="$t('title')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <byf-input v-model="form.name" :placeholder="$t('titleInput')"/>
      </byf-form-item>
      <byf-form-item
        label="确切日期"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :help="form.oneDate && form.oneDate.toString()"
        prop="oneDate" 
      >
        <byf-date-picker v-model="form.oneDate"/>
      </byf-form-item>
      <byf-form-item
        :label="$t('date')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :help="form.range && form.range.toString()"
        prop="range" 
      >
        <byf-range-picker v-model="form.range" style="width: 100%"/>
      </byf-form-item>
      <byf-form-item label="选择时间" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :help="form.time && form.time.format('h:mm:ss a')" prop="time">
        <byf-time-picker v-model="form.time" format="HH:mm:ss"/>
      </byf-form-item>
      <byf-form-item
        :label="$t('describe')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :help="form.target"
        prop="target"
      >
        <byf-textarea v-model="form.target" rows="3" :placeholder="$t('describeInput')"/>
      </byf-form-item>
      <byf-form-item
        :label="$t('customer')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
      >
        <a-input :placeholder="$t('customerInput')"/>
      </byf-form-item>
      <byf-form-item
        :label="$t('critics')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
      >
        <a-input :placeholder="$t('criticsInput')"/>
      </byf-form-item>
      <byf-form-item
        :label="$t('weight')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
      >
        <a-input-number :min="0" :max="100"/>
        <span>%</span>
      </byf-form-item>
      <byf-form-item
        :label="$t('disclosure')"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        :required="false"
        :help="$t('disclosureDesc')"
      >
        <byf-radio-group v-model="value">
          <byf-radio :value="1">{{$t('public')}}</byf-radio>
          <byf-radio :value="2">{{$t('partially')}}</byf-radio>
          <byf-radio :value="3">{{$t('private')}}</byf-radio>
        </byf-radio-group>
        <byf-select mode="multiple" v-if="value === 2">
          <byf-select-option value="4">{{$t('colleague1')}}</byf-select-option>
          <byf-select-option value="5">{{$t('colleague2')}}</byf-select-option>
          <byf-select-option value="6">{{$t('colleague3')}}</byf-select-option>
        </byf-select>
      </byf-form-item>
      <byf-form-item style="margin-top: 24px" label="标签" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <byf-checkbox :checked="tags.indexOf(item.id)>=0" v-for="item in checkboxOptions" :key="item.id" @change="onCheckboxChange(item.id)">{{item.label}}</byf-checkbox>
      </byf-form-item>
      <byf-form-item label="是否启用" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :help="`${form.switch}`">
        <byf-switch v-model="form.switch" />
      </byf-form-item>
      <byf-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="onSubmit">{{$t('submit')}}</a-button>
        <a-button style="margin-left: 8px">{{$t('save')}}</a-button>
      </byf-form-item>
    </byf-form-model>
  </byf-card>
</template>

<script>
import moment from "moment";
export default {
  name: 'BasicForm',
  i18n: require('./i18n'),
  data () {
    return {
      value: 1,
      checkboxOptions: [{label:'推荐', id:'1'},{label:'新品', id:'2'},{label:'热卖', id:'3'}],
      tags: [],
      form: {
        name: '随便起个名字',
        oneDate: null,
        range: null,
        target: 'sdfs',
        switch: false,
        time: moment()
      },
      rules: {
        name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        range: [{ required: true, message: '请选择日期范围', trigger: ['blur', 'change'] }],
        oneDate: [{ required: true, message: '请选择确切日期', trigger: ['blur', 'change'] }],
        target: [{ required: true, message: '请输入目标描述', trigger: 'blur' }],
        time: [{ required: true, message: '请选择时间', trigger: ['blur', 'change'] }]
      }
    }
  },
  computed: {
    desc() {
      return this.$t('pageDesc')
    }
  },
  methods: {
    onCheckboxChange(id){
      if (this.tags.indexOf(id) >= 0) {
        this.tags.splice(this.tags.indexOf(id), 1)
      } else {
        this.tags.push(id)
      }
    },
    onSubmit(){
    }
  }
}
</script>
