<template>
    <el-dialog title="修改费用项" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 费用项信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="计量单位:" prop="units">
                                <el-select v-model="updateInfo.units" size="small" clearable>
                                    <el-option v-for="item in unitsEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单价:" prop="price">
                                <el-input v-model="updateInfo.price" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="计费模式:" prop="costMode">
                                <el-select v-model="updateInfo.costMode" size="small" clearable>
                                    <el-option v-for="item in costModeEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="生效时间:" prop="enableTime">
                                <el-date-picker v-model="updateInfo.enableTime" type="datetime" placeholder="选择生效时间"
                                                size="small"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="失效时间:" prop="disableTime">
                                <el-date-picker v-model="updateInfo.disableTime" type="datetime" placeholder="选择失效时间"
                                                size="small"></el-date-picker>
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
    import {getUnitsEnum, getCostModeEnum} from '../../../../enum/cs/CsEnum'

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
                unitsEnum: getUnitsEnum(),
                costModeEnum: getCostModeEnum(),
                updateRules: {}
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
                    .post('/eops/cs/catalog/update', input)
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
