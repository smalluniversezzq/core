<template>
  <div class="byf-upload">
    <!-- 视频列表 -->
    <ul v-if="videoObj.length > 0" class="img-list">
      <li v-for="(item, index) in videoObj" :key="'img'+index">
        <video :src="item.url" :poster="item.cover"></video>
        <byf-icon class="close" type="iconclose" @click="deleteImg(index)" />
        <div class="img-replace-box">
          <div class="img-replace" @click="openModal">替换</div>
        </div>
      </li>

    </ul>
    <!-- 添加视频的li -->
    <div v-else
      class="upload"
      @click="openModal"
    >
      <div class="text-icon">
        <byf-icon type="iconjiahao"></byf-icon>
        <span>添加视频</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * 接收 视频地址数组
     */
    "videosList": {
      type: Array,
      required: false,
      default: ()=>{return []}
    }
  },
  data(){
    return {
      videoObj: JSON.parse(JSON.stringify(this.videosList))
    }
  },
  created() {
  },
  methods: {
    openModal() {
      this.$byfUploadVideo({multiple: false, videosList: this.videoObj}).then(res => {
        if (res.action == 'confirm') {
          let arr = []
          res.selectedVideos.forEach(item => {
            arr.push(item)
          })
          this.videoObj = arr;
          this.$emit('change', this.videoObj)
        }
      });
    },
    deleteImg(index){
      this.videoObj.splice(index,1);
      this.$emit('change', this.videoObj)
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
      width: 178px;
      height: 98px;
      border: 1px solid #e9edef;
      background-color: #F4F6F8;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      video {
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
    line-height: normal;
    .text-icon {
      display: flex;
      flex-direction: column;
      > i {
        font-size: 24px;
        color:#2d8cf0;
        margin-bottom: 10px;
      }
      > span {
        color: #b8b9bd;
        font-size: 12px;
      }
    }
    width: 100px;
    height: 100px;
    /* margin-left: 20px; */
    border: 1px dashed #e9edef;
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
  }
}
</style>