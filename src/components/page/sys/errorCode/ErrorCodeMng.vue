<template>
    <div class="errorCodeMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                错误码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.errorCode" size="small" maxlength="8"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                错误信息-中文:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.chnMsg" size="small" maxlength="100"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                错误信息-英文:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.engMsg" size="small" maxlength="100"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="list-card">
                    <span>
                        <i class="el-icon-tickets"></i> 列表: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-table :data="retList" border style="width: 100%" ref="retTable" highlight-current-row @current-change="selectOne" height="386">
                            <el-table-column prop="errorCode" label="错误码" width="150"></el-table-column>
                            <el-table-column prop="chnMsg" label="错误信息-中文" width="500"></el-table-column>
                            <el-table-column prop="engMsg" label="错误信息-英文" width="150"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加错误码" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 错误码信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="20">
                                <el-form-item label="错误码:" prop="errorCode">
                                    <el-input v-model="addInfo.errorCode" size="small" maxlength="8" style="width:200px"></el-input>
                                </el-form-item>
                                <el-form-item label="错误信息-中文:" prop="chnMsg">
                                    <el-input v-model="addInfo.chnMsg" type="textarea" autosize size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="错误信息-英文:" prop="engMsg">
                                    <el-input v-model="addInfo.engMsg" type="textarea" autosize size="small" maxlength="100"></el-input>
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
        <el-dialog title="修改错误码" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 错误码信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="20">
                                <el-form-item label="错误码:" prop="errorCode">
                                    <el-input v-model="updateInfo.errorCode" size="small" maxlength="8" readonly style="width:200px"></el-input>
                                </el-form-item>
                                <el-form-item label="错误信息-中文:" prop="chnMsg">
                                    <el-input v-model="updateInfo.chnMsg" type="textarea" autosize size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="错误信息-英文:" prop="engMsg">
                                    <el-input v-model="updateInfo.engMsg" type="textarea" autosize size="small" maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="update">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="updateFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')" :disabled="isDisabled">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            condition: {},
            retList: [],
            page: {
                pageSize: 10,
                total: 0,
                pageCount: 0,
                currentPage: 1
            },
            selectedInfo: {},
            addInfo: {},
            addRules: {
                errorCode: [
                    { required: true, message: '请输入错误码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                chnMsg: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
                engMsg: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                errorCode: [
                    { required: true, message: '请输入错误码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                chnMsg: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
                engMsg: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
            },
            updateFormVisible: false,
            isDisabled: true,
            labelPosition: 'left'
        }
    },
    created () {
        this.init()
        this.query()
    },
    methods: {
        queryPage () {
            let self = this
            var input = {
                SYERRORCODEINFY: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/sys/errorCode/queryErrorCodeListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYERRORCODEINFY
                    self.page = pkgOut.SYPAGEINFOY[0]
                })
                .catch((err) => {
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        query () {
            this.page = {
                pageSize: 10,
                total: 0,
                pageCount: 0,
                currentPage: 1
            }
            this.queryPage();
        },
        handleSizeChange (pageSize) {
            let self = this
            self.page.pageSize = pageSize
            self.page.currentPage = 1
            self.queryPage()
        },
        handleCurrentChange (currentPage) {
            let self = this
            self.page.currentPage = currentPage
            self.queryPage()
        },
        selectOne (val) {
            this.selectedInfo = val
            if (val == null) {
                this.isDisabled = true
            } else {
                this.isDisabled = false
            }
        },
        editForm (formType) {
            let self = this
            if (formType === 'ADD') {
                self.addInfo = {}
                self.addFormVisible = true
            } else if (formType === 'UPDATE') {
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.updateInfo = JSON.parse(JSON.stringify(self.selectedInfo))
                self.updateFormVisible = true
            } else {
                console.log('表单类型错误')
                self.$alert('表单类型错误', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
                return
            }
        },
        add () {
            let self = this
            let validRet = false
            self.$refs['addForm'].validate((valid) => {
                validRet = valid
            })
            if (validRet == false) {
                return
            }
            let input = {
                SYERRORCODEINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/errorCode/addErrorCode', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.init()
                    self.query()
                    self.$message({
                        message: '增加信息成功',
                        type: 'success'
                    })
                })
                .catch((err) => {
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        update () {
            let self = this
            let validRet = false
            self.$refs['updateForm'].validate((valid) => {
                validRet = valid
            })
            if (validRet == false) {
                return
            }
            let input = {
                SYERRORCODEINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/errorCode/updateErrorCode', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.init()
                    self.query()
                    self.$message({
                        message: '修改信息成功',
                        type: 'success'
                    })
                })
                .catch((err) => {
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        del () {
            let self = this
            self.$confirm('是否删除错误码[' + self.selectedInfo.errorCode + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    SYERRORCODEX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/errorCode/deleteErrorCode', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.init()
                        self.query()
                        self.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    })
                    .catch((err) => {
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            }).catch((erro) => {
            })
        },
        init () {
            this.addInfo = {}
            this.updateInfo = {}
            this.selectedInfo = {}
            this.isDisabled = true
            this.addFormVisible = false
            this.updateFormVisible = false
        }
    }
}
</script>
<style scoped>
</style>
