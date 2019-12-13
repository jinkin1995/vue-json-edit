<template>
  <div class="add-form pure-form">
    <div class="f-input">
      <input
        type="text"
        v-model="keyName"
        v-if="needName"
        class="f-input-m"
        placeholder="name">
      <select v-model="formatSelected" class="f-input-m">
        <option
          v-for="(item, index) in formats"
          :value="item"
          :key="index">
          {{item}}
        </option>
      </select>
      <span class="f-input-m">
        <b>:</b>
      </span>

      <template v-if="formatSelected !='array' && formatSelected != 'object'">
        <vue-tribute :options="tributeOptions">
          <input
            type="text"
            v-model="valName"
            class="f-input-m"
            placeholder="value"
            @tribute-replaced="updateFromTribute"
            v-if="formatSelected == 'string'"
          >
        </vue-tribute>
        <input
          type="number"
          v-model="valName"
          class="f-input-m"
          placeholder="value"
          v-if="formatSelected == 'number'"
          @change="dealNumber"
        >
        <select
          name="value"
          v-model="valName"
          class="f-input-m"
          v-if="formatSelected == 'boolean'"
          @change="dealBoolean"
        >
          <option :value="true">true</option>
          <option :value="false">false</option>
        </select>
      </template>
    </div>

    <div class="f-btns">
      <button
        class="pure-button f-confirm"
        @click="confirm">
        {{ this.formBtnText.confirmText }}
      </button>
      <button
        class="pure-button"
        @click="cancel">
        {{ this.formBtnText.cancelText }}
      </button>
    </div>
  </div>
</template>

<script>
import VueTribute from 'vue-tribute'

export default {
  name: 'ItemAddForm',
  components: {
    VueTribute
  },
  data () {
    return {
      formats: ['string', 'array', 'object', 'number', 'boolean'],
      formatSelected: 'string',
      //--
      keyName: '',
      valName: ''
    };
  },
  props: {
    needName: {
      default: true
    }
  },
  inject: ['formBtnText', 'tributeOptions'],
  methods: {
    confirm: function() {
      let val = null;
      if (this.formatSelected === 'array' || this.formatSelected === 'object') {
        val = [];
      } else {
        val = this.valName;
      }

      let objData = {
        key: this.needName ? this.keyName : null,
        val: val,
        type: this.formatSelected
      };

      this.$emit('confirm', objData);
      this.keyName = '';
      this.valName = '';
      this.formatSelected = 'string';
    },

    cancel: function() {
      this.$emit('cancel');
    },

    dealBoolean: function() {
      this.valName = Boolean(this.valName);
    },

    dealNumber: function() {
      this.valName = Number(this.valName);
    },

    updateFromTribute (e) {
      this.valName = e.target.value
    }
  }
};
</script>

<style lang="less" scoped>
.f-input,
.f-btns {
  display: inline-block;
}

.f-btns {
  display: inline-block;
  margin-top: 0.5em;
}

.f-confirm {
  color: #fff;
  background: #05a5d1;
}

.add-form {
  margin-bottom: 20px;
  font-size: 0.6em;
}
</style>
