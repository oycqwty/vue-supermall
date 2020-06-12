import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


// vue-router>=3.0版本回调形式以及改成promise api的形式了，返回的是一个promise，如果路由地址跳转相同，且没有捕获到错误
// import Router from 'vue-router'
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//  return originalPush.call(this, location).catch(err => err)
// }
