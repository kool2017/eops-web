<template>
    <el-dialog title="增加产品" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 产品信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="产品码:" prop="productCode">
                                <el-input v-model="addInfo.productCode" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="产品名称:" prop="productName">
                                <el-input v-model="addInfo.productName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="产品类型:" prop="productType">
                                <el-select v-model="addInfo.productType" size="small" clearable>
                                    <el-option v-for="item in productTypeEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据唯一标识:" prop="dataKey">
                                <el-input v-model="addInfo.dataKey" size="small" maxlength="100"></el-input>
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
    import {getProductTypeEnum} from '../../../../enum/CsEnum'

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
                productTypeEnum: getProductTypeEnum(),
                addInfo: {},
                addRules: {}
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
                    .post('/eops/cs/product/add', input)
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
