<template>
  <div>
      <h3>Count is {{count}}</h3>
      <p>组件内部的计算属性{{localComputed}}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    localComputed () {
      return this.count + 1;
    },
    ...mapState({
      count:'count'
    })
  }
}
</script>
<style scoped>
  h3{
      font-size: 
  }
</style>


