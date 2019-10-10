<template>
    <el-dialog title="评价" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="scoreInfo" :rules="scoreRules" ref="scoreForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 评价信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="工单id:" prop="orderId">
                                <el-input v-model="scoreInfo.orderId" size="small" maxlength="60" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="评分:" prop="score">
                                <el-input v-model="scoreInfo.score" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="评价:" prop="evaluation">
                                <el-input type="textarea" v-model="scoreInfo.evaluation" size="small" maxlength="255"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="score">评价</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Score",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            scoreInfo: {}
        },
        data() {
            return {
                scoreRules: {
                    evaluation: [
                        {max: 255, message: '最大长度255', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            score() {
                let self = this
                let validRet = false
                self.$refs['scoreForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.scoreInfo
                self.$http
                    .post('/eops/device/score', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '评价成功',
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
                let afterScoreInfo = JSON.parse(JSON.stringify(this.scoreInfo))
                this.$emit('afterClose', afterScoreInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
