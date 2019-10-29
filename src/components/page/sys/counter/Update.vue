<template>

    <el-dialog title="修改计数器" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 计数器信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="计数器id:" prop="id">
                                <el-input v-model="updateInfo.id" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="计数器码:" prop="cntCode">
                                <el-input v-model="updateInfo.cntCode" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="当前值:" prop="curValue">
                                <el-input v-model="updateInfo.curValue" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="最大值:" prop="maxValue">
                                <el-input v-model="updateInfo.maxValue" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="名称:" prop="cntName">
                                <el-input v-model="updateInfo.cntName" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="起始值:" prop="minValue">
                                <el-input v-model="updateInfo.minValue" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="状态:" prop="state">
                                <el-select v-model="updateInfo.state" size="small" clearable>
                                    <el-option v-for="item in stateEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
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
    import {getCounterStateEnum} from '../../../../enum/SysEnum'

    export default {
        name: "Update",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            updateInfo: {}
        },
        data() {
            return {
                stateEnum: getCounterStateEnum(),
                updateRules: {
                    cntCode: [
                        {required: true, message: '请输入计数器码', trigger: 'blur'},
                        {max: 10, message: '最大长度10', trigger: 'blur'}
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
                    .post('/eops/cnt/modify', input)
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
