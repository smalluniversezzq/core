<template>
  <div class="header">
    <a-dropdown :trigger="['click']" v-model="show">
      <div slot="overlay">
        <a-spin :spinning="loading">
          <byf-tabs class="dropdown-tabs" :tabBarStyle="{textAlign: 'center'}" :style="{width: '297px'}">
            <byf-tab-pane tab="通知" key="1">
              <a-list class="tab-pane">
                <a-list-item class="pointer" v-for="item in noticeList" :key="item.id">
                  <a-list-item-meta>
                    <span slot="title">
                      <a-badge v-show="item.status == 0" style="position: absolute;" :offset="[-18, 10]" dot></a-badge>
                      {{item.title}}
                    </span>
                    <span slot="description">
                      {{item.time}}
                    </span>
                  </a-list-item-meta>
                </a-list-item>
                <div class="more" v-if="noticeList.length > 0">
                  <a href="javascript:;">查看更多</a>
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
      <span @click="fetchNotice" class="header-notice">
        <a-badge class="notice-badge" count="12" style="transform(scale(0.5))">
          <a-icon :class="['header-notice-icon']" type="bell" />
        </a-badge>
      </span>
    </a-dropdown>
    </div>
</template>

<script>
export default {
  name: 'HeaderNotice',
  components: {
  },
  data () {
    return {
      loading: false,
      show: false,
      noticeList: []
    }
  },
  computed: {
  },
  created(){
  },
  methods: {
    fetchNotice () {
      if (this.loading) {
        this.loading = false
        return
      }
      this.loadding = true
      setTimeout(() => {
        this.loadding = false
      }, 1000)
    }
  }
}
</script>

<style lang="less">
  .header{
    line-height: 20px;
  }
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
