<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabcontrol1"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <!-- 滚动效果 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @SwiperImageLoad="SwiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <featrue-view></featrue-view>
      <tab-control ref="tabcontrol2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
      <!-- 首页数据的展示 -->
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComponents/HomeSwiper";
import RecommendView from "@/views/home/childComponents/RecommendView";
import FeatrueView from "@/views/home/childComponents/FeatrueView";
import TabControl from "components/content/tabControl/tabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatrueView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop", //默认显示流行数据
      isShowBackTop: false, //默认置顶按钮不显示
      tabControlHeight: 0,
      isTabFixed: false //tabControl是否吸顶
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载完的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500); // 防抖限制请求次数
    this.$bus.$on("ImageLoad", () => {
      //解决图片加载导致scroll计算高度问题出现的无法下滑
      // 方案 1.事件总线 2.Vuex(GoodsListItem 图片加载完成 改变Vuex中自定义属性，
      // home页监听变量，改变了调用refresh刷新)
      // 技巧:this.$refs.scroll.scroll && this.$refs.scroll.scroll.refresh(); //相当于if
      refresh();
    });
  },
  methods: {
    SwiperImageLoad() {
      //计算tabControl的offsetTop高度 完成吸顶效果
      this.tabControlHeight = this.$refs.tabcontrol2.$el.offsetTop;
      console.log("tabControl高度", this.tabControlHeight);
    },
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    //请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.scroll.finishPullUp(); //到底 上拉加载数据
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex=index;
      this.$refs.tabcontrol2.currentIndex=index;
    },
    contentScroll(position) {
      //1.决定backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.决定tabControl是否吸顶 v-bind class (position:fixed)
      this.isTabFixed = -position.y > this.tabControlHeight;
      console.log(this.isTabFixed);
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500); //延时500ms
    },
    debounce(func, delay) {
      let time = null;
      return function(...args) {
        if (time) clearTimeout(time);
        time = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
  },
  computed: {
    showGoods() {
      console.log("选中的类型", this.currentType);
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed; scroll局部滚动对导航头无影响
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
