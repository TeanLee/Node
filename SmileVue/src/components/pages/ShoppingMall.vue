<template>
 <div>
    <!--search bar layout-->
  <div class="search-bar">
    <van-row>
      <van-col span="3" class="location-icon"><van-icon name="search" /></van-col>
      <van-col span="16"><input type="text" class="search-input"/></van-col>
      <van-col span="5"><van-button size="mini">查找</van-button></van-col>
    </van-row>
  </div>
  <!--swipwer area-->
  <div class="swiper-area">
    <van-swipe :autoplay="1000">
      <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
        <img v-lazy="banner.image" width="100%"/>
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="type-bar">
    <div  v-for="(cate,index) in category" :key="index" >
      <img v-lazy="cate.image" width="90%" />
      <span>{{cate.mallCategoryName}}</span>
    </div>
  </div>
  <!--AD banner area-->
  <div class="ad-banner">
    <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
  </div>
  <!--Recommend goods area-->
  <div class="recommend-area">
    <div class="recommend-title">
      商品推荐
    </div>
    <div class="recommend-body">
      <!--swiper-->
      <swiper :options="swiperOption">
        <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
          <div class="recommend-item">
            <img :src="item.image" width="80%" />
            <div>{{item.goodsName}}</div>
            <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <!--floor one area-->
  <div class="recommend-title">热销榜单</div>
  <div class="floor">
    <div class="floor-anomaly">
      <div class="floor-one"><img :src="floor1_0.image" width="100%" /></div>
      <div>
        <div class="floor-two"><img :src="floor1_1.image" width="100%" /></div>
        <div><img :src="floor1_2.image" width="100%" /></div>
      </div>
    </div>
  </div>
  <div class="floor-rule">
    <div v-for="(item ,index) in floor1.slice(3)" :key="index">
      <img :src="item.image" width="100%"/>
    </div>
  </div>
 </div>
</template>

<script>
import axios from 'axios';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    axios({
      url: 'https://www.easy-mock.com/mock/5b67eb7b75d70b78bbc620f8/SmileVue/goods',
      method: 'get',
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture;
          this.bannerPicArray = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor1_0 = this.floor1[0];
          this.floor1_1 = this.floor1[1];
          this.floor1_2 = this.floor1[2];
        }
      });
  },
  data() {
    return {
      category: [],
      adBanner: {},
      bannerPicArray: [],
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3,
      },
      floor1: [],
      floor1_0: {},
      floor1_1: {},
      floor1_2: {},
    };
  },
};
</script>

<style scoped>
.search-bar{
  height: 2.2rem;
  background-color: #e5017d;
  line-height:2.2rem;
}
.search-input{
  width:100%;
  height: 1.3rem;
  border-top:0px;
  border-left:0px;
  border-right:0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color:#fff;
}
.location-icon{
  text-align: center;
  line-height: 2.8rem;
}
.swiper-area{
  width:20rem;
  clear:both;
  margin: 0 auto;
}
.type-bar{
  background-color: #fff;
  margin:0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size:14px;
  display: flex;
  flex-direction:row;
  flex-wrap:nowrap;
}
.type-bar div{
  padding: .3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area{
  background-color: #fff;
  margin-top: .3rem;
}
.recommend-title{
  border-bottom:1px solid #eee;
  font-size:14px;
  padding:.2rem;
  color:#e5017d;
}
.recommend-body{
  border-bottom: 1px solid #eee;
}
.recommend-item{
  width:99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.floor-anomaly{
  display: flex;
  flex-direction:row;
  background-color: #fff;
  border-bottom:1px solid #ddd;
}
.floor-anomaly div{
  width:10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one{
  border-right:1px solid #ddd;
}
.floor-two{
  border-bottom:1px solid #ddd;
}
.floor-rule{
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  background-color: #fff;
}
.floor-rule div{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width:10rem;
  border-bottom:1px solid #ddd;
}
.floor-rule div:nth-child(odd){
  border-right: 1px solid #ddd;
}
</style>
