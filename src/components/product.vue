<template>
	<div id="product">
  		<ul class="product-nav-list">
  			<li v-for="(item, index) in productList" :class="{'cur': index==curIndex}"><a href="javascript:;" @click="changeItem(index)">{{item.name}}</a></li>
  		</ul>
  		<div class="productList" ref="productList">
  			<div class="wrapper">
  			<ul class="product-item-list" v-for="(item, index) in productList">
  				<li v-for="(pitem, index) in item.foods" class="clearfix">
  					<img :src="pitem.image" alt="商品图片">
  					<div class="food-cont">
  						<h4>{{pitem.name}}</h4>
  						<p>{{pitem.description}}</p>
  						<p>月销{{pitem.sellCount}}份 <span>好评率{{pitem.rating}}%</span></p>
  						<p class="price"><strong>{{pitem.price}}</strong> <span>{{pitem.oldPrice}}</span></p>
  					</div>
            <div class="edit-num">
              <transition name="fade" mode="out-in">
                <a href="javascript:;" @click="changeNum(pitem, 'subtract')" v-if="pitem.num>0">
                  <i class="iconfont">&#xe687;</i>
                </a>
              </transition>
              <span v-if="pitem.num>0">{{pitem.num}}</span>
              <a href="javascript:;" @click.prevent="changeNum(pitem, 'add', $event)">
                <i class="iconfont">&#xe61d;</i>
              </a>
                            
            </div>
  				</li>
  			</ul>
  			</div>
  		</div>
      <footer>
        <div class="cart" @click="toggleCart">
          <span ref="cartIcon" class="icon" :class="{'isbuy':totalCount>0}"><i class="iconfont">&#xe60d;</i><em v-if="totalCount>0">{{totalCount}}</em></span>
          <span class="price">￥{{totalPrice}}<em>配送费4元</em></span>
        </div>
        <a class="gobuy" href="javascript:;" :class="{'isbuy':totalCount>0}">去结算</a>
        <transition name="upfade">
          <div v-if="isCartList && totalCount>0" class="cart-list">
            <div class="title">
              <span>购物车</span>
              <a href="javascript:;" @click="clearCartList"><i class="iconfont">&#xf0008;</i>清空</a>
            </div>
            <ul>
              <li v-for="item in cartList">
                <h3>{{item.name}}</h3>
                <span class="price">￥{{item.price}}</span>
                <div class="edit-num">
                  <a href="javascript:;" @click="changeNum(item, 'subtract')">
                    <i class="iconfont">&#xe687;</i>
                  </a>
                  <span>{{item.num}}</span>
                  <a href="javascript:;" @click.prevent="changeNum(item, 'add')">
                    <i class="iconfont">&#xe61d;</i>
                  </a>              
                </div>
              </li>
            </ul>          
          </div>
        </transition>
      </footer>
      <transition name="fade" mode="out-in">
        <div v-if="isCartList && totalCount>0" class="model-view" @click="toggleCart"></div>
      </transition>
      <div class="circleicon"><i class="iconfont">&#xe674;</i></div>
	</div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      productList: [],
      cartList: [],
      listHeight: [],
      scroll: {},
      activeId: 0,
      scrollY: 0,
      totalPrice: 0,
      totalCount: 0,
      isCartList: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getproductList()
      setTimeout(() => {
        this._initScroll()
        this._calculateHeight()
      }, 100)
    })
  },
  computed: {
    curIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    getproductList () {
      let goodsUrl = 'http://localhost:8080/goods'
      this.$http.get(goodsUrl).then(res => {
        this.productList = res.body.data
      })
    },
    scrollBox () {
      window.onscroll = function () {
        this.t = document.documentElement.scrollTop || document.body.scrollTop
        $('#product').css({'position': 'absolute', 'top': this.t})
      }
    },
    changeItem (index) { // 切换左侧标签
      let el = this.$refs.productList.getElementsByTagName('ul')
      this.scroll.scrollToElement(el[index], 300)
    },
    changeNum (pitem, way, event) {
      if (way === 'add') {
        if (!pitem.num) {
          Vue.set(pitem, 'num', 1)
        } else {
          pitem.num ++
        }
        this.totalCount ++
        this.totalPrice += pitem.price
        let index = this._isArray(pitem, this.cartList)
        if (index === -1) {
          this.cartList.push(pitem)
        }
        this.cartIconAnimate(event)
      } else {
        pitem.num --
        this.totalCount --
        this.totalPrice -= pitem.price
        if (pitem.num === 0) {
          let i = this._isArray(pitem, this.cartList)
          this.cartList.splice(i, 1)
        }
      }
    },
    toggleCart () {
      if (this.totalCount > 0) { // 选菜单后才可点击
        this.isCartList = !this.isCartList
      }
    },
    clearCartList () { // 清空购物车
      this.cartList = []
      this.isCartList = false
      this.totalCount = 0
      this.totalPrice = 0
      this.productList.forEach((arrs, index) => {
        arrs.foods.forEach((arr, i) => {
          Vue.set(arr, 'num', 0)
        })
      })
    },
    cartIconAnimate (event) { // 添加菜单动画效果
      if (!event) return
      let target = event.target
      let beginX = $(target).offset().left
      let beginY = $(target).offset().top
      let stopX = $(this.$refs.cartIcon).offset().left
      let stopY = $(this.$refs.cartIcon).offset().top
      $('.circleicon').css({'left': beginX, 'top': beginY, 'z-index': 2})
      $('.circleicon').animate({'left': stopX, 'top': stopY + 10, marginLeft: '50px'}, 400, () => {
        setTimeout(() => {
          $(this.$refs.cartIcon).addClass('cart-icon-animate')
        }, 0)
      })
      setTimeout(() => {
        $(this.$refs.cartIcon).removeClass('cart-icon-animate')
      }, 300)
    },
    _isArray (value, arr) { // 判断元素是否在数组内
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
          return i
        }
      }
      return -1
    },
    _initScroll () { // 滚动初始化
      this.scroll = new BScroll(this.$refs.productList, {
        startX: 0,
        startY: 0,
        probeType: 3
      })
      this.scroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
      this.scroll.on('refresh')
    },
    _calculateHeight () { // 获取区间高度数组
      let list = this.$refs.productList.getElementsByTagName('ul')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>
<style>
</style>
