<template>
    <div class="roleGroupMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                角色组编码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.groupCode" size="small" maxlength="6"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                角色组名称:
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
                            <el-table-column prop="groupCode" label="角色组编码" width="150"></el-table-column>
                            <el-table-column prop="name" label="角色组名称" width="300"></el-table-column>
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
        <el-dialog title="增加角色组" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 角色组信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="角色组编码:" prop="groupCode">
                                    <el-input v-model="addInfo.groupCode" size="small" maxlength="6"></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="addInfo.state" size="small" clearable style="width:100%">
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="角色组名称:" prop="name">
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
        <el-dialog title="修改角色组" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 角色组信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="角色组编码:" prop="groupCode">
                                    <el-input v-model="updateInfo.groupCode" size="small" maxlength="6" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="updateInfo.state" size="small" clearable>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="角色组名称:" prop="name">
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
        <el-dialog title="角色组详情" :visible.sync="viewFormVisible" :close-on-click-modal="true">
            <el-form :model="viewInfo" ref="viewForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-view"></i> 角色组信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="角色组编码:">
                                    <el-input v-model="viewInfo.groupDtl.groupCode" size="small" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="状态:">
                                    <el-select v-model="viewInfo.groupDtl.state" size="small" disabled>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="角色组名称:">
                                    <el-input v-model="viewInfo.groupDtl.name" size="small" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <span>
                        <i class="el-icon-tickets"></i> 角色列表:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-table :data="viewInfo.roles" border style="width: 100%" height="200">
                            <el-table-column prop="roleCode" label="角色编码" width="120"></el-table-column>
                            <el-table-column prop="name" label="角色名称" width="250"></el-table-column>
                            <el-table-column prop="state_G" label="状态" width="100"></el-table-column>
                        </el-table>
                    </div>
                    <span>
                        <i class="el-icon-tickets"></i> 用户列表:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-table :data="viewInfo.users" border style="width: 100%" height="200">
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
        <el-dialog title="角色组授权" :visible.sync="authTransferVisible" :close-on-click-modal="false">
            <el-card>
                <el-transfer v-model="groupAuth" :data="allAuth" :titles="['未授权','已授权']" :props="authTransferProps">

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
                <el-button type="primary" size="small" icon="el-icon-k-management" @click="aut" :disabled="isDisabled">角色组授权</el-button>
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
                groupCode: [
                    { required: true, message: '请输入角色组编码', trigger: 'blur' },
                    { max: 6, message: '最大长度6', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入角色组名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                groupCode: [
                    { required: true, message: '请输入角色组编码', trigger: 'blur' },
                    { max: 6, message: '最大长度6', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入角色组名称', trigger: 'blur' },
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
                groupDtl: {},
                roles: [],
                users: []
            },
            viewFormVisible: false,
            groupAuth: [],
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
                SYROLEGROUPINFY: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/sys/roleGroup/queryRoleGroupListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.SYROLEGROUPINFY
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
                SYROLEGROUPINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/roleGroup/addRoleGroup', input)
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
                SYROLEGROUPINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/roleGroup/updateRoleGroup', input)
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
            self.$confirm('是否删除角色组[' + self.selectedInfo.name + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    SYGROUPCODEX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/roleGroup/deleteRoleGroup', input)
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
                SYGROUPCODEX: [val]
            }
            self.$http
                .post('/sys/roleGroup/queryRoleGroupDetail', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.viewInfo = {
                        groupDtl: pkgOut.SYROLEGROUPINFY[0],
                        roles: pkgOut.SYROLEINFY,
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
            this.queryGroupAuth()

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
        queryGroupAuth () {
            const self = this
            let input = {
                SYGROUPCODEX: [self.selectedInfo]
            }
            self.groupAuth = []
            self.$http
                .post('/sys/roleGroup/queryGroupAut', input)
                .then((res) => {
                    let pkgOut = res.data
                    for (let index = 0; index < pkgOut.SYAUTINFY.length; index++) {
                        const element = pkgOut.SYAUTINFY[index];
                        self.groupAuth.push(element.autCode)
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
            for (let index = 0; index < self.groupAuth.length; index++) {
                const element = self.groupAuth[index];
                let propIn = {
                    groupCode: self.selectedInfo.groupCode,
                    autCode: element
                }
                secIn.push(propIn)
            }
            let input = {
                SYGROUPCODEX: [self.selectedInfo],
                SYAUTGROUPX: secIn
            }
            self.$http
                .post('/sys/roleGroup/resetAut', input)
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
