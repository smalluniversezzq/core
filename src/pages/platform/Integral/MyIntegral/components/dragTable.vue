<template>
  <div class='dragtable'>
    <!-- {{data}} -->
    <a-row>
      <a-col :xs="{ span: 24}" :sm="{ span: 24}" :md="{ span: 20}" :lg="{ span: 20}" :xl="{ span: 18}" :xxl="{ span: 18}">
        <div class='table-box'>
          <a-row class='title-table'>
            <a-col span='12' class='head-title'>
              {{taskName}}任务
            </a-col>
            <a-col span='8' class='head-title'>
              奖励积分数量
            </a-col>
            <a-col span='4' class='head-title'>
              操作
            </a-col>
          </a-row>
          <div :id="'taskSort'+task">
            <a-row class='content-table' v-for="(item,index) in data" :key="index">
              <a-col span='12' class='content-title '>
                <byf-icon type="iconsan" class="drag-icon "></byf-icon>
                {{item.name_before}}{{item.task}}{{item.name_after}}
              </a-col>
              <a-col span='8' class='content-title'>
                {{item.integral}}
              </a-col>
              <a-col span='4' class='content-title'>
                <a-button type="link" style='color:red' @click="delTask(item.id)">删除</a-button>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Sortable from "sortablejs";
import cloneDeep from 'lodash/cloneDeep';
  export default{
    name:"taskmanage",
    props:{
      dataList:{
        type:Array,
      },
      taskName:{},
      task:{}
    },
    data(){
      return {
       data:this.dataList
      }
    },
    watch:{
      dataList(newValue){
        this.data = cloneDeep(newValue)
      }
    },
    methods:{
      initSortable(){
        var that = this
        var el = document.getElementById('taskSort'+this.task)
        new Sortable(el, {
          animation: 150,
          handle: '.drag-icon', 
          onEnd: function (evt) {
            // 获取排序之后的data数据
          that.data.splice(evt.newIndex, 0, that.data.splice(evt.oldIndex, 1)[0])
            var newArray = that.data.slice(0)
            that.data= []
            that.$nextTick(function(){
              that.data = newArray
              console.log(that.data)
              that.sendMsg()
            })
          }
        })
      },
      // 修改父组件的参数
      sendMsg(){
        console.log(this.data,'sendMsg')
        this.$emit('acceptData',this.data)
      },
      //删除任务
      delTask(value){
        let _this = this
        _this.$confirm({
          title: '删除',
          content: "确认删除吗",
          okText: '确认',
          cancelText:"取消",
          onOk() {
            console.log(value)
            _this.data.forEach((item,index)=>{
              if(item.id == value){
                _this.data.splice(index,1)
              }
            })
            _this.sendMsg()
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      },
    },
    created(){

    },
    mounted(){
      this.initSortable()

    },
  }
</script>
<style lang="less">
.dragtable{
  .table-box{
    border: 1px solid #f0f0f0;
    width: 100%;
    .title-table{
      .head-title{
        text-align: center;
        font-size: 14px;
        color:rgba(0, 0, 0, 0.85);
      }
      .head-title:nth-child(-n+2){
        border-right: 1px solid #f0f0f0;
      }
    }
    .content-table{
      .content-title{
        text-align: center;
        border-top: 1px solid #f0f0f0;
        .drag-icon{
          float: left;
          margin-top: 13px;
          margin-left: 10px;
          cursor:pointer;
        }
      }
      .content-title:nth-child(-n+2){
        border-right: 1px solid #f0f0f0;
      }
    }
  }
}

</style>