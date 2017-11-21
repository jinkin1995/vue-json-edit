<template>
    <div class="block_content array">
        <ol class="array-ol">
            <li v-for="(member, index) in flowData" :key="index" :class="['array-item', {'hide-item': hideMyItem[index] == true}]">
                <p v-if="member.type !== 'object' && member.type !== 'array'">
                    <input type="text" v-model="parsedData[index].remark" class="val-input" v-if="member.type == 'string'">
                    <input type="number" v-model="parsedData[index].remark" class="val-input" v-if="member.type == 'number'">
                    <select name="value" v-model="parsedData[index].remark" class="val-input" v-if="member.type == 'boolean'">
                        <option :value="true">true</option>
                        <option :value="false">false</option>
                    </select>
                </p>
                <div v-else>
                    <span :class="['json-key']">{{parsedData[index].type.toUpperCase()}}
                        <i class="collapse-down" v-if="member.type == 'object' || member.type == 'array'" @click="closeBlock(index, $event)">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8klEQVRYR+2U3REBQRCEv4uAEGSADMhABogEkSADGSADMiADMlBdNfei1v5e4WH37ep2pr/t3Z6GH6/mx/pUgOpAdaA64HPgAgw7GlTqNXb1+hbAFRilAvSBG9ArdOFu4o9UAO0X9akA4glMAF2Bc8WkQA2OmS5M7QAfy2MAVLwAtokQS2AXqokFUJ81sAo1tP8b2x/cngKgZjrRPNB1b44FxbUhFUA1vvlwtkcXJZ4LoHgqGe9DSlnXg3XGrSQFrtqBOdHOCMVNkdXcSFo5V9AKSPBgHzNf1n1EJQBJJ+36CjoRz32EnYlXgOpAdeAvHHgBK3McIenq8YEAAAAASUVORK5CYII=" alt="">
                        </i>
                    </span>   

                    <span class="json-val">         
                        <template v-if="member.type == 'array'">
                            <array-view :parsedData="parsedData[index].childParams" v-model="parsedData[index].childParams"></array-view>
                        </template>

                        <template v-if="member.type == 'object'">
                            <json-view :parsedData="parsedData[index].childParams" v-model="parsedData[index].childParams"></json-view>
                        </template>
                        
                    </span>        
                </div>
                
                <i class="del-btn" @click="delItem(parsedData, member, index)">

                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2klEQVQ4T82TvQ0CMQxG3/VIwAYU9MAGjMAINJQImABGQGIAVmADGOHYgBHuahr0nRxkHYnkEjeRYvvl808qfm0CXO16aWcLrIFbP7zKAM7ACtgAb/OfgBkwLgHmwNCcAgyAiwueAlsgKZLrCTRJQeMAGVHZqwVQ50qIAro4D5C8YyC7Bg4pzgMegHqhgJKNrJnfvD5Aib5RfZB8d6+8BJASBWpsmopsb/AQwL+k0pKysIL/AqT913qHS9C49Kk0Up2yVwSg/6Bul0zT0VSyeyDHLrCJ+tpS2NkH0SguEVDIXI8AAAAASUVORK5CYII=" alt="">
                </i>
            </li>
        </ol>

        <item-add-form v-if="toAddItem" @confirm="newItem" @cancel="cancelNewItem" :needName="false"></item-add-form>

        <div class="block add-key" v-if="!toAddItem" @click="addItem">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAdklEQVRYR+2WQQqAMAwEpy+zP1N/Zl+mBBQvFjZS0MMu5NRtGoYmbSGvBZg721Yg1mUV2XkbXYAJmIAJmMBwApFwT4zkCkQ8aQMiZMVbkDlcTqwaXYAJ/IJA6gt1tuDUueXtTRuqHXP5hg8iF2ACJmACJvApgQOKCjwa9m4YqAAAAABJRU5ErkJggg==" alt="">
        </div>
    </div>
</template>


<script>
import ItemAddForm from './ItemAddForm.vue'

export default {
    name: 'ArrayView',
    props: ['parsedData'],
    data: function() {
        return {
            'flowData': this.parsedData,
            'toAddItem': false,
            'hideMyItem': []
        }
    },
    components: {
        // 'json-view': JsonView
        'item-add-form': ItemAddForm
    },
    methods: {
        'delItem': function (parentDom, item, index) {
            this.flowData = this.flowData.rmIndex(index)
            this.hideMyBlock[index] = false
            this.$emit('input', this.flowData)
        },

        'addItem': function () {
            this.toAddItem = true
        },

        'cancelNewItem': function () {
            this.toAddItem = false
        },

        'closeBlock': function (index, e) {
            this.hideMyItem[index] = this.hideMyItem[index]?false:true
            this.$forceUpdate()
        },

        'newItem': function (obj) {
            this.toAddItem = false
    
            let oj = {
                'name': obj.key,
                'type': obj.type,
                'description': ''
            }
            if(obj.type == 'array' || obj.type == 'object') {
                oj.childParams = obj.val
                oj.remark = null
            } else {
                oj.childParams = null
                oj.remark = obj.val
            }
            
            this.flowData.push(oj)
            this.$emit('input', this.flowData)
            this.cancelNewItem()
        }
    }


}

</script>

<style>
.array-ol {
    padding-left: 20px !important;
}

.array-item.hide-item {
    background: #f5f5f5;
}

.array-item.hide-item .json-val {
    display: none;
}

.array-item.hide-item .collapse-down {
    transform: rotate(-90deg);
}



</style>