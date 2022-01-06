<template>
<a-config-provider :locale="locale">
  <a-modal :maskClosable="false" :width="985" :footer="null" v-model="visible" title="图标选择器">
    <div class="icon-selector">
      <div class="search">
        <a-input-search v-model="keyword" placeholder="可搜索中文/英文关键词" enter-button @search="onSearch" />
      </div>
      <a-empty v-if="currentList.length == 0"/>
      <div class="icon-selector-content beauty-scroll" v-else>
        <ul class="icon-warp">
          <li class="icon-item" v-for="(item, index) in currentList" :key="index" @click="checkItem(item)">
            <p class="icon">
              <byf-icon 
                renderType="fontClass" 
                :fontFamily="item.font_file"
                :type="item.font_class"></byf-icon>
            </p>
            <p class="icon-name">
              {{item.name}}
            </p>
          </li>
        </ul>
      </div>
      <div class="footer-page">
        <a-pagination
          show-quick-jumper
          :show-total="pagination['show-total']" 
          v-model="pagination.current" 
          :page-size="pagination.pageSize" 
          :page-size-options="pagination['page-size-options']" 
          show-size-changer
          :total="total" 
          @showSizeChange="pageSizeChange" 
          @change="onChange">
        </a-pagination>
      </div>
    </div>
  </a-modal>
</a-config-provider>
</template>

<script>
import byfIconSelector1 from '@/assets/iconfontSelector/byfIconSelector1/iconfont.json'
import byfIconSelector2 from '@/assets/iconfontSelector/byfIconSelector2/iconfont.json'
import byfIconSelector3 from '@/assets/iconfontSelector/byfIconSelector3/iconfont.json'
import {chunk} from 'lodash';
let locale = require("ant-design-vue/es/locale-provider/zh_CN").default;
export default {
  data(){
    return {
      locale,
      visible: false,
      defaultData: [],
      data: [],
      keyword: '',
      pagination: {
        total: 1000,
        current: 1,
        "show-quick-jumper": true,
        "page-size-options": ['10', '20', '30', '40', '50', '100', '200'],
        pageSize: 50,
        "show-size-changer": true,
        "show-total": total => `共 ${total} 条数据`
      },
    }
  },
  computed:{
    currentList(){
      let data = JSON.parse(JSON.stringify(this.data));
      data = chunk(data, this.pagination.pageSize)[this.pagination.current - 1];
      console.log(data)
      return data || [];
    },
    total(){
      return this.data.length;
    }
  },
  created(){
    this.initIconData();
    this.showModal();
  },
  mounted(){
  },
  methods: {
    initIconData(){
      this.setIconPrefix(byfIconSelector1);
      this.setIconPrefix(byfIconSelector2);
      this.setIconPrefix(byfIconSelector3);
      this.defaultData = [
        ...byfIconSelector1.glyphs, 
        ...byfIconSelector2.glyphs,
        ...byfIconSelector3.glyphs, 
      ]
      this.data = JSON.parse(JSON.stringify(this.defaultData))
    },
    setIconPrefix(obj){
      obj.glyphs.map(item => {
        if(item.font_class.indexOf(obj.css_prefix_text) == -1){
          item.font_class = obj.css_prefix_text + item.font_class;
          item.font_file = obj.css_prefix_text
        }
        return item;
      })
    },
    onSearch(val){
      if(val == ''){
        this.data = this.defaultData;
        return;
      }
      let data = this.defaultData.filter(item => {
        return item.name.indexOf(val) > -1 || item.font_class.indexOf(val) > -1;
      })
      this.pagination.current = 1;
      this.data = data;
    },
    pageSizeChange(current, pageSize){
      this.pagination.pageSize = pageSize;
      this.pagination.current = 1;
    },
    onChange(currentPage){
      this.pagination.current = currentPage;
    },
    checkItem(checkItem){
      this.visible = false;
      this.$emit("confirm", {
        action: "confirm",
        selectedIcon: checkItem,
      });
    },
    showModal(){
      this.visible = true;
    }
  }
}
</script>

<style scoped lang="less">
.icon-selector{
  // padding: 20px 0 20px 20px;
  overflow-x: hidden;
  .search{
    width: 30%;
    margin-bottom: 20px;
    margin-left: 10px;
  }
  .icon-selector-content{
    height: 460px;
    overflow-y: auto;
    overflow-x: hidden;
    overflow-y: auto;
    margin-left: 10px;
    .icon-warp{
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      .icon-item{
        width: 82px;
        height: 82px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 2px;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
        z-index: 0;
        &:hover{
          border: 1px solid @primary-color;
          background-color: #e8eeff;
          .icon, .icon-name{
            color: @primary-color;
          }
        }
        p{
          margin: 0;
        }
        .icon{
          text-align: center;
          margin: 10px auto;
          z-index: 2;
          -webkit-transition: font-size 0.25s linear, width 0.25s linear;
          transition: font-size 0.25s linear, width 0.25s linear;
          color: #162a48;
          font-size: 24px;
        }
        .icon-name{
          text-align: center;
          font-size: 12px;
          line-height: 16px;
          color: var(--text-first);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

      }
    }
  }
  .footer-page{
    padding-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>