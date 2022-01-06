<template>
  <div>
    <a-spin :spinning="item.spinning">
      <a-card
        hoverable
        class="one-app"
        :class="'audit_status' + item.audit_status"
        :bordered="false"
        @click="goOneBizConsole(item)"
      >
        <div
          class="statusMarker refuse"
          v-show="item.audit_status != 1 || item.status == 0"
        >
          <span v-show="item.audit_status == 0">审核</span>
          <span v-show="item.audit_status == -1">拒绝</span>
          <span v-show="item.status == 0">停用中</span>
        </div>
        <div class="mask" v-show="item.limit_status == 1" @click.stop>
          限制使用
        </div>
        <a-row
          type="flex"
          justify="space-between"
        >
          <a-avatar
            class="app-avatar"
            shape="square"
            :size="67"
            :src="item.logo || 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3012764833,2867762648&fm=26&gp=0.jpg'"
          ></a-avatar>
          <div class="app-name" style="min-width: 0">
            <div class="name text-overflow-1">
              {{item.name}}
            </div>
            <div class="types">
              <typesIcon :list="typeList"></typesIcon>
            </div>
          </div>
          <div class="app-control">
            <byf-icon
              :style="{'color': item.favorite == 0 ? '' : 'red'}"
              class="collect-icon hoverBig"
              :type="item.favorite == 0 ? 'iconshoucang' : 'iconshoucang1'"
              @click.stop="setStarMark(item)"
            ></byf-icon>
            <byf-icon v-show="item.audit_status == 1" class="hoverBig" type="iconshezhi" @click.stop="goDetails(item)"></byf-icon>
          </div>
        </a-row>
        <a-row class="bottom-text" v-if="item.group">
          <byf-icon type="iconliwu"></byf-icon>
          <span class="text-overflow-1 group-name">{{item.group.name}}</span>
        </a-row>
      </a-card>
    </a-spin>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { platformAddFavorite, platformDelFavorite } from "@/services/platform";
import { getAdminSysMenuIndex } from "@/services/admin/sys/menu/index.js";

// TODO 后期不需要此参数，后期根据每个平台的数据进行渲染
import typesIcon from '@/pages/genBackstage/common/typesIcon'
export default {
  name: 'platformCard',
  components: {
    typesIcon
  },
  props: ['item', 'typeList'],
  data() {
    return {};
  },
  created() {},
  computed:{
  },
  methods: {
    ...mapMutations("setting", ["setPlatformInfo"]),
    setStarMark(item) {
      item.spinning = true;
      if(item.favorite == 0){
        // 不在星标中、添加星标
        platformAddFavorite({pmid: item.pmid}).then(res => {
          item.spinning = false;
          if(res.code == 200){
            this.$message.success(res.msg);
            this.$emit('favoriteChange', {item, favorite: 1});
            // item.favorite = 1;
          }
        })
      }else{
        // 已在星标中、删除星标
        platformDelFavorite({pmid: item.pmid}).then(res => {
          item.spinning = false;
          if(res.code == 200){
            this.$message.success(res.msg);
            this.$emit('favoriteChange', {item, favorite: 0});
            // item.favorite = 0;
          }
        })
      }
    },
    goDetails(item) {
      this.$router.push({
        name: "myAppDetails",
        query: { ...item }
      });
    },
    goCreate(item) {
      if(item.pmid){
        this.$router.push({name: "createApp", query: {...item}});
      }else{
        this.$router.push({name: "createApp"});
      }
    },
    goOneBizConsole(item) {
      if(item.audit_status != 1){
        this.goCreate(item);
        return;
      }
      if(item.status != 1){
        // 已被禁用
        return;
      }
      // 存储平台数据到store及storage
      this.setPlatformInfo(item)
      getAdminSysMenuIndex().then(res=>{
        this.$router.push(res);
      })
    },
  }
};
</script>
<style lang="less" scoped>
.one-app {
    box-shadow: 1px 1px 5px rgba(199, 199, 199, 0.5);
    width: 304px;
    height: 159px;
    // margin-top: 30px;
    // margin-right: 30px;
    // background: rgba(199, 227, 255, 0.27);
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    .statusMarker {
      width: 80px;
      // height: 50px;
      // padding-top: 30px;
      text-align: center;
      transform: skew(-0deg, -0deg) rotate(-45deg);
      position: absolute;
      top: 8px;
      left: -23px;
      background: #d4d4d4;
      &.refuse{
        background: rgba(229, 53, 53, 1);
        color: #fff;
      }
      span{
        font-size: 12px;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 555;
      background: rgba(0, 0, 0, 0.29);
      text-align: center;
      color: #fff;
      font-size: 22px;
      padding-top: 20%;
    }
    /deep/ .ant-card-body {
      padding-bottom: 0;
      .app-avatar {
        margin-right: 20px;
      }
      .app-name {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        flex: 1;
      }
      .app-control {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        .hoverBig:hover{
          transform:scale(1.3);
          -webkit-transform:scale(1.3);  /*兼容-webkit-引擎浏览器*/
          -moz-transform:scale(1.3);     /*兼容-moz-引擎浏览器*/
        }
        .anticon {
          cursor: pointer;
        }
        .collect-icon {
          margin-bottom: 10px;
        }
        .collect-icon-red {
          color: red;
        }
      }
      .bottom-text {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .anticon {
          font-size: 16px;
          color: rgba(44, 154, 78, 1);
          margin-right: 10px;
        }
        .group-name{
          font-size: 14px;
        }
      }
    }
  }
  .audit_status-1, .audit_status0 {  
    background:rgba(211, 212, 213, .27)
  }
  .types{
    margin-top: 9px;
  }
</style>
