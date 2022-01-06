<template>
  <div class="analysis">
    <a-row :gutter="10">
      <!-- 总用户数 -->
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="总用户数">
          <template slot="totalSlot">
            <a-statistic :value="user.total" />
          </template>
          <a-tooltip placement="bottom" title="总用户数指平台所有手机号注册用户数；周同比指今日与上周同一天对比数据变化，日环比指今日与昨日对比数据变化，绿色表示下降，红色表示增长。" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend v-if="user.ratio" style="margin-right: 16px" term="周同比" :percent="user.ratio.week.ratio" :is-increase="user.ratio.week.type == 2" :scale="0" />
            <trend v-if="user.ratio" term="日环比" :percent="user.ratio.day.ratio" :scale="0" :is-increase="user.ratio.day.type == 2" />
          </div>
          <div slot="footer" class="card-footer">日活跃用户数 <span><a-statistic style="display: inline" valueStyle="font-size: 14px;display: inline" :value="user.active" /></span></div>
        </chart-card>
      </a-col>
      <!-- 总销售额 -->
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="总销售额">
          <template slot="totalSlot">
            <a-statistic prefix="￥" :precision="2" :value="sales.all_amount" />
          </template>
          <a-tooltip placement="bottom" title="统计系统中订单销售总金额（包含所有付款状态订单），目前订单仅包含线上商城订单。" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress 
              :leftTooltip="'正常订单：￥' + sales.sale_amount" 
              :rightTooltip="'维权订单：￥' + sales.protect_amount" 
              :leftValue="sales.sale_amount"
              :rightValue="sales.protect_amount"
              height="10px"/>
          </div>
          <div slot="footer" class="card-footer" style="white-space: nowrap;overflow: hidden">
            日均销售额 ￥<span>
            <a-statistic 
              style="display: inline" 
              valueStyle="font-size: 14px;display: inline" 
              :precision="2"
              :value="sales.avg_amount" /></span>
          </div>
        </chart-card>
      </a-col>
      <!-- 订单数 -->
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="订单数">
          <template slot="totalSlot">
            <a-statistic :value="order.order_count" />
          </template>
          <a-tooltip placement="bottom" title="统计系统中订单销售总总数（包含所有付款状态订单），目前订单仅包含线上商城订单。客单价 = 订单总金额/下单用户总数；笔单价 = 订单总金额/订单总数量。" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div class="card-center">
            <span style="margin-right: 16px">
              客单价￥<a-statistic 
                style="display: inline" 
                valueStyle="font-size: 14px;display: inline" 
                :precision="2"
                :value="order.people_avg" />
            </span>
            <span>笔单价￥<a-statistic 
                style="display: inline" 
                valueStyle="font-size: 14px;display: inline" 
                :precision="2"
                :value="order.order_avg" /></span>
          </div>
          <div slot="footer" class="card-footer">
            日均订单数 
            <span>
            <a-statistic 
              style="display: inline" 
              valueStyle="font-size: 14px;display: inline" 
              :value="order.day_order_avg" /></span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="店铺结算金额">
          <template slot="totalSlot">
            <a-statistic prefix="￥" :precision="2" :value="settlement.settlement_amount" />
          </template>
          <a-tooltip placement="bottom" title="统计平台给店铺结算的总金额以及近期的结算记录图。" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <div class="miniBar" id="miniBar" ref="miniBar"></div>
            <!-- <mini-bar /> -->
          </div>
          <div slot="footer">总结算订单数 <span><a-statistic 
              style="display: inline" 
              valueStyle="font-size: 14px;display: inline" 
              :value="settlement.settlement_order" /></span></div>
        </chart-card>
      </a-col>
      
    </a-row>
    <a-card size="small" :loading="loading" style="margin-top: 10px">
      <div class="salesCard">
        <a-tabs v-model="activeKey" @change="tabsChange">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a 
                v-for="item in centerBarDateList" 
                :key="item.key"
                :class="{'activeDate': activeDate == item.key}"
                @click="toggleDate(item)" 
              >{{item.name}}</a>
            </div>
            <a-range-picker v-model="centerBarDate" @openChange="openChange" @calendarChange="calendarChange" :disabled-date="disabledDate" @change="toggleDate" :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.name"></a-tab-pane>
        </a-tabs>
        <template>
          <a-spin :spinning="salesVolumeChartsLoading">
            <div ref="salesVolumeCharts" style="height: 400px"></div>
          </a-spin>
        </template>
      </div>
    </a-card>
    <a-row>
      <a-col style="padding-right: 10px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card 
          :loading="loading" 
          :bordered="false" 
          style="margin-top: 10px" 
          title="系统更新记录">
          <div class="footer-card-content">
            <a-timeline class="timeline-wrap">
              <a-timeline-item class="timeline-item" v-for="item in timelineData" :key="item.id">
              <div class="timeline-box">
                  <div class="timeline-title">
                    <byf-icon v-if="item.is_show == 0" type="iconyincang"></byf-icon>
                    <a class="title-text" @click="toPlatformSystemUpdate(item)"> {{item.title}} </a>
                  </div>
                  <ul class="update-list" v-if="item.update_items.length > 0">
                    <li class="update-item" 
                      v-for="(lineItem, lineIndex) in item.update_items" 
                      :key="'lineItem' + lineIndex"
                      v-show="lineIndex <= 3">
                        <a v-if="lineIndex == 3" @click="toPlatformSystemUpdate(item)">
                          <byf-icon style="font-size: 15px;" type="iconxiazai9"></byf-icon>
                        </a>
                        <span class="lineItem-text" v-else>{{lineItem}}</span>
                    </li>
                  </ul>
                  <div class="timeline-time">
                    {{moment.unix(item.release_time).format("YYYY-MM-DD")}}
                  </div>
              </div>
            </a-timeline-item>
            </a-timeline>
            <a-empty style="margin-top: 80px" v-if="timelineData.length == 0 && !loading"></a-empty>
          </div>
          <a-button size="small" slot="extra" type="link" @click="toPlatformSystemUpdate">更多></a-button>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card 
          :loading="loading" 
          :bordered="false" 
          style="margin-top: 10px;" 
          title="店铺销售排行">
          <a-spin :spinning="rankListLoading">
            <div class="footer-card-content">
              <div class="rank">
                <ul class="list">
                  <li :key="index" v-for="(item, index) in rankList">
                    <span :class="index < 3 ? 'active' : null">{{index + 1}}</span>
                    <span >{{item.name}}</span>
                    <span >{{item.total}}</span>
                  </li>
                </ul>
              </div>
              <a-empty style="margin-top: 80px" v-if="rankList.length == 0 && !loading"></a-empty>
            </div>
          </a-spin>
          <div class="extra-wrap" slot="extra">
            <div class="extra-item">
              <a 
                v-for="item in rankDateList" 
                :key="item.key"
                :class="{'activeDate': rankDateActiveDate == item.key}"
                @click="toggleRankDate(item)" 
              >{{item.name}}</a>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { getAdminPlatformSystemUpdateIndex } from '@/services/admin/platform/platform/index'
import { getAdminPlatformIndex, getAdminPlatformIndexHistogram, getAdminPlatformStoreRank } from '@/services/admin/platform/platform/index'
import ChartCard from './common/ChartCard'
// import MiniArea from '../../../components/chart/MiniArea'
// import MiniBar from '../../../components/chart/MiniBar'
// import Bar from '../../../components/chart/Bar'
// import RankingList from '../../../components/chart/RankingList'
// import HotSearch from './HotSearch'
// import SalesData from './SalesData'
import Trend from './common/Trend'
import MiniProgress from './common/MiniProgress'

// echarts 按需引入 start
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent
} from 'echarts/components';
import {
    BarChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);
// echarts 按需引入 end

export default {
  name: 'Analysis',
  i18n: require('./i18n'),
  components: {
    Trend, 
    // SalesData, 
    // HotSearch, 
    // RankingList, 
    // Bar, 
    MiniProgress, 
    // MiniBar, 
    // MiniArea, 
    ChartCard
  },
  data () {
    return {
      moment,
      loading: false,
      miniBarCharts: null,

      tabList: [
        {key: 'sales', name: '销售额'},
        {key: 'order', name: '订单数'},
        {key: 'user', name: '用户数'},
        {key: 'visitor', name: '访问量'},
      ],
      activeKey: 'sales',
      centerBarDateList: [
        {key: '3', name: '近7日'},
        {key: '4', name: '近15日'},
        {key: '5', name: '近30日'},
        {key: '8', name: '近1年'},
      ],
      centerBarDate: [],
      activeDate: '3',
      rankDateList: [
        {key: '1', name: '今日'},
        {key: '3', name: '近7日'},
        {key: '4', name: '近15日'},
        {key: '5', name: '近30日'},
        {key: '8', name: '近1年'},
      ],
      rankDateActiveDate: '3',

      salesVolumeChartsLoading: false,
      salesVolumeCharts: null,

      timelineData: [],
      user: {}, // 用户总数部分
      sales: {}, // 总销售额部分
      order: {}, // 订单数部分
      settlement: {}, // 店铺结算金额部分（mini柱状图）

      centerBarParams: {
        type: '', 
        time_type: '',
        start_time: '',
        end_time: ''
      },
      centerBarData: [],
      storeRankParams: {
        time_type: '',
      },
      rankList: [],
      rankListLoading: false,
      calendarChangeStartValue: null,
      section: false, // 是否限制选择日期范围
    }
  },
  created() {
    this.centerBarParams.type = this.activeKey;
    this.centerBarParams.time_type = this.activeDate;
    this.storeRankParams.time_type = this.rankDateActiveDate;
  },
  mounted(){
    console.log(axios.all)
    this.getPageAllDate();
  },
  methods:{
    openChange(val){
      if(!val){
        this.calendarChangeStartValue = null;
      }
    },
    calendarChange(val){
      this.calendarChangeStartValue = val[0];
    },
    toPlatformSystemUpdate(){
      this.$router.push({name: 'platformSystemUpdate'})
    },
    disabledDate(current) {
      // Can not select days before today and today
      let flag = false; // 是否限制时间范围
      if(this.calendarChangeStartValue){
        // 限制时间范围为31天，moment获取的30即为31天
        flag = Math.abs(current.diff(this.calendarChangeStartValue, 'days')) > 30;
      }
      return (current && current > moment().endOf('day')) || flag;
    },
    async getPageAllDate(){
      this.loading = true;
      await axios.all([
        this.getSystemUpdate(), 
        this.getAdminPlatformIndex(), 
        this.getAdminPlatformIndexHistogram(this.centerBarParams),
        this.getAdminPlatformStoreRank(this.storeRankParams)
      ])
      this.loading = false;
      // 所有请求完成后再初始化页面
      // 注意使用 $nextTick 防止loading结束后元素渲染前无法找到图标dom元素
      this.$nextTick(() => {
        this.initMiniBar();
        this.initCenterBar();
        this.resizeCharts();
      })
    },
    // 获取系统更新记录
    getSystemUpdate(){
      return getAdminPlatformSystemUpdateIndex({page_size: 5}).then(res => {
        console.log(res)
        if(res.code == 200){
          this.timelineData = res.data.list;
        }
      })
    },
    // 获取头部数据
    getAdminPlatformIndex(){
      return getAdminPlatformIndex().then(res => {
        if(res.code == 200){
          console.log(res)
          this.user = res.data.user;
          this.sales = res.data.sales;
          this.order = res.data.order;
          this.settlement = res.data.settlement;
        }
      })
    },
    // 获取tabs柱状图数据
    getAdminPlatformIndexHistogram(params){
      console.log('getAdminPlatformIndexHistogram')
      console.log(params)
      return getAdminPlatformIndexHistogram(params).then(res => {
        console.log(res)
        if(res.code == 200){
          this.centerBarData = res.data;
        }
      })
    },
    // 获取店铺排行
    getAdminPlatformStoreRank(params){
      return getAdminPlatformStoreRank(params).then(res => {
        console.log(res)
        if(res.code == 200){
          this.rankList = res.data;
        }
      })
    },
    toggleDate(date){
      console.log(date)
      this.activeDate = date.key || null;
      if(this.activeDate){
        // 选择时间类型
        this.centerBarParams.start_time = '';
        this.centerBarParams.end_time = '';
        this.centerBarParams.time_type = this.activeDate;
        this.centerBarDate = [];
      }else if(date.length > 0){
        // 选择时间区域
        this.centerBarParams.start_time = this.moment(date[0]).format("YYYY-MM-DD")
        this.centerBarParams.end_time = this.moment(date[1]).format("YYYY-MM-DD")
      }else{
        this.centerBarParams.start_time = '';
        this.centerBarParams.end_time = '';
        this.activeDate = '3';
      }
      this.salesVolumeChartsLoading = true;
      this.getAdminPlatformIndexHistogram(this.centerBarParams).then(() => {
        this.initCenterBar();
      }).finally(() => {
        this.salesVolumeChartsLoading = false;
      })
    },
    tabsChange(val){
      console.log(val)
      console.log(this.activeKey)
      this.centerBarParams.type = this.activeKey;
      this.salesVolumeChartsLoading = true;
      this.getAdminPlatformIndexHistogram(this.centerBarParams).then(() => {
        this.initCenterBar();
      }).finally(() => {
        this.salesVolumeChartsLoading = false;
      })
    },
    toggleRankDate(date){
      console.log(date)
      this.rankDateActiveDate = date.key;
      this.storeRankParams.time_type = this.rankDateActiveDate;
      this.rankListLoading = true;
      this.getAdminPlatformStoreRank(this.storeRankParams).finally(() => {
        this.rankListLoading = false;
      })
    },
    resizeCharts(){
      if(this.miniBarCharts && this.salesVolumeCharts){
        this.$nextTick(() => {
          setTimeout(() => {
            this.miniBarCharts.resize();
            this.salesVolumeCharts.resize();
          }, 0);
        })
        this.$nextTick(() => {
          window.onresize = () => {
            this.miniBarCharts.resize();
            this.salesVolumeCharts.resize();
          }
        })
      }
    },
    initMiniBar(){
      if(!this.miniBarCharts){
        this.miniBarCharts = echarts.init(this.$refs.miniBar);
      }
      let miniBarDataX = this.settlement.list.map(item => {
        return item.time;
      })
      let miniBarDataValue = this.settlement.list.map(item => {
        return item.total;
      })
      let options = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: '{b0}：￥{c0}'
          },
          grid: {
              left: '-26px',
              right: 0,
              bottom: '100%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  data: miniBarDataX,
                  axisTick: {
                      alignWithLabel: true
                  },
                  show: false,
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  show: false
              }
          ],
          series: [
              {
                  name: '',
                  type: 'bar',
                  barWidth: '50%',
                  showBackground: true,
                  backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.1)'
                  },
                  color: '#1890ff',
                  data: miniBarDataValue
              }
          ]
      };
      this.miniBarCharts.setOption(options)
      
    },
    initCenterBar(){
      if(!this.salesVolumeCharts){
        this.salesVolumeCharts = echarts.init(this.$refs.salesVolumeCharts);
      }
      let centerBarDataX = this.centerBarData.map(item => {
        return item.time;
      })
      let centerBarDataValue = this.centerBarData.map(item => {
        return item.total;
      })
      let prefix = '';
      if(this.activeKey == 'sales'){
        prefix = '￥';
      }
      let b0 = '{b0}：';
      let c0 = '{c0}'
      let tooltipFormatter = b0 + `${prefix}` + c0
      let topValueFormatter = `${prefix}` + c0
      let options = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: tooltipFormatter
          },
          grid: {
              left: '3%',
              right: '3%',
              bottom: 0,
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  data: centerBarDataX,
                  axisTick: {
                      alignWithLabel: true,
                  },
                  show: true,
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  show: true,
                  splitLine: {
                    lineStyle: {
                      type: 'dashed'
                    }
                  },
              }
          ],
          series: [
              {
                  name: '',
                  type: 'bar',
                  barWidth: '50%',
                  color: '#1890ff',
                  data: centerBarDataValue,
                  label: {
                    show: true,
                    position: 'top',
                    formatter: topValueFormatter
                  }
              }
          ]
      };
      this.salesVolumeCharts.setOption(options)
    },
  },
}
</script>

<style lang="less" scoped>
  .extra-wrap{
    .extra-item{
      display: inline-block;
      margin-right: 24px;
      a:not(:first-child){
        margin-left: 24px;
      }
    }
  }
  @media screen and (max-width: 992px){
    .extra-wrap .extra-item{
      display: none;
    }
  }
  @media screen and (max-width: 576px){
    .extra-wrap{
      display: none;
    }
  }
.miniBar{
  height: 30px;
}
.card-footer, .card-center{
  /deep/.ant-statistic-content-value-decimal{
    font-size: 14px;
  }
}
.activeDate{
  color: #40a9ff;
}
.footer-card-content{
  height: 372px;
  overflow: hidden;
}

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
        // display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .timeline-time{
        color: #F54F70;
      }
      .title-text,.lineItem-text{
        text-overflow: ellipsis;
        overflow: hidden;
        display: inherit;
        white-space: nowrap;
      }
    }
  }
}
.rank{
  // padding: 0 32px 32px 72px;
  .list{
    // margin: 25px 0 0;
    padding: 0;
    list-style: none;
    li {
      padding-top: 14px;
      span {
        color: @text-color-second;
        font-size: 14px;
        line-height: 22px;
      }
      span:first-child {
        background-color: @layout-bg-color;
        border-radius: 20px;
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        margin-right: 24px;
        height: 20px;
        line-height: 20px;
        width: 20px;
        text-align: center;
      }
      span.active {
        background-color: #314659 !important;
        color: @text-color-inverse !important;
      }
      span:last-child {
        float: right;
      }
    }
  }
}
</style>
