<template>
    <el-dialog title="增加参数" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 参数信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="参数编码:" prop="paramCode">
                                <el-input v-model="addInfo.paramCode" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="参数名称:" prop="paramName">
                                <el-input v-model="addInfo.paramName" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="父参数:" prop="fatherCode">
                                <el-input v-model="addInfo.fatherCode" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="序号:" prop="seq">
                                <el-input v-model.number="addInfo.seq" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="参数键:" prop="paramKey">
                                <el-input v-model="addInfo.paramKey" size="small" maxlength="512"></el-input>
                            </el-form-item>
                            <el-form-item label="参数值:" prop="paramValue">
                                <el-input v-model="addInfo.paramValue" size="small" maxlength="512"></el-input>
                            </el-form-item>
                            <el-form-item label="根参数:" prop="rootCode">
                                <el-input v-model="addInfo.rootCode" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="深度:" prop="deep">
                                <el-input v-model.number="addInfo.deep" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="add">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="addFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Add",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                addInfo: {},
                addRules: {
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
            add() {
                let self = this
                let validRet = false
                self.$refs['addForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.addInfo
                self.$http
                    .post('/eops/sys/param/add', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '增加信息成功',
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
                let afterAddInfo = JSON.parse(JSON.stringify(this.addInfo))
                this.addInfo = {}
                this.$emit('afterClose', afterAddInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
