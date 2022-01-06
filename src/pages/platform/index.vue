// 平台端的根容器
// 将进入平台端需要处理的逻辑可以写到这里。比如：监听平台id的变化
<template>
  <tabs-view-by></tabs-view-by>
</template>

<script>
import TabsViewBy from'@/layouts/tabs/TabsViewBy.vue'
import {PlatformPlatformPlatformInfo} from '@/services/home/analysis.js'

export default {
  components: {TabsViewBy},
  created(){
    window.addEventListener('storage', this.onStorageChange)
    this.PlatformPlatformPlatformInfoFn()
  },
  destroyed(){
    this.$notification.destroy();
    window.removeEventListener('storage', this.onStorageChange)
  },
  methods: {
    onStorageChange(data){
      if(data.key == 'uPmid') {
        this.$warning({
          title: '提示',
          content: '平台信息变更，需要刷新后才能继续操作',
          onOk: ()=>{
            if(data.newValue) {
              window.location.reload()
            }
          }
        });
      }
    },
    PlatformPlatformPlatformInfoFn(){
      PlatformPlatformPlatformInfo().then(res=>{
        if(res.code === 200){
          console.log(res)
          if(!res.data.drive_host){
            this.$notification.open({
              duration: null,
              message: '文件存储未配置',
              icon: <a-icon type="frown" style="color: red" />,
              description:
                '您平台中的存储参数未配置，这将会影响您在各个功能模块上传图片、文件等资源，请先前往配置存储。',
              onClick: () => {},
            });
          }
          localStorage.setItem("driveHost", res.data.drive_host);
        }
      })
    }
  },
}
</script>
