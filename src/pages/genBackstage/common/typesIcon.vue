<template>
  <span class="typesIcon">
    <byf-icon v-for="(item, index) in list" :key="item.type" :style="{'font-size': size + 'px'}" v-show="index <= 2" :class="item.icon" class="typesIcon" :type="item.icon"></byf-icon>
    <a-popover v-show="list.length > 3" title="平台类型" placement="right" @click.stop>
      <template slot="content">
        <p v-for="item in list" :key="item.type">{{item.name}}</p>
      </template>
      <byf-icon :style="{'font-size': size + 'px'}" class="typesIcon iconiconfontgengduo" type="iconiconfontgengduo"></byf-icon>
    </a-popover>
  </span>
</template>
<script>
// list:[{type: 0, name: "APP", icon: 'iconanzhuo'}] 格式
// size: number 像素
export default {
  name: 'typesIcon',
  props: ['list', 'size'],
  data(){
    return {}
  }
}
</script>
<style lang="less" scoped>
.typesIcon{
  font-size: 25px;
  margin-right: 5px;
  color: rgba(18, 150, 219, 1);
  &.iconanzhuo{
    color: #a9c72a;
  }
  &.iconweixin{
    color:#00ba01;
  }
  &.iconiconfontgengduo{
    color: #56b7ff;
  }
}
</style>