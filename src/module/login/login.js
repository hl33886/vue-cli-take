// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#login',
  template: '<App/>',
  components: { App }
})
