import linkSelector from './index.vue'
export default {
  install (Vue) {
    function selector(data = {}) {
      return new Promise((resolve, reject) => {
        try {
          const linkConstructor = Vue.extend(linkSelector);
          linkConstructor.prototype.destroy = function(){
            if (this.$el && this.$el.parentNode) {
              this.$el.parentNode.removeChild(this.$el);
            }
            this.$destroy();
          }
          const instance = new linkConstructor({
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

    Vue.prototype.$byfLinkSelector = selector;

    return selector;
  }
}