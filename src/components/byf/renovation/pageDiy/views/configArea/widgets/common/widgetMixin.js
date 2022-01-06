
import AllWidgets from '@/components/byf/renovation/pageDiy/views/configArea/widgets'

var widgetMixin = {
  components: { ...AllWidgets},
  props: {
    widgetData: {
      type: Object,
      required: true
    },
    /**
     * 控件的层级
     */
    level: {
      type:Number,
      required: true
    }
  },
  created(){
    // 绑定视图实例 和数据 对象
    this.widgetData.bindView(this)
  },
  computed: {
    inputClass(){
      let temp = {
        'ant-form-item-required': this.widgetData.require
      }
      temp['level-'+this.level] = true
      return temp
    }
  },
  methods: {
    /**
     * 当有需要的时候触发事件
     * @param {any}} eValue 要传递的事件值
     */
    triggerEventWhenNeed(eValue){
      if(Object.keys(this.widgetData.event).length > 0) {
        for(let x in this.widgetData.event) {
          let oneEvent = this.widgetData.event[x];
          if(oneEvent.role.includes('trigger')){
            // 设置触发器
            eValue.rule = oneEvent.rule;
            document.dispatchEvent(new CustomEvent(oneEvent.name, {detail: eValue}))
          }
        }
      }
    },

  },
  destroyed(){
    // 触发控件实例的生命周期
    this.widgetData.onDestroyed()
  }
}

export default widgetMixin