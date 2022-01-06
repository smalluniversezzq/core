<template>
  <div class="byf-upload">
    <!-- 图片列表 -->
    <ul v-if="isShowPreview(imgObj)" class="img-list">
      <li v-for="(item, index) in imgObj"  @click="preview" :key="'img'+index" :class="size" :style="colorType()">
        <img :src="item" alt="" >
        <byf-icon class="close" type="iconclose" @click.stop="deleteImg(index)" />
        <div class="img-replace-box">
          <div class="img-replace" @click.stop="openModal">替换</div>
        </div>
      </li>
    </ul>
    <!-- 添加图片的li -->
    <div v-else 
      class="upload"
      :class="size"
      @click="openModal"
    >
      <div class="text-icon">
        <byf-icon type="iconjiahao"></byf-icon>
        <span>添加图片</span>
      </div>
    </div>
  </div>
</template>
<script>
//eslint-disable-next-line
import cloneDeep from 'lodash/cloneDeep'
import { ImgViewer } from '@/components/byf/viewer'
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
    },
    color:{
      type:String,
      default:"default"
    },
    info:{
      type:String,
      default:""
    },
    format:{
      type:Array,
      default: () => {
        return [];
      },
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
    //图片预览
    preview(){
      console.log('触发图片预览')
      console.log(this.imgObj)
      ImgViewer({
        imgs: this.imgObj,
        options: {
          button: false, // 隐藏右上角关闭按钮
        }
      })
    },
    // 根据参数显示border
    colorType(){
      // default 默认 danger
      let borderStyle = ""
      if(this.color){
        if(this.color == "default"){
          borderStyle = "border:1px solid #d9d9d9"
        }else if(this.color == "primary"){
          borderStyle ="border:1px solid #1890ff"
        }else if(this.color == "danger"){
          borderStyle = "border:1px solid #ff4d4f"
        }
      }else{
        borderStyle = "border:1px solid #d9d9d9"
      }
      return borderStyle
    },
    openModal() {
      this.$byfUpload({multiple: false, imgsList: this.imgObj ,format:this.format }).then(res => {
        if (res.action == 'confirm') {
          let arr = []
          let arrObj = []
          console.log(res,'byfUpload')
          res.selectedImgs.forEach(item => {
            arr.push(item.url)
            arrObj.push(item)
          })
          this.imgObj = arr;
          this.$emit('change', cloneDeep(this.imgObj), cloneDeep(arrObj),this.info,res)
        }
      });
    },
    deleteImg(index){
      this.imgObj.splice(index,1);
      this.$emit('change', cloneDeep(this.imgObj), cloneDeep(this.imgObj),this.info)
    },

  }
};
</script>
<style lang="less" scoped>
.byf-upload {
  display: flex;
  > .img-list {
    margin: 0;
    padding: 0;
    li {
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px solid #e9edef;
      background-color: #F4F6F8;
      border-radius: @border-radius-base;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
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
  > .upload {
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