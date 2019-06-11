<template>
    <el-dialog title="代理" :visible.sync="thisFormVisible" :close-on-click-modal="false" append-to-body>
        <el-card class="list-card">
            <span>
                <i class="el-icon-tickets"></i> 请选择代理人员: </span>
            <hr class="split" />
            <div class="card-context">
                <el-table :data="retList" border style="width: 100%" ref="retTable" show-overflow-tooltip @current-change="handleSelectionChange">
                    <el-table-column prop="userCid" label="用户号" width="150"></el-table-column>
                    <el-table-column prop="loginName" label="登录名" width="500"></el-table-column>
                </el-table>
            </div>
        </el-card>
        <div slot="footer">
            <el-button size="small" icon="el-icon-check" @click="agentSubmit" :disabled="isDisabled">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="close">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    data () {
        return {
            retList: [],
            selectedInfo: {},
            isDisabled: true
        }
    },
    props: ['fatSelectedInfo', 'agentFormVisible'],
    created () {
        this.init()
        this.query()
    },
    computed: {
        thisFormVisible: {
            get () {
                if (this.agentFormVisible == true) {
                    this.init()
                    this.query()
                }
                return this.agentFormVisible
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
        agentSubmit () {
            let self = this
            var input = {
                CMAGENTX: [{
                    nodeCid: self.fatSelectedInfo.content.nodeCid,
                    agentUserCid: self.selectedInfo.userCid,
                    agentLoginName: self.selectedInfo.loginName
                }],
            }
            self.$http
                .post('/comm/wkf/agent', input)
                .then((res) => {
                    self.$emit('close')
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        notContain (array, val) {
            let notContain = true
            if (array == undefined) {
                return false
            }
            for (let index = 0; index < array.length; index++) {
                const element = array[index]
                if (element.content.userCid != null && element.content.userCid == val.userCid) {
                    notContain = false
                    break
                }
            }
            return notContain
        },
        handleSelectionChange (val) {
            this.selectedInfo = val
            if (val == null) {
                this.isDisabled = true
            } else {
                this.isDisabled = false
            }
        },
        init () {
            this.selectedInfo = {}
        }
    }
}
</script>
<style scoped>
</style>
