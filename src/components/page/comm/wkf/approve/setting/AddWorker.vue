<template>
    <el-dialog title="增加人员" :visible.sync="thisFormVisible" :close-on-click-modal="false" append-to-body>
        <el-card class="list-card">
            <span>
                <i class="el-icon-tickets"></i> 请选择人员: </span>
            <hr class="split" />
            <div class="card-context">
                <el-table :data="retList" border style="width: 100%" ref="retTable" show-overflow-tooltip @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="userCid" label="用户号" width="150"></el-table-column>
                    <el-table-column prop="loginName" label="登录名" width="500"></el-table-column>
                </el-table>
            </div>
        </el-card>
        <div slot="footer">
            <el-button size="small" icon="el-icon-check" @click="select" :disabled="isDisabled">选 择</el-button>
            <el-button size="small" icon="el-icon-close" @click="close">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    data () {
        return {
            retList: [],
            selectedInfo: [],
            isDisabled: true
        }
    },
    props: ['fatSelectedInfo', 'addWorkerFormVisible'],
    created () {
        this.init()
        this.query()
    },
    computed: {
        thisFormVisible: {
            get () {
                if (this.addWorkerFormVisible == true) {
                    this.init()
                    this.query()
                }
                return this.addWorkerFormVisible
            },
            set (val) {
                this.$emit('close')
            }
        }
    },
    methods: {
        close () {
            this.$emit('close')
        },
        query () {
            let self = this
            var input = {
                SYUSRQRYX: [self.condition],
            }
            self.$http
                .post('/sys/user/queryUser', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYUSRQRYZ
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        select () {
            for (let i = 0; i < this.selectedInfo.length; i++) {
                const element = this.selectedInfo[i]
                if (this.fatSelectedInfo.subTree == null) {
                    this.fatSelectedInfo.subTree = []
                }
                if (this.notContain(this.fatSelectedInfo.subTree, element)) {
                    let worker = {
                        nodeId: element.userCid,
                        fatNodeId: this.fatSelectedInfo.nodeId,
                        rootNodeId: this.fatSelectedInfo.rootNodeId,
                        deep: this.fatSelectedInfo.deep + 1,
                        seq: this.fatSelectedInfo.subTree.length,
                        title: element.loginName,
                        content: {
                            seq: this.fatSelectedInfo.content.seq,
                            userCid: element.userCid,
                            loginName: element.loginName
                        }
                    }
                    this.fatSelectedInfo.subTree.push(worker)
                }
            }
            this.init()
            this.$emit('close')
        },
        notContain (array, val) {
            let notContain = true
            if (array == undefined) {
                return false
            }
            for (let index = 0; index < array.length; index++) {
                const element = array[index]
                if (element.content.userCid !== null && element.content.userCid === val.userCid) {
                    notContain = false
                    break
                }
            }
            return notContain
        },
        handleSelectionChange (val) {
            this.selectedInfo = val
            if (val.length > 0) {
                this.isDisabled = false
            } else {
                this.isDisabled = true
            }
        },
        init () {
            this.selectedInfo = []
        }
    }
}
</script>
<style scoped>
</style>
