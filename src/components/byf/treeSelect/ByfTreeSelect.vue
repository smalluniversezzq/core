<template>
  <a-tree-select
    v-model="treeSelectValue"
    :treeData="treeData"
    :showSearch="showSearch"
    :placeholder="placeholder"
    :treeDefaultExpandAll="treeDefaultExpandAll"
    :allowClear="allowClear"
    :showCheckedStrategy="SHOW_CHILD"
    :treeCheckable="treeCheckable"
    @change="onChange"
  ></a-tree-select>
</template>
<script>
import {TreeSelect} from 'ant-design-vue'
export default {
  props: {
    treeData: TreeSelect.props.treeData,
    value: TreeSelect.props.value,
    showSearch: TreeSelect.props.showSearch,
    placeholder: TreeSelect.props.placeholder,
    treeDefaultExpandAll: TreeSelect.props.treeDefaultExpandAll,
    allowClear: TreeSelect.props.allowClear,
    treeCheckable: TreeSelect.props.treeCheckable
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      treeSelectValue: this.value,
      SHOW_CHILD: TreeSelect.SHOW_CHILD
    }
  },
  methods: {
    onChange(value, label, extra){
      this.$emit('change', value, label, extra)
    }
  }
}
</script>