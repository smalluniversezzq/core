<template>
  <div>
    <a-modal :maskClosable="false"
       title="反馈详情"
      :width="800"
      style="top: 10px"
      :visible="showModal"
      :destroyOnClose="true"
      @cancel="modalCancel"
    >
      <template slot="footer">
        <a-button key="back" @click="modalCancel">
          取消
        </a-button>
      </template>
      <div class="beauty-scroll" style="max-height: 600px;overflow-y: auto;">
        <div @mousedown="onMousedown">
          <a-form-model
            ref="form"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="反馈用户" prop="name" >
              <span v-if="!form.name && !form.mobile">
                --
              </span>
                  <span v-else>
                {{form.name}} <span v-if="form.name && form.mobile">(</span><span v-if="form.mobile">{{form.mobile}}</span><span v-if="form.name && form.mobile">)</span>
              </span>
            </a-form-model-item>
            <br/>
            <a-form-model-item label="反馈内容" prop="content">
              {{form.content}}
            </a-form-model-item>
            <br/>
            <a-form-model-item label="反馈截图" prop="imgages" >
                <div v-if="form.images.length != 0">
                  <div class="feed-back-img-box">
                    <div class="single" v-for="(item, index) in form.images" :key="index" >
                      <img :src="item" @click="preview(index)">
                    </div>
                  </div>
                  <p class="to-enlarge-text">点击图片放大</p>
                </div>
                <span v-if="form.images.length == 0">暂无</span>
              </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>

import { ImgViewer } from "@/components/byf/viewer";
export default {
  data(){
    return {
      showModal: false,
      confirmLoading: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 17 },
      form: {
        content: '',
        images: '',
        mobile: '',
        name: ''
      },
      mouseDownTarget: null,
    }
  },
  created(){
    
  },
  methods: {
    onMousedown(e) {
      // 记录鼠标按下触发的节点
      this.mouseDownTarget = e.target;
    },
    /**
     * 展示弹窗
     * @param [obj] 要编辑的用户数据，不传就是添加用户
     */
    showModalAction(data) {
      this.initForm(JSON.parse(JSON.stringify(data)));
      this.showModal = true;
    },
    preview(index){
      var imgArr = this.form.images;
      if(index > 0){
        imgArr = imgArr.slice(index).concat(imgArr.slice(0,index))
      }
      ImgViewer({
        imgs: imgArr,
        options: {
          button: false, // 隐藏右上角关闭按钮
        }
      });
    },
    resetForm() {
      this.$nextTick(() => {
        this.form.content = "";
        this.form.images = [];
        this.form.mobile = "";
        this.form.name = "";
      });
    },
    modalCancel() {
      this.showModal = false;
      this.confirmLoading = false;
      this.resetForm();
    },
    initForm(data) {
      if (!data) {
        this.resetForm();
      } else {
        this.form = data;
      }
    }
  },
}
</script>

<style scoped lang="less">
.titleWrap{
  font-weight: bold;
  background: rgb(244 246 248);
  padding: 10px;
  
}
.link-wrap{
    display: flex;
    >span{
      line-height: 30px;
      padding-right: 5px;
    }
    .link-input{
      width: 82%;
      .link-input-btn{
        cursor: pointer;
      }
    }
  }
.tip{
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
.feed-back-img-box{
  .single{
    display:inline-block;
    width: 90px;
    height: 110px;
    margin: 0 30px 30px 0;
    >img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
.to-enlarge-text{
  color: rgba(166, 166, 166, 1);
  margin-top: -30px;
}
#hoverpointer{
  cursor: pointer;
}
</style>
