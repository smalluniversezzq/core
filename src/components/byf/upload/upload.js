import UploadModal from './upload-modal'
export default {
  install (Vue) {
    function upload(data = {}) {
      // if (!data.multiple && !data) {

      // }
      return new Promise((resolve, reject) => {
        try {
          const UploadConstructor = Vue.extend(UploadModal);
          UploadConstructor.prototype.destroy = function(){
            if (this.$el && this.$el.parentNode) {
              this.$el.parentNode.removeChild(this.$el);
            }
            this.$destroy();
          }
          const instance = new UploadConstructor({
            el: document.createElement('div'),
            propsData: data
          })
          instance.$on('confirm', (data)=>{
            resolve(data)
          })
          instance.$on('cancel', (data)=>{
            resolve(data)
          })
          instance.$on('afterClose', ()=>{
            instance.destroy()
          })
          document.querySelector('body').appendChild(instance.$el)
        } catch(e) {
          reject(e)
        }
      })
    }

    Vue.prototype.$byfUpload = upload;

    return upload;
  }
}