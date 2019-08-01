<template>

    <el-dialog title="修改权限" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 权限信息:</span>
                <hr class="split" />
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="权限id:" prop="id">
                                <el-input v-model="updateInfo.id" size="small" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="权限编码:" prop="autCode">
                                <el-input v-model="updateInfo.autCode" size="small" maxlength="10" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="权限名称:" prop="autName">
                                <el-input v-model="updateInfo.autName" size="small" maxlength="100"></el-input>
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
                    autCode: [
                        {required: true, message: '请输入权限编码', trigger: 'blur'},
                        {max: 10, message: '最大长度10', trigger: 'blur'}
                    ],
                    autName: [
                        {required: true, message: '请输入权限名称', trigger: 'blur'},
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
                    .post('/eops/aut/modify', input)
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
