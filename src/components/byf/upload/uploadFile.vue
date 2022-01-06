<template>
  <div class="byf-upload-file">
    <div class="text-icon">
      <a-upload
      :file-list="fileList" 
      :remove="handleRemove"
      :before-upload="beforeUpload"
      >
        <byf-icon type="iconjiahao"></byf-icon>
        <span>上传文件</span>
      </a-upload>
    </div>
  </div>
</template>
<script>
//eslint-disable-next-line
// import cloneDeep from 'lodash/cloneDeep'
export default {
  name:"byf-upload-file",
  props: {

  },
  data(){
    return {
      
    }
  },
  created() {
  },
  watch: {
  },
  methods: {
    handleChange(info){
    },
    beforeUpload(file) {
      console.log(file)
      // this.fileList = [...this.fileList, file];
      return false;
    },
  }
};
</script>
<style lang="less" scoped>

</style>