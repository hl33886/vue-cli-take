<template>
	<div class="login-wrapper">
		/*未开发*/
	</div>
</template>

<script>
export default {
  name: 'login',
  mounted () {
    this.$nextTick(function () {
      this.testEs()
    })
  },
  methods: {
    testEs () {
      let [, , third] = ['foo', 'bar', 'baz']
      let [...tail] = [1, 2, 4, 5, 6]
      let [x, y, ...z] = ['a']
      let [foo = true] = []
      let [d = 'b'] = [null]
      console.log(third)
      console.log(tail)
      console.log(x)
      console.log(y)
      console.log(z)
      console.log(foo)
      console.log(d)
      function f () {
        console.log('ddd')
      }
      let [h = f()] = [1]
      console.log(h)
      let doo
      ({doo} = {doo: 1})
      console.log(doo)
      let obj = {
        p: ['hello', {j: 'world'}]
      }
      let {p: [k, {j}]} = obj
      console.log(k)
      console.log(j)
      var node = {
        loc: {
          start: {
            line: 1,
            column: 5
          }
        }
      }
      var {loc: {start: {line}}} = node
      console.log(line)
      let {length: len} = 'dhfksfkds'
      console.log(len)
      let {toString: s} = 123
      console.log(s)
      function add ([x, y]) {
        return x + y
      }
      console.log(add([1, 2]))
      let gun = [[1, 2], [3, 4]].map(([x, y]) => x + y)
      console.log(gun)
      function move ({x = 0, y = 0} = {}) {
        return [x, y]
      }
      let mo = move({x: 3})
      console.log(mo)
    }
  }
}
</script>
