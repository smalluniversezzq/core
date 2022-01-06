<template>
  <div>
    <a-card size="small">
      <template slot="title">
        数据展示：共{{pagination.total}}条数据
      </template>
      <template slot="extra">
        <div class="table-extra">
          <byf-button type="primary" @click="toAddOrEdit">+ 添加</byf-button>
        </div>
      </template>

      <div v-infinite-scroll="handleInfiniteOnLoad" :infinite-scroll-disabled="finished" :infinite-scroll-distance="10">
        <a-timeline class="timeline-wrap">
          <a-timeline-item class="timeline-item" v-for="item in data" :key="item.id">
            <div class="timeline-box">
              <div class="timeline-title">
                <byf-icon v-if="item.is_show == 0" type="iconyincang"></byf-icon>
                <span> {{item.title}} </span>
                <a-dropdown class="timeline-dropdown" :trigger="['hover']">
                  <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <a-icon type="more" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item key="0" @click="toAddOrEdit(item)">
                      修改
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="1" @click="delTimelineItem(item)">
                      删除
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
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
    <addOrEdit ref="addOrEdit" @saveSuccess="saveSuccess"></addOrEdit>
  </div>
</template>

<script>
import { getSystemUpdateIndex, systemUpdateDel } from '@/services/admin/core/systemUpdate/index'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll';
import addOrEdit from "./addOrEdit";
export default {
  directives: { infiniteScroll },
  components: {
    addOrEdit
  },
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
  mounted(){
    let scrollWrap = document.getElementsByClassName('gen-layout-content beauty-scroll')[0]
    scrollWrap.style.overflow = 'auto'
  },
  beforeDestroy(){
    let scrollWrap = document.getElementsByClassName('gen-layout-content beauty-scroll')[0]
    scrollWrap.style.overflow = 'overlay'
  },
  created(){
    this.getSystemUpdateIndex(this.pagination)
  },
  methods: {
    saveSuccess(data){
      if(data.id){
        // 修改
        let currentIndex = this.data.findIndex((item) => {
          return item.id == data.id;
        })
        this.$set(this.data, currentIndex, data)
      }else{
        // 新增
        this.finished = false
        this.pagination.current = 1;
        this.data = [];
        this.getSystemUpdateIndex(this.pagination)
      }
    },
    delTimelineItem(data){
      this.$confirm({
        title: "提示",
        content: "确定删除此记录吗?删除后不可恢复",
        okText: "确认",
        cancelText: "取消",
        centered: "",
        onOk: () => {
          return new Promise((resolve, reject) => {
            systemUpdateDel({id: data.id}).then(res => {
              resolve();
              if(res.code == 200){
                this.$message.success(res.msg);
                this.delItem(data)
              }
            }).catch(err => {
              console.log(err);
              reject();
            });
          })
        },
        onCancel() {}
      });
    },
    delItem(data){
      let currentIndex = this.data.findIndex(item => item.id == data.id)
      this.data.splice(currentIndex, 1)
      this.pagination.total -= 1;
    },
    toAddOrEdit(data){
      this.$refs.addOrEdit.showModalAction(data)
    },
    handleInfiniteOnLoad(){
      this.getSystemUpdateIndex(this.pagination);
    },
    getSystemUpdateIndex(pageData){
      // 数据全部加载完毕，或 正在加载中，禁止调用接口
      if(this.finished || this.pending){
        return;
      }
      this.pending = true;
      let lastId = this.data.length > 0 ? this.data[this.data.length - 1].id : '';
      getSystemUpdateIndex({last_id: lastId, page_size: pageData.pageSize}).then(res => {
        if(res.code == 200){
          this.data = [...this.data, ...res.data.list];
          pageData.total = +res.data.pages.total;
          this.pagination = {...this.pagination, ...pageData}
          // 此次返回列表为最后一页，则加载完毕，标记状态
          if(res.data.list.length < pageData.pageSize){
            this.finished = true;
          }else{
            this.finished = false;
          }
        }
      }).finally(() => {
        this.pending = false;
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