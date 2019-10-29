/**
 * @type {Array}
 */
var addFlagEnum = [
    {
        code: 1,
        desc: '全量'
    },
    {
        code: 2,
        desc: '增量'
    }
]

export function getAddFlagDesc(code) {
    for (var i in addFlagEnum) {
        if (code == addFlagEnum[i].code) {
            return addFlagEnum[i].desc
        }
    }
}

export function getAddFlagEnum() {
    return addFlagEnum
}

/**
 * @type {Array}
 */
var readerTypeEnum = [
    {
        code: 1,
        desc: 'HTTP IN'
    },
    {
        code: 2,
        desc: 'HTTP OUT'
    },
    {
        code: 3,
        desc: 'FTP'
    },
    {
        code: 4,
        desc: '中间库'
    }
]

export function getReaderTypeDesc(code) {
    for (var i in readerTypeEnum) {
        if (code == readerTypeEnum[i].code) {
            return readerTypeEnum[i].desc
        }
    }
}

export function getReaderTypeEnum() {
    return readerTypeEnum
}

/**
 * @type {Array}
 */
var writerTypeEnum = [
    {
        code: 1,
        desc: 'MySql'
    },
    {
        code: 2,
        desc: '文件'
    },
    {
        code: 3,
        desc: 'HBase'
    },
    {
        code: 4,
        desc: 'Hive'
    },
    {
        code: 5,
        desc: 'Kafka'
    },
    {
        code: 6,
        desc: 'ES'
    }
]

export function getWriterTypeDesc(code) {
    for (var i in writerTypeEnum) {
        if (code == writerTypeEnum[i].code) {
            return writerTypeEnum[i].desc
        }
    }
}

export function getWriterTypeEnum() {
    return writerTypeEnum
}
