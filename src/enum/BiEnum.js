/**
 * 日期类型
 * @type {*[]}
 */
var dateTypeEnum = [
    {
        code: 1,
        desc: '日'
    },
    {
        code: 2,
        desc: '月'
    },
    {
        code: 3,
        desc: '季度'
    },
    {
        code: 4,
        desc: '年'
    }
]

export function getDateTypeDesc(code) {
    for (var i in dateTypeEnum) {
        if (code == dateTypeEnum[i].code) {
            return dateTypeEnum[i].desc
        }
    }
}

export function getDateTypeEnum() {
    return dateTypeEnum
}

/**
 * 文件类型
 * @type {*[]}
 */
var fileTypeEnum = [
    {
        code: 1,
        desc: 'sql'
    },
    {
        code: 2,
        desc: 'json'
    },
    {
        code: 3,
        desc: 'excel'
    },
    {
        code: 4,
        desc: 'pdf'
    }
]

export function getFileTypeDesc(code) {
    for (var i in fileTypeEnum) {
        if (code == fileTypeEnum[i].code) {
            return fileTypeEnum[i].desc
        }
    }
}

export function getFileTypeEnum() {
    return fileTypeEnum
}

/**
 *
 * @type {*[]}
 */
var flagEnum = [
    {
        code: 1,
        desc: '是'
    },
    {
        code: 0,
        desc: '否'
    }
]

export function getFlagDesc(code) {
    for (var i in flagEnum) {
        if (code == flagEnum[i].code) {
            return flagEnum[i].desc
        }
    }
}

export function getFlagEnum() {
    return flagEnum
}

/**
 * @type {*[]}
 */
var paramTypeEnum = [
    {
        code: 1,
        desc: '文本框'
    },
    {
        code: 2,
        desc: '文本域'
    },
    {
        code: 3,
        desc: '日期'
    },
    {
        code: 4,
        desc: '单选框'
    },
    {
        code: 5,
        desc: '复选框'
    }
]

export function getParamTypeDesc(code) {
    for (var i in paramTypeEnum) {
        if (code == paramTypeEnum[i].code) {
            return paramTypeEnum[i].desc
        }
    }
}

export function getParamTypeEnum() {
    return paramTypeEnum
}

/**
 * @type {*[]}
 */
var reportRecordStateEnum = [
    {
        code: 1,
        desc: '已生成'
    },
    {
        code: 2,
        desc: '已删除'
    },
    {
        code: 3,
        desc: '生成中'
    }
]

export function getReportRecordStateDesc(code) {
    for (var i in reportRecordStateEnum) {
        if (code == reportRecordStateEnum[i].code) {
            return reportRecordStateEnum[i].desc
        }
    }
}

export function getReportRecordStateEnum() {
    return reportRecordStateEnum
}

/**
 * @type {*[]}
 */
var reportTypeEnum = [
    {
        code: 1,
        desc: '列表'
    },
    {
        code: 2,
        desc: '表单'
    }
]

export function getReportTypeDesc(code) {
    for (var i in reportTypeEnum) {
        if (code == reportTypeEnum[i].code) {
            return reportTypeEnum[i].desc
        }
    }
}

export function getReportTypeEnum() {
    return reportTypeEnum
}
