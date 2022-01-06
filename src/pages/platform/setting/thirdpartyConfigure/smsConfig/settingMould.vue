<template>
  <div>
      <div class="config-title">
        <h1 @click="back"><byf-icon type="iconfanhui"></byf-icon>返回短信配置</h1>
        <br/>
      </div>
      <a-table
        :data-source="data"
        :columns="columns"
        rowKey="key"
        :pagination="pagination">
        <template slot="code" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, 'code')"
          />
          <template v-else>
            {{text}}
          </template>
        </template>
        <!-- <template slot="operate" slot-scope="text, record">
          <a-space>
            <a-button type="link" size="small" @click="edit(record.key)">
              编辑
            </a-button>
          </a-space>
        </template> -->

        <template slot="operate" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a-button type="link" size="small" :loading="record.saveLoading" @click="() => save(record.key)">保存</a-button>
              <a-popconfirm title="确定取消吗?" @confirm="() => cancel(record.key)">
                <a-button type="link" size="small">取消</a-button>
              </a-popconfirm>
            </span>
            <span v-else>
              <a-button type="link" size="small" :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a-button>
            </span>
          </div>
        </template>
      </a-table>
  </div>
</template>

<script>
import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
export default {
  data(){
    const data = [
        {
          type: '登录模板',
          key: 'sms_aliyun_template_login',
          code: '',
          saveLoading: false,
        },
        {
          type: '注册模板',
          editable: false,
          key: 'sms_aliyun_template_register',
          code: '',
          saveLoading: false,
        },
        {
          type: '通用验证码模板',
          key: 'sms_aliyun_template_yzm',
          code: '',
          saveLoading: false,
        },
        {
          type: '开店审核成功模板',
          key: 'sms_aliyun_template_pass',
          code: '',
          saveLoading: false,
        },
        {
          type: '开店审核未通过模板',
          key: 'sms_aliyun_template_nopass',
          code: '',
          saveLoading: false,
        }
    ]
    
    return {
      columns: [
        {
          title: "阿里云短信模板类型",
          dataIndex: "type",
        },
        {
          title: "阿里云模板code",
          dataIndex: "code",
          scopedSlots: { customRender: 'code' },
        },
        {
          title: "操作",
          dataIndex: 'operate',
          scopedSlots: { customRender: "operate" },
        },
      ],
      data,
      editingKey: '',
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ["10", "20", "30", "40", "50"],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      visible: false,
      confirmLoading: false,
      formData: {
        sms_aliyun_template_login: '',
        sms_aliyun_template_register: '',
        sms_aliyun_template_yzm: '',
        sms_aliyun_template_pass: '',
        sms_aliyun_template_nopass: ''
      },
    }
  },
  created(){
    this.platformConfigGet()
  },
  methods: {
    handleChange(value, key, column){
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      target.saveLoading = true;
      platformConfigSet({[this.editingKey]: target.code}).then(res => {
        if(res.code == 200){
          if (target && targetCache) {
            delete target.editable;
            this.data = newData;
            Object.assign(targetCache, target);
            this.cacheData = newCacheData;
          }
          this.editingKey = '';
        }
      }).finally(() => {
        target.saveLoading = false;
      })
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
    platformConfigGet(){
      let config = [];
      for(let k in this.formData){
        config.push(k);
      }
      platformConfigGet({config}).then(res => {
        if(res.code == 200){
          this.data.forEach(item => {
            for(let k in res.data.config){
              if(item.key == k){
                item.code = res.data.config[k]
              }
            }
          })
          this.cacheData = this.data.map(item => ({ ...item }));
        }
      })
    },
    back(){
      this.$emit('mouldBack', {id: 0});
    },
  }
}
</script>

<style scoped lang="less">
.config-title{
  cursor: pointer;
  display: inline-block;
  padding-left: 5px;
  h1{
    font-weight: bold;
  }
}
.tip{
  color: #a0a0a0;
  font-size: 14px;
  line-height: 20px;
}
</style>