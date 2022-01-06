<template>
  <div class="uploadimgs">
    <a-row class="good-seat-wrap">
      <a-col :span="21">
        <a-row>
          <a-radio-group v-model="formData.update_frequency">
            <a-col class="good-seat-item" :span="6">
              <a-avatar shape="square" :size="100"></a-avatar>
              <a-radio class="radio" :value="0"> 样式一 </a-radio>
            </a-col>
            <a-col class="good-seat-item" :span="6">
              <a-avatar shape="square" :size="100"></a-avatar>
              <a-radio class="radio" :value="1"> 样式二 </a-radio>
            </a-col>
            <a-col class="good-seat-item" :span="6">
              <a-avatar shape="square" :size="100"></a-avatar>
              <a-radio class="radio" :value="1"> 样式二 </a-radio>
            </a-col>
            <a-col class="good-seat-item" :span="6">
              <byf-upload-btn class="byf-upload-btn" @change="changeOfOpenImgAll" :imgsList="logoImgList"></byf-upload-btn>
              <a-radio class="radio" :value="1"> 自定义样式 </a-radio>
              <span class="tip">建议尺寸20*20，jpg、png格式</span>
            </a-col>
          </a-radio-group>
        </a-row>
      </a-col>
      <a-col :span="3">
        <help class="help" style="padding-left: 5px;">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605173243331&di=13ea476cc9749579fec9a3bc6c160783&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg" alt="">
          </help>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  export default{
    props:{

    },
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>
<style scoped lang="less">
  .uploadimgs{

  }
</style>