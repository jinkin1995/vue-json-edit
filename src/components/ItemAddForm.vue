<template>
  <div class="add-form">
      <input type="text" v-model="keyName" class="f-input" placeholder="name" v-if="needName">
      <select v-model="formatSelected" class="f-input">
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
      <button @click="confirm">确定</button>
      <button @click="cancel">取消</button>
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
}

.add-form {
    margin-bottom: 20px;
}

</style>