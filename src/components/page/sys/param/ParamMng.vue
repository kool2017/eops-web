<template>
    <div class="paramMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                参数编码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.paramCode" size="small" maxlength="8"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                参数值:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.value" size="small" maxlength="512"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                参数名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.name" size="small" maxlength="60"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="2">
                                根参数:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.rootCode" size="small" maxlength="8"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                父参数:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.fatCode" size="small" maxlength="8"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                深度:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.deep" size="small"> </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="2">
                                序号:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.seq" size="small"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                备注:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.cmt" size="small" maxlength="512"> </el-input>
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
                            <el-table-column prop="paramCode" label="参数编码" width="120"></el-table-column>
                            <el-table-column prop="value" label="参数值" width="150"></el-table-column>
                            <el-table-column prop="name" label="参数名称" width="300"></el-table-column>
                            <el-table-column prop="rootCode" label="根参数" width="120"></el-table-column>
                            <el-table-column prop="fatCode" label="父参数" width="120"></el-table-column>
                            <el-table-column prop="deep" label="深度" width="80"></el-table-column>
                            <el-table-column prop="seq" label="序号" width="80"></el-table-column>
                            <el-table-column prop="cmt" label="备注" width="300"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加参数" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 参数信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="参数编码:" prop="paramCode">
                                    <el-input v-model="addInfo.paramCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="参数名称:" prop="name">
                                    <el-input v-model="addInfo.name" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="父参数:" prop="fatCode">
                                    <el-input v-model="addInfo.fatCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="序号:" prop="seq">
                                    <el-input v-model.number="addInfo.seq" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="参数值:" prop="value">
                                    <el-input v-model="addInfo.value" size="small" maxlength="512"></el-input>
                                </el-form-item>
                                <el-form-item label="根参数:" prop="rootCode">
                                    <el-input v-model="addInfo.rootCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="深度:" prop="deep">
                                    <el-input v-model.number="addInfo.deep" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="备注:" prop="cmt">
                                    <el-input v-model="addInfo.cmt" type="textarea" autosize maxlength="512"></el-input>
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
        <el-dialog title="修改参数" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 参数信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="参数编码:" prop="paramCode">
                                    <el-input v-model="updateInfo.paramCode" size="small" maxlength="8" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="参数名称:" prop="name">
                                    <el-input v-model="updateInfo.name" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="父参数:" prop="fatCode">
                                    <el-input v-model="updateInfo.fatCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="序号:" prop="seq">
                                    <el-input v-model.number="updateInfo.seq" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="参数值:" prop="value">
                                    <el-input v-model="updateInfo.value" size="small" maxlength="512"></el-input>
                                </el-form-item>
                                <el-form-item label="根参数:" prop="rootCode">
                                    <el-input v-model="updateInfo.rootCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="深度:" prop="deep">
                                    <el-input v-model.number="updateInfo.deep" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="备注:" prop="cmt">
                                    <el-input v-model="updateInfo.cmt" type="textarea" autosize maxlength="512"></el-input>
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
                paramCode: [
                    { required: true, message: '请输入参数编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                value: [
                    { max: 512, message: '最大长度512', trigger: 'blur' }
                ],
                name: [
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                rootCode: [
                    { required: true, message: '请输入根参数', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                fatCode: [
                    { max: 8, message: '最大长度8', trigger: 'blur' }
                ],
                deep: [
                    { required: true, message: '请输入深度', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                seq: [
                    { required: true, message: '请输入序号', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                cmt: [
                    { max: 512, message: '最大长度512', trigger: 'blur' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                paramCode: [
                    { required: true, message: '请输入参数编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                value: [
                    { max: 512, message: '最大长度512', trigger: 'blur' }
                ],
                name: [
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                rootCode: [
                    { required: true, message: '请输入根参数', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                fatCode: [
                    { max: 8, message: '最大长度8', trigger: 'blur' }
                ],
                deep: [
                    { required: true, message: '请输入深度', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                seq: [
                    { required: true, message: '请输入序号', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                cmt: [
                    { max: 512, message: '最大长度512', trigger: 'blur' }
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
                SYPAMINFY: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/sys/param/queryParamListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYPAMINFY
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
                this.selectedInfo.deep = Number(val.deep)
                this.selectedInfo.seq = Number(val.seq)
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
                SYPAMINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/param/addParam', input)
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
                SYPAMINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/param/updateParam', input)
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
            self.$confirm('是否删除参数[' + self.selectedInfo.name + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    SYPAMCODEX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/param/deleteParam', input)
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
