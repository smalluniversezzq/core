import iconfontSelector from './index.vue'
export default {
  install (Vue) {
    function selector(data = {}) {
      return new Promise((resolve, reject) => {
        try {
          const iconfontConstructor = Vue.extend(iconfontSelector);
          iconfontConstructor.prototype.destroy = function(){
            if (this.$el && this.$el.parentNode) {
              this.$el.parentNode.removeChild(this.$el);
            }
            this.$destroy();
          }
          const instance = new iconfontConstructor({
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

    Vue.prototype.$byfIconfontSelector = selector;

    return selector;
  }
}