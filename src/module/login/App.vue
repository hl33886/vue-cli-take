<template>
  <div>
    <list-header></list-header>
    <user-login></user-login>
  </div>
</template>

<script>
import listHeader from 'components/header/header'
import userLogin from 'components/login/login'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return { }
  },
  components: {listHeader, userLogin},
  mounted () {
    this.$nextTick(() => {
      this.changeTitle('登录')
    })
  },
  methods: {
    ...mapMutations([
      'changeTitle'
    ])
  }
}
</script>
