<template>
    <div class="login-wrap">
        <div class="ms-title">{{appName}}</div>
        <div class="ms-login">
            <el-tabs
                type="border-card"
                v-model="paneName"
                @tab-click="changeTab"
            >
                <el-tab-pane name="login">
                    <span slot="label">
                        <i class="el-icon-date"></i> 登录</span>
                    <el-form
                        :model="SYLOGINFX"
                        :rules="loginRules"
                        ref="loginForm"
                        label-width="0px"
                        class="loginForm"
                    >
                        <el-form-item prop="loginName">
                            <el-input
                                v-model="SYLOGINFX.loginName"
                                placeholder="请输入登录名"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input
                                type="password"
                                placeholder="请输入密码"
                                v-model="SYLOGINFX.pwd"
                                @keyup.enter.native="loginForm('loginForm')"
                            ></el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button
                                type="primary"
                                @click="loginForm('loginForm')"
                            >登录
                            </el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="bottom">
            <div style="width:300px;margin:0 auto; padding:20px 0;">
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602009770" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../../../static/img/beian.png" style="float:left;" />
                    <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33010602009770号</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import sha256 from 'sha256'
    import {Base64} from 'js-base64'

    export default {
        data() {
            return {
                appName: '',
                SYLOGINFX: {
                    loginName: '',
                    pwd: '',
                    pwdA: '',
                    pwdB: '',
                },
                SYREGINFX: {
                    loginName: '',
                    pwd: '',
                    pwdC: ''
                },
                loginRules: {
                    loginName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                paneName: 'login'
            }
        },
        created() {
            let self = this
            self.appName = localStorage.getItem('appName')
            //如果已经登录，跳转到Home
            if(localStorage.getItem("token")){
                self.$router.push('/home')
            }
        },
        methods: {
            loginForm(formName) {
                const self = this
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                    } else {
                        return false
                    }
                })
                let input = self.SYLOGINFX
                self.$http
                    .post('/eops/user/prelogin', input)
                    .then(
                        function (response) {
                            var pkgOut = response.data
                            var userInf = pkgOut.data
                            var pwdA = input.pwd + '|' + userInf.oldSalt
                            var pwdB = input.pwd + '|' + userInf.newSalt
                            for (var N = 0; N < userInf.hashTimes; N++) {
                                pwdA = sha256(pwdA)
                                pwdB = sha256(pwdB)
                            }
                            input.pwd = ''
                            input.pwdA = Base64.encode(pwdA)
                            input.pwdB = Base64.encode(pwdB)
                            self.$http
                                .post('/eops/user/login', input)
                                .then(
                                    function (responseEnd) {
                                        let pkgOutEnd = responseEnd.data
                                        let loginInfo = pkgOutEnd.data
                                        localStorage.setItem('userId', loginInfo.id)
                                        localStorage.setItem('loginName', loginInfo.loginName)
                                        let token = loginInfo.token
                                        if (token != '' && token != null) {
                                            localStorage.setItem('token', token)
                                        }
                                        let avatar = loginInfo.avatar;
                                        if (avatar != '' && avatar != null) {
                                            localStorage.setItem('avatar', avatar)
                                        } else {
                                            localStorage.setItem('avatar', '../../../static/img/KOOL.jpg')
                                        }
                                        self.$router.push('/home')
                                    }
                                )
                                .catch(
                                    function (err) {
                                        self.$alert(err, '提示', {
                                            confirmButtonText: '确定',
                                            type: 'error'
                                        })
                                    }
                                )
                        }
                    )
                    .catch(function (err) {
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            changeTab() {
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 280px;
        height: 270px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .bottom {
        width: 100%;
        margin: 0 auto;
        padding: 0px;
        position: absolute;
        bottom: 0px;
        /* left: 50%; */
        /* margin-left: -150px; */
        background-color: rgb(46, 46, 48);
    }

</style>
