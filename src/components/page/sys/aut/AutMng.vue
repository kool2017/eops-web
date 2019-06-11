<template>
    <div class="autMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                权限编码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.autCode" size="small" maxlength="8"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                权限类型:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.type" size="small" clearable>
                                    <el-option label="A-管理员权限" value="A"></el-option>
                                    <el-option label="B-普通权限" value="B"></el-option>
                                    <el-option label="C-游客权限" value="C"></el-option>
                                    <el-option label="S-超级管理员权限" value="S"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                权限名称:
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
                                状态:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.state" size="small" clearable>
                                    <el-option label="A-正常" value="A"></el-option>
                                    <el-option label="C-关闭" value="C"></el-option>
                                </el-select>
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
                            <el-table-column prop="autCode" label="权限编码" width="150"></el-table-column>
                            <el-table-column prop="type_G" label="权限类型" width="150"></el-table-column>
                            <el-table-column prop="name" label="权限名称" width="300"></el-table-column>
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
        <el-dialog title="增加权限" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 权限信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="权限编码:" prop="autCode">
                                    <el-input v-model="addInfo.autCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="权限名称:" prop="name">
                                    <el-input v-model="addInfo.name" size="small" maxlength="60"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="权限类型:" prop="type">
                                    <el-select v-model="addInfo.type" size="small" clearable>
                                        <el-option label="A-管理员权限" value="A"></el-option>
                                        <el-option label="B-普通权限" value="B"></el-option>
                                        <el-option label="C-游客权限" value="C"></el-option>
                                        <el-option label="S-超级管理员权限" value="S"></el-option>
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
        <el-dialog title="修改权限" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 权限信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="权限编码:" prop="autCode">
                                    <el-input v-model="updateInfo.autCode" size="small" maxlength="8" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="权限名称:" prop="name">
                                    <el-input v-model="updateInfo.name" size="small" maxlength="60"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="权限类型:" prop="type">
                                    <el-select v-model="updateInfo.type" size="small" clearable>
                                        <el-option label="A-管理员权限" value="A"></el-option>
                                        <el-option label="B-普通权限" value="B"></el-option>
                                        <el-option label="C-游客权限" value="C"></el-option>
                                        <el-option label="S-超级管理员权限" value="S"></el-option>
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
        <el-dialog title="绑定菜单" :visible.sync="menuTransferVisible" :close-on-click-modal="false">
            <el-card>
                <el-transfer v-model="autMenu" :data="allMenu" :titles="['未绑定菜单','已绑定菜单']" :props="menuTransferProps">

                </el-transfer>
            </el-card>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="bindMenuSubmit">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="menuTransferVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="绑定请求" :visible.sync="reqTransferVisible" :close-on-click-modal="false">
            <el-card>
                <el-transfer v-model="autReq" :data="allReq" :titles="['未绑定请求','已绑定请求']" :props="reqTransferProps">

                </el-transfer>
            </el-card>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="bindReqSubmit">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="reqTransferVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')" :disabled="isDisabled">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除</el-button>
                <el-button type="primary" size="small" icon="el-icon-menu" @click="bindMenu" :disabled="isDisabled">绑定菜单</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-req" @click="bindReq" :disabled="isDisabled">绑定请求</el-button>
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
                autCode: [
                    { required: true, message: '请输入权限编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请输入权限类型', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                autCode: [
                    { required: true, message: '请输入权限编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请输入权限类型', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            updateFormVisible: false,
            isDisabled: true,
            labelPosition: 'left',
            autMenu: [],
            allMenu: [],
            menuTransferVisible: false,
            menuTransferProps: {
                key: 'menuCode',
                label: 'title'
            },
            autReq: [],
            allReq: [],
            reqTransferVisible: false,
            reqTransferProps: {
                key: 'reqUrl',
                label: 'name'
            },

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
                SYAUTINFY: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/sys/aut/queryAutListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYAUTINFY
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
                SYAUTINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/aut/addAut', input)
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
                SYAUTINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/aut/updateAut', input)
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
            self.$confirm('是否删除权限[' + self.selectedInfo.name + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    SYAUTCODEX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/aut/deleteAut', input)
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
        bindMenu () {
            if (this.selectedInfo == null) {
                this.$alert('请选择一条记录', '提示', {
                    confirmButtonText: '确定',
                        type: 'error'
                })
                this.isDisabled = true
                return
            }
            this.menuTransferVisible = true
            this.queryAllMenu()
            this.queryAutMenu()

        },
        queryAllMenu () {
            const self = this
            let input = {}
            self.$http
                .post('/sys/menu/queryMenu', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.allMenu = pkgOut.SYMENUINFY
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        queryAutMenu () {
            const self = this
            let input = {
                SYAUTCODEX: [self.selectedInfo]
            }
            self.autMenu = []
            self.$http
                .post('/sys/aut/queryAutMenu', input)
                .then((res) => {
                    let pkgOut = res.data
                    for (let index = 0; index < pkgOut.SYMENUINFY.length; index++) {
                        const element = pkgOut.SYMENUINFY[index];
                        self.autMenu.push(element.menuCode)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        bindMenuSubmit () {
            const self = this
            let secIn = []
            for (let index = 0; index < self.autMenu.length; index++) {
                const element = self.autMenu[index];
                let propIn = {
                    autCode: self.selectedInfo.autCode,
                    menuCode: element
                }
                secIn.push(propIn)
            }
            let input = {
                SYAUTCODEX: [self.selectedInfo],
                SYBINDMENUX: secIn
            }
            self.$http
                .post('/sys/aut/bindMenu', input)
                .then((res) => {
                    this.menuTransferVisible = false
                    self.$message({
                        message: '绑定菜单成功',
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
        bindReq () {
            if (this.selectedInfo == null) {
                this.$alert('请选择一条记录', '提示', {
                    confirmButtonText: '确定',
                        type: 'error'
                })
                this.isDisabled = true
                return
            }
            this.reqTransferVisible = true
            this.queryAllReq()
            this.queryAutReq()

        },
        queryAllReq () {
            const self = this
            let input = {}
            self.$http
                .post('/sys/req/queryReq', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.allReq = pkgOut.SYREQINFY
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        queryAutReq () {
            const self = this
            let input = {
                SYAUTCODEX: [self.selectedInfo]
            }
            self.autReq = []
            self.$http
                .post('/sys/aut/queryAutReq', input)
                .then((res) => {
                    let pkgOut = res.data
                    for (let index = 0; index < pkgOut.SYREQINFY.length; index++) {
                        const element = pkgOut.SYREQINFY[index];
                        self.autReq.push(element.reqUrl)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        bindReqSubmit () {
            const self = this
            let secIn = []
            for (let index = 0; index < self.autReq.length; index++) {
                const element = self.autReq[index];
                let propIn = {
                    autCode: self.selectedInfo.autCode,
                    reqUrl: element
                }
                secIn.push(propIn)
            }
            let input = {
                SYAUTCODEX: [self.selectedInfo],
                SYBINDREQX: secIn
            }
            self.$http
                .post('/sys/aut/bindReq', input)
                .then((res) => {
                    this.reqTransferVisible = false
                    self.$message({
                        message: '绑定请求成功',
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
