<template>
  <div id="app">
    home
    <span>{{ msg }}</span>
    <img src="../assets/imgs/logo.png" alt="">
    <foot />
  </div>
</template>

<script>
import foot from './foot.vue'
export default {
  name: 'Home',
  components: {
    foot
  },
  data() {
    return {
      msg: '222222222222222222111232s21121',
      dd: '22'
      // a: '1',
      // s: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
  span{
    color: red;
    display: flex;
  }
</style>
