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
                                  @current-change="selectOne" height="386">
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
        <add-user :visible.sync="addFormVisible"></add-user>
        <update-user ref="updateForm" :visible.sync="updateFormVisible"></update-user>
        <view-user ref="viewForm" :visible.sync="viewFormVisible"></view-user>
        <role-set :visible.sync="viewFormVisible"></role-set>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')"
                           :disabled="isDisabled">修改
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-view" @click="view" :disabled="isDisabled">详情
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-role" @click="setRole" :disabled="isDisabled">
                    角色
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-k-safe" @click="resetPwd" :disabled="isDisabled">
                    重置密码
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import addUser from './Add'
    import updateUser from './Edit'
    import viewUser from './Detail'
    import roleSet from './RoleSet'

    export default {
        components: {addUser, updateUser, viewUser, roleSet},
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
                addFormVisible: false,
                updateFormVisible: false,
                viewInfo: {
                    userDtl: {},
                    loginLog: []
                },
                viewFormVisible: false,
                isDisabled: true,
                roleTransferVisible: false
            }
        },
        created() {
            this.init()
            this.query()
        },
        methods: {
            queryPage() {
                let self = this
                var input = {
                    'loginName': self.condition.loginName,
                    'currentPage': self.page.currentPage,
                    'pageSize': self.page.pageSize
                }
                self.$http
                    .post('/eops/user/get_user_page', input)
                    .then((res) => {
                        var pkgOut = res.data
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
            query() {
                this.page = {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                }
                this.queryPage();
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
            selectOne(val) {
                this.selectedInfo = val
                if (val == null) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
            },
            editForm(formType) {
                let self = this
                if (formType === 'ADD') {
                    self.addInfo = {}
                    self.addImageUrl = ''
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
                    self.$refs.updateForm.init(self.selectedInfo)
                    self.updateInfo = JSON.parse(JSON.stringify(self.selectedInfo))
                    if (self.updateInfo.face != null) {
                        self.updateImageUrl = self.updateInfo.face
                    } else {
                        self.updateImageUrl = null
                    }
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
            view() {
                if (this.selectedInfo == null) {
                    this.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    this.isDisabled = true
                    return
                }
                this.queryDtl(this.selectedInfo)
                this.$refs.viewForm.init(self.viewInfo)
                this.viewFormVisible = true
            },
            queryDtl(val) {
                let self = this
                let input = val
                self.$http
                    .post('/user/queryUserDetail', input)
                    .then((res) => {
                        let pkgOut = res.data
                        for (let index = 0; index < pkgOut.data.log.length; index++) {
                            const element = pkgOut.data.log[index];
                            if (element.time != null) {
                                element.time = self.$moment(Number(element.time)).format('YYYY-MM-DD HH:mm:ss')
                            }
                        }
                        self.viewInfo = {
                            userDtl: pkgOut.data,
                            loginLog: pkgOut.data.log
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
            setRole() {
                if (this.selectedInfo == null) {
                    this.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    this.isDisabled = true
                    return
                }
                this.roleTransferVisible = true
                this.queryRole()
                this.queryUserRole()

            },
            queryRole() {
                const self = this
                let input = {SYROLEINFY: [{}]}
                self.$http
                    .post('/sys/role/queryRole', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.allRole = pkgOut.SYROLEINFY
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
                    SYUSRCIDX: [self.selectedInfo]
                }
                self.userRole = []
                self.$http
                    .post('/sys/user/queryUserRole', input)
                    .then((res) => {
                        let pkgOut = res.data
                        for (let index = 0; index < pkgOut.SYROLEINFY.length; index++) {
                            const element = pkgOut.SYROLEINFY[index];
                            self.userRole.push(element.roleCode)
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
            roleSubmit() {
                const self = this
                let secIn = []
                for (let index = 0; index < self.userRole.length; index++) {
                    const element = self.userRole[index];
                    let propIn = {
                        userCid: self.selectedInfo.userCid,
                        roleCode: element
                    }
                    secIn.push(propIn)
                }
                let input = {
                    SYUSRCIDX: [self.selectedInfo],
                    SYUSRROLEX: secIn
                }
                self.$http
                    .post('/sys/user/setRole', input)
                    .then((res) => {
                        this.roleTransferVisible = false
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
                    let input = {
                        SYUSRCIDX: [self.selectedInfo]
                    }
                    self.$http
                        .post('/sys/user/resetPwd', input)
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
            init() {
                this.selectedInfo = {}
                this.isDisabled = true
                this.addFormVisible = false
                this.updateFormVisible = false
                this.viewFormVisible = false
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
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 10px;
        width: 60px;
        height: 60px;
        margin-top: 5px;
        margin-bottom: 60px;
    }

    .avatar-uploader:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }

    .avatar {
        width: 60px;
        height: 60px;
        display: block;
    }
</style>
