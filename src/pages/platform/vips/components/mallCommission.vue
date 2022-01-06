<!--商城返佣 运营商 -->
<template>
  <div class="agent">
    <a-row>
      <a-col offset='2' span="14">
        <a-alert  type="info" show-icon>
          <span slot="message">
           <span>提醒：当前配置等级为 <span style="color:red">{{gradeName}}</span></span>
          </span>
        </a-alert>
      </a-col>
    </a-row>
    <a-form-model
      ref="from"
      :rules="rules"
      :model="formData"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        label="自购返佣"
      >
        <div class='helps-reletive'>
          <byf-radio-tab :options="zgfyOptions" :hide="[1]" :value="formData.self.status" @change="zgfychange">
            <div slot="toggle">
              <div class='bg toggle-box1 '>
                <a-form-model-item  label="基础佣金" :help="help.basic" :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <byf-input-number width='300' :max="100" :precision='2'  v-model='formData.self.basic'  placeholder="请输入" :unit="'%'"></byf-input-number>
                </a-form-model-item>
                <a-form-model-item class='mt'  label="自购补贴" :help="help.s_status"  :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <a-radio-group :options="s_statusOptions" v-model='formData.self.s_status'>
                  </a-radio-group>
                </a-form-model-item>
                <a-form-model-item v-show='formData.self.s_status=="1"' class='mt'  label="补贴比例"   :labelCol='{span:3}' :wrapperCol="{span: 18}">
                  <byf-input-number width='300' :precision='2' :max="100" v-model='formData.self.s_basic'  placeholder="请输入" :unit="'%'"></byf-input-number>
                </a-form-model-item>
      
              </div>
            </div>
          </byf-radio-tab>
          <div class='icon-help'>
            <a-tooltip placement="right">
              <template slot="title">
                <div>
                  <div>系统给下单人发放的佣金为自购返佣</div>
                  <div>自购返佣可以分为基础佣金+平台补贴两部分发放</div>
                </div>
              </template>
                <byf-icon type="iconhelp" style='widht:20px' :size='30'></byf-icon><span class='ml-sm cursor-pointer'>说明</span>
            </a-tooltip>
            
          </div>
        </div>
      </a-form-model-item>

      <a-form-model-item
        label="分销提成"
      >
        <div class='helps-reletive'>
          <a-radio-group :options="commissionOptions" v-model="formData.fenxiao.status" @change="fxtcchange">
          </a-radio-group>
          <div class="help">
            {{help.fxtc}}
          </div>
          <div class='bg toggle-box '  v-show="formData.fenxiao.status=='1'">
            <a-row>
              <a-col class='mt' v-for="(item,index) in formData.fenxiao.info1" :key="'infoKey'+index">
                <byf-input-number width='300' :max="100" nameWidth="100" v-model='formData.fenxiao.info1[index]' :name="nameFilter(index,formData.fenxiao.info1.length,0,'代')" placeholder="请输入" :unit="'%'"></byf-input-number>
              </a-col>
              <a-col>
                <a-button type="link" class='pl-0' @click="addList(formData.fenxiao.info1,10)">+增加代数</a-button>
                <a-button type="link" class='pl-0' @click="delList(formData.fenxiao.info1,1)">-减少代数</a-button>
              </a-col>
            </a-row>
          </div>
          <div class='bg toggle-box' v-show="formData.fenxiao.status=='2'">
            <a-row>
              <a-col style="background:#ffffff" >
                <a-table :pagination="false" 
                :data-source="data" 
                :columns="columns" 
                :scroll="{ x: columnWidth,  }"
                :rowKey="(r, i) => i"
                bordered
                >
                  <div slot="customTitle" class="title-box">
                    <div class="title-position">
                      <div class='left'>代数</div>
                      <div class='right'>等级</div>
                      <div class='divide'></div>
                    </div>
                  </div>
                  <template :slot="index" slot-scope="text, record" v-for="(item,index) in templateSlot">
                    <div :key="'templateSlot'+index">
                      <byf-input-number style="width:60px; margin:0 auto" :max='100' :min="0" v-model="record[item.key]"></byf-input-number >
                    </div>
                  </template>
                  <div slot="titleCol" slot-scope="text, record, index">
                    {{`${index+1}代（%）`}}
                  </div>
                </a-table> 
              </a-col> 
              <a-col>
                <span class="help">
                  {{help.fxtc2}}
                </span>
              </a-col>
              <a-col>
                <a-button type="link" @click="addListCol(data,10)">+增加代数</a-button>
                <a-button type="link" @click="delListCol(data,1)">-减少代数</a-button>
              </a-col>
            </a-row>
          </div>
          <div class='icon-help'>
            <a-tooltip placement="right">
              <template slot="title">
                <div>
                  <div>用户下单，向上根据推荐关系，返N代分销。</div>
                  <div>本项返佣不会被高等级阻断最多支持10代分销设置</div>
                </div>
              </template>
              <byf-icon type="iconhelp" style='widht:20px' :size='30'></byf-icon><span class='ml-sm cursor-pointer'>说明</span>
            </a-tooltip>
          </div>
          <div v-show="formData.fenxiao.status != '0'">
            <a-checkbox @change="onChangeOperators" :checked="formData.fenxiao.isoperator==0?false:true" class='lf'>
              开启运营商下单分销提成
            </a-checkbox>
            <div class='rt help-txt'>
              <a-tooltip placement="right">
                <template slot="title">
                  <span>
                    开启运营商自购提成时，运营商下单也会给上级返佣，代理等级也有机会拿到运营商等级用户自购订单佣金的分销提成
                  </span>
                </template>
                <byf-icon type="iconhelp"  style='widht:20px' :size='30'></byf-icon><span class='ml-sm cursor-pointer'>说明</span>
              </a-tooltip>
            </div>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item
        label="团队佣金"
      >
        <div class='helps-reletive'>
          <byf-radio-tab :options="tdyjOptions" :hide="[1]" :value="formData.team.status" @change="teamChange">
            <div slot="toggle">
              <div class='bg mb'>
                <div  class="helps-reletive">
                  <a-button type="link">团队出单提成</a-button>
                  <div class='icon-help'>
                  <a-tooltip placement="right">
                    <template slot="title">
                    <div>
                      <div>
                         团队出单佣金指运营商等级用户下的团队成员下单后，其获得的佣金提成，计算基数为订单总佣金。
                      </div>
                      <div>
                        如代理下单，则上级离得最近的运营商会拿团队出单提成
                      </div>
                      <div>
                        如运营商本人下单，则上级离得最近的更高等级的运营商会拿团队出单提成。
                      </div>
                    </div>
                    </template>
                      <byf-icon type="iconhelp" style='widht:20px' :size='30'></byf-icon><span class='ml-sm cursor-pointer'>说明</span>
                  </a-tooltip>
                  </div>
                  <a-divider style='margin-top:0px' />
                </div>
                <a-row>
                  <a-col  class='ml mr'>
                    <a-row>
                      <a-col style="background:#ffffff" >
                        <a-table :pagination="false" 
                        :data-source="teamdata" 
                        :columns="teamcolumns" 
                        :scroll="{ x: teamcolumnWidth,  }"
                        :rowKey="(r, i) => i"
                        bordered
                        >
                          <div slot="customTitle" class="title-box">
                            <div class="title-position">
                              <div class='left'>代数</div>
                              <div class='right'>等级</div>
                              <div class='divide'></div>
                            </div>
                          </div>
                          <template :slot="index" slot-scope="text, record" v-for="(item,index) in templateSlotTeamIssue">
                            <div :key="'templateSlot'+index">
                              <byf-input-number style="width:60px; margin:0 auto" :max='100' :min="0" v-model="record[item.key]"></byf-input-number >
                            </div>
                          </template>
                          <div slot="titleCol" slot-scope="text, record, index">
                            <span v-if="teamdata.length === index+1">
                              {{`${index+1}代及以后（%）`}}
                            </span>
                            <span v-else>
                              {{`${index+1}代（%）`}}
                            </span>
                          </div>
                        </a-table> 
                      </a-col> 
                      <a-col>
                        <span class="help">
                          {{help.fxtc2}}
                        </span>
                      </a-col>
                      <a-col>
                        <a-button type="link" @click="addListCol(teamdata,10)">+增加代数</a-button>
                        <a-button type="link" @click="delListCol(teamdata,1)">-减少代数</a-button>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </div>
              <div class='bg mb' v-show='showCommission'>
                <div  class="helps-reletive">
                  <a-button type="link">团队佣金提成</a-button>
                  <div class='icon-help'>
                    <a-tooltip placement="right">
                      <template slot="title">
                        <span>
                          可设置高等级运营商拿低等级运营商获得团队佣金的抽成，抽成基数为低等级团队长团队佣金金额
                        </span>
                      </template>
                      <byf-icon type="iconhelp" style='widht:20px' :size='30'></byf-icon><span class='ml-sm cursor-pointer'>说明</span>
                    </a-tooltip>
                  </div>
                  <a-divider style='margin-top:0px' />
                </div>
                <a-row>
                  <a-col  class='ml mr'>
                    <a-row>
                      <a-col style="background:#ffffff" >
                        <a-table 
                        :pagination="false" 
                        :data-source="commissionData" 
                        :columns="columnsCommission" 
                        :rowKey="(r, i) => i"
                        :scroll="{ x: CommissionWidth,  }"
                        bordered
                        >
                          <div slot="customTitle" class="title-box">
                            <div class="title-position">
                              <div class='left'>代数</div>
                              <div class='right'>等级</div>
                              <div class='divide'></div>
                            </div>
                          </div>
                          <template :slot="index" slot-scope="text, record" v-for="(item,index) in templateSlotCommission">
                            <div :key="'templateSlot'+index">
                              <byf-input-number 
                                style="width:60px; margin:0 auto" 
                                :max='100' 
                                :min="0" 
                                v-model="record[item.key]"
                              ></byf-input-number >
                            </div>
                          </template>
                          <div slot="titleCol" slot-scope="text, record, index">
                            <span v-if="commissionData.length === index+1">
                              {{`${index+1}代及以后（%）`}}
                            </span>
                            <span v-else>
                              {{`${index+1}代（%）`}}
                            </span>
                          </div>
                        </a-table> 
                      </a-col> 
                      <a-col>
                        <span class="help">
                          {{help.fxtc2}}
                        </span>
                      </a-col>
                      <a-col>
                        <a-button type="link" @click="addListCol(commissionData,10)">+增加代数</a-button>
                        <a-button type="link" @click="delListCol(commissionData,1)">-减少代数</a-button>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </div>
            </div>
          </byf-radio-tab>
        </div>
      </a-form-model-item>
      <a-form-model-item
        label="平级奖励"
      >
        <div class='helps-reletive'>
          <byf-radio-tab :options="zgfyOptions" :hide="[1]" :value="formData.level.status" @change="pjjlchange">
            <div slot="toggle">
              <div class='bg toggle-box '>
                <a-row >
                  <a-col class='mt' v-for="(item,index) in formData.level.info" :key="'infoKey'+index">
                    <byf-input-number 
                      width='300' 
                      :max="100" 
                      nameWidth="100" 
                      v-model='formData.level.info[index]' 
                      :name="nameFilter(index,toMap(formData.level.info).size,1,'代')" 
                      placeholder="请输入" 
                      :unit="'%'"
                    ></byf-input-number>
                  </a-col>
                  <a-col >
                    <span class='help'>{{help.pjjl}}</span>
                  </a-col>
                  <a-col>
                    <a-button type="link" class='pl-0' @click="addList(formData.level.info,10)">+增加代数</a-button>
                    <a-button type="link" class='pl-0' @click="delList(formData.level.info,1)">-减少代数</a-button>
                  </a-col>
                </a-row>
              </div>
            </div>
          </byf-radio-tab>
          <div class='icon-help'>
              <a-tooltip placement="right">
                <template slot="title">
                  <div>
                    <div>
                      可设置同等级运营商推荐人拿被推荐人获得团队佣金的抽成，抽成基数为被推荐人团队佣金金额
                    </div>
                    <div>
                      比如A（高运）推荐B（高运）
                      B获得团队出单提成或团队佣金提成后，A作为同等级上级运营商会拿平级奖提成
                    </div>
                  </div>
                </template>
                <byf-icon type="iconhelp" style='widht:20px' :size='30'></byf-icon><span class='ml-sm cursor-pointer'>说明</span>
              </a-tooltip>
          </div>
        </div>
      </a-form-model-item> 
       <a-row class='mt '>
        <a-col class='footer-btn '>
            <a-row>
              <a-col offset="2">
                <a-button type='primary' :loading='submitLoading' @click='submit()'>保存</a-button>
                <a-button class="ml" @click="goBack()">返回列表</a-button>
              </a-col>
            </a-row>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>
<script>
  import ByfRadioTab from '@/components/byf/radio/ByfRadioTab'
  import ByfInputNumber from '@/components/byf/input/ByfInputNumber'
  import {AdminUserUserLevelSetRebateInfo} from "@/services/platform/vips.js";
  import { cloneDeep } from 'lodash'
  export default{
    name:"agent",
    components:{
      ByfRadioTab,
      ByfInputNumber,
    },
    props:{
      id:{},
      gradeName:{
        type:String
      },
      sourceData:{},
      levelList:{},
    },
    data(){
      return {
        columns:[
          {
            slots: { title: 'customTitle' },
            width:196,
            scopedSlots: { customRender: 'titleCol' },
          },
        ],
        labelCol: { span: 2 },
        wrapperCol: { span: 14 },
        columnWidth:"890",
        rules:{
          title: '',
          gold: "",
          silver: "",
          copper: "",
        },
        formData:this.sourceData,
        templateSlot:[],
        data:[],
        teamdata:[],
        // 团队出单提成
        issue_info_templateSlot:[],
        issue_info_data:[],
        newTeam1:{},
        newTeam2:{},
        zgfyOptions:[
          {label:"开启",value:"1"},
          {label:"关闭",value:"0"}
        ],
        s_statusOptions:[
          {label:"开启",value:"1"},
          {label:"关闭",value:"0"}
        ],
        commissionOptions:[
          {label:"分销提成不区分等级",value:"1"},
          {label:"分销提成区分等级",value:"2"},
          {label:"关闭",value:"0"},
        ],
        tdyjOptions:[
          {label:"开启",value:"1"},
          {label:"关闭",value:"0"}
        ],
        help:{
          basic:"说明：会员自购时，会给自己返佣的金额比例。",
          s_status:"说明：开启补贴后，平台会额外给会员补贴部分佣金。",
          fxtc:"说明：设置第几代提成比例，可选择第几代是否区分等级设置。分销提成只是当前等级拿下级代理等级用户的佣金提成。",
          fxtc2:"说明：可以增加或减少，从表格最下侧增减或删除。",
          pjjl:"说明：可以增加或减少代数，从表格下面增减或删除。",
        },
        submitLoading:false,
        gradeList:{},
        teamList:{},
        templateSlotTeamIssue:[],
        teamcolumnWidth:"",
        CommissionWidth:"",
        templateSlotCommission:[],
        teamcolumns:[],
        columnsCommission:[],
        commissionData:[],
        showCommission:true, //判断团队佣金提成是否显示
      }
    },
    created(){},
    mounted(){
      if(this.levelList){
        this.data = []
        Object.keys(this.formData.fenxiao.info2).forEach((item,index)=>{
          console.log(item,index,'')
          this.data.push(this.formData.fenxiao.info2[item])
        })
        this.teamdata = []
        Object.keys(this.formData.team.issue_info).forEach((item,index)=>{
          console.log(item,index,'')
          this.teamdata.push(this.formData.team.issue_info[item])
        })
        this.commissionData = []
        console.log(this.formData.team.commission_info,'123123')
        Object.keys(this.formData.team.commission_info).forEach((item,index)=>{
          console.log(item,index,'')
          this.commissionData.push(this.formData.team.commission_info[item])
        })
        //分销提成
        this.tabColumnsFn()
        // 团队佣金
        this.teamColumnsFn(1)
        this.teamColumnsFn(2)
      }else{
        console.log('暂无等级')
      }
    },
    methods:{
      zgfychange(e){
        console.log(e,'zgfychange')
        this.formData.self.status = e
        if(e == "0"){
          this.formData.self.s_status = "0"
        }
      },
      pjjlchange(e){
        console.log(e,'zgfychange')
        this.formData.level.status = e
      },
      basichange(e){
        console.log(e,'basichange')
        this.formData.basic = e
      },
      fxtcchange(e){
        console.log(e.target.value,'fxtcchange')
        this.formData.fenxiao.status = e.target.value
      },
      tdjlchange(e){
        console.log(e.target.value,'tdjlchange')
      },
      nameFilter(index,length,type,name){
        console.log(index,length,type,name,'nameFilter')
        // index 值 length ,1以后 0级别 , name:代 级
        if(type==0){
          return (index ) + name
        }else if(type==1){
          if(index < length){
            return (index ) + name
          }else{
            return (index ) + name +'及以后'
          }
        }
      },
      toMap(obj){
        console.log(obj)
        let map = new Map();
        for(let key in obj) {
          map.set(key,obj[key]);
        }
        return map;
      },
      addList(data,index){
        console.log(data,'addList')
        const map = new Map(Object.entries(data));
        if(map.size == index){
          this.$message.error(`最多添加${index}代`)
        }else{
          this.$set(data,[map.size+1],"")
        }
      },
      addListCol(data,index){
        let list = cloneDeep(this.newTeam1)
        console.log(data,index)
        if(data.length == index){
          this.$message.error(`最多添加${index}代`)
        }else{
          data.push(list)
        }
      },
      delList(data,index){
        console.log(data,index,'delList')
        if(this.toMap(data).size==index){
          this.$message.error("至少保留一代")
        }else{
          this.$delete(data,this.toMap(data).size)
          console.log(data,'delList')
        } 
      },
      delListCol(data,index){
        console.log(data.length,index)
        if(data.length==index){
          this.$message.error("至少保留一代")
        }else{
          data.pop()
        }
      },
      //编辑行
      onCellChange(key, dataIndex, value) {
        console.log(key,dataIndex,value)
        const dataSource = [...this.formData.fenxiao.info2];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.formData.fenxiao.info2 = dataSource;
        }
      },
      AdminUserUserLevelSetRebateInfoFn(){
        this.formData.id = this.id
        console.log(this.formData,'AdminUserUserLevelSetRebateInfoFn')
        // console.log(AdminUserUserLevelSetRebateInfoFn)
        AdminUserUserLevelSetRebateInfo(this.formData).then(res=>{
          if(res.code === 200){
            console.log(res)
            this.$message.success(res.msg)
            this.submitLoading = false
          }else{
            console.log(res.msg)
            this.submitLoading = false
          }
        })
      },
      submit(){
        this.submitLoading = true
        console.log(this.formData,'submit',this.formData)
        this.formData.fenxiao.info2 = {}
        this.data.forEach((item,index)=>{
          console.log(item,index)
          this.formData.fenxiao.info2[index+1]= item
        })
        console.log(this.formData)
        this.AdminUserUserLevelSetRebateInfoFn()
      },
      goBack(){
        this.$router.push({name:'GradeList'})
      },
      onChangeOperators(value){
        console.log(value.target.checked)
        this.formData.fenxiao.isoperator = value.target.checked?1:0;
        this.tabColumnsFn()
      },
      obgToArr(obj){
        let arr = []
        for(let prop in obj) {
        arr.push({
            key: prop,
            name: obj[prop]
          })
        }
        return arr
      },
      tabColumnsFn(){
        this.gradeList = []
        let agentColumns = []
        this.templateSlot = []
        if(this.formData.fenxiao.isoperator == 1){
          console.log('1111',this.gradeList)
          let agent = this.obgToArr(this.levelList.info.agent)
          let operator = this.obgToArr(this.levelList.info.operator)
          this.gradeList = agent.concat(operator)
          // this.gradeList = cloneDeep(Object.assign(this.gradeList,this.levelList.info.agent,this.levelList.info.operator))
        }else{
          console.log('0000',this.gradeList)
          let agent = this.obgToArr(this.levelList.info.agent)
          this.gradeList = agent
          // this.gradeList = cloneDeep(this.levelList.info.agent)
        }
        console.log(this.gradeList,'tabColumnsFn')
        this.gradeList.forEach((item,index)=>{
          console.log(item,index,"Object.keys(agent)")
          let agentTemplate = {
            title: item.name,
            key:index,
            width: 145,
            dataIndex: index,
            className: 'column-money',
            ellipsis: true,
            scopedSlots: { customRender: index }
          }
          this.templateSlot.push(item)
          this.newTeam1[item.key] = ""
          console.log(agentTemplate)
          agentColumns.push(agentTemplate)
        })
        let columnsTitle = {
          slots: { title: 'customTitle' },
          width:"200px",
          className: 'column-money',
          fixed: 'left',
          scopedSlots: { customRender: 'titleCol' },
        }
        agentColumns.unshift(columnsTitle)
        this.columns = agentColumns
        this.columnWidth = this.templateSlot.length*120 + 200 
      },
      teamChange(e){
        this.formData.team.status = e
      },
      teamColumnsFn(type){
        console.log(type)
        if(type===1){
          let teamList = []
          let agentColumns = []
          this.templateSlotTeamIssue = []
          let agent = this.obgToArr(this.levelList.issue_info.agent)
          let operator = this.obgToArr(this.levelList.issue_info.operator)
          teamList = agent.concat(operator)
          // teamList = cloneDeep(Object.assign(teamList,this.levelList.issue_info.agent,this.levelList.issue_info.operator))
          teamList.forEach((item,index)=>{
            let agentTemplate = {
              title: item.name,
              key:index,
              width: teamList.length>4?145:"",
              dataIndex: index,
              className: 'column-money',
              ellipsis: true,
              scopedSlots: { customRender: index }
            }
            this.templateSlotTeamIssue.push(item)
            this.newTeam2[item] = ""
            agentColumns.push(agentTemplate)
          })
          let columnsTitle = {
            slots: { title: 'customTitle' },
            width:"200px",
            className: 'column-money',
            fixed: 'left',
            scopedSlots: { customRender: 'titleCol' },
          }
          agentColumns.unshift(columnsTitle)
          this.teamcolumns = agentColumns
          this.teamcolumnWidth = this.templateSlotTeamIssue.length*120 + 200 
        }else{
          let teamList = []
          let agentColumns = []
          this.templateSlotCommission = []
          console.log(JSON.stringify(this.levelList.issue_info.operator),'issue_info')
          if(JSON.stringify(this.levelList.issue_info.operator)!="[]"){
            this.showCommission = true
            let operator = this.obgToArr(this.levelList.issue_info.operator)
            // teamList = cloneDeep(this.levelList.commission_info.operator)
            teamList = operator
            teamList.forEach((item,index)=>{
              let agentTemplate = {
                title: item.name,
                key:index,
                width: teamList.length>4?145:"",
                dataIndex: index,
                className: 'column-money',
                ellipsis: true,
                scopedSlots: { customRender: index }
              }
              this.templateSlotCommission.push(item)
              this.newTeam2[item] = ""
              agentColumns.push(agentTemplate)
            })
            let columnsTitle = {
              slots: { title: 'customTitle' },
              width:"200px",
              className: 'column-money',
              fixed: 'left',
              scopedSlots: { customRender: 'titleCol' },
            }
            agentColumns.unshift(columnsTitle)
            this.columnsCommission = agentColumns
            this.CommissionWidth = this.templateSlotCommission.length*120 + 200
          }else{
            this.showCommission = false
          }
        }
      },
    }
  }
</script>
<style lang="less">
  th.column-money,
  td.column-money {
    text-align: center !important;
    margin: 0 auto;
  }
  .toggle-box1{
    padding:20px 20px 20px 0px;
  }
  .toggle-box{
    padding:0px 20px 20px 20px;
  }
  .help{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  .title-box{
    // width: 100%;
    width: 200px;
    position: relative;
    .title-position{
      position: absolute;
      width: 200px;
      height: 54px;
      left:-18px;
      top:-16px;
      .left{
        position: absolute;
        bottom: 5px;
        left: 10px;
      }
      .right{
        position: absolute;
        top: 5px;
        right: 10px;
      }
      .divide{
        position: absolute;
        top: 26px;
        right: -4px;
        width: 210px;
        border-top: 1px solid #f0f0f0;
        transform:rotate(14.5deg);
        border-collapse: separate;
        border-spacing: 0;
      }
    }
  }
  .help-txt{
    width: 100px;
  }
</style>
<style lang="less" scoped>
  .helps-reletive{
    position: relative;
  }
  .icon-help{
    width: 100px;
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .footer-box{
    position: relative;
  }
  .footer-btn{
    width: 100%;
    z-index: 1999;
    -webkit-box-shadow: 0 -1px 2px rgba(0,0,0,.15);
    box-shadow: 0 -1px 2px rgba(0,0,0,.15);
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 12px 0;
    position: fixed;
    bottom: 0;
    margin-left: -12px;
    min-width: 1200px;
  }
</style>