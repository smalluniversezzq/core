<template>
  <div class="add-img">
    <div class="img-box" v-if="imgUrl">
      <img :src="imgUrl" alt="" @click="onClickAdd()">
      <byf-icon class="close" type="iconclose" @click="deleteImg()" />
    </div>
    <div v-else class="add-btn" :class="{error: error}" @click="onClickAdd">
      <byf-icon type="iconjiahao"></byf-icon>
      <span class="error-span">请选择</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgUrl: {
      required: true
    },
    error: {
      required: true
    }
  },
  methods: {
    onClickAdd(){
      this.$byfUpload({multiple: false, imgsList: this.imgObj}).then(res=>{
        if (res.action == 'confirm') {
          this.$emit('chooseImg', res.selectedImgs[0].url)
        }
      })
    },
    deleteImg(){
      this.$emit('delete')
    }
  }
}
</script>
<style lang="less" scoped>
.add-img {
  width: 60px;
  .img-box {
    position: relative;
    &:hover::after {
      position: absolute;
      font-size: 12px;
      color: white;
      left: 0;
      right: 0;
      bottom: 0;
      content: '替换';
      background: rgba(0,0,0,0.6);
      text-align: center;
      line-height: 18px;
      pointer-events: none;
    }
    img { 
      width: 60px;
      cursor: pointer;
    }
    .close {
      position: absolute;
      display: none;
      right: -7px;
      top: -7px;
      font-size: 16px;
      color: rgba(0,0,0,0.5);
    }
    &:hover {
      .close {
        display: block;
      }
    }
  }
  .add-btn {
    font-size: 24px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e9edef;
    color: #b8b9bd;
    position: relative;
    cursor: pointer;
    &.error {
      border-color: @error-color;
      color: @error-color;
      .error-span {
        display: block;
      }
    }
    .anticon {
      cursor: pointer;
    }
    .file-input {
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .error-span {
      position: absolute;
      bottom: -20px;
      font-size: @font-size-sm;
      left: 0;
      color: @error-color;
      display: none;
    }
  }
}
</style>