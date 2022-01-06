<template>
  <a-card class="multi-specs" :bordered="false" :bodyStyle="{background: '#F4F6F8'}">
    <spec-edit ref="specEdit" :specsArray="specsArray" :specsNumLimit="specsNumLimit" @change="onSpecEditChange" @mainSpecChange="onMainSpecChange"/>
    <a-divider></a-divider>
    <batch-setting :batchInputOptions="batchInputOptions" @batchApply="onBatchApply"/>
    <!-- 填写 数据的 表格 -->
    <edit-table 
      ref="editTable"
      :dataSource="tableDataSource"
      :specsArray="specsArray"
      :pagination="pagination" 
      :batchInputOptions="batchInputOptions" 
      @change="handlePageChange" 
      @dataChange="onDataChange"
    />
  </a-card>
</template>
<script>
import BatchSetting from '@/components/byf/multiSpecs/batchSetting'
import EditTable from './editTable'
import SpecEdit from './specEdit/index.vue'
import cloneDeep from 'lodash/cloneDeep'

// 一个规格项的数据模板
// const specsItemDataTemplate = {title:'', is_main_spec:false, items: [{title:''}]}

export default {
  components: { BatchSetting, EditTable, SpecEdit },
  props: {
    dataSource: {
      type: Object,
      required: false,
      default: ()=>{return {spec:[],option:[]}}
    },
    /**
     * 规格类型的数量限制 默认3种规格类型
     */
    specsNumLimit: {
      type: [Number, String],
      require: false,
      default: ()=>{return 3}
    },
    batchOptions: {
      type: Array,
      required: false,
      default: ()=>{return [
        {key:'prime_price', title: '成本价(元)', value: null, type: 'number', unRequire: false},
        {key:'line_price', title: '划线价(元)', value: null, type: 'number', unRequire: false},
        {key:'price', title: '售卖价(元)', value: null, type: 'number', unRequire: false},
        {key:'stock', title: '库存', value: null, type: 'number', unRequire: false},
        {key:'code', title: '商品编码', value: null, unRequire: false},
        {key:'bar_code', title: '商品条码', value: null, unRequire: false},
        {key:'weight', title: '重量(g)', value: null, type: 'number', unRequire: false}
      ]}
    }
  },
  data(){
    return {
      // 规格数组：二维
      specsArray: this.dataSource.spec,
      // specsArray: [JSON.parse(JSON.stringify(specsItemDataTemplate))],
      tableDataSource: this.dataSource.option,
      // 主规格下标
      mainSpecIndex: -1,
      pagination: {
        current: 1,
        pageSize:10,
      },
      // 批量设置的配置
      batchInputOptions: cloneDeep(this.batchOptions)
    }
  },
  created(){
    this.totalResultArray = []
  },
  methods: {
    /**
     * 应用批量设置
     * @param {Array} batchInputOptions 批量设置组件内的数据
     */
    onBatchApply(batchInputOptions){
      this.$refs.editTable.batchSet(batchInputOptions)
    },
    /**
     * 表格中有数据变化
     */
    onDataChange(dataSource){
      dataSource
      // console.log('dataSource: ', dataSource)
    },
    /**
     * 表格分页变化
     */
    handlePageChange(pagination){
      this.pagination.current = pagination.current;
    },
    /**
     * 提供给父级，拿取多规格组件的数据
     */
    getMultiSpecsData(){
      let tableData = JSON.parse(JSON.stringify(this.$refs.editTable.totalDataSource))
      return {
        "spec": JSON.parse(JSON.stringify(this.specsArray)),
        "option": this.formatTableData(tableData)
      }
    },
    /**
     * 进行必填验证
     */
    validate(){
      let specValidate = this.$refs.specEdit.validate()
      let tableValidate = this.$refs.editTable.validate()
      return specValidate && tableValidate
    },
    /**
     * 处理表格数据
     */
    formatTableData(tableData){
      let ms = new Date().getTime()
      tableData.forEach((item) => {
        item.specs = []
        if (!item.tmpid) {
          item.tmpid = ms++;
        }
        this.specsArray.forEach((specItem, specIndex) => {
          item.specs.push(JSON.parse(item['spec'+specIndex]).cSpec.id)
          delete item['spec'+specIndex]
        })
        delete item.key
      })
      return tableData
    },
    
    /**
     * 规格编辑组件有变动（增加，删除，修改等）
     * @param newSpecsArray 新的规格配置数组
     */
    onSpecEditChange(newSpecsArray){
      this.specsArray = newSpecsArray;
      this.$emit('specsChange', newSpecsArray)
      this.$nextTick(()=>{
        // 子接收父组件A属性，A属性在父组件变化，子组件不会立刻接收到变化，会延迟一点时间更新
        this.$refs.editTable.createTotalDataSource();
        this.$refs.editTable.createTotalColumns();
      })
    },
    /**
     * 主规格变化事件
     */
    onMainSpecChange(){
      this.$refs.editTable.clearImgs();
    }
  }
}
</script>
<style lang="less" scoped>
.multi-specs {
  min-width: 1000px;
}
</style>