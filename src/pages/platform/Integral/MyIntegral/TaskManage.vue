<template>
  <div class='taskmanage'>
    <a-card>
      <a-tabs default-active-key="1" @change="Tabcallback" :animated="false">
        <a-tab-pane key="1" tab="任务配置">
          <configure-to v-if='selectTab==1'>
          </configure-to>
        </a-tab-pane>
        <a-tab-pane key="2" tab="任务池" force-render>
          <task-pool v-if='selectTab==2'>
          </task-pool>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import configureTo from './components/configureTo'
import taskPool from './components/taskPool'
  export default{
    name:"taskmanage",
    components:{
      configureTo,
      taskPool
    },
    data(){
      return {
        selectTab:"1"
      }
    },
    methods:{
      Tabcallback(key){
        console.log(key)
        this.selectTab = key
      },
    },
    created(){

    },
    mounted(){

    },
  }
</script>
<style lang="less">

</style>