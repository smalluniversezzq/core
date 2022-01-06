<template>
  <!-- 视频上传的功能 -->
  <a-config-provider :locale="locale">
  <a-modal :destroyOnClose="true" width="1020px" v-model="modal2Visible" title="添加视频" centered :afterClose="afterClose" :okText="activeKey == 1 ? '确定' : '提取'"
    @ok="onClickOk"
    @cancel="onModalCancel"
  >
    <!-- 先写tab -->
    <a-spin :spinning="spinning">
      <div class="image-content">
        <div class="image-header">
          <div class="btn">
            <!-- 左边一个按钮 -->
            <label class="l-upload">
              <input
                type="file"
                ref="videos"
                multiple
                accept="video/*"
                @change="uploadFile($event)"
              />
              <a-button type="primary" :loading="uploadLoading">+添加视频</a-button>
            </label>

            <span>大小不要超过10M</span>
            <a-tooltip placement="top">
              <template slot="title">
                <span>大小不要超过10M，支持视频格式mp4、webm、ogg</span>
              </template>
              <a-icon
                :style="{ 'margin-left': '10px' }"
                type="question-circle"
                theme="filled"
              />
            </a-tooltip>
          </div>
          <!-- 右边日期选择 -->
          <a-range-picker :value="[start_time, end_time]" :placeholder="['请选择上传起始时间', '请选择上传结束时间']" @change="onRangePickerChange">
            <a-icon slot="suffixIcon" type="calendar" />
          </a-range-picker>
        </div>
        <!-- 视频列表 -->
        <div class="image-list beauty-scroll">
          <ul v-if="innerVideosList.length > 0">
            <li
              v-for="(video, index) in innerVideosList"
              :key="index"
              @click="changeSelectStatus(index, !video.isSelected, video)"
            >
              <div class="image">
                <video :src="video.url" :poster="video.cover"></video>
                <!-- <video :src="video.url" alt="" /> -->
                <!-- 下面写layer层 -->
                <div class="layer" v-if="!video.isSelected">
                  <byf-icon
                    style="vertical-align: -3px"
                    type="iconclose"
                    @click.stop="deleteVideos([video])"
                  ></byf-icon>
                  <!-- <div class="image-size-box" v-if="video.extend">
                    <div class="image-size">
                      {{ video.extend.width }} x {{ video.extend.height }}
                    </div>
                  </div> -->
                </div>
                <!-- 选中时候的蒙层 -->
                <div class="image-select-layer" v-if="video.isSelected">
                  <div class="checked">
                    <byf-icon
                      type="iconchecksurface"
                      style="color: #2d8cf0; font-size: 26px"
                    ></byf-icon>
                  </div>
                </div>
              </div>
              <div class="text">
                <p class="filename">{{ video.filename }}</p>
                <p class="created_at">{{video.created_at}}</p>
              </div>
            </li>
          </ul>
          <a-empty v-else style="margin-top: 100px">
            <div slot="description">
              暂无数据,<a-button type="link" size="small" @click="goAdd"
                >去添加</a-button
              >
            </div>
          </a-empty>
        </div>
        <!-- 视频列表底部 -->
        <div class="image-footer">
          <!-- 分页的内容 -->
          <a-pagination
            size="small"
            :total="+total"
            show-size-changer
            show-quick-jumper
            v-model="currentPage"
            :defaultPageSize="10"
            :show-total="(total) => `共${total}条`"
            @change="changePageNumber"
            @showSizeChange="showSizeChange"
          />
        </div>
      </div>
    </a-spin>
  </a-modal>
  </a-config-provider>
</template>
<script>
// import { uploadImage } from "@/utils/request";
let locale = require("ant-design-vue/es/locale-provider/zh_CN").default;
import moment from 'moment';
import {
  getVideoList,
  delVideos,
  uploadVideoRequest
} from "./services";
export default {
  name: "uploadModal",
  props: {
    uploadUrl: {
      required: false,
    },
    /**
     * 数量限制
     * 不传则无限制
     */
    maximum: {
      required: false,
      default: 0,
    },
    /**
     * 是否支持多选
     * true：多选。false：单选。默认false
     */
    multiple: {
      required: false,
      default: false,
    },
    /**
     * 外部已经在使用的视频列表
     */
    videosList: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      locale,
      uploadLoading: false,
      currentPage: 1,
      currentPageSize: 10,
      modal2Visible: false,
      currentIndex: 0,
      innerVideosList: [],
      selectedVideos: (() => {
        console.log(1111111111)
        console.log(this.videosList)
        JSON.parse(JSON.stringify(this.videosList));
        let arr = [];
        this.videosList.forEach((item) => {
          arr.push(item);
        });
        console.log(arr)
        return arr;
      })(), // 被选中的视频
      total: 0,
      clicked: false,
      activeKey: "1", // tabs的key
      spinning: false,
      start_time: undefined, // 开始时间戳
      end_time: undefined, // 结束时间戳
    };
  },
  created() {
    this.showModal();
  },
  computed: {
  },
  methods: {
    /**
     * Modal 完全关闭后的回调
     */
    afterClose() {
      this.$emit("afterClose");
    },
    /**
     * 点击确定按钮
     */
    onClickOk() {
        // 本地视频
        this.onModalConfirm();
    },
    onModalConfirm() {
      this.modal2Visible = false;
      this.$emit("confirm", {
        action: "confirm",
        selectedVideos: JSON.parse(JSON.stringify(this.selectedVideos)),
      });
    },
    onModalCancel() {
      this.$emit("cancel", { action: "cancel" });
    },
    getIndexById(id) {
      for (let i = 0; i < this.innerVideosList.length; i++) {
        if (this.innerVideosList[i].id == id) {
          return i;
        }
      }
    },
    /**
     * 删除视频
     * @param {array} videos 要删除的视频数组
     */
    deleteVideos(videos) {
      let array = []
      videos.forEach(item=>{
        array.push(item.id)
      })
      this.spinning = true
      delVideos({id: JSON.stringify(array)}).then(res=>{
        if(res.code == 200) {
          this.$message.success(res.msg)
          this.getVideoList(this.currentPage, this.currentPageSize);
          this.selectedVideos = [];
        }
      }).finally(()=>{
        this.spinning = false
      })
    },
    goAdd() {
      // 模拟点击
      let e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true);
      this.$refs.videos.dispatchEvent(e);
    },
    // 隐藏当前的弹出框
    hideCurrentPop(group) {
      group.isShow = false;
      return false;
    },
    // 显示编辑框
    ShowEditModal() {
      // this.$refs["myinput" + group.id][0].value = ;
    },
    // 显示气泡卡
    handleClickChange(visible) {
      this.clicked = visible;
    },
    // 隐藏气泡卡
    hidePop() {
      this.clicked = !this.clicked;
    },
    // 当一页个数发生变化时
    showSizeChange(current, size) {
      this.pageSize = size;
      // 去请求数据
      this.getVideoList(current, size);
    },
    // 变化页码时
    changePageNumber(page, pageSize) {
      this.currentPage = page;
      this.currentPageSize = pageSize;
      // 去请求数据
      this.getVideoList(page, pageSize);
    },
    /**
     * 修改选中状态
     * @param {int} index 视频或文件下标
     * @param {boolean} status 要改成此状态值
     */
    changeSelectStatus(index, status, video) {
      if (!this.multiple) {
        // 如果是单选模式下, 先清空所有选中状态
        this.innerVideosList.forEach((item) => {
          item.isSelected = false;
        });
        // 选中某一个视频，当选中的时候进行显示相应的蒙层
        this.innerVideosList[index].isSelected = status;
      }else{
        // 多选 // 上传数量限制
        if(this.maximum && this.selectedVideos.length == this.maximum && status){
          this.$message.error('超出选择数量限制');
          return;
        }else{
          this.innerVideosList[index].isSelected = status;
        }
      }
      if (status) {
        if (!this.multiple) {
          // 不支持多图时，直接替换第一位
          this.selectedVideos[0] = this.innerVideosList[index];
        } else {
          // 支持多图时，往数组末位添加
          this.selectedVideos.push(this.innerVideosList[index]);
        }
      } else {
        this.selectedVideos.splice(
          this.selectedVideos.findIndex(val => val.url == video.url), 1
        );
      }
    },
    // 请求视频列表信息
    getVideoList(page = 1, page_size = 10) {
      let param = {
        page,
        page_size,
        start_time: this.start_time && this.start_time.startOf('day').unix(),
        end_time: this.end_time && this.end_time.endOf('day').unix()
      };
      this.spinning = true;
      getVideoList(param).then((res) => {
        if (res.code == 200) {
          // 使用map进行赋值
          this.innerVideosList = res.data.list.map((item) => {
            let videoObj = { ...item, isSelected: false };
            videoObj.created_at = moment.unix(item.created_at).format("YYYY-MM-DD hh:mm:ss")
            for (let i = 0; i < this.selectedVideos.length; i++) {
              let selectedItem = this.selectedVideos[i];
              console.log(selectedItem)
              if (selectedItem.url == videoObj.url) {
                videoObj.isSelected = true;
                this.selectedVideos[i] = JSON.parse(JSON.stringify(videoObj));
                break;
              }
            }
            return videoObj;
          });
          console.log(this.selectedVideos)
          this.total = res.data.pages.total;
        }
      }).finally(() => {
        this.spinning = false;
      });
    },
    closeModal() {
      this.modal2Visible = false;
    },
    showModal() {
      this.modal2Visible = true;
      // 获取全部视频列表
      this.getVideoList();
    },
    byfUploadFile(file) {
      let params = {}
      // let res = uploadImage(process.env.VUE_APP_API_BASE_URL+"/admin/site/file?op=upload&type=video", file, params);
      let res = uploadVideoRequest(file, params);
      return res;
    },
    async uploadFile(e) {
      // 视频一个一个上传
      this.uploadLoading = true;
      for (let i = 0; i < e.target.files.length; i++) {
        this.byfUploadFile(e.target.files[i]).then((res) => {
          if (res.code == 200) {
            // 将视频地址添加到数组中去
            res.data.isSelected = false;
            this.addVideoToInnerVideosList(res.data);
          }
          // 重置input的value值，解决第二次选择相同文件不会触发change事件的问题
          e.target.value = "";
          if(i == e.target.files.length){
            this.uploadLoading = false;
          }
        });
      }
    },
    /**
     * 往视频列表添加一个新视频
     */
    addVideoToInnerVideosList(oneVideo) {
      this.innerVideosList.unshift(oneVideo);
      this.total++;
      // 添加一个视频后，超出了每页视频数量, 就去掉一个
      if (this.innerVideosList.length > this.currentPageSize) {
        this.innerVideosList.splice(this.innerVideosList.length - 1, 1);
      }
    },
    /**
     * 时间范围变化
     */
    onRangePickerChange(dates){
      this.start_time = dates[0]
      this.end_time = dates[1]
      this.getVideoList();
    }
  },
};
</script>
<style scoped lang="less">
// 前面需要导入重置样式
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
/deep/ .ant-modal-title {
  font-weight: bold;
}
/deep/.ant-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}
/deep/ .ant-modal-body {
  padding: 0;
}

/deep/ .ant-tabs-tab {
  padding: 12px 50px !important;
  font-size: 18px;
  font-weight: bold;
  color: #262b30;
}
/deep/.ant-tabs-nav .ant-tabs-tab-active {
  color: #2d8cf0;
}
/deep/ .ant-tabs-bar {
  margin: 0;
}

/deep/ .ant-btn {
  border-radius: 2px;
  // color: #262b30;
}

/deep/ .ant-modal-footer > div {
  text-align: center;
  > button {
    padding-left: 30px;
    padding-right: 30px;
  }
}

/deep/.ant-pagination-total-text {
  font-size: 12px;
  color: #262b30;
}

/deep/ .ant-pagination-item {
  border-color: #d9d9d9 !important;
  margin-right: 8px !important;
}

/deep/ .ant-pagination-item:hover {
  border-color: #1890ff !important;
}

/deep/ .ant-pagination-item-active {
  border-color: #1890ff !important;
}

/deep/ .ant-pagination-prev {
  border: 1px solid #d9d9d9;
  margin-right: 8px !important;
}

/deep/ .ant-pagination-next {
  border: 1px solid #d9d9d9;
  margin-right: 15px !important;
}

// 面板高度
/deep/ .ant-tabs-content {
  height: 530px;
}

// 对面板重新修改
.ant-tabs-tabpane {
  display: flex;
}
.image-content {
  padding: 0 20px;
  flex: 1;
  .image-footer {
    text-align: center;
    padding: 10px 0;
    background-color: #ffffff;
    > .active-btn {
      color: #262b30;
    }
  }
  .image-header {
    padding-top: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-bottom: 10px;
    .btn {
      span {
        margin-left: 10px;
        color: #262b30;
      }
    }
  }
}

.group {
  width: 200px;
  padding: 20px 0 0;
  border-right: 1px solid #e9edef;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .group-content {
    margin-top: 10px;
    overflow-y: auto;
    li {
      height: 40px;
      &:hover {
        background-color: #f0faff;
        color: #3f96f1;
        &:not(.group-active):not(.default-group) {
          .btn-group {
            display: block;
          }
          .number {
            display: none;
          }
        }
      }
      cursor: pointer;
      &.group-active {
        background-color: #f0faff;
        p {
          color: #3f96f1;
        }
      }
    }
    .group-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0px 10px 20px;
      .title {
        width: 100px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      > p {
        margin-bottom: 0;
        font-size: 12px;
        &.number {
          padding-right: 20px;
        }
      }
      .btn-group {
        display: none;
        padding-right: 10px;
        color: #40a9ff;
        > .ant-btn-link {
          height: auto;
          padding: 0;
          font-size: 12px;
        }
      }
    }
  }
}

.add-group {
  padding: 0 20px;
}

.add-group .ant-btn {
  width: 100%;
  /deep/span {
    margin-left: 0;
    color: #2d8cf0;
  }
}

.ant-input {
  border-radius: 2px;
}

.action-btn {
  padding-top: 10px;
  text-align: right;
  > button {
    margin-left: 10px;
    border-radius: 2px;
  }
}

// 对视频进行处理
.image-list {
  padding-top: 15px;
  height: 400px;
  overflow-y: auto;
  user-select: none;
  > ul {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -10px;
    li > {
      padding: 0 13px 18px 0;
    }
  }
  .image {
    position: relative;
    width: 178px;
    height: 98px;
    border: 1px solid #e9edef;
    border-radius: 2px;
    cursor: pointer;
    background-color: #f4f6f8;
    video{
      width:100%;
      height: 100%;
    }
    &:hover {
      > .layer {
        display: block;
        .anticon {
          display: block;
        }
        .image-size-box {
          .image-size {
            margin-top: 0;
          }
        }
      }
    }
    // 同级的蒙层
    > .image-select-layer {
      > .checked {
        display: inline-block;
        margin: auto;
        color: #2d8cf0;
        font-size: 30px;
      }
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 2px;
    }
    > .layer {
      > .anticon {
        position: absolute;
        top: -12px;
        right: -12px;
        font-size: 24px;
        color: #999;
        display: none;
        &:hover {
          color: #333;
        }
      }
      .image-size-box {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        .image-size {
          text-align: center;
          background-color: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          font-size: 12px;
          margin-top: 20px;
          transition: margin-top 0.3s;
        }
      }
    }
    > video {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    font-size: 12px;
    line-height: 16px;
    color: #262b30;
    margin-top: 10px;
    width: 138px;
    .filename{
      margin-bottom: 0;
      text-overflow: ellipsis;
      overflow: hidden;

    }
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    .created_at{
      color:rgba(0, 0, 0, 0.45);
    }
  }
}

.l-upload {
  position: relative;
  cursor: pointer;
  > input {
    position: absolute;
    left: 0;
    top: -6px;
    opacity: 0;
    width: 100%;
    z-index: 99;
    height: 100%;
    cursor: pointer;
    height: 32px;
    font-size: 0;
  }
  > button {
    cursor: pointer;
  }
}
.online {
  width: 80%;
  margin: auto;
  > span {
    display: inline-block;
    margin-top: 5px;
    margin-left: 75px;
    font-size: 12px;
    color: #939799;
  }
  .extract {
    display: flex;

    align-items: center;
    > .address {
      display: inline-block;
      width: 80px;
    }
    .btn {
      color: #1890ff;
    }
  }
}
</style>