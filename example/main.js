import Vue from 'vue'
import JsonEditor from '../src/index.js'
import App from './App.vue'

Vue.use(JsonEditor)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => (h)(App)
})