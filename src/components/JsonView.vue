<template>
    <div class="block_content">
        <span v-for="(item, index) in flowData" :key="index" :class="['block', 'clearfix', {'hide-block': hideMyBlock[index] == true}]">
            <span class="json-key">
                <input type="text" v-model="item.key" class="key-input" v-if="item.key">
                <i class="collapse-down" v-if="item.type == 'object' || item.type == 'array'" @click="closeBlock(index, $event)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8klEQVRYR+2U3REBQRCEv4uAEGSADMhABogEkSADGSADMiADMlBdNfei1v5e4WH37ep2pr/t3Z6GH6/mx/pUgOpAdaA64HPgAgw7GlTqNXb1+hbAFRilAvSBG9ArdOFu4o9UAO0X9akA4glMAF2Bc8WkQA2OmS5M7QAfy2MAVLwAtokQS2AXqokFUJ81sAo1tP8b2x/cngKgZjrRPNB1b44FxbUhFUA1vvlwtkcXJZ4LoHgqGe9DSlnXg3XGrSQFrtqBOdHOCMVNkdXcSFo5V9AKSPBgHzNf1n1EJQBJJ+36CjoRz32EnYlXgOpAdeAvHHgBK3McIenq8YEAAAAASUVORK5CYII=" alt="">
                </i>
                <i class="del-btn" @click="delItem(parsedData, item, index)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2klEQVQ4T82TvQ0CMQxG3/VIwAYU9MAGjMAINJQImABGQGIAVmADGOHYgBHuahr0nRxkHYnkEjeRYvvl808qfm0CXO16aWcLrIFbP7zKAM7ACtgAb/OfgBkwLgHmwNCcAgyAiwueAlsgKZLrCTRJQeMAGVHZqwVQ50qIAro4D5C8YyC7Bg4pzgMegHqhgJKNrJnfvD5Aib5RfZB8d6+8BJASBWpsmopsb/AQwL+k0pKysIL/AqT913qHS9C49Kk0Up2yVwSg/6Bul0zT0VSyeyDHLrCJ+tpS2NkH0SguEVDIXI8AAAAASUVORK5CYII=" alt="">
                </i>
                <span class="des add-des" @click="addDes('添加', item)" v-if="!item.des">添加注释</span>
                <span class="des" @click="addDes('修改', item)" v-else>{{item.des}}</span>
            </span>
            <span class="json-val">
                <template v-if="item.type == 'object'">
                    <json-view :parsedData="item.val" v-model="item.val" ></json-view>
                </template>

                <template v-else-if="item.type == 'array'">
                    <array-view :parsedData="item.val" v-model="item.val" ></array-view>
                </template>

                <template v-else>
                    <span class="val">    
                        <input type="text" v-model="item.val" class="val-input" v-if="item.type == 'string'">
                        <input type="number" v-model="item.val" class="val-input" v-if="item.type == 'number'">
                        <select name="value" v-model="item.val" class="val-input" v-if="item.type == 'boolean'">
                            <option :value="true">true</option>
                            <option :value="false">false</option>
                        </select>
                    </span>
                </template>
            </span>
        </span>
        <item-add-form v-if="toAddItem" @confirm="newItem" @cancel="cancelNewItem"></item-add-form>
        <div class="block add-key" @click="addItem" v-if="!toAddItem">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAdklEQVRYR+2WQQqAMAwEpy+zP1N/Zl+mBBQvFjZS0MMu5NRtGoYmbSGvBZg721Yg1mUV2XkbXYAJmIAJmMBwApFwT4zkCkQ8aQMiZMVbkDlcTqwaXYAJ/IJA6gt1tuDUueXtTRuqHXP5hg8iF2ACJmACJvApgQOKCjwa9m4YqAAAAABJRU5ErkJggg==" alt="">
        </div>
    </div>
</template>

<script>
import ItemAddForm from './ItemAddForm.vue'

export default {
    name: 'JsonView',
    props: {'parsedData': {}, 'top': {default:false}},
    data: function () {
        return {
            'flowData': [],
            'toAddItem': false,
            'hideMyBlock': {}
        }
    },

    components: {
        // 'array-view': ArrayView
        'item-add-form': ItemAddForm
    },
    created: function () {
        if(this.top) {
        }

        this.flowData = this.parsedData

        // if (this.top) {
        //     this.$bus.$on('childDataUpdata', () => {
        //         // this.revertObj()
        //     })
        // }
    },
    methods: {
        'delItem': function (parentDom, item, index) {
            this.flowData = this.flowData.rmIndex(index)
            this.$emit('input', this.flowData)
        },

        'closeBlock': function (index, e) {
            this.hideMyBlock[index] = this.hideMyBlock[index]?false:true
            this.$forceUpdate()
            console.debug(this.hideMyBlock)
        },

        'addItem': function () {
            this.toAddItem = true
        },

        'cancelNewItem': function () {
            this.toAddItem = false
        },

        'addDes': function (action, item) {
            let itemInput = prompt(`${action}${item.key}的描述信息`)
            if(itemInput != null && itemInput != '') {
                item.des = itemInput
                this.$forceUpdate()
            }
        },

        'newItem': function (obj) {
            this.toAddItem = false
            this.flowData.push({
                'key': obj.key,
                'type': obj.type,
                'val': obj.val
            })
            // this.revertObj()
            this.$emit('input', this.flowData)
        }
    }
}

</script>


<style>
p {
    margin: 0
}

ol, ul {
    margin: 0;
}

.block{
    position: relative;
    display: block;
    min-height: 30px;
}

.block.hide-block {
    background: #f5f5f5;
}

.block.hide-block .json-val {
    display: none;
}

.block.hide-block .collapse-down {
    transform: rotate(-90deg);
}

.del-btn {
    position: absolute;
    right: 0;
    top: 7px;
    /* transform: translateY(-50%); */
    /* margin-right: 10px; */
    z-index: 99999999999999;
    cursor: pointer;
    height: 8px;
    width: 8px;
    /* background: red; */
}

.des {
    position: absolute;
    right: 14px;
    font-size: 10px;
    line-height: 30px;
    color: #6190e8;
    cursor: pointer;
}

.add-des {
    /* float: right; */
    color: #999;
}


.del-btn:hover {
    opacity: .5;
}

.block_content {
    text-align: left;
    margin-left: 30px;
    line-height: unset !important;
}

.block_content .json-key {
    font-weight: bold;
}

.block_content .key-input,
.block_content .val-input {
    width: 140px;
    border: none;
    height: 25px;
    padding: 0 5px;
    font-weight: bold;
    font-size: 14px;
    background: rgba(0,0,0,0);
}

.block_content .key-input:focus,
.block_content .val-input:focus {
    background: #ffffa0;
    border: none;
    outline: 0;
}

.block_content .val-input {
    font-weight: normal;
    color: #008000;
}

.collopsed:before {
    content: '';
    display: inline-block;
    height: 10px;
    width: 10px;
    background: #333;
}

.array-item {
    position: relative;
}

.collapse-down {
    float: left;
    /* display: inline-block; */
    height: 18px;
    width: 18px;
    margin-top: 2px;
    margin-right: 2px;
    cursor: pointer;
}

.collapse-down img {
    width: 100%
}

.add-key {
    display: inline-block;
    height: 14px;
    width: 14px;
    padding: 5px;
    cursor: pointer;
}

.add-key img {
    width: 100%;
}

</style>