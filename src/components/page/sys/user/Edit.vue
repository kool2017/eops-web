<template>
    <el-dialog title="修改用户" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left"
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
                                    <img v-if="updateInfo.avatar" :src="updateInfo.avatar" class="avatar">
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
                                <el-input v-model="updateInfo.email" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名:" prop="userName">
                                <el-input v-model="updateInfo.userName" size="small" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="update">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Edit",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            updateInfo: {}
        },
        data() {
            return {
                updateRules: {
                    phone: [
                        {max: 20, message: '最大长度20', trigger: 'blur'}
                    ],
                    email: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    avatar: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                },
                uploadAction: this.$http.defaults.baseURL + '/eops/user/uploadFace'
            }
        },
        methods: {
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
                    .post('/eops/user/modify', input)
                    .then((res) => {
                        self.modalClose()
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
            modalClose() {
                let afterUpdateInfo = JSON.parse(JSON.stringify(this.updateInfo))
                this.$emit('afterClose', afterUpdateInfo)
                this.$emit('update:visible', false)
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
                this.updateInfo.avatar = res.fileUrl
                // this.updateImageUrl = URL.createObjectURL(file.raw)
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
