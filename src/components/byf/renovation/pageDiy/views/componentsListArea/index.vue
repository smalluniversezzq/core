<template>
  <a-card class="components-list-box" size="small" :bodyStyle="{paddingLeft:0,paddingRight:0}">
    <template slot="title">
      <a-space class="header-space" align="center">
        <byf-icon type="iconsousuo"/>
        <a-input class="header-input" placeholder="搜索组件名称" @change="onChange"></a-input>
      </a-space>
    </template>
    <a-empty v-show="showBlank"></a-empty>
    <a-collapse v-show="!showBlank" class="collapse-box" :bordered="false"  v-model="activeKey">
      <a-collapse-panel :header="item.title" v-for="(item) in componentsClassifyList" :key="item.title">
        <components-list :elementsList="item.children" v-bind="$attrs" v-on="$listeners"></components-list>
      </a-collapse-panel>
    </a-collapse>
  </a-card>
</template>

<script>
import ComponentsList from './componentsList'

export default {
  components: {ComponentsList},
  props: {
    componentsClassifyList: {
      type: Array
    },
  },
  data(){
    return {
      activeKey: []
    }
  },
  computed: {
    showBlank(){
      let blank = true;
      for(let i = 0;i<this.componentsClassifyList.length;i++){
        if(this.componentsClassifyList[i].children.length>0){
          blank = false;
          break;
        }
      }
      return blank;
    }
  },
  mounted(){
    this.componentsClassifyList.forEach((item)=>{
      this.activeKey.push(item.title)
    })
  },
  methods: {
    onChange(e){
      this.componentsClassifyList.forEach(item=>{
        item.searchComponents(e.target.value);
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .components-list-box {
    width: 306px;
    min-width: 306px;
    height: 100%;
    /deep/ .ant-card-head-title {
      text-align: center;
      .header-input {
        border: none;
      }
    }
    .collapse-box {
      background: none;
      .ant-collapse-item {
        border: none;
        /deep/ .ant-collapse-header {
          font-weight: bold;
        }
      }
    }
  }
</style>