/**
 * @type {*[]}
 */
var appStateEnum = [
    {
        code: 1,
        desc: '正常'
    },
    {
        code: 2,
        desc: '关闭'
    }
]

export function getAppStateDesc(code) {
    for (var i in appStateEnum) {
        if (code == appStateEnum[i].code) {
            return appStateEnum[i].desc
        }
    }
}

export function getAppStateEnum() {
    return appStateEnum
}

/**
 * @type {*[]}
 */
var counterStateEnum = [
    {
        code: 1,
        desc: '正常'
    },
    {
        code: 2,
        desc: '溢出'
    }
]

export function getCounterStateDesc(code) {
    for (var i in counterStateEnum) {
        if (code == counterStateEnum[i].code) {
            return counterStateEnum[i].desc
        }
    }
}

export function getCounterStateEnum() {
    return counterStateEnum
}

/**
 * @type {*[]}
 */
var menuStateEnum = [
    {
        code: 1,
        desc: '正常'
    },
    {
        code: 2,
        desc: '关闭'
    }
]

export function getMenuStateDesc(code) {
    for (var i in menuStateEnum) {
        if (code == menuStateEnum[i].code) {
            return menuStateEnum[i].desc
        }
    }
}

export function getMenuStateEnum() {
    return menuStateEnum
}

/**
 * @type {*[]}
 */
var msgTypeEnum = [
    {
        code: 1,
        desc: '维修通知'
    },
    {
        code: 2,
        desc: '系统告警'
    },
    {
        code: 3,
        desc: '定时任务通知'
    }
]

export function getMsgTypeDesc(code) {
    for (var i in msgTypeEnum) {
        if (code == msgTypeEnum[i].code) {
            return msgTypeEnum[i].desc
        }
    }
}

export function getMsgTypeEnum() {
    return msgTypeEnum
}

/**
 * @type {*[]}
 */
var notifyStateEnum = [
    {
        code: 0,
        desc: '未读'
    },
    {
        code: 1,
        desc: '已读'
    }
]

export function getNotifyStateDesc(code) {
    for (var i in notifyStateEnum) {
        if (code == notifyStateEnum[i].code) {
            return notifyStateEnum[i].desc
        }
    }
}

export function getNotifyStateEnum() {
    return notifyStateEnum
}

/**
 * @type {*[]}
 */
var taskCfgStateEnum = [
    {
        code: 1,
        desc: '正常'
    },
    {
        code: 2,
        desc: '关闭'
    },
    {
        code: 3,
        desc: '锁定'
    }
]

export function getTaskCfgStateDesc(code) {
    for (var i in taskCfgStateEnum) {
        if (code == taskCfgStateEnum[i].code) {
            return taskCfgStateEnum[i].desc
        }
    }
}

export function getTaskCfgStateEnum() {
    return taskCfgStateEnum
}

/**
 * @type {*[]}
 */
var taskStateEnum = [
    {
        code: 1,
        desc: '创建'
    },
    {
        code: 2,
        desc: '运行'
    },
    {
        code: 3,
        desc: '中断'
    },
    {
        code: 4,
        desc: '停止'
    }
]

export function getTaskStateDesc(code) {
    for (var i in taskStateEnum) {
        if (code == taskStateEnum[i].code) {
            return taskStateEnum[i].desc
        }
    }
}

export function getTaskStateEnum() {
    return taskStateEnum
}

/**
 * @type {*[]}
 */
var taskTypeEnum = [
    {
        code: 1,
        desc: '数据流定时任务'
    },
    {
        code: 2,
        desc: 'http请求任务'
    },
    {
        code: 3,
        desc: '计费定时任务'
    }
]

export function getTaskTypeDesc(code) {
    for (var i in taskTypeEnum) {
        if (code == taskTypeEnum[i].code) {
            return taskTypeEnum[i].desc
        }
    }
}

export function getTaskTypeEnum() {
    return taskTypeEnum
}

/**
 * @type {*[]}
 */
var userStateEnum = [
    {
        code: 1,
        desc: '正常'
    },
    {
        code: 2,
        desc: '关闭'
    },
    {
        code: 3,
        desc: '锁定'
    }
]

export function getUserStateDesc(code) {
    for (var i in userStateEnum) {
        if (code == userStateEnum[i].code) {
            return userStateEnum[i].desc
        }
    }
}

export function getUserStateEnum() {
    return userStateEnum
}
