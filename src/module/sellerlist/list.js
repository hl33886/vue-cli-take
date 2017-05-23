// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '../../store/index'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import error from 'assets/default.jpg'
import loading from 'assets/loading.gif'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.use(VueLazyload, {
  error: error,
  loading: loading,
  try: 3
})

/* eslint-disable no-new */
new Vue({
  el: '#list',
  store: store,
  render: h => h(App)
})
