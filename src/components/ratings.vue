<template>
	<div id="rating" class="clearfix" >
    <section class="rating-cont">
      <div class="left">
        <strong>{{shopData.score}}</strong>
        <p>综合评价</p>
        <p>高于周边商家{{shopData.rankRate}}%</p>
      </div>
      <ul class="right">
        <li>
          <span class="title">服务态度</span>
          <div class="rating-star">
            <span class="star"  :style="{width: (shopData.serviceScore / 4.8) * 100 + '%'}">
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
            </span> 
            <span class="star-gray">
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
              <i class="iconfont">&#xe626;</i>
            </span>            
          </div>
          <span class="score">{{shopData.serviceScore}}</span>
        </li>
        <li><span class="title">菜品评价</span><span class="score">{{shopData.foodScore}}</span></li>
        <li><span class="title">送达时间</span><span class="score">{{shopData.deliveryTime}}分钟</span></li>
      </ul>
    </section>
    <section class="rating-list" id="ratingList">
      <ul>
        <li class="clearfix" v-for="(item, index) in ratingsData">
          <span class="date">{{item.rateTime | changeDate}}</span>
          <img :src="item.avatar" class="userimg">
          <div class="rating-user-info">
            <h4>{{item.username}}</h4>
            <div class="rating-star">
              <span class="star" :style="{width: (item.score / 5) * 100 + '%'}">
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
              </span> 
              <span class="star-gray">
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
                <i class="iconfont">&#xe626;</i>
              </span>            
            </div>
            <p>{{item.text}}</p>
            <div class="foods">
              <span v-for="(pitem, index) in item.recommend">{{pitem}}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>

	</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      shopData: [],
      ratingsData: [],
      size: 20
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getratingsList()
      setTimeout(() => {
        this._initScroll()
      }, 100)
    })
  },
  filters: {
    changeDate: function (value) {
      let myDate = new Date(value)
      return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
    }
  },
  methods: {
    getratingsList () {
      let sellerUrl = 'http://localhost:8080/seller'
      this.$http.get(sellerUrl).then(res => {
        this.shopData = res.body.data
      })
      let ratingsUrl = 'http://localhost:8080/ratings'
      this.$http.get(ratingsUrl).then(res => {
        this.ratingsData = res.body.data
      })
    },
    _initScroll () {
      this.scroll = new BScroll(document.getElementById('ratingList'))
    }
  }
}
</script>
