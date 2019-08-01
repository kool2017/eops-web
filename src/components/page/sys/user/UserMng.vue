<template>
    <div class="userMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                登录名:
                            </el-col>
                            <el-col :span="3">
                                <div class="label-input">
                                    <el-input v-model="condition.loginName" size="small" maxlength="60"></el-input>
                                </div>
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
                            <el-table-column prop="id" label="用户号" width="150" sortable></el-table-column>
                            <el-table-column prop="loginName" label="登录名" width="300"></el-table-column>
                            <el-table-column prop="userName" label="姓名" width="300"></el-table-column>
                            <el-table-column prop="phone" label="手机" width="150"></el-table-column>
                            <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
                            <el-table-column prop="errorTimes" label="密码错误次数" width="150"></el-table-column>
                            <el-table-column prop="state_str" label="状态" width="100"></el-table-column>
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
                <el-button type="primary" size="small" icon="el-icon-edit" @click="showUpdate"
                           :disabled="isDisabled">修改
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-view" @click="showDetail"
                           :disabled="isDisabled">详情
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-role" @click="showSetRole"
                           :disabled="isDisabled">
                    角色
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-k-safe" @click="resetPwd"
                           :disabled="isDisabled">
                    重置密码
                </el-button>
            </el-col>
        </el-row>
        <add-user :visible.sync="addFormVisible" @afterClose="refresh"></add-user>
        <update-user :visible.sync="updateFormVisible" :update-info="updateInitInfo" @afterClose="refresh"></update-user>
        <view-user :visible.sync="viewFormVisible" :view-info="viewInitInfo"></view-user>
        <set-role :visible.sync="roleTransferVisible" :user-info="roleInitInfo" :role-info="roleInfo"></set-role>
    </div>
</template>
<script>
    import addUser from './Add'
    import updateUser from './Edit'
    import viewUser from './Detail'
    import setRole from './SetRole'

    export default {
        components: {addUser, updateUser, viewUser, setRole},
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
                viewInitInfo: {},
                roleInitInfo: {},
                roleInfo:{
                    userRole: [],
                    allRole: []
                },
                addFormVisible: false,
                updateFormVisible: false,
                viewFormVisible: false,
                roleTransferVisible: false,
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
                this.viewFormVisible = false
                this.roleTransferVisible = false
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
                let input = {
                    'loginName': self.condition.loginName,
                    'currentPage': self.page.currentPage,
                    'pageSize': self.page.pageSize
                }
                self.$http
                    .post('/eops/user/get_user_page', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        for (let index = 0; index < self.retList.length; index++) {
                            let element = self.retList[index]
                            element.state_str = self.stateStr(element.state)
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
            showDetail() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.viewInitInfo = Object.assign({}, self.selectedInfo)
                self.viewFormVisible = true
            },
            showSetRole() {
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
                self.roleTransferVisible = true
                self.queryRole()
                self.queryUserRole()
            },
            queryRole() {
                const self = this
                let input = {}
                self.$http
                    .post('/eops/role/get_all_roles', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.roleInfo.allRole = pkgOut.data
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            queryUserRole() {
                const self = this
                let input = {
                    userId: self.selectedInfo.id
                }
                self.roleInfo.userRole = []
                self.$http
                    .post('/eops/role/get_user_roles', input)
                    .then((res) => {
                        let pkgOut = res.data
                        for (let index = 0; index < pkgOut.data.length; index++) {
                            const element = pkgOut.data[index];
                            self.roleInfo.userRole.push(element.roleCode)
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
            resetPwd() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.$confirm('是否重置用户[' + self.selectedInfo.loginName + ']的密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = self.selectedInfo
                    self.$http
                        .post('/eops/user/reset_pwd', input)
                        .then((res) => {
                            let pkgOut = res.data
                            self.$message({
                                message: '用户[' + self.selectedInfo.loginName + ']重置密码成功',
                                type: 'success'
                            })
                            self.init()
                            self.query()
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
            stateStr(state) {
                let stateStr = ''
                if (state == 1) {
                    stateStr = '正常'
                } else if (state == 2) {
                    stateStr = '关闭'
                } else if (state == 3) {
                    stateStr = '锁定'
                }
                return stateStr;
            }
        }
    }
</script>
<style scoped>
</style>
