<template>
  <a-card>
    <a-row
      type="flex"
      justify="space-between"
    >
      <a-input-search
        placeholder="输入要搜索的平台/应用名称"
        style="width: 332px"
        allow-clear
        v-model="listParams.name"
        @search="onSearch"
      />
      <a-space class="header-right">
        <span>平台 : 可创建 {{user.platform_limit}}</span>
        <a-divider type="vertical" />
        <span style="color: #E53535;">已创建 {{user.platform_current}}</span>
        <a-divider type="vertical" />
        <span>剩余创建 {{user.platform_remain}}</span>
        <a-dropdown placement="bottomRight" :trigger="['click']">
          <a-button size="small" type="link">
            <byf-icon
            type="iconpaixu"
            style="font-size: 16px;"
          ></byf-icon>
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item :style="{background: (selectedSort == item.type) ? '#e6f7ff' : ''}" v-for="item in sortOption" :key="item.type" @click="sort(item)">
              <a href="javascript:;" :style="{color: (selectedSort == item.type) ? '#40a9ff' : ''}">{{item.name}}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-button
          type="primary"
          @click="goCreate"
          :disabled="user.platform_remain == 0"
        >添加平台</a-button>
      </a-space>
    </a-row>
    <a-spin :spinning="listSpinning">
    <div class="app-list-box">
      <div class="app-item" v-for="item in list" :key="item.pmid">
        <!-- TODO 后期typesList不需要再传，使用item里面的 -->
        <platformCard :item="item" :typeList="typesList" @favoriteChange="favoriteChange"></platformCard>
      </div>
    </div>
    
    <div v-show="list.length > 0" class="paginationBox">
      <span></span>
      <span>
        <br/>
        <a-pagination show-quick-jumper :show-total="pagination['show-total']" v-model="pagination.current" :page-size="pagination.pageSize" :page-size-options="pagination['page-size-options']" show-size-changer :total="pagination.total" @showSizeChange="pageSizeChange" @change="onChange"/>
      </span>
    </div>
    <div class="empty">
      <a-empty v-show="list.length == 0"/>
    </div>
    </a-spin>
  </a-card>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { getAdminRecycleAppList } from "@/services/platform";
import { getAdminUserInfo } from "@/services/main";
import platformCard from '@/pages/genBackstage/common/platformCard';
export default {
  components: {
    platformCard
  },
  data() {
    return {
      typesList: [
        {type: 0, name: "APP", icon: 'iconanzhuo'},
        // {type: 1, name: "微信", icon: 'iconweixin'},
        // {type: 2, name: "H5", icon: 'iconxiaochengxu'},
      ],
      list: [],
      listParams: {
        name: '', // 搜索平台名称
        sort: '',
      },
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 20,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      sortOption: [
        {type: 1, name: '按创建时间排序'},
        {type: 2, name: '按名称排序'}
      ],
      selectedSort: '',
      listSpinning: false,
    };
  },
  created() {
    this.getAdminRecycleAppList(this.pagination);
    this.getAdminUserInfo();
  },
  computed:{
    ...mapGetters("account", ['user']),
  },
  methods: {
    ...mapMutations("account", ["setUserPlatformCount"]),
    getAdminUserInfo(){
      getAdminUserInfo().then(res => {
        this.setUserPlatformCount({
          platform_limit: res.data.info.platform_limit,
          platform_current: res.data.info.platform_current,
          platform_remain: res.data.info.platform_remain,
        })
      })
    },
    sort(item){
      if(this.selectedSort == item.type){
        this.selectedSort = this.listParams.sort = '';
        this.getAdminRecycleAppList(this.pagination);
        return;
      }
      this.selectedSort = this.listParams.sort = item.type;
      console.log(this.selectedSort)
      this.getAdminRecycleAppList(this.pagination);
    },
    pageSizeChange(current, pageSize){
      this.pagination.pageSize = pageSize;
      this.pagination.current = 1;
      console.log(this.pagination)
      this.getAdminRecycleAppList(this.pagination);
    },
    onChange(currentPage){
      this.pagination.current = currentPage;
      this.getAdminRecycleAppList(this.pagination);
    },
    favoriteChange(data){
      data.item.favorite = data.favorite;
    },
    getAdminRecycleAppList(pageData) {
      this.listSpinning = true
      getAdminRecycleAppList({page: pageData.current, page_size: pageData.pageSize, ...this.listParams}).then(res => {
        if (res.code == 200) {
          res.data.list.map((item) => {
            item.spinning = false;
          })
          this.list = res.data.list;
          pageData.total = res.data.pages.total;
          this.pagination = { ...this.pagination, ...pageData};
        }
      }).finally(() => {
        this.listSpinning = false;
      });
    },
    onSearch() {
      this.pagination.current = 1;
      this.getAdminRecycleAppList(this.pagination);
    },
    goCreate(item) {
      if(item.pmid){
        this.$router.push({name: "createApp", query: {...item}});
      }else{
        this.$router.push({name: "createApp"});
      }
    }
  }
};
</script>
<style lang="less" scoped>
.app-list-box {
  display: flex;
  flex-wrap: wrap;
  .app-item{
    margin-top: 30px;
    margin-right: 30px;
  }
  .empty{
    margin: 10px auto;
  }
  .one-app {
    box-shadow: 1px 1px 4px #dedede;
    width: 304px;
    height: 159px;
    margin-top: 30px;
    margin-right: 30px;
    background: #f5f5f5;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    .stopStatus{
      position: absolute;
      bottom: 16px;
      right: 0;
      background: red;
      padding: 0 10px;
      color: #fff;
      font-size: 12px;
    }
    .statusMarker {
      width: 80px;
      // height: 50px;
      // padding-top: 30px;
      text-align: center;
      // border-top: 100px solid red;
      // border-right: 100px solid transparent;
      font-size: 12px;
      transform: skew(-0deg, -0deg) rotate(-45deg);
      position: absolute;
      top: 8px;
      left: -23px;
      background: #d4d4d4;
      &.refuse{
        background: red;
        color: #fff;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 555;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      color: #fff;
      font-size: 16px;
      padding-top: 20%;
    }
    /deep/ .ant-card-body {
      padding-bottom: 0;
      .app-avatar {
        margin-right: 20px;
      }
      .app-name {
        flex: 1;
      }
      .app-control {
        display: flex;
        flex-direction: column;
        font-size: 22px;
        .hoverBig:hover{
          transform:scale(1.2);
          -webkit-transform:scale(1.2);  /*兼容-webkit-引擎浏览器*/
          -moz-transform:scale(1.2);     /*兼容-moz-引擎浏览器*/
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
          font-size: 18px;
          color: rgba(44, 154, 78, 1);
          margin-right: 10px;
        }
      }
    }
  }
  .audit_status-1, .audit_status0 {  
    background: rgb(245, 245, 245);
  }
  .types{
    margin-top: 15px;
  }
}
.paginationBox{
  display: flex;
  justify-content: space-between;
}
</style>
