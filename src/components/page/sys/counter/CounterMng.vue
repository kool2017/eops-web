<template>
    <div class="counterMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                计数器编码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.counterCode" size="small" maxlength="8"> </el-input>
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
                            <el-table-column prop="counterCode" label="计数器编码" width="150"></el-table-column>
                            <el-table-column prop="name" label="计数器名称" width="250"></el-table-column>
                            <el-table-column prop="curValue" label="当前值" width="120"></el-table-column>
                            <el-table-column prop="min" label="起始值" width="120"></el-table-column>
                            <el-table-column prop="max" label="最大值" width="120"></el-table-column>
                            <el-table-column prop="step" label="步长" width="120"></el-table-column>
                            <el-table-column prop="over_G" label="溢出控制" width="150"></el-table-column>
                            <el-table-column prop="resetPeriod_G" label="重置周期" width="150"></el-table-column>
                            <el-table-column prop="resetTime_T" label="下一重置时间" width="160"></el-table-column>
                            <el-table-column prop="state_G" label="状态" width="150"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加计数器" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 计数器信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="计数器编码:" prop="counterCode">
                                    <el-input v-model="addInfo.counterCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="当前值:" prop="curValue">
                                    <el-input v-model="addInfo.curValue" size="small" maxlength="10"></el-input>
                                </el-form-item>
                                <el-form-item label="最大值:" prop="max">
                                    <el-input v-model="addInfo.max" size="small" maxlength="10"></el-input>
                                </el-form-item>
                                <el-form-item label="溢出控制:" prop="over">
                                    <el-select v-model="addInfo.over" size="small" clearable>
                                        <el-option label="E-溢出报错" value="E"></el-option>
                                        <el-option label="R-溢出重置" value="R"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="下一重置时间:" prop="resetTime">
                                    <el-date-picker v-model="addInfo.resetTime" size="small" type="datetime" value-format="timestamp">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="计数器名称:" prop="name">
                                    <el-input v-model="addInfo.name" size="small" maxlength="15"></el-input>
                                </el-form-item>
                                <el-form-item label="起始值:" prop="min">
                                    <el-input v-model="addInfo.min" size="small" maxlength="10"></el-input>
                                </el-form-item>
                                <el-form-item label="步长:" prop="step">
                                    <el-input v-model="addInfo.step" size="small" maxlength="10"></el-input>
                                </el-form-item>
                                <el-form-item label="重置周期:" prop="resetPeriod">
                                    <el-select v-model="addInfo.resetPeriod" size="small" clearable>
                                        <el-option label="D-日" value="D"></el-option>
                                        <el-option label="M-月" value="M"></el-option>
                                        <el-option label="N-不重置" value="N"></el-option>
                                        <el-option label="W-周" value="W"></el-option>
                                        <el-option label="Y-年" value="Y"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="addInfo.state" size="small" clearable>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
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
        <el-dialog title="修改计数器" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 计数器信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="计数器编码:" prop="counterCode">
                                    <el-input v-model="updateInfo.counterCode" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="当前值:" prop="curValue">
                                    <el-input v-model="updateInfo.curValue" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="最大值:" prop="max">
                                    <el-input v-model="updateInfo.max" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="溢出控制:" prop="over">
                                    <el-select v-model="updateInfo.over" size="small" clearable>
                                        <el-option label="E-溢出报错" value="E"></el-option>
                                        <el-option label="R-溢出重置" value="R"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="下一重置时间:" prop="resetTime">
                                    <el-date-picker v-model="updateInfo.resetTime" size="small" type="datetime" value-format="timestamp">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="计数器名称:" prop="name">
                                    <el-input v-model="updateInfo.name" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="起始值:" prop="min">
                                    <el-input v-model="updateInfo.min" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="步长:" prop="step">
                                    <el-input v-model="updateInfo.step" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="重置周期:" prop="resetPeriod">
                                    <el-select v-model="updateInfo.resetPeriod" size="small" clearable>
                                        <el-option label="D-日" value="D"></el-option>
                                        <el-option label="M-月" value="M"></el-option>
                                        <el-option label="N-不重置" value="N"></el-option>
                                        <el-option label="W-周" value="W"></el-option>
                                        <el-option label="Y-年" value="Y"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="updateInfo.state" size="small" clearable>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
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
                counterCode: [
                    { required: true, message: '请输入计数器编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入计数器名称', trigger: 'blur' },
                    { max: 15, message: '最大长度15', trigger: 'blur' }
                ],
                curValue: [
                    { required: true, message: '请输入当前值', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                min: [
                    { required: true, message: '请输入起始值', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                max: [
                    { required: true, message: '请输入最大值', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                step: [
                    { required: true, message: '请输入步长', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                over: [
                    { required: true, message: '请输入溢出控制', trigger: 'change' },
                    { max: 1, message: '最大长度1', trigger: 'change' }
                ],
                resetPeriod: [
                    { required: true, message: '请输入重置周期', trigger: 'change' },
                    { max: 1, message: '最大长度1', trigger: 'change' }
                ],
                resetTime: [
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' },
                    { max: 1, message: '最大长度1', trigger: 'change' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                counterCode: [
                    { required: true, message: '请输入计数器编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入计数器名称', trigger: 'blur' },
                    { max: 15, message: '最大长度15', trigger: 'blur' }
                ],
                curValue: [
                    { required: true, message: '请输入当前值', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                min: [
                    { required: true, message: '请输入起始值', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                max: [
                    { required: true, message: '请输入最大值', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                step: [
                    { required: true, message: '请输入步长', trigger: 'blur' },
                    { max: 10, message: '最大长度10', trigger: 'blur' }
                ],
                over: [
                    { required: true, message: '请输入溢出控制', trigger: 'change' },
                    { max: 1, message: '最大长度1', trigger: 'change' }
                ],
                resetPeriod: [
                    { required: true, message: '请输入重置周期', trigger: 'change' },
                    { max: 1, message: '最大长度1', trigger: 'change' }
                ],
                resetTime: [
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' },
                    { max: 1, message: '最大长度1', trigger: 'change' }
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
                SYCNTQRYX: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/sys/counter/queryCounterListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYCNTINFY
                    for (let index = 0; index < pkgOut.SYCNTINFY.length; index++) {
                        const element = pkgOut.SYCNTINFY[index];
                        if (element.resetTime != null) {
                            element.resetTime_T = self.$moment(Number(element.resetTime)).format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                    self.page = pkgOut.SYPAGEINFOY[0]
                })
                .catch((err) => {
                    console.log(err)
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
            if (self.addInfo.resetTime === null) {
                self.addInfo.resetTime = ''
            }
            let input = {
                SYCNTINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/counter/addCounter', input)
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
                    console.log(err)
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
            if (self.updateInfo.resetTime === null) {
                self.updateInfo.resetTime = ''
            }
            let input = {
                SYCNTINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/counter/updateCounter', input)
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
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        del () {
            let self = this
            self.$confirm('是否删除请求[' + self.selectedInfo.name + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    SYCNTCODEX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/counter/deleteCounter', input)
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
                        console.log(err)
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
