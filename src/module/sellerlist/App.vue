<template>
  <div>
    <list-header></list-header>
    <seller-list></seller-list>
  </div>
</template>

<script>
import listHeader from 'components/header/header'
import sellerList from 'components/sellerlist/List'
import { mapMutations } from 'vuex'
export default {
  name: 'list',
  mounted () {
    this.$nextTick(() => {
      this.changeTitle('列表')
    })
  },
  components: {listHeader, sellerList},
  methods: {
    ...mapMutations([
      'changeTitle'
    ])
  }
}
</script>
