<template>

    <el-dialog title="修改角色" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 角色信息:</span>
                <hr class="split" />
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="角色id:" prop="id">
                                <el-input v-model="updateInfo.id" size="small" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="角色编码:" prop="roleCode">
                                <el-input v-model="updateInfo.roleCode" size="small" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="角色名称:" prop="roleName">
                                <el-input v-model="updateInfo.roleName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="update">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Update",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            updateInfo: {}
        },
        data(){
            return{
                updateRules: {
                    roleCode: [
                        {required: true, message: '请输入角色编码', trigger: 'blur'},
                        {max: 10, message: '最大长度10', trigger: 'blur'}
                    ],
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            update() {
                let self = this
                let validRet = false
                self.$refs['updateForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.updateInfo
                self.$http
                    .post('/eops/role/modify', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '修改信息成功',
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
                let afterUpdateInfo = JSON.parse(JSON.stringify(this.updateInfo))
                this.$emit('afterClose', afterUpdateInfo)
                this.$emit('update:visible', false)
            }
        }
    }
</script>

<style scoped>

</style>
