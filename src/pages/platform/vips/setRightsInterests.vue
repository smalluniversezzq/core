<template>
  <div class="setRightsInterests">
    <a-spin :spinning="spinning">
      <a-card title="设置权益" >
        <a-form-model
          ref="form"
          :model="formData"
          :label-col="labelCol" 
          :wrapper-col="wrapperCol">
          <a-form-model-item  label="权益项" :help="'说明:请上传权益图标、文字标题和文字副标题'" prop="platform_status">
            <a-row :style="{ width: 'calc(70% )'}">
              <a-col class=''>
                <div class="diy-sortable-box" >
                  <div  id="items">
                    <div class="sortable-item bg bt bl bg-box"  v-for="(item,index) in formData.info"  :key="'sortable'+index">
                      <a-row class='mt'>
                        <a-col span='1' class="icon-zindex  height-auto cursor-pointer">
                          <byf-icon type="iconsan" class="drag-icon "></byf-icon>
                        </a-col>
                        <a-col  span='20' v-if="!spinning" >
                          <a-row>
                            <a-col>
                              <a-row >
                                <a-col :lg="4" :xl="4" :xxl="4" class='tar'>权益图片：</a-col>
                                <a-col :lg="20" :xl="20" :xxl="20" >  
                                  <byf-upload-btn :imgsList='[item.logo]'  @change="(data)=>{iconChange(data,index)}"></byf-upload-btn>
                                  <div v-if="spinning" style="width:40px"></div>
                                </a-col>
                              </a-row>
                            </a-col>
                            <a-col >
                              <a-row>
                                <a-col :lg="4" :xl="4" :xxl="4" class='tar' >权益标题：</a-col>
                                <a-col :lg="20" :xl="20" :xxl="20" > 
                                  <a-input :style="{width:'calc(50%)'}"  v-model="item.title" placeholder="请输入标题"></a-input>
                                </a-col>
                              </a-row>
                            </a-col>
                            <a-col >
                              <a-row>
                                 <a-col :lg="4" :xl="4" :xxl="4"  class='tar'>权益副标题：</a-col>
                                 <a-col :lg="20" :xl="20" :xxl="20" >
                                   <a-input :style="{width:'calc(50%)'}" v-model="item.subtitle" placeholder="请输入副标题"></a-input>
                                 </a-col>
                              </a-row>
                            </a-col>
                          </a-row>
                        </a-col>
                      </a-row>
                       <byf-icon v-if="formData.info.length>1" class="close" type="iconclose" @click="delRights(index)" />
                    </div>
                  </div>
                  <a-button type='link' class="add-btn pl-0" @click="addRights()">+增加权益</a-button>
                  <!-- <a-button type='link' class="add-btn" @click="delRights()">-减少权益</a-button> -->
                </div>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item label="更多权益" >
            <a-radio-group  v-model="formData.more_interests.status">
              <a-radio value="1">
                开启
              </a-radio>
              <a-radio value="0">
                关闭
              </a-radio>
            </a-radio-group>
            <a-row v-show="formData.more_interests.status == '1'">
              <a-col span="4">
                <!-- :links="toParse()" -->
                <link-selector-input :links="toParse()" @confirm="changeLinkSelect"></link-selector-input>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-divider />
          <a-row>
            <a-col offset="2">
              <a-button type="primary" @click="submit()"> 保存</a-button>
              <a-button class='ml' @click="goBack()"> 返回列表</a-button>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </a-spin>
  </div>
</template>
<script>
  import Sortable from "sortablejs";
  import { AdminUserUserlevelInterestsEdit ,AdminUserUserlevelDetail} from '@/services/platform/vips.js'
  import linkSelectorInput from '@/components/byf/linkSelector/linkSelectorInput'
  export default {
    components:{
      linkSelectorInput,
    },
    data(){
      return{
        labelCol: { span: 2 },
        wrapperCol: { span: 17 },
        showlist:false,
        id:"",
        spinning:false,
        formData:{
          id:"",
          info:[
            {
             logo:"",
             title:"",
             subtitle:"",
            },
            {
             logo:"",
             title:"",
             subtitle:"",
            },
            {
             logo:"",
             title:"",
             subtitle:"",
            },
          ],
          more_interests:{
            status:"1",
            url:"[]",
          }
        },
      } 
    },
    watch:{
      $route: function(newRoute,oldRoute) {
        console.log(newRoute,oldRoute)
        if(newRoute.path === oldRoute.path){
          if(newRoute.fullPath !== oldRoute.fullPath){
            this.spinning = true
            this.id = this.$route.query.id
            console.log(this.id)
            this.AdminUserUserlevelDetailFn()
            this.initSortable()
          }
        }
      }
    },
    created(){
    },
    mounted(){
      this.spinning = true
      this.id = this.$route.query.id
      console.log(this.id)
      this.AdminUserUserlevelDetailFn()
      this.initSortable()
    },
    methods:{
      initSortable(){
        var that = this
        var el = document.getElementById('items')
        new Sortable(el, {
          animation: 150,
          handle: '.drag-icon', 
          onEnd: function (evt) {
            // 获取排序之后的data数据
            that.formData.info.splice(evt.newIndex, 0, that.formData.info.splice(evt.oldIndex, 1)[0])
            var newArray = that.formData.info.slice(0)
            that.formData.info= []
            that.$nextTick(function () {
              that.formData.info = newArray
              console.log(that.formData.info)
            })
          }
        })
      },
      AdminUserUserlevelDetailFn(){
        AdminUserUserlevelDetail({
          id:this.id
        }).then(res=>{
          if(res.code === 200){
            console.log(res)
            console.log(res.data.interests_info.length,"length")
            if(res.data.interests_info.length===0){
              this.formData.id = res.data.id
            }else{
              this.formData.id = res.data.id
              this.formData.info = res.data.interests_info.info
              this.formData.more_interests = res.data.interests_info.more_interests
              this.formData.more_interests.url = res.data.interests_info.more_interests.url.length>0?res.data.interests_info.more_interests.url:'[]'
            }
            this.spinning = false
          }else{
            this.spinning = false
          }
        })
      },
      UpdateList(oldIndex,newIndex){
        let tmp = this.formData.info.splice(oldIndex,1)[0]
        this.formData.info.splice(newIndex,0,tmp)
      },
      iconChange(val,index){
        console.log(val,val.font_class,index)
        // this.formData.info[index].logo = val.font_class
         this.formData.info[index].logo = val[0];
      },
      addRights(){
        let lists = {
          logo:"",
          title:"",
          subtitle:"",
        }
        this.formData.info.push(lists)
      },
      delRights(index){
        console.log(this.formData.info.length)
        if(this.formData.info.length<2){
          this.$message.error("至少保留一项")
        }else{
          this.formData.info.splice(index,1)
        }
      },
      changeLinkSelect(e){
        console.log(e,"changeLinkSelect")
        this.formData.more_interests.url = JSON.stringify(e)
        console.log( this.formData.more_interests.url)
      },
      toParse(){
        let parseObj = JSON.parse(this.formData.more_interests.url || "{}")
        console.log(parseObj)
        return parseObj
      },
      submit(){
        this.submitLoading = true
        this.formData.id = this.id
        AdminUserUserlevelInterestsEdit(this.formData).then(res=>{
          if(res.code === 200){
            this.$message.success(res.msg)
            console.log(res)
            this.submitLoading = false
            this.$router.push({name:'GradeList'})
          }else{
            // this.$message.error(res.msg)
            this.submitLoading = false
          }
        })
      },
      goBack(){
        this.$router.push({
          name:'GradeList',
        })
      },
    }
  }
</script>
<style scoped lang="less">
  @import '@/components/byf/renovation/pageDiy/views/configArea/widgets/common/widgetStyle.less';

  // .diy-classify-selector {
  //   .sortable-item {
  //     position: relative;
  //     display: flex;
  //     align-items: center;
  //     background: @background-color-light;
  //     padding: 10px;
  //     margin-bottom: 10px;
  //     &:hover {
  //       .close {
  //         display: block;
  //       }
  //     }
  //     .drag-icon {
  //       font-size: 12px;
  //       margin: 0 12px;
  //       cursor: grab;
  //     }
  //     .close {
  //       position: absolute;
  //       top: -10px;
  //       right: -10px;
  //       font-size: 20px;
  //       cursor: pointer;
  //       color: #b8b9bd;
  //       display: none;
  //     }
  //   }
  // }
  .sortable-item{
    margin-bottom:20px;
    padding: 10px;
  }
  .rights-box{
    position: relative;
  }
  .rights{
    position: absolute;
    top: -15px;
    left: -12.5px;
    width: 60px;
    height: 50px;
    transform: scale(.4);
    .byf-upload{
      width: 120px;
      .img-list{
        overflow: hidden;
        li{
          .close{
            z-index: 999;
          }
        }
      }
    }
  }
  .byf-upload > .img-list li{
    height: 80px !important;
  }
  .bg-box{
    position: relative;
    &:hover {
      .close {
        display: block;
      }
    }
  }
  .close{
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 20px;
    cursor: pointer;
    color: #b8b9bd;
    display: none;
  }
  .height-auto{
    height: 180px;
    display: flex;
    align-items: center;
  }
</style>