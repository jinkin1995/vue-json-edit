<template>
  <div class="block_content">
    <span
      v-for="(item, index) in flowData"
      :key="index"
      :class="['block', 'clearfix', {'hide-block': hideMyBlock[index] == true}]"
    >
      <span class="json-key">
        <input
          type="text"
          v-model="item.name"
          class="key-input"
          v-if="typeof item.name == 'string'"
          @blur="keyInputBlur(item, $event)"
        >
        <i
          class="collapse-down"
          v-if="item.type == 'object' || item.type == 'array'"
          @click="closeBlock(index, $event)"
        >
          <i class="v-json-edit-icon-down-open"></i>
        </i>
        <i
          class="del-btn" 
          @click="delItem(parsedData, item, index)">
          <i class="v-json-edit-icon-trash"></i>
        </i>
        <i 
          v-if="item.type == 'object'" 
          class="i-type">
          {{'{' + item.childParams.length + '}'}}
        </i>
        <i 
          v-if="item.type == 'array'" 
          class="i-type">
          {{'[' + item.childParams.length + ']'}}
        </i>
      </span>
      <span class="json-val">
        <template v-if="item.type == 'object'">
          <json-view :parsedData="item.childParams" v-model="item.childParams"></json-view>
        </template>

        <template v-else-if="item.type == 'array'">
          <array-view :parsedData="item.childParams" v-model="item.childParams"></array-view>
        </template>

        <template v-else>
          <span class="val">
            <input 
              type="text" 
              v-model="item.remark" 
              class="val-input" 
              v-if="item.type == 'string'">
            <input
              type="number"
              v-model.number="item.remark"
              class="val-input"
              v-if="item.type == 'number'"
            >
            <select
              name="value"
              v-model="item.remark"
              class="val-input"
              v-if="item.type == 'boolean'"
            >
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </span>
        </template>
      </span>
    </span>

    <item-add-form 
      v-if="toAddItem" 
      @confirm="newItem" 
      @cancel="cancelNewItem"></item-add-form>

    <div 
      class="block add-key" 
      @click="addItem" 
      v-if="!toAddItem">
      <i class="v-json-edit-icon-plus"></i>
    </div>
  </div>
</template>

<script>
import ItemAddForm from "./ItemAddForm.vue";

export default {
  name: "JsonView",
  props: { parsedData: {} },
  data () {
    return {
      flowData: [],
      toAddItem: false,
      hideMyBlock: {}
    };
  },

  created () {
    this.flowData = this.parsedData;
  },
  watch: {
    parsedData: {
      handler(newValue, oldValue) {
        this.flowData = this.parsedData;
      }
    }
  },
  components: {
    "item-add-form": ItemAddForm
  },
  methods: {
    delItem: function(parentDom, item, index) {
      this.flowData = this.flowData.rmIndex(index);
      if (this.hideMyBlock[index]) this.hideMyBlock[index] = false;
      this.$emit("input", this.flowData);
    },

    closeBlock: function(index, e) {
      this.$set(
        this.hideMyBlock,
        index,
        this.hideMyBlock[index] ? false : true
      );
    },

    addItem: function() {
      this.toAddItem = true;
    },

    cancelNewItem: function() {
      this.toAddItem = false;
    },

    newItem: function(obj) {
      let oj = {
        name: obj.key,
        type: obj.type
      };
      if (obj.type == "array" || obj.type == "object") {
        oj.childParams = obj.val;
        oj.remark = null;
      } else {
        oj.childParams = null;
        oj.remark = obj.val;
      }

      if (!oj.name) {
        alert("please must input a name!");
        return;
      } else {
        this.flowData.push(oj);
        this.$emit("input", this.flowData);
        this.cancelNewItem();
      }
    },

    keyInputBlur: function(item, e) {
      if (item.name.length <= 0) {
        alert("please must input a name!");
        item.name = "null";
        e.target.focus();
      }
    }
  }
};
</script>