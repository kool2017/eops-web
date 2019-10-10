<template>
    <el-dialog title="停工" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="repairInfo" :rules="repairRules" ref="repairForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 停工信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="工单id:" prop="orderId">
                                <el-input v-model="repairInfo.orderId" size="small" maxlength="60" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="备注:" prop="description">
                                <el-input type="textarea" v-model="repairInfo.description" size="small" maxlength="255"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="stopRepair">停 工</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "StopRepair",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            repairInfo: {}
        },
        data() {
            return {
                repairRules: {
                    description: [
                        {max: 255, message: '最大长度255', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            stopRepair() {
                let self = this
                let validRet = false
                self.$refs['repairForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.repairInfo
                self.$http
                    .post('/eops/device/stop_repair', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '停工成功',
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
                let afterRepairInfo = JSON.parse(JSON.stringify(this.repairInfo))
                this.$emit('afterClose', afterRepairInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
