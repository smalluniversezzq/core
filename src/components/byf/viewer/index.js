
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
/**
* @param {object} data 参数对象
* @param {Array} data.imgs 浏览图片数组
* @param {object} data.options 插件配置
*/
export let ImgViewer = function(data){
  if (!data.options) {
    // 如果没有传配置，则给个默认配置
    data.options = {
      hidden: function () {
        viewer.destroy();
      },
      title:false,
    }
  }
  
  if(!data.options.hidden) {
    // 如果配置中没有hidden事件的处理，则加上默认的hidden事件
    data.options.hidden = function () {
      viewer.destroy();
    }
  }
  let objE = document.createElement("div");
  for (let i=0;i<data.imgs.length;i++) {
    let image = new Image();
    image.src = data.imgs[i];
    objE.append(image)
  }
  console.log({...data.options})
  let viewer = new Viewer(objE, {...data.options,title:[true,(imageData) => `(${imageData.naturalWidth} × ${imageData.naturalHeight})`]})
  viewer.show();
}