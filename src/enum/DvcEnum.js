/**
 * @type {Array}
 */
var deviceStateEnum = [
    {
        code: 1,
        desc: '正常'
    },
    {
        code: 2,
        desc: '维修中'
    },
    {
        code: 3,
        desc: '损坏'
    },
    {
        code: 4,
        desc: '报废'
    }
]

export function getDeviceStateDesc(code) {
    for (var i in deviceStateEnum) {
        if (code == deviceStateEnum[i].code) {
            return deviceStateEnum[i].desc
        }
    }
}

export function getDeviceStateEnum() {
    return deviceStateEnum
}

/**
 * @type {Array}
 */
var orderStateEnum = [
    {
        code: 1,
        desc: '已提交'
    },
    {
        code: 2,
        desc: '待施工'
    },
    {
        code: 3,
        desc: '施工中'
    },
    {
        code: 4,
        desc: '停工'
    },
    {
        code: 5,
        desc: '完工'
    },
    {
        code: 6,
        desc: '结束'
    }
]

export function getOrderStateDesc(code) {
    for (var i in orderStateEnum) {
        if (code == orderStateEnum[i].code) {
            return orderStateEnum[i].desc
        }
    }
}

export function getOrderStateEnum() {
    return orderStateEnum
}

/**
 * @type {Array}
 */
var recordTypeEnum = [
    {
        code: 1,
        desc: '报修'
    },
    {
        code: 2,
        desc: '派单'
    },
    {
        code: 3,
        desc: '转派'
    },
    {
        code: 4,
        desc: '接单'
    },
    {
        code: 5,
        desc: '维修登记'
    },
    {
        code: 6,
        desc: '停工'
    },
    {
        code: 7,
        desc: '留言'
    },
    {
        code: 8,
        desc: '完工'
    },
    {
        code: 9,
        desc: '评价'
    },
    {
        code: 10,
        desc: '关闭工单'
    }
]

export function getRecordTypeDesc(code) {
    for (var i in recordTypeEnum) {
        if (code == recordTypeEnum[i].code) {
            return recordTypeEnum[i].desc
        }
    }
}

export function getRecordTypeEnum() {
    return recordTypeEnum
}
