# Vue-Json-Edit

> Visual JSON Editor built as an vue component. Provides a basic GUI


</br>


## **[DEMO](http://jinkin1995.github.io/vue-json-edit)**

</br>


## Getting Started
```
npm install vue-json-edit --save
```

</br>


## Usage

``` javascript
//import it in your project At your entry point

import vue from 'vue'
import JsonEditor from 'vue-json-edit'
  
Vue.use(JsonEditor)
```
### Props
All props are optional.

* objData: json data
* options
    * confirmText: strings of the confirm button
    * cancelText: strings of the cancel button


</br>

## Example
Single file component
``` html

<template>
    <JsonEditor
        :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
        :objData="jsonData" 
        v-model="jsonData" >
    </JsonEditor>
</template>
<script>
export default {
    ...
    data: function() {
        return {
            jsonData: {
                name: 'mike',
                age: 23,
                phone: '18552129932',
                address: ['AAA C1', 'BBB C2']
            }
        }
    }
}
</script> 
```

</br>

## Changelog

v1.3.0
* Options prop for sets the strings of the button


