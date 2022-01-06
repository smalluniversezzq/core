 <!--编辑默认等级-->
<template>
  <div>
    <a-card>
      <a-tabs default-active-key="0" size='large'  @change="key => onTabChange(key, 'noTitleKey')" :animated="false">
        <a-tab-pane key="0" tab="基本信息">
          <div v-show="noTitleKey == 0">
            <a-spin class="fixed" tip="Loading..." :spinning="payUpgradeformDataShow" >
            </a-spin>
            <transition name='slide-fade'>
              <basic-info v-if="!payUpgradeformDataShow" :up_info_default="up_info_default" :basicInfoFromData="basicInfoFromData" :power="basicInfoFromData.power" :id='id'></basic-info>
            </transition>
          </div>
        </a-tab-pane>
        <a-tab-pane key="1" tab="条件升级" v-if='defaultTypes'>
          <div v-show="noTitleKey == 1">
            <a-spin  class="fixed" tip="Loading..." :spinning="payUpgradeformDataShow">
            </a-spin>
            <condition-upgrade v-if="!payUpgradeformDataShow" :id='id' :conditionUpgradeformData="conditionUpgradeformData" :GradeType="GradeType" :gradeList='gradeList'></condition-upgrade>
          </div> 
        </a-tab-pane>
        <a-tab-pane key="2" tab="付费升级" v-if='defaultTypes'>
          <div v-show="noTitleKey == 2">
            <a-spin class="fixed" tip="Loading..." :spinning="payUpgradeformDataShow">
            </a-spin>
            <pay-upgrade v-if="!payUpgradeformDataShow" :payUpgradeformData="payUpgradeformData" :id='id' ></pay-upgrade>
          </div> 
        </a-tab-pane>
        <!-- <a-tab-pane key="3" tab="礼包升级" v-if='defaultTypes'>
          <div v-show="noTitleKey == 3">
            <a-spin tip="Loading..." :spinning="payUpgradeformDataShow">
            </a-spin>
            <gift-pack-upgrade :id='id'></gift-pack-upgrade>
          </div> 
        </a-tab-pane> -->
        <!-- <a-tab-pane key="4" tab="失效检测" v-if='defaultTypes'>
          <div v-show="noTitleKey == 4">
            <a-spin tip="Loading..." :spinning="payUpgradeformDataShow">
            </a-spin>
            <failure-detection :id='id'></failure-detection>
          </div> 
        </a-tab-pane> -->
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
  import { AdminUserUserlevelDetail ,AdminUserUserLevelgGetLevel } from '@/services/platform/vips.js'
  import basicInfo from './components/basicInfo'
  import payUpgrade from './components/payUpgrade'
  import conditionUpgrade from './components/conditionUpgrade'
  // import GiftPackUpgrade from './components/GiftPackUpgrade'
  // import FailureDetection from './components/failureDetection'
  export default {
    components:{
      basicInfo,
      payUpgrade,
      conditionUpgrade,
      // GiftPackUpgrade,
      // FailureDetection
    },
    watch:{
      $route: function(newRoute,oldRoute) {
        console.log(newRoute,oldRoute)
        if(newRoute.path === oldRoute.path){
          if(newRoute.fullPath !== oldRoute.fullPath){
            this.id = this.$route.query.id
            if(this.id){
              this.AdminUserUserlevelDetailFn(this.id)
              this.payUpgradeformDataShow = true
            }
          }
        }
      }
    },
    data(){
      return {
        id:"",
        GradeType:"",
        tabListNoTitle: [
          {key: '0', tab: '基本信息'},
          {key: '1', tab: '条件升级'},
          {key: '2', tab: '付费升级'},
          {key: '3', tab: '礼包升级'},
          {key: '4', tab: '失效检测'},
        ],
        noTitleKey: '0',
        fans_level:"",
        defaultTypes:true,
        up_info_default:{
          id:"",
          pmid:"",
          status:"",
          type:"",
        },
        basicInfoFromData:{
          name:"",
          icon:"",
          power:"",
          type:1,
          ishide:0,
          status:1,
        },
        payUpgradeformDataShow:false,
        payUpgradeformData:{
          type:"fufei",
          status:"0",
          info:[
            {
              title:"",
              price:"",
              time:"",
              money:"",
            },
          ]
        },
        gradeList:{},
        //条件升级
        conditionUpgradeformData:{
        }
      }
    },
    created(){
      console.log("created")
    },
    mounted(){
      this.id = this.$route.query.id
      console.log(this.id)
      if(this.id){
        this.AdminUserUserlevelDetailFn(this.id)
        this.payUpgradeformDataShow = true
        this.AdminUserUserLevelgGetLevelFn()
      }else{
        this.tabListNoTitle = [
          {key: '0', tab: '基本信息'},
          {key: '1', tab: '条件升级'},
          {key: '2', tab: '付费升级'},
          {key: '3', tab: '礼包升级'},
          {key: '4', tab: '失效检测'},
        ]
      }
    },
    methods:{
      onTabChange(key, type){
        this[type] = key;
        console.log(this.noTitleKey)
      },
      objToArr(obj){
        let arr = []
        for(let prop in obj) {
          arr.push({
            key: prop,
            name: obj[prop]
          })
        }
        return arr
      },
      // 获取等级
      AdminUserUserLevelgGetLevelFn(){
        AdminUserUserLevelgGetLevel({
          id:this.id
        }).then(res=>{
          console.log(res)
          this.gradeList = []
          // this.gradeList = cloneDeep(Object.assign(this.gradeList,res.data.info.agent,res.data.info.operator))
          console.log(res.data.info.agent)
          let agent = this.objToArr(res.data.info.agent)
          let operator = this.objToArr(res.data.info.operator)
          this.gradeList = agent.concat(operator)
          console.log(this.gradeList)
          this.fans_level = this.gradeList[0].key
        })
      },
      AdminUserUserlevelDetailFn(id){
        AdminUserUserlevelDetail({id}).then(res=>{
          if( res.code===200){
            for(let key in this.basicInfoFromData){
              this.$set(this.basicInfoFromData,key,res.data[key])
            }
            for(let key in this.up_info_default){
              this.$set(this.up_info_default,key,res.data.up_info.default[key])
            }
            this.GradeType = res.data.type
            for(let key in this.payUpgradeformData){
              console.log(key,"key")
              if(key == 'info'){
                if(res.data.up_info.fufei.status == 0){
                  if(res.data.up_info.fufei.info.length == 0){
                    let info = {
                      title:"",
                      price:"",
                      time:"",
                      money:"",
                    }
                    this.$set(this.payUpgradeformData[key],0,info)
                  }else{
                    this.$set(this.payUpgradeformData,key,res.data.up_info.fufei[key])
                  }
                }else{
                  this.$set(this.payUpgradeformData,key,res.data.up_info.fufei[key])
                }
              }else if(key == 'type'){
                this.$set(this.payUpgradeformData,key,'fufei')
              }else{
                this.$set(this.payUpgradeformData,key,res.data.up_info.fufei[key])
              }
              this.payUpgradeformDataShow = false
            }
            // 条件升级 conditionUpgradeformData
            if(res.data.up_info.tiaojian.status===1){
              this.conditionUpgradeformData = res.data.up_info.tiaojian
            }else{
              // 条件升级默认值
              console.log(this.fans_level)
              let data = {
                id:"",
                type:"tiaojian",
                status:0,
                condition_type:1,
                info:{
                  self_purchase_order:{
                    status:1,
                    info:{
                        time:1,
                        type:1,
                        num_value:"",
                        display_content:""
                    }
                  },
                  personal_income:{
                    status:1,
                    info:{
                        time:1,
                        type:1,
                        num_value:"",
                        display_content:""
                    }
                  },
                  fans:{
                    status:1,
                    type:1,
                    info:[
                      {
                        time:1,
                        fans_range:[1],
                        fans_level:this.fans_level,
                        people_number:"",
                        fans_type:1,
                        display_content:""
                      }
                    ]
                  },
                  side_quest:{
                    status:1,
                    info:{
                      time:1,
                      branch_line_number:"",
                      branch_people_number:"",
                      fans_level:this.fans_level,
                      fans_type:1,
                      display_content:""
                    }
                  },
                  upgrade_explain:"",
                }
              }
              this.conditionUpgradeformData = data
              this.conditionUpgradeformData.id = res.data.id
              console.log(this.conditionUpgradeformData)
              this.payUpgradeformDataShow = false
            }
            // 默认等级等于1
            if(res.data.up_info.default.status == '1'){
              this.tabListNoTitle = [{key: '0', tab: '基本信息'}]
              this.defaultTypes = false
            }else{
              this.defaultTypes = true
              this.tabListNoTitle= [
                {key: '0', tab: '基本信息'},
                {key: '1', tab: '条件升级'},
                {key: '2', tab: '付费升级'},
                // {key: '3', tab: '礼包升级'},
                // {key: '4', tab: '失效检测'},
              ]
            }
            console.log(this.tabListNoTitle)
          }else{
            this.$message.error(res.msg)
          }
          console.log(this.payUpgradeformData,'payUpgradeformData')
        })
      }
    },
  }
</script>
<style scoped lang="less" >
  .fixed{
    position: fixed;
    top: 50%;
    left: 50%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>