import { platformConfigGet, platformConfigSet } from '@/services/platformSetting'
let mixin =  {
  created() {
    this.doPlatformConfigGet();
  },
  data(){
    return {
      saveLoading: false,
      saveResult: [],
      resultModalVisible: false,
      formModelSpinning: false,
    }
  },
  methods: {
    platformConfigGet,
    doPlatformConfigGet(){
      let config = [];
      for(let k in this.formData){
        config.push(k)
      }
      this.formModelSpinning = true;
      this.platformConfigGet({config}).then(res => {
        if(res.code == 200){
          for(let k in res.data.config){
            this.formData[k] = res.data.config[k]
          }
          // 在获取配置后做一些事情
          typeof this.afterGetConfig == 'function' && this.afterGetConfig();
        }
      }).finally(() => {
        this.formModelSpinning = false;
      });
    },
    platformConfigSet(){
      // 在提交前做一些事情
      typeof this.beforeGetConfig == 'function' && this.beforeGetConfig();
      this.$refs.form.validate(valid => {
        if(valid){
          this.saveLoading = true;
          platformConfigSet(this.formData).then(res => {
            if(res.code == 200){
              let status = true;
              this.saveResult = [];
              let result = res.data.result;
              for(let k in this.keyOfValue){
                this.saveResult.push({
                  ...result[k],
                  key: k,
                  title: this.keyOfValue[k]
                })
                if(result[k].success == false){
                  status = false
                }
              }
              if(!status){
                this.resultModalVisible = true;
              }else{
                this.$message.success(res.msg)
              }
            }
          }).finally(() => {
            this.saveLoading = false;
          });
        }
      })
      
    }
  },
}
export default mixin