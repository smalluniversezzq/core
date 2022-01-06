<template>
  <byf-space class="vips-item">
    <a-avatar class="avatar" :size="24" icon="user" :src="item.avatar" />
    <!-- <a-tag class="tags-status" color="#108ee9" v-if="item.status == 1">正常</a-tag> -->
    <a-tag class="tags-status disabled" v-if="item.status == 0 || item.status == 2">
      {{item.status == 0 ? '禁用' : '注销'}}
    </a-tag>
    <span class="vips-name" 
      :style="{color: (item.status == 0 || item.status == 2) ? '#808080' : '#108ee9'}">
      <span>{{item.nickname ? item.nickname : '暂无昵称'}}</span>
      <span>{{item.realname ? `（${item.realname}）` : '（暂无姓名）'}}</span>
    </span>
    <span v-show="item.is_fans == 0 && item.level_name" class="level-name">[{{item.level_name}}] </span>
    <span v-show="item.is_fans == 0">· 会员ID：{{item.no}} </span>
    <span v-show="item.is_fans == 0">· 联系电话：{{item.mobile}} </span>
    <span v-show="item.is_fans == 0">· 注册时间：{{moment.unix(item.register_time).format("YYYY-MM-DD")}} </span>
    <span v-show="item.is_fans == 1" style="color: #ff5733">微信锁粉用户</span>
  </byf-space>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data(){
    return {
      moment
    }
  }
}
</script>

<style scoped lang="less">
.vips-item{
  .level-name{
    color:#43cf7c;
  }
  .vips-name{
    &.status-1{
      color: ''
    }
    &.status-0{
      color: '#808080'
    }
  }
  .avatar{
    margin-top: -5px;
  }
  .tags-status{
    &.disabled{
      color: rgba(0,0,0,.25);
      background-color: #f5f5f5;
    }
  }
}
</style>