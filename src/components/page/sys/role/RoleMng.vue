<template>
    <div class="roleMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                角色编码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.roleCode" size="small" maxlength="6"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                角色名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.name" size="small" maxlength="60"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                状态:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.state" size="small" clearable>
                                    <el-option label="A-正常" value="A"></el-option>
                                    <el-option label="C-关闭" value="C"></el-option>
                                </el-select>
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
                            <el-table-column prop="roleCode" label="角色编码" width="150"></el-table-column>
                            <el-table-column prop="name" label="角色名称" width="300"></el-table-column>
                            <el-table-column prop="state_G" label="状态" width="100"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加角色" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 角色信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="角色编码:" prop="roleCode">
                                    <el-input v-model="addInfo.roleCode" size="small" maxlength="6"></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="addInfo.state" size="small" clearable>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="角色名称:" prop="name">
                                    <el-input v-model="addInfo.name" size="small" maxlength="60"></el-input>
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
        <el-dialog title="修改角色" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 角色信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="角色编码:" prop="roleCode">
                                    <el-input v-model="updateInfo.roleCode" size="small" maxlength="6" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="updateInfo.state" size="small" clearable>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="角色名称:" prop="name">
                                    <el-input v-model="updateInfo.name" size="small" maxlength="60"></el-input>
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
        <el-dialog title="角色详情" :visible.sync="viewFormVisible" :close-on-click-modal="true">
            <el-form :model="viewInfo" ref="viewForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-view"></i> 角色信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="角色编码:">
                                    <el-input v-model="viewInfo.roleDtl.roleCode" size="small" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="状态:">
                                    <el-select v-model="viewInfo.roleDtl.state" size="small" disabled>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="角色名称:">
                                    <el-input v-model="viewInfo.roleDtl.name" size="small" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <span>
                        <i class="el-icon-tickets"></i> 所属角色组列表:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-table :data="viewInfo.groups" border style="width: 100%" ref="view-groupTable" height="200">
                            <el-table-column prop="groupCode" label="角色组编码" width="120"></el-table-column>
                            <el-table-column prop="name" label="角色组名称" width="250"></el-table-column>
                            <el-table-column prop="state_G" label="状态" width="100"></el-table-column>
                        </el-table>
                    </div>
                    <span>
                        <i class="el-icon-tickets"></i> 角色用户列表:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-table :data="viewInfo.users" border style="width: 100%" ref="view-userTable" height="200">
                            <el-table-column prop="userCid" label="用户号" width="120"></el-table-column>
                            <el-table-column prop="loginName" label="登录名" width="250"></el-table-column>
                            <el-table-column prop="type_G" label="用户类型" width="120"></el-table-column>
                            <el-table-column prop="phone" label="手机" width="150"></el-table-column>
                            <el-table-column prop="staffCid" label="员工编号" width="100"></el-table-column>
                            <el-table-column prop="state_G" label="状态" width="100"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="viewFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="加入角色组" :visible.sync="joinTransferVisible" :close-on-click-modal="false">
            <el-card>
                <el-transfer v-model="roleGroup" :data="allGroup" :titles="['未加入的角色组','已加入的角色组']" :props="joinTransferProps">

                </el-transfer>
            </el-card>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="joinSubmit">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="joinTransferVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="角色授权" :visible.sync="authTransferVisible" :close-on-click-modal="false">
            <el-card>
                <el-transfer v-model="roleAuth" :data="allAuth" :titles="['未授权','已授权']" :props="authTransferProps">

                </el-transfer>
            </el-card>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="authSubmit">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="authTransferVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')" :disabled="isDisabled">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除</el-button>
                <el-button type="primary" size="small" icon="el-icon-view" @click="view" :disabled="isDisabled">详情</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-role" @click="joinGroup" :disabled="isDisabled">加入角色组</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-management" @click="aut" :disabled="isDisabled">角色授权</el-button>
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
                roleCode: [
                    { required: true, message: '请输入角色编码', trigger: 'blur' },
                    { max: 6, message: '最大长度6', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                roleCode: [
                    { required: true, message: '请输入角色编码', trigger: 'blur' },
                    { max: 6, message: '最大长度6', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            updateFormVisible: false,
            isDisabled: true,
            labelPosition: 'left',
            viewInfo: {
                roleDtl: {},
                groups: [],
                users: []
            },
            viewFormVisible: false,
            roleGroup: [],
            allGroup: [],
            joinTransferProps: {
                key: 'groupCode',
                label: 'name'
            },
            joinTransferVisible: false,
            roleAuth: [],
            allAuth: [],
            authTransferProps: {
                key: 'autCode',
                label: 'name'
            },
            authTransferVisible: false

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
                SYROLEINFY: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/sys/role/queryRoleListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYROLEINFY
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
                SYROLEINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/role/addRole', input)
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
                SYROLEINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/role/updateRole', input)
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
            self.$confirm('是否删除角色[' + self.selectedInfo.name + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    SYROLECODEX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/role/deleteRole', input)
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
        view () {
            if (this.selectedInfo == null) {
                this.$alert('请选择一条记录', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
                this.isDisabled = true
                return
            }
            this.queryDtl(this.selectedInfo)
            this.viewFormVisible = true

        },
        queryDtl (val) {
            let self = this
            let input = {
                SYROLECODEX: [val]
            }
            self.$http
                .post('/sys/role/queryRoleDetail', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.viewInfo = {
                        roleDtl: pkgOut.SYROLEINFY[0],
                        groups: pkgOut.SYROLEGROUPINFY,
                        users: pkgOut.SYUSRQRYZ
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
        joinGroup () {
            if (this.selectedInfo == null) {
                this.$alert('请选择一条记录', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
                this.isDisabled = true
                return
            }
            this.joinTransferVisible = true
            this.queryAllGroup()
            this.queryGroupOfRole()

        },
        queryAllGroup () {
            const self = this
            let input = { SYROLEGROUPINFY: [{}] }
            self.$http
                .post('/sys/roleGroup/queryRoleGroup', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.allGroup = pkgOut.SYROLEGROUPINFY
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })

        },
        queryGroupOfRole () {
            const self = this
            let input = {
                SYROLECODEX: [self.selectedInfo]
            }
            self.roleGroup = []
            self.roleGroupInit = []
            self.$http
                .post('/sys/role/queryGroupOfRole', input)
                .then((res) => {
                    let pkgOut = res.data
                    for (let index = 0; index < pkgOut.SYROLEGROUPINFY.length; index++) {
                        const element = pkgOut.SYROLEGROUPINFY[index];
                        self.roleGroup.push(element.groupCode)
                        self.roleGroupInit.push(element.groupCode)
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
        joinSubmit () {
            const self = this
            let secIn = []
            for (let index = 0; index < self.roleGroup.length; index++) {
                const element = self.roleGroup[index];
                let propIn = {
                    roleCode: self.selectedInfo.roleCode,
                    groupCode: element
                }
                secIn.push(propIn)
            }
            let input = {
                SYROLECODEX: [self.selectedInfo],
                SYJOINGROUPX: secIn
            }
            self.$http
                .post('/sys/role/joinGroup', input)
                .then((res) => {
                    this.joinTransferVisible = false
                    self.$message({
                        message: '加入角色组成功',
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
        aut () {
            if (this.selectedInfo == null) {
                this.$alert('请选择一条记录', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
                this.isDisabled = true
                return
            }
            this.authTransferVisible = true
            this.queryAllAuth()
            this.queryRoleAuth()

        },
        queryAllAuth () {
            const self = this
            let input = { SYAUTINFY: [] }
            self.$http
                .post('/sys/aut/queryAut', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.allAuth = pkgOut.SYAUTINFY
                })
                .catch((err) => {
                    console.log(err)
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                })
        },
        queryRoleAuth () {
            const self = this
            let input = {
                SYROLECODEX: [self.selectedInfo]
            }
            self.roleAuth = []
            self.$http
                .post('/sys/role/queryRoleAut', input)
                .then((res) => {
                    let pkgOut = res.data
                    for (let index = 0; index < pkgOut.SYAUTINFY.length; index++) {
                        const element = pkgOut.SYAUTINFY[index];
                        self.roleAuth.push(element.autCode)
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
        authSubmit () {
            const self = this
            let secIn = []
            for (let index = 0; index < self.roleAuth.length; index++) {
                const element = self.roleAuth[index];
                let propIn = {
                    roleCode: self.selectedInfo.roleCode,
                    autCode: element
                }
                secIn.push(propIn)
            }
            let input = {
                SYROLECODEX: [self.selectedInfo],
                SYAUTROLEX: secIn
            }
            self.$http
                .post('/sys/role/resetAut', input)
                .then((res) => {
                    this.authTransferVisible = false
                    self.$message({
                        message: '授权成功',
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
