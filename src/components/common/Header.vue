<template>
    <div class="header">
        <div class="logo">{{appName}}</div>
        <div class="user-info">
            <el-popover
                placement="bottom-end"
                width="300"
                trigger="hover">
                <div class="notify-title">通知消息
                    <el-button icon="el-icon-refresh" type="text" style="margin-left: 5px"
                               @click="refreshMsg"></el-button>
                    <el-button :disabled="notifySize === 0" type="text" style="margin-left: 140px" @click="readAll">全部已读</el-button>
                </div>
                <hr class="split"/>
                <div v-for="item in unreadNotify">
                    <div>
                        <el-button class="unread-msg" type="text"
                                   @click="read(item.id)">{{item.content}}
                        </el-button>
                    </div>
                </div>
                <span style="line-height:17px;margin-right: 20px" slot="reference">
                    <el-badge v-if="notifySize > 0" :value="notifySize" style="line-height:17px">
                        <el-button type="primary" size="medium" icon="el-icon-bell" circle></el-button>
                    </el-badge>
                    <el-button v-else type="primary" size="medium" icon="el-icon-bell" circle></el-button>
                </span>
            </el-popover>
            <el-dropdown trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="avatar"> {{loginName}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="getUserInf">个人信息</el-dropdown-item>
                    <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dialog title="用户详情" :visible.sync="viewFormVisible" :close-on-click-modal="true">
                <el-form :model="viewInfo" ref="viewForm" :label-position="labelPosition" label-width="120px">
                    <el-card>
                        <span>用户信息:</span>
                        <hr class="split"/>
                        <div class="card-context">
                            <el-row :gutter="10">
                                <el-col :span="10">
                                    <el-form-item label="用户号:">
                                        <el-input v-model="viewInfo.userDtl.id" size="small" readonly></el-input>
                                    </el-form-item>
                                    <el-form-item label="登录名:">
                                        <el-input v-model="viewInfo.userDtl.loginName" size="small" readonly></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机:">
                                        <el-input v-model="viewInfo.userDtl.phone" size="small" readonly></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="状态:">
                                        <el-select v-model="viewInfo.userDtl.state" size="small" disabled>
                                            <el-option label="1-正常" value="1"></el-option>
                                            <el-option label="2-关闭" value="2"></el-option>
                                            <el-option label="3-锁定" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="密码错误次数:">
                                        <el-input v-model="viewInfo.userDtl.errorTimes" size="small"
                                                  readonly></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱:">
                                        <el-input v-model="viewInfo.userDtl.email" size="small" readonly></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-form>
                <div slot="footer">
                    <el-button type="primary" @click="viewFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改密码" :visible.sync="editFormVisible" :close-on-click-modal="true">
                <el-form :model="editInfo" ref="viewForm" :label-position="labelPosition" label-width="120px">
                    <el-card>
                        <span>请输入密码:</span>
                        <hr class="split"/>
                        <div class="card-context">
                            <el-row :gutter="10">
                                <el-col :span="10">
                                    <el-form-item label="旧密码:">
                                        <el-input v-model="editInfo.oldPwd" size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="新密码:">
                                        <el-input v-model="editInfo.newPwd" size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="重复新密码:">
                                        <el-input v-model="editInfo.confirmPwd" size="small"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-form>
                <div slot="footer">
                    <el-button @click="editFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePwd">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {Base64} from 'js-base64'

    export default {
        props: {
            unreadNotify: null,
            notifySize: 0
        },
        data() {
            return {
                appName: '',
                loginName: '',
                avatar: '',
                viewFormVisible: false,
                labelPosition: 'left',
                viewInfo: {
                    userDtl: {}
                },
                editInfo: {},
                editRules: {},
                editFormVisible: false
            }
        },
        created() {
            this.appName = localStorage.getItem('appName')
            this.loginName = localStorage.getItem('loginName')
            this.avatar = localStorage.getItem('avatar')
        },
        methods: {
            handleCommand(command) {
                if (command == 'getUserInf') {
                    this.viewFormVisible = true
                    this.queryDtl()
                } else if (command == 'updatePwd') {
                    this.editFormVisible = true
                } else if (command == 'loginout') {
                    this.loginOut()
                }
            },
            queryDtl() {
                const self = this
                let input = {
                    id: localStorage.getItem('userId')
                }
                self.$http
                    .post('/eops/user/get_user', input)
                    .then(function (res) {
                        let pkgOut = res.data
                        self.viewInfo = {
                            userDtl: pkgOut.data
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定'
                        })
                    })

            },
            loginOut() {
                const self = this
                let input = {
                    id: localStorage.getItem('userId'),
                    token: localStorage.getItem('token')
                }

                self.$http
                    .post('/eops/user/logout', input)
                    .then(function (response) {
                        localStorage.removeItem('userId')
                        localStorage.removeItem('token')
                        localStorage.removeItem('loginName')
                        self.$router.push('/login')
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })

            },
            updatePwd() {
                const self = this
                self.editInfo.id = localStorage.getItem('userId')
                self.editInfo.oldPwd = Base64.encode(self.editInfo.oldPwd)
                self.editInfo.newPwd = Base64.encode(self.editInfo.newPwd)
                self.editInfo.confirmPwd = Base64.encode(self.editInfo.confirmPwd)
                let input = self.editInfo
                self.$http
                    .post('/eops/user/modify_pwd', input)
                    .then(function (res) {
                        self.editFormVisible = false
                        self.loginOut()
                        self.$message({
                            message: '修改密码成功，请重新登录',
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
            refreshMsg() {
                this.$emit('refreshMsg')
            },
            read(id) {
                const self = this
                let input = {
                    id: id
                }
                self.$http
                    .post('/eops/sys/notify/setOneRead', input)
                    .then(function (res) {
                        self.$message({
                            message: '未读消息更新为已读状态',
                            type: 'success'
                        })
                        self.$emit('refreshMsg')
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            readAll() {
                const self = this
                let input = {}
                self.$http
                    .post('/eops/sys/notify/setAllRead', input)
                    .then(function (res) {
                        self.$message({
                            message: '所有未读消息更新为已读状态',
                            type: 'success'
                        })
                        self.$emit('refreshMsg')
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }

    .header .logo {
        float: left;
        width: 500px;
        text-align: center;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 10px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .unread-msg {
        line-height: 15px;
        font-size: 10px;
        font-weight: bold;
        height: 15px;
    }
</style>
