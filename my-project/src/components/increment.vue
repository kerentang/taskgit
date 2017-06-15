<template>
  <div>
      <button v-on:click='add'>+1</button>
      <button v-on:click='decrement'>-1</button>
  </div>
  <div>
    <input type="text" v-model='incrementValue'>
    <button v-on:click='incrementWithValue'>increment</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      incrementValue: 0
    }
  },
  methods: {
    //以下写法逻辑清晰
    add () {
      this.$store.dispatch('increment')
    },
    decrement () {
      this.$store.dispatch('decrement')
    },
    incrementWithValue () {
      this.$store.dispatch('incrementWithValue',this.incrementValue)
    }
    //简化写法，适用于函数较多的应用
    // ...mapActions(['decrement']),
    // ...mapActions({
    //   add: 'increment'
    // })
  }
}
</script>
<style>
  button{
      width: 100px;
      height: 100px;
      font-size: 30px;
  }
</style>
