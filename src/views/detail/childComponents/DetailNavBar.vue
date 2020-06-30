<template>
  <div>
    <nav-bar >
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" class="item" 
          @click="titleItemClick(index)"
          :class="{active:index === currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getDetail} from "network/detail"
export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  components: {
    NavBar
  },
  methods:{
    titleItemClick(index){
      this.currentIndex=index
    },
    back(){
      this.$router.go(-1);
      // 使用事件 父组件接收 scrollTO 跳到那个位置 是吗老哥
    }
  },
  
};
</script>
<style  scoped>

.title {
  display: flex;
}
.item{
  font-size: 15px;
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back{
  margin-top: 8px;
}
</style>