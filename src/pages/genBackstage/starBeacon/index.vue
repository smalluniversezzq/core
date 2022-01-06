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
import { getAdminFavoriteAppList } from "@/services/platform";
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
  computed:{
    ...mapGetters("account", ['user']),
  },
  created() {
    this.getAdminFavoriteAppList(this.pagination);
    this.getAdminUserInfo();
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
        this.getAdminFavoriteAppList(this.pagination);
        return;
      }
      this.selectedSort = this.listParams.sort = item.type;
      console.log(this.selectedSort)
      this.getAdminFavoriteAppList(this.pagination);
    },
    pageSizeChange(current, pageSize){
      this.pagination.pageSize = pageSize;
      this.pagination.current = 1;
      console.log(this.pagination)
      this.getAdminFavoriteAppList(this.pagination);
    },
    onChange(currentPage){
      this.pagination.current = currentPage;
      this.getAdminFavoriteAppList(this.pagination);
    },
    favoriteChange(data){
      data.item.favorite = data.favorite;
      this.list.splice(this.list.findIndex((value) => value.pmid == data.item.pmid), 1);
    },
    getAdminFavoriteAppList(pageData) {
      this.listSpinning = true;
      getAdminFavoriteAppList({page: pageData.current, page_size: pageData.pageSize, ...this.listParams}).then(res => {
        if (res.code == 200) {
          res.data.list.map((item) => {
            item.spinning = false;
          })
          this.list = res.data.list;
          pageData.total = res.data.pages.total;
          this.paginationOfUser = { ...this.paginationOfUser, ...pageData};
        }
      }).finally(() => {
        this.listSpinning = false;
      });
    },
    onSearch() {
      this.pagination.current = 1;
      this.getAdminFavoriteAppList(this.pagination);
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
}
.paginationBox{
  display: flex;
  justify-content: space-between;
}
</style>
