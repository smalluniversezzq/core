<template>
  <div class="iconWrap">
    <div @click="checkOrReplace">
      <byf-icon class="checkIcon" v-if="checkIcon" :type="checkIcon"></byf-icon>
      <byf-icon v-show="!checkIcon" type="iconjiahao" class="iconjiahao"></byf-icon>
      <div v-show="checkIcon" class="icon-replace-box">
        <div class="icon-replace">替换</div>
      </div>
    </div>
    <byf-icon @click="clearIcon" v-show="checkIcon" class="close" type="iconclose" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  data(){
    return {
      checkIcon: this.icon
    }
  },
  methods:{
    clearIcon(){
      this.checkIcon = '';
      this.$emit('clear')
    },
    checkOrReplace(){
      this.$byfIconfontSelector().then(res => {
        console.log('res: ', res)
        if(res.action == 'confirm'){
          // 确认
          this.checkIcon = res.selectedIcon.font_class;
          this.$emit('change', res.selectedIcon)
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.iconWrap{
  .checkIcon{
    font-size: 16px;
  }
  cursor: pointer;
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  border: 1px solid #E9EDEF;
  position: relative;
  text-align: center;
  .iconjiahao{
    color: @primary-color;
  }
  .close{
    font-size: 16px;
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    color: #b8b9bd;
    display: none;
    z-index: 999;
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