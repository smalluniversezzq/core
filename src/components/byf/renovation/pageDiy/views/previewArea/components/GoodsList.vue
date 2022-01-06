<template>
  <div class="goods-list one-component" :style="getComponentStyle(componentValue.content_style)">
    <div class="content" :style="getContentStyle(componentValue.content_style)">
      <ul 
        class="list-default list-ordinary-default">
        <li class="list-item"
        :class="getItemClass(componentValue)"
        :style="getItemStyle(componentValue, index)"
         v-for="(item, index) in goodsList" :key="index">
          <div class="list-item-content" :style="getGoodsCardStyle(componentValue.content_style)">
            <div class="goods-img">
              <img v-if="componentValue.global_element.list_type != 4" src="@/assets/img/renovation/goods_1.png" alt="">
              <img v-else src="@/assets/img/renovation/goods_img_big.png" alt="">
            </div>
            <div class="goods-msg">
              <div class="goods-name text-overflow-2" 
              :style="getGoodsNameStyle(componentValue.content_style)">
                这里是商品名称这里是商品名称这里是商品名称这里是商品名称
              </div>
              <template v-if="componentValue.global_element.list_type != 4">
                <div class="goods-tags" 
                  v-if="componentValue.content_style.brokerage_style.key == 1">
                  <a-tag class="goods-tag" color="#000">
                    <byf-icon renderType="fontClass" type="iconqianbao1" class="iconqianbao1"></byf-icon>
                    预估赚¥10
                  </a-tag>
                </div>
                <div class="goods-price" 
                  v-if="componentValue.content_style.sell_price_color.key == 1"
                  :style="getPriceStyle(componentValue.content_style)">
                <!-- 商品售卖价 -->
                  <span>¥</span>
                  <span class="goods-price-money">20</span>
                </div>
                <div class="goods-line-price">
                  <span class="goods-line-price-wrap" 
                    v-if="componentValue.content_style.line_price_color.key == 1"
                   :style="getLinePriceStyle(componentValue.content_style)">
                    <span>{{componentValue.content_style.line_price_color.text}}¥</span>
                    <span class="goods-price-money">10</span>
                  </span>
                  <!-- 已售 -->
                  <span class="goods-sold"
                    v-if="componentValue.content_style.goods_sales.key == 1"
                    :style="getGoodsSalesStyle(componentValue.content_style)">
                    {{componentValue.content_style.goods_sales.text}}99
                  </span>
                </div>
              </template>
              <template v-if="componentValue.global_element.list_type == 4">
                <div class="tags-sold">
                  <a-tag class="goods-tag" color="#000" v-if="componentValue.content_style.brokerage_style.key == 1">
                    <byf-icon renderType="fontClass" type="iconqianbao1" class="iconqianbao1"></byf-icon>
                    预估赚¥10
                  </a-tag>
                  <span class="goods-sold" 
                  v-if="componentValue.content_style.goods_sales.key == 1"
                  :style="getGoodsSalesStyle(componentValue.content_style)">
                    {{componentValue.content_style.goods_sales.text}}654
                  </span>
                </div>
                <div class="price-lineprice">
                  <span class="goods-price"
                    v-if="componentValue.content_style.sell_price_color.key == 1"
                    :style="getPriceStyle(componentValue.content_style)">
                    <!-- 商品售卖价 -->
                    <span>¥</span>
                    <span class="goods-price-money">20</span>
                  </span>
                  <span class="goods-line-price-wrap"
                    v-if="componentValue.content_style.line_price_color.key == 1"
                   :style="getLinePriceStyle(componentValue.content_style)">
                    <span>{{componentValue.content_style.line_price_color.text}}¥</span>
                    <span class="goods-price-money">10</span>
                  </span>
                </div>
              </template>
            </div>
          </div>
        </li>
      </ul>
      
    </div>
    <a-popconfirm title="确定删除该组件吗?" @confirm="doDelete">
      <div class="delete-btn">删除</div>
    </a-popconfirm>
  </div>
</template>
 
<script>
export default {
  name: 'GoodsList',
  props: {
    componentData: {
      type: Object
    }
  },
  data(){
    return {
    }
  },
  computed: {
    goodsList(){
      let goods = 2;
      if(this.componentValue.goods.use_goods.key == 1 && this.componentValue.goods.use_goods.goods_arr.length > 0){
        goods = this.componentValue.goods.use_goods.goods_arr.filter((item, index) => {
          return index <= 3
        });
      }
      if(this.componentValue.goods.use_goods.key == 2 && this.componentValue.goods.use_goods.limit){
        goods = this.componentValue.goods.use_goods.limit > 4 ? 4 : this.componentValue.goods.use_goods.limit || 2;
      }
      return goods;
    },
    componentValue(){
      return this.componentData.getMyValue().data
    },
  },
  methods: {
    getGoodsCardStyle(data){
      return {
        'background-color': data.goods_color,
        'border-radius': `${data.border_radius}px`
      }
    },
    getGoodsSalesStyle(data){
      return {
        'color': `${data.goods_sales.color}`
      }
    },
    getLinePriceStyle(data){
      return {
        'color': `${data.line_price_color.color}`
      }
    },
    getPriceStyle(data){
      return {
        'color': `${data.sell_price_color.color}`
      }
    },
    getContentStyle(data){
      return {
        'border-radius': `${data.border_radio_top}px ${data.border_radio_top}px ${data.border_radio_bottom}px ${data.border_radio_bottom}px`,
        'background-color': data.bg_color,
        'padding': `${data.padding_top}px ${data.padding_left_and_right}px ${data.padding_bottom}px`
      }
    },
    getComponentStyle(data){
      return {
        'padding': `${data.margin_top}px ${data.margin_left_and_right}px ${data.margin_bottom}px`,
      }
    },
    doDelete(){
      this.$emit('deleteComponent', this.componentData)
    },
    getGoodsNameStyle(data){
      return {
        'color': `${data.title_color}`
      }
    },
    getItemClass(data){
      return {
        'list-item-2' : data.global_element.list_type == 1,
        'list-item-3' : data.global_element.list_type == 2,
        'list-item-list' : data.global_element.list_type == 3,
        'list-item-1' : data.global_element.list_type == 4,
      }
    },
    getItemStyle(data, index){
      let style = {}, listType = data.global_element.list_type;
      // 双列
      if(listType == 1){
        style.width = 'calc(100% / 2)';
          // 设置左右间距
          if(((index + 1) % 2) == 1){
            // 奇数
            style['padding-right'] = `${data.content_style.padding / 2}px`
          }else{
            // 偶数
            style['padding-left'] = `${data.content_style.padding / 2}px`
          }
          // 设置上下间距
          style['padding-bottom'] = `${data.content_style.padding}px`
          // 最后一排，一个和两个的情况下
          if((index + 1) == this.goodsList.length || (index + 1) > (this.goodsList.length - 2)){
            style['padding-bottom'] = `0px`
          }
      }
      // 列表和单列显示
      if(listType == 3 || listType == 4){
        if(index != 0){
          // 第一个以后所有添加paddtop
          style['padding-top'] = `${data.content_style.padding}px`
        }
      }
      return style
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style.less';
.content{
  overflow: hidden;
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .list-default{
    .list-item{
      .list-item-content{
        overflow: hidden;
        .goods-img{
          img{
            width: 100%;
            max-width: 100%;
            max-height: 100%;
          }
        }
        .goods-msg{
          .goods-name{
            font-weight: bold;
          }
          .goods-tags{
            overflow: hidden;
            .goods-tag{
              float: left;
              border-radius: 20px;
              font-size: 12px;
            }
          }
          .goods-price{
            font-weight: bold;
            font-size: 12px;
            color: rgba(255, 6, 51, 1);
            .goods-price-money{
              font-size: 16px;
            }
          }
          .goods-line-price{
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            display: flex;
            justify-content: space-between;
            .goods-line-price-wrap{
              .goods-price-money{
                text-decoration:line-through;
              }
            }
          }
        }
      }
    }
  }
  .list-ordinary-default{
    // padding: 10px 0;
    // padding-bottom: 0;
    // background: #fff;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .list-item{
      // padding-bottom: 10px;
      .list-item-content{
        .goods-msg{
          padding: 0 6px;
          .goods-name{
            margin-bottom: 5px;
            font-size: 14px;
            line-height: 18px;
          }
          .goods-tags{
            overflow: hidden;
            .goods-tag{
              font-size: 12px;
              width: 100%;
              text-align: center;
            }
            // margin-bottom: 5px;
          }
          .goods-price{
            font-weight: bold;
            font-size: 12px;
            color: rgba(255, 6, 51, 1);
            // margin-bottom: 5px;
            .goods-price-money{
              font-size: 16px;
            }
          }
          .goods-line-price{
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            .goods-line-price-wrap{
              .goods-price-money{
                text-decoration:line-through;
              }
            }
            display: flex;
            justify-content: space-between;
          }
        }
      }
      &.list-item-list{
        // padding: 0 10px;
        // padding-bottom: 10px;
        .list-item-content{
          display: flex;
          justify-content: flex-start;
          .goods-img{
            width: 113px;
            height: 113px;
            overflow: hidden;
            img{
            }
          }
          .goods-msg{
            flex: 1;
            .goods-tags{
              overflow: hidden;
              .goods-tag{
                width: auto;
              }
              // margin-bottom: 5px;
            }
          }
        }
      }
      &.list-item-1{
        // padding: 0 10px;
        // padding-bottom: 10px;
        .goods-msg{
          .tags-sold{
            display: flex;
            justify-content: space-between;
          }
          .price-lineprice{
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            .goods-line-price-wrap{
              .goods-price-money{
                text-decoration:line-through;
              }
            }
            display: flex;
            justify-content: space-between;
          }

        }
      }
    }
    &.list-slider{
      display: block;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 10px;
      .list-item{
        padding: 0 5px;
      }
    }
  }
}
.goods-tag{
  border-radius: 20px;
}
.goods-sold{
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
}
.goods-price{
  font-weight: bold;
  font-size: 12px;
  color: rgba(255, 6, 51, 1);
  // margin-bottom: 5px;
  .goods-price-money{
    font-size: 16px;
  }
}
.goods-line-price{
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
  .goods-line-price-wrap{
    .goods-price-money{
      text-decoration:line-through;
    }
  }
  display: flex;
  justify-content: space-between;
}
.iconqianbao1{
  position: relative;
  top: -2px;
  color:  #F8CD86;
}
</style>