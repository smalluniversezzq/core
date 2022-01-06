<template>
  <div>
    <a-card size="small">
      <a-spin :spinning="spinning">
        <a-form-model ref="form" :rules="rules" :model="formData" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-form-model-item label="登录账号" prop="sys_login_account_number" help="说明：系统默认使用手机号登录，站长可自定义其他字符进行登录，支持输入中文、英文、数字、特殊字符">
            <a-input placeholder="请输入登录账号" v-model="formData.sys_login_account_number"/>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="PC登录验证" help="说明：PC端用户登录时，是否进行滑块验证。开启此验证能增加系统安全性，建议开启。">
            <a-radio-group v-model="formData.sys_slider_verification">
              <a-radio value="1"> 设备每次登录验证 </a-radio>
              <a-radio value="2"> 设备首次登录验证 </a-radio>
              <a-radio value="3"> 设备30天未登录验证 </a-radio>
              <a-radio value="0"> 永不验证 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="站点名称" prop="sys_site_name" help="说明：用于浏览器标签栏展示的站点名称">
            <a-input placeholder="请输入站点名称" v-model="formData.sys_site_name"/>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="站点图标" prop="sys_site_icon" help="说明：用于浏览器标签栏显示的自定义图标，建议尺寸32*32px的ico格式图标">
            <byf-upload-btn style="margin-bottom: 10px" @change="siteIconChange" :imgsList="[formData.sys_site_icon]"></byf-upload-btn>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="站点logo" prop="sys_site_logo" help="说明：用于控制台左上角logo，建议尺寸227*30px的png透明图">
            <byf-upload-btn style="margin-bottom: 10px" @change="siteLogoChange" :imgsList="[formData.sys_site_logo]"></byf-upload-btn>
          </a-form-model-item>
          <br/>
          <a-form-model-item label="版权标识" prop="sys_copyright" help="说明：站点显示的版权标识，注意符号©，不会输入时可复制">
            <a-input placeholder="请输入版权标识" v-model="formData.sys_copyright"/>
          </a-form-model-item>
          <br/>
          <a-form-model-item :wrapperCol="{offset: labelCol.span}">
            <a-button type="primary" :loading="saveLoading" @click="save">保存</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { platformConfigGet, platformConfigSet } from '@/services/platform'
import { mapMutations } from 'vuex'
import { getI18nKey } from "@/utils/routerUtil";
export default {
  data(){
    return {
      labelCol: {span: 2},
      wrapperCol: {span: 20},
      spinning: false,
      formData: {
        sys_login_account_number: '',
        sys_site_name: '',
        sys_site_icon: '',
        sys_site_logo: '',
        sys_copyright: '',
        sys_slider_verification: '0'
      },
      rules: {
        sys_login_account_number: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        sys_site_name: [{ required: true, message: '请输入站点名称', trigger: 'blur' }],
        sys_site_icon: [{ required: true, message: '请选择站点图标', trigger: 'blur' }],
        sys_site_logo: [{ required: true, message: '请选择站点logo', trigger: 'blur' }],
      },
      saveLoading: false,
    }
  },
  computed:{
    configList(){
      let arr = [];
      for(let k in this.formData){
        arr.push(k)
      }
      return arr;
    }
  },
  created(){
    this.getConfig()
  },
  methods:{
    ...mapMutations('siteConfig', ['setConfigInfo']),
    getConfig(){
      this.spinning = true;
      platformConfigGet({config: this.configList}).then(res => {
        console.log(res)
        if(res.code == 200){
          this.formData = res.data.config;
        }
      }).finally(() => {
        this.spinning = false;
      })
    },
    // 设置浏览器图标
    setFaviconAndTitle(link){
      let $favicon = document.querySelector('link[rel="icon"]')
      console.log($favicon)
      if ($favicon !== null) {
        $favicon.href = link;
      } else {
        $favicon = document.createElement("link");
        $favicon.rel = "icon";
        $favicon.href = link;
        document.head.appendChild($favicon);
      }
    },
    setHtmlTitle() {
      const route = this.$route;
      const key =
        route.path === "/"
          ? "home.name"
          : getI18nKey(route.matched[route.matched.length - 1].path);
      let sys_site_name = ` | ${this.formData.sys_site_name}`
      document.title = this.$t(key) + sys_site_name;
    },
    save(){
      console.log(this.formData)
      this.$refs.form.validate(valid => {
        console.log(valid)
        if(valid){
          // 验证通过，提交
          this.saveLoading = true;
          platformConfigSet(this.formData).then(res => {
            console.log(res)
            if(res.code == 200){
              this.$message.success(res.msg)
              this.setConfigInfo(this.formData);
              this.setFaviconAndTitle(this.formData.sys_site_icon)
              this.setHtmlTitle();
            }
          }).finally(() => {
            this.saveLoading = false;
          })
        }
      })
    },
    siteIconChange(value){
      console.log(value)
      this.formData.sys_site_icon = value[0] || '';
      this.$refs.form.validateField('sys_site_icon')
    },
    siteLogoChange(value){
      console.log(value)
      this.formData.sys_site_logo = value[0] || ''
      this.$refs.form.validateField('sys_site_logo')
    }
  }
}
</script>

<style lang="less" scoped>

</style>