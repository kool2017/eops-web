<template>
    <el-dialog title="修改任务" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 任务信息:</span>
                <hr class="split" />
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="任务类型:" prop="taskType">
                                <el-select v-model="updateInfo.taskType" size="small" clearable>
                                    <el-option label="1-数据流定时任务" value="1"></el-option>
                                    <el-option label="2-http请求任务" value="2"></el-option>
                                    <el-option label="3-计费任务" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="cron表达式:" prop="cron">
                                <el-input v-model="updateInfo.cron" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="http请求url:" prop="httpUrl">
                                <el-input v-model="updateInfo.httpUrl" size="small" maxlength="255"></el-input>
                            </el-form-item>
                            <el-form-item label="任务配置状态:" prop="state">
                                <el-select v-model="updateInfo.state" size="small" clearable>
                                    <el-option label="1-正常" value="1"></el-option>
                                    <el-option label="2-关闭" value="2"></el-option>
                                    <el-option label="3-锁定" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="任务名称:" prop="taskName">
                                <el-input v-model="updateInfo.taskName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="关联id:" prop="refId">
                                <el-input v-model="updateInfo.refId" size="small" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="应用id:" prop="appid">
                                <el-input v-model="updateInfo.appid" size="small" maxlength="20"></el-input>
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
                    .post('/eops/sys/task/update', input)
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
