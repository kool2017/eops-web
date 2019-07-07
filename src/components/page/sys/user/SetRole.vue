<template>
    <el-dialog title="设置角色" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-card>
            <el-transfer v-model="userRole" :data="allRole" :titles="['可赋予角色','已赋予角色']" :props="roleTransferProps">

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
            }
        },
        data(){
            return{
                userRole:[],
                allRole:[],
                roleTransferProps: {
                    key: 'roleCode',
                    label: 'name'
                }

            }
        },
        methods: {
            roleSubmit() {
                const self = this
                let secIn = []
                for (let index = 0; index < self.userRole.length; index++) {
                    const element = self.userRole[index];
                    let propIn = {
                        userCid: self.selectedInfo.userCid,
                        roleCode: element
                    }
                    secIn.push(propIn)
                }
                let input = {
                    SYUSRCIDX: [self.selectedInfo],
                    SYUSRROLEX: secIn
                }
                self.$http
                    .post('/sys/user/setRole', input)
                    .then((res) => {
                        this.roleTransferVisible = false
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
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
