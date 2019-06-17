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
                                用户号:
                            </el-col>
                            <el-col :span="3">
                                <div class="label-input">
                                    <el-input v-model="condition.userId" size="small"></el-input>
                                </div>
                            </el-col>
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
                            <el-table-column prop="userId" label="用户号" width="150" sortable></el-table-column>
                            <el-table-column prop="loginName" label="登录名" width="300"></el-table-column>
                            <el-table-column prop="phone" label="手机" width="150"></el-table-column>
                            <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
                            <el-table-column prop="state" label="状态" width="100"></el-table-column>
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
        <el-dialog title="增加用户" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition"
                     label-width="130px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 用户信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <div class="avatar-uploader">
                                    <el-upload :action="uploadAction" :show-file-list="false"
                                               :on-success="addHandleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                        <img v-if="addImageUrl" :src="addImageUrl" class="avatar">
                                        <i v-else class="el-icon-k-face avatar-uploader-icon"></i>
                                        <div slot="tip" class="el-upload__tip">修改头像</div>
                                    </el-upload>
                                </div>
                                <el-form-item label="登录名:" prop="loginName">
                                    <el-input v-model="addInfo.loginName" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="手机:" prop="phone">
                                    <el-input v-model="addInfo.phone" size="small" maxlength="20"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="邮箱:" prop="mail">
<<<<<<< HEAD
                                    <el-input v-model="addInfo.mail" size="small" maxlength="100"></el-input>
=======
                                    <el-input v-model="addInfo.email" size="small" maxlength="100"></el-input>
>>>>>>> 5456defeb5a00ad7262147da65875d26147a8cbc
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
        <el-dialog title="修改用户" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition"
                     label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 用户信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <div class="avatar-uploader">
                                    <el-upload :action="uploadAction" :show-file-list="false"
                                               :on-success="updateHandleAvatarSuccess"
                                               :before-upload="beforeAvatarUpload">
                                        <img v-if="updateImageUrl" :src="updateImageUrl" class="avatar">
                                        <i v-else class="el-icon-k-face avatar-uploader-icon"></i>
                                        <div slot="tip" class="el-upload__tip">修改头像</div>
                                    </el-upload>
                                </div>
                                <el-form-item label="登录名:">
                                    <el-input v-model="updateInfo.loginName" size="small" maxlength="60"
                                              readonly></el-input>
                                </el-form-item>
                                <el-form-item label="手机:" prop="phone">
                                    <el-input v-model="updateInfo.phone" size="small" maxlength="20"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="邮箱:" prop="mail">
<<<<<<< HEAD
                                    <el-input v-model="updateInfo.mail" size="small" maxlength="100"></el-input>
=======
                                    <el-input v-model="updateInfo.email" size="small" maxlength="100"></el-input>
>>>>>>> 5456defeb5a00ad7262147da65875d26147a8cbc
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
        <el-dialog title="用户详情" :visible.sync="viewFormVisible" :close-on-click-modal="true">
            <el-form :model="viewInfo" ref="viewForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-view"></i> 用户信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="用户号:">
                                    <el-input v-model="viewInfo.userDtl.userId" size="small" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="登录名:">
                                    <el-input v-model="viewInfo.userDtl.loginName" size="small" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="手机:">
                                    <el-input v-model="viewInfo.userDtl.phone" size="small" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱:">
                                    <el-input v-model="viewInfo.userDtl.email" size="small" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <span>
                        <i class="el-icon-tickets"></i> 登录日志:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-table :data="viewInfo.loginLog" border style="width: 100%" ref="view-groupTable"
                                  height="200">
                            <el-table-column prop="time" label="登录时间" width="200"></el-table-column>
                            <!-- <el-table-column prop="ip" label="登录IP" width="250"></el-table-column> -->
                        </el-table>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
<<<<<<< HEAD
                <el-button type="primary" size="small" icon="el-icon-check" @click="viewFormVisible = false">确 定</el-button>
=======
                <el-button type="primary" size="small" icon="el-icon-check" @click="viewFormVisible = false">确 定
                </el-button>
>>>>>>> 5456defeb5a00ad7262147da65875d26147a8cbc
            </div>
        </el-dialog>
        <el-dialog title="设置角色" :visible.sync="roleTransferVisible" :close-on-click-modal="false">
            <el-card>
                <el-transfer v-model="userRole" :data="allRole" :titles="['可赋予角色','已赋予角色']" :props="roleTransferProps">

                </el-transfer>
            </el-card>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="roleSubmit">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="roleTransferVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')"
                           :disabled="isDisabled">修改
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-view" @click="view" :disabled="isDisabled">详情
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-freeze" @click="freeze" :disabled="isDisabled">
                    冻结
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-unfreeze" @click="unfreeze"
                           :disabled="isDisabled">解冻
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
    export default {
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
                addInfo: {},
                addRules: {
                    loginName: [
                        {required: true, message: '请输入登录名', trigger: 'blur'},
                        {max: 60, message: '最大长度60', trigger: 'blur'}
                    ],
                    phone: [
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    email: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    face: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                },
                addFormVisible: false,
                updateInfo: {},
                updateRules: {
                    type: [
                        {required: true, message: '请输入用户类型', trigger: 'change'}
                    ],
                    phone: [
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    email: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    face: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                },
                updateFormVisible: false,
                viewInfo: {
                    userDtl: {},
                    loginLog: []
                },
                viewFormVisible: false,
                isDisabled: true,
                labelPosition: 'left',
                userRole: [],
                allRole: [],
                roleTransferVisible: false,
                roleTransferProps: {
                    key: 'roleCode',
                    label: 'name'
                },
                uploadAction: this.$http.defaults.baseURL + '/user/uploadFace',
                addImageUrl: '',
                updateImageUrl: ''
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
                    'loginName':self.condition.loginName,
                    'currentPage':self.page.currentPage,
                    'pageSize':self.page.pageSize
                }
                self.$http
                    .post('/user/get_user_page', input)
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
            add() {
                let self = this
                let validRet = false
                self.$refs['addForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.addInfo
                self.$http
                    .post('/user/addUser', input)
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
            update() {
                let self = this
                let validRet = false
                self.$refs['updateForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.updateInfo
                self.$http
                    .post('/user/updateUser', input)
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
                            userDtl: pkgOut.pkgOut.data,
                            loginLog: pkgOut.pkgOut.data.log
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
            freeze() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.$confirm('是否冻结用户[' + self.selectedInfo.loginName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        SYUSRCIDX: [self.selectedInfo]
                    }
                    self.$http
                        .post('/sys/user/freezeUser', input)
                        .then((res) => {
                            let pkgOut = res.data
                            self.$message({
                                message: '用户[' + self.selectedInfo.loginName + ']冻结成功',
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
            unfreeze() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.$confirm('是否解冻用户[' + self.selectedInfo.loginName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        SYUSRCIDX: [self.selectedInfo]
                    }
                    self.$http
                        .post('/sys/user/unfreezeUser', input)
                        .then((res) => {
                            let pkgOut = res.data
                            self.$message({
                                message: '用户[' + self.selectedInfo.loginName + ']解冻成功',
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
                this.addInfo = {}
                this.updateInfo = {}
                this.selectedInfo = {}
                this.isDisabled = true
                this.addFormVisible = false
                this.updateFormVisible = false
                this.viewFormVisible = false
            },
            addHandleAvatarSuccess(res, file) {
                this.addInfo.face = res.fileUrl
                this.addImageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M
            },
            updateHandleAvatarSuccess(res, file) {
                this.updateInfo.face = res.fileUrl
                this.updateImageUrl = URL.createObjectURL(file.raw)
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
