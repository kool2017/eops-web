<template>
    <el-dialog title="修改参数" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 参数信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="参数编码:" prop="paramCode">
                                <el-input v-model="updateInfo.paramCode" size="small" maxlength="8"
                                          readonly></el-input>
                            </el-form-item>
                            <el-form-item label="参数名称:" prop="paramName">
                                <el-input v-model="updateInfo.paramName" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="父参数:" prop="fatherCode">
                                <el-input v-model="updateInfo.fatherCode" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="序号:" prop="seq">
                                <el-input v-model.number="updateInfo.seq" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="参数键:" prop="paramKey">
                                <el-input v-model="updateInfo.paramKey" size="small" maxlength="512"></el-input>
                            </el-form-item>
                            <el-form-item label="参数值:" prop="paramValue">
                                <el-input v-model="updateInfo.paramValue" size="small" maxlength="512"></el-input>
                            </el-form-item>
                            <el-form-item label="根参数:" prop="rootCode">
                                <el-input v-model="updateInfo.rootCode" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="深度:" prop="deep">
                                <el-input v-model.number="updateInfo.deep" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="update">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="updateFormVisible = false">取 消</el-button>
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
        data() {
            return {
                updateRules: {
                    paramCode: [
                        {required: true, message: '请输入参数编码', trigger: 'blur'},
                        {min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur'}
                    ],
                    paramValue: [
                        {max: 512, message: '最大长度512', trigger: 'blur'}
                    ],
                    paramName: [
                        {max: 60, message: '最大长度60', trigger: 'blur'}
                    ],
                    rootCode: [
                        {required: true, message: '请输入根参数', trigger: 'blur'},
                        {min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur'}
                    ],
                    fatherCode: [
                        {max: 8, message: '最大长度8', trigger: 'blur'}
                    ],
                    deep: [
                        {required: true, message: '请输入深度', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {type: 'number', min: 0, message: '最小值0', trigger: 'blur'}
                    ],
                    seq: [
                        {required: true, message: '请输入序号', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {type: 'number', min: 0, message: '最小值0', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
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
                    .post('/eops/sys/param/update', input)
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
