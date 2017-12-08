import JsonEditor from './JsonEditor.vue'
import PackageFile from '../package.json'

const VERSION = PackageFile.version


const install = (Vue) => {
  if (install.installed) return

  Vue.component('JsonEditor', JsonEditor)

  Array.prototype.rmIndex = function (index) {
	  this.splice(index, 1)
	  return this
	}
}

export default install

export const components = {
  JsonEditor,
  VERSION
}

