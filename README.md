# Vue-JsonEditor

> visual JSON editor built as an vue component. Provides a basic GUI




  **[DEMO](http://jinkin1995.github.io/vue-jsonEditor)**

</br>


## Getting Started
``` javascript
npm install vue-jsonEditor --save
```

</br>


## Usage

``` javascript
//import it in your project At your entry point

import vue from 'vue'
import JsonEditor from 'vue-json-editor'
  
Vue.use(JsonEditor)


//or
import JsonEditor from 'vue-json-editor'

export default {
  ...
  components: {
    JsonEditor
  },
}
  
```
</br>

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
