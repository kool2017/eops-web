<template>
    <div class="deviceMng_edit">
        <el-dialog title="增加设备" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition"
                     label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 设备信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="设备名称:" prop="autCode">
                                    <el-input v-model="addInfo.deviceName" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="设备类型:" prop="name">
                                    <el-input v-model="addInfo.deviceType" size="small" maxlength="60"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="add">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="addFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addInfo: {},
                addRules: {
                    deviceName: [
                        {required: true, message: '请输入权限编码', trigger: 'blur'},
                        {min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur'}
                    ]
                },
                addFormVisible: false
            }
        }
    }
</script>

<style scoped>
</style>
