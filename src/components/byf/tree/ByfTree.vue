<template>
  <a-tree
    :treeData="treeData"
    :checkable="checkable"
    v-model="treeValue"
    :draggable="draggable"
    :loadData="loadData"
    @check="onCheck"
    @select="onSelect"
    @drop="onDrop"
  />
</template>
<script>
import { Tree } from 'ant-design-vue'
export default {
  props: {
    treeData: Tree.props.treeData,
    checkable: Tree.props.checkable,
    value: Tree.props.value,
    draggable: Tree.props.draggable,
    loadData: Tree.props.loadData
  },
  model: {
    prop: 'value',
    event: 'check'
  },
  data(){
    return {
      treeValue: this.value,
      byfTreeData: this.treeData
    }
  },
  methods: {
    onCheck(checkedKeys, e){
      this.$emit('check', checkedKeys, e)
    },
    onSelect(selectedKeys, e){
      this.$emit('select', selectedKeys, e)
    },
    onDrop(info){
      const dropKey = info.node.eventKey;
      const dragKey = info.dragNode.eventKey;
      const dropPos = info.node.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr);
          }
          if (item.children) {
            return loop(item.children, key, callback);
          }
        });
      };
      const data = [...this.byfTreeData];

      // Find dragObject
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }
      this.byfTreeData = data;
      this.$emit('drop', info)
    }
  }
}
</script>