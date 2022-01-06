<template>
  <a-card>
    <a-card title="受控操作示例">
      <byf-tree :tree-data="treeData" checkable v-model="checkedKeys" @select="onSelect1"/>
      <a-alert :message="checkedKeys.join()"></a-alert>
    </a-card>
    <a-card title="拖动示例" >
      <byf-tree :tree-data="treeData" v-model="checkedKeys" draggable @select="onSelect1" @drop="onDrop"/>
    </a-card>
    <a-card title="异步数据加载">
      <byf-tree :load-data="onLoadData" :tree-data="treeData1" />
    </a-card>
  </a-card>
</template>
<script>
export default {
  data(){
    return {
      checkedKeys: ['0-0-0'],
      treeData: [
        {
          title: '0-0',
          key: '0-0',
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
              ],
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
              ],
            },
            {
              title: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
          ],
        },
        {
          title: '0-2',
          key: '0-2',
        },
      ],
      treeData1: [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        { title: 'Tree Node', key: '2', isLeaf: true },
      ]
    }
  },
  methods: {
    onSelect1(selectedKeys){
      this.$message.info('点击了'+selectedKeys+'节点')
    },
    onDrop(info) {
      console.log(info)
    },
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: 'Child Node', key: `${treeNode.eventKey}-0` },
            { title: 'Child Node', key: `${treeNode.eventKey}-1` },
          ];
          this.treeData1 = [...this.treeData1];
          resolve();
        }, 1000);
      });
    },
  }
}
</script>