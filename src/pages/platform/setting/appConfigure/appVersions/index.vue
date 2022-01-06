<template>
<!-- app版本管理 -->
  <div>
    <a-card
      size="small"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key, 'noTitleKey')">
      <div v-show="noTitleKey == '0'">
        <!-- <app-upload :cardNode='0'></app-upload> -->
      </div>
      <div v-show="noTitleKey == '1'">
        <div v-if='noTitleKey==1'>
          <download-config></download-config>
        </div>
      </div>
      <div v-show="noTitleKey == '2'">
        <div v-if='noTitleKey==2'>
          <set-uplaod >
        </set-uplaod>
        </div>
      </div>
    </a-card>
    <div class='mt' style='background:#f0f2f5' v-show="noTitleKey == '0'" >
      <app-upload ></app-upload>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import AppUpload from './appupload'
import DownloadConfig from '@/pages/platform/setting/appConfigure/appGlobalConfig/downloadConfig.vue'
import SetUplaod from '@/pages/platform/setting/appConfigure/appVersions/setUplaod.vue'
// import versionTable from './table';
export default {
  components: {
    // versionTable
    AppUpload,
    DownloadConfig,
    SetUplaod
  },
  data(){
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      tabListNoTitle: [
        { key: "0", tab: "APP更新" },
        { key: "1", tab: "APP下载" },
        { key: "2", tab: "更新设置" },
      ],
      timeValue:null,
      noTitleKey:"0",
      terminal:[
        {
          title:"全部",
          value:""
        },
        {
          title:"安卓",
          value:"android"
        },
        {
          title:"苹果",
          value:"ios"
        },
      ],
      upload:[
        {
          title:"全部",
          value:""
        },
        {
          title:"是",
          value:"1"
        },
        {
          title:"否",
          value:"0"
        },
      ],
      download:[
        {
          title:"全部",
          value:""
        },
        {
          title:"跳转下载",
          value:"1"
        },
        {
          title:"直接下载",
          value:"0"
        },
      ],
      searchFormData:{
        terminal:"",
        upload:"",
        download:"",
        start_created_at:"",
        end_created_at:"",
        version_number:"",
      },
    }
  },
  created(){
    // this.getList(this.pagination)
  },
  methods:{
    moment,
    exportExcel(){

    },
    onTabChange(key, type) {
      this[type] = key;
    },
    onChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      this.searchFormData.start_created_at = dateStrings[0]
      this.searchFormData.end_created_at = dateStrings[1]
    },
    // 重置搜索
    resetSearch(){
      let clearSearch = {
        terminal:"",
        upload:"",
        download:"",
        start_created_at:"",
        end_created_at:"",
        version_number:"",
      }
      this.timeValue = null
      this.searchFormData = clearSearch
      this.AdminUserUserLevelUpgradeLogFn()
    },
    search(){
      // this.$refs.versionTable.search();
    },
    toAddOrEditor(){
      this.$router.push({
        name:'appVersionsAddOrEditor',
      })
    },
    // 重置搜索
    // resetSearch() {
    //   this.searchFormData = JSON.parse(JSON.stringify(defaultSearchFormData));
    //   this.$nextTick(() => {
    //     this.search();
    //   })
    // },
  },
}
</script>

<style scoped>

</style>