import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import Cookies from 'js-cookie'
import swal from 'sweetalert'
Vue.prototype.$ajax = axios
axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})

function extend(o, n) {
  if (o === 'undefined' || o === undefined) o = {}
  for (var p in n) {
    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p))) {
      o[p] = n[p]
    }
  }
  return o
}
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  const auth = {}
  // if (Cookies.get('Token') && Cookies.get('HeaderKey')) {
  //     auth = {
  //         token: Cookies.get('Token'),
  //         HeaderKey: Cookies.get('HeaderKey')
  //     }
  // }
  if (Cookies.get('client-token')) {
    config.headers['client-token'] = Cookies.get('client-token')
  }
  if (config.method === 'post') {
    config.data = Qs.stringify(extend(config.data, auth))
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response) {
  const code = response.data.code
  if (code !== '0000') {
    swal({
      title: `错误原因：${response.data.msg}`,
      text: ` 错误接口：${response.config.url}`,
      icon: 'error'
    })
  }
  return response.data
}, function(error) {
  if (error.response) {
    swal({
      title: `错误信息：${error.response.status}`,
      text: `错误原因：${error.response.data.error},  错误接口：${error.response.data.path}`,
      icon: 'error'
    })
  } else {
    window.console.log(error.message)
  }
  return Promise.reject(error)
})
