<template>
  <div>
    <list-header></list-header>
    <seller-list></seller-list>
  </div>
</template>

<script>
import listHeader from 'components/sellerlist/header'
import sellerList from 'components/sellerlist/List'
export default {
  name: 'app',
  components: {listHeader, sellerList}
}
</script>
