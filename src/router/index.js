import Vue from 'vue'
import Router from 'vue-router'
import Ratings from 'components/details/ratings'
import Product from 'components/details/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/rating/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/product/product',
      name: 'Product',
      component: Product
    }
  ]
})
