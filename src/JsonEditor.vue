<template>
  <json-view
    :parsedData="parsedData"
    v-model="parsedData"></json-view>
</template>

<script>
export default {
  name: "JsonEditor",
  props: {
    objData: {
      type: Object,
      required: true
    },
    tributeOptions: {
      type: Object,
      default: function () {
        return {
          collection: [
            {
              trigger: '@',
              values: [
                {key: 'miss', value: 'miss'},
                {key: 'miss1', value: 'miss2'},
                {key: 'miss3', value: 'miss3'}
              ]
            }
          ]
        }
      }
    },
    options: {
      type: Object,
      default: function () {
        return {
          confirmText: "confirm",
          cancelText: "cancel"
        }
      },
    }
  },
  provide () {
    return {
      formBtnText: this.options,
      tributeOptions: this.tributeOptions
    }
  },
  data () {
    return {
      parsedData: []
    };
  },
  created () {
    this.lastParsedData = {};
    this.parsedData = this.jsonParse(this.objData);
  },
  watch: {
    objData: {
      handler(newValue, oldValue) {
        this.parsedData = this.jsonParse(this.objData);
      }
    },
    parsedData: {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) === JSON.stringify(this.lastParsedData)) {
          return;
        }

        this.lastParsedData = newValue;
        this.$emit("input", this.makeJson(this.parsedData));
      },
      deep: true
    }
  },
  methods: {
    jsonParse: function (jsonStr) {
      let parseJson = json => {
        let result = [];
        let keys = Object.keys(json);
        keys.forEach((k, index) => {
          let val = json[k];
          let parsedVal = val;

          console.log('k', val)

          if (this.getType(val) == "object") {
            parsedVal = parseJson(val);

          } else if (this.getType(val) == "array") {
            parsedVal = parseArray(val);
          }

          let opt = {
            name: k,
            type: this.getType(val)
          };

          if (opt.type == "array" || opt.type == "object") {
            opt.childParams = parsedVal;
            opt.remark = null;
          } else {
            opt.childParams = null;
            opt.remark = parsedVal;
          }

          result.push(opt);
        });
        return result;
      };

      //
      let parseArray = arrayObj => {
        let result = [];
        for (let i = 0; i < arrayObj.length; ++i) {
          let val = arrayObj[i];
          let parsedVal = val;
          if (this.getType(val) == "object") {
            parsedVal = parseJson(val);

          } else if (this.getType(val) == "array") {
            parsedVal = parseArray(val);
          }

          let opt = {
            name: null,
            type: this.getType(val)
          };

          if (opt.type == "array" || opt.type == "object") {
            opt.childParams = parsedVal;
            opt.remark = null;
          } else {
            opt.childParams = null;
            opt.remark = parsedVal;
          }

          result.push(opt);
        }
        return result;
      };

      // --
      let parseBody = json => {
        let r = parseJson(json);
        return r;
      };

      return parseBody(jsonStr);
    },

    getType: function (obj) {
      switch (Object.prototype.toString.call(obj)) {
        case "[object Array]":
          return "array";
          break;
        case "[object Object]":
          return "object";
          break;
        case "[object Null]":
        case "[object Function]":
        case "[object Undefined]":
          return "string"
          break;
        default:
          return typeof obj;
          break;
      }
    },

    makeJson: function (dataArr) {
      let revertWithObj = function(data) {
        let r = {};
        for (let i = 0; i < data.length; ++i) {
          let el = data[i];
          let key, val;
          key = el.name;
          if (el.type == "array") {
            val = revertWithArray(el.childParams);
          } else if (el.type == "object") {
            val = revertWithObj(el.childParams);
          } else {
            val = el.remark;
          }

          r[key] = val;
        }
        return r;
      };

      let revertWithArray = function(data) {
        let arr = [];
        for (let i = 0; i < data.length; ++i) {
          let el = data[i];
          let r;
          if (el.type == "array") {
            r = revertWithArray(el.childParams);
          } else if (el.type == "object") {
            r = revertWithObj(el.childParams);
          } else {
            r = el.remark;
          }

          arr.push(r);
        }
        return arr;
      };

      let revertMain = function(data) {
        let r = revertWithObj(data);
        return r;
      };

      return revertMain(dataArr);
    }
  }
};
</script>

<style lang="less">
@import "./assets/styles/common.less";
  .v-tribute {
    display: inline-block;
  }

/* Tribute-specific styles */
.tribute-container {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
