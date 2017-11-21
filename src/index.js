// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import VueBus from 'vue-bus'

// Vue.use(VueBus)

// Vue.config.productionTip = false

// //make arr component
// import JsonView from './components/JsonView.vue'
// import ArrayView from './components/ArrayView.vue'

// Vue.component('json-view', JsonView)
// Vue.component('array-view', ArrayView)

// Array.prototype.rmIndex = function (index) {
//   this.splice(index, 1)
//   return this
// }


// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })


import JsonEditor from './JsonEditor.vue'
import PackageFile from '../package.json';

const VERSION = PackageFile.version;

// const componentsArray = [
//   JsonEditor
// ];

const install = (Vue) => {
  /* istanbul ignore if */
  if (install.installed) return;

  Vue.component('JsonEditor', JsonEditor)

  Array.prototype.rmIndex = function (index) {
	  this.splice(index, 1)
	  return this
	}
};

export default install;

export const components = {
  JsonEditor,
  VERSION
};

