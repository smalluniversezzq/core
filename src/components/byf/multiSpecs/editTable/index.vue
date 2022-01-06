<template>
  <div>
    <a-table class="table" :columns="totalColumns" :dataSource="totalDataSource" :pagination="pagination" @change="onChange">
      <template slot="Slots0" slot-scope="record">
        12313
        {{record.title}}
      </template>
      <template v-for="(inputOption, index) in batchInputOptions" :slot="inputOption.key" slot-scope="text, record">
        <div class="input-item" :class="{'has-error': record.hasErrorKey && record.hasErrorKey.includes(inputOption.key)}" :key="'input'+index">
          <a-input :value="record[inputOption.key]" @change="(e)=>{onInputChange(e, record, inputOption)}" @blur="onInputBlur(record, inputOption)"/>
          <span class="tips">{{ record.hasErrorKey && record.hasErrorKey.includes(inputOption.key) ? '请输入':''}}</span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { Table } from "ant-design-vue";
// eslint-disable-next-line
import AddImg from './addImg'

export default {
  // eslint-disable-next-line
  components: {AddImg},
  props: {
    pagination: Table.props.pagination,
    batchInputOptions: {
      required: true
    },
    /**多规格配置数据 */
    specsArray: {
      required: true
    },
    dataSource: {
      required: false,
      default: []
    }
  },
  data(){
    return {
      // table列配置
      columns: [],
      totalDataSource: (()=>{
        let arr = JSON.parse(JSON.stringify(this.dataSource))
        // 初始化添加hasErrorKey 属性
        arr.forEach(item => {
          this.$set(item, 'hasErrorKey', [])
        })
        return arr
      })(),
      totalColumns: [],
      test1: [{"key":0,"abc":123,"spec0":{"index":"0,0","cSpec":{"title":""}},"price":null,"line_price":null,"prime_price":null,"stock":null,"code":null,"bar_code":null,"weight":null}],
      columns1: [{"dataIndex":"spec0","key":"spec0","title":"#", customRender:(value, row,index) => {
            const obj = {
              children: <span>1{value}{row}{index}</span>,
              attrs: {},
            };

            return obj
          }
        },{"title":"成本价(元)","scopedSlots":{"customRender":"price"},"dataIndex":"price"},{"title":"划线价(元)","scopedSlots":{"customRender":"line_price"},"dataIndex":"line_price"},{"title":"售卖价(元)","scopedSlots":{"customRender":"prime_price"},"dataIndex":"prime_price"},{"title":"库存","scopedSlots":{"customRender":"stock"},"dataIndex":"stock"},{"title":"商品编码","scopedSlots":{"customRender":"code"},"dataIndex":"code"},{"title":"商品条码","scopedSlots":{"customRender":"bar_code"},"dataIndex":"bar_code"},{"title":"重量(g)","scopedSlots":{"customRender":"weight"},"dataIndex":"weight"}]
    }
  },
  created(){
    this.createTotalDataSource();
    this.initColumns();
    this.createTotalColumns()
  },
  methods: {
    /**
     * 初始化 columns 配置
     */
    initColumns(){
      let columns = [];
      //eslint-disable-next-line
      this.batchInputOptions.forEach((item, index)=>{
        columns.push({ title: item.title, scopedSlots: { customRender: item.key}, dataIndex: item.key})
      })
      this.columns = columns
    },
    /**根据规格项数据计算 表格 列数据 */
    createTotalColumns(){

      let array = []
      this.specsArray.forEach((item, columnIndex, specsArray)=>{
        let mergeSpan = 1;  // 该分类所占格数（标识如何合并单元格）
        for(let i = specsArray.length-1; i > columnIndex;i--) {
          mergeSpan = mergeSpan * specsArray[i].items.length;
        }
        array.push(
          // eslint-disable-next-line
          { dataIndex: 'spec'+columnIndex, key:'spec'+columnIndex, title: specsArray[columnIndex].title || '#', ellipsis: true,  customRender: (value, row, rowIndex) => {
            // 经测试 只能接收到字符串的值
            value = JSON.parse(value)
            const obj = {
              children: 
                <a-tooltip>
                  <template slot="title">
                  {value.cSpec.title}
                  </template>
                  <span>{value.cSpec.title}</span>
                </a-tooltip>
              ,
              attrs: {},
            };

            // 计算单元格合并数值rowSpan 需要 考虑 分页导致的临界点 和 mergeSpan条数据合并 导致的临界点。
            obj.attrs.rowSpan = this.calculateRowSpan(rowIndex+(this.pagination.current-1)*this.pagination.pageSize, this.pagination.pageSize, mergeSpan)
            
            return obj
          }}
        )

        // 是否添加主图列
        if (item.is_main_spec && item.is_main_spec != 0) {
          array.push({
            dataIndex: 'spec_img',
            key: 'spec_img',
            title: '规格图片',
            customRender: (value, row, rowIndex) => {
              // 经测试 只能接收到字符串类型的值
              const obj = {
                children: this.$createElement(
                  'add-img',
                  {
                    attrs: {
                      imgUrl: value,
                      error: row.imgError
                    },
                    on: {
                      chooseImg:(imgUrl) => { this.onChooseImg(imgUrl, row, rowIndex+(this.pagination.current-1)*this.pagination.pageSize, mergeSpan) },
                      delete:()=>{row.spec_img = ''}
                    }
                  }
                ),
                attrs: {},
              };

              // 计算单元格合并数值rowSpan 需要 考虑 分页导致的临界点 和 mergeSpan条数据合并 导致的临界点。
              obj.attrs.rowSpan = this.calculateRowSpan(rowIndex+(this.pagination.current-1)*this.pagination.pageSize, this.pagination.pageSize, mergeSpan)

              return obj
            }
          })
        }
      })
      this.totalColumns = array.concat(this.columns)
    },
    /**
     * 当切换主规格时，清除已选图片
     */
    clearImgs(){
      this.totalDataSource.forEach(item=>{
        item.spec_img = ''
      })
    },
    /**
     * 生成表格数据
     */
    createTotalDataSource(){
      let simplyArray = this.simplifySpecsData(this.specsArray);
      // console.log('simplyArray: ', simplyArray)
      this.orderedArrangementAndCombination(0, [], simplyArray)
      
      this.totalDataSource = this.createTableDataSource(this.totalResultArray, this.batchInputOptions)
    },
    test(){
      // this.testArray = [['a1','a2','a3'],['b1', 'b2'],['c1', 'c2']]
      this.testArray = this.simplifySpecsData([{"title":"1","is_main_spec":true,"items":[{"title":"2"},{"title":"2"}]},{"title":"3","is_main_spec":false,"items":[{"title":"4"},{"title":"4"}]},{"title":"","is_main_spec":false,"items":[{"title":""}]}])
      this.orderedArrangementAndCombination(0, [], this.testArray)
    },
    onChange(pagination){
      this.$emit('change', pagination)
    },
    onInputChange(e, record, inputOption){
      let value = e.target.value;
      if(value.toString().length > inputOption.maxLength){
        value = value.toString().substr(0, value.toString().length - 1)
      }
      if (inputOption.type == 'number'){  // 限制数字类型时，需要处理只能>=0的数
        value = value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
      } else {
        value = value.replace(/[^a-zA-Z0-9]/ig,'')
      }
      record[inputOption.key] = value;
      this.totalDataSource = JSON.parse(JSON.stringify(this.totalDataSource))
    },
    onInputBlur(record, option){
      if (record[option.key] && record.hasErrorKey.includes(option.key)) {
        record.hasErrorKey.splice(record.hasErrorKey.indexOf(option.key), 1)
      } else if(this.isValidValue(record[option.key]) && !record.hasErrorKey.includes(option.key) && !option.unRequire) {
        record.hasErrorKey.push(option.key)
      }
    },
    isValidValue(val){
      return (val == '' && val.toString() != '0') || val == undefined || val == null
    },
    /**
     * 简化多规格数据，方便处理出table使用的数据格式
     * @param [Array<Object>[Array]] multiSpecsData 二维对象数组数据
     * @returns [Array[Array]] 返回二维数组如：[["0,0","0,1"],["1,0","1,1"],["2,0"]]，每一个值标识该项的二维下标
     */
    simplifySpecsData(multiSpecsData){
      let array = []
      multiSpecsData.forEach((pSpec, i) => {
        array.push([])
        pSpec.items.forEach((cSpec, j) => {
          array[i][j] = {
            index: [i,j].toString(),
            cSpec: cSpec
          };
        })
      })
      return array
    },
    /**
     * 有序排列组合
     * @param [int] index 集合的索引
     * @param [array] array 一种有序排列组合的情况
     * @param [array] originData 原始数据。二维数组。每个子数组是一个集合
     */
    orderedArrangementAndCombination(index, array, originData){
      if (index == 0) { // 第一层时，初始话结果数据
        this.totalResultArray = []
      }
      originData[index] && originData[index].forEach((item) => {
        let newArray = JSON.parse(JSON.stringify(array))
        newArray.push(item)
        if (originData.length - 1 > index) {
          this.orderedArrangementAndCombination(index+1, newArray, originData)
        } else {
          this.totalResultArray.push(newArray)
        }
      })
    },
    /**
     * 生成table直接支持的datasource
     * @param {Array} combinationArray 一维数组，所有规格的所有组合情况
     * @param {Array} batchInputOptions 支持填写的数据
     */
    createTableDataSource(combinationArray, batchInputOptions){
      let array = [];
      combinationArray.forEach((combinationItem, i) => {
        array.push(this.totalDataSource[i] || {})
        array[i].key = i
        combinationItem.forEach((item, j) => {
          array[i]['spec'+j] = JSON.stringify(item)
          array[i].spec_img = this.totalDataSource[i] && this.totalDataSource[i].spec_img || ''
          array[i].hasErrorKey = []
          batchInputOptions.forEach(inputItem => {
            // 这个判断不能漏掉为数字0的情况
            if (this.totalDataSource[i] && (this.totalDataSource[i][inputItem.key] || this.totalDataSource[i][inputItem.key] === 0)) {
              array[i][inputItem.key] = this.totalDataSource[i][inputItem.key]
            } else {
              array[i][inputItem.key] = inputItem.value
            }
          })
        })
      })
       // eslint-disable-next-line
      return JSON.parse(JSON.stringify(array))
    },
    /**
     * 计算合并单元格需要的rowSpan。根据dataIndex数据左右两边最近的临界点来计算rowSpan
     * @param { number } dataIndex 数据的下标（dataIndex 从左到右递增）
     * @param { number } pageSize 每页的条数
     * @param { number } mergeSize 数据每多少条合并到一起
     */
    calculateRowSpan(dataIndex, pageSize, mergeSize,){
      let pageLLimit = Math.floor(dataIndex / pageSize) * pageSize; // 按页数分 左侧的临界点 
      let pageRLimit = Math.floor(dataIndex / pageSize) * pageSize + pageSize; // 按页数分 右侧的临界点
      let mergeLLimit = Math.floor(dataIndex / mergeSize) * mergeSize; // 按合并条数分 左侧的临界点 
      let mergeRLimit = Math.floor(dataIndex / mergeSize) * mergeSize + mergeSize; // 按合并条数分 右侧的临界点 
      let leftLimit = pageLLimit > mergeLLimit? pageLLimit: mergeLLimit;  // 取左侧最近临界点
      let rightLimit = pageRLimit < mergeRLimit? pageRLimit: mergeRLimit; // 取右侧最近临界点
      let rowSpan = 1;
      if (dataIndex == leftLimit) {
        rowSpan = rightLimit - leftLimit;
      } else {
        rowSpan = 0;
      }
      return rowSpan
    },
    /**
     * 批量设置值
     * @param
     */
    batchSet(batchInputOptions){
      this.totalDataSource.forEach(item => {
        batchInputOptions.forEach(setItem => {
          if (setItem.value != null && setItem.value != undefined) {
            item[setItem.key] = setItem.value

            // 批量设置 某个值后，如果有未输入的error，就清掉
            if(item.hasErrorKey.length > 0 && item.hasErrorKey.includes(setItem.key)) {
              item.hasErrorKey.splice(item.hasErrorKey.indexOf(setItem.key), 1)
            }
          }
          
        })
      })
    },
    /**
     * 选择了某个图片
     * @param [string] imgUrl 选择的图片地址
     * @param [record] record 某行数据
     * @param [number] realIndex 数据列表中的索引
     * @param [number] mergeSpan 合并行数
     */
    onChooseImg(imgUrl, record, realIndex, mergeSpan){
      // console.log('realIndex: ', realIndex)
      // console.log('mergeSpan: ', mergeSpan)

      // 给合在一起的行数据添加图片
      let a = Math.floor(realIndex / mergeSpan)
      for(let i= mergeSpan*a;i<mergeSpan*(a+1);i++){
        // console.log('i: ', i)
        this.totalDataSource[i].spec_img = imgUrl
      }
    },
    /**
     * 判断是不是主规格
     */
    isMainSpec(is_main_spec){
      if (is_main_spec == 0 || !is_main_spec) {
        return false
      } else {
        return true
      }
    },
    /**
     * 进行必填验证
     */
    validate(){
      console.log(11111111111111111)
      let pass = true;
      let hasMain = false;
      
      for(let j=0;j<this.specsArray.length;j++){
        if (this.isMainSpec(this.specsArray[j].is_main_spec)) {
          hasMain = true
          break;
        }
      }
      for(let i = 0;i<this.totalDataSource.length;i++) {
        let record = this.totalDataSource[i]
        this.batchInputOptions.forEach(item=>{
          if(this.isValidValue(record[item.key]) && !item.unRequire) {
            //  当一行中某一项输入没有输入
            
            pass = false
            if(!record.hasErrorKey.includes(item.key)) {
              //，并且 hasErrorKey中没有记录该key
              record.hasErrorKey.push(item.key)
            }
          }
          // // 长度验证
          // if(item.maxLength){
          //   console.log('长度限制', item.maxLength)
          //   console.log('长度', record[item.key].length)
          //   if(record[item.key].toString.length > item.maxLength){
          //     pass = false
          //     if(!record.hasErrorKey.includes(item.key)) {
          //       //，并且 hasErrorKey中没有记录该key
          //       record.hasErrorKey.push(item.key)
          //     }
          //   }
          // }
        })

        if(hasMain) {
          // 当有主规格时，才验证图片
          // 验证图片是否已选
          if(!record.spec_img){
            pass = false
            this.$set(record, 'imgError', true)
          } else {
            this.$set(record, 'imgError', false)
          }
        }
      }

      return pass
    }
  }
}
</script>
<style lang="less" scoped>
.table {
  margin-top: 20px;
  background: white;
  /deep/ .ant-table-thead {
    tr {
      th {
        background: white;
      }
    }
  }
  /deep/ table {
    background: white;
  }
  .input-item {
    max-width: 120px;
  }
  .tips {
    display:block;
    font-size:12px;
    color: red;
    height: 0;
    overflow: hidden;
    transition: height .1s;
  }
  .has-error{
    .tips {
      height: 16px;
    }
  } 
  /deep/ .ant-table-pagination {
    float:none;
    text-align: center;
  }
}
</style>