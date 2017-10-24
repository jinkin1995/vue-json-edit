<template>
    <div class="block_content array">
        <ol class="array-ol">
            <li v-for="(member, index) in parsedData" :key="index" :class="['array-item', {'hide-item': hideMyItem[index] == true}]">
                <p v-if="member.type !== 'object' && member.type !== 'array'">
                    <input type="text" v-model="parsedData[index].val" class="val-input" @change="revertObj">
                </p>
                <div v-else>
                    <span :class="['json-key']">{{parsedData[index].type.toUpperCase()}}
                        <i class="collapse-down" v-if="member.type == 'object' || member.type == 'array'" @click="closeBlock(index, $event)">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8klEQVRYR+2U3REBQRCEv4uAEGSADMhABogEkSADGSADMiADMlBdNfei1v5e4WH37ep2pr/t3Z6GH6/mx/pUgOpAdaA64HPgAgw7GlTqNXb1+hbAFRilAvSBG9ArdOFu4o9UAO0X9akA4glMAF2Bc8WkQA2OmS5M7QAfy2MAVLwAtokQS2AXqokFUJ81sAo1tP8b2x/cngKgZjrRPNB1b44FxbUhFUA1vvlwtkcXJZ4LoHgqGe9DSlnXg3XGrSQFrtqBOdHOCMVNkdXcSFo5V9AKSPBgHzNf1n1EJQBJJ+36CjoRz32EnYlXgOpAdeAvHHgBK3McIenq8YEAAAAASUVORK5CYII=" alt="">
                        </i>
                    </span>   

                    <span class="json-val">         
                        <template v-if="member.type == 'array'">
                            <array-view :arrayData="parsedData[index].val" v-model="parsedData[index].val"></array-view>
                        </template>

                        <template v-if="member.type == 'object'">
                            <json-view :objData="parsedData[index].val" v-model="parsedData[index].val"></json-view>
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
    props: ['arrayData'],
    data: function() {
        return {
            'parsedData': this.arrayData,
            'toAddItem': false,
            'hideMyItem': []
        }
    },
    components: {
        // 'json-view': JsonView
        'item-add-form': ItemAddForm
    },
    mounted: function() {
        // console.debug(this.arrayData)
        // this.parseObj()
    },
    methods: {
        // 'childUpdate': function () {
        //     console.debug('-array')
        //     this.$emit('childUpdate')
        // },
        'parseObj': function () {
            let tmpData = []
            this.arrayData.forEach((el, index) => {
                let type = this.getType(el)
                if(type == 'object') {
                    tmpData.push({
                        'key': null,
                        'val': el
                    })
                } else if(type == 'array') {
                    tmpData.push({
                        'key': null,
                        'val': el
                    })
                    
                } else {
                    tmpData.push({
                        'key': null,
                        'val': el
                    })
                }
            })

            this.parsedData = tmpData
            this.$emit('input', this.parsedData)
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

        'delItem': function (parentDom, item, index) {
            console.debug(parentDom)
            console.debug(this.parsedData)
            console.debug(item)
            console.debug(index)
            //parsedData 为数组转换， 即objData is a Array
            this.parsedData = this.parsedData.rmIndex(index)
        },

        'addItem': function () {
            this.toAddItem = true
        },

        'cancelNewItem': function () {
            this.toAddItem = false
        },

        'closeBlock': function (index, e) {
            // let dom = e.target
            // let allBlock = dom.parentNode.querySelectorAll('.block_content')
            // for(let i = 0; i < allBlock.length; ++i) {
            //     console.debug(allBlock[i])
            //     allBlock[i].classList.toggle('hide')
            // }
            this.hideMyItem[index] = this.hideMyItem[index]?false:true
            this.$forceUpdate()
        },

        'newItem': function (obj) {
            this.toAddItem = false
            this.parsedData.push(obj.value)
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