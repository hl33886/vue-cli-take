<template>
<div class="sellerlist-wrapper">
	<div class="seller-filter">
		<ul>
			<li><a href="javascript:;" :class="{cur:selected==0}"  @click="sortPrice($event)">价格最低</a></li>
			<li><a href="javascript:;" :class="{cur:selected==1}"  @click="sortScore($event)">评分最优</a></li>
			<li><a href="javascript:;" :class="{cur:selected==2}" @click="filterName($event)">筛选<i class="iconfont">&#xe65a;</i></a></li>
		</ul>
		<div class="filter" v-if="ifFilter">
			<div class="search">
				<input type="text" placeholder="搜索商家" v-model="sellername">
			</div>
		</div>
	</div>
	<ul class="seller-list">
		<li v-for="item in newSellerList">
      <a href="detail.html">
  			<div class="list-logo"><img v-lazy="item.avatar"></div>
  			<div class="list-info">
  				<h2>{{item.name}}</h2>
  				<div class="info-item">
  					<p><span class="orange">{{item.score}}</span></p>
  					<p class="mark tr"><span v-for="item in item.description">{{item}}</span></p>
  				</div>
  				<div class="info-item">
  					<p>￥{{item.minPrice}}起送<em class="divider">/</em>天数:{{item.days}}</p>
  					<p class="tr">发团：<span>{{item.sendTime | changeDate}}</span></p>
  				</div>
  			</div>
      </a>
		</li>
	</ul>
	<transition name="fade" mode="out-in">
		<div v-if="ifFilter" class="model-view" @click="filterName"></div>
	</transition>
</div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      sellerList: [],
      ifFilter: false,
      selected: 0,
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
    },
    changeDate: function (value) {
      let myDate = new Date(value)
      return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
    }
  },
  methods: {
    getSellerList () {
      let sellersUrl = 'http://localhost:8080/sellerlist'
      this.$http.get(sellersUrl).then(res => {
        this.sellerList = res.body.data
      })
    },
    sortPrice (event) {
      this.selected = 0
      this.sellerList.sort((a, b) => {
        return a.minPrice - b.minPrice
      })
    },
    sortScore (event) {
      this.selected = 1
      this.sellerList.sort((a, b) => {
        return b.score - a.score
      })
    },
    filterName (event) {
      this.selected = 2
      this.ifFilter = !this.ifFilter
    },
    est () {
      let [a, b, c] = [1, 2, 3]
      console.log(a)
      console.log(b)
      console.log(c)
    }
  }
}
</script>
