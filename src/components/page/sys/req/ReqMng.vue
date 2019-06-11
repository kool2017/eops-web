<template>
    <div class="reqMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                请求URL:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.reqUrl" size="small" maxlength="60"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                请求名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.name" size="small" maxlength="60"> </el-input>
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
                            <el-table-column prop="reqUrl" label="请求URL" width="350"></el-table-column>
                            <el-table-column prop="name" label="请求名称" width="250"></el-table-column>
                            <el-table-column prop="dbpoolType_G" label="数据库连接池类型" width="150"></el-table-column>
                            <el-table-column prop="dbpoolCode" label="数据库连接池代码" width="150"></el-table-column>
                            <el-table-column prop="msgType_G" label="报文格式" width="100"></el-table-column>
                            <el-table-column prop="signFlag_G" label="验签标志" width="100"></el-table-column>
                            <el-table-column prop="encrypt_G" label="是否通信加密" width="120"></el-table-column>
                            <el-table-column prop="channel_G" label="渠道" width="80"></el-table-column>
                            <el-table-column prop="state_G" label="状态" width="80"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加请求" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="140px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 请求信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="请求URL:" prop="reqUrl">
                                    <el-input v-model="addInfo.reqUrl" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="数据库连接池代码:" prop="dbpoolCode">
                                    <el-input v-model="addInfo.dbpoolCode" size="small" maxlength="20"></el-input>
                                </el-form-item>
                                <el-form-item label="验签标志:" prop="signFlag">
                                    <el-select v-model="addInfo.signFlag" size="small" clearable>
                                        <el-option label="N-不验签" value="N"></el-option>
                                        <el-option label="Y-验签" value="Y"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="渠道:" prop="channel">
                                    <el-select v-model="addInfo.channel" size="small" clearable>
                                        <el-option label="0-web" value="0"></el-option>
                                        <el-option label="1-桌面客户端" value="1"></el-option>
                                        <el-option label="2-微信公众号" value="2"></el-option>
                                        <el-option label="3-APP" value="3"></el-option>
                                        <el-option label="9-外部" value="9"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="请求名称:" prop="name">
                                    <el-input v-model="addInfo.name" size="small" maxlength="60"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="数据库连接池类型:" prop="dbpoolType">
                                    <el-select v-model="addInfo.dbpoolType" size="small" clearable>
                                        <el-option label="DF-默认连接池" value="DF"></el-option>
                                        <el-option label="RC-读实时" value="RC"></el-option>
                                        <el-option label="RH-读历史" value="RH"></el-option>
                                        <el-option label="WC-写实时" value="WC"></el-option>
                                        <el-option label="WH-写历史" value="WH"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="报文格式:" prop="msgType">
                                    <el-select v-model="addInfo.msgType" size="small" clearable>
                                        <el-option label="J-JSON" value="J"></el-option>
                                        <el-option label="X-XML" value="X"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否通信加密:" prop="encrypt">
                                    <el-select v-model="addInfo.encrypt" size="small" clearable>
                                        <el-option label="N-否" value="N"></el-option>
                                        <el-option label="Y-是" value="Y"></el-option>
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
        <el-dialog title="修改请求" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="140px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 请求信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="请求URL:" prop="reqUrl">
                                    <el-input v-model="updateInfo.reqUrl" size="small" maxlength="60" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="数据库连接池代码:" prop="dbpoolCode">
                                    <el-input v-model="updateInfo.dbpoolCode" size="small" maxlength="20"></el-input>
                                </el-form-item>
                                <el-form-item label="验签标志:" prop="signFlag">
                                    <el-select v-model="updateInfo.signFlag" size="small" clearable>
                                        <el-option label="N-不验签" value="N"></el-option>
                                        <el-option label="Y-验签" value="Y"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="渠道:" prop="channel">
                                    <el-select v-model="updateInfo.channel" size="small" clearable>
                                        <el-option label="0-web" value="0"></el-option>
                                        <el-option label="1-桌面客户端" value="1"></el-option>
                                        <el-option label="2-微信公众号" value="2"></el-option>
                                        <el-option label="3-APP" value="3"></el-option>
                                        <el-option label="9-外部" value="9"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="请求名称:" prop="name">
                                    <el-input v-model="updateInfo.name" size="small" maxlength="60"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="数据库连接池类型:" prop="dbpoolType">
                                    <el-select v-model="updateInfo.dbpoolType" size="small" clearable>
                                        <el-option label="DF-默认连接池" value="DF"></el-option>
                                        <el-option label="RC-读实时" value="RC"></el-option>
                                        <el-option label="RH-读历史" value="RH"></el-option>
                                        <el-option label="WC-写实时" value="WC"></el-option>
                                        <el-option label="WH-写历史" value="WH"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="报文格式:" prop="msgType">
                                    <el-select v-model="updateInfo.msgType" size="small" clearable>
                                        <el-option label="J-JSON" value="J"></el-option>
                                        <el-option label="X-XML" value="X"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否通信加密:" prop="encrypt">
                                    <el-select v-model="updateInfo.encrypt" size="small" clearable>
                                        <el-option label="N-否" value="N"></el-option>
                                        <el-option label="Y-是" value="Y"></el-option>
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
                reqUrl: [
                    { required: true, message: '请输入请求URL', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入请求名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                dbpoolType: [
                    { required: true, message: '请输入数据库连接池类型', trigger: 'change' }
                ],
                dbpoolCode: [
                    { max: 20, message: '最大长度20', trigger: 'blur' }
                ],
                msgType: [
                    { required: true, message: '请输入报文格式', trigger: 'change' }
                ],
                signFlag: [
                    { required: true, message: '请输入验签标志', trigger: 'change' }
                ],
                encrypt: [
                    { required: true, message: '请输入是否通信加密', trigger: 'change' }
                ],
                channel: [
                    { required: true, message: '请输入渠道', trigger: 'change' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                reqUrl: [
                    { required: true, message: '请输入请求URL', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入请求名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                dbpoolType: [
                    { required: true, message: '请输入数据库连接池类型', trigger: 'change' }
                ],
                dbpoolCode: [
                    { max: 20, message: '最大长度20', trigger: 'blur' }
                ],
                msgType: [
                    { required: true, message: '请输入报文格式', trigger: 'change' }
                ],
                signFlag: [
                    { required: true, message: '请输入验签标志', trigger: 'change' }
                ],
                encrypt: [
                    { required: true, message: '请输入是否通信加密', trigger: 'change' }
                ],
                channel: [
                    { required: true, message: '请输入渠道', trigger: 'change' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
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
                SYREQINFY: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/sys/req/queryReqListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYREQINFY
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
            let input = {
                SYREQINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/req/addReq', input)
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
            let input = {
                SYREQINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/req/updateReq', input)
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
                    SYREQURLX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/req/deleteReq', input)
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
