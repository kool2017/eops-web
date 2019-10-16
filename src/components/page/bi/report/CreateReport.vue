<template>
    <el-dialog title="生成报表" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="createInfo" :rules="createRules" ref="createForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i>参数信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-form-item label="文件类型:" prop="fileType">
                                <el-select v-model="createInfo.fileType" size="small" clearable>
                                    <el-option label="3-excel" value="3"></el-option>
                                    <el-option label="4-pdf" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <hr class="split"/>
                        <div v-for="(param,index) in reportInfo.reportParams">
                            <div v-if="param.paramType == 1">
                                <el-form-item :label="param.paramName">
                                    <el-input v-model="params[index].value" size="small" maxlength="100"></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="param.paramType == 2">
                                <el-form-item :label="param.paramName">
                                    <el-input type="textarea" v-model="params[index].value" size="small"
                                              maxlength="100"></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="param.paramType == 3">
                                <el-form-item :label="param.paramName">
                                    <el-date-picker
                                        v-model="params[index].value"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div v-else-if="param.paramType == 4">
                                <el-form-item :label="param.paramName">
                                    <el-select v-model="params[index].value" placeholder="请选择">
                                        <el-option v-for="item in param.values" :label="item" :key="item"
                                                   :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="create">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "CreateReport",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            reportInfo: {
                id: null,
                reportCode: null,
                reportParams: null
            }
        },
        data() {
            return {
                createInfo: {
                    id: null,
                    reportCode: null,
                    fileType: null,
                    params: null
                },
                createRules: {},
                params: [{value: null}]
            }
        },
        methods: {
            create() {
                let self = this
                let params = []
                for (let i = 0; i < self.reportInfo.reportParams.length; i++) {
                    let param = {
                        key: self.reportInfo.reportParams[i].reportParam,
                        value: self.params[i].value
                    }
                    params.push(param)
                }
                let input = {
                    id: self.reportInfo.id,
                    reportCode: self.reportInfo.reportCode,
                    fileType: self.createInfo.fileType,
                    params: params
                }
                self.$http
                    .post('/eops/bi/report/generateReport', input)
                    .then((res) => {
                        self.modalClose()
                        self.$message({
                            message: '生成报表成功',
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
                this.createInfo = {}
                this.reportInfo
                this.$emit('afterClose', this.reportInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
