<template>

    <el-dialog title="提交维修工单" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition"
                 label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 设备信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="标题:" prop="title">
                                <el-input v-model="addInfo.title" size="small" maxlength="8"></el-input>
                            </el-form-item>
                            <el-form-item label="报修人姓名:" prop="submitName">
                                <el-input v-model="addInfo.submitName" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="报修人电话:" prop="submitPhone">
                                <el-input v-model="addInfo.submitPhone" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="设备id:" prop="deviceId">
                                <el-input v-model="addInfo.deviceId" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称:" prop="deviceName">
                                <el-input v-model="addInfo.deviceName" size="small" maxlength="60"></el-input>
                            </el-form-item>
                            <el-form-item label="描述信息:" prop="description">
                                <el-input v-model="addInfo.description" size="small" maxlength="60" type="textarea" autosize></el-input>
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
</template>

<script>
    export default {
        name: "SubmitOrder"
    }
</script>

<style scoped>

</style>
