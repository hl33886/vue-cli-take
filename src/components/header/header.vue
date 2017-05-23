<template>
	<header class="header">
		<span class="back"><i class="iconfont">&#xe697;</i></span>
		<span class="title">{{headerTitle}}</span>
	</header>
</template>

<script>
export default {
  name: 'list',
  computed: {
    headerTitle () {
      return this.$store.state.headerTitle
    }
  }
}
</script>
