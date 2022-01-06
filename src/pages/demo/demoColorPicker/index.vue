<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-card title="颜色选择器">
          <a-card title="组件：byfColorPicker">
            <byf-color-picker ref="byfColorPicker" :colors="colors" @change="change"></byf-color-picker>
            <div>
              选中值：
              <a-input v-model="colors" @input="initColor"></a-input>
              <p>rgbaStr：{{checkVal.rgbaStr || colors}}</p>
            </div>
            <div>
              change事件回调值：
              <p>{{checkVal}}</p>
            </div>
          </a-card>
          <a-card title="组件：ColorSelector">
            <color-selector 
              :colors="colors" 
              @change="onChange"
              @reset="onReset()"
            ></color-selector>
          </a-card>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="byfColorPicker">
          <a-card title="API">
            <a-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
              <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
            </a-table>
          </a-card>
          <a-card title="事件">
            <a-table :columns="columns2" :dataSource="dataSource2" :pagination="false">
              <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
            </a-table>
          </a-card>
          <a-card title="方法">
            <a-table :columns="columns3" :dataSource="dataSource3" :pagination="false">
              <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
            </a-table>
          </a-card>
        </a-card>
        <a-card title="ColorSelector">
          <a-card title="API">
            <a-table :columns="columns1" :dataSource="dataSource4" :pagination="false">
              <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
            </a-table>
          </a-card>
          <a-card title="事件">
            <a-table :columns="columns2" :dataSource="dataSource5" :pagination="false">
              <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
            </a-table>
          </a-card>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import byfColorPicker from '@/components/byf/byfColorPicker/byfColorPicker'
import ColorSelector from '@/components/byf/byfColorPicker/ColorSelector'
export default {
  name: 'demoColorPicker',
  components: {
    'byf-color-picker': byfColorPicker,
    ColorSelector,
  },
  data(){
    return {
      colors: 'rgba(255,0,0,1)',
      checkVal: '',
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'colors', description: '颜色值(支持十六进制和rgba)', type: 'string',default: '#000000'},
        { key:'2', param: 'placement', description: '选择器弹出位置，支持十二种（参考ant-design气泡卡片位置参数）', type: 'string',default: 'bottom'},
        { key:'3', param: 'radioColors', description: '底部默认颜色列表', type: 'Array<String>(暂支持hex和rgba)',default: ''},
        { key:'4', param: 'defaultColor', description: '清空和重置的默认颜色', type: 'string',default: ''},
      ],
      dataSource4: [
        { key:'1', param: 'colors', description: '颜色值(仅支持rgba)', type: 'string',default: 'rgba(0,0,0,1)'},
        { key:'2', param: 'placement', description: '选择器弹出位置，支持十二种（参考ant-design气泡卡片位置参数）', type: 'string',default: 'bottom'},
        { key:'3', param: 'radioColors', description: '底部默认颜色列表', type: 'Array<String>(暂支持hex和rgba)',default: ''},
        { key:'4', param: 'defaultColor', description: '清空和重置的默认颜色', type: 'string',default: ''},
      ],
      columns2: [
        { title: '事件名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '回调参数', dataIndex: 'callBack' }
      ],
      dataSource2: [
        { key:'1', eventName: 'change', description: "颜色变化时的回调", callBack: 'Function(obj): { hex | rgbaStr | ... }', default: ''},
      ],
      dataSource5: [
        { key:'1', eventName: 'change', description: "颜色变化时的回调", callBack: 'Function(obj): { hex | rgbaStr | ... }', default: ''},
        { key:'2', eventName: 'reset', description: "颜色重置事件", callBack: 'Function(rgbaStr)): {}', default: ''},
      ],
      columns3: [
        { title: '方法名称', dataIndex: 'eventName' },
        { title: '说明', dataIndex: 'description' },
        { title: '参数', dataIndex: 'param' },
      ],
      dataSource3: [
        { key:'2', eventName: 'updateColors',param: 'String:color', description: "$refs 方法，改变颜色显示", default: ''},
      ],
    }
  },
  created(){
  },
  mounted(){
  },
  methods: {
    initColor(){
      this.$refs.byfColorPicker.updateColors(this.colors)
    },
    change(val){
      this.checkVal = val;
    },
    onChange(val){
      this.colors = val
    },
    onReset(val){
      alert('重置了')
      this.colors = val
    }
  },
}
</script>

<style scoped lang="less">

</style>