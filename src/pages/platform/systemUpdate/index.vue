<template>
  <div>
    <a-card>
      <template slot="title">
        更新记录
      </template>
      <div v-infinite-scroll="handleInfiniteOnLoad" :infinite-scroll-disabled="finished" :infinite-scroll-distance="10">
        <a-timeline class="timeline-wrap">
          <a-timeline-item class="timeline-item" v-for="item in data" :key="item.id">
            <div class="timeline-box">
              <div class="timeline-title">
                <byf-icon v-if="item.is_show == 0" type="iconyincang"></byf-icon>
                <span> {{item.title}} </span>
              </div>
              <ul class="update-list" v-if="item.update_items.length > 0">
                <li class="update-item" v-for="(lineItem, lineIndex) in item.update_items" :key="'lineItem' + lineIndex">
                  {{lineItem}}
                </li>
              </ul>
              <div class="timeline-time">
                {{moment.unix(item.release_time).format("YYYY-MM-DD")}}
              </div>
            </div>
          </a-timeline-item>
          <!-- <a-timeline-item v-if="!pending && !finished">
            <a-button type="link" size="small">加载更多</a-button>
          </a-timeline-item> -->
          <template v-if="!finished" slot="pending">
            <a-button type="link" size="small">加载中...</a-button>
          </template>
        </a-timeline>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getAdminPlatformSystemUpdateIndex } from '@/services/admin/platform/platform/index'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll';
export default {
  directives: { infiniteScroll },
  data(){
    return {
      pending: false,
      finished: false,
      pagination: {
        total: 0,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 10,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
      data: [],
      moment,
    }
  },
  created(){
    this.getAdminPlatformSystemUpdateIndex(this.pagination)
  },
  mounted(){
    let scrollWrap = document.getElementsByClassName('tabs-view-content beauty-scroll')[0]
    scrollWrap.style.overflow = 'auto'
  },
  beforeDestroy(){
    let scrollWrap = document.getElementsByClassName('tabs-view-content beauty-scroll')[0]
    scrollWrap.style.overflow = 'overlay'
  },
  methods: {
    handleInfiniteOnLoad(){
      console.log('加载更多')
      this.getAdminPlatformSystemUpdateIndex(this.pagination);
    },
    getAdminPlatformSystemUpdateIndex(pageData){
      // 数据全部加载完毕，或 正在加载中，禁止调用接口
      if(this.finished || this.pending){
        return;
      }
      this.pending = true;
      getAdminPlatformSystemUpdateIndex({page: pageData.current, page_size: pageData.pageSize}).then(res => {
        if(res.code == 200){
          this.data = [...this.data, ...res.data.list];
          pageData.total = +res.data.pages.total;
          pageData.current += 1
          this.pagination = {...this.pagination, ...pageData}
          // 此次返回列表为最后一页，则加载完毕，标记状态
          if(res.data.list.length < pageData.pageSize){
            console.log('加载完所有数据')
            this.finished = true;
          }else{
            this.finished = false;
          }
        }
      }).finally(() => {
        this.pending = false;

        console.log(this.finished && this.pending)
      })
    }
  }
}
</script>

<style scoped lang="less">
.timeline-wrap{
  .timeline-item{
    padding-bottom: 0px;
    .timeline-box{
      line-height: 30px;
      margin-top: 15px;
      // margin-bottom: 10px;
      position: relative;
      top: -5px;
      ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .timeline-wrap{
        .ant-timeline-item{
          padding-bottom: 10px;
        }
      }
      .timeline-title{
        font-size: 16px;
        display: inline-block;
        .timeline-dropdown{
          display: none;
        }
        &:hover .timeline-dropdown{
          display: unset;
        }
      }
      .timeline-time{
        color: #F54F70;
      }
    }
  }
}
</style>