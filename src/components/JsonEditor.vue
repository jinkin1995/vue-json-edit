<template>
    <json-view :parsedData="parsedData"></json-view>
</template>


<script>

export default {
    name: 'JsonEditor',
    props: { 'objData': { required: true } },
    data: function() {
        return {
            'parsedData': [],
        }
    },
    created: function() {
        this.parsedData = [{
            'key': 'name',
            'type': 'string',
            'val': 'jinkin'
        }, {
            'key': 'age',
            'type': 'number',
            'val': 22
        }, {
            'key': 'address',
            'type': 'array',
            'val': [{
                'key': null,
                'type': 'string',
                'val': '1111'
            }, {
                'key': null,
                'type': 'number',
                'val': 222
            }, {
                'key': null,
                'type': 'object',
                'val': [{
                    'key': 'o1',
                    'type': 'number',
                    'val': 111
                }, {
                    'key': 'o2',
                    'type': 'string',
                    'val': '222'
                }]
            }]
        }, {
            'key': 'objectList',
            'type': 'object',
            'val': [{
                'key': 'a11',
                'type': 'string',
                'val': 'o1111'
            }, {
                'key': 'a22',
                'type': 'string',
                'val': 'o2222'
            }]
        }]
        this.jsonParse()
    },
    watch: {
        'parsedData': function () {
            this.$emit('input', this.parsedData)
        }
    },
    methods: {
        'jsonParse': function (jsonStr) {

            // 解析JSON
            let parseJson = function () {
                return new Promise((resolve, reject) => {
                    

                })
            }

            //  解析ARRAY
            let parseArray = (function* () {})

            // --
            let parseBody = function (json) {
                parseJson(json).then((r) => {
                    console.debug(r)
                })
            }

            parseBody()
        },

        'getType': function(obj) {
            switch (Object.prototype.toString.call(obj)) {
                case '[object Array]': 
                    return 'array'
                    break
                case '[object Object]':
                    return 'object'
                    break
                default:
                    return 'normal'
                    break
            } 
        },

    }
}

</script>