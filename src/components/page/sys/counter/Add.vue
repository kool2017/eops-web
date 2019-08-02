<template>

    <el-dialog title="增加计数器" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 计数器信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="计数器码:" prop="cntCode">
                                <el-input v-model="addInfo.cntCode" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="当前值:" prop="curValue">
                                <el-input v-model="addInfo.curValue" size="small" maxlength="10"></el-input>
                            </el-form-item>
                            <el-form-item label="最大值:" prop="maxValue">
                                <el-input v-model="addInfo.maxValue" size="small" maxlength="10"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="名称:" prop="cntName">
                                <el-input v-model="addInfo.cntName" size="small" maxlength="15"></el-input>
                            </el-form-item>
                            <el-form-item label="起始值:" prop="minValue">
                                <el-input v-model="addInfo.minValue" size="small" maxlength="10"></el-input>
                            </el-form-item>
                            <el-form-item label="状态:" prop="state">
                                <el-select v-model="addInfo.state" size="small" clearable>
                                    <el-option label="1-正常" value="1"></el-option>
                                    <el-option label="2-溢出" value="2"></el-option>
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
                    cntCode: '',
                    curValue: '',
                    maxValue: '',
                    cntName: '',
                    minValue: '',
                    state: ''
                },
                addRules: {
                    cntCode: [
                        {required: true, message: '请输入计数器码', trigger: 'blur'},
                        { max: 10, message: '最大长度10', trigger: 'blur'}
                    ],
                    cntName: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    curValue: [
                        {required: true, message: '请输入当前值', trigger: 'blur'},
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    minValue: [
                        {required: true, message: '请输入起始值', trigger: 'blur'},
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    maxValue: [
                        {required: true, message: '请输入最大值', trigger: 'blur'},
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请输入状态', trigger: 'change'},
                    ],
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
                if (self.addInfo.resetTime === null) {
                    self.addInfo.resetTime = ''
                }
                let input = self.addInfo
                self.$http
                    .post('/eops/cnt/add', input)
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
