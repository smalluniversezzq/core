<template>
  <div>
    <byf-space direction="vertical">
      <a-card>
        <byf-space direction="vertical">
          <div class="head-title">
            标记展示页面
          </div>
          
          <div class="stamp-list">
            <a-row :gutter="10">
              <a-spin style="width: 100%;" :spinning="favoriteLoading">
                <a-col :span="6" class="item-card" v-for="(item, index) in favoriteList" :key="index">
                  <a-card class="card">
                    <div class="item-wrap">
                      <div class="img-wrap">
                        <img v-if="item.preview" :src="item.preview" alt="">
                        <img style="object-fit: cover;height: 100%" v-else src="@/assets/img/renovation/banner.png" alt="">
                        <div class="mask" v-if="item.is_audit == 1">审核模板</div>
                      </div>
                      <div class="desc-wrap">
                        <byf-space direction="vertical" :size="10">
                          <div class="type-wrap">{{PageTypeKeyMap[item.page_type_group]}}</div>
                          <div class="title">{{item.title}}</div>
                          <div class="time">
                            修改时间：{{moment.unix(item.updated_at).format('YYYY-MM-DD HH:mm:ss')}}
                          </div>
                          <div class="icon-wrap">
                            <byf-space v-if="item.device_type==1">
                              <byf-icon class="icon" type="iconanzhuo3"></byf-icon>
                              <byf-icon class="icon" type="iconapple"></byf-icon>
                            </byf-space>
                          </div>
                          <div class="version">
                            版本：{{handleVersion(item)}}
                          </div>
                          <div class="btns">
                            <byf-space>
                              <a-button type="primary" ghost size="small" @click="$refs.table.goDiy(item)">装修</a-button>
                              <a-button type="link" size="small" @click="$refs.table.showAddOrEdit(item)">编辑</a-button>
                            </byf-space>
                          </div>
                        </byf-space>
                      </div>
                    </div>
                    <div class="close-icon" @click="$refs.table.doFavorite(item, 0)">
                      +
                    </div>
                  </a-card>
                </a-col>
              </a-spin>
              <a-empty v-if="favoriteList.length == 0 && !favoriteLoading"></a-empty>
            </a-row>
          </div>
        </byf-space>
      </a-card>
      <a-card>
        <a-form-model
          ref="searchForm"
          :model="searchFormData"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row>
            <a-col :lg="12" :xl="8" :xxl="6">
              <a-form-model-item label="页面名称" prop="title">
                <a-input
                  v-model="searchFormData.title"
                  placeholder="请输入页面名称"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6">
              <a-form-model-item label="终端类型" prop="device_type">
                <a-select v-model="searchFormData.device_type" placeholder="请选择终端" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option :value="1"> APP </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6" v-if="searchFormData.device_type==1">
              <a-form-model-item label="适用设备" prop="apply_os">
                <a-select v-model="searchFormData.apply_os" placeholder="请选择设备" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option value="android"> 安卓 </a-select-option>
                  <a-select-option value="ios"> 苹果 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6">
              <a-form-model-item label="状态" prop="status">
                <a-select v-model="searchFormData.status" placeholder="请选择终端" 
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode || document.body}"
                >
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option :value="1"> 应用中 </a-select-option>
                  <a-select-option :value="0"> 禁用 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :lg="12" :xl="8" :xxl="6">
            <a-form-model-item :wrapper-col="{ offset: labelCol.span }">
              <a-space>
                <a-button type="primary" @click="search">搜索</a-button>
                <a-button type="link" size="small" @click="resetSearch">重置</a-button>
              </a-space>
            </a-form-model-item>
          </a-col>
          </a-row>
        </a-form-model>
      </a-card>
      <pageTable ref="table" :condition="searchFormData" @changeFavorite="onChangeFavorite"></pageTable>
    </byf-space>

    
  </div>
</template>

<script>
import pageTable from './table';
import {PageTypeKeyMap} from '../common'
import moment from 'moment'
import { getAdminPlatformDesignIndexFavorite } from '@/services/admin/platform/designPage'

let defaultSearchFormData = { title: "", device_type: "", apply_os:"", status: '',}
export default {
  components: {
    pageTable
  },
  data(){
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      searchFormData: JSON.parse(JSON.stringify(defaultSearchFormData)),
      favoriteList: [],
      PageTypeKeyMap,
      moment,
      favoriteLoading: true,
    }
  },
  created(){
    this.getAdminPlatformDesignIndexFavorite()
  },
  methods: {
    getAdminPlatformDesignIndexFavorite(){
      this.favoriteLoading = true;
      getAdminPlatformDesignIndexFavorite().then(res => {
        console.log(res)
        if(res.code == 200){
          this.favoriteList = res.data.favorite;
        }
      }).finally(() => {
        this.favoriteLoading = false;
      })
    },
    // 条件搜索
    search() {
      this.$refs.table.search();
    },
    // 重置搜索
    resetSearch() {
      this.searchFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
      this.$nextTick(() => {
        this.search();
      })
      
    },
    onChangeFavorite(){
      // this.favoriteList = list
      this.getAdminPlatformDesignIndexFavorite();
    },
    handleVersion(item){
      if(item.version_start == null){
        return '全部版本'
      } else if(item.version_end == null) {
        return 'V'+item.version_start
      } else {
        return 'V'+item.version_start+' ~ V'+item.version_end
      }
    }
  }
}
</script>

<style scoped lang="less">
.head-title{
  background-color: #f0f2f5;
  padding: 5px 10px;
}
.stamp-list{
  .item-card{
    width: 380px;
    margin-bottom: 10px;
    /deep/ .ant-card-body{
      padding: 10px;
    }
    .card{
      position: relative;
      overflow: hidden;
      &:hover .close-icon{
        display: block;
      }
      .close-icon{
        cursor: pointer;
        display: none;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
        text-align: center;
        font-size: 28px;
        transform: skew(-0deg, -0deg) rotate(-45deg);
        position: absolute;
        top: -24px;
        right: -4px;
        background: #d4d4d4;
        color: #fff;
      }
    }
    .item-wrap{
      display: flex;
      .img-wrap{
        flex-shrink: 0;
        width: 126px;
        height: 181px;
        overflow: hidden;
        position: relative;
        .mask{
          width: 100%;
          position: absolute;
          text-align: center;
          bottom: 0;
          background: rgba(0, 0, 0, .5);
          color: #fff;
          font-size: 12px;
        }
        img{
          width: 100%;
        }
      }
      .desc-wrap{
        min-width: 0;
        padding-left: 10px;
        .type-wrap{
          background: #fff7e6;
          display: inline-block;
          padding: 2px 5px;
        }
        .title{
          font-weight: bold;
          overflow:hidden;
          text-overflow:ellipsis; 
          white-space:nowrap
        }
        .icon-wrap{
          .icon{
            font-size: 20px;
            color: #27b148;
          }
        }
        .time, .version{
          font-size: 13px;
          color: #a0a0a0;
          overflow:hidden;
          text-overflow:ellipsis; 
          white-space:nowrap
        }
        
      }
    }
  }
}
</style>