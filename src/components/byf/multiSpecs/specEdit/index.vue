<template>
  <div class="spec-edit">
    <template v-for="(item, index) in realSpecsArray">
      <a-divider v-if="index > 0" :key="'divider'+index"></a-divider>
      <spec-edit-item 
        :specItemData="item" 
        :mainSpecIndex="index"
        :key="'item'+index" 
        :removeAble="realSpecsArray.length > 1"
        @deleteMe="onDeleteMe(index)" 
        @toggleMainSpec="onToggleMainSpec(index)"
        @itemChange="onItemChange"
      ></spec-edit-item>
    </template>
    <template v-if="realSpecsArray.length < specsNumLimit">
      <a-divider></a-divider>
      <a-button type="link" @click="onClickAddSpecItem">+添加规格项</a-button>
    </template>
  </div>
</template>
<script>
import SpecEditItem from '@/components/byf/multiSpecs/specEdit/SpecEditItem'
import {createNewSpecObj} from './index'


export default {
  components: {SpecEditItem},
  props: {
    specsArray: {
      required: true
    },
    /**
     * 规格类型的数量限制 默认3种规格类型
     */
    specsNumLimit: {
      type: [Number, String],
      require: false,
      default: ()=>{return 3}
    }
  },
  data(){
    return {
      realSpecsArray: JSON.parse(JSON.stringify(this.specsArray))
    }
  },
  methods: {
    
    // 添加规格项
    onClickAddSpecItem(){
      this.realSpecsArray.push(createNewSpecObj())
      this.$emit('change', JSON.parse(JSON.stringify(this.realSpecsArray)))
    },
    // 删除规格项
    onDeleteMe(index){
      this.realSpecsArray.splice(index,1)
      this.$emit('change', JSON.parse(JSON.stringify(this.realSpecsArray)))
    },
    // 切换主规格
    onToggleMainSpec(index){
      if (this.realSpecsArray[index].is_main_spec && this.realSpecsArray[index].is_main_spec != 0) {
        // 取消指定规格的主规格状态
        this.realSpecsArray[index].is_main_spec = false
      } else {
        // 选择指定规格为主规格
        this.realSpecsArray.forEach((item, i)=>{
          item.is_main_spec = index == i
        })
      }
      this.$emit('change', JSON.parse(JSON.stringify(this.realSpecsArray)))

      // 触发主规格变动事件，清空图片
      this.$emit('mainSpecChange')
    },
    onItemChange(){
      this.$emit('change', JSON.parse(JSON.stringify(this.realSpecsArray)))
    },
    /**
     * 进行必填验证
     */
    validate(){
      this.pass = true
      this.realSpecsArray.forEach(item=>{
        this.validateOneItem(item)
      })
      return this.pass
    },
    validateOneItem(item){
      if(!item.title) {
        this.pass = false
        this.$set(item, 'error', true)
      }
      if(item.items && item.items.length > 0) {
        item.items.forEach(t=>{
          this.validateOneItem(t)
        })
      }
    }
  }
}
</script>