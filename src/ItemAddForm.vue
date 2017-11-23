<template>
  <div class="add-form">
      <input type="text" v-model="keyName" class="f-input" placeholder="name" v-if="needName">
      <select v-model="formatSelected" class="f-select">
          <option :value="item" v-for="(item, index) in formats" :key="item">{{item}}</option>
      </select>
      <span>:</span>

      <!-- -- -->
      <template v-if="formatSelected !='array' && formatSelected != 'object'">
        <input type="text" v-model="valName" class="f-input" placeholder="value" v-if="formatSelected == 'string'">
        <input type="number" v-model="valName" class="f-input" placeholder="value" v-if="formatSelected == 'number'" @change="dealNumber">
        <select name="value" v-model="valName" class="f-input" v-if="formatSelected == 'boolean'" @change="dealBoolean">
            <option :value="true">true</option>
            <option :value="false">false</option>
        </select>

      </template>


      <!-- -- -->
      <div class="f-btns">
        <button class="f-btn f-confirm" @click="confirm">确定</button>
        <button class="f-btn" @click="cancel">取消</button>
      </div>
  </div>

</template>

<script>

export default {
    name: 'ItemAddForm',
    data: function () {
        return {
            'formats': ['string', 'array', 'object', 'number', 'boolean'],
            'formatSelected': 'string',
            //--
            'keyName': '',
            'valName': ''
        }
    },
    props: {
        'needName': {
            default: true
        },
    },
    methods: {
        'confirm': function () {
            let val = null
            if(this.formatSelected === 'array' || this.formatSelected === 'object') {
                val = []
            } else {
                val = this.valName
            }

            let objData = {
                'key': this.needName?this.keyName:null,
                'val': val,
                'type': this.formatSelected
            }

            this.$emit('confirm', objData)
            this.keyName = ''
            this.valName = ''
            this.formatSelected = 'string'
        },

        'cancel': function () {
            this.$emit('cancel')
        },

        'dealBoolean': function () {
            this.valName = Boolean(this.valName)
        },

        'dealNumber': function () {
            this.valName = Number(this.valName)
        }
    }
}

</script>

<style>
.f-input {
    height: 20px;
    padding: 4px 6px; 
}

.f-select {
    position: relative;
    padding: .6em 1em .65em;  
    border: solid 1px #ccc;
    background: #fff; 
    appearance:none;  
    -moz-appearance:none;  
    -webkit-appearance:none; 
}



.f-btns {
    display: inline-block;
    margin-top: .5em;
}

.f-btn {
    display: inline-block;  
    zoom: 1; /* zoom and *display = ie7 hack for display:inline-block */  
    *display: inline;  
    vertical-align: baseline;  
    margin: 0 2px;  
    outline: none;  
    cursor: pointer;  
    text-align: center;  
    text-decoration: none;  
    padding: .6em 1em .65em;  
    -webkit-border-radius: .5em;   
    -moz-border-radius: .5em;  
    border-radius: .5em;  
}

.f-confirm {
    color: #fff;
    background: #05A5D1;
}

.add-form {
    margin-bottom: 20px;
}

</style>