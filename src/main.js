import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './page/home.vue'
import '@/assets/css/reset.css'
import '@/assets/fonts/iconfont.css'
Vue.use(VueRouter)
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: () => import('@/page/about') }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  },
  render: h => h(App)
})
