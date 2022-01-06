<!-- 客服配置 -->
<template>
  <div>
    <div class="config-title">
      <h1>在线客服配置</h1>
      <p class="tip">用于向用户提供即使通讯形式的在线客服服务，可以与电话客服同时开启</p>
    </div>
      <a-row :gutter="[10, 10]">
        <a-col class="item" :span="5" v-for="(item, index) in typeList" :key="index">
          <a-card class="cardShare" :style="{backgroundImage: 'url(' + item.bgImg + ')'}">
            <div class="content">
              <div class="title">{{item.title}}</div>
              <a-button class="btnLink" type="link" @click.prevent="toMould(item, link)"
              v-for="(link, linkIndex) in item.link" :key="linkIndex"
            >
            {{link.title}}</a-button>
              <div class="status">
                <a-switch v-model="item.status"/>
                <byf-icon @click="showModel(item)" class="icon" type="iconshezhi"></byf-icon>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <br/>
      <div class="config-title">
        <h1>电话客服配置</h1>
        <p class="tip">用于提供拨打客服电话功能，可以与在线客服同时开启</p>
      </div>
      <a-row :gutter="[10, 10]">
        <a-col class="item" :span="5" v-for="(item, index) in typeList2" :key="index">
          <a-card class="cardShare" :style="{backgroundImage: 'url(' + item.bgImg + ')'}">
            <div class="content">
              <div class="title">{{item.title}}</div>
               <a-button class="btnLink" type="link" @click.prevent="toMould(item, link)"
              v-for="(link, linkIndex) in item.link" :key="linkIndex"
            >
            {{link.title}}</a-button>
              <div class="status">
                <a-switch v-model="item.status"/>
                <byf-icon @click="showModel(item)" class="icon" type="iconshezhi"></byf-icon>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    <a-modal :maskClosable="false"
      :destroyOnClose="true"
      :title="currentFormData.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="45%"
    >
      <a-form-model
          ref="form"
          :model="formData"
          :label-col="{span: 6}"
          :wrapper-col="{span: 18}"
        >
          <a-form-model-item label="客服电话" prop="app_key">
            <a-input placeholder="请输入客服电话" v-model="formData.app_key" />
          </a-form-model-item>
          <a-form-model-item label="每日接线时间" prop="date">
            <a-row>
              <a-col :span="11">
                <a-time-picker style="width: 100%" placeholder="开始时间" v-model="start_time" />
              </a-col>
              <a-col :span="2" style="text-align:center">
                —
              </a-col>
              <a-col :span="11">
                <a-time-picker style="width: 100%" placeholder="结束时间" v-model="end_time" />
              </a-col>
            </a-row>
          </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import bg1 from '@/assets/img/platformSetting/5.png'
import bg2 from '@/assets/img/platformSetting/2.png'
import bg3 from '@/assets/img/platformSetting/3.png'
import bg4 from '@/assets/img/platformSetting/4.png'
export default {
  data(){
    return {
      typeList: [
        
        {
           id: 3,
          title: '美洽客服',
          hasService: false,
          storage_drive: '',
          status: false,
          params: {
          },
          rules: {},
          bgImg: bg1,
          link: [
            {
              link: '',
              title: '前往开通服务'
            },
            {
              link: '',
              title: ''
            },
          ],
        },
        {
          id: 2,
          title: '网易七鱼',
          hasService: false,
          storage_drive: '',
          status: false,
          params: {
          },
          rules: {},
          bgImg: bg2,
          link: [
            {
              link: '',
              title: '前往开通服务'
            },
            {
              link: '',
              title: ''
            },
          ],
        },
        {
          id: 3,
          title: '阿里云客服',
          hasService: false,
          storage_drive: '',
          status: false,
          params: {
          },
          rules: {},
          bgImg: bg3,
          link: [
            {
              link: '',
              title: '前往开通服务'
            },
            {
              link: '',
              title: ''
            },
          ],
        },
      ],
      typeList2: [
        {
          id: 0,
          title: '电话客服',
          hasService: false,
          storage_drive: '',
          status: false,
          params: {
          },
          rules: {},
          bgImg: bg4,
          link: [
            {
              link: '',
              title: '前往开通服务'
            },
            {
              link: '',
              title: ''
            },
          ],
        },
      ],
      visible: false,
      formData: {
        id: 0,
        app_key: '',
        app_secret: '',
        app_code: '',
        verify_idcard: false,
        face_recognition: false,
        date: '',
        start_time: '',
        end_time: ''
      },
      start_time: '',
      end_time: '',
      currentFormData: {
        title: '',
        id: 0
      },
      confirmLoading: false,
    }
  },
  methods: {
    showModel(item){
      this.currentFormData.title = item.title;
      this.formData.id = item.id;
      this.visible = true;
    },
    handleOk(){
      this.formData.start_time = moment(this.start_time).unix();
      this.formData.end_time = moment(this.end_time).unix();
    },
    handleCancel(){
      this.visible = false;
    }
  },
}
</script>

<style scoped lang="less">
/deep/ .ant-switch-checked {
        background-color:#25bb30;;
      }
.item{
  min-width: 300px;
  .cardShare{
    background-repeat:no-repeat;
    background-size: 100% 100%;
    border-radius: 6px;
    overflow: hidden;
    color: #fff;
  }
  .content{
    .title{
      font-weight: bold;
      font-size: 16px;
    }
    .btnLink{
      color: #fff;
      padding: 0;
      display: block;
      &:last-of-type{
        margin-bottom: 10px;
      }
    }
    .status{
      display: flex;
      justify-content: space-between;
      .icon{
        margin-top: 4px;
        font-size: 16px;
        display: block;
      }
    }
  }
}
.config-title{
  padding-left: 5px;
  h1{
    font-weight: bold;
  }
}
.tip{
  color: #a0a0a0;
  font-size: 14px;
  line-height: 20px;
}
</style>