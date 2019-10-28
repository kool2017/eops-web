<template>
    <el-dialog title="增加费用项" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 费用项信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <el-form-item label="费用项码:" prop="catalogCode">
                                <el-input v-model="addInfo.catalogCode" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="名称:" prop="catalogName">
                                <el-input v-model="addInfo.catalogName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="计量单位:" prop="units">
                                <el-select v-model="addInfo.units" size="small" clearable>
                                    <el-option v-for="item in unitsEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="单价:" prop="price">
                                <el-input v-model="addInfo.price" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="产品码:" prop="productCode">
                                <el-autocomplete v-model="addInfo.productCode" size="small"
                                                 :fetch-suggestions="getAllProductCode"></el-autocomplete>
                            </el-form-item>
                            <el-form-item label="计费模式:" prop="costMode">
                                <el-select v-model="addInfo.costMode" size="small" clearable>
                                    <el-option v-for="item in costModeEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="生效时间:" prop="enableTime">
                                <el-date-picker v-model="addInfo.enableTime" type="datetime" placeholder="选择生效时间"
                                                size="small"></el-date-picker>
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
    import {getUnitsEnum, getCostModeEnum} from '../../../../enum/cs/CsEnum'

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
                unitsEnum: getUnitsEnum(),
                costModeEnum: getCostModeEnum(),
                addInfo: {},
                addRules: {},
                allProduct: []
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
                    .post('/eops/cs/catalog/add', input)
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
            getAllProductCode(queryString, cb) {
                let self = this
                let input = {}
                let results = []
                self.$http
                    .post('/eops/cs/product/getAll', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.allProduct = pkgOut.data
                        console.log(JSON.stringify(self.allProduct))
                        for (let index = 0; index < self.allProduct.length; index++) {
                            let item = {
                                value: self.allProduct[index].productCode
                            }
                            results.push(item)
                        }

                        results = queryString ? results.filter(self.createFilter(queryString)) : results;
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
                clearTimeout(self.timeout);
                self.timeout = setTimeout(() => {
                    cb(results);
                }, 500 * Math.random());
            },
            createFilter(queryString) {
                return (results) => {
                    return (results.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
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
