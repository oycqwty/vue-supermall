<template>
  <div id="detail">
    <!-- 头部 -->
    <detail-navBar class="detail-nav" />
    <scroll ref="scroll" class="content">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 简介 -->
      <detail-base-info :goods="goods" />
      <!-- 商品信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品图片信息 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
      <!-- 参数信息 -->
      <detail-param-info :paramInfo="paramInfo" ></detail-param-info>
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import { getDetail, Goods ,GoodsParam} from "network/detail";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from './childComponents/DetailParamInfo'

import Scroll from "components/common/scroll/Scroll";

export default {
  data() {
    return {
      id: this.$route.params.id,
      topImages: [], //轮播图数据,
      shop: {}, //商品信息
      goods: {}, //baseInfo信息
      detailInfo: {},
      paramInfo:{}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
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
       this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    });
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>