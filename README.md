# VUE-JsonEditor

> visual JSON editor built as an vue component. Provides a basic GUI

---


## Getting Started

> npm install vue-jsonEditor --save
---


## Usage

``` javascript
//import it in your project At your entry point

import vue from 'vue'
import JsonEditor from 'vue-json-editor'
  
Vue.use(JsonEditor)


//or, require
import JsonEditor from 'vue-json-editor'

export default {
  ...
  components: {
    JsonEditor,
  },
}
  
```
---

## Example
Single file component
``` html

<template>
	<JsonEditor :objData="jsonData" v-model="jsonData" ></JsonEditor>
</template>
<script>
  export default {
    ...
	data: function() {
		return {
			jsonData: {
				name: 'mike',
                age: 22,
                phone: '18552129932',
                address: ['AAA C1', 'BBB C2']
			}
		}
	}
  }
</script> 

```
