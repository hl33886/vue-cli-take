<template>
  <div id="app">
    <!-- 商品头部 -->
    <shop></shop>
    <!-- 商品 -->
    <keep-alive>
    	<router-view transitiong="fade"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import shop from '@/components/shop'
export default {
  name: 'app',
  components: {shop}
}
</script>
