function getType(obj) {
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
}


export const {
    getType

}