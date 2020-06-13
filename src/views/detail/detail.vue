<template>
  <div>
    <detail-navBar></detail-navBar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>
<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import { getDetail }  from "network/detail";
export default {
  data(){
    return {
      id:this.$route.params.id,
      topImages:[],//轮播图数据
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper
  },
  created(){
    getDetail(this.id).then(res => {
      this.topImages = res.result.itemInfo.topImages;
    })
  }
  
}
</script>