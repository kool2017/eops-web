<template>

    <el-dialog title="绑定菜单" :visible.sync="visible" :close-on-click-modal="false"
               :before-close="modalClose">
        <el-card>
            <el-transfer v-model="menuInfo.autMenu" :data="menuInfo.allMenu" :titles="['未绑定菜单','已绑定菜单']"
                         :props="menuTransferProps">

            </el-transfer>
        </el-card>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="bindMenuSubmit">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "BindMenu",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            authInfo: {},
            menuInfo: {}
        },
        data() {
            return {
                menuTransferProps: {
                    key: 'menuCode',
                    label: 'title'
                }
            }
        },
        methods: {
            bindMenuSubmit() {
                const self = this
                let input = {
                    autCode: self.authInfo.autCode,
                    menuCodes: self.menuInfo.autMenu
                }
                self.$http
                    .post('/eops/aut/bind_menu_aut', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '绑定菜单成功',
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
                this.menuInfo.autMenu = []
                this.menuInfo.allMenu = []
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
