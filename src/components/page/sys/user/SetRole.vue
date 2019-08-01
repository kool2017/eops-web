<template>
    <el-dialog title="设置角色" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-card>
            <el-transfer v-model="roleInfo.userRole" :data="roleInfo.allRole" :titles="['可赋予角色','已赋予角色']"
                         :props="roleTransferProps">
            </el-transfer>
        </el-card>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="roleSubmit">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "SetRole",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            userInfo: {},
            roleInfo: {}
        },
        data() {
            return {
                roleTransferProps: {
                    key: 'roleCode',
                    label: 'roleName'
                }

            }
        },
        methods: {
            roleSubmit() {
                const self = this
                let input = {
                    userId: self.userInfo.id,
                    roleCodes: self.roleInfo.userRole
                }
                self.$http
                    .post('/eops/role/bind_user_role', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '设置角色成功',
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
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
