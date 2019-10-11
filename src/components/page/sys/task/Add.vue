<template>

    <el-dialog title="增加任务" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 任务信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="任务类型:" prop="taskType">
                                <el-select v-model="addInfo.taskType" size="small" clearable>
                                    <el-option label="1-数据流定时任务" value="1"></el-option>
                                    <el-option label="2-http请求任务" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="cron表达式:" prop="cron">
                                <el-input v-model="addInfo.cron" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="http请求url:" prop="httpUrl">
                                <el-input v-model="addInfo.httpUrl" size="small" maxlength="255"></el-input>
                            </el-form-item>
                            <el-form-item label="任务配置状态:" prop="state">
                                <el-select v-model="addInfo.state" size="small" clearable>
                                    <el-option label="1-正常" value="1"></el-option>
                                    <el-option label="2-关闭" value="2"></el-option>
                                    <el-option label="3-锁定" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="任务名称:" prop="taskName">
                                <el-input v-model="addInfo.taskName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="关联id:" prop="refId">
                                <el-input v-model="addInfo.refId" size="small" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="应用id:" prop="appid">
                                <el-input v-model="addInfo.appid" size="small" maxlength="20"></el-input>
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
                addInfo: {},
                addRules: {
                    taskType: [
                        {required: true, message: '请选择任务类型', trigger: 'blur'},
                    ],
                    cron: [
                        {required: true, message: '请输入cron表达式', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    httpUrl: [
                        {max: 255, message: '最大长度255', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请选择任务配置状态', trigger: 'blur'},
                    ],
                    taskName: [
                        {required: true, message: '请输入任务名称', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    refId: [
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    appid: [
                        {max: 20, message: '最大长度20', trigger: 'blur'}
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
                    .post('/eops/sys/task/add', input)
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
