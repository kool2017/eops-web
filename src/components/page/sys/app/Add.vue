<template>

    <el-dialog title="增加应用" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 应用信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="应用id:" prop="appid">
                                <el-input v-model="addInfo.appid" size="small" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="应用名称:" prop="appName">
                                <el-input v-model="addInfo.appName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="状态:" prop="state">
                                <el-select v-model="addInfo.state" size="small" clearable>
                                    <el-option label="1-正常" value="1"></el-option>
                                    <el-option label="2-关闭" value="2"></el-option>
                                </el-select>
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
        name: "Add",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                addInfo: {
                    appid: '',
                    appName: '',
                    state: ''
                },
                addRules: {
                    appid: [
                        {required: true, message: '请输入应用id', trigger: 'blur'},
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    appName: [
                        {required: true, message: '请输入应用名称', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请选择状态', trigger: 'blur'},
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
                    .post('/eops/sys/app/add_app', input)
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
