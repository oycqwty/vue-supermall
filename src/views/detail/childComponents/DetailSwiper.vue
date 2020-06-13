<template>
  <swiper>
    <swiper-item v-for="(item,index) in topImages" :key="index" class="detail-swiper">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper"

export default {
  name:'DetailSwiper',
  components:{
      Swiper,
      SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper, 
    SwiperItem
  },
  mounted(){
    // debugger
    // console.log(this.topImages);
    setTimeout(()=>{      
      console.log(this.topImages);
    },5000)
  }
}
</script>
<style  scoped>
.detail-swiper{
  height:300px;
  overflow: hidden
}
</style>