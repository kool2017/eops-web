<template>

    <el-dialog title="增加设备信息" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 设备信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="设备名称:" prop="deviceName">
                                <el-input v-model="addInfo.deviceName" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类型:" prop="deviceType">
                                <el-input v-model="addInfo.deviceType" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="状态:" prop="state">
                                <el-select v-model="addInfo.state" size="small" clearable>
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
            <el-button type="primary" size="small" icon="el-icon-check" @click="add">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {getDeviceStateEnum} from '../../../../enum/DvcEnum'

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
                stateEnum: getDeviceStateEnum(),
                addInfo: {
                    deviceName: '',
                    state: '',
                    deviceType: ''
                },
                addRules: {
                    deviceName: [
                        {required: true, message: '请输入设备名称', trigger: 'blur'}
                    ],
                    deviceType: [
                        {required: true, message: '请输入设备类型', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
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
                    .post('/eops/device/add', input)
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
