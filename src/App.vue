<template>
  <div id="app">
    <p>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </p>
    <router-view />
    <button @click="show">2222</button>
  </div>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    show() {
      swal('Hello world!')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
