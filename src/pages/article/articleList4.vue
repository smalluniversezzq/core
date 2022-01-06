<template>
  <a-card style="height:auto;">
    <iframe
      style="width:100%;height:100%;"
      frameborder="0"
      id="bdIframe1"
      ref="myiframe1"
      src="http://byf.web.com:8081/shop/#/main/workplace"
    ></iframe>
  </a-card>
</template>
<script>
export default {
  mounted() {
    const oIframe = document.getElementById("bdIframe1");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = Number(deviceWidth) - 220 + "px"; //数字是页面布局宽度差值
    oIframe.style.height = Number(deviceHeight) - 120 + "px"; //数字是页面布局高度差

    // 在这里进行监听
    window.addEventListener("testevent", res => {
      // console.log("接收数据");
      console.log(res.detail);
    });
  },
  methods: {}
};
</script>