<template>
  <div id="shop">
      <div class="shop-header">
          <div class="back"><a href="list.html"><i class="iconfont">&#xe697;</i></a></div>
          <div class="header-top">
              <div class="login"><img :src="shopData.avatar"></div>
              <div class="header-top-cont">
                  <h2>{{shopData.name}}</h2>
                  <p>
                      {{shopData.description}}<em>/</em>
                      {{shopData.deliveryTime}}分钟送达
                  </p>
                  <p>{{supportsDesc}}<a href="javascript:;" class="more-supports" @click="modalShow = true">{{supportsLen}}个</a></p>
              </div>
          </div>
          <div class="bulletin">公告: {{bulletin}} <a href="javascript:;" class="more">></a></div>
      </div>
      <ul class="shop-bar clearfix">
        <li><router-link to="/product/product">商品</router-link></li>
        <li><router-link to="/rating/ratings">评价</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
      <div class="modal-wrapper" v-if="modalShow">
        <div class="modal-cont">
          <h2>{{shopData.name}}</h2>
          <h2>
            <div class="rating-star">
              <span class="star" :style="{width: (shopData.score / 4.9) * 100 + '%'}">
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
          </h2>
          <h3><span>优惠信息</span></h3>
          <ul>
            <li v-for="item in shopData.supports">{{item.description}}</li>
          </ul>
          <h3><span>商家公告</span></h3>
          <ul>
            <li v-for="item in shopData.infos">{{item}}</li>
          </ul>
        </div>
        <div class="modal-close" @click="modalShow = !modalShow">
          <i class="iconfont">&#xe68f;</i>
        </div>
      </div>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'shop',
  data () {
    return {
      shopData: [],
      supportsDesc: '',
      supportsLen: 0,
      bulletin: '',
      modalShow: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.shopSeller()
    })
  },
  methods: {
    shopSeller: function () {
      let sellerUrl = 'http://localhost:8080/seller'
      this.$http.get(sellerUrl).then(res => {
        this.shopData = res.body.data
        this.supportsLen = this.shopData.supports.length
        this.supportsDesc = this.shopData.supports[0].description
        this.bulletin = this.shopData.bulletin.substring(0, 18) + '...'
      })
    }
  }
}
</script>
