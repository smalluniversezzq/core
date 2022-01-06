<template>
  <div>
    <div class="head-title mt mb">
      <span>已选应用</span>
      <span class='head-txt'>（基础框架：2.0）</span>
      <span class="end-txt ">
        <a-button type="link" @click="addModule()">添加可选模块</a-button>
      </span>
    </div>
    <div class='module'>
      <div class='module-box' v-for="(item,index) in data.basics" :key="index">
        <div class="module-pic-box">
          <img :src="item.module_pic" alt="">
        </div>
        <div class="module-content-box">
          <div class="module-title">
              {{item.module_title}}
          </div>
          <div class='module-basics'>
            系统模块
          </div>
          <div class='module-content'>
            {{item.module_describe}}
          </div>
        </div>
      </div>
    </div>
    <div class='module'>
      <div class='module-box' v-for="(item,index) in data.optional" :key="index">
        <div class="module-pic-box">
          <img :src="item.module_pic" alt="">
        </div>
        <div class="module-content-box">
          <div class="module-title">
            {{item.module_title}}
            <span class='title-sign'>【可选】</span>
          </div>
          <div class='module-version'>
            <a-select  size="small" :value="item.module_select" style="width: 100px" @change="(e)=>{handleChangeVersion(e,item)}">
              <a-select-option :value="it" v-for="(it,ix) in item.module_version" :key="ix">
                {{it}}
              </a-select-option>
            </a-select>
          </div>
          <div class='module-content'>
            {{item.module_describe}}
          </div>
        </div>
        <byf-icon class="close" type="iconclose" @click="deleteModule(item.id)"/>
      </div>
    </div>
    <a-modal 
    v-model="visible" 
    :maskClosable="false"
    title="选择模块"
    @ok="handleOk"
    @cancel="close"
    :width="850"
    >
    <div>
      <a-tabs default-active-key="1" @change="callback" :defaultActiveKey="defaultKey"  :animated="false">
        <a-tab-pane  :tab="item.title"  v-for='(item) in moduleDate.modular' :key="item.id">
          <a-spin :spinning="spinning">
            <div class='module'>
              <div class='module-box' v-for="(item,index) in moduleDate.list" :key="index">
                <div class='module-btn'>
                  <a-button :type="item.module_add==0?'default':'primary'" size='small'>{{item.module_add==0?'已添加':'添加'}}</a-button>
                </div>
                <div class="module-pic-box">
                  <img :src="item.module_pic" alt="">
                </div>
                <div class="module-content-box">
                  <div class="module-title">
                      {{item.module_title}}
                  </div>
                  <div class='module-version'>
                    {{item.module_version[0]}}
                  </div>
                  <div class='module-version'>
                    {{item.module_describe}}
                  </div>
                </div>
              </div>
            </div>
          </a-spin>
        </a-tab-pane>
      </a-tabs>
    </div>
    <template slot="footer">
      <div></div>
    </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[1,2,34,5],
      spinning:false,
      defaultKey:"",
      moduleDate:{
        modular:[
          {
            title:"分类1",
            id:"1"
          },
          {
            title:"分类2",
            id:"2"
          },
          {
            title:"分类3",
            id:"3"
          },
          {
            title:"分类4",
            id:"4"
          },
        ],
        list:[
          {
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
            module_add:"0",

          },
          {
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
            module_add:"1",
          },
        ]
      },
      data:{
        basics:[
          {
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
          },
          {
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
            
          },
          {
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
          },
        ],
        optional:[
          { 
            id:"1",
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_select:"1.2.3",
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
          },
          {
            id:"2",
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_select:"1.2.3",
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
            
          },
          {
            id:"3",
            module_pic:"https://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20210119/811c6d54cfbcacffe142bf4f83fd3e9560067c4290fa8.png",
            module_title:"内置基础模块1",
            module_version:['1.2.3','2.2.3'],
            module_select:"2.2.3",
            module_describe:"此模块封装了商米设备红外扫描接口。可通过此模块获取商米设备红外扫描内容。可通过此模块获取商米设备红外扫描内容可通过此模块获取商米设备红外扫描内容此模...",
          },
        ]
      },
       visible: false,
    }
  },
  methods:{
    addModule(){
      this.visible = true
    },
    handleOk(){

    },
    close(){
      this.visible = false
    },
    callback(key){
      console.log(key,'callback')

    },
    handleChangeVersion(e,item){
      item.module_select = e
      console.log(e)
    },
    deleteModule(id){
      let self = this
       self.$confirm({
        title: '删除',
        content: '确认删除此模块？',
        okText:"确认",
        cancelText:"取消",
        onOk() {
          self.delModuleFn(id)
        },
        onCancel(){},
      });
    },
    delModuleFn(id){
      console.log(id)
    },

  },
  created(){},
  mounted(){
    this.defaultKey = this.moduleDate.modular[0].id
  },
}
</script>

<style scoped lang='less'>
  .head-title{
    padding: 0 10px;
    width: calc(100% - 48px);
    height: 44px;
    background: #f5f5f5;
    line-height: 44px;
    margin-left: 35px;
    .head-txt{
      font-size: 12px;
      color: #919191;
      margin-left: 10px;
    }
    .end-txt{
     float: right;
    }
  }
  .module{
    display: flex;
    flex-wrap: wrap;
    .module-box{
      border: 1px solid #d9d9d9;
      margin: 20px 0px 20px 35px;
      height: 150px;
      width: 350px;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      position: relative;
      .module-btn{
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .module-pic-box{
        width: 120px;
        height: 120px;
        img{
          width: 100%;
        }
      }
      .module-content-box{
        margin-left: 10px;
        width: 198px;
        height: 130px;
        .module-title{
          font-size: 14px;
          font-weight: 800;
          .title-sign{
            color: #096DD9;
            font-size: 12px;
            font-weight: 400;

          }
        }
        .module-basics{
          color: #52C41A;
        }
        .module-version{
          display:-webkit-box;
          overflow:hidden;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:4;  //显示两行
        }
        .module-content{
          display:-webkit-box;
          overflow:hidden;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:4;  //显示两行
        }

      }
      .close {
        position: absolute;
        right: -12px;
        top: -12px;
        width: 24px;
        height: 24px;
        font-size: 24px;
        cursor: pointer;
        color: #b8b9bd;
        display: none;
      }
      &:hover {
        .close {
          display: block;
          &:hover {
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
</style>