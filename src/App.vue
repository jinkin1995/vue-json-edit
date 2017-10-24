<template>
  <div id="app">
    <json-view :objData="jsonData" top=true></json-view>
    <!-- <textarea name="" id="" rows="100" style="width: 100%" v-model="displayData"></textarea> -->
    <div>
        {{displayData}}
    </div>
  </div>
</template>

<script>
import JsonView from './components/JsonView.vue'

export default {
  name: 'app',
  data: function() {
    return {
      'json': ['123', '42', '555', ['ff', 'vvv'], '123', '22', ['ghr', 'bfvz', 'feas', ['ffcc', '3fff', 'casd']], '44ffff'],
      'jsonData': {
        'name': 'jinkin',
        'age': 12,
        'address': ['Panyu Shiqiao on Canton', 'Tianhe', {
          'namll': 'world inside',
          'city': 'forida meta 11'
        }, ['nammm', 'fefasas', 'cadasda'], {
            'ge': 'asdasdasd',
            'grqq': 'adsadasdsad'
          }],
        'ohters': {
          'id': 1246,
          'joinTime': '2017-08-20. 10:20',
          'description': 'another man'
        }
      },
      'finalData': {},
      'displayData': ''
      // 'jsonData': {
      //   'name': 'jinkin',
      //   'age': 12,
      //   'address': ['Panyu Shiqiao on Canton', 'Tianhe'],
      //   'family': [{
      //     'name': 'chengbin',
      //     'role': 'fahter'
      //   }, {
      //     'name': 'xiaolin',
      //     'role': 'mother'
      //   }],
      //   'ohters': {
      //     'id': 1246,
      //     'joinTime': '2017-08-20. 10:20',
      //     'description': 'another man'
      //   }
      // }
    }
  },
  watch: {
    'finalData': function () {
      console.debug(this.finalData)
      // this.displayData = this.formatJson(this.finalData)
      this.displayData = JSON.stringify(this.finalData, null, 2)
    }
    // 'fj'
  },
  components: {
    // 'json-view': JsonView
  },
  methods: {
    'getFinalObj': function(e) {
      console.debug(e)
    },

    //JSON format print
    'formatJson': function(txt, compress /*是否为压缩模式*/) {
      /* 格式化JSON源码(对象转换为JSON文本) */
      var indentChar = "  ";
      if (/^\s*$/.test(txt)) {
        console.error("数据为空,无法格式化! ");
        return;
      }
      try {
        var data = eval("(" + txt + ")");
      } catch (e) {
        throw ("数据源语法错误,格式化失败! 错误信息: " + e.description, "err");
        return;
      }
      var draw = [],
        last = false,
        This = this,
        line = compress ? "" : "\n",
        nodeCount = 0,
        maxDepth = 0;

      var notify = function(name, value, isLast, indent /*缩进*/, formObj) {
        nodeCount++; /*节点计数*/
        for (var i = 0, tab = ""; i < indent; i++) tab += indentChar; /* 缩进HTML */
        tab = compress ? "" : tab; /*压缩模式忽略缩进*/
        maxDepth = ++indent; /*缩进递增并记录*/
        if (value && value.constructor == Array) {
          /*处理数组*/
          draw.push(
            tab + (formObj ? '"' + name + '":' : "") + "[" + line
          ); /*缩进'[' 然后换行*/
          for (var i = 0; i < value.length; i++)
            notify(i, value[i], i == value.length - 1, indent, false);
          draw.push(
            tab + "]" + (isLast ? line : "," + line)
          ); /*缩进']'换行,若非尾元素则添加逗号*/
        } else if (value && typeof value == "object") {
          /*处理对象*/
          draw.push(
            tab + (formObj ? '"' + name + '":' : "") + "{" + line
          ); /*缩进'{' 然后换行*/
          var len = 0,
            i = 0;
          for (var key in value) len++;
          for (var key in value) notify(key, value[key], ++i == len, indent, true);
          draw.push(
            tab + "}" + (isLast ? line : "," + line)
          ); /*缩进'}'换行,若非尾元素则添加逗号*/
        } else {
          if (typeof value == "string") value = '"' + value + '"';
          draw.push(
            tab +
            (formObj ? '"' + name + '":' : "") +
            value +
            (isLast ? "" : ",") +
            line
          );
        }
      };
      var isLast = true,
        indent = 0;
      notify("", data, isLast, indent, false);
      return draw.join("");
    }
  },
  mounted: function () {
      this.displayData = JSON.stringify(this.jsonData)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 560px;
}

textarea {
  font-size: 16px;
}

.clearfix{
  *zoom: 1;
}
.clearfix:before,
.clearfix:after{
    content: '';
    display: table;
}
.clearfix:after{
  clear:both;
}

pre {

  width: 500px;
}
  
</style>
