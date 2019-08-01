<template>
    <div class="roleMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                角色编码:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.roleCode" size="small" maxlength="6"></el-input>
                            </el-col>
                            <el-col :span="2">
                                角色名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.roleName" size="small" maxlength="60"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询
                                </el-button>
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
                    <hr class="split"/>
                    <div class="card-context">
                        <el-table :data="retList" border style="width: 100%" ref="retTable" highlight-current-row
                                  @row-click="selectOne" height="400">
                            <el-table-column prop="id" label="角色id" width="150"></el-table-column>
                            <el-table-column prop="roleCode" label="角色编码" width="150"></el-table-column>
                            <el-table-column prop="roleName" label="角色名称" width="300"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper"
                                           @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                           :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount"
                                           :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showAdd">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="showUpdate" :disabled="isDisabled">
                    修改
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-management" @click="showAuth" :disabled="isDisabled">
                    角色授权
                </el-button>
            </el-col>
        </el-row>
        <add-role :visible.sync="addFormVisible" @afterClose="refresh"></add-role>
        <update-role :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                     @afterClose="refresh"></update-role>
        <auth-role :visible.sync="authTransferVisible" :role-info="roleInitInfo" :auth-info="authInfo"></auth-role>
    </div>
</template>
<script>
    import addRole from './Add'
    import updateRole from './Update'
    import authRole from './Auth'

    export default {
        components: {addRole, updateRole, authRole},
        data() {
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
                updateInitInfo: {},
                roleInitInfo: {},
                authInfo: {
                    roleAuth: [],
                    allAuth: []
                },
                addFormVisible: false,
                updateFormVisible: false,
                authTransferVisible: false,
                isDisabled: true

            }
        },
        created() {
            this.init()
            this.query()
        },
        methods: {
            init() {
                this.selectedInfo = {}
                this.addFormVisible = false
                this.updateFormVisible = false
                this.authTransferVisible = false
                this.isDisabled = true
            },
            refresh() {
                this.query()
            },
            query() {
                this.page = {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                }
                this.queryPage();
            },
            queryPage() {
                let self = this
                var input = Object.assign({}, self.condition)
                input.currentPage = self.page.currentPage
                input.pageSize = self.page.pageSize
                self.$http
                    .post('/eops/role/get_page', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            handleSizeChange(pageSize) {
                let self = this
                self.page.pageSize = pageSize
                self.page.currentPage = 1
                self.queryPage()
            },
            handleCurrentChange(currentPage) {
                let self = this
                self.page.currentPage = currentPage
                self.queryPage()
            },
            selectOne(row, column, event) {
                this.selectedInfo = row
                if (row == null) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
            },
            showAdd() {
                this.addFormVisible = true
            },
            showUpdate() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.updateInitInfo = Object.assign({}, self.selectedInfo)
                self.updateFormVisible = true
            },
            showAuth(){
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.roleInitInfo = Object.assign({}, self.selectedInfo)
                self.authTransferVisible = true
                self.queryAllAuth()
                self.queryRoleAuth()
            },
            queryAllAuth() {
                const self = this
                let input = {}
                self.$http
                    .post('/eops/aut/get_all_auth', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.authInfo.allAuth = pkgOut.data
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            queryRoleAuth() {
                const self = this
                let input = {
                    roleCode: self.selectedInfo.roleCode
                }
                self.authInfo.roleAuth = []
                self.$http
                    .post('/eops/aut/get_role_aut', input)
                    .then((res) => {
                        let pkgOut = res.data
                        for (let index = 0; index < pkgOut.data.length; index++) {
                            const element = pkgOut.data[index];
                            self.authInfo.roleAuth.push(element.autCode)
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
            del() {
                let self = this
                self.$confirm('是否删除角色[' + self.selectedInfo.roleName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        id: self.selectedInfo.id
                    }
                    self.$http
                        .post('/eops/role/delete', input)
                        .then((res) => {
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
            }
        }
    }
</script>
<style scoped>
</style>
