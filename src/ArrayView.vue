<template>
  <div class="block_content array">
    <ol class="array-ol">
      <li
        v-for="(member, index) in flowData"
        :key="index"
        :class="['array-item', {'hide-item': hideMyItem[index] == true}]"
      >
        <p v-if="member.type !== 'object' && member.type !== 'array'">
          <input
            type="text"
            v-model="parsedData[index].remark"
            class="val-input"
            v-if="member.type == 'string'"
            placeholder="string"
          >
          <input
            type="number"
            v-model.number="parsedData[index].remark"
            class="val-input"
            v-if="member.type == 'number'"
            placeholder="number"
          >
          <select
            name="value"
            v-model="parsedData[index].remark"
            class="val-input"
            v-if="member.type == 'boolean'"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </p>
        <div v-else>
          <span :class="['json-key', 'json-desc']">
            {{parsedData[index].type.toUpperCase()}}
            <i
              class="collapse-down"
              v-if="member.type == 'object' || member.type == 'array'"
              @click="closeBlock(index, $event)"
            >
              <i class="v-json-edit-icon-down-open"></i>
            </i>
            <i v-if="member.type == 'object'">
							{{'{' + parsedData[index].childParams.length + '}'}}
						</i>
            <i v-if="member.type == 'array'">
							{{'[' + parsedData[index].childParams.length + ']'}}
						</i>
          </span>
          
          <span class="json-val">
            <template v-if="member.type == 'array'">
              <array-view
                :parsedData="parsedData[index].childParams"
                v-model="parsedData[index].childParams"
              ></array-view>
            </template>

            <template v-if="member.type == 'object'">
              <json-view
                :parsedData="parsedData[index].childParams"
                v-model="parsedData[index].childParams"
              ></json-view>
            </template>
          </span>
        </div>

        <i 
          class="del-btn" 
          @click="delItem(parsedData, member, index)">
          <i class="v-json-edit-icon-trash"></i>
        </i>
      </li>
    </ol>

    <item-add-form
			v-if="toAddItem" 
			@confirm="newItem" 
			@cancel="cancelNewItem" 
			:needName="false">
		</item-add-form>

    <div
      class="block add-key" 
      v-if="!toAddItem" 
      @click="addItem">
      <i class="v-json-edit-icon-plus"></i>
    </div>
  </div>
</template>

<script>
import ItemAddForm from "./ItemAddForm.vue";

export default {
  name: "ArrayView",
  props: ["parsedData"],
  data: function() {
    return {
      flowData: this.parsedData,
      toAddItem: false,
      hideMyItem: {}
    };
  },
  components: {
    "item-add-form": ItemAddForm
  },
  methods: {
    delItem: function(parentDom, item, index) {
      this.flowData = this.flowData.rmIndex(index);
      if (this.hideMyItem[index]) this.hideMyItem[index] = false;
      this.$emit("input", this.flowData);
    },

    addItem: function() {
      this.toAddItem = true;
    },

    cancelNewItem: function() {
      this.toAddItem = false;
    },

    closeBlock: function(index, e) {
      this.$set(this.hideMyItem, index, this.hideMyItem[index] ? false : true);
    },

    newItem: function(obj) {
      this.toAddItem = false;

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

      this.flowData.push(oj);
      this.$emit("input", this.flowData);
      this.cancelNewItem();
    }
  }
};
</script>
