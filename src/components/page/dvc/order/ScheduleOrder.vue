<template>
    <el-dialog title="派单" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="scheduleInfo" :rules="scheduleRules" ref="scheduleForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 派单信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="工单id:" prop="title">
                                <el-input v-model="scheduleInfo.orderId" size="small" maxlength="60" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="维修人id:" prop="repairUserId">
                                <el-input v-model="scheduleInfo.repairUserId" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="维修人员姓名:" prop="repairUserName">
                                <el-input v-model="scheduleInfo.repairUserName" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="维修人员电话:" prop="repairPhone">
                                <el-input v-model="scheduleInfo.repairPhone" size="small" maxlength="60"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="schedule">派 单</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ScheduleInfoOrder",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            scheduleInfo: {}
        },
        data() {
            return {
                scheduleRules: {
                    repairUserName: [
                        {required: true, message: '请输入维修人员姓名', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    repairPhone: [
                        {required: true, message: '请输入维修人员电话', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            schedule() {
                let self = this
                let validRet = false
                self.$refs['scheduleForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.scheduleInfo
                self.$http
                    .post('/eops/device/schedule_itil', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '派单成功',
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
                let afterScheduleInfo = JSON.parse(JSON.stringify(this.scheduleInfo))
                this.$emit('afterClose', afterScheduleInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
