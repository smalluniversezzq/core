<template>
  <!-- 图片上传的功能 -->
  <a-config-provider :locale="locale">
  <a-modal :destroyOnClose="true" width="1020px" v-model="modal2Visible" title="添加图片" centered :afterClose="afterClose" :okText="activeKey == 1 ? '确定' : '提取'"
    @ok="onClickOk"
    @cancel="onModalCancel"
  >
    <!-- 先写tab -->
    <a-spin :spinning="spinning">
      <a-tabs default-active-key="1" @change="onTabsChange" size="large">
        <a-tab-pane key="1" tab="本地图片">
          <!-- 1.在本地图片中写 -->
          <!-- 在写下边左边 -->
          <div class="group">
            <!-- 加号 -->
            <div class="add-group">
              <a-popover
                title="添加分组"
                trigger="click"
                :visible="clicked"
                @visibleChange="handleClickChange"
              >
                <template slot="content">
                  <a-input placeholder="请输入分组名称" v-model="group_name" ></a-input>
                  <!-- 添加按钮分组 -->
                  <div class="action-btn">
                    <a-button @click="hidePop">取消</a-button>
                    <a-button @click="addGroupList" type="primary">
                      确定
                    </a-button>
                  </div>
                </template>
                <a-button> +添加分组 </a-button>
              </a-popover>
            </div>
            <!-- 下面是列表 -->
            <div class="group-content beauty-scroll">
              <ul>
                <li v-for="(group, index) in allgroupList" :key="index" @click="changeGroup(index)" 
                  :class="{ 'group-active': index == currentIndex, other: group.id !== '' && group.id !== '0', 'default-group': index <= 1, }"
                >
                  <!-- 里面有两种情况，一种是有数据一种是没有数据 -->
                  <div class="group-list">
                    <p class="title">{{ group.title }}</p>
                    <p class="number" v-if="group.id !== '' && group.id !== '0'">{{ group.number }}</p>
                    <p class="btn-group" v-if="group.id != '-1' && group.id != '0'">
                      <a-popover v-model="group.isShow" title="修改分组" trigger="click">
                        <template slot="content">
                          <a-input
                            placeholder="请输入分组名称"
                            :ref="'myinput' + group.id"
                            :defaultValue="group.title"
                          ></a-input>
                          <!-- 添加按钮分组 -->
                          <div class="action-btn">
                            <a-button @click.stop.self="hideCurrentPop(group)"
                              >取消</a-button
                            >
                            <a-button
                              @click.stop.self="modifyCurrentPop(group)"
                              type="primary"
                            >
                              确定
                            </a-button>
                          </div>
                        </template>
                        <a-button type="link" @click.stop="ShowEditModal(index)">编辑</a-button>
                      </a-popover>
                      |
                      <a-button type="link" @click.stop="deleteGroup(group, index)">删除</a-button>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 再写右边 -->
          <div class="image-content">
            <div class="image-header">
              <div class="btn">
                <!-- 左边一个按钮 -->
                <label class="l-upload">
                  <input
                    type="file"
                    ref="imgs"
                    multiple
                    accept="image/gif, image/jpg, image/png, image/jpeg"
                    @change="uploadFile($event)"
                  />
                  <a-button type="primary" :loading="uploadLoading">+添加图片</a-button>
                </label>

                <span>大小不要超过10M</span>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>大小不要超过10M，支持图片格式gif、jpg、png、jpeg</span>
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
            <!-- 图片列表 -->
            <div class="image-list beauty-scroll">
              <ul v-if="innerImgsList.length > 0">
                <li
                  v-for="(img, index) in innerImgsList"
                  :key="index"
                  @click="changeSelectStatus(index, !img.isSelected, img)"
                >
                  <div class="image">
                    <img :src="img.url" alt="" />
                    <!-- 下面写layer层 -->
                    <div class="layer" v-if="!img.isSelected">
                      <byf-icon
                        style="vertical-align: -3px"
                        type="iconclose"
                        @click.stop="deleteImgs([img])"
                      ></byf-icon>
                      <div class="image-size-box" v-if="img.extend">
                        <div class="image-size">
                          {{ img.extend.width }} x {{ img.extend.height }}
                        </div>
                      </div>
                    </div>
                    <!-- 选中时候的蒙层 -->
                    <div class="image-select-layer" v-if="img.isSelected">
                      <div class="checked">
                        <byf-icon
                          type="iconchecksurface"
                          style="color: #2d8cf0; font-size: 26px"
                        ></byf-icon>
                      </div>
                    </div>
                  </div>
                  <div class="text">
                    <span>{{ img.filename }}</span>
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
            <!-- 图片列表底部 -->
            <div class="image-footer">
              <!-- 按钮 -->
              <a-button :disabled="deleteSelectNumber <= 0" @click="deleteImgs(selectedImgs)" class="active-btn">删除选中 ({{ deleteSelectNumber }})</a-button>

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
        </a-tab-pane>
        <a-tab-pane key="2" tab="网络提取" force-render>
          <div class="online">
            <div class="extract">
              <span class="address">图片地址:</span>
              <a-input-search
                placeholder="请在此处粘贴图片地址"
                @search="getWebImg"
                v-model="webImgUrl"
              >
                <a-button class="btn" slot="enterButton"> 提取图片 </a-button>
              </a-input-search>
            </div>
            <span>需要http://.........大小不要超过10M,支持图片类型gif,jpg,png,jpeg</span>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </a-modal>
  </a-config-provider>
</template>
<script>
// import { uploadImage } from "@/utils/request";
let locale = require("ant-design-vue/es/locale-provider/zh_CN").default;
import {
  getImgList,
  getGroupList,
  addGroup,
  delGroup,
  editGroup,
  getWebImg,
  delImgs,
  uploadImageRequest
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
     * 外部已经在使用的图片列表
     */
    imgsList: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    format:{
      type:Array,
      default: () => {
        return [];
      },
    },
    // 限制尺寸
    width:{
      type:String,
      default:"1024"
    },
    height:{
      type:String,
      default:"1024"
    }
  },
  data() {
    return {
      locale,
      uploadLoading: false,
      currentPage: 1,
      currentPageSize: 10,
      modal2Visible: false,
      allgroupList: [],
      currentIndex: 0,
      innerImgsList: [],
      selectedImgs: (() => {
        JSON.parse(JSON.stringify(this.imgsList));
        let arr = [];
        this.imgsList.forEach((item) => {
          arr.push({ url: item });
        });
        return arr;
      })(), // 被选中的图片
      total: 0,
      clicked: false,
      // 分组名称
      group_name: "",
      webImgUrl: "", // 网络图片地址
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
    deleteSelectNumber: function () {
      return this.selectedImgs.length
      // return this.innerImgsList.reduce((selectedNums, item) => {
      //   if (item.isSelected) {
      //     selectedNums++;
      //     return selectedNums;
      //   } else {
      //     return selectedNums;
      //   }
      // }, 0);
    },
  },
  methods: {
    /**
     * Modal 完全关闭后的回调
     */
    afterClose() {
      // 发出这个事件，为了销毁这次创建的dom元素。
      this.$emit("afterClose");
    },
    /**
     * 点击确定按钮
     */
    onClickOk() {
      if (this.activeKey == 1) {
        // 本地图片
        this.onModalConfirm();
      } else if (this.activeKey == 2) {
        // 网络提取
        this.getWebImg();
      }
    },
    onModalConfirm() {
      this.modal2Visible = false;
      this.$emit("confirm", {
        action: "confirm",
        selectedImgs: JSON.parse(JSON.stringify(this.selectedImgs)),
      });
    },
    onModalCancel() {
      this.$emit("cancel", { action: "cancel" });
    },
    getIndexById(id) {
      for (let i = 0; i < this.innerImgsList.length; i++) {
        if (this.innerImgsList[i].id == id) {
          return i;
        }
      }
    },
    /**
     * 删除图片
     * @param {array} imgs 要删除的图片数组
     */
    deleteImgs(imgs) {
      let array = []
      imgs.forEach(item=>{
        array.push(item.id)
      })
      this.spinning = true
      delImgs({id: JSON.stringify(array)}).then(res=>{
        if(res.code == 200) {
          this.$message.success(res.msg)
          this.getImgList(this.allgroupList[this.currentIndex].id, this.currentPage, this.currentPageSize);
          this.subGroupNumber(imgs)
          this.selectedImgs = [];
        }
      }).finally(()=>{
        this.spinning = false
      })
    },
    /**
     * 在添加完图片后 修改组的 数量
     * @param [int] 要添加的数量
     * @param [int] group_index 组的下标
     */
    addGroupNumber(num, group_index){
      this.allgroupList[group_index].number = +this.allgroupList[group_index].number + num
      if (group_index != 0) {
        this.allgroupList[0].number = +this.allgroupList[0].number + 1
      }
    },
    /**
     * 在删除完图片后 修改组的 数量
     * @param [array] 删除的图片数组
     */
    subGroupNumber(imgs){
      imgs.forEach(imgItem => {
        for(let i = 0;i<this.allgroupList.length;i++){
          let groupItem = this.allgroupList[i]
          if (groupItem.id == imgItem.group_id) {
            groupItem.number--;
            this.allgroupList[0].number--;
            break;
          }
        }
      })
    },
    goAdd() {
      // 模拟点击
      let e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true);
      this.$refs.imgs.dispatchEvent(e);
    },
    // 隐藏当前的弹出框
    hideCurrentPop(group) {
      group.isShow = false;
      return false;
    },
    modifyCurrentPop(group) {
      let newTitle = this.$refs["myinput" + group.id][0].stateValue;
      editGroup({ title: newTitle, id: group.id }).then((res) => {
        if (res.code == 200) {
          group.title = newTitle;
          group.isShow = !group.isShow;
        }
      });
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
    // 添加分组列表
    addGroupList() {
      addGroup({ title: this.group_name }).then((res) => {
        if (res.code == 200) {
          this.allgroupList.splice(2, 0, {
            title: this.group_name,
            id: res.data.group_id,
            number: 0,
          });
          this.group_name = "";
          this.hidePop();
        }
      });
    },
    // 当一页个数发生变化时
    showSizeChange(current, size) {
      this.pageSize = size;
      // 去请求数据
      this.getImgList(this.allgroupList[this.currentIndex].id, current, size);
    },
    // 变化页码时
    changePageNumber(page, pageSize) {
      this.currentPage = page;
      this.currentPageSize = pageSize;
      // 去请求数据
      this.getImgList(this.allgroupList[this.currentIndex].id, page, pageSize);
    },
    /**
     * 修改选中状态
     * @param {int} index 图片或文件下标
     * @param {boolean} status 要改成此状态值
     */
    changeSelectStatus(index, status, img) {
      if (!this.multiple) {
        // 如果是单选模式下, 先清空所有选中状态
        this.innerImgsList.forEach((item) => {
          item.isSelected = false;
        });
        // 选中某一个图片，当选中的时候进行显示相应的蒙层
        this.innerImgsList[index].isSelected = status;
      }else{
        // 多选 // 上传数量限制
        if(this.maximum && this.selectedImgs.length == this.maximum && status){
          this.$message.error('超出选择数量限制');
          return;
        }else{
          this.innerImgsList[index].isSelected = status;
        }
      }
      if (status) {
        // 选中
        if (!this.multiple) {
          let arr = [this.innerImgsList[index]]
          // 不支持多图时，直接替换第一位
          this.selectedImgs = arr;
        } else {
          // 支持多图时，往数组末位添加
          this.selectedImgs.push(this.innerImgsList[index]);
        }
      } else {
        // 取消选中
        this.selectedImgs.splice(
          this.selectedImgs.findIndex(val => val.url == img.url), 1
        );
      }
    },
    // 请求图片列表信息
    getImgList(group_id, page = 1, page_size = 10) {
      let param = {
        page,
        page_size,
        format:this.format,
        start_time: this.start_time && this.start_time.startOf('day').unix(),
        end_time: this.end_time && this.end_time.endOf('day').unix()
      };
      if (group_id != -1) {
        param.group_id = group_id;
      }
      this.spinning = true;
      getImgList(param).then((res) => {
        if (res.code == 200) {
          // 使用map进行赋值
          this.innerImgsList = res.data.list.map((item) => {
            let imgObj = { ...item, isSelected: false };
            for (let i = 0; i < this.selectedImgs.length; i++) {
              let selectedItem = this.selectedImgs[i];
              if (selectedItem.url == imgObj.url) {
                imgObj.isSelected = true;
                this.selectedImgs[i] = JSON.parse(JSON.stringify(imgObj));
                break;
              }
            }
            return imgObj;
          });
          this.total = res.data.pages.total;
        }
      }).finally(() => {
        this.spinning = false;
      });
    },
    // 请求分组信息
    getGroupList() {
      getGroupList({ page_size: 999 }).then((res) => {
        if (res.code == 200) {
          this.allgroupList = res.data.list;
          if (this.allgroupList.length && this.allgroupList.length > 0) {
            this.allgroupList.forEach((item) => {
              this.$set(item, "isShow", false);
            });
          }
        }
      });
    },
    deleteGroup(group, index) {
      this.$confirm({
        title: "提示",
        content: "确定要删除该图片分组？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: () => {
          delGroup({ id: group.id }).then((res) => {
            if (res.code == 200) {
              this.$message.success("删除分组成功!");
              this.allgroupList.splice(index, 1);
            }
          });
        },
      });
    },
    changeGroup(index) {
      this.currentPage = 1;
      this.currentIndex = index;
      // 并且发送出来请求
      this.getImgList(this.allgroupList[index].id);
    },
    /**
     * tabs切换事件
     */
    onTabsChange(activeKey) {
      this.activeKey = activeKey;
    },
    closeModal() {
      this.modal2Visible = false;
    },
    showModal() {
      this.modal2Visible = true;
      // 获取全部图片列表
      this.getImgList();
      // 同时显示分组数据
      this.getGroupList();
    },
    byfUploadFile(file) {
      let params = {}
      if (this.allgroupList[this.currentIndex].id != -1) {
        params.group_id = this.allgroupList[this.currentIndex].id
      }
      let res = uploadImageRequest(file, params);
      return res;
    },
    async uploadFile(e) {
      // 图片一个一个上传
      // console.log(e)
      // // 判断图片的宽高
      // console.log(this.onImgSize(e))
      // alert("上传前")
      this.uploadLoading = true;
      for (let i = 0; i < e.target.files.length; i++) {
        this.byfUploadFile(e.target.files[i]).then((res) => {
          if (res.code == 200) {
            // 将图片地址添加到数组中去
            res.data.isSelected = false;
            this.addImgToInnerImgsList(res.data);
            this.addGroupNumber(1, this.currentIndex)
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
     * 往图片列表添加一个新图片
     */
    addImgToInnerImgsList(oneImg) {
      this.innerImgsList.unshift(oneImg);
      this.total++;
      // 添加一个图片后，超出了每页图片数量, 就去掉一个
      if (this.innerImgsList.length > this.currentPageSize) {
        this.innerImgsList.splice(this.innerImgsList.length - 1, 1);
      }
    },
    /**
     * 获取网络图片
     */
    getWebImg() {
      getWebImg({ url: this.webImgUrl }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          if(!this.multiple){
            this.selectedImgs = [res.data];
          }else{
            this.selectedImgs.push(res.data);
          }
          this.onModalConfirm();
        }
      });
    },
    /**
     * 时间范围变化
     */
    onRangePickerChange(dates){
      this.start_time = dates[0]
      this.end_time = dates[1]
      this.getImgList(this.allgroupList[this.currentIndex].id);
    },
    /**
     * 宽高
     */
    // onImgSize(event){
    //     let that = this;
    //     let file = event.target.files[0];
    //     let fileReader = new FileReader();
    //     fileReader.readAsDataURL(file); //根据图片路径读取图片
    //     fileReader.onload = function(e) {
    //     console.log(e)
    //     let base64 = this.result;
    //     let img = new Image();
    //     img.src = base64;
    //     img.onload = function() {
    //       that.imgInfo = {
    //         width: img.naturalWidth,
    //         height: img.naturalHeight
    //       };
    //       console.log("宽：" + img.naturalWidth + " 高：" + img.naturalHeight);
    //       let size = {
    //         width: img.naturalWidth,
    //         height: img.naturalHeight,
    //       }
    //       return size
    //     }
    //     console.log(size)
    //   }

      // var img = new Image();
      // var url = window.URL || window.webkitURL;
      // img.src = url.createObjectURL(file);//预览加载
      // if (img.width != this.width && img.width != this.height) {
      //   this.$message.error(`请上传${this.width}*${this.height}的图片`);
      //   return false;
      // }else{
      //   return true
      // }
    // }
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 10px 0;
    padding-bottom: 2px;
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

// 对图片进行处理
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
    width: 138px;
    height: 138px;
    border: 1px solid #e9edef;
    border-radius: 2px;
    cursor: pointer;
    background-color: #f4f6f8;
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
    > img {
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
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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