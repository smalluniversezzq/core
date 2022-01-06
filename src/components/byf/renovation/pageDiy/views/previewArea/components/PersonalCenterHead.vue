<template>
  <div class="personal-center-head one-component">
    <div class="content" :style="{'background-color': componentValue.content_style.bg_color}">
      <div class="option-btns">
        <byf-icon 
          renderType="fontClass"
          :fontFamily="item.icon.font_file"
          v-for="(item, index) in componentValue.function_icon.icon_arr" 
          :key="index" 
          :type="item.icon.font_class"
          :style="{color: item.icon_color, fontSize: item.icon.font_size + 'px'}"
        ></byf-icon>
      </div>
      <div class="info-box">
        <a-avatar icon="user" :src="avatar" :style="getUserLogoStyle()" :size="56"></a-avatar>
        <div class="right">
          <div class="top">
            <div class="nick-name" :style="{color:nicknameColor}">用户昵称</div>
            <div class="level" 
              v-if="levelInfo.key == 1"
              :style="{'background-color': levelInfo.bg_color}"
            >
              <template v-if="levelInfo.icon_type.key != 3">
                <img class="level-icon-img" v-if="levelInfo.icon_type.key == 2" src="@/assets/img/renovation/vipLevel.png" alt="">
                <!-- <byf-icon v-if="levelInfo.icon_type.key == 2" type="iconhuiyuan"></byf-icon>  -->
                <byf-icon 
                  id="personal-level-icon"
                  class="level-icon"
                  renderType="fontClass"
                  :fontFamily="levelInfo.icon_type.icon.font_file"
                  v-if="levelInfo.icon_type.key == 1" 
                  :style="{ color: levelInfo.icon_type.icon_color, fontSize: levelInfo.icon_type.icon.font_size + 'px'}" 
                  :type="levelInfo.icon_type.icon.font_class"></byf-icon> 
              </template>
              <span :style="{ color: levelInfo.text_color}">普通会员</span>
            </div>
          </div>
          <div class="sub-title" v-if="subtitle.key != 4">
            <span :style="{color: subtitle.text_color}">{{{1:'邀请码: ABCDEF',2:'用户ID: 666666',3: subtitle.text}[subtitle.key]}}</span>
            <byf-icon 
              renderType="fontClass"
              :fontFamily="subtitle.copy_button.icon.font_file"
              v-if="subtitle.copy_button.key==1" 
              :type="subtitle.copy_button.icon.font_class"
              :style="{color: subtitle.copy_button.color, fontSize: subtitle.copy_button.icon.font_size + 'px'}"
            ></byf-icon>
            <img v-if="subtitle.copy_button.key==2" :src="subtitle.copy_button.icon.url" alt="">
          </div>
        </div>
      </div>
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
import avatar from '@/assets/img/logo.png'

export default {
  name: 'PersonalCenterHead',
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
      avatar
    }
  },
  computed: {
    componentValue(){
      return this.componentData.getMyValue().data
    },
    nicknameColor(){
      return this.componentValue.user_info.nickname_color
    },
    levelInfo(){
      return this.componentValue.user_info.level_icon
    },
    subtitle(){
      return this.componentValue.user_info.subtitle
    }
  },
  methods: {
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getUserLogoStyle(){
      console.log(this.componentValue)
      return {
        'border-radius': `${this.componentValue.user_info.head_type}px`
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.one-component {
  height: 120px;
  .content {
    padding:0 15px;
    height: 100%;
    .option-btns {
      height: 44px;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .anticon {
        margin-left: 14px;
      }
    }
    .info-box {
      display: flex;
      align-items: center;
      .ant-avatar-square {
        border-radius: 10px;
      }
      .right {
        margin-left: 13px;
        display: flex;
        flex-direction: column;
        .top {
          display: flex;
          align-items: center;
          .nick-name {
            font-size: 16px;
            font-weight: 500;
            margin-right: 5px;
          }
          .level {
            border-radius: 3px;
            height: 18px;
            padding: 0 3px;
            line-height: 18px;
            display: flex;
            align-items: center;
            .level-icon-img{
              width: 14px;
            }
            .level-icon{
              font-size: 12px;
              display: flex;
              // margin-top: -5px;
            }
            span {
              font-size: 12px;
              margin-left: 3px;
            }
          }
        }
        .sub-title {
          display: flex;
          align-items: center;
          margin-top: 6px;
          span {
            font-size: 12px;
            margin-right: 5px;
          }
          img {
            height: 15px;
          }
        }
      }
    }
  }
}
</style>