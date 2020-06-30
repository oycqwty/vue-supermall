<template>
  <div id="detail">
    <!-- 头部 -->
    <detail-navBar class="detatil-nav" />
    <!-- <scroll ref="scroll" :probe-type="3" @scroll="contentScroll1" class="detail-content"> -->
    <scroll ref="scroll" class="detail-content">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 简介 -->
      <detail-base-info :goods="goods" />
      <!-- 商品信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品图片信息 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
      <!-- 参数信息 -->
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <!-- 评论信息 -->
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import { getDetail, Goods, GoodsParam } from "network/detail";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from 'views/detail/childComponents/DetailCommentInfo'

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  data() {
    return {
      id: this.$route.params.id,
      topImages: [], //轮播图数据,
      shop: {}, //商品信息
      goods: {}, //baseInfo信息
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},      
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll
  },
  created() {
    getDetail(this.id).then(res => {
      const data = res.result;
      // 轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息
      this.shop = res.result.shopInfo;
      //商品详情数据
      this.detailInfo = data.detailInfo;
      // 参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //评论信息
      if (data.rate.cRate !== 0) {
        debugger
        var a = data.rate.list[0];
        this.commentInfo = data.rate.list[0] || {};
      }
    });
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    // contentScroll1(position) {
    //   // this.$refs.scroll.refresh();
    //   console.log(this.$refs.scroll.scroll.y);
    // }
  }
};
</script>
<style scoped>
  #detail {
    position: fixed;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
    width: 100%;
  }

  .detail-content {
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 0px;
  }



  .detatil-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

</style>