<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-card title="图标选择器">
          <p>
            <a-button @click="checkIcon">选择图标</a-button>
          </p>
          <p>
            选中图标：<byf-icon :type="btnCheckIconObj.font_class"></byf-icon>
          </p>
        </a-card>
        <a-card title="图标选择器按钮">
          <ByfIconfontSelectorBtn :icon="icon" @change="iconChange" @clear="onClear"></ByfIconfontSelectorBtn>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="API">
          <a-card title="API">
            <a-alert message="通过'this.$byfIconfontSelector(params)'方法调起上传组件, 此方法会返回一个promise对象。" type="info" show-icon />
            <a-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
              <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
            </a-table>
          </a-card>
          <a-card title="结果回调 Promise.then(res=>{ /**some business*/})">
            <a-table :columns="columns2" :dataSource="dataSource2" :pagination="false"></a-table>
          </a-card>
        </a-card>
        <a-card>
          <a-alert message="一个有默认样式的上传组件按钮。" type="info" show-icon />
          <byf-space direction="vertical">
            <a-card title="传参">
              <a-table :columns="columns1" :dataSource="dataSource3" :pagination="false">
                <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
              </a-table>
            </a-card>
            <a-card title="事件">
              <a-table :columns="columns4" :dataSource="dataSource4" :pagination="false"></a-table>
            </a-card>
          </byf-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      btnCheckIconObj: {
        font_class: 'bs1tishishuoming'
      },
      icon: '',
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'icon', description: '图标font_class', type: 'string',default: '-'},
      ],
      columns2: [
          { title: '参数', dataIndex: 'param' },
          { title: '说明', dataIndex: 'description' },
          { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
          { title: '默认值', dataIndex: 'default' }
      ],
      dataSource2: [
        { key:'1', param: 'action', description: "用户操作：'confirm':用户点击了确认,'cancel':用户点击取消或关闭。", type: 'string',default: ''},
        { key:'2', param: 'selectedIcon', description: "当action=confirm时会有此参数，表示选中的图标对象", type: `
          object{
            "icon_id": "2892820",
            "name": "订单",
            "font_class": "dingdan1",
            "unicode": "ed28",
            "unicode_decimal": 60712
          }
        `,default: ''},
        ],
        dataSource3: [
          { key:'1', param: 'icon', description: '图标类名', type: 'string',default: ''}
        ],
        columns4: [
          { title: '事件名称', dataIndex: 'eventName' },
          { title: '说明', dataIndex: 'description' },
          { title: '回调参数', dataIndex: 'callBack' }
        ],
        dataSource4: [
          { key:'1', eventName: 'change', description: '选中值变化时触发', callBack: `
            function(object{
            "icon_id": "2892820",
            "name": "订单",
            "font_class": "dingdan1",
            "unicode": "ed28",
            "unicode_decimal": 60712
          })
          `},
          { key:'2', eventName: 'clear', description: '清除图标事件', callBack: `--`}
        ],
    }
  },
  methods: {
    checkIcon(){
      this.$byfIconfontSelector({icon: this.btnCheckIconObj.font_class}).then(res => {
        console.log(res)
        if(res.action == 'confirm'){
          // 确认
          this.btnCheckIconObj = res.selectedIcon;
        }
      })
    },
    iconChange(val){
      console.log('demoIcon：' + val)
      console.log(val);
    },
    onClear(){
      alert('清除图标')
    }
  }
}
</script>

<style scoped lang="less">
.iconWrap{
  cursor: pointer;
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  border: 1px solid #e9edef;
  position: relative;
  text-align: center;
  .close{
    font-size: 16px;
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    color: #b8b9bd;
    display: none;
  }
  .icon-replace-box{
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    bottom:0;
    overflow: hidden;
    .icon-replace {
      height: 20px;
      margin-top: 20px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.7);
      text-align: center;
      line-height: 20px;
      color: #ffffff;
      font-size: 12px;
      pointer-events: none;
      transition: margin-top .3s;
    }
  }
  &:hover {
    .icon-replace {
      pointer-events:auto;
      display: block;
      margin-top: 0px;
    }
    .close {
      display: block;
      &:hover {
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>