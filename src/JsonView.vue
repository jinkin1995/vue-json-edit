<template>
    <div class="block_content">
        <span v-for="(item, index) in flowData" :key="index" :class="['block', 'clearfix', {'hide-block': hideMyBlock[index] == true}]">
            <span class="json-key">
                <input type="text" v-model="item.name" class="key-input" v-if="item.name">
                <i class="collapse-down" v-if="item.type == 'object' || item.type == 'array'" @click="closeBlock(index, $event)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8klEQVRYR+2U3REBQRCEv4uAEGSADMhABogEkSADGSADMiADMlBdNfei1v5e4WH37ep2pr/t3Z6GH6/mx/pUgOpAdaA64HPgAgw7GlTqNXb1+hbAFRilAvSBG9ArdOFu4o9UAO0X9akA4glMAF2Bc8WkQA2OmS5M7QAfy2MAVLwAtokQS2AXqokFUJ81sAo1tP8b2x/cngKgZjrRPNB1b44FxbUhFUA1vvlwtkcXJZ4LoHgqGe9DSlnXg3XGrSQFrtqBOdHOCMVNkdXcSFo5V9AKSPBgHzNf1n1EJQBJJ+36CjoRz32EnYlXgOpAdeAvHHgBK3McIenq8YEAAAAASUVORK5CYII=" alt="">
                </i>
                <i class="del-btn" @click="delItem(parsedData, item, index)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2klEQVQ4T82TvQ0CMQxG3/VIwAYU9MAGjMAINJQImABGQGIAVmADGOHYgBHuahr0nRxkHYnkEjeRYvvl808qfm0CXO16aWcLrIFbP7zKAM7ACtgAb/OfgBkwLgHmwNCcAgyAiwueAlsgKZLrCTRJQeMAGVHZqwVQ50qIAro4D5C8YyC7Bg4pzgMegHqhgJKNrJnfvD5Aib5RfZB8d6+8BJASBWpsmopsb/AQwL+k0pKysIL/AqT913qHS9C49Kk0Up2yVwSg/6Bul0zT0VSyeyDHLrCJ+tpS2NkH0SguEVDIXI8AAAAASUVORK5CYII=" alt="">
                </i>
                <i v-if="item.type == 'object'" class="i-type">{{'{' + item.childParams.length + '}'}}</i>
                <i v-if="item.type == 'array'" class="i-type">{{'[' + item.childParams.length + ']'}}</i>
            </span>
            <span class="json-val">
                <template v-if="item.type == 'object'">
                    <json-view :parsedData="item.childParams" v-model="item.childParams" ></json-view>
                </template>

                <template v-else-if="item.type == 'array'">
                    <array-view :parsedData="item.childParams" v-model="item.childParams" ></array-view>
                </template>

                <template v-else>
                    <span class="val">    
                        <input type="text" v-model="item.remark" class="val-input" v-if="item.type == 'string'">
                        <input type="number" v-model="item.remark" class="val-input" v-if="item.type == 'number'">
                        <select name="value" v-model="item.remark" class="val-input" v-if="item.type == 'boolean'">
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
    props: {'parsedData': {}},
    data: function () {
        return {
            'flowData': [],
            'toAddItem': false,
            'hideMyBlock': {}
        }
    },

    created: function () {
        this.flowData = this.parsedData
    },

    components: {
        'item-add-form': ItemAddForm
    },
    methods: {
        'delItem': function (parentDom, item, index) {
            this.flowData = this.flowData.rmIndex(index)
            this.hideMyBlock[index] = false
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

        'newItem': function (obj) {
    
            let oj = {
                'name': obj.key,
                'type': obj.type
            }
            if(obj.type == 'array' || obj.type == 'object') {
                oj.childParams = obj.val
                oj.remark = null
            } else {
                oj.childParams = null
                oj.remark = obj.val
            }

            if(!oj.name) {
                alert('please must input a name!')
                return
            } else {

                this.flowData.push(oj)
                this.$emit('input', this.flowData)
                this.cancelNewItem()
            }
        }
    }
}

</script>