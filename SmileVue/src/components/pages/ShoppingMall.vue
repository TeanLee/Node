<template>
  <!--search bar layout-->
  <div class="search-bar">
    <van-row>
      <van-col span="3" class="location-icon"><van-icon name="search" /></van-col>
      <van-col span="16"><input type="text" class="search-input"/></van-col>
      <van-col span="5"><van-button size="mini">查找</van-button></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Shopping Mall'
    }
  }
}
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
</style>
