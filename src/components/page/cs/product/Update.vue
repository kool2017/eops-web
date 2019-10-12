<template>
    <el-dialog title="修改产品" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 产品信息:</span>
                <hr class="split" />
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="产品码:" prop="productCode">
                                <el-input v-model="updateInfo.productCode" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="产品名称:" prop="productName">
                                <el-input v-model="updateInfo.productName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="产品类型:" prop="productType">
                                <el-select v-model="updateInfo.productType" size="small" clearable>
                                    <el-option label="1-dataflow元数据" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据唯一标识:" prop="dataKey">
                                <el-input v-model="updateInfo.dataKey" size="small" maxlength="100"></el-input>
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
                    .post('/eops/cs/product/update', input)
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
