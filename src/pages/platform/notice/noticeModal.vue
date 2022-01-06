<template>
  <div>
    <a-modal
      :maskClosable="false" :z-index="9999" :width="800" v-model="visible">
      <span slot="title">
        通知正文
        <span class="not-read-num" v-if="noticeNotReadNum > 0">（未读：{{noticeNotReadNum}}）</span>
      </span>
      <div class="beauty-scroll notice-content">
        <div class="notice-title">
          <p class="title">
            <a-tag color="#ff5500" v-if="data.importance == 1"> 重要 </a-tag>
            {{data.title}}
          </p>
          <p class="time">{{momentDate(data.release_time)}}</p>
        </div>
        <div class="wangeditor-content" v-html="data.content"></div>
      </div>
      <div slot="footer"  class="footer">
        <byf-space v-show="data.is_read == 0">
          <a-button type="primary" :loading="loading" @click="read([data.id])">我已阅读</a-button>
          <a-button @click="modalCancel">暂不了解</a-button>
        </byf-space>
        <a-button v-show="data.is_read == 1" @click="modalCancel" type="primary">关闭</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { coreNoticeRead } from '@/services/platformNotice'
import moment from 'moment'
export default {
  data(){
    return {
      visible: false,
      data: {},
      loading: false,
    }
  },
  computed: {
    ...mapState('notice', ['noticeNotReadNum']),
  },
  methods: {
    ...mapMutations('notice', ['setRead', 'setNoticeNotReadNum']),
    momentDate(timeStamp){
      return moment.unix(timeStamp).format("YYYY-MM-DD HH:mm:ss")
    },
    showModal(data){
      this.data = data;
      this.visible = true;
    },
    read(ids){
      // 我已阅读
      this.loading = true;
      coreNoticeRead({id: ids}).then(res => {
        if(res.code == 200){
          this.setRead(ids);
          this.setNoticeNotReadNum(this.noticeNotReadNum - 1)
          this.modalCancel();
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    modalCancel(){
      this.$emit('modalCancel', this.data)
      this.visible = false;
    }
  },
}
</script>

<style scoped lang="less">
.not-read-num{
  font-size: 12px;
  color: rgba(255, 141, 26, 1);
}
.notice-title{
  text-align: center;
  .title{
    font-weight: bold;
  }
  .time{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
.notice-content{
  max-height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.footer{
  text-align: center;
}
</style>