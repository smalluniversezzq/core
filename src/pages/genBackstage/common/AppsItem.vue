<template>
  <div class="addonsItem" :class="{active: itemData.selected}" :style="{cursor: selectable?'pointer':'auto'}" @click="onClick">
    <a-avatar class="app-avatar" shape="square" :size="67" :src="itemData.logo"></a-avatar>
    <div class="rightDesc">
      <div class="name">{{itemData.name}}</div>
      <div class="types">
        <byf-icon class="typesIcon" type="iconweixin"></byf-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      required: true
    },
    selectable: {
      type: Boolean,
      default: ()=>{return false}
    },
  },
  data(){
    return {
      selected: false
    }
  },
  methods: {
    onClick(){
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>

.types{
  margin-top: 5px;
  .typesIcon{
    font-size: 18px;
    margin-right: 5px;
    color: rgba(18, 150, 219, 1);
  }
}
.addonsItem{
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 10px;
  position: relative;
  border: 1px solid transparent;
  .app-avatar{
    margin-right: 10px;
  }
  .rightDesc{
    width: 50%;
    max-width: calc(100% - 70px);
    .name{
      margin-bottom: 10px;
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &.active{
    border-color: @primary-color;
    &::before{
      content: '';
      position: absolute;
      border-top: 20px solid rgba(0,0,0,0);
      border-left:  20px solid rgba(0,0,0,0);
      border-bottom: 20px solid @primary-color;
      border-right: 20px solid @primary-color;
      right: 0;
      bottom: 0;
    }
    &::after {
      content: '✓';
      position: absolute;
      right: 2px;
      bottom: 2px;
      color:white;
      font-size: 20px;
    }
  }
}
</style>