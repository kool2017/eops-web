<template>
    <el-dialog title="修改用户" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
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
                                <el-input v-model="updateInfo.email" size="small" maxlength="100"></el-input>
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
            }
        },
        data() {
            return {
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
                labelPosition: 'left',
                uploadAction: this.$http.defaults.baseURL + '/user/uploadFace',
                updateImageUrl: ''
            }
        },
        methods: {
            init(selectedInfo) {
                this.updateInfo = JSON.parse(JSON.stringify(selectedInfo))
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
                    .post('/eops/user/updateUser', input)
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
            },
            modalClose() {
                this.$emit('update:visible', false);
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
