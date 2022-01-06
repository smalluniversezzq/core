<template>
  <a-row>
    <a-col :span="12">
      <a-card title="演示">
        <a-alert type="info">
          <template slot="message">
            <div>使用方式： </div>
            <div>import { ImgViewer } from '@/components/byf/viewer';</div>
            <div>ImgViewer(paramsObj)</div>
          </template>
        </a-alert>
        <br>
        <img v-for="(item,index) in imgs" :key="index" @click="preview" :src="item" alt="">
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="API">
        <a-card title="paramsObj属性">
          <a-table :columns="columns1" :dataSource="dataSource1" :pagination="false">
            <span slot="type" slot-scope="text" style="color: #c41d7f;">{{text}}</span>
          </a-table>
        </a-card>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { ImgViewer } from '@/components/byf/viewer'

export default {
  data(){
    return {
      imgs: [
        'http://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20201215/b7d280de3b77f9fc224d7e9745ab04a55fd86819c1d12.jpg',
        'http://byf-test.oss-cn-beijing.aliyuncs.com/uploads/image/20201203/7ab5f05693386c125e3cf74343d2d3ef5fc839e71a0ae.jpg'
      ],
      columns1: [
        { title: '参数', dataIndex: 'param' },
        { title: '说明', dataIndex: 'description' },
        { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' }, },
        { title: '默认值', dataIndex: 'default' }
      ],
      dataSource1: [
        { key:'1', param: 'imgs', description: '图片地址数组', type: 'array',default: ''},
        { key:'2', param: 'options', description: '配置数据。完整配置https://github.com/fengyuanchen/viewerjs/blob/master/README.md#options', type: 'object',default: ''},
      ],
    }
  },
  methods: {
    preview(){
      ImgViewer({
        imgs: this.imgs,
        options: {
          button: false, // 隐藏右上角关闭按钮
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.anticon {
  margin: 10px;
  font-size: 60px;
}
</style>