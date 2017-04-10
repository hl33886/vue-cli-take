<template>
<div class="sellerlist-wrapper">
	<div class="seller-filter">
		<ul>
			<li><a href="javascript:;" @click="sortDistance($event)">距离最近</a></li>
			<li><a href="javascript:;" @click="sortScore($event)">评分最优</a></li>
			<li><a href="javascript:;" :class="{cur:ifFilter}" @click="filterName($event)">筛选<i class="iconfont">&#xe65a;</i></a></li>
		</ul>
		<div class="filter" v-if="ifFilter">
			<div class="search">
				<input type="text" placeholder="搜索商家" v-model="sellername">
			</div>
		</div>
	</div>
	<ul class="seller-list">
		<li v-for="item in newSellerList">
			<div class="list-logo"><img :src="item.avatar"></div>
			<div class="list-info">
				<h2>{{item.name}}</h2>
				<div class="info-item">
					<p><span class="orange">{{item.score}}</span></p>
					<p class="mark tr"><span v-for="item in item.description">{{item}}</span></p>
				</div>
				<div class="info-item">
					<p>￥{{item.minPrice}}起送<em class="divider">/</em>配送费￥{{item.deliveryPrice}}</p>	
					<p class="tr">{{item.distance | distance}}<em class="divider">/</em><span class="blue">{{item.deliveryTime}}分钟</span></p>
				</div>
			</div>
		</li>
	</ul>
	<transition name="fade" mode="out-in">
		<div v-if="ifFilter" class="model-view" @click="filterName"></div>
	</transition>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'list',
  data () {
    return {
      sellerList: [],
      ifFilter: false,
      sellername: ''
    }
  },
  mounted () {
    this.getSellerList()
  },
  computed: { // 计算属性
    newSellerList: function () { // 搜索过滤数组
      let result = []
      if (!this.sellername) {
        return this.sellerList
      }
      this.sellername = this.sellername.trim()
      result = this.sellerList.filter(item => {
        let index = item.name.indexOf(this.sellername)
        if (index >= 0) {
          return item
        }
      })
      return result
    }
  },
  filters: {
    distance: function (value) {
      if (value > 1000) {
        return (value / 1000) + 'km'
      }
      return value + 'm'
    }
  },
  methods: {
    getSellerList () {
      let sellersUrl = 'http://localhost:8080/sellerlist'
      this.$http.get(sellersUrl).then(res => {
        this.sellerList = res.body.data
      })
    },
    sortDistance (event) {
      $(event.target).closest('ul').find('li a').removeClass('cur')
      $(event.target).addClass('cur')
      this.sellerList.sort((a, b) => {
        return a.distance - b.distance
      })
    },
    sortScore (event) {
      $(event.target).closest('ul').find('li a').removeClass('cur')
      $(event.target).addClass('cur')
      this.sellerList.sort((a, b) => {
        return b.score - a.score
      })
    },
    filterName (event) {
      this.ifFilter = !this.ifFilter
    }
  }
}
</script>
