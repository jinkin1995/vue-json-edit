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

import Vue from 'vue'
import JsonEditor from 'vue-json-edit'
  
Vue.use(JsonEditor)
```
### Props

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


## ..

Aplipay: 

https://s3.bmp.ovh/imgs/2022/01/d5e26a068a6b7b03.png

USDT:

https://s3.bmp.ovh/imgs/2022/01/8739eedae8a9a39d.jpeg


