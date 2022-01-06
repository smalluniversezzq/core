<template>
  <div class="nav-btn">
    <div class="big-btn" v-if="navInfo.extrude==2">
        <div class="round-bg">
            <byf-icon renderType="fontClass" type="iconhuxing" :style="{color: backgroundColor}"></byf-icon>
        </div>
        <div class="icon-box" v-if="navInfo.btn_type.key==1">
            <byf-icon renderType="fontClass" :fontFamily="navInfo.btn_type.icon.font_file" :type="navInfo.btn_type.icon.font_class" :style="{color: navInfo.btn_type.default_color}"></byf-icon>
        </div>
        <img class="img" v-else :src="navInfo.btn_type.default_image.url" alt="">
        <div class="nav-title" :style="{color: textColor}">{{navInfo.btn_text}}</div>
    </div>
    <div class="small-btn" v-else>
        <div class="icon-box" v-if="navInfo.btn_type.key==1">
            <byf-icon renderType="fontClass" :fontFamily="navInfo.btn_type.icon.font_file" :type="navInfo.btn_type.icon.font_class" :style="{color: navInfo.btn_type.default_color}"></byf-icon>
        </div>
        <img class="img" v-else :src="navInfo.btn_type.default_image.url" alt="">
        <div class="nav-title" :style="{color: textColor}">{{navInfo.btn_text}}</div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        navInfo: {
            type: Object
        },
        textColor: {
            type: String
        },
        backgroundColor: {
            type: String
        }
    }
}
</script>

<style lang="less" scoped>
.nav-btn {
    flex: 1;
    justify-content: center;
    height: 52px;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    .big-btn {
        
        height: 52px;
        position: relative;
        width: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: -14px;
        .round-bg {
            display: flex;
            justify-content: center;
            // width: 90px;
            position: absolute;    
            font-size: 24px;
            top: -13px;
            left: 3px;
            // height:24px;
            text-align: center;
        }
        .icon-box {
            line-height: 0;
            font-size: 34px;
            position: relative;
            z-index: 1;
        }
        .img {
            width: 34px;
            height: 34px;
            position: relative;
        }
    }
    .small-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon-box {
            height: 21px;
            width: 21px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .anticon {
                font-size: 20px;
            }
        }
        .img {
            height: 21px;
            width: 21px;
        }
    }
    .nav-title {
        padding-top: 3px;
        font-size: 11px;
    }
}
</style>