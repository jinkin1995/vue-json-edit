// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueBus from 'vue-bus'

Vue.use(VueBus)

Vue.config.productionTip = false

//make arr component
import JsonView from './components/JsonView.vue'
import ArrayView from './components/ArrayView.vue'

Vue.component('json-view', JsonView)
Vue.component('array-view', ArrayView)

Array.prototype.rmIndex = function (index) {
  let p1 = this.slice(0, index)
  let p2 = this.slice(index+1, this.length)
  return p1.concat(p2)
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

