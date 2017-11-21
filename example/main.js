import Vue from 'vue'
// import store from './store';
// import router from './router';
// import RegisterDirectives from './directives';
import JsonEditor from '../src/index.js'
import App from './App.vue'
// import { componentsArray } from './components';

Vue.use(JsonEditor)
// Vue.config.productionTip = false;

// componentsArray.forEach(component => Vue.component(component.name, component));
// RegisterDirectives(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => (h)(App)
})