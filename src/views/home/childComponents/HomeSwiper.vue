<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  data(){
    return {
      isload:false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }    
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(!this.isload){
        this.$emit("SwiperImageLoad");
        this.isload=true;
      }
    }
  }
};
</script>