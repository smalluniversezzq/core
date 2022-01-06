<template>
<div>
    <a-dropdown :trigger="['click']" v-model="show">
      <div slot="overlay">
        <a-spin :spinning="loading">
          <byf-tabs class="dropdown-tabs" :tabBarStyle="{textAlign: 'center'}" :style="{width: '297px'}">
            <byf-tab-pane key="1">
              <template slot="tab">
                <span>通知</span>
                <span v-if="noticeNotReadNum > 0">（ {{noticeNotReadNum}}）</span>
              </template>
              <a-list class="tab-pane">
                <a-list-item class="pointer" v-for="item in noticeListForTabPane" :key="item.id" @click="showNoticeModal(item)">
                  <a-list-item-meta>
                    <div slot="title" style="width: 260px" class="text-overflow-1">
                      <a-badge v-show="item.is_read == 0" style="position: absolute;" :offset="[-18, 10]" dot></a-badge>
                      {{item.title}}
                    </div>
                    <span slot="description">
                      {{momentDate(item.release_time)}}
                    </span>
                  </a-list-item-meta>
                </a-list-item>
                <div class="more" v-if="noticeListForTabPane.length > 0">
                  <a href="javascript:;" @click="more">查看更多</a>
                </div>
              </a-list>
            </byf-tab-pane>
            <byf-tab-pane tab="消息" key="2">
              <a-list class="tab-pane"></a-list>
            </byf-tab-pane>
            <!-- <byf-tab-pane tab="待办" key="3">
              <a-list class="tab-pane"></a-list>
            </byf-tab-pane> -->
          </byf-tabs>
        </a-spin>
      </div>
      <span @click="getNotice" class="header-notice">
        <a-badge class="notice-badge" :count="noticeNotReadNum" style="transform(scale(0.5))">
          <a-icon :class="['header-notice-icon']" type="bell" />
        </a-badge>
      </span>
    </a-dropdown>
    <noticeModal ref="noticeModal"></noticeModal>
  </div>
</template>

<script>
import noticeModal from './notice/noticeModal'
import { getCoreNoticeNotRead, getCoreNoticeIndex } from '@/services/platformNotice'
import moment from 'moment'
import { mapState, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'HeaderNotice',
  components: {
    noticeModal
  },
  data () {
    return {
      loading: false,
      show: false
    }
  },
  computed: {
    ...mapState('notice', ['noticeNotReadNum']),
    ...mapGetters('notice', ['noticeListForTabPane'])
  },
  created(){
    console.log(this.noticeList)
    this.getNotice();
  },
  methods: {
    ...mapMutations('notice', ['setNoticeTabPaneList', 'setNoticeNotReadNum']),
    momentDate(timeStamp){
      return moment.unix(timeStamp).fromNow();
    },
    getNotice(){
      if(!this.show){ 
        this.getCoreNoticeIndex();
        this.getCoreNoticeNotRead();
      }
    },
    getCoreNoticeIndex(){
      getCoreNoticeIndex({page_size: 4, page: 1}).then(res => {
        if(res.code == 200){
          this.setNoticeTabPaneList(res.data.list)
        }
      })
    },
    getCoreNoticeNotRead(){
      this.loading = true;
      getCoreNoticeNotRead().then(res => {
        console.log(res)
        if(res.code == 200){
          // 设置未读数量
          this.setNoticeNotReadNum(res.data.number)
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    more(){
      this.show = false;
      if(this.$route.name != 'platformNotice'){
        this.$router.push({name: 'platformNotice'})
      }
    },
    showNoticeModal(data){
      this.show = false;
      this.$refs.noticeModal.showModal(data);
    },
  }
}
</script>

<style lang="less">
  .header-notice{
    display: inline-block;
    transition: all 0.3s;
    span {
      vertical-align: initial;
    }
    .notice-badge{
      color: inherit;
      .header-notice-icon{
        font-size: 16px;
        padding: 4px;
      }
    }
  }
  .dropdown-tabs{
    background-color: @base-bg-color;
    box-shadow: 0 2px 8px @shadow-color;
    border-radius: 4px;
    .more{
      text-align: center;
      margin-top: 10px;
      cursor: pointer;
    }
    .tab-pane{
      padding: 0 24px 12px;
      min-height: 250px;
    }
  }
  .pointer{
    cursor: pointer;
  }
  .ant-badge-dot{
    width: 8px;
    height: 8px;
  }
</style>
