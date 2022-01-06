<template>
  <div class="byf-upload">
    <!-- 图片列表 -->
    <ul v-if="imgObj.length > 0 && imgObj[0].url" class="img-list">
      <li v-for="(item, index) in imgObj" :key="'img'+index">
        <img :src="item.url" alt="" >
        <byf-icon class="close" type="iconclose" @click="deleteImg(index)" />
        <div class="img-replace-box">
          <div class="img-replace" @click="openModal">替换</div>
        </div>
      </li>
    </ul>
    <!-- 添加图片的li -->
    <div v-else class="upload" @click="openModal">
      <div class="text-icon">
        <byf-icon type="iconjiahao"></byf-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * 接收 图片地址数组
     */
    "imgsList": {
      type: Array,
      required: false,
      default: ()=>{return []}
    }
  },
  data(){
    return {
      imgObj: JSON.parse(JSON.stringify(this.imgsList))
    }
  },
  created() {
  },
  methods: {
    openModal() {
      this.$byfUpload({multiple: false, imgsList: this.imgObj}).then(res => {
        if (res.action == 'confirm') {
          let arr = []
          res.selectedImgs.forEach(item => {
            arr.push(item)
          })
          this.imgObj = arr;
          this.$emit('change', this.imgObj)
        }
      });
    },
    deleteImg(index){
      this.imgObj.splice(index,1);
      this.$emit('change', this.imgObj)
    }
  }
};
</script>
<style lang="less" scoped>
.byf-upload {
  display: flex;
  margin-top: 5px;
  > .img-list {
    margin: 0;
    padding: 0;
    li {
      position: relative;
      width: 40px;
      height: 40px;
      border: 1px solid @border-color-base;
      background-color: white;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .close {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 20px;
        cursor: pointer;
        color: #b8b9bd;
        display: none;
      }
      .img-replace-box{
        position: absolute;
        left: 0;
        right: 0;
        height: 20px;
        bottom:0;
        overflow: hidden;
        .img-replace {
          height: 20px;
          margin-top: 20px;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.7);
          text-align: center;
          line-height: 20px;
          color: #ffffff;
          font-size: 12px;
          pointer-events: none;
          transition: margin-top .3s;
        }
      }
      &:hover {
        .img-replace {
          pointer-events:auto;
          display: block;
          margin-top: 0px;
        }
        .close {
          display: block;
          &:hover {
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
  > .upload {
    width: 40px;
    height: 40px;
    border: 1px solid @border-color-base;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
    .text-icon {
      display: flex;
      flex-direction: column;
      > i {
        font-size: 24px;
        color:#2d8cf0;
      }
    }
  }
}
</style>