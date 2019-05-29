<template>
  <div id="app">
    about
    <b>{{ msg }}</b>
    <foot />
  </div>
</template>

<script>
import foot from './foot.vue'
export default {
  name: 'About',
  components: {
    foot
  },
  data() {
    return {
      msg: '11111111111122111221'
    }
  }
}
</script>

<style lang="scss" scoped>
  b{
    color: greenyellow;
    display: flex;
  }
</style>
