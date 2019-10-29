/**
 * 计量单位
 * @type {*[]}
 */
var unitsEnum = [
    {
        code: 1,
        desc: '次'
    },
    {
        code: 2,
        desc: '秒'
    },
    {
        code: 3,
        desc: '十次'
    },
    {
        code: 4,
        desc: '百次'
    }
]

export function getUnitsDesc(code) {
    for (var i in unitsEnum) {
        if (code == unitsEnum[i].code) {
            return unitsEnum[i].desc
        }
    }
}

export function getUnitsEnum() {
    return unitsEnum
}

/**
 * 计费模式
 * @type {*[]}
 */
var costModeEnum = [
    {
        code: 1,
        desc: '按次计费'
    },
    {
        code: 2,
        desc: '按时长计费'
    }
]

export function getCostModeDesc(code) {
    for (var i in costModeEnum) {
        if (code == costModeEnum[i].code) {
            return costModeEnum[i].desc
        }
    }
}

export function getCostModeEnum() {
    return costModeEnum
}

/**
 * 产品类型
 * @type {Array}
 */
var productTypeEnum = [
    {
        code: 1,
        desc: 'dataflow元数据'
    },
    {
        code: 2,
        desc: '报表产品'
    }
]

export function getProductTypeDesc(code) {
    for (var i in productTypeEnum) {
        if (code == productTypeEnum[i].code) {
            return productTypeEnum[i].desc
        }
    }
}

export function getProductTypeEnum() {
    return productTypeEnum
}
