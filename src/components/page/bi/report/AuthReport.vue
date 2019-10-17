<template>
    <el-dialog title="授权报表" :visible.sync="visible" :close-on-click-modal="false"
               :before-close="modalClose">
        <el-card>
            <el-transfer v-model="authInfo.userAuthBit" :data="authInfo.allUsersBit" :titles="['无权限用户','有权限用户']"
                         :props="authTransferProps">

            </el-transfer>
        </el-card>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="auth">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "AuthReport",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            authInfo: {
                reportId: null,
                userAuthBit: [],
                allUsersBit: []
            }
        },
        data() {
            return {
                authTransferProps: {
                    key: 'userBitKey',
                    label: 'userBitName'
                }
            }
        },
        methods: {
            auth() {
                const self = this
                let userAuthBit = []
                for(let i = 0; i< self.authInfo.userAuthBit.length;i++){
                    const userBitKey = self.authInfo.userAuthBit[i]
                    let userBit = userBitKey.split('_')
                    let item = {
                        userId : userBit[0],
                        code : userBit[1]
                    }
                    userAuthBit.push(item)
                }

                let input = {
                    reportId: self.authInfo.reportId,
                    userAuthBit: userAuthBit
                }
                self.$http
                    .post('/eops/bi/report/auth', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '报表授权成功',
                            type: 'success'
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            modalClose() {
                this.authInfo.userAuthBit = []
                this.authInfo.allUsersBit = []
                this.$emit('update:visible', false)
            }
        }
    }
</script>

<style scoped>

</style>
