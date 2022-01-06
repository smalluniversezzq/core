<template>
  <byf-card title="树选择">
    <byf-card title="基本用法">
      <byf-tree-select 
      v-model="value1" 
      style="width: 200px" 
      :tree-data="treeData1" 
      show-search 
      placeholder="Please select" 
      tree-default-expand-all 
      showCheckedStrategy=""
      allow-clear></byf-tree-select>
      <a-alert :message="`选中项的key是${value1}`"></a-alert>
    </byf-card>
    <byf-card title="可勾选，多选">
      <byf-tree-select 
        v-model="value2" 
        style="width: 600px" 
        :tree-data="treeData1" 
        show-search placeholder="Please select" 
        tree-default-expand-all 
        tree-checkable
        allow-clear
        @change="onChange"
      ></byf-tree-select>
      <a-alert :message="`选中项的key是${value2}`"></a-alert>
    </byf-card>
  </byf-card>
</template>
<script>

export default {
  name: 'demoTreeSelect',
  data(){
    return {
      value1: undefined,
      treeData1: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
            {
              title: 'Child Node2',
              value: '0-0-1',
              key: '0-0-1',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
          checkable: false,
          children: [
            {
              title: 'Child Node3',
              value: '0-1-0',
              key: '0-1-0',
              disabled: true,
            },
            {
              title: 'Child Node4',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              title: 'Child Node5',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ],
      value2: undefined,
    }
  },
  methods: {
    onChange(value, label, extra){
      console.log(value)
      console.log(label)
      console.log(extra)
    }
  }
}
</script>