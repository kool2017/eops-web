<template>
    <el-dialog title="提交维修工单" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 设备信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="标题:" prop="title">
                                <el-input v-model="addInfo.title" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="报修人姓名:" prop="submitName">
                                <el-input v-model="addInfo.submitName" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="报修人电话:" prop="submitPhone">
                                <el-input v-model="addInfo.submitPhone" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="设备id:" prop="deviceId">
                                <el-input v-model="addInfo.deviceId" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称:" prop="deviceName">
                                <el-input v-model="addInfo.deviceName" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="描述信息:" prop="description">
                                <el-input v-model="addInfo.description" size="small" maxlength="60" type="textarea" autosize></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="add">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "SubmitOrder",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                addInfo: {
                    title: '',
                    submitName: '',
                    submitPhone: '',
                    deviceName: ''
                },
                addRules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    submitName: [
                        {required: true, message: '请输入报修人姓名', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    submitPhone: [
                        {required: true, message: '请输入报修人电话', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    deviceName: [
                        {required: true, message: '请输入设备名称', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
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
                    .post('/eops/device/submit_itil', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '报修成功',
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
