<template>
  <div class="a-upload">
    <!-- 图片列表 -->
    <ul class="img-list">
      <li v-for="(item, index) in imgObj" :key="'img'+index" :class="size">
        <img :src="item" alt="" >
        <byf-icon class="close" type="iconclose" @click="deleteImg(index)" />
        <div class="img-replace-box">
          <div class="img-replace" @click="openModal">替换</div>
        </div>
      </li>
      <!-- 添加图片的li -->
      <div
        class="upload"
        :class="size"
        @click="openModal"
      >
        <div class="text-icon">
          <byf-icon type="iconjiahao"></byf-icon>
          <span>添加图片</span>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
//eslint-disable-next-line
import cloneDeep from 'lodash/cloneDeep'
export default {
  props: {
    /**
     * 接收 图片地址数组
     */
    "imgsList": {
      type: Array,
      required: false,
      default: ()=>{return []}
    },
    size: {
      type: String,
      default: ()=>{return 'normal'}
    },
    /**
     * 是否支持多选
     */
    multiple: {
      type: Boolean,
      default: ()=>{return false}
    }
  },
  data(){
    return {
      imgObj: cloneDeep(this.imgsList)
    }
  },
  created() {
  },
  watch: {
    imgsList(newValue){
      this.imgObj = cloneDeep(newValue)
    }
  },
  methods: {
    isShowPreview(array){
      return array.find((item)=>{
        return item
      })
    },
    openModal() {
      this.$byfUpload({multiple: this.multiple, imgsList: this.imgObj}).then(res => {
        if (res.action == 'confirm') {
          let arr = []
          let arrObj = []
          res.selectedImgs.forEach(item => {
            arr.push(item.url)
            arrObj.push(item)
          })
          this.imgObj = arr;
          this.$emit('change', cloneDeep(this.imgObj), cloneDeep(arrObj))
        }
      });
    },
    deleteImg(index){
      this.imgObj.splice(index,1);
      this.$emit('change', cloneDeep(this.imgObj))
    }
  }
};
</script>
<style lang="less" scoped>
.a-upload {
  display: flex;
  > .img-list {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    li {
      position: relative;
      margin-top: 10px;
      width: 100px;
      height: 100px;
      margin-right: 10px;
      border: 1px solid #e9edef;
      background-color: #F4F6F8;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.small {
        width: 58px;
        height: 58px;
      }
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
  .upload {
    margin-top: 10px;
    line-height: normal;
    &.small {
      width: 58px;
      height: 58px;
      .text-icon {
        > i {
          font-size: 18px;
        }
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
  }
}
</style>