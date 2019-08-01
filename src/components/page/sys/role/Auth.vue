<template>
    <el-dialog title="角色授权" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-card>
            <el-transfer v-model="authInfo.roleAuth" :data="authInfo.allAuth" :titles="['未授权','已授权']"
                         :props="authTransferProps">

            </el-transfer>
        </el-card>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="authSubmit">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Auth",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            roleInfo: {},
            authInfo: {}
        },
        data() {
            return {
                authTransferProps: {
                    key: 'autCode',
                    label: 'autName'
                }
            }
        },
        methods: {
            authSubmit() {
                const self = this
                let input = {
                    roleCode: self.roleInfo.roleCode,
                    autCodes: self.authInfo.roleAuth
                }
                self.$http
                    .post('/eops/aut/aut_role', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '授权成功',
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
                this.authInfo.roleAuth = []
                this.authInfo.allAuth = []
                this.$emit('update:visible', false);
            }

        }
    }
</script>

<style scoped>

</style>
