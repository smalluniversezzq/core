<template>
  <a-row>
    <a-col :span="12">
      <a-card title="上传组件">
        <byf-space direction="vertical">
          <a-card title="图片上传-单图">
            <img :src="imgUrl1" alt="" style="max-height: 200px;">
            <a-button @click="onBtn1Click">调起组件</a-button>
          </a-card>
          <a-card title="图片上传-多图-数量限制">
            <img v-for="item in imgList" :key="item" :src="item" alt="" style="max-height: 100px;">
            <a-button @click="onBtn2Click">调起组件</a-button>
          </a-card>
          <a-card title="图片上传按钮">
            <byf-upload-btn></byf-upload-btn>
          </a-card>
          <a-card title="视频上传(开发中)">
            <a-radio-group :options="videoPlainOptions" v-model="currentRadio" @change="videoRadioChange"/>
            <a-button @click="onBtn3Click">调起组件</a-button>
            <div class="video-wrap">
              <video v-for="video in videoList" :key="video.url" :src="video.url"  :poster="video.cover"></video>
            </div>
          </a-card>
          <a-card title="视频上传按钮">
            <byf-upload-video-btn></byf-upload-video-btn>
          </a-card>
          <a-card title="图片批量上传">
            <byf-upload-multiple 
            @change="changeGuidePage" 
            :maximum="3" 
            :multiple="true" 
            :format="['png','gif','jeg','jpeg']"
            :color="'defalut'"  
            :imgsList="imgListAll" ></byf-upload-multiple>
          </a-card>
        </byf-space>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
        <div v-show="noTitleKey == '0'">
          <a-card class="card-api">
            <a-space direction="vertical">
              <a-alert message="通过'this.$byfUpload(params)'方法调起上传组件, 此方法会返回一个promise对象。适用于需要diy图片预览效果的" type="info" show-icon />
              <a-card title="传参">
                <a-table :columns="imgUploadTableData.columns1" :dataSource="imgUploadTableData.dataSource1" :pagination="false">
                  <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
                </a-table>
              </a-card>
              <a-card title="结果回调 Promise.then(res=>{ /**some business*/})">
                <a-table :columns="imgUploadTableData.columns2" :dataSource="imgUploadTableData.dataSource2" :pagination="false"></a-table>
              </a-card>
            </a-space>
          </a-card>
          <a-card title="byfUploadBtn API" class="card-api">
            <a-space direction="vertical">
              <a-alert message="一个有默认样式的上传组件按钮。" type="info" show-icon />
              <a-card title="传参">
                <a-table :columns="imgUploadTableData.columns1" :dataSource="imgUploadTableData.dataSource3" :pagination="false">
                  <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
                </a-table>
              </a-card>
              <a-card title="事件">
                <a-table :columns="imgUploadTableData.columns4" :dataSource="imgUploadTableData.dataSource4" :pagination="false"></a-table>
              </a-card>
            </a-space>
          </a-card>
        </div>
        <div v-show="noTitleKey == '1'">
           <a-card class="card-api">
            <a-space direction="vertical">
              <a-alert message="通过'this.$byfUploadVideo(params)'方法调起上传组件, 此方法会返回一个promise对象。适用于需要diy视频预览效果的" type="info" show-icon />
              <a-card title="传参">
                <a-table :columns="videoUploadTableData.columns1" :dataSource="videoUploadTableData.dataSource1" :pagination="false">
                  <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
                </a-table>
              </a-card>
              <a-card title="结果回调 Promise.then(res=>{ /**some business*/})">
                <a-table :columns="videoUploadTableData.columns2" :dataSource="videoUploadTableData.dataSource2" :pagination="false"></a-table>
              </a-card>
            </a-space>
          </a-card>
          <a-card title="byfUploadBtn API" class="card-api">
            <a-space direction="vertical">
              <a-alert message="一个有默认样式的上传组件按钮。" type="info" show-icon />
              <a-card title="传参">
                <a-table :columns="videoUploadTableData.columns1" :dataSource="videoUploadTableData.dataSource3" :pagination="false">
                  <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
                </a-table>
              </a-card>
              <a-card title="事件">
                <a-table :columns="videoUploadTableData.columns4" :dataSource="videoUploadTableData.dataSource4" :pagination="false"></a-table>
              </a-card>
            </a-space>
          </a-card>
        </div>
        <div v-show="noTitleKey == '2'">
          <a-card title="byfUploadMultiple API" class="card-api">
            <a-space direction="vertical">
              <a-card>
                <a-row type='flex' justify="end">
                  <a-col>
                    <byf-icon id="tag-read" :data-clipboard-text="byfUploadMultipleHtml" style="fontSize:16px" @click='copy()' type="iconcc-copy"/>
                  </a-col>
                </a-row>
                <pre v-text="byfUploadMultipleHtml">
                </pre>
              </a-card>
              <a-card title="传参">
                <a-table :columns="UploadMultiple.columns1" :dataSource="UploadMultiple.dataSource1" :pagination="false">
                </a-table>
              </a-card>
              <a-card title="事件">
                <a-table :columns="UploadMultiple.columns2" :dataSource="UploadMultiple.dataSource2" :pagination="false"></a-table>
              </a-card>
            </a-space>
          </a-card>
        </div>
      </a-card>
      
    </a-col>
  </a-row>
</template>
<script>
import Clipboard from "clipboard";
export default {
  name: 'demoUpload',
  data(){
    return {
      tabListNoTitle: [
        {
          key: '0',
          tab: '图片上传'
        },
        {
          key: '1',
          tab: '视频上传'
        },
        {
          key: '2',
          tab: '图片批量上传'
        }
      ],
      noTitleKey: '0',
      videoPlainOptions: [
        {
          label: '单选',
          value: 0,
        },
        {
          label: '多选(multiple && maximum = 5)',
          value: 1
        }
      ],
      currentRadio: 0,
      imgUploadTableData: {
        columns1: [
          { title: '参数', dataIndex: 'param' },
          { title: '说明', dataIndex: 'description' },
          { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
          { title: '默认值', dataIndex: 'default' }
        ],
        dataSource1: [
          { key:'1', param: 'multiple', description: '是否支持多选,true：多选。false：单选', type: 'boolean',default: 'false'},
          { key:'2', param: 'imgsList', description: '外部已经在使用的图片列表', type: 'Array<ImgUrl>',default: '[图片地址]'},
          { key:'3', param: 'type(暂不支持)', description: '要选择的多媒体类型。img:图片;video:视频;file:文件', type: 'string',default: 'img'},
          { key:'4', param: 'maximum', description: '上传数量限制，不传或传0为不限制', type: 'number',default: '0'},
        ],
        columns2: [
          { title: '参数', dataIndex: 'param' },
          { title: '说明', dataIndex: 'description' },
          { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
          { title: '默认值', dataIndex: 'default' }
        ],
        dataSource2: [
          { key:'1', param: 'action', description: "用户操作：'confirm':用户点击了确认,'cancel':用户点击取消或关闭。", type: 'string',default: ''},
          { key:'2', param: 'selectedImgs', description: "当action=confirm时会有此参数，表示选中的图片", type: 'Array<ImgObj>',default: ''},
        ],
        dataSource3: [
          { key:'1', param: 'imgsList', description: '图片地址数组', type: 'Array<String>',default: 'false'},
          { key:'2', param: 'size', description: '按钮尺寸。small、normal', type: 'string',default: 'normal'}
        ],
        columns4: [
          { title: '事件名称', dataIndex: 'eventName' },
          { title: '说明', dataIndex: 'description' },
          { title: '回调参数', dataIndex: 'callBack' }
        ],
        dataSource4: [
          { key:'1', eventName: 'change', description: '当选中或删除图片触发', callBack: 'function(Array<imgUrls>, Array<imgObj>)'}
        ],
      },
      videoUploadTableData: {
        columns1: [
          { title: '参数', dataIndex: 'param' },
          { title: '说明', dataIndex: 'description' },
          { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
          { title: '默认值', dataIndex: 'default' }
        ],
        dataSource1: [
          { key:'1', param: 'multiple', description: '是否支持多选,true：多选。false：单选', type: 'boolean',default: 'false'},
          { key:'2', param: 'videosList', description: '外部已经在使用的视频列表，每项需至少包含一个视频url', type: 'Array<{url: string, ...}>',default: '[视频地址]'},
          { key:'4', param: 'maximum', description: '上传数量限制，不传或传0为不限制', type: 'number',default: '0'},
        ],
        columns2: [
          { title: '参数', dataIndex: 'param' },
          { title: '说明', dataIndex: 'description' },
          { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
          { title: '默认值', dataIndex: 'default' }
        ],
        dataSource2: [
          { key:'1', param: 'action', description: "用户操作：'confirm':用户点击了确认,'cancel':用户点击取消或关闭。", type: 'string',default: ''},
          { key:'2', param: 'selectedVideos', description: "当action=confirm时会有此参数，表示选中的视频", type: 'Array<VideoObj>',default: ''},
        ],
        dataSource3: [
          { key:'1', param: 'videosList', description: '视频地址数组', type: 'Array<{url: string, ...}>',default: 'false'}
        ],
        columns4: [
          { title: '事件名称', dataIndex: 'eventName' },
          { title: '说明', dataIndex: 'description' },
          { title: '回调参数', dataIndex: 'callBack' }
        ],
        dataSource4: [
          { key:'1', eventName: 'change', description: '当选中或删除视频触发', callBack: 'function(Array<{url: string, ...}>)'}
        ],
      },
      UploadMultiple:{
        columns1: [
          { title: '参数', dataIndex: 'param' },
          { title: '说明', dataIndex: 'description' },
          { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
          { title: '默认值', dataIndex: 'default' }
        ],
        dataSource1: [
          { key:'1', param: 'multiple', description: '是否支持多选,true：多选。false：单选', type: 'boolean',default: 'false'},
          { key:'2', param: 'imgsList', description: '外部已经在使用的图片列表', type: 'Array<ImgUrl>',default: '[图片地址]'},
          { key:'3', param: 'maximum', description: '上传数量限制，不传或传0为不限制', type: 'Number',default: '0'},
          { key:'4', param: 'format', description: '上传格式,png gif jpg jpeg', type: 'Array["png"]',default: '[]'},
          { key:'5', param: 'color', description: '边框颜色，"default" "primary" "danger"', type: 'String',default: 'default'},
        ],
        columns2: [
          { title: '事件名称', dataIndex: 'eventName' },
          { title: '说明', dataIndex: 'description' },
          { title: '回调参数', dataIndex: 'callBack' }
        ],
        dataSource2:[
          { key:'1', eventName: 'change', description: '当选中或删除图片触发', callBack: 'function(Array<imgUrls>, Array<imgObj>)'}
        ]
      },
      imgUrl1: '',
      imgList: [],
      videoList: [],
      imgListAll:[],
      byfUploadMultipleHtml:`
        <byf-upload-multiple 
          @change="change" 
          :maximum="3" 
          :multiple="true" 
          :format="['png','gif','jeg','jpeg']"
          :color="'defalut'"
          :imgsList="imgListAll">
        </byf-upload-multiple>
      `
    }
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
    changeGuidePage(value){
      console.log(value)
      this.imgListAll = value
    },
    onBtn1Click(){
      this.$byfUpload({multiple: false, imgsList: [this.imgUrl1]}).then(res => {
        if (res.action == 'confirm') {
          if(res.selectedImgs.length > 0){
            this.imgUrl1 = res.selectedImgs[0].url;
          }else{
            this.imgUrl1 = ''
          }
        } else {
          this.$message.info('用户点击取消')
        }
      });
    },
    onBtn2Click(){
      this.$byfUpload({multiple: true, imgsList: this.imgList, maximum: 5}).then(res => {
        if (res.action == 'confirm') {
          this.imgList = [];
          res.selectedImgs.forEach(item => {
            this.imgList.push(item.url)
          });
        } else {
          this.$message.info('用户点击取消')
        }
      });
    },
    videoRadioChange(){
      this.videoList = [];
    },
    onBtn3Click(){
      let [multiple, maximum] = [false, 0]
      if(this.currentRadio == 1){
        [multiple, maximum] = [true, 5]
      }
      console.log(this.videoList)
      this.$byfUploadVideo({multiple, videosList: this.videoList, maximum}).then(res => {
        if (res.action == 'confirm') {
          this.videoList = [];
          res.selectedVideos.forEach(item => {
            this.videoList.push(item)
          });
        } else {
          this.$message.info('用户点击取消')
        }
      });
    },
    copy() {
      let _this = this
      var clipboard = new Clipboard('#tag-read')

      clipboard.on('success', function() {
        _this.$message.success("复制成功")
      })
        clipboard.on('error', function(){
        _this.$message.success("复制成功")
      })
      setTimeout(()=>{
        clipboard.destroy();
      },1000)
    },
  }
}
</script>
<style lang="less" scoped>
.card-api {
  .ant-space {
    width: 100%;
  }
}
.anticon {
  margin: 10px;
  font-size: 60px;
}
.video-wrap{
  video{
    width: 178px;
    height: 98px;
    border: 1px solid #e9edef;
    background: #f4f6f8;
    margin-right: 5px;
  }
}
</style>