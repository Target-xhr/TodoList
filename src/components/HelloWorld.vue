<template>
  <div class="wrapper">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <van-swipe :autoplay="1000">
      <van-swipe-item v-for="item of swiperList" :key="item.id">
        <img v-lazy="item.imgUrl" />
      </van-swipe-item>
    </van-swipe>
    <button @click="getData">getData</button>
  </div>
</template>

<script>
import axios from "axios"
axios.defaults.baseURL = '/api'
//axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperOptions: {
        pagination: ".swiper-pagination",
      },
      swiperList: [
        {
          id: "0001",
          imgUrl: "http://newsimg.5054399.com/uploads/userup/2109/06135T254D.jpg"
        },
        {
          id: "0002",
          imgUrl: require("@/assets/A2.gif"),
        },
        {
          id: "0003",
          imgUrl: require("@/assets/E1.gif"),
        },
      ],
    };
  },
  methods: {
    getData() {
      axios.get("/tujian/948256.htm").then(
        (response) => {
          console.log(response);
        },
        (response) => {
          console.log("error");
        }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
